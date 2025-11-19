export const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case "completed":
            return "text-green-100 ";
        case "in-progress":
            return "text-blue-100 ";
        case "pending":
            return "text-yellow-100 ";
        default:
            return "text-gray-100 ";
    }
};