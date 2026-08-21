<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();

            // Event details
            $table->string('title');
            $table->string('course_name')->nullable();
            $table->string('teacher_name')->nullable();
            $table->string('location')->nullable();

            // Date and time
            $table->date('date');
            $table->time('start_time');
            $table->time('end_time')->nullable();

            // Color coding
            $table->string('color')->default('blue');

            // Status tracking
            $table->enum('status', ['scheduled', 'ongoing', 'completed', 'cancelled'])->default('scheduled');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
