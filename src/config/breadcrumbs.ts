export const breadcrumbMap: Record<
    string,
    { parent?: { label: string; href: string }; label: string }
> = {
    "/dashboard": { label: "Dashboard" },
    "/dashboard/users": {
        parent: { label: "User Management", href: "#" },
        label: "All Users",
    },
    "/dashboard/tutors": {
        parent: { label: "User Management", href: "#" },
        label: "All Tutors",
    },
    "/dashboard/subjects": {
        parent: { label: "Content", href: "#" },
        label: "Subjects",
    },
    "/dashboard/bookings": {
        parent: { label: "Bookings", href: "#" },
        label: "All Bookings",
    },
    "/dashboard/bookings/upcoming": {
        parent: { label: "Bookings", href: "/dashboard/bookings" },
        label: "Upcoming",
    },
    "/dashboard/profile": {
        parent: { label: "Profile", href: "#" },
        label: "My Profile",
    },
    "/dashboard/availability": {
        parent: { label: "Profile", href: "#" },
        label: "Availability",
    },
    "/dashboard/sessions": {
        parent: { label: "Profile", href: "#" },
        label: "Sessions",
    },
    "/dashboard/reviews": {
        parent: { label: "Reviews", href: "#" },
        label: "My Reviews",
    },
};
