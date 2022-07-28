import React from 'react';
import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendeeForm from './AttendeeForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PresentationForm from './PresentationForm';
import MainPage from './MainPage';
import ListConferences from './ListConferences';
import ListLocations from './ListLocations';




function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/conferences/new" element={<ConferenceForm />} />
          <Route path="/attendees/new" element={<AttendeeForm />} />
          <Route path="/locations/new" element={<LocationForm />} />
          <Route path="/presentations/new" element={<PresentationForm />} />
          <Route path="/conferences" element={<ListConferences conferences = {props.conferences} /> } />
          <Route path="/locations" element={<ListLocations locations = {props.locations} /> } />
          <Route path="/attendees" element={<AttendeesList attendees = {props.attendees} /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
