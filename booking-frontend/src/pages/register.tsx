import RegisterForm from "components/register/RegisterForm";
import AuthLayout from "components/ui/layout/AuthLayout";
import { FormLink, FormTitle } from "components/ui/layout/AuthLayout/style";
import { withGuest } from "hoc/withGuest";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Login: NextPage = () => {
    return (
        <AuthLayout>
            <Head>
                <title>{process.env.NEXT_PUBLIC_APP_NAME} | Register</title>
            </Head>
            <FormLink>
                Have an account ?{" "}
                <Link href="/login" passHref>
                    <a>Sign in</a>
                </Link>
            </FormLink>
            <FormTitle>Register an account</FormTitle>
            <RegisterForm />
        </AuthLayout>
    );
};

export default withGuest(Login);
