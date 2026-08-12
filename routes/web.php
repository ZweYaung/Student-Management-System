<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::controller(StudentsController::class)->group(function(){
    Route::get('/students','index')->name('students.index');
    Route::post('/students','store')->name('students.store');
    Route::delete('/students/{id}', 'destroy')->name('students.destroy');
    Route::put('/students/{id}','update')->name('students.update');
    // Route::get('students/{name}/{age}','withRouteParameters');
    // Route::get('students/{name?}/{age?}', 'withOptionalRouteParameters');
});

Route::inertia('teachers','Teachers/Index')->name('teachers.index');

Route::fallback(function(){
    return Inertia::render('Errors/NotFound');
});
