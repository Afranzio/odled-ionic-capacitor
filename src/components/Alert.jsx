import React,{useState, forwardRef, useImperativeHandle } from 'react'
import { Modal, Button } from 'react-bootstrap'

const Alert = forwardRef((props, ref) => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    useImperativeHandle(ref, () => {
        return {
            handleShow: handleShow
        };
      });
  
    return (
      <div>
        <Modal
          show={show}
          onHide={handleHide}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton onClick={handleHide} >
            <Modal.Title>Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {props.message}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" 
            onClick={handleHide}
            >
              Back
            </Button>
            <a href="/"><Button variant="primary">Retry</Button></a>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
);
export default Alert;