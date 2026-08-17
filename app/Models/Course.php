<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'description',
        'credits',
        'department',
        'status',
        'max_students',
        'current_students',
    ];

    // many-to-many with teachers
    public function teachers()
    {
        return $this->belongsToMany(Teacher::class, 'course_teacher')
                    ->withPivot('role')
                    ->withTimestamps();
    }
}
