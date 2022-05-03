fetch('./variables.json')
    .then(response => response.json())
    .then(variables => {
        fetch(`https://onemocneni-aktualne.mzcr.cz/api/v3/hospitalizace?apiToken=${variables.apiToken}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
    })
    .catch(error => {
        console.error('Chyba aplikace (pocty hospitalizovanych): ', error);
    })