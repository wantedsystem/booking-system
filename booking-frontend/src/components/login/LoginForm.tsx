import { FunctionComponent } from "react";
import FormControl from "components/ui/FormControl";
import Button from "components/ui/Button";
import { Formik, Form, FastField, Field } from "formik";
import * as Yup from "yup";
import { errors } from "lang/errors";
import { useAppDispatch, useAppSelector } from "redux/store";
import { clearAuthError, userLogin } from "redux/reducers/userSlice";
import { FormError } from "components/ui/layout/AuthLayout/style";

const LoginForm: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);
    const initialValues = {
        username: "",
        password: ""
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required(errors.validation.required),
        password: Yup.string().required(errors.validation.required)
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async values => {
                dispatch(clearAuthError());
                await dispatch(userLogin(values));
            }}
        >
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    {user.error && <FormError>{user.error}</FormError>}
                    <FormControl
                        label="Username"
                        type="username"
                        placeholder="Username"
                        name="username"
                        id="username"
                        as={FastField}
                        error={touched.username && errors.username}
                    />
                    <FormControl
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Your password"
                        id="password"
                        as={Field}
                        error={touched.password && errors.password}
                    />
                    <Button isLoading={isSubmitting} type="submit" fullWidth>
                        Log in
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
