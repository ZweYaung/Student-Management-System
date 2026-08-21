<?php
// app/Http/Controllers/DashboardController.php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Teacher;
use App\Models\Course;
use App\Models\Event;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        // Get total counts
        $totalStudents = Student::count();
        $totalTeachers = Teacher::count();
        $totalCourses = Course::count();

        // Get average score
        $averageScore = Student::avg('score') ? round(Student::avg('score'), 1) : 0;

        // Calculate growth percentages (comparing with last month)
        $lastMonthStart = Carbon::now()->subMonth()->startOfMonth();
        $lastMonthEnd = Carbon::now()->subMonth()->endOfMonth();

        $lastMonthStudents = Student::whereBetween('created_at', [$lastMonthStart, $lastMonthEnd])->count();
        $lastMonthTeachers = Teacher::whereBetween('created_at', [$lastMonthStart, $lastMonthEnd])->count();

        $studentGrowth = 0;
        if ($lastMonthStudents > 0) {
            $studentGrowth = (($totalStudents - $lastMonthStudents) / $lastMonthStudents) * 100;
        }

        $teacherGrowth = 0;
        if ($lastMonthTeachers > 0) {
            $teacherGrowth = (($totalTeachers - $lastMonthTeachers) / $lastMonthTeachers) * 100;
        }

        // STATS
        $stats = [
            'total_students' => $totalStudents,
            'total_teachers' => $totalTeachers,
            'total_courses' => $totalCourses,
            'average_score' => $averageScore,
            'student_growth' => round($studentGrowth, 1),
            'teacher_growth' => round($teacherGrowth, 1),
        ];

        // SCORE DISTRIBUTION CHART
        $scoreDistribution = [
            '0-20' => Student::whereBetween('score', [0, 20])->count(),
            '21-40' => Student::whereBetween('score', [21, 40])->count(),
            '41-60' => Student::whereBetween('score', [41, 60])->count(),
            '61-80' => Student::whereBetween('score', [61, 80])->count(),
            '81-100' => Student::whereBetween('score', [81, 100])->count(),
        ];

        // GENDER DISTRIBUTION CHART
        $genderDistribution = [
            'male' => Student::where('gender', 'male')->count(),
            'female' => Student::where('gender', 'female')->count(),
            'total' => Student::count(),
        ];

        // RECENT STUDENTS
        $recentStudents = Student::latest()->take(5)->get();

        // RECENT TEACHERS
        $recentTeachers = Teacher::latest()->take(5)->get();

        // UPCOMING EVENTS
        $upcomingEvents = Event::where('date', '>=', Carbon::today())
            ->orderBy('date')
            ->orderBy('start_time')
            ->take(5)
            ->get();

        // COURSE STATS
        $courseStats = [
            'active' => Course::where('status', 'active')->count(),
            'archived' => Course::where('status', 'archived')->count(),
            'draft' => Course::where('status', 'draft')->count(),
        ];

        // RETURN TO VIEW
        return Inertia('Dashboard/Index', [
            'stats' => $stats,
            'scoreDistribution' => $scoreDistribution,
            'genderDistribution' => $genderDistribution,
            'recentStudents' => $recentStudents,
            'recentTeachers' => $recentTeachers,
            'upcomingEvents' => $upcomingEvents,
            'courseStats' => $courseStats,
        ]);
    }
}
