<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Helpers\NotificationHelper;

class ScheduleController extends Controller
{
    public function index(Request $request)
    {
        // Get current week
        $currentDate = Carbon::now();
        if ($request->filled('week')) {
            $currentDate = Carbon::parse($request->week);
        }

        $startOfWeek = $currentDate->copy()->startOfWeek(Carbon::MONDAY);
        $endOfWeek = $currentDate->copy()->endOfWeek(Carbon::SUNDAY);

        // Get events for the week
        $events = Event::whereBetween('date', [$startOfWeek, $endOfWeek])
            ->orderBy('date')
            ->orderBy('start_time')
            ->get();

        // Group events by day using Carbon comparison
        $eventsByDay = [];
        for ($date = $startOfWeek->copy(); $date <= $endOfWeek; $date->addDay()) {
            $dateString = $date->format('Y-m-d');
            $eventsByDay[$dateString] = $events->filter(function ($event) use ($dateString) {
                // Convert event date to string for comparison
                $eventDate = $event->date instanceof Carbon
                    ? $event->date->format('Y-m-d')
                    : Carbon::parse($event->date)->format('Y-m-d');
                return $eventDate === $dateString;
            })->values();
        }

        // Stats
        $today = Carbon::now()->format('Y-m-d');
        $todayEvents = $events->filter(function ($event) use ($today) {
            $eventDate = $event->date instanceof Carbon
                ? $event->date->format('Y-m-d')
                : Carbon::parse($event->date)->format('Y-m-d');
            return $eventDate === $today;
        });

        $weekEvents = $events;
        $upcomingEvents = $events->filter(function ($event) {
            $eventDate = $event->date instanceof Carbon
                ? $event->date->format('Y-m-d')
                : Carbon::parse($event->date)->format('Y-m-d');
            return $eventDate >= Carbon::now()->format('Y-m-d') && $event->status !== 'completed';
        });
        $completedEvents = $events->filter(function ($event) {
            return $event->status === 'completed';
        });

        $stats = [
            'today' => $todayEvents->count(),
            'week' => $weekEvents->count(),
            'upcoming' => $upcomingEvents->count(),
            'completed' => $completedEvents->count(),
        ];

        return Inertia('Schedule/Index', [
            'events' => $events,
            'eventsByDay' => $eventsByDay,
            'stats' => $stats,
            'weekRange' => [
                'start' => $startOfWeek->format('M d'),
                'end' => $endOfWeek->format('M d, Y'),
            ],
            'currentWeek' => $currentDate->format('Y-m-d'),
            'weekNumber' => $currentDate->weekOfYear,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'course_name' => 'nullable|string|max:255',
            'teacher_name' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'nullable',
            'color' => 'nullable|string|max:20',
            'status' => 'nullable|in:scheduled,ongoing,completed,cancelled',
        ]);

        Event::create($validated);

        return redirect()->back()->with('success', 'Event added successfully!');
    }

    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'course_name' => 'nullable|string|max:255',
            'teacher_name' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'nullable',
            'color' => 'nullable|string|max:20',
            'status' => 'nullable|in:scheduled,ongoing,completed,cancelled',
        ]);

        $event->update($validated);

        return redirect()->back()->with('success', 'Event updated successfully!');
    }

    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();

        return redirect()->back()->with('success', 'Event deleted successfully!');
    }
}
