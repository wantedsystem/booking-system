import Button from "components/ui/Button";
import { showCreateRoomModal } from "redux/reducers/roomSlice";
import { useAppDispatch } from "redux/store";

const CreateRoomBtn: React.FunctionComponent = () => {
    const dispatch = useAppDispatch();
    return (
        <Button onClick={() => dispatch(showCreateRoomModal(null))}>
            Create a Room
        </Button>
    );
};

export default CreateRoomBtn;
