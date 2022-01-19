// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Bookings {
    event evtBooking(
        address from,
        string uuid,
        string date,
        string startTime,
        string endTime,
        string userId,
        string roomId,
        uint256 timestamp
    );

    event evtDeleteBooking(address from, string uuid);

    struct BookingStruct {
        address from;
        string uuid;
        string date;
        string startTime;
        string endTime;
        string userId;
        string roomId;
        uint256 timestamp;
    }

    mapping(string => BookingStruct) bookings;

    function addBooking(
        string memory uuid,
        string memory date,
        string memory startTime,
        string memory endTime,
        string memory userId,
        string memory roomId
    ) public {
        BookingStruct storage booking = bookings[uuid];
        booking.uuid = uuid;
        booking.from = msg.sender;
        booking.date = date;
        booking.startTime = startTime;
        booking.endTime = endTime;
        booking.userId = userId;
        booking.roomId = roomId;
        booking.timestamp = block.timestamp;

        emit evtBooking(
            msg.sender,
            uuid,
            date,
            startTime,
            endTime,
            userId,
            roomId,
            block.timestamp
        );
    }

    function getBooking(string memory uuid)
        public
        view
        returns (BookingStruct memory)
    {
        return bookings[uuid];
    }

    function deleteBooking(string memory uuid) public {
        delete bookings[uuid];

        emit evtDeleteBooking(msg.sender, uuid);
    }
}
