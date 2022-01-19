import LoginForm from "components/login/LoginForm";
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
                <title>{process.env.NEXT_PUBLIC_APP_NAME} | Login</title>
            </Head>
            <FormLink>
                Not a member ?{" "}
                <Link href="/register" passHref>
                    <a>Sign up</a>
                </Link>
            </FormLink>
            <FormTitle>Welcome back</FormTitle>
            <LoginForm />
        </AuthLayout>
    );
};

export default withGuest(Login);
