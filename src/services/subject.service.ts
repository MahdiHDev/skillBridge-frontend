import { apiClient } from "@/lib/api-client";

export interface Subject {
    id: string;
    name: string;
    slug: string;
    createdAt: string;
}

export const subjectService = {
    getAll: (): Promise<{ data: Subject[] }> =>
        apiClient.get("/subject/getAllSubjects").then((r) => r.data),
};
