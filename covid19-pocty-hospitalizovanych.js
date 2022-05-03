fetch('./variables.json')
    .then(response => response.json())
    .then(variables => {
        fetch(`https://onemocneni-aktualne.mzcr.cz/api/v3/hospitalizace?apiToken=${variables.apiToken}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            let dataHosp = [
                ['x'],
                ['Celkový počet hospitalizovaných']
            ];

            let dataHospNext = [
                ['Stav bez příznaků nebo lehký'],
                ['Stav střední nebo těžký']
            ];

            data['hydra:member'].forEach(zaznam => {
                dataHosp[0].push(zaznam.datum);
                dataHosp[1].push(zaznam.pocet_hosp);
                dataHospNext[0].push(zaznam.stav_bez_priznaku + zaznam.stav_lehky);
                dataHospNext[1].push(zaznam.stav_stredni + zaznam.stav_tezky);
            });


            let chart = c3.generate({
                bindto: '#js-pocet-hospitalizovanych',
                data: {
                    x: 'x',
                    columns: dataHosp
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            format: '%d.%m.%Y'
                        }
                    }
                }
            });

            setTimeout(function () {
                chart.load({
                    columns: dataHospNext
                });
            }, 5000);
        })
    })
    .catch(error => {
        console.error('Chyba aplikace (pocty hospitalizovanych): ', error);
    })