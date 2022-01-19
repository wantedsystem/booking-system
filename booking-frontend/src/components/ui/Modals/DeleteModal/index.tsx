import Button from "components/ui/Button";
import { FormError } from "components/ui/layout/AuthLayout/style";
import Modal from "components/ui/Modals";
import { formatError } from "helpers/general";
import { useRouter } from "next/router";
import React from "react";
import { ModalButtons } from "./style";

interface Props {
    onClose: () => void;
    onDelete: () => void;
    title: string;
    bodyText?: string;
}

const DeleteModal: React.FunctionComponent<Props> = ({
    title,
    onDelete,
    onClose,
    bodyText
}) => {
    const [modalError, setModalError] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();
    const handleDelete = async () => {
        try {
            setIsLoading(true);
            setModalError("");
            await onDelete();
            router.reload();
        } catch (err) {
            const error = formatError(err);
            setModalError(error);
        }
        setIsLoading(false);
    };
    return (
        <Modal title={title} onClose={onClose}>
            {modalError && <FormError>{modalError}</FormError>}
            <div>{bodyText}</div>
            <ModalButtons>
                <Button isLoading={isLoading} danger onClick={handleDelete}>
                    Delete
                </Button>
                <Button secondary onClick={onClose}>
                    Cancel
                </Button>
            </ModalButtons>
        </Modal>
    );
};

export default DeleteModal;
