import { FunctionComponent, useEffect } from "react";
import { clearAuthError } from "redux/reducers/userSlice";
import { useAppDispatch } from "redux/store";
import { AuthWrapper, FormContainer } from "./style";

interface IProps {
    children?: React.ReactNode;
}

const AuthLayout: FunctionComponent<IProps> = ({ children }) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        return () => {
            dispatch(clearAuthError());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
    return (
        <AuthWrapper>
            <FormContainer>{children}</FormContainer>
        </AuthWrapper>
    );
};

export default AuthLayout;
