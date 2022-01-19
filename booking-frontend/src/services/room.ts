import { axiosInstance } from "./axiosInstance";

export const createRoom = (body: { label: string }) => {
    return axiosInstance.post("/room", body);
};

export const editRoom = (id: string, body: { label: string }) => {
    const link = "/room/" + id;
    return axiosInstance.put(link, body);
};

export const deleteRoom = (id: string) => {
    return axiosInstance.delete(`/room/${id}`);
};

export const getSingleRoom = (id: string) => {
    return axiosInstance.get(`/room/${id}`);
};

export const getRoomBookings = (id: string) => {
    return axiosInstance.get(`/room/${id}/bookings`);
};

export const getMyRoomBookings = (id: string) => {
    return axiosInstance.get(`/room/${id}/mybookings`);
};

export interface BookingRoom {
    date: string;
    start_time: string;
    end_time: string;
    userId: string;
    roomId: string;
    transaction_id: string;
    uuid: string;
}
export const createBooking = (body: BookingRoom) => {
    const link = "/room/:id/book".replace(":id", body.roomId);
    return axiosInstance.post(link, body);
};

export const isBookingValid = (data: BookingRoom) => {
    const link = "/booking/isvalid";
    const body = {
        date: data.date,
        start_time: data.start_time,
        end_time: data.end_time,
        roomId: data.roomId
    };
    return axiosInstance.post(link, body);
};
