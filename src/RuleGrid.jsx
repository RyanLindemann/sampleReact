import React, { useState } from 'react';
import './App.css';
import Cookies from 'universal-cookie';
import { RuleModal } from './RuleModal.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

export const RuleGrid = ({ruleItems, showModal, setShowModal, addRuleItem}) => {
  const [newRuleName, updateNewRuleName] = useState("");
  const [newRuleValue, updateNewRuleValue] = useState("");
  const [newRuleMessage, updateNewRuleMessage] = useState("");

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Rule</th>
            <th>Message</th>
            <th></th>
          </tr>
          {ruleItems.map(item => 
            <tr key={"rule" + item.name}>
              <td id={"ruleName" + item.name} key={"ruleName" + item.name}>{item.name}</td>
              <td id={"ruleRule" + item.name} key={"ruleItem" + item.name}>{item.rule}</td>
              <td id={"ruleMessage" + item.name} key={"ruleMessage" + item.name}><input value={item.message} onChange={(e) => EditRule(item.name)} /></td>
              <td id={"ruleDelete" + item.name} key={"ruleDelete" + item.name}><button onClick={() => DeleteRule(item.name)} type="button" className="btn-close" aria-label="Close"></button></td>
            </tr>)}
          <tr>
            <td><input value={newRuleName} onChange={(e) => updateNewRuleName(e.target.value)} /></td>
            <td><input className='ruleInputWidth' value={newRuleValue} onChange={(e) => updateNewRuleValue(e.target.value)} /></td>
            <td><input value={newRuleMessage} onChange={(e) => updateNewRuleMessage(e.target.value)} /></td>
            <td><button onClick={SaveRuleList}>Save</button></td>
          </tr> 
        </tbody>
      </table>
      {/* <Button variant="primary" onClick={() => setShowModal(true)}>
        New Rule Tool
      </Button> */}
      
      <RuleModal
        showModal={showModal}
        setShowModal={setShowModal}
        SaveModalRuleList={SaveModalRuleList}
      />
    </div>
  );

  function EditRule(itemName) {
    let newRuleName = document.getElementById("ruleName" + itemName).outerText;
    let newRuleValue = document.getElementById("ruleRule" + itemName).outerText;
    let newRuleMessage = document.getElementById("ruleMessage" + itemName).firstChild.value;

    let newRule = {
      name: newRuleName,
      rule: newRuleValue,
      message: newRuleMessage
    };

    SetCookie(newRule);
    addRuleItem([]);
    GetRuleCookies();
  }

  function DeleteRule(itemName) {
    const cookies = new Cookies();
    cookies.remove(itemName, { path: '/' });
    addRuleItem([]);
    GetRuleCookies();
  }

  function SaveModalRuleList(name, value, message) {
    updateNewRuleName(name);
    updateNewRuleValue(value);
    updateNewRuleMessage(message);
    SaveRuleList();
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

  function GetRuleCookies() {
    const cookies = new Cookies();
    let cookieList = cookies.getAll();
    
    Object.values(cookieList).forEach(function(cookie,index) {
        addRuleItem(ruleItems => [...ruleItems, cookie]);
    });
  }
}