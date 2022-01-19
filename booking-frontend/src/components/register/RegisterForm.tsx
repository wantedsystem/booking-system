import { FunctionComponent } from "react";
import FormControl from "components/ui/FormControl";
import Button from "components/ui/Button";
import { Formik, Form, FastField, Field } from "formik";
import * as Yup from "yup";
import { errors } from "lang/errors";
import { useAppDispatch, useAppSelector } from "redux/store";
import { FormError } from "components/ui/layout/AuthLayout/style";
import { clearAuthError, registerUser } from "redux/reducers/userSlice";

const RegisterForm: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const { error } = useAppSelector(state => state.user);
    const initialValues = {
        username: "",
        email: "",
        password: "",
        passwordConfirm: ""
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required(errors.validation.required),
        email: Yup.string()
            .required(errors.validation.required)
            .email(errors.validation.email.invalid),
        password: Yup.string().required(errors.validation.required),
        passwordConfirm: Yup.string()
            .required(errors.validation.required)
            .oneOf(
                [Yup.ref("password"), null],
                errors.validation.password.confirm
            )
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async values => {
                dispatch(clearAuthError());
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { passwordConfirm, ...body } = values;
                await dispatch(registerUser(body));
            }}
        >
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    {error && <FormError>{error}</FormError>}
                    <FormControl
                        label="Username"
                        placeholder="Your username"
                        name="username"
                        id="username"
                        as={FastField}
                        error={touched.username && errors.username}
                    />
                    <FormControl
                        label="Email"
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        id="email"
                        as={FastField}
                        error={touched.email && errors.email}
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
                    <FormControl
                        label="Confirmation"
                        type="password"
                        name="passwordConfirm"
                        placeholder="Password confirmation"
                        id="passwordConfirm"
                        as={Field}
                        error={
                            touched.passwordConfirm && errors.passwordConfirm
                        }
                    />
                    <Button isLoading={isSubmitting} type="submit" fullWidth>
                        Create an account
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterForm;
