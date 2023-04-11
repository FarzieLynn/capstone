import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PrivacyAct() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        View Privacy Act
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Military Anonymous Privacy Act</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ whiteSpace: 'pre-wrap' }}>
          {"Privacy Statement for Military Anonymous:\n\n"}

          {"\tAt Military Anonymous, we take your privacy seriously. We want to assure you that we will never sell your information or charge you a fee for using our application. We are committed to providing a safe and anonymous space for military members, veterans, and their families to seek support and advice from trained professionals.\n\n"}

          {"\tOur application is designed to offer a confidential and anonymous platform for individuals to connect with professionals who have volunteered their time to help those in need. The professionals on our platform set their own availability, and their involvement is purely voluntary.\n\n"}

          {"\tWe understand that privacy and anonymity are crucial for many individuals seeking support, and we take great care to ensure that all user information is kept confidential. Our application employs strict security measures to protect your data, and we will never disclose any identifying information to a third party without your consent.\n\n"}

          {"\tIt's important to note that while our platform provides a safe and supportive environment, we are not a substitute for emergency services. If you or someone you know intends to harm themselves or others, please call the National Suicide Prevention Lifeline at 1-800-273-8255 or text HOME to 741-741 to reach the Crisis Text Line immediately.\n\n"}

          {"\tIn summary, at Military Anonymous, we offer a confidential and anonymous platform for military members, veterans, and their families to connect with professionals who have volunteered their time to provide support and guidance. We do not sell your information or charge any fees for our services. We are committed to providing a safe and secure space for individuals to seek help, and we take your privacy seriously.\n\n"}


          {"Military Anonymous Team"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PrivacyAct;