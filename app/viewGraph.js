require('whatwg-fetch');
import Highcharts from 'highcharts';


(function(){

    document.getElementById('test').style.visibility = 'hidden';

    fetch('/graph').then(config => {
        return config.json();
    }).then(json => {
        new Highcharts.Chart({
            chart : {
                renderTo : 'container'
            },
            ...json
        });
    });
})();