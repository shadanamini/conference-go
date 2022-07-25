function alert(){
    return `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Error</strong> Something has gone wrong.  Please try again.
        </div>
    `;
}



window.addEventListener('DOMContentLoaded', async () => {

    function createCard(name, description, pictureUrl, startsString, endsString, location) {
        return `
             <div class="shadow mb-3 card">
                <img src=${pictureUrl} class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
                        <p class="card-text">${description}</p>
                    </div>
                    <div class = "card-footer">
                    ${startsString} - ${endsString}
                    </div>
            </div>
        `;
    }


    const url = 'http://localhost:8000/api/conferences/';
    try {
        const response = await fetch(url);

        if(!response.ok) {
            const html = alert();
            const error = document.querySelector('.error');
            error.innerHTML += html;
            throw new Error(alert);
        } else {
            const data = await response.json();

            for (let conference of data.conferences){
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const name = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const starts = new Date(details.conference.starts);
                    const ends = new Date(details.conference.ends);
                    const startsString = new Intl.DateTimeFormat('en-US').format(starts)
                    const endsString = new Intl.DateTimeFormat('en-US').format(ends)
                    const location = details.conference.location.name
                    const html = createCard(name, description, pictureUrl,startsString, endsString, location);
                    //const column = document.querySelector('.col');
                    const row = document.querySelector('.row');
                    //column.innerHTML += html;
                    row.innerHTML += html;
                    console.log(details)
                }
            }
        }
    }   catch (e) {
            error => console.error('error', error);
    }
});

