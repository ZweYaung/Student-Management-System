<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentsController extends Controller
{
    //
    public function index(Request $request){
        $query = Student::query();

        // Search by name or email
        if($request->filled('search')){
            $query->where('name', 'LIKE', "%{$request->search}%")
                ->orWhere('email', 'LIKE', "%{$request->search}%");
        }

        // Filter by gender
        if($request->filled('gender') && $request->gender !== 'all'){
            $query->where('gender', $request->gender);
        }

        // Filter by score range
        if($request->filled('score_range')){
            $ranges = [
                '0-20' => [0, 20],
                '21-40' => [21, 40],
                '41-60' => [41, 60],
                '61-80' => [61, 80],
                '81-100' => [81, 100],
            ];

            if(isset($ranges[$request->score_range])){
                [$min, $max] = $ranges[$request->score_range];
                $query->whereBetween('score', [$min, $max]);
            }
        }

        $students = $query->paginate(5);

        return Inertia('Students/Index',[
            'students' => $students,
            'filters' => $request->only(['search', 'gender', 'score_range']),
        ]);
    }

    public function withData(){
        return Inertia('Students/Index',[
            'name' => "John",
            'age' => 2000
        ]);
    }

    public function withRouteParameters($name, $age){
        return inertia('Students/Index',[
            'name' => $name,
            'age' => $age
        ]);
    }

    public function withOptionalRouteParameters($name="Guest", $age=30){
        return inertia('Students/Index',[
             'name' => $name,
            'age' => $age
        ]);
    }
}
