import RoomPagination from "components/rooms/Pagination";
import RoomCard from "components/rooms/RoomCard";
import RoomCardLoader from "components/rooms/RoomCard/RoomCardLoader";
import { RoomsContainer, RoomsWrapper } from "components/rooms/style";
import { AppLayout } from "components/ui/layout/AppLayout";
import { withAuth } from "hoc/withAuth";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getRooms } from "redux/reducers/roomSlice";
import { useAppDispatch, useAppSelector } from "redux/store";
import CreateRoomBtn from "components/rooms/CreateRoomBtn";
import RoomModal from "components/rooms/RoomModal";

const Home: NextPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { items, isLoading, meta, modal } = useAppSelector(
        state => state.rooms
    );

    const { user } = useAppSelector(state => state.user);
    const page = (router.query.page as string) ?? "1";
    useEffect(() => {
        dispatch(getRooms(page));
    }, [dispatch, page]);
    return (
        <AppLayout
            metaTitle="Rooms"
            title={"Rooms available - " + meta.totalItems}
            HeaderButton={user?.admin && <CreateRoomBtn />}
        >
            <RoomsWrapper>
                <RoomsContainer>
                    {isLoading &&
                        [...Array(3)].map((_, i) => <RoomCardLoader key={i} />)}
                    {!isLoading &&
                        items.map((item, i) => (
                            <RoomCard room={item} key={i} />
                        ))}
                </RoomsContainer>
                <RoomPagination />
            </RoomsWrapper>
            {user?.admin && modal.isOpen && <RoomModal />}
        </AppLayout>
    );
};

export default withAuth(Home);
