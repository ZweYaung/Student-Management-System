<?php

namespace Database\Factories;

use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    protected $model = Event::class;

    public function definition(): array
    {
        $courses = ['Mathematics 101', 'Physics 201', 'Art History', 'Physical Education', 'Calculus II', 'Chemistry 101', 'World Literature', 'Computer Science 101'];
        $teachers = ['Dr. Sarah Johnson', 'Prof. Michael Chen', 'Ms. Emily Rodriguez', 'Mr. David Thompson', 'Dr. Lisa Martinez', 'Dr. Robert Wilson', 'Prof. Amanda Brown'];
        $colors = ['blue', 'green', 'purple', 'amber', 'pink', 'emerald', 'red', 'indigo'];
        $locations = ['Room 101', 'Room 201', 'Room 301', 'Room 104', 'Room 305', 'Gym', 'Lab A', 'Lab B'];

        $date = $this->faker->dateTimeBetween('-1 week', '+2 weeks');
        $startHour = $this->faker->numberBetween(8, 16);
        $startTime = $startHour . ':00';
        $endTime = ($startHour + 1) . ':30';

        return [
            'title' => $this->faker->randomElement($courses),
            'course_name' => $this->faker->randomElement($courses),
            'teacher_name' => $this->faker->randomElement($teachers),
            'location' => $this->faker->randomElement($locations),
            'date' => $date->format('Y-m-d'),
            'start_time' => $startTime,
            'end_time' => $endTime,
            'color' => $this->faker->randomElement($colors),
            'status' => $this->faker->randomElement(['scheduled', 'completed']),
        ];
    }
}
