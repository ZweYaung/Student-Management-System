<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            
            // Personal Information
            $table->string('name');
            $table->string('email')->unique();
            $table->enum('gender', ['male', 'female']);
            $table->integer('score')->default(0);
            $table->string('phone')->nullable();
            $table->date('date_of_birth')->nullable();
            
            // Academic
            $table->string('grade')->nullable();
            $table->string('section')->nullable();
            
            // Address
            $table->text('address')->nullable();
            
            // Guardian
            $table->string('guardian_name')->nullable();
            $table->string('guardian_phone')->nullable();
            $table->string('guardian_email')->nullable();
            
            // Metadata
            $table->date('admission_date')->nullable();
            $table->string('academic_year')->nullable();
            $table->string('profile_picture')->nullable();
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};