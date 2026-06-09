import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export const RuleModal = ({showModal, setShowModal, SaveModalRuleList}) => {
  const [newRuleName, updateNewRuleName] = useState("");
  const [newRuleValue, updateNewRuleValue] = useState("");
  const [newRuleMessage, updateNewRuleMessage] = useState("");

    return (
    <div>
        <Modal show={showModal} onHide={() =>setShowModal(false)} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>New Rule Creation Tool</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Name: <input value={newRuleName} onChange={(e) => updateNewRuleName(e.target.value)} /></div>
          <br/>
          <div className="inline">
            <select className="modalSelector" id="regexSelector">
              <option value="contains">Contains</option>
              <option value="contains">Starts With</option>
              <option value="notContains">Does Not Contain</option>
            </select>
            <td><input value={newRuleValue} onChange={(e) => updateNewRuleValue(e.target.value)} /></td>
          </div>
          <td>
            Message: <input value={newRuleMessage} onChange={(e) => updateNewRuleMessage(e.target.value)} />
          </td>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => SaveModalChanges()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );

    function SaveModalChanges() {
      let val;
      switch(document.getElementById("regexSelector").value) {
        case "contains":
          val = ".*" + newRuleValue + ".*";
          break;
        case "startsWith":
          val = "^" + newRuleValue + ".*";
          break;
        case "notContains":
          val = "^(?:(?!" + newRuleValue + ").)*$";
          break;
        default:
          return;
      }

      SaveModalRuleList(newRuleName, val, newRuleMessage);
      setShowModal(false);
    }
  }
  
  export default RuleModal;