<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentsController extends Controller
{
    //
    public function index(){
        return Inertia('Students/Index');
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
