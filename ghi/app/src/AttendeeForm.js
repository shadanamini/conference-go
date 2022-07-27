import React from 'react';

class AttendeeForm extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            name: '',
            email: '',
            conferences: []
        };
        this.handleConferenceChange = this.handleConferenceChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state};
        delete data.conferences;
        console.log(data);

        const attendeeUrl = "http://localhost:8001/api/attendees/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            header: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(attendeeUrl, fetchConfig);
        if (response.ok){
            const newAttendee = await response.json();
            console.log(newAttendee);

            const cleared = {
                name: '',
                email: '',
                conference: '',
            }
            this.setState(cleared);
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value})
    };

    handleEmailChange(event) {
        const value = event.target.value;
        this.setState({email: value})
    }

    handleConferenceChange(event) {
        const value = event.target.value;
        this.setState({conference: value})
    }

    async componentDidMount() {
        const selectTag = document.getElementById('conference');
        const url = 'http://localhost:8000/api/conferences/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({conferences: data.conferences})
        
                
            }
        }
       
    render() {
        let spinnerClasses = 'd-flex justify-content-center mb-3'
        let dropdownClasses = 'form-select d-none'
        if (this.state.conferences.length > 0) {
            spinnerClasses = 'd-flex justify-content-center mb-3 d-none'
            dropdownClasses = 'form-select';
        }
        
        return (
            <div className="my-5">
            <div className="row">
            <div className="col col-sm-auto">
            {/* <style>{"body { background-color: #0dcaf0; }"}</style> */}
                <img width="300" className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" />
            </div>
            <div className="col">
                <div className="card shadow">
                <div className="card-body">
                    <form onSubmit={this.handleSubmit} id="create-attendee-form">
                    <div class="col-md-12 text-center">
                        <h1 className="card-title">It's Conference Time!</h1>
                    </div>
                    <div class="col-md-12 text-center">
                    <p className="mb-3">
                        Please choose which conference
                        you'd like to attend.
                    </p>
                    </div>
                    <div className={spinnerClasses} id="loading-conference-spinner">
                        <div className="spinner-grow text-secondary" role="status">
                        <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div className="form mb-3">
                        <select onChange={this.handleConferenceChange} value={this.state.conference} name="conference" id="conference" className={dropdownClasses} required>
                        <option value="">Choose Your Conference</option>
                        {this.state.conferences.map(conference => {
                            return (
                                <option key={conference.href} value={conference.href}>
                                    {conference.name}
                                </option>
                            );
                        })}
                        </select>
                    </div>
                    <div className="row">
                        <div className="col">
                        <div className="form-floating mb-3">
                            <input onChange={this.handleNameChange} value={this.state.name} required placeholder="Your full name" type="text" id="name" name="name" className="form-control" />
                            <label htmlFor="name">Enter Your Full Name</label>
                        </div>
                        </div>
                        <div className="col">
                        <div className="form-floating mb-3">
                            <input onChange={this.handleEmailChange} value={this.state.email} required placeholder="Your email address" type="email" id="email" name="email" className="form-control" />
                            <label htmlFor="email">Enter Your Email Address</label>
                        </div>
                        </div>
                    </div>
                    <div class="col-md-12 text-center">
                    <button className="btn btn-mb btn-primary">Attend!</button>
                    </div>
                    </form>
                    <div className="alert alert-success d-none mb-0" id="success-message">
                    Congratulations! You're all signed up!
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        );
    }
}

export default AttendeeForm;