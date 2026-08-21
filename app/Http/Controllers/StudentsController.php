<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentsController extends Controller
{
    // Fetch students' data
    public function index(Request $request)
    {
        $query = Student::query();

        // Search by name or email
        if ($request->filled('search')) {
            $query->where('name', 'LIKE', "%{$request->search}%")
                ->orWhere('email', 'LIKE', "%{$request->search}%");
        }

        // Filter by gender
        if ($request->filled('gender') && $request->gender !== 'all') {
            $query->where('gender', $request->gender);
        }

        // Filter by score range
        if ($request->filled('score_range')) {
            $ranges = [
                '0-20' => [0, 20],
                '21-40' => [21, 40],
                '41-60' => [41, 60],
                '61-80' => [61, 80],
                '81-100' => [81, 100],
            ];

            if (isset($ranges[$request->score_range])) {
                [$min, $max] = $ranges[$request->score_range];
                $query->whereBetween('score', [$min, $max]);
            }
        }

        // Get the filtered students (for stats)
        $filteredStudents = $query->get();

        // Calculate current month stats
        $currentMonthTotal = $filteredStudents->count();
        $currentMonthAvg = $filteredStudents->avg('score') ? round($filteredStudents->avg('score'), 1) : 0;
        $currentMonthMale = $filteredStudents->where('gender', 'male')->count();
        $currentMonthFemale = $filteredStudents->where('gender', 'female')->count();
        $currentMonthTop = $filteredStudents->max('score') ?? 0;
        $currentMonthTopStudent = $filteredStudents->sortByDesc('score')->first()?->name ?? 'N/A';

        // Get last month's stats
        $lastMonthStart = Carbon::now()->subMonth()->startOfMonth();
        $lastMonthEnd = Carbon::now()->subMonth()->endOfMonth();

        $lastMonthStudents = Student::whereBetween('created_at', [$lastMonthStart, $lastMonthEnd])->get();
        $lastMonthTotal = $lastMonthStudents->count();
        $lastMonthAvgScore = $lastMonthStudents->avg('score') ?? 0;

        // Calculate percentage change
        $percentageChange = 0;
        if($lastMonthTotal > 0) {
            $percentageChange = (($currentMonthTotal - $lastMonthTotal) / $lastMonthTotal) * 100;
        }

         // Calculate average score percentage change
        $avgPercentageChange = 0;
        if ($lastMonthAvgScore > 0) {
            $avgPercentageChange = (($currentMonthAvg - $lastMonthAvgScore) / $lastMonthAvgScore) * 100;
        }

        // Calculate stats
        $stats = [
            'total' => $filteredStudents->count(),
            'average_score' => $filteredStudents->avg('score') ? round($filteredStudents->avg('score'), 1) : 0,
            'male' => $filteredStudents->where('gender', 'male')->count(),
            'female' => $filteredStudents->where('gender', 'female')->count(),
            'top_score' => $filteredStudents->max('score') ?? 0,
            'top_student' => $filteredStudents->sortByDesc('score')->first()?->name ?? 'N/A',
            'percentage_change' => round($percentageChange, 1),
            'avg_percentage_change' => round($avgPercentageChange, 1)
        ];

        $students = $query->paginate(10);

        return Inertia('Students/Index', [
            'students' => $students,
            'stats' => $stats,
            'filters' => $request->only(['search', 'gender', 'score_range']),
        ]);
    }

    // Create new student
    public function store(Request $request)
    {
        // Use $request->validate() directly
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',
            'gender' => 'required|in:male,female',
            'score' => 'required|integer|min:0|max:100',
            'phone' => 'nullable|string|max:20|regex:/^[+]?[0-9\s\-()]{7,20}$/',
            'date_of_birth' => 'nullable|date|before:today',
            'grade' => 'nullable|string|max:50',
            'section' => 'nullable|string|max:10',
            'address' => 'nullable|string',
            'guardian_name' => 'nullable|string|max:255',
            'guardian_phone' => 'nullable|string|max:20|regex:/^[0-9+\s\-()\.]{7,20}$/',
            'guardian_email' => 'nullable|email|max:255',
            'admission_date' => 'nullable|date',
            'academic_year' => 'nullable|string|max:20',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if($request->hasFile('profile_picture')){
            $fileName = uniqid().$request->file('profile_picture')->getClientOriginalName();
            $request->file('profile_picture')->move(public_path()."/profilePictures/",$fileName);
            $validated['profile_picture'] = $fileName;
        }

        // Create the student
        Student::create($validated);

        // Return success response
        return redirect()->back()->with('success', 'Student added successfully!');
    }

    // Delete student
    public function destroy($id){
        $student = Student::findorFail($id);

        if(!empty($student->profile_picture)){
            $filePath = public_path()."/profilePictures/".$student->profile_picture;
            if(file_exists($filePath)){
                unlink($filePath);
            }
        }

        $student->delete();

        return redirect()->back()->with('success', 'Student deleted successfully!');
    }

    // Update student
    public function update(Request $request, $id){
        $student = Student::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email,' . $id,
            'gender' => 'required|in:male,female',
            'score' => 'required|integer|min:0|max:100',
            'phone' => 'nullable|string|max:20|regex:/^[+]?[0-9\s\-()]{7,20}$/',
            'date_of_birth' => 'nullable|date|before:today',
            'grade' => 'nullable|string|max:50',
            'section' => 'nullable|string|max:10',
            'address' => 'nullable|string',
            'guardian_name' => 'nullable|string|max:255',
            'guardian_phone' => 'nullable|string|max:20|regex:/^[0-9+\s\-()\.]{7,20}$/',
            'guardian_email' => 'nullable|email|max:255',
            'admission_date' => 'nullable|date',
            'academic_year' => 'nullable|string|max:20',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if($request->input('remove_image') === 'true'){
            if($student->profile_picture && file_exists(public_path('profilePictures/'.$student->profile_picture))){
                unlink(public_path('profilePictures/' . $student->profile_picture));
            }
            $validated['profile_picture'] = null;
        }

        if($request->hasFile('profile_picture')){
            if($student->profile_picture && file_exists(public_path('profilePictures/'.$student->profile_picture))){
                unlink(public_path('profilePictures/' . $student->profile_picture));
            }

            $fileName = uniqid().$request->file('profile_picture')->getClientOriginalName();
            $request->file('profile_picture')->move(public_path()."/profilePictures/",$fileName);

            $validated['profile_picture'] = $fileName;
        }

        $student->update($validated);

        return redirect()->back()->with('success', 'Student updated successfully!');
    }
}
