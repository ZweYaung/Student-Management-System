<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\CourseSeeder;
use Database\Seeders\EventSeeder;
use Database\Seeders\StudentSeeder;
use Database\Seeders\TeacherSeeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            StudentSeeder::class,
            TeacherSeeder::class,
            CourseSeeder::class,
            EventSeeder::class,
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => '1*testingAcc'
        ]);
    }
}
