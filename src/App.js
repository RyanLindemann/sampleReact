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
        ruleItems={ruleItems}
      />
    </div>
  );

  function RuleSetup() {
    const cookies = new Cookies();
    let cookieList = cookies.getAll();
    let retCookieList = [];
    if(Object.values(cookieList).length === 0){
      cookieList = FillEmptyCookieJar();
    }
    Object.values(cookieList).forEach(function(cookie,index) {
      retCookieList.push(cookie);
    });
    
    return retCookieList;
  }

  function FillEmptyCookieJar() {
    let cookieList = [];

    cookieList.push({
      name: "Exec",
      rule: "(CIO|CIO .*|CTO|CTO .*|CISO|CISO .*|Chief.*|VP.*|SVP.*|EVP.*|President.*|Head of IT.*|Head of Technology.*)",
      message: "hello exec"
    });
    
    cookieList.push({
      name: "Delivery",
      rule: "(Director.*|PMO.*|Program.*|Delivery.*|Transformation.*|IT Manager.*|Applications Manager.*)",
      message: "hello Delivery"
    });
    
    cookieList.push({
      name: "Technical",
      rule: "(Architect.*|Engineering Manager.*|Tech Lead.*|Platform.*|SRE.*|Security Lead.*|Data Lead.*)",
      message: "hello tech"
    });

    return cookieList;
  }

};

export default App;