import React, { useState } from 'react';
import './App.css';
import Cookies from 'universal-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';
import { RuleModal } from './RuleModal.jsx';
import { RuleGrid } from './RuleGrid.jsx';
import { MessageGrid } from './MessageGrid.jsx';

export const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [ruleItems, addRuleItem] = useState(RuleSetup());

  return (
    <div> 
      <RuleModal
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <RuleGrid
        ruleItems={ruleItems}
        setShowModal={setShowModal}
        addRuleItem={addRuleItem}
      />
      <MessageGrid
        GetMessage={GetMessage}
      />
    </div>
  );

  function GetMessage(title)
  {
    const messages = [];
    for(let i = 0; i < ruleItems.length; i++) {
      if(title.match(ruleItems[i].rule)) {
        messages.push(ruleItems[i].message);
      }
    }

    if(title !== "Title" && messages.length > 0)
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

};

export default App;