import CloseIcon from "components/ui/Icons/Close";
import { ModalContainer, ModalWrapper, ModalHeader, CloseModal } from "./style";

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
    title: string;
}

const Modal: React.FunctionComponent<ModalProps> = ({
    children,
    title,
    onClose
}) => {
    return (
        <ModalWrapper>
            <ModalContainer>
                <ModalHeader>
                    <h3>{title}</h3>
                    <CloseModal onClick={onClose}>
                        <CloseIcon />
                    </CloseModal>
                </ModalHeader>
                {children}
            </ModalContainer>
        </ModalWrapper>
    );
};

export default Modal;
