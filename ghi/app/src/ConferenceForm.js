import React from 'react';

class ConferenceForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            starts: '',
            ends: '',
            description: '',
            maxPresentations: '',
            maxAttendees: '',
            locations: []
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStartsChange = this.handleStartsChange.bind(this);
        this.handleEndsChange = this.handleEndsChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleMaxPresentationsChange = this.handleMaxPresentationsChange.bind(this);
        this.handleMaxAttendeesChange = this.handleMaxAttendeesChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleNameChange(event) {
        const value= event.target.value;
        this.setState({name: value})
    }

    handleStartsChange(event) {
        const value= event.target.value;
        this.setState({starts: value})
    }

    handleEndsChange(event) {
        const value= event.target.value;
        this.setState({ends: value})
    }

    handleDescriptionChange(event) {
        const value= event.target.value;
        this.setState({description: value})
    }

    handleMaxPresentationsChange(event) {
        const value= event.target.value;
        this.setState({maxPresentations: value})
    }

    handleMaxAttendeesChange(event) {
        const value= event.target.value;
        this.setState({maxAttendees: value})
    }

    handleLocationChange(event) {
        const value= event.target.value;
        this.setState({location: value})
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.max_presentations = data.maxPresentations;
        delete data.maxPresentations;
        data.max_attendees = data.maxAttendees;
        delete data.maxAttendees;
        delete data.locations;
        console.log(data);

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
          const newConference = await response.json();
          console.log(newConference)

          const cleared = {
              name: '',
              starts: '',
              ends: '',
              description: '',
              maxPresentations: '',
              maxAttendees: '',
              locations: [],
          };
          this.setState(cleared);
        }
    }

    async componentDidMount() {
        const url = "http://localhost:8000/api/locations/"

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error("Response not ok")
        }
        else {
            const data = await response.json();

            this.setState({locations: data.locations});

            // const selectTag = document.getElementById('location');

            // for (let location of data.locations) {
            //     const option = document.createElement('option');
            //     option.value = location.id;
            //     option.innerHTML = location.name;
            //     selectTag.appendChild(option)
            // } 
        }
    }

    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
              <div class="col-md-12 text-center">
                    <h1>Create New Conference</h1>
                </div>
                <form onSubmit={this.handleSubmit} id="create-conference-form">
                  <div className="form-floating mb-3">
                    <input value={this.state.name} onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.starts} onChange={this.handleStartsChange} placeholder="Starts" required type="date" name="starts" id="starts" className="form-control"/>
                    <label htmlFor="starts">Starts</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.ends} onChange={this.handleEndsChange} placeholder="Ends" required type="date" name="ends" id="ends" className="form-control"/>
                    <label htmlFor="ends">Ends</label>
                  </div>
                  <div className="form-floating mb-3">
                    <textarea value={this.state.description} onChange={this.handleDescriptionChange} className="form-control" placeholder="Description" required type="text" name="description" id="description" rows="3"></textarea>
                    <label htmlFor="description">Description</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.maxPresentations} onChange={this.handleMaxPresentationsChange} placeholder="Max Presentations" required type="number" name="max_presentations" id="max_presentations" className="form-control"/>
                    <label htmlFor="max_presentations">Max Presentations</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.maxAttendees} onChange={this.handleMaxAttendeesChange} placeholder="Max Attendees" required type="number" name="max_attendees" id="max_attendees" className="form-control"/>
                    <label htmlFor="max_attendees">Max Attendees</label>
                  </div>
                  <div className="mb-3">
                    <select value={this.state.location} onChange={this.handleLocationChange} required name="location" id="location" className="form-select">
                      <option value="">Choose Location</option>
                      {this.state.locations.map(location => {
                          return (
                              <option key={location.href} value={location.id}>
                                  {location.name}
                              </option>
                          )
                      })}
                    </select>
                  </div>
                    <div class="col-md-12 text-center">
                        <button className="btn btn-primary">Create!</button>
                    </div>
                </form>
              </div>
            </div>
          </div>
        );
    }
}
export default ConferenceForm;