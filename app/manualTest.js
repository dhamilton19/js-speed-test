require('whatwg-fetch');

function test(){
    const startTime = Date.now();
    let downloadTime;
    fetch('/getResponse/1', {
        cache: 'no-cache',
        method: 'GET',
        headers: {
            'pragma': 'no-cache',
            'cache-control': 'no-cache'
        }
    })
        .then(response => {
            downloadTime = Date.now();
            return response.text();
        })
        .then(json => {
            print_results('download', startTime, downloadTime);
            print_results('read_bytes', downloadTime, Date.now());

            print_results('total', startTime, Date.now());
        });
}

function print_results(name, startTime, endTime){
    console.log(name+': ' + (endTime-startTime) +'ms');
}

test();