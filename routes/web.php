<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentsController;
use App\Http\Controllers\TeacherController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::controller(StudentsController::class)->group(function(){
    Route::get('/students','index')->name('students.index');
    Route::post('/students','store')->name('students.store');
    Route::delete('/students/{id}', 'destroy')->name('students.destroy');
    Route::put('/students/{id}','update')->name('students.update');
});

Route::controller(TeacherController::class)->group(function(){
    Route::get('/teachers','index')->name('teachers.index');
    Route::post('/teachers','store')->name('teachers.store');
    Route::delete('/teachers/{id}', 'destroy')->name('teachers.destroy');
    Route::put('/teachers/{id}','update')->name('teachers.update');
});

// Route::inertia('teachers','Teachers/Index')->name('teachers.index');

Route::fallback(function(){
    return Inertia::render('Errors/NotFound');
});
