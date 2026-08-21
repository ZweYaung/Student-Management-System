<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Helpers\NotificationHelper;

class TeacherController extends Controller
{
    public function index(Request $request)
    {
        $query = Teacher::query();

        // Search by name or email
        if ($request->filled('search')) {
            $query->where('name', 'LIKE', "%{$request->search}%")
                ->orWhere('email', 'LIKE', "%{$request->search}%");
        }

        // Filter by gender
        if ($request->filled('gender') && $request->gender !== 'all') {
            $query->where('gender', $request->gender);
        }

        // Filter by department
        if ($request->filled('department') && $request->department !== 'all') {
            $query->where('department', $request->department);
        }

        // Filter by experience range
        if ($request->filled('experience_range')) {
            $ranges = [
                '0-5' => [0, 5],
                '6-10' => [6, 10],
                '11-15' => [11, 15],
                '16-20' => [16, 20],
                '21+' => [21, 100],
            ];

            if (isset($ranges[$request->experience_range])) {
                [$min, $max] = $ranges[$request->experience_range];
                $query->whereBetween('experience', [$min, $max]);
            }
        }

        // Get the filtered teachers (for stats)
        $filteredTeachers = $query->get();

        // Calculate current month stats
        $currentMonthTotal = $filteredTeachers->count();
        $currentMonthMale = $filteredTeachers->where('gender', 'male')->count();
        $currentMonthFemale = $filteredTeachers->where('gender', 'female')->count();
        $currentMonthAvgExperience = $filteredTeachers->avg('experience') ? round($filteredTeachers->avg('experience'), 1) : 0;

        // Get last month's stats
        $lastMonthStart = Carbon::now()->subMonth()->startOfMonth();
        $lastMonthEnd = Carbon::now()->subMonth()->endOfMonth();

        $lastMonthTeachers = Teacher::whereBetween('created_at', [$lastMonthStart, $lastMonthEnd])->get();
        $lastMonthTotal = $lastMonthTeachers->count();
        $lastMonthAvgExperience = $lastMonthTeachers->avg('experience') ?? 0;

        // Calculate percentage changes
        $percentageChange = 0;
        if ($lastMonthTotal > 0) {
            $percentageChange = (($currentMonthTotal - $lastMonthTotal) / $lastMonthTotal) * 100;
        }

        $avgExperiencePercentageChange = 0;
        if ($lastMonthAvgExperience > 0) {
            $avgExperiencePercentageChange = (($currentMonthAvgExperience - $lastMonthAvgExperience) / $lastMonthAvgExperience) * 100;
        }

        // Build stats
        $stats = [
            'total' => $currentMonthTotal,
            'male' => $currentMonthMale,
            'female' => $currentMonthFemale,
            'avg_experience' => $currentMonthAvgExperience,
            'percentage_change' => round($percentageChange, 1),
            'avg_experience_change' => round($avgExperiencePercentageChange, 1),
        ];

        // Get paginated results
        $teachers = $query->paginate(10);

        return Inertia('Teachers/Index', [
            'teachers' => $teachers,
            'filters' => $request->only(['search', 'gender', 'department', 'experience_range']),
            'stats' => $stats,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:teachers,email',
            'gender' => 'required|in:male,female',
            'department' => 'nullable|string|max:100',
            'experience' => 'nullable|integer|min:0|max:50',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'bio' => 'nullable|string',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('profile_picture')) {
            $fileName = uniqid() . $request->file('profile_picture')->getClientOriginalName();
            $request->file('profile_picture')->move(public_path('profilePictures'), $fileName);
            $validated['profile_picture'] = $fileName;
        }

        Teacher::create($validated);

        return redirect()->back()->with('success', 'Teacher added successfully!');
    }

    public function update(Request $request, $id)
    {
        $teacher = Teacher::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:teachers,email,' . $id,
            'gender' => 'required|in:male,female',
            'department' => 'nullable|string|max:100',
            'experience' => 'nullable|integer|min:0|max:50',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'bio' => 'nullable|string',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->input('remove_image') === 'true') {
            if ($teacher->profile_picture && file_exists(public_path('profilePictures/' . $teacher->profile_picture))) {
                unlink(public_path('profilePictures/' . $teacher->profile_picture));
            }
            $validated['profile_picture'] = null;
        }

        if ($request->hasFile('profile_picture')) {
            if ($teacher->profile_picture && file_exists(public_path('profilePictures/' . $teacher->profile_picture))) {
                unlink(public_path('profilePictures/' . $teacher->profile_picture));
            }

            $fileName = uniqid() . $request->file('profile_picture')->getClientOriginalName();
            $request->file('profile_picture')->move(public_path('profilePictures'), $fileName);
            $validated['profile_picture'] = $fileName;
        }

        $teacher->update($validated);

        return redirect()->back()->with('success', 'Teacher updated successfully!');
    }

    public function destroy($id)
    {
        $teacher = Teacher::findOrFail($id);

        if (!empty($teacher->profile_picture)) {
            $filePath = public_path('profilePictures/' . $teacher->profile_picture);
            if (file_exists($filePath)) {
                unlink($filePath);
            }
        }

        $teacher->delete();

        return redirect()->back()->with('success', 'Teacher deleted successfully!');
    }
}
