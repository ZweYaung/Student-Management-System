// database/migrations/xxxx_xx_xx_create_courses_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();

            // Course Information
            $table->string('name');
            $table->string('code')->unique();
            $table->text('description')->nullable();

            // Course Details
            $table->integer('credits')->default(3);
            $table->string('department')->nullable();

            // Status
            $table->enum('status', ['active', 'archived', 'draft'])->default('active');

            // Enrollment
            $table->integer('max_students')->default(30);
            $table->integer('current_students')->default(0)->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
