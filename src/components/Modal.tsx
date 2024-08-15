import React from "react";
import styled from "@emotion/styled";

// Define the fade-in animation keyframes

// Define the modal styles
const ModalStyles = styled.div`
  /* The Modal (background) */

  display: flex; /* Visible by default (for demonstration, adjust accordingly) */
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  align-items: center; /* Center content vertically */
  justify-content: center; /* Center content horizontally */

  /* Modal Content/Box */
  .modal-content {
    background-color: var(--bg-color);
    padding: 20px;
    border: 1px solid var(--info-color);
    width: 80%;
    max-width: 500px; /* Limit the width */
    border-radius: 10px; /* Add some border radius for better aesthetics */
  }

  /* The Close Button */
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
  }
`;

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}
/**
 * Modal component
 * @param isOpen - boolean to show or hide the modal
 * @param onClose - function to close the modal
 * @param children - ReactNode to render inside the modal
 * @example <Modal isOpen={true} onClose={() => console.log("Modal closed")}><p>Modal content</p></Modal>
 */
const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <ModalStyles>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </ModalStyles>
  );
};
export default Modal;
