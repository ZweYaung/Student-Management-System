<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Teacher;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        // Create 12 courses
        $courses = Course::factory(12)->create();

        // Attach random teachers to each course
        $teachers = Teacher::all();

        foreach ($courses as $course) {
            // Attach 1-3 random teachers to each course
            $randomTeachers = $teachers->random(rand(1, 3));

            foreach ($randomTeachers as $teacher) {
                $course->teachers()->attach($teacher->id, [
                    'role' => $randomTeachers->first()->id === $teacher->id ? 'primary' : 'assistant',
                ]);
            }
        }
    }
}
