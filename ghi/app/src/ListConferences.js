import React from 'react'

function ListConferences(props) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Starts</th>
                    <th>Ends</th>
                    <th>Max Presentations</th>
                    <th>Max Attendees</th>
                    <th>Location</th>
                </tr>
                </thead>
                <tbody>
                {props.conferences.map (conference => {
                    return (
                    <tr key={conference.href}>
                        <td>{ conference.name }</td>
                        <td>{ conference.starts }</td>
                        <td>{ conference.ends }</td>
                        <td>{ conference.max_presentations }</td>
                        <td>{ conference.max_attendees }</td>
                        <td>{ conference.location }</td>
                    </tr>
                );           
            })}
            </tbody>
    </table>
    )

}

export default ListConferences;