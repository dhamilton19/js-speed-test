require('whatwg-fetch');

let numTests = 14;
let testNum = 0;

function test(){
    const startTime = Date.now();
    let downloadTime;
    testNum++;
    fetch('/getResponse/'+testNum, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            'pragma': 'no-cache',
            'cache-control': 'no-cache',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
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
            if(testNum < numTests){
                setTimeout(test, 200);
            }
            else{
                console.log('Completed')
            }
        });
}

document.getElementById('button').addEventListener('click', () => {
    document.getElementById('button').disabled = true;
    test();
});