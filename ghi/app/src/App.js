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


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      locations: [],
      conferences: [],
      presentations: [],
      attendees: [],
    };

    this.loadConferences = this.loadConferences.bind(this);
    this.loadLocations = this.loadLocations.bind(this);
    this.loadPresentations = this.loadPresentations.bind(this);
    this.loadAttendees = this.loadAttendees.bind(this);

  }

    async loadConferences() {
      const response = await fetch("http://localhost:8000/api/conferences/");
      if(response.ok){
        const data = await response.json();
        this.setState({conferences: data.conferences});
      }
    }
  
    async loadLocations() {
      const response = await fetch("http://localhost:8000/api/locations/");
      if(response.ok) {
        const data = await response.json();
        this.setState({locations: data.locations});
      }
    }
  
    async loadPresentations() {
      const response = await fetch("http://localhost:8000/api/presentations/");
      if(response.ok) {
        const data = await response.json();
        this.setState({presentations: data.presentations});
      }
    }

    async loadAttendees() {
      const response = await fetch("http://localhost:8001/api/attendees/");
      if(response.ok) {
        const data = await response.json();
        this.setState({attendees: data.attendees});
      }
    }

    async componentDidMount() {
      this.loadConferences()
      this.loadLocations()
      this.loadPresentations()
      this.loadAttendees()
    }


  render() {
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
          <Route path="/conferences" element={<ListConferences conferences = {this.state.conferences} /> } />
          <Route path="/locations" element={<ListLocations locations = {this.state.locations} /> } />
          <Route path="/attendees" element={<AttendeesList attendees = {this.state.attendees} /> } />
        </Routes>
      </div>
    </BrowserRouter>
    )
  }
}

export default App;
