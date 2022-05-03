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

            data['hydra:member'].forEach(zaznam => {
                dataHosp[0].push(zaznam.datum);
                dataHosp[1].push(zaznam.pocet_hosp);
            });


            c3.generate({
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

            /* TODO next series
            setTimeout(function () {
                chart.load({
                    columns: [
                        ['data3', 400, 500, 450, 700, 600, 500]
                    ]
                });
            }, 1000);
            */
        })
    })
    .catch(error => {
        console.error('Chyba aplikace (pocty hospitalizovanych): ', error);
    })