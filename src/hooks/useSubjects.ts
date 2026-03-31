import { subjectService } from "@/services/subject.service";
import { useQuery } from "@tanstack/react-query";

export const useSubjects = () =>
    useQuery({
        queryKey: ["subjects"],
        queryFn: subjectService.getAll,
    });
