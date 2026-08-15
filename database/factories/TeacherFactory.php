<?php

namespace Database\Factories;

use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

class TeacherFactory extends Factory
{
    protected $model = Teacher::class;

    public function definition(): array
    {
        $gender = $this->faker->randomElement(['male', 'female']);
        $firstName = $this->faker->firstName($gender);
        $lastName = $this->faker->lastName();

        $departments = ['Mathematics', 'Science', 'English', 'History', 'Arts', 'Physical Education', 'Computer Science', 'Biology', 'Chemistry', 'Physics'];

        return [
            'name' => $firstName . ' ' . $lastName,
            'email' => $this->faker->unique()->safeEmail(),
            'gender' => $gender,
            'department' => $this->faker->randomElement($departments),
            'experience' => $this->faker->numberBetween(0, 30),
            'phone' => $this->faker->phoneNumber(),
            'address' => $this->faker->optional()->address(),
            'profile_picture' => null,
            'bio' => $this->faker->optional()->sentence(10),
        ];
    }
}
