<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'gender',
        'score',
        'phone',
        'date_of_birth',
        'grade',
        'section',
        'address',
        'guardian_name',
        'guardian_phone',
        'guardian_email',
        'admission_date',
        'academic_year',
        'profile_picture',
    ];
}