import Skeleton from "react-loading-skeleton";
import {
    RoomCardContainer,
    RoomCardWrapper,
    RoomDetails,
    RoomFooter,
    RoomHeader
} from "../style";
import "react-loading-skeleton/dist/skeleton.css";

const RoomCardLoader: React.FunctionComponent = () => {
    return (
        <RoomCardWrapper>
            <RoomCardContainer>
                <RoomHeader>
                    <Skeleton height={60} width={60} />
                    <RoomDetails>
                        <h3>
                            {" "}
                            <Skeleton height={20} width={120} />
                        </h3>
                        <p>
                            <Skeleton height={20} width={90} />
                        </p>
                    </RoomDetails>
                </RoomHeader>
                <RoomFooter>
                    <Skeleton height={40} width={90} />
                </RoomFooter>
            </RoomCardContainer>
        </RoomCardWrapper>
    );
};

export default RoomCardLoader;
