"use client";

import { Textarea } from "@/components/ui/textarea";
import { useMySessions } from "@/hooks/use-Booking";
import { formatDate } from "@/lib/dateFormat";
import { TweleveFormatTime } from "@/lib/formatTime";
import { Rate } from "antd";
import { useState } from "react";

export default function MySessionsPage() {
    const { data: mySessionsData, isLoading } = useMySessions();
    const sessions: any[] = mySessionsData?.data ?? [];

    // const [sessions, setSessions] = useState<any[]>([]);
    const [reviews, setReviews] = useState<{ [key: string]: string }>({}); // sessionId -> review
    const [rating, setRating] = useState(0);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "COMPLETED":
                return "bg-green-100 text-green-700";
            case "PENDING":
                return "bg-yellow-100 text-yellow-700";
            case "CANCELLED":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const handleReviewChange = (sessionId: string, value: string) => {
        setReviews((prev) => ({ ...prev, [sessionId]: value }));
    };

    const handleChange = (value: number) => {
        console.log("Selected rating:", value);
        setRating(value); // update state
    };

    const submitReview = (sessionId: string) => {
        const reviewText = reviews[sessionId];
        if (!reviewText) return alert("Please write a review first!");

        // 👉 Replace this with your API call
        console.log("Submitting review for session", sessionId, reviewText);
        alert("Review submitted! ✅");

        // Optionally clear the review input
        setReviews((prev) => ({ ...prev, [sessionId]: "" }));
    };

    if (isLoading) {
        return (
            <div className="py-20">
                <p className="text-center text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <section className="py-20">
            <div className="max-w-5xl mx-auto px-4 space-y-8">
                <h1 className="text-3xl font-bold text-center">My Sessions</h1>

                {sessions.length === 0 ? (
                    <p className="text-center text-muted-foreground">
                        No bookings yet
                    </p>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {sessions.map((session) => (
                            <div
                                key={session.id}
                                className="border rounded-xl p-6 space-y-4 shadow-sm bg-white dark:bg-[#141414]"
                            >
                                {/* SUBJECT */}
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Subject
                                    </p>
                                    <p className="font-semibold">
                                        {session.tutorCategory.subject.name}
                                    </p>
                                </div>

                                {/* TUTOR */}
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Tutor
                                    </p>
                                    <p className="font-semibold">
                                        {
                                            session.tutorCategory.tutorProfile
                                                .user.name
                                        }
                                    </p>
                                </div>

                                {/* DATE + TIME */}
                                <div className="flex justify-between text-sm">
                                    <div>
                                        <p className="text-gray-500">Date</p>
                                        <p>{formatDate(session.sessionDate)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Time</p>
                                        <p>
                                            {TweleveFormatTime(
                                                session.startTime,
                                            )}{" "}
                                            -{" "}
                                            {TweleveFormatTime(session.endTime)}
                                        </p>
                                    </div>
                                </div>

                                {/* PRICE + STATUS */}
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">
                                        ${session.price}
                                    </p>
                                    <span
                                        className={`text-xs px-3 py-1 rounded-full ${getStatusColor(session.status)}`}
                                    >
                                        {session.status}
                                    </span>
                                </div>

                                {/* MEETING LINK */}
                                {session.meetingLink ? (
                                    <a
                                        href={session.meetingLink}
                                        target="_blank"
                                        className="block text-center bg-black text-white py-2 rounded-md text-sm"
                                    >
                                        Join Meeting
                                    </a>
                                ) : (
                                    <p className="text-center text-gray-500">
                                        No meeting link provided
                                    </p>
                                )}

                                {/* REVIEW FORM (only for COMPLETED sessions) */}
                                {session.status === "COMPLETED" && (
                                    <div className="mt-4">
                                        <Rate
                                            onChange={handleChange}
                                            value={rating}
                                        />
                                        <Textarea
                                            value={reviews[session.id] || ""}
                                            onChange={(e) =>
                                                handleReviewChange(
                                                    session.id,
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Leave a review for your tutor..."
                                            className="w-full border rounded-md p-2 text-sm mt-2"
                                        />
                                        <button
                                            onClick={() =>
                                                submitReview(session.id)
                                            }
                                            className="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm cursor-pointer"
                                        >
                                            Submit Review
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
