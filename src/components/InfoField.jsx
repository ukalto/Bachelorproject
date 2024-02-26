import React from 'react';
import styled from 'styled-components';

const InfoFieldModal = ({modalTitle, infos, closeModal}) => {

    return (
        <ModalOverlay onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <h3>{modalTitle}</h3>
                    <CloseButton onClick={closeModal}><i className="fas fa-times"></i></CloseButton>
                </ModalHeader>
                <ModalBody>
                    {infos.map((info, index) => (
                        <InfoLine key={index}>
                            <div><b>{info[0]}</b></div>
                            <div>{info[1]}</div>
                        </InfoLine>
                    ))}
                </ModalBody>
            </ModalContent>
        </ModalOverlay>
    );
};

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    padding: 20px;
`;

const ModalHeader = styled.div`
    display: flex;
    flex-direction: row;

    h3 {
        width: 100%;
    }
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    align-self: flex-start;
`;

const ModalBody = styled.div`
    /* Styles for modal body */
`;

const InfoLine = styled.div`
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
`;

export default InfoFieldModal;
