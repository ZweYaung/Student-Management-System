import { Link, router } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import AddEventModal from "@/Components/AddEventModal";
import DeleteEventModal from "@/Components/DeleteEventModal";
import { useState } from "react";

export default function Schedule({
    events,
    eventsByDay,
    stats,
    weekRange,
    currentWeek,
    weekNumber,
}) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventToDelete, setEventToDelete] = useState(null);

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const dateObj = new Date(currentWeek);
    const today = new Date().toISOString().split("T")[0];

    console.log("All events:", events);
    console.log("Events by day:", eventsByDay);
    console.log("Stats:", stats);

    const goToPreviousWeek = () => {
        const newDate = new Date(dateObj);
        newDate.setDate(newDate.getDate() - 7);
        router.get("/schedule", { week: newDate.toISOString().split("T")[0] });
    };

    const goToNextWeek = () => {
        const newDate = new Date(dateObj);
        newDate.setDate(newDate.getDate() + 7);
        router.get("/schedule", { week: newDate.toISOString().split("T")[0] });
    };

    const goToToday = () => {
        router.get("/schedule");
    };

    const handleSuccess = () => {
        window.location.reload();
    };

    const openEditModal = (event) => {
        setSelectedEvent(event);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (event) => {
        setEventToDelete(event);
        setIsDeleteModalOpen(true);
    };

    const getColorClasses = (color) => {
        const colors = {
            blue: "bg-blue-100 text-blue-700 border-l-2 border-blue-500 hover:bg-blue-200",
            green: "bg-green-100 text-green-700 border-l-2 border-green-500 hover:bg-green-200",
            purple: "bg-purple-100 text-purple-700 border-l-2 border-purple-500 hover:bg-purple-200",
            amber: "bg-amber-100 text-amber-700 border-l-2 border-amber-500 hover:bg-amber-200",
            pink: "bg-pink-100 text-pink-700 border-l-2 border-pink-500 hover:bg-pink-200",
            emerald:
                "bg-emerald-100 text-emerald-700 border-l-2 border-emerald-500 hover:bg-emerald-200",
            red: "bg-red-100 text-red-700 border-l-2 border-red-500 hover:bg-red-200",
            indigo: "bg-indigo-100 text-indigo-700 border-l-2 border-indigo-500 hover:bg-indigo-200",
        };
        return colors[color] || colors.blue;
    };

    return (
        <DashboardLayout title="Schedule" subtitle={`Week ${weekNumber}`}>
            <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 card-hover hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Today's Classes
                                </p>
                                <p className="text-2xl font-bold text-slate-800 mt-1">
                                    {stats.today}
                                </p>
                            </div>
                            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-lg">
                                <i className="fas fa-calendar-day"></i>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs">
                            <span className="text-slate-400">
                                Scheduled for today
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 card-hover hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    This Week
                                </p>
                                <p className="text-2xl font-bold text-slate-800 mt-1">
                                    {stats.week}
                                </p>
                            </div>
                            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-lg">
                                <i className="fas fa-calendar-week"></i>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs">
                            <span className="text-slate-400">
                                Total classes this week
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 card-hover hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Upcoming
                                </p>
                                <p className="text-2xl font-bold text-slate-800 mt-1">
                                    {stats.upcoming}
                                </p>
                            </div>
                            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center text-lg">
                                <i className="fas fa-clock"></i>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs">
                            <span className="text-slate-400">
                                Not yet completed
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 card-hover hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Completed
                                </p>
                                <p className="text-2xl font-bold text-slate-800 mt-1">
                                    {stats.completed}
                                </p>
                            </div>
                            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center text-lg">
                                <i className="fas fa-check-double"></i>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs">
                            <span className="text-slate-400">
                                Finished classes
                            </span>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={goToPreviousWeek}
                            className="p-2 text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg transition hover:bg-slate-50"
                        >
                            <i className="fas fa-chevron-left text-sm"></i>
                        </button>
                        <span className="text-sm font-medium text-slate-700">
                            {weekRange.start} – {weekRange.end}
                        </span>
                        <button
                            onClick={goToNextWeek}
                            className="p-2 text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg transition hover:bg-slate-50"
                        >
                            <i className="fas fa-chevron-right text-sm"></i>
                        </button>
                        <button
                            onClick={goToToday}
                            className="ml-2 text-sm text-blue-600 hover:text-blue-800 font-medium border border-blue-200 rounded-lg px-3 py-1.5 hover:bg-blue-50 transition"
                        >
                            Today
                        </button>
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 shadow-sm shadow-blue-600/20 transition flex items-center gap-2"
                    >
                        <i className="fas fa-plus"></i> Add Event
                    </button>
                </div>

                {/* Calendar Grid */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden">
                    <div className="grid grid-cols-7 border-b border-slate-200/80">
                        {days.map((day) => (
                            <div
                                key={day}
                                className="p-3 text-center text-xs font-semibold text-slate-500 uppercase"
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 divide-x divide-slate-200/80">
                        {Object.keys(eventsByDay).map((dateKey) => {
                            const dayEvents = eventsByDay[dateKey] || [];
                            const dateObj = new Date(dateKey);
                            const dayNumber = dateObj.getDate();
                            const isToday = dateKey === today;
                            const isWeekend =
                                dateObj.getDay() === 0 ||
                                dateObj.getDay() === 6;

                            return (
                                <div
                                    key={dateKey}
                                    className={`min-h-[120px] p-2 ${isToday ? "bg-blue-50" : ""} ${isWeekend ? "bg-slate-50" : ""}`}
                                >
                                    <p
                                        className={`text-xs font-medium mb-1 ${isToday ? "text-blue-600" : "text-slate-600"}`}
                                    >
                                        {dayNumber}
                                    </p>
                                    <div className="space-y-1">
                                        {dayEvents.slice(0, 3).map((event) => (
                                            <div
                                                key={event.id}
                                                className={`text-[10px] p-1 rounded truncate cursor-pointer ${getColorClasses(event.color)}`}
                                                title={`${event.start_time} - ${event.title}`}
                                                onClick={() =>
                                                    openEditModal(event)
                                                }
                                            >
                                                {event.start_time} {event.title}
                                            </div>
                                        ))}
                                        {dayEvents.length > 3 && (
                                            <div className="text-[10px] text-slate-400 font-medium">
                                                +{dayEvents.length - 3} more
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Upcoming Classes List */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 card-hover">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <i className="fas fa-clock text-blue-500"></i>
                            Upcoming Classes
                        </h2>
                    </div>
                    <ul className="space-y-2">
                        {events
                            .filter((e) => e.status !== "completed")
                            .slice(0, 5)
                            .map((event) => (
                                <li
                                    key={event.id}
                                    className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition group"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-medium text-slate-600 w-20">
                                            {event.start_time}
                                        </span>
                                        <span className="text-sm font-medium text-slate-800">
                                            {event.title}
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            {event.teacher_name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                            {event.location || "TBD"}
                                        </span>
                                        <span className="text-xs text-slate-400">
                                            {event.date === today
                                                ? "Today"
                                                : event.date}
                                        </span>
                                        <button
                                            onClick={() => openEditModal(event)}
                                            className="text-slate-400 hover:text-amber-600 transition opacity-0 group-hover:opacity-100"
                                        >
                                            <i className="fas fa-edit text-xs"></i>
                                        </button>
                                        <button
                                            onClick={() =>
                                                openDeleteModal(event)
                                            }
                                            className="text-slate-400 hover:text-red-600 transition opacity-0 group-hover:opacity-100"
                                        >
                                            <i className="fas fa-trash-alt text-xs"></i>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        {events.filter((e) => e.status !== "completed")
                            .length === 0 && (
                            <li className="text-center text-slate-500 py-4 text-sm">
                                No upcoming classes
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Add Event Modal */}
            <AddEventModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={handleSuccess}
            />

            {/* Edit Event Modal */}
            <AddEventModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedEvent(null);
                }}
                onSuccess={handleSuccess}
                mode="edit"
                eventData={selectedEvent}
            />

            {/* Delete Event Modal */}
            <DeleteEventModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setEventToDelete(null);
                }}
                onSuccess={handleSuccess}
                eventId={eventToDelete?.id}
                eventTitle={eventToDelete?.title}
            />
        </DashboardLayout>
    );
}
