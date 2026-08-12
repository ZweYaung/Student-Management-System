<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentsController extends Controller
{
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

        $students = $query->paginate(10);

        return Inertia('Students/Index', [
            'students' => $students,
            'filters' => $request->only(['search', 'gender', 'score_range']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $this->validate($request);

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

    public function destroy($id){
        // dd($id);
        $student = Student::findorFail($id);

        if(!empty($student->profile_picture)){
            $filePath = public_path()."/profilePictures/".$student->profile_picture;
            if(file_exists($filePath)){
                unlink($filePath);
            }
        }

        $student->delete();

        return redirect()->back()->with('success', 'Student deleted!');
    }

    private function validate($request){
        return $request->validate([
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
            'guardian_phone' => 'nullable|string|max:20|regex:/^[+]?[0-9\s\-()]{7,20}$/',
            'guardian_email' => 'nullable|email|max:255',
            'admission_date' => 'nullable|date',
            'academic_year' => 'nullable|string|max:20',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    }
}
