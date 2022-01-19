import { ethers } from "ethers";
import { BookingRoom } from "services/room";
import { contractAddr, contractABI } from "utils/constants";
import { getMetaMask } from "./wallet";

export const getContract = () => {
    const ethereum = getMetaMask();
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddr, contractABI, signer);

    return contract;
};

export const sendTransaction = async (booking: BookingRoom) => {
    const contract = await getContract();
    const transactionHash = await contract.addBooking(
        booking.uuid,
        booking.date,
        booking.start_time,
        booking.end_time,
        booking.userId,
        booking.roomId
    );
    await transactionHash.wait();
    return transactionHash.hash;
};
