import React, { ButtonHTMLAttributes } from "react";
import { ButtonElement } from "./style";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    fullWidth?: boolean;
    isLoading?: boolean;
    secondary?: boolean;
    danger?: boolean;
    active?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    as?: string | React.ComponentType<any>;
}
const Button: React.FunctionComponent<IProps> = React.forwardRef(
    (props, buttonRef) => {
        const { children, as, danger, ...rest } = props;
        return (
            <ButtonElement danger={danger} as={as} ref={buttonRef} {...rest}>
                <span>{children}</span>
            </ButtonElement>
        );
    }
);

export default Button;
