import React from 'react';
import { FileDrop } from 'react-file-drop';
import Button from 'react-bootstrap/Button';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

export const MessageGrid = ({ ruleItems, gridItems, addGridItem }) => {
  const styles = { border: '1px solid black', width: 600, color: 'black', padding: 20 };
    return (
      <div>
        <p>Drop CSV files below to create a table to export.</p>
        <div style={styles}>
          <FileDrop
            onDrop={(files, event) => DropFile(files, event)}
          >
            Drop CSV files here!
          </FileDrop>
        </div>
        <br />
        <br />
        <br />
        <Button variant="primary" onClick={() => DownloadCsvs()}>Download Normalized CSV</Button>
        <table>
          <tbody>
            <tr hey={"header"}>
              <th key={"headerCompany"}>Company</th>
              <th key={"headerName"}>Name</th>
              <th key={"headerTitle"}>Title</th>
              <th key={"headerEmail"}>Email</th>
              <th key={"headerPersona"}>Persona</th>
              <th key={"headerMessage"}>Message</th>
              <th key={"headerPriority"}>Priority</th>
              <th key={"headerNotes"}>Notes</th>
            </tr>
            {gridItems.map(item => 
            <tr key={"line" + item.Name}>
              <td key={"lineCompany" + item.name}>{item.Company}</td>
              <td key={"lineName" + item.name}>{item.Name}</td>
              <td key={"lineTitle" + item.name}>{item.Title}</td>
              <td key={"lineEmail" + item.name}>{item.Email}</td>
              <td key={"linePersona" + item.name}>{item.PersonaBand}</td>
              <td key={"lineMessage" + item.name}>{item.Message}</td>
              <td key={"linePriority" + item.name}>{item.Priority}</td>
              <td key={"lineNotes" + item.name}>{item.Notes}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    );
    

  function DropFile(files, event) {
    
      for(let i = 0; i < files.length; i++)
      {
          const file = files[i];
          file.text().then(LoadData);
      }
  }

  function LoadData(result) {
    const row = result.split("\n");
    let companyCol, firstNameCol, lastNameCol, titleCol, emailCol, notesCol, personaCol;

    if(row.length > 0) {
      const columns = row[0].split(",");
      for(let col = 0; col < columns.length; col++) {
        if(columns[col].match(/comp.*/i)) {
          companyCol = col;
        } else if(columns[col].match(/first.*/i)) {
          firstNameCol = col;
        } else if(columns[col].match(/last.*/i)) {
          lastNameCol = col;
        } else if(columns[col].match(/.*name.*/i)) {
          firstNameCol = col;
        } else if(columns[col].match(/title.*/i)) {
          titleCol = col;
        } else if(columns[col].match(/email.*/i)) {
          emailCol = col;
        } else if(columns[col].match(/notes/i)) {
          notesCol = col;
        } else if(columns[col].match(/(persona.*)/i)) {
          personaCol = col;
        }
      }
    }

    // start at 1 to skip header row
    for(let i = 1; i < row.length-1; i++) {
      const columns = row[i].split(",");

      const newVal = {};
      newVal.Company = columns[companyCol];
      newVal.Name = columns[firstNameCol];
      if(lastNameCol !== undefined) {
        newVal.Name += " " + columns[lastNameCol];
      }
      
      newVal.Title = columns[titleCol];
      newVal.Email = columns[emailCol];
      newVal.Notes = columns[notesCol];
      newVal.PersonaBand = columns[personaCol];
      if(newVal.PersonaBand === undefined || newVal.PersonaBand === "") {
        GetMessage(newVal);
      }

      addGridItem(gridItems => [...gridItems, newVal]);
    }
    
  }

  function GetMessage(newVal)
  {
    for(let i = 0; i < ruleItems.length; i++) {
      if(newVal.Title.match(new RegExp(ruleItems[i].rule, "i"))) {
        newVal.PersonaBand = ruleItems[i].name;
        newVal.Message = ruleItems[i].message;
        return;
      }
    }
    
    return "";
  }

  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  function DownloadCsvs() {

    let itemsToBeProcessed = gridItems;

    //create a file for each known rule
    for(const rule in ruleItems) {
      let ruleFollowingItems = itemsToBeProcessed.filter(g => g.PersonaBand === ruleItems[rule].name)
      CreateFile(ruleFollowingItems, ruleItems[rule].name + ".csv");

      itemsToBeProcessed = itemsToBeProcessed.filter(g => g.PersonaBand !== ruleItems[rule].name)
    }

    //create a file for all empty role items
    let unknownRuleItems = gridItems.filter(g => g.PersonaBand === undefined)
    CreateFile(unknownRuleItems, "unknownRole.csv");
    
    //create a file for everything else (roles already in the CSV, but not in rule cookies)
    itemsToBeProcessed = itemsToBeProcessed.filter(g => g.PersonaBand !== undefined)
    CreateFile(itemsToBeProcessed, "etc.csv");
  }

  function CreateFile(ruleFollowingItems, fileName) {
    if(ruleFollowingItems.length > 0) {
      var file = "CompanyName,ContactName,Title,Email,PersonaBand,PriorityTier,Notes,Message\n";
      for(let i = 0; i < ruleFollowingItems.length; i++) {
        file += GetRowText(ruleFollowingItems[i]);
      }

      download(fileName, file);
    }
  }

  function GetRowText(item) {
    let company = item.Company ? StripNewline(item.Company) : "";
    let name = item.Name ? StripNewline(item.Name) : "";
    let title = item.Title ? StripNewline(item.Title) : "";
    let email = item.Email ? StripNewline(item.Email) : "";
    let personaBand = item.PersonaBand ? StripNewline(item.PersonaBand) : "";
    let priorityTier = item.PriorityTier ? StripNewline(item.PriorityTier) : "";
    let notes = item.Notes ? StripNewline(item.Notes) : "";
    let message = item.Message ? StripNewline(item.Message) : "";
    
    return `${company},${name},${title},${email}` 
    + `,${personaBand},${priorityTier},${notes},${message}\n`;
  }

  function StripNewline(input) {
    return input.replace(/(\r\n|\n|\r)/gm, "");
  }
}