import { ComponentType, FunctionComponent, useState } from "react";
import { Eye } from "components/ui/Icons/Eye";
import { EyeOff } from "components/ui/Icons/EyeOff";
import {
    InputButton,
    InputControl,
    InputElement,
    InputError,
    InputGroup,
    Label
} from "./style";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name: string;
    type?: string;
    error?: string | boolean;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    as?: string | ComponentType<any>;
}

const FormControl: FunctionComponent<IProps> = props => {
    const { label, type, id, error, ...rest } = props;
    const [showPassword, setShowPassword] = useState(false);
    return (
        <InputGroup error={error}>
            <Label htmlFor={id}>{label}</Label>
            <InputControl>
                <InputElement
                    type={showPassword ? "text" : type}
                    id={id}
                    {...rest}
                />
                {type === "password" && (
                    <InputButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff /> : <Eye />}
                    </InputButton>
                )}
            </InputControl>
            {error && <InputError>{error}</InputError>}
        </InputGroup>
    );
};

export default FormControl;
