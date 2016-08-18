require('whatwg-fetch');

let numTests = 0;
let testNum = 0;

function begin(){
    fetch('/getNumTests')
        .then(response => {
        return response.json();
    })
        .then(json => {
            numTests = parseInt(json.num);
            test();
        });
}

function test(){
    const startTime = Date.now();
    let downloadTime;
    fetch('/getTest', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'pragma': 'no-cache',
            'cache-control': 'no-cache',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({num:testNum})
    })
        .then(response => {
            downloadTime = Date.now();
            return response.text();
        })
        .then(text => {
            const byteTime = Date.now();
            const endTime = Date.now()-startTime;

            results(downloadTime-startTime, byteTime-downloadTime, endTime, text.length);
        });
}

function results(downloadTime, byteTime, totalTime, characters){
    fetch('/postResult', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            device: document.getElementById('selectField').value,
            downloadTime,
            byteTime,
            totalTime,
            characters
        })
    })
        .then(() => {
            ++testNum;
            if(testNum <= numTests){
                setTimeout(test, 500);
            }
            else{
                console.log('Completed')
            }
        });
}

document.getElementById('button').addEventListener('click', () => {
    document.getElementById('button').disabled = true;
    begin();
});