import Button from "components/ui/Button";
import FormControl from "components/ui/FormControl";
import { Formik, Form, FastField } from "formik";
import { useAppSelector } from "redux/store";
import * as Yup from "yup";
import { errors } from "lang/errors";
import { createBooking, isBookingValid } from "services/room";
import { useState } from "react";
import { formatError } from "helpers/general";
import { FormError } from "components/ui/layout/AuthLayout/style";
import { FormContainer } from "./style";
import { useRouter } from "next/router";
import { sendTransaction } from "helpers/contract";
import { v4 as uuidv4 } from "uuid";

interface Props {
    roomId: string;
}

const BookingForm: React.FunctionComponent<Props> = ({ roomId }) => {
    const [formError, setFormError] = useState("");
    const { user } = useAppSelector(state => state.user);
    const { address } = useAppSelector(state => state.wallet);
    const router = useRouter();
    const initialValues = {
        date: "",
        start_time: "",
        end_time: "",
        roomId: roomId,
        userId: user?.id || "",
        transaction_id: "",
        uuid: ""
    };

    const validationSchema = Yup.object().shape({
        date: Yup.string().required(errors.validation.required),
        start_time: Yup.string().required(errors.validation.required),
        end_time: Yup.string().required(errors.validation.required)
    });

    return (
        <FormContainer>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async values => {
                    setFormError("");
                    try {
                        if (!address) {
                            throw new Error(errors.transaction.notConnected);
                        }
                        await isBookingValid(values);
                        values["uuid"] = uuidv4();
                        const transaction_id = await sendTransaction(values);
                        if (!transaction_id) {
                            throw new Error(errors.transaction.noId);
                        }
                        values["transaction_id"] = transaction_id;
                        await createBooking(values);
                        router.push("/rooms");
                    } catch (err) {
                        const error = formatError(err);
                        setFormError(error);
                    }
                }}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        {formError && <FormError>{formError}</FormError>}
                        <FastField type="text" name="roomId" hidden />
                        <FastField type="text" name="userId" hidden />
                        <FormControl
                            label="Date"
                            name="date"
                            type="date"
                            as={FastField}
                            error={touched.date && errors.date}
                        />
                        <FormControl
                            label="Start Time"
                            name="start_time"
                            type="time"
                            as={FastField}
                            error={touched.start_time && errors.start_time}
                        />
                        <FormControl
                            label="End Time"
                            name="end_time"
                            type="time"
                            as={FastField}
                            error={touched.end_time && errors.end_time}
                        />
                        <Button type="submit" isLoading={isSubmitting}>
                            Book now
                        </Button>
                    </Form>
                )}
            </Formik>
        </FormContainer>
    );
};

export default BookingForm;
