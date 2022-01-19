import BookingForm from "components/bookingRoom/BookingForm";
import { AppLayout } from "components/ui/layout/AppLayout";
import PageLoader from "components/ui/PageLoader";
import { withAuth } from "hoc/withAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSingleRoom } from "services/room";
import { Room } from "types/Room";

const BookRoom: React.FunctionComponent = () => {
    const [room, setRoom] = useState<Room | null>();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (router.query.id) {
            (async () => {
                try {
                    const { data } = await getSingleRoom(
                        router.query.id as string
                    );
                    setRoom(data);
                } catch (err) {
                    router.push("/rooms");
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [router]);
    return isLoading || !room ? (
        <PageLoader />
    ) : (
        <AppLayout metaTitle="Booking a room" title="Booking a room">
            <BookingForm roomId={room?.id ?? ""} />
        </AppLayout>
    );
};

export default withAuth(BookRoom);
