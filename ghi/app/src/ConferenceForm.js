import React from 'react';

class ConferenceForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            starts:'',
            ends: '',
            description:'',
            maximumPresentations:'',
            maximumAttendees:'',
            locations: []     
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStartsChange = this.handleStartsChange.bind(this);
        this.handleEndsChange = this.handleEndsChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleMaximumPresentationsChange = this.handleMaximumPresentationsChange.bind(this);
        this.handleMaximumAttendeesChange = this.handleMaximumAttendeesChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.max_presentations = data.maximumPresentations;
        data.max_attendees = data.maximumAttendees;
        delete data.maximumPresentations;
        delete data.maximumAttendees;
        delete data.locations;
        console.log(data);

        const conferenceUrl = "http://localhost:8000/api/conferences/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            header: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok){
            const newConference = await response.json();
            console.log(newConference)

            const cleared ={
                name: '',
                starts:'',
                ends: '',
                description:'',
                maximumPresentations:'',
                maximumAttendees:'',
                location: '', 
            };
            this.setState(cleared);
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value})
    };
    handleStartsChange(event) {
        const value = event.target.value;
        this.setState({starts: value})
    };
    handleEndsChange(event) {
        const value = event.target.value;
        this.setState({ends: value})
    };
    handleDescriptionChange(event) {
        const value = event.target.value;
        this.setState({description: value})
    };
    handleMaximumPresentationsChange(event) {
        const value = event.target.value;
        this.setState({maximumPresentations: value})
    };
    handleMaximumAttendeesChange(event) {
        const value = event.target.value;
        this.setState({maximumAttendees: value})
    }
    handleLocationChange(event) {
        const value = event.target.value;
        this.setState({location: value})
    };
    async componentDidMount(){
        const url = "http://localhost:8000/api/locations/";
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            this.setState({locations: data.locations});            
        }
    }
  render() {
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create New Conference</h1>
                    <form onSubmit = {this.handleSubmit} id="create-conference-form">
                    <div className="form-floating mb-3">
                        <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name = "name" id="name" className="form-control" />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleStartsChange} value={this.state.starts} placeholder="Starts" required type="date" name = "starts" id ="starts" className="form-control" />
                        <label htmlFor="starts">Starts</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleEndsChange} value={this.state.ends} placeholder="Ends" required type="date" name = "ends" id="name" className="form-control" />
                        <label htmlFor="ends">Ends</label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description">Description</label>
                        <textarea onChange={this.handleDescriptionChange} value={this.state.description} rows = "5" name = "description" id="description" className="form-control"></textarea>   
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleMaximumPresentationsChange} value={this.state.maximumPresentations} placeholder="Maximum presentations" required type="number" name = "max_presentations" id="max_presentations" className="form-control" />
                        <label htmlFor="room_count">Maximum Presentations</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleMaximumAttendeesChange} value={this.state.maximumAttendees} placeholder="Maximum attendees" required type="number" name = "max_attendees" id="max_attendees" className="form-control" />
                        <label htmlFor="room_count">Maximum Attendees</label>
                    </div>
                    <div className="mb-3">
                        <select onChange={this.handleLocationChange} value={this.state.location} required id="location" className="form-select" name="location">
                            <option value="">Choose Location</option>
                            {this.state.locations.map(location => {
                                return (
                                    <option key = {location.id} value = {location.id}>
                                        {location.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <button className="btn btn-primary">Create!</button>
                    </form>
                </div>
            </div>
      </div>
    );
  }
}

export default ConferenceForm;