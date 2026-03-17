export const formatTime = (iso: string) => {
    const date = new Date(iso);
    return date.toISOString().substring(11, 16);
};
