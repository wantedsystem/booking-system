import styled from "styled-components";

export const CloseModal = styled.div`
    cursor: pointer;
`;
export const ModalHeader = styled.div`
    display: flex;
    margin-bottom: 1.25rem;
    justify-content: space-between;
`;

export const ModalContainer = styled.div`
    width: 100%;
    max-width: 400px;
    background: white;
    padding: 1.25rem;
    border-radius: ${props => props.theme.borderRadius};
`;

export const ModalWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 10;
    background: rgba(0, 0, 0, 0.4);
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;
