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
import { userService } from "./services/user.service";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    let isAuthenticated = false;
    let isAdmin = false;

    const { data } = await userService.getSession();

    if (data) {
        isAuthenticated = true;
        isAdmin = data.user.role === Roles.admin;
    }

    //* ✅ 1. Prevent logged-in users from visiting login/register
    if (
        isAuthenticated &&
        (pathname === "/login" || pathname === "/register")
    ) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    //* ✅ 2. Protect private routes
    const protectedRoutes = ["/dashboard", "/admin-dashboard", "/booking"];

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
