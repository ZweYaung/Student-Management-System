<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Teacher;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $query = Course::query()->with('teachers');

        // Search
        if ($request->filled('search')) {
            $query->where('name', 'LIKE', "%{$request->search}%")
                ->orWhere('code', 'LIKE', "%{$request->search}%")
                ->orWhere('department', 'LIKE', "%{$request->search}%");
        }

        // Filter by status
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Filter by department
        if ($request->filled('department') && $request->department !== 'all') {
            $query->where('department', $request->department);
        }

        // Get filtered courses for stats
        $filteredCourses = $query->get();

        // Get all teachers for the dropdown
        $teachers = Teacher::select('id', 'name', 'department')->get();
        // dd($teachers);

        // Stats
        $currentMonthTotal = $filteredCourses->count();
        $currentMonthActive = $filteredCourses->where('status', 'active')->count();
        $currentMonthArchived = $filteredCourses->where('status', 'archived')->count();
        $currentMonthDraft = $filteredCourses->where('status', 'draft')->count();
        $currentMonthEnrollments = $filteredCourses->sum('current_students');

        // Last month stats
        $lastMonthStart = Carbon::now()->subMonth()->startOfMonth();
        $lastMonthEnd = Carbon::now()->subMonth()->endOfMonth();
        $lastMonthCourses = Course::whereBetween('created_at', [$lastMonthStart, $lastMonthEnd])->get();
        $lastMonthTotal = $lastMonthCourses->count();

        $percentageChange = 0;
        if ($lastMonthTotal > 0) {
            $percentageChange = (($currentMonthTotal - $lastMonthTotal) / $lastMonthTotal) * 100;
        }

        $stats = [
            'total' => $currentMonthTotal,
            'active' => $currentMonthActive,
            'archived' => $currentMonthArchived,
            'draft' => $currentMonthDraft,
            'enrollments' => $currentMonthEnrollments,
            'percentage_change' => round($percentageChange, 1),
        ];

        $courses = $query->paginate(10);

        return Inertia('Courses/Index', [
            'courses' => $courses,
            'filters' => $request->only(['search', 'status', 'department']),
            'stats' => $stats,
            'teachers' => $teachers,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|unique:courses,code|max:20',
            'description' => 'nullable|string',
            'credits' => 'nullable|integer|min:1|max:6',
            'department' => 'nullable|string|max:100',
            'teacher_ids' => 'nullable|array',
            'teacher_ids.*' => 'exists:teachers,id',
            'status' => 'required|in:active,archived,draft',
            'max_students' => 'nullable|integer|min:1|max:100',
            'current_students' => 'nullable|integer|min:0',
        ]);

        $course = Course::create($validated);

        // Attach teachers
        if (isset($validated['teacher_ids']) && !empty($validated['teacher_ids'])) {
            $teacherData = [];
            foreach ($validated['teacher_ids'] as $teacherId) {
                $teacherData[$teacherId] = ['role' => 'primary'];
            }
            $course->teachers()->attach($teacherData);
        }

        return redirect()->back()->with('success', 'Course added successfully!');
    }

    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|unique:courses,code,' . $id . '|max:20',
            'description' => 'nullable|string',
            'credits' => 'nullable|integer|min:1|max:6',
            'department' => 'nullable|string|max:100',
            'teacher_ids' => 'nullable|array',
            'teacher_ids.*' => 'exists:teachers,id',
            'status' => 'required|in:active,archived,draft',
            'max_students' => 'nullable|integer|min:1|max:100',
            'current_students' => 'nullable|integer|min:0',
        ]);

        $course->update($validated);

        // Sync teachers
        if (isset($validated['teacher_ids'])) {
            $teacherData = [];
            foreach ($validated['teacher_ids'] as $teacherId) {
                $teacherData[$teacherId] = ['role' => 'primary'];
            }
            $course->teachers()->sync($teacherData);
        } else {
            $course->teachers()->detach();
        }

        return redirect()->back()->with('success', 'Course updated successfully!');
    }

    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();

        return redirect()->back()->with('success', 'Course deleted successfully!');
    }
}
