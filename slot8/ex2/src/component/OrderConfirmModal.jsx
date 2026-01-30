import React, { useState } from 'react';
import { Button, Modal, Container } from 'react-bootstrap';

function OrderConfirmModal() {
  const [isShowModal, setIsShowModal] = useState(false);

  const handleConfirm = () => {
    alert('Duyệt đơn hàng thành công!');
    setIsShowModal(false);
  };

  return (
    <Container className="mt-5">
      <h2>Order Confirmation</h2>

      <Button size="lg" onClick={() => setIsShowModal(true)}>
        Xử lý đơn hàng
      </Button>

      <Modal show={isShowModal} onHide={() => setIsShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn duyệt đơn hàng này để chuyển sang bộ phận kho không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default OrderConfirmModal;
