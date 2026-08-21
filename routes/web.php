<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\StudentsController;
use App\Http\Controllers\TeacherController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::redirect('/','login');

Route::middleware('auth')->group(function (){
    Route::controller(ProfileController::class)->group(function(){
        Route::get('/profile','index')->name('profile.index');
        Route::get('/profile/edit','edit')->name('profile.edit');
        Route::patch('/profile','update')->name('profile.update');
        Route::delete('/profile','destroy')->name('profile.destroy');
        Route::put('/profile/password','updatePassword')->name('profile.updatePassword');
    });

    Route::controller(DashboardController::class)->group(function(){
        Route::get('/dashboard','index')->name('dashboard.index');
    });

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

    Route::controller(CourseController::class)->group(function(){
        Route::get('/courses','index')->name('courses.index');
        Route::post('/courses','store')->name('courses.store');
        Route::delete('/courses/{id}', 'destroy')->name('courses.destroy');
        Route::put('/courses/{id}','update')->name('courses.update');
    });

    Route::controller(ScheduleController::class)->group(function(){
        Route::get('/schedule','index')->name('schedule.index');
        Route::post('/schedule','store')->name('schedule.store');
        Route::delete('/schedule/{id}', 'destroy')->name('schedule.destroy');
        Route::put('/schedule/{id}','update')->name('schedule.update');
    });
});

// Route::inertia('teachers','Teachers/Index')->name('teachers.index');

// Route::fallback(function(){
//     return Inertia::render('Errors/NotFound');
// });

require __DIR__.'/auth.php';
