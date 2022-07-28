import React from 'react'

function ListLocations(props) {
    console.log('here', props);
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Room Count</th>
                    <th>City</th>
                    <th>State</th>
                </tr>
                </thead>
                <tbody>
                {props.locations.map (location => {
                    return (
                    <tr key={location.href}>
                        <td>{ location.name }</td>
                        <td>{ location.room_count }</td>
                        <td>{ location.city }</td>
                        <td>{ location.state }</td>
                    </tr>
                );           
            })}
            </tbody>
    </table>
    )

}

export default ListLocations;