import Button from "components/ui/Button";
import FormControl from "components/ui/FormControl";
import { hideCreateRoomModal } from "redux/reducers/roomSlice";
import { useAppDispatch, useAppSelector } from "redux/store";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import { errors } from "lang/errors";
import { createRoom, editRoom } from "services/room";
import { formatError } from "helpers/general";
import { useState } from "react";
import { FormError } from "components/ui/layout/AuthLayout/style";
import { useRouter } from "next/router";
import Modal from "components/ui/Modals";

const CreateRoomModal: React.FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const [formError, setFormError] = useState("");
    const { room } = useAppSelector(state => state.rooms.modal);
    const router = useRouter();
    const initialValues = {
        label: room?.label ?? ""
    };

    const validationSchema = Yup.object().shape({
        label: Yup.string().required(errors.validation.required)
    });

    const closeModal = () => {
        dispatch(hideCreateRoomModal());
    };

    return (
        <Modal
            title={`
            ${room?.label ? "Edit" : "Create"} room
        `}
            onClose={closeModal}
        >
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={async values => {
                    try {
                        if (room) {
                            await editRoom(room.id, values);
                        } else {
                            await createRoom(values);
                        }
                        dispatch(hideCreateRoomModal());
                        const page = router.query?.page as string;
                        room
                            ? router.reload()
                            : !page || page === "1"
                            ? router.reload()
                            : router.push("/rooms");
                    } catch (err) {
                        const error = formatError(err);
                        setFormError(error);
                    }
                }}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        {formError && <FormError>{formError}</FormError>}
                        <FormControl
                            name="label"
                            label="Name"
                            placeholder="Room name"
                            as={FastField}
                            id="name"
                            error={touched.label && errors.label}
                        />
                        <Button
                            isLoading={isSubmitting}
                            type="submit"
                            fullWidth
                        >
                            {room ? "Edit room" : "Create room"}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default CreateRoomModal;
