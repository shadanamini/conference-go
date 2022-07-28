import React from 'react'

function ListPresentations(props) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Presenter Name</th>
                    <th>Presenter Email</th>
                    <th>Company Name</th>
                    <th>Title</th>
                    <th>Synopsis</th>
                    <th>Conference</th>
                </tr>
                </thead>
                <tbody>
                {props.max_presentations.map (presentation => {
                    return (
                    <tr key={presentation.href}>
                        <td>{ presentation.presenter_name }</td>
                        <td>{ presentation.presenter_email }</td>
                        <td>{ presentation.company_name }</td>
                        <td>{ presentation.title }</td>
                        <td>{ presentation.synopsis }</td>
                        <td>{ presentation.conference }</td>
                    </tr>
                );           
            })}
            </tbody>
    </table>
    )

}

export default ListPresentations;