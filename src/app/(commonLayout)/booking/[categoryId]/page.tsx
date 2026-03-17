// "use client";

// import { useParams, useSearchParams } from "next/navigation";
// import { useState } from "react";

// export default function BookingPage() {
//     const params = useParams();
//     const searchParams = useSearchParams();

//     const tutorCategoryId = params.categoryId as string;
//     const tutorId = searchParams.get("tutor");

//     const [sessionDate, setSessionDate] = useState("");
//     const [startTime, setStartTime] = useState("");
//     const [endTime, setEndTime] = useState("");

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();

//         const body = {
//             tutorCategoryId,
//             sessionDate,
//             startTime,
//             endTime,
//         };

//         console.log("BOOKING REQUEST:", body);

//         // 👉 later you will call API here
//         // await fetch('/api/booking', { method: 'POST', body: JSON.stringify(body) })
//     };

//     return (
//         <section className="py-20">
//             <div className="max-w-xl mx-auto px-4">
//                 <div className="border rounded-xl p-8 space-y-6 shadow-sm">
//                     <h1 className="text-2xl font-bold text-center">
//                         Book a Session
//                     </h1>

//                     {/* INFO */}
//                     <div className="text-sm text-muted-foreground text-center">
//                         <p>Category ID: {tutorCategoryId}</p>
//                         <p>Tutor ID: {tutorId}</p>
//                     </div>

//                     {/* FORM */}
//                     <form onSubmit={handleSubmit} className="space-y-5">
//                         {/* DATE */}
//                         <div>
//                             <label className="block text-sm mb-1">
//                                 Select Date
//                             </label>
//                             <input
//                                 type="date"
//                                 value={sessionDate}
//                                 onChange={(e) => setSessionDate(e.target.value)}
//                                 required
//                                 className="w-full border rounded-md p-2"
//                             />
//                         </div>

//                         {/* START TIME */}
//                         <div>
//                             <label className="block text-sm mb-1">
//                                 Start Time
//                             </label>
//                             <input
//                                 type="time"
//                                 value={startTime}
//                                 onChange={(e) => setStartTime(e.target.value)}
//                                 required
//                                 className="w-full border rounded-md p-2"
//                             />
//                         </div>

//                         {/* END TIME */}
//                         <div>
//                             <label className="block text-sm mb-1">
//                                 End Time
//                             </label>
//                             <input
//                                 type="time"
//                                 value={endTime}
//                                 onChange={(e) => setEndTime(e.target.value)}
//                                 required
//                                 className="w-full border rounded-md p-2"
//                             />
//                         </div>

//                         {/* SUBMIT */}
//                         <button
//                             type="submit"
//                             className="w-full bg-black text-white py-2 rounded-md"
//                         >
//                             Confirm Booking
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </section>
//     );
// }
"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// 👉 your real data
const availabilityData = [
    {
        id: "ec216c26-13ad-43ca-bb40-d7bb74e88962",
        dayOfWeek: "MON",
        startTime: "1970-01-01T18:00:00.000Z",
        endTime: "1970-01-01T20:00:00.000Z",
        startDate: "2026-01-01T00:00:00.000Z",
        endDate: "2026-06-30T00:00:00.000Z",
        isActive: true,
    },
    {
        id: "7f73c75a-9aa3-4ddc-b667-3ad7eb8aee8d",
        dayOfWeek: "WED",
        startTime: "1970-01-01T16:00:00.000Z",
        endTime: "1970-01-01T18:00:00.000Z",
        startDate: "2026-01-01T00:00:00.000Z",
        endDate: "2026-06-30T00:00:00.000Z",
        isActive: true,
    },
    {
        id: "ba73fe06-cd0c-41df-b77f-90df622fb11a",
        dayOfWeek: "THU",
        startTime: "1970-01-01T16:00:00.000Z",
        endTime: "1970-01-01T18:00:00.000Z",
        startDate: "2026-01-01T00:00:00.000Z",
        endDate: "2026-06-30T00:00:00.000Z",
        isActive: true,
    },
];

export default function BookingPage() {
    const params = useParams();
    const searchParams = useSearchParams();

    const tutorCategoryId = params.categoryId as string;
    const tutorId = searchParams.get("tutor");

    const [sessionDate, setSessionDate] = useState("");
    const [filteredSlots, setFilteredSlots] = useState<any[]>([]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    // 👉 convert ISO → HH:mm
    const formatTime = (iso: string) => {
        const date = new Date(iso);
        return date.toISOString().substring(11, 16);
    };

    // 👉 get day from date
    const getDayOfWeek = (dateStr: string) => {
        const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const date = new Date(dateStr);
        return days[date.getDay()];
    };

    // 👉 filter slots based on date
    useEffect(() => {
        if (!sessionDate) return;

        const selectedDay = getDayOfWeek(sessionDate);

        const filtered = availabilityData.filter((slot) => {
            const slotStart = new Date(slot.startDate);
            const slotEnd = new Date(slot.endDate);
            const selected = new Date(sessionDate);

            return (
                slot.isActive &&
                slot.dayOfWeek === selectedDay &&
                selected >= slotStart &&
                selected <= slotEnd
            );
        });

        setFilteredSlots(filtered);
        setStartTime("");
        setEndTime("");
    }, [sessionDate]);

    // 👉 submit
    const handleSubmit = () => {
        if (!sessionDate || !startTime || !endTime) {
            alert("Please select date and slot");
            return;
        }

        const body = {
            tutorCategoryId,
            sessionDate,
            startTime,
            endTime,
        };

        console.log("BOOKING REQUEST:", body);
    };

    return (
        <section className="py-20">
            <div className="max-w-2xl mx-auto px-4">
                <div className="border rounded-xl p-8 space-y-8 shadow-sm">
                    <h1 className="text-2xl font-bold text-center">
                        Book a Session
                    </h1>

                    {/* DATE */}
                    <div>
                        <label className="block text-sm mb-2">
                            Select Date
                        </label>
                        <input
                            type="date"
                            value={sessionDate}
                            onChange={(e) => setSessionDate(e.target.value)}
                            className="w-full border rounded-md p-2"
                        />
                    </div>

                    {/* SLOTS */}
                    <div className="space-y-3">
                        <h3 className="font-semibold">Available Slots</h3>

                        {filteredSlots.length === 0 ? (
                            <p className="text-sm text-gray-500">
                                No slots available for selected date
                            </p>
                        ) : (
                            <div className="flex flex-wrap gap-3">
                                {filteredSlots.map((slot) => (
                                    <button
                                        key={slot.id}
                                        type="button"
                                        onClick={() => {
                                            setStartTime(
                                                formatTime(slot.startTime),
                                            );
                                            setEndTime(
                                                formatTime(slot.endTime),
                                            );
                                        }}
                                        className={`border px-4 py-2 rounded-md text-sm transition
                      ${
                          startTime === formatTime(slot.startTime)
                              ? "bg-black text-white"
                              : "hover:bg-black hover:text-white"
                      }`}
                                    >
                                        {slot.dayOfWeek} |{" "}
                                        {formatTime(slot.startTime)} -{" "}
                                        {formatTime(slot.endTime)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* SELECTED */}
                    {startTime && (
                        <p className="text-center text-green-600 text-sm">
                            Selected: {startTime} - {endTime}
                        </p>
                    )}

                    {/* SUBMIT */}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-black text-white py-2 rounded-md"
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
        </section>
    );
}
