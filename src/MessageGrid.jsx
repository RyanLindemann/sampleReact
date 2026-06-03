import React, { useState } from 'react';
import { FileDrop } from 'react-file-drop';
import './App.css';
import Cookies from 'universal-cookie';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';

export const MessageGrid = ({GetMessage}) => {
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
        <table>
          <tbody>
            {gridItems.map(item => 
            <tr key={"line" + item.name}>
              <td key={"lineName" + item.name}>{item.Name}</td>
              <td key={"lineTitle" + item.name}>{item.Title}</td>
              <td key={"lineMessage" + item.name}>{item.Message}</td>
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
}