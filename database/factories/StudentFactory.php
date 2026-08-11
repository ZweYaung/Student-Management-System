<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Student>
 */
class StudentFactory extends Factory
{
    protected $model = Student::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gender = $this->faker->randomElement(['male','female']);
        $name = $this->faker->name($gender);

        return [
            'name' => $name,
            'email' => $this->faker->unique()->safeEmail(),
            'gender' => $gender,
            'score' => $this->faker->numberBetween(0, 100),
        ];
    }
}
