export const tutors = [
    {
        id: "1",
        bio: "Senior Software Engineer with 10 years of experience in fullstack development and cloud architecture.",
        averageRating: 4.8,
        totalReviews: 25,
        status: "APPROVED",
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
        reviews: [
            {
                id: "c14ab090-f5f4-4646-9788-7ed31ad33409",
                bookingId: "da35ffa7-ab8f-405e-bbc1-cc7960ac7a16",
                studentId: "kQJgF4fr3c28moaJbWbNSL1SOpjV1k7j",
                tutorProfileId: "7d7a9ef7-9214-4fc5-a719-102b41b432f6",
                rating: 4,
                comment:
                    " i like this teacher lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                createdAt: "2026-03-15T22:53:03.063Z",
                student: {
                    id: "kQJgF4fr3c28moaJbWbNSL1SOpjV1k7j",
                    name: "Asjad Hussain",
                },
            },
            {
                id: "c14ab090-f5f4-4646-9788-7ed31ad33409",
                bookingId: "da35ffa7-ab8f-405e-bbc1-cc7960ac7a16",
                studentId: "kQJgF4fr3c28moaJbWbNSL1SOpjV1k7j",
                tutorProfileId: "7d7a9ef7-9214-4fc5-a719-102b41b432f6",
                rating: 3,
                comment: "i like this teacher",
                createdAt: "2026-03-15T22:53:03.063Z",
                student: {
                    id: "kQJgF4fr3c28moaJbWbNSL1SOpjV1k7j",
                    name: "Mahdi Hussain",
                },
            },
            {
                id: "c14ab090-f5f4-4646-9788-7ed31ad33409",
                bookingId: "da35ffa7-ab8f-405e-bbc1-cc7960ac7a16",
                studentId: "kQJgF4fr3c28moaJbWbNSL1SOpjV1k7j",
                tutorProfileId: "7d7a9ef7-9214-4fc5-a719-102b41b432f6",
                rating: 3,
                comment: "i like this teacher",
                createdAt: "2026-03-15T22:53:03.063Z",
                student: {
                    id: "kQJgF4fr3c28moaJbWbNSL1SOpjV1k7j",
                    name: "Mahdi Hussain",
                },
            },
            {
                id: "c14ab090-f5f4-4646-9788-7ed31ad33409",
                bookingId: "da35ffa7-ab8f-405e-bbc1-cc7960ac7a16",
                studentId: "kQJgF4fr3c28moaJbWbNSL1SOpjV1k7j",
                tutorProfileId: "7d7a9ef7-9214-4fc5-a719-102b41b432f6",
                rating: 3,
                comment: "i like this teacher",
                createdAt: "2026-03-15T22:53:03.063Z",
                student: {
                    id: "kQJgF4fr3c28moaJbWbNSL1SOpjV1k7j",
                    name: "Mahdi Hussain",
                },
            },
        ],
    },

    {
        id: "2",
        bio: "Math tutor with strong background in calculus and algebra.",
        averageRating: 4.5,
        totalReviews: 18,
        status: "APPROVED",
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
        status: "APPROVED",
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
