<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::controller(StudentsController::class)->group(function(){
    Route::get('students','index')->name('students.index');
    // Route::get('students','withData');
    // Route::get('students/{name}/{age}','withRouteParameters');
    // Route::get('students/{name?}/{age?}', 'withOptionalRouteParameters');
});

Route::inertia('teachers','Teachers/Index')->name('teachers.index');

Route::fallback(function(){
    return Inertia::render('Errors/NotFound');
});
