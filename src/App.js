import React, { useState, useEffect } from 'react';
import { FileDrop } from 'react-file-drop';
import './App.css';
import Cookies from 'universal-cookie';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
  const [ruleItems, addRuleItem] = useState(RuleSetup());
  const [gridItems, addGridItem] = useState([]);
  const [newRuleName, updateNewRuleName] = useState("");
  const [newRuleValue, updateNewRuleValue] = useState("");
  const [newRuleMessage, updateNewRuleMessage] = useState("");
  const [show, setShow] = useState(false);
  const styles = { border: '1px solid black', width: 600, color: 'black', padding: 20 };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      {GetModalHtml()}
      {GetRuleHtml()}
      {GetGridHtml()}
    </div>
  );

  function GetModalHtml() {
    return (
      <Modal show={show} onHide={handleClose} size='xl'>
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function GetRuleHtml() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>Rule</td>
              <td>Message</td>
            </tr>
            {ruleItems.map(item => 
              <tr key={"rule" + getRandomInt()}>
                <td key={"ruleName" + getRandomInt()}>{item.name}</td>
                <td key={"ruleItem" + getRandomInt()}>{item.rule}</td>
                <td key={"ruleMessage" + getRandomInt()}>{item.message}</td>
              </tr>)}
            <tr>
              <td><input value={newRuleName} onChange={(e) => updateNewRuleName(e.target.value)} /></td>
              <td><input value={newRuleValue} onChange={(e) => updateNewRuleValue(e.target.value)} /></td>
              <td><input value={newRuleMessage} onChange={(e) => updateNewRuleMessage(e.target.value)} /> <button onClick={SaveRuleList}>Save</button></td>
            </tr> 
          </tbody>
        </table>
        <Button variant="primary" onClick={handleShow}>
          Create New Rule
        </Button>
      </div>
    );
  }

  function GetGridHtml() {
    return (
      <div>
        <h1>File Drop</h1>
        <div style={styles}>
          <FileDrop
            onDrop={(files, event) => DropFile(files, event)}
          >
            Drop some files here!
          </FileDrop>
        </div>
        <table>
          <tbody>
            {gridItems.map(item => 
            <tr key={"line" + getRandomInt()}>
              <td key={"lineName" + getRandomInt()}>{item.Name}</td>
              <td key={"lineTitle" + getRandomInt()}>{item.Title}</td>
              <td key={"lineMessage" + getRandomInt()}>{item.Message}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    );
  }

  function getRandomInt() {
    const min = 1;
    const max = 10000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function DropFile(files, event) {
    
      for(let i = 0; i < files.length; i++)
      {
          const file = files[i];
          file.text().then(LoadData);
      }
  }

  function LoadData(result) {
    const row = result.split("\n");

    // row.length -1 to remove empty last row
    for(let i = 0; i < row.length-1; i++) {
      const columns = row[i].split(",");

      const newVal = {
        Name: columns[0],
        Title: columns[1],
        Message: GetMessage(columns[1])
      };

      addGridItem(gridItems => [...gridItems, newVal]);
    }
    
  }

  function GetMessage(title)
  {
    const cookies = new Cookies();
    const messages = [];
    for(let i = 0; i < ruleItems.length; i++) {
      if(title.match(ruleItems[i].rule)) {
        messages.push(ruleItems[i].message);
      }
    }

    if(title != "Title" && messages.length > 0)
      return messages[0];
    else
      return "";
  }

  function RuleSetup() {
    const cookies = new Cookies();
    let cookieList = cookies.getAll();
    let retCookieList = [];
    Object.values(cookieList).forEach(function(cookie,index) {
      retCookieList.push(cookie);
    });
    
    return retCookieList;
  }

  function GetRuleCookies() {
    const cookies = new Cookies();
    let cookieList = cookies.getAll();
    Object.values(cookieList).forEach(function(cookie,index) {
      addRuleItem(ruleItems => [...ruleItems, cookie]);
    });
  }

  function SaveRuleList() {
    for(let i = 0; i < ruleItems.length; i++) {
      SetCookie(ruleItems[i]);
    }

    let newRule = {
      name: newRuleName,
      rule: newRuleValue,
      message: newRuleMessage
    };

    SetCookie(newRule);

    addRuleItem([]);
    updateNewRuleName("");
    updateNewRuleValue("");
    updateNewRuleMessage("");
    GetRuleCookies();
  }

  function SetCookie(cookie) {
    const cookies = new Cookies();
    var cookieDate = new Date();
    cookieDate.setDate(cookieDate.getDate() + 10000);
    cookies.set(cookie.name, JSON.stringify(cookie), {path: '/', expires: cookieDate});
  }

};

export default App;