"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const tutors = [
    {
        id: "1",
        bio: "Senior Software Engineer with 10 years of experience in fullstack development and cloud architecture.",
        averageRating: 4.8,
        totalReviews: 25,
        user: {
            id: "u1",
            name: "Mahdi Hussain",
            email: "mahdi@example.com",
            role: "TUTOR",
            image: null,
        },
        tutorCategories: [
            {
                id: "c1",
                hourlyRate: 45,
                experienceYears: 4,
                level: "BEGINNER",
                subject: {
                    id: "s1",
                    name: "Docker",
                    slug: "docker",
                },
            },
            {
                id: "c2",
                hourlyRate: 65,
                experienceYears: 5,
                level: "ADVANCED",
                subject: {
                    id: "s2",
                    name: "Kubernetes",
                    slug: "kubernetes",
                },
            },
        ],
    },

    {
        id: "2",
        bio: "Math tutor with strong background in calculus and algebra.",
        averageRating: 4.5,
        totalReviews: 18,
        user: {
            id: "u2",
            name: "Sarah Ahmed",
            email: "sarah@example.com",
            role: "TUTOR",
            image: null,
        },
        tutorCategories: [
            {
                id: "c3",
                hourlyRate: 30,
                experienceYears: 3,
                level: "INTERMEDIATE",
                subject: {
                    id: "s3",
                    name: "Mathematics",
                    slug: "mathematics",
                },
            },
        ],
    },

    {
        id: "3",
        bio: "Professional English tutor helping students improve communication skills.",
        averageRating: 4.9,
        totalReviews: 40,
        user: {
            id: "u3",
            name: "David Smith",
            email: "david@example.com",
            role: "TUTOR",
            image: null,
        },
        tutorCategories: [
            {
                id: "c4",
                hourlyRate: 25,
                experienceYears: 6,
                level: "BEGINNER",
                subject: {
                    id: "s4",
                    name: "English",
                    slug: "english",
                },
            },
        ],
    },
];

export default function TutorsPage() {
    const [search, setSearch] = useState("");
    const [subject, setSubject] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [status, setStatus] = useState("");

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);

    /* SUBJECT LIST */
    const subjects = Array.from(
        new Set(
            tutors.flatMap((t) => t.tutorCategories.map((c) => c.subject.name)),
        ),
    );

    /* FILTER LOGIC */
    const filteredTutors = useMemo(() => {
        return tutors.filter((tutor) => {
            const category = tutor.tutorCategories[0];

            const matchesSearch = tutor.user.name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesSubject =
                !subject || category.subject.name === subject;

            const matchesStatus = !status || tutor.status === status;

            const matchesMin =
                !minPrice || category.hourlyRate >= Number(minPrice);

            const matchesMax =
                !maxPrice || category.hourlyRate <= Number(maxPrice);

            return (
                matchesSearch &&
                matchesSubject &&
                matchesStatus &&
                matchesMin &&
                matchesMax
            );
        });
    }, [search, subject, status, minPrice, maxPrice]);

    /* PAGINATION */
    const totalPages = Math.ceil(filteredTutors.length / limit);

    const paginatedTutors = filteredTutors.slice(
        (page - 1) * limit,
        page * limit,
    );

    return (
        <section className="py-20">
            <div className="container max-w-7xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8">Browse Tutors</h1>

                {/* FILTERS */}
                <div className="grid md:grid-cols-5 gap-4 mb-10">
                    <Input
                        placeholder="Search tutor"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        className="border rounded-md px-3"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    >
                        <option value="">All Subjects</option>
                        {subjects.map((sub) => (
                            <option key={sub}>{sub}</option>
                        ))}
                    </select>

                    <Input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />

                    <Input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />

                    <select
                        className="border rounded-md px-3"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="APPROVED">Approved</option>
                        <option value="PENDING">Pending</option>
                    </select>
                </div>

                {/* TUTORS GRID */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedTutors.map((tutor) => {
                        const category = tutor.tutorCategories[0];

                        return (
                            <Card key={tutor.id}>
                                <CardHeader className="flex flex-row items-center gap-3">
                                    <Avatar>
                                        <AvatarFallback>
                                            {tutor.user.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <h3 className="font-semibold">
                                            {tutor.user.name}
                                        </h3>

                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                                            {tutor.averageRating}
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-3">
                                    <Badge>{category.subject.name}</Badge>

                                    <p className="text-sm text-muted-foreground">
                                        ${category.hourlyRate} / hour
                                    </p>

                                    <p className="text-sm line-clamp-2">
                                        {tutor.bio}
                                    </p>

                                    <Button asChild className="w-full">
                                        <Link href={`/tutors/${tutor.id}`}>
                                            View Profile
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t pt-6">
                    {/* LIMIT CONTROL */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                            Results per page
                        </span>

                        <Select
                            value={String(limit)}
                            onValueChange={(value) => {
                                setLimit(Number(value));
                                setPage(1);
                            }}
                        >
                            <SelectTrigger className="w-[120px]">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                {[1, 3, 5, 10, 20].map((opt) => (
                                    <SelectItem key={opt} value={String(opt)}>
                                        {opt}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* PAGINATION */}
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </Button>

                        <span className="text-sm text-muted-foreground">
                            Page <span className="font-medium">{page}</span> of{" "}
                            <span className="font-medium">{totalPages}</span>
                        </span>

                        <Button
                            variant="outline"
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
