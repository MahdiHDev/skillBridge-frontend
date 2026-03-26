import { AppSidebar } from "@/components/layout/app-sidebar";
import { DynamicBreadcrumb } from "@/components/layout/dynamic-breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { userService } from "@/services/user.service";

export default async function DashboardLayout({
    children,
    admin,
    tutor,
}: {
    children: React.ReactNode;
    admin: React.ReactNode;
    tutor: React.ReactNode;
}) {
    const data = await userService.getSession();
    const user = data?.data?.user;

    console.log("data from dashboard", user);

    return (
        <SidebarProvider>
            <AppSidebar role={user.role} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                    />
                    {/* <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Build Your Application
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb> */}
                    <DynamicBreadcrumb />
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {/* Render slot based on role */}
                    {user.role === "ADMIN" && admin}
                    {user.role === "TUTOR" && tutor}
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
