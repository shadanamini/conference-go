import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { render } from "react-dom";
import { Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

async function loadAttendees() {
  const response = await fetch('http://localhost:8001/api/attendees/');
  console.log(response);

  if (response.ok) {
    const data = await response.json();

    root.render(
      <React.StrictMode>
        <App attendees={data.attendees} />
      </React.StrictMode>
    );}
  else {
    console.error(response);
  }

    // const selectTag = document.getElementById('_____')

    // for (let attendee in data.attendees) {
    //   const option = document.createElement('option');
    //   option.value = attendee.id;
    //   option.innerHTML = attendee.id.name;
    //   selectTag.appendChild(option)
    // }
}
loadAttendees();


