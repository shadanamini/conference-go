// Create new AttendeesList function component and export it as the default 
// Move the table JSX and its contents from App.js to the new function
// Import the AttendeesList from the AttendeesList.js module 
// Using the new AttendeesList function component in the App function component
import React from 'react'

function AttendeesList(props) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Conference</th>
                    <th>Created</th>
                </tr>
                </thead>
                <tbody>
                {props.attendees.map (attendee => {
                    return (
                    <tr key={attendee.href}>
                        <td>{ attendee.name }</td>
                        <td>{ attendee.email }</td>
                        <td>{ attendee.conference }</td>
                        <td>{ attendee.created }</td>
                    </tr>
                );           
            })}
            </tbody>
    </table>
    )

}

export default AttendeesList;