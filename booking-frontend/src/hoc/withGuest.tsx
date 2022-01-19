import PageLoader from "components/ui/PageLoader";
import { useRouter } from "next/router";
import { ComponentType, useEffect } from "react";
import { getUser, LoginStatus } from "redux/reducers/userSlice";
import { useAppDispatch, useAppSelector } from "redux/store";

export function withGuest<T>(WrappedComponent: ComponentType<T>) {
    return (hocProps: T) => {
        const { authStatus } = useAppSelector(state => state.user);
        const dispatch = useAppDispatch();
        const router = useRouter();
        useEffect(() => {
            (async () => {
                if (authStatus !== LoginStatus.LOGGED_OUT) {
                    await dispatch(getUser());
                }
            })();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [dispatch]);

        useEffect(() => {
            if (authStatus === LoginStatus.LOGGED_IN) {
                router.push("/");
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [authStatus]);

        return [LoginStatus.PENDING, LoginStatus.LOGGED_IN].includes(
            authStatus
        ) ? (
            <PageLoader />
        ) : (
            <WrappedComponent {...hocProps} />
        );
    };
}
