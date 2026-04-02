import {
    availabilityService,
    CreateAvailabilityPayload,
    EditAvailabilityPayload,
} from "@/services/availability.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const availabilityKeys = {
    all: ["availability"] as const,
};

export const useGetAvailability = () =>
    useQuery({
        queryKey: availabilityKeys.all,
        queryFn: availabilityService.getAll,
    });

export const useCreateAvailability = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateAvailabilityPayload) =>
            availabilityService.create(data),
        onSuccess: () => {
            toast.success("Availability saved");
            queryClient.invalidateQueries({ queryKey: availabilityKeys.all });
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ?? "Something went wrong",
            );
        },
    });
};

export const useEditAvailability = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: EditAvailabilityPayload;
        }) => availabilityService.update(id, data),
        onSuccess: () => {
            toast.success("Availability updated");
            queryClient.invalidateQueries({ queryKey: availabilityKeys.all });
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ?? "Something went wrong",
            );
        },
    });
};

export const useDeleteAvailability = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => availabilityService.delete(id),
        onSuccess: () => {
            toast.success("Availability slot removed");
            queryClient.invalidateQueries({ queryKey: availabilityKeys.all });
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ?? "Something went wrong",
            );
        },
    });
};
