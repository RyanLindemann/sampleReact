import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export const RuleModal = ({showModal, setShowModal}) => {

    return (
    <div>
        <Modal show={showModal} onHide={() =>setShowModal(false)} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>New Rule</Modal.Title>
        </Modal.Header>
        <Modal.Body variant='modalRyan'>
          <table>
            <tr>
              <td>Name</td>
              <td>Type</td>
              <td>Rule</td>
            </tr>
            <tr>
              <td><input /></td>
              <td>
                <select id="regexSelector">
                  <option value="contains">Contains</option>
                  <option value="notContains">Does Not Contain</option>
                </select>
              </td>
              <td><input /></td>
              <td><Button>Add Rule</Button></td>
            </tr>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() =>setShowModal(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
  
  export default RuleModal;