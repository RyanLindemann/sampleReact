import React, { useState } from 'react';
import { FileDrop } from 'react-file-drop';
import './App.css';
import Cookies from 'universal-cookie';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';
import { RuleModal } from './RuleModal.jsx';

export const RuleGrid = ({ruleItems, setShowModal, addRuleItem}) => {
  const [newRuleName, updateNewRuleName] = useState("");
  const [newRuleValue, updateNewRuleValue] = useState("");
  const [newRuleMessage, updateNewRuleMessage] = useState("");
  
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
              <tr key={"rule" + item.name}>
                <td key={"ruleName" + item.name}>{item.name}</td>
                <td key={"ruleItem" + item.name}>{item.rule}</td>
                <td key={"ruleMessage" + item.name}>{item.message}</td>
              </tr>)}
            <tr>
              <td><input value={newRuleName} onChange={(e) => updateNewRuleName(e.target.value)} /></td>
              <td><input value={newRuleValue} onChange={(e) => updateNewRuleValue(e.target.value)} /></td>
              <td><input value={newRuleMessage} onChange={(e) => updateNewRuleMessage(e.target.value)} /> <button onClick={SaveRuleList}>Save</button></td>
            </tr> 
          </tbody>
        </table>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Create New Rule
        </Button>
      </div>
    );

    

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