import React, { useState } from 'react';
import { FileDrop } from 'react-file-drop';
import Button from 'react-bootstrap/Button';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

export const MessageGrid = ({ ruleItems }) => {
  const [gridItems, addGridItem] = useState([]);
  const styles = { border: '1px solid black', width: 600, color: 'black', padding: 20 };
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
        <Button variant="primary" onClick={() => DownloadCsv()}>Press Me</Button>
        <table>
          <tbody>
            <tr key={"header"}>
              <td key={"headerCompany"}>Company</td>
              <td key={"headerName"}>Name</td>
              <td key={"headerTitle"}>Title</td>
              <td key={"headerEmail"}>Email</td>
              <td key={"headerPersona"}>Persona</td>
              <td key={"headerMessage"}>Message</td>
              <td key={"headerPriority"}>Priority</td>
              <td key={"headerNotes"}>Notes</td>
            </tr>
            {gridItems.map(item => 
            <tr key={"line" + item.name}>
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

  function DownloadCsv() {
    var file = "CompanyName,ContactName,Title,Email,PersonaBand,PriorityTier,Notes\n";
    for(let i = 0; i < gridItems.length; i++) {
      console.log("test(" + gridItems[i].Company + ")");
      let company = gridItems[i].Company ? StripNewline(gridItems[i].Company) : "";
      let name = gridItems[i].Name ? StripNewline(gridItems[i].Name) : "";
      let title = gridItems[i].Title ? StripNewline(gridItems[i].Title) : "";
      let email = gridItems[i].Email ? StripNewline(gridItems[i].Email) : "";
      let personaBand = gridItems[i].PersonaBand ? StripNewline(gridItems[i].PersonaBand) : "";
      let priorityTier = gridItems[i].PriorityTier ? StripNewline(gridItems[i].PriorityTier) : "";
      let notes = gridItems[i].Notes ? StripNewline(gridItems[i].Notes) : "";
      
      file += `${company},${name},${title},${email}` 
      + `,${personaBand},${priorityTier},${notes},\n`;
    }
    
    download("test.csv", file);
  }

  function StripNewline(input) {
    return input.replace(/(\r\n|\n|\r)/gm, "");
  }
}