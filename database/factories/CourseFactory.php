<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

class CourseFactory extends Factory
{
    protected $model = Course::class;

    public function definition(): array
    {
        $departments = ['Mathematics', 'Science', 'English', 'History', 'Arts', 'Physical Education', 'Computer Science', 'Biology', 'Chemistry', 'Physics'];
        $statuses = ['active', 'archived', 'draft'];
        $prefixes = ['MATH', 'SCI', 'ENG', 'HIST', 'ART', 'PE', 'CS', 'BIO', 'CHEM', 'PHY'];

        return [
            'name' => $this->faker->sentence(3),
            'code' => $this->faker->randomElement($prefixes) . $this->faker->numberBetween(101, 499),
            'description' => $this->faker->paragraph(2),
            'credits' => $this->faker->numberBetween(1, 4),
            'department' => $this->faker->randomElement($departments),
            'status' => $this->faker->randomElement($statuses),
            'max_students' => $this->faker->numberBetween(20, 40),
            'current_students' => $this->faker->numberBetween(0, 30),
        ];
    }
}
