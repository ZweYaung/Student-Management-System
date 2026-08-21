<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

     protected $fillable = [
        'title',
        'course_name',
        'teacher_name',
        'location',
        'date',
        'start_time',
        'end_time',
        'color',
        'status',
    ];

      protected $casts = [
        'date' => 'date',
        'start_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i',
    ];

    // Get events for a specific date
    public function scopeForDate($query, $date)
    {
        return $query->whereDate('date', $date);
    }

    // Get events for a specific week
    public function scopeForWeek($query, $startDate, $endDate)
    {
        return $query->whereBetween('date', [$startDate, $endDate]);
    }
}
