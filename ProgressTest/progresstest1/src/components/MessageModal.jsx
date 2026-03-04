import { Modal, Button } from "react-bootstrap";

function MessageModal({ show, onClose, message }) {
  return (
    <Modal show={show} centered>
      <Modal.Body className="text-center">
        <h5>{message}</h5>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="primary" onClick={onClose}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MessageModal;