import Button from "components/ui/Button";
import { Container } from "components/ui/Container";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect } from "react";
import { logout } from "redux/reducers/userSlice";
import { useAppDispatch, useAppSelector } from "redux/store";
import {
    AppLayoutWrapper,
    MainContent,
    NavBar,
    NavTitle,
    ContentHeader,
    ContentBody,
    NavItems,
    NavLink,
    NavButtons,
    Wallet
} from "./style";
import ErrorIcon from "components/ui/Icons/Error";
import CheckIcon from "components/ui/Icons/Check";
import { getMetaMask } from "helpers/wallet";
import {
    setWalletAddress,
    setWalletError,
    setWalletLoading
} from "redux/reducers/walletSlice";
import { formatError } from "helpers/general";

interface IProps {
    children: React.ReactNode;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    HeaderButton?: React.ReactNode;
    title: string;
    metaTitle: string;
}

export const AppLayout: FunctionComponent<IProps> = ({
    children,
    HeaderButton,
    title,
    metaTitle
}) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { address, isLoading, error } = useAppSelector(state => state.wallet);
    const handleUserLogout = () => {
        dispatch(logout());
        router.push("/login");
    };

    const connectWallet = async () => {
        try {
            const ethereum = getMetaMask();
            dispatch(setWalletLoading(true));
            await ethereum.request({
                method: "eth_requestAccounts",
                params: [
                    {
                        eth_accounts: {}
                    }
                ]
            });
            dispatch(setWalletLoading(false));
        } catch (err) {
            const error = formatError(err);
            dispatch(setWalletError(error));
        }
    };

    const handleMetaMaskAccountChange = () => {
        const ethereum = getMetaMask();
        ethereum.on("accountsChanged", function (accounts: Array<string>) {
            dispatch(setWalletAddress(accounts[0] ?? ""));
        });
    };

    const checkIfAccountIsConnected = async () => {
        const ethereum = getMetaMask();
        const accounts = await ethereum.request({
            method: "eth_accounts"
        });
        dispatch(setWalletAddress(accounts[0] || ""));
    };

    useEffect(() => {
        try {
            getMetaMask();
            handleMetaMaskAccountChange();
            checkIfAccountIsConnected();
        } catch (err) {
            dispatch(setWalletError(formatError(err)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <AppLayoutWrapper>
            <Head>
                <title>
                    {process.env.NEXT_PUBLIC_APP_NAME} | {metaTitle}
                </title>
            </Head>
            <NavBar>
                <Container>
                    <NavTitle>Welcome Back </NavTitle>
                    <NavItems>
                        <ul>
                            <li>
                                <Link href="/rooms" passHref>
                                    <NavLink>Rooms</NavLink>
                                </Link>
                            </li>
                        </ul>
                    </NavItems>
                    <NavButtons>
                        {address ? (
                            <Wallet>
                                <CheckIcon />
                                {address.substring(0, 15) + "..."}
                            </Wallet>
                        ) : (
                            <Button
                                isLoading={isLoading}
                                danger={error !== ""}
                                onClick={connectWallet}
                            >
                                {error ? (
                                    <>
                                        <ErrorIcon />
                                        {error}
                                    </>
                                ) : (
                                    "Connect Wallet"
                                )}
                            </Button>
                        )}

                        <Button onClick={handleUserLogout} secondary={true}>
                            Log out
                        </Button>
                    </NavButtons>
                </Container>
            </NavBar>
            <MainContent>
                <Container>
                    <ContentHeader>
                        <span>{title}</span>
                        {HeaderButton}
                    </ContentHeader>
                    <ContentBody>{children}</ContentBody>
                </Container>
            </MainContent>
        </AppLayoutWrapper>
    );
};
