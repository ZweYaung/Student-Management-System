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
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            // Personal Information
            $table->string('name');
            $table->string('email')->unique();
            $table->enum('gender', ['male', 'female']);

            // Professional Information
            $table->string('department')->nullable();
            $table->integer('experience')->default(0); // Years of experience

            // Contact
            $table->string('phone')->nullable();
            $table->text('address')->nullable();

            // Additional
            $table->string('profile_picture')->nullable();
            $table->text('bio')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
