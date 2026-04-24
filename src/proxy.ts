// import { NextRequest, NextResponse } from "next/server";
// import { Roles } from "./constants/roles";
// import { userService } from "./services/user.service";

// export async function proxy(request: NextRequest) {
//     const pathname = request.nextUrl.pathname;

//     let isAuthenticated = false;
//     let isAdmin = false;

//     const { data } = await userService.getSession();

//     if (data) {
//         isAuthenticated = true;
//         isAdmin = data.user.role === Roles.admin;
//     }

//     //* User in not authenticated at all
//     if (!isAuthenticated) {
//         return NextResponse.redirect(new URL("/login", request.url));
//     }

//     return NextResponse.next();
// }

// export const config = {
//     matcher: [
//         "/dashboard",
//         "/dashboard/:path*",
//         "/admin-dashboard",
//         "/admin-dashboard/:path*",
//         "/booking/:path*",
//     ],
// };

import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    let isAuthenticated = false;
    let isAdmin = false;
    let isTutor = false;

    try {
        const sessionRes = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/get-session`,
            {
                headers: {
                    cookie: request.headers.get("cookie") ?? "",
                },
            },
        );

        const session = await sessionRes.json();

        if (session?.user) {
            isAuthenticated = true;
            isAdmin = session.user.role === Roles.admin;
            isTutor = session.user.role === Roles.tutor;
        }
    } catch {
        // session fetch failed, treat as unauthenticated
    }

    //* ✅ 1. Prevent logged-in users from visiting login/register
    if (
        isAuthenticated &&
        (pathname === "/login" || pathname === "/register")
    ) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    //* ✅ 2. Protect private routes
    const protectedRoutes = [
        "/dashboard",
        "/admin-dashboard",
        "/booking",
        "/dashboard/tutor",
        "/dashboard/admin",
        "/tutorProfile",
    ];

    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route),
    );

    if (!isAuthenticated && isProtected) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    //* ✅ 3. Optional: Admin protection
    if (pathname.startsWith("/admin-dashboard") && !isAdmin) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    //* ✅ 4. Redirect /dashboard root — never let users land here directly
    if (pathname === "/dashboard") {
        if (!isAuthenticated) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        if (isAdmin) {
            return NextResponse.redirect(
                new URL("/dashboard/admin", request.url),
            );
        }
        if (isTutor) {
            return NextResponse.redirect(
                new URL("/dashboard/tutor", request.url),
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/login",
        "/register",
        "/dashboard/:path*",
        "/admin-dashboard/:path*",
        "/booking/:path*",
    ],
};
