import { axiosInstance } from "./axiosInstance";

export const deleteBooking = (id: string) => {
    return axiosInstance.delete(`/booking/${id}`);
};
