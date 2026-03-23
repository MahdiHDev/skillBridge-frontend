"use client";

import { Calendar } from "@/components/ui/calendar";
import { formatTime } from "@/lib/formatTime";
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
    {
        id: "e9882f3a-5150-4bc7-a4ca-83eb259131f5",
        tutorProfileId: "7d7a9ef7-9214-4fc5-a719-102b41b432f6",
        dayOfWeek: "MON",
        startTime: "1970-01-01T16:00:00.000Z",
        endTime: "1970-01-01T18:00:00.000Z",
        startDate: "2026-01-01T00:00:00.000Z",
        endDate: "2026-06-30T00:00:00.000Z",
        isActive: true,
        createdAt: "2026-03-20T19:47:23.179Z",
    },
];

const isDateAvailable = (date: Date) => {
    const dayMap = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const day = dayMap[date.getDay()];

    return availabilityData.some((slot) => {
        const slotStart = new Date(slot.startDate);
        const slotEnd = new Date(slot.endDate);

        return (
            slot.isActive &&
            slot.dayOfWeek === day &&
            date >= slotStart &&
            date <= slotEnd
        );
    });
};

export default function BookingPage() {
    const params = useParams();
    const searchParams = useSearchParams();

    const tutorCategoryId = params.categoryId as string;
    const tutorId = searchParams.get("tutor");

    const [sessionDate, setSessionDate] = useState("");
    const [filteredSlots, setFilteredSlots] = useState<any[]>([]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const [date, setDate] = useState<Date | undefined>(new Date());

    const formatDateLocal = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
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
        <section className="py-20 dark:bg-[#09090b]">
            <div className="max-w-2xl mx-auto px-4">
                <div className="md:border rounded-xl p-8 space-y-8 md:shadow-sm dark:bg-[#1e1e22]">
                    <h1 className="text-2xl font-bold text-center">
                        Book a Session
                    </h1>

                    {/* <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-lg border w-1/2 mx-auto"
                    /> */}

                    <Calendar
                        mode="single"
                        className="rounded-lg border w-full sm:w-2/3 mx-auto "
                        selected={
                            sessionDate ? new Date(sessionDate) : undefined
                        }
                        onSelect={(date) => {
                            if (!date) return;

                            if (!isDateAvailable(date)) return;
                            setSessionDate(formatDateLocal(date));
                        }}
                        disabled={(date) => !isDateAvailable(date)}
                        modifiers={{
                            available: (date) => isDateAvailable(date),
                        }}
                        modifiersClassNames={{
                            available: " font-bold text-green-500",
                        }}
                    />

                    {/* SLOTS */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-center">
                            Available Slots
                        </h3>

                        {filteredSlots.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center">
                                No slots available for selected date
                            </p>
                        ) : (
                            <div className="flex flex-wrap justify-center gap-3">
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

// return (
//   <Calendar
//     mode="single"
//     selected={date}
//     onSelect={setDate}
//     className="rounded-lg border"
//   />
// )
