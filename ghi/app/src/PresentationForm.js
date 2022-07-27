import React from 'react';

class PresentationForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            presenterName: '',
            presenterEmail: '',
            companyName: '',
            title: '',
            synopsis: '',
            conferences: []
        };
        this.handlePresenterNameChange = this.handlePresenterNameChange.bind(this);
        this.handlePresenterEmailChange = this.handlePresenterEmailChange.bind(this);
        this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSynopsisChange = this.handleSynopsisChange.bind(this);
        this.handleConferenceChange = this.handleConferenceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state};
        data.presenter_name = data.presenterName;
        data.presenter_email = data.presenterEmail;
        data.company_name = data.companyName;
        delete data.presenterName;
        delete data.presenterEmail;
        delete data.companyName;
        delete data.conferences;
        console.log(data);

        const conferenceId = data.conference;
        const locationUrl = `http://localhost:8000${conferenceId}presentations/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference);

            const cleared = {
                presenterName: '',
                presenterEmail: '',
                companyName: '',
                title: '',
                synopsis: '',
                conference:'',
            };
            this.setState(cleared);
        }
    }

    handlePresenterNameChange(event) {
        const value = event.target.value;
        this.setState({presenterName: value})
    }                
    
    handlePresenterEmailChange(event) {
        const value = event.target.value;
        this.setState({presenterEmail: value})
    }

    handleCompanyNameChange(event) {
        const value = event.target.value;
        this.setState({companyName: value})
    }

    handleTitleChange(event) {
        const value = event.target.value;
        this.setState({title: value})
    }

    handleSynopsisChange(event) {
        const value = event.target.value;
        this.setState({synopsis: value})
    }

    handleConferenceChange(event) {
        const value = event.target.value;
        this.setState({conference: value})
    }

    async componentDidMount() {
        const url = 'http://localhost:8000/api/conferences/';
  
        const response = await fetch(url);
  
        if (response.ok) {
            const data = await response.json();
            this.setState({conferences: data.conferences});    
        }
    }
  render() {
    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create New Presentation</h1>
            <form onSubmit={this.handleSubmit} id="create-presentation-form">
              <div className="form-floating mb-3">
                <input value={this.state.presenterName} onChange={this.handlePresenterNameChange} placeholder="Presenter name" required type="text" name="presenter_name" id="presenter_name" className="form-control" />
                <label htmlFor="presenter_name">Presenter Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.presenterEmail} onChange={this.handlePresenterEmailChange} placeholder="Presenter email" required type="email" name="presenter_email" id="presenter_email" className="form-control" />
                <label htmlFor="presenter_email">Presenter Email</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.companyName} onChange={this.handleCompanyNameChange} placeholder="Company name" type="text" name="company_name" id="company_name" className="form-control" />
                <label htmlFor="company_name">Company Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.title} onChange={this.handleTitleChange} placeholder="Title" required type="text" name="title" id="title" className="form-control" />
                <label htmlFor="title">Title</label>
              </div>
              <div className="mb-3">
                <label htmlFor="synopsis">Synopsis</label>
                <textarea value={this.state.synopsis} onChange={this.handleSynopsisChange} className="form-control" id="synopsis" rows="3" name="synopsis"></textarea>
              </div>
              <div className="mb-3">
                <select value={this.state.conference} onChange={this.handleConferenceChange} required name="conference" id="conference" className="form-select">
                  <option value="">Choose Conference</option>
                  {this.state.conferences.map(conference => {
                      return (
                          <option value={conference.href} key={conference.href}>
                              {conference.name}
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

export default PresentationForm;