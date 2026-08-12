<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

class StudentFactory extends Factory
{
    protected $model = Student::class;

    public function definition(): array
    {
        $gender = $this->faker->randomElement(['male', 'female']);

        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'gender' => $gender,
            'score' => $this->faker->numberBetween(0, 100),
            'phone' => $this->faker->phoneNumber(),
            'date_of_birth' => $this->faker->date(),
            'grade' => $this->faker->randomElement(['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']),
            'section' => $this->faker->randomElement(['A', 'B', 'C']),
            'address' => $this->faker->address(),
            'guardian_name' => $this->faker->name(),
            'guardian_phone' => $this->faker->phoneNumber(),
            'guardian_email' => $this->faker->safeEmail(),
            'admission_date' => $this->faker->date(),
            'academic_year' => $this->faker->randomElement(['2023-2024', '2024-2025', '2025-2026']),
            'profile_picture' => null,
        ];
    }
}