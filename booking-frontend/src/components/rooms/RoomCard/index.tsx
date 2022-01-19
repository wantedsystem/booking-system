import Button from "components/ui/Button";
import DeleteIcon from "components/ui/Icons/Delete";
import EditIcon from "components/ui/Icons/Edit";
import StarIcon from "components/ui/Icons/Star";
import Link from "next/link";
import React, { FunctionComponent } from "react";
import { showCreateRoomModal } from "redux/reducers/roomSlice";
import { useAppDispatch, useAppSelector } from "redux/store";
import { deleteRoom } from "services/room";
import { Room } from "types/Room";
import DeleteRoomModal from "../../ui/Modals/DeleteModal";
import {
    RoomCardContainer,
    RoomCardWrapper,
    RoomHeader,
    RoomImage,
    RoomDetails,
    RoomFooter,
    DeleteRoom,
    RoomActions,
    EditRoom,
    RoomTitle
} from "./style";

interface Props {
    room: Room;
}

const RoomCard: FunctionComponent<Props> = ({ room }) => {
    const { user } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const { id, label } = room;
    const handleDelete = async () => {
        await deleteRoom(id);
        setShowDeleteModal(false);
    };
    return (
        <RoomCardWrapper>
            <RoomCardContainer>
                <RoomHeader>
                    <RoomImage>
                        <StarIcon />
                    </RoomImage>
                    <RoomDetails>
                        <RoomTitle>
                            <h3>{label}</h3>
                            {user?.admin && (
                                <RoomActions>
                                    <EditRoom
                                        onClick={() =>
                                            dispatch(showCreateRoomModal(room))
                                        }
                                    >
                                        <EditIcon />
                                    </EditRoom>
                                    <DeleteRoom
                                        onClick={() =>
                                            setShowDeleteModal(!showDeleteModal)
                                        }
                                    >
                                        <DeleteIcon />
                                    </DeleteRoom>
                                </RoomActions>
                            )}
                        </RoomTitle>
                        <Link href={`/rooms/${id}/bookings`} passHref>
                            <a>View Bookings</a>
                        </Link>
                    </RoomDetails>
                </RoomHeader>
                <RoomFooter>
                    <Link href={`/rooms/${id}/book`} passHref>
                        <Button as="a" secondary>
                            Book now
                        </Button>
                    </Link>
                </RoomFooter>
            </RoomCardContainer>
            {showDeleteModal && (
                <DeleteRoomModal
                    onDelete={handleDelete}
                    title={`Delete room ${label}`}
                    bodyText={`Are you sure you want to delete room ${label}?`}
                    onClose={() => setShowDeleteModal(false)}
                />
            )}
        </RoomCardWrapper>
    );
};

export default RoomCard;
