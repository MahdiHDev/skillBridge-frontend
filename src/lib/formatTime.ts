export const formatTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
};

export const TweleveFormatTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};
