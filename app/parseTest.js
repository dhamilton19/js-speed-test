require('whatwg-fetch');

let testNum = 0;

document.getElementById('test').style.visibility = 'hidden';

function begin(){
    json_test('dot_notation');
    json_test('bracket_notation');

    // json_parsing_test();

    // js_test('dot_notation');
    // js_test('bracket_notation');
}

function json_parsing_test(){
    fetch('/performance', {
        cache: 'no-cache',
        method: 'GET',
        headers: {
            'pragma': 'no-cache',
            'cache-control': 'no-cache'
        }
    })
        .then(response => {
            return response.json();
        })
        .then(json => {
            var startTime = Date.now(), data = json;
            data = test_json_stringify(data);
            print_results('json_stringify', startTime, Date.now());

            startTime = Date.now();
            data = test_json_parse(data);
            print_results('json_parse', startTime, Date.now());
        });
}

function json_test(name){
    const startTime = Date.now();
    let downloadTime;
    fetch('/performance', {
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
            console.log('Test #' + ++testNum);
            print_results('download', startTime, downloadTime);
            print_results('read_bytes', downloadTime, Date.now());
            json = JSON.parse(json);

            const testTime = Date.now();
            eval('test_' + name)(json);
            print_results(name, testTime, Date.now());

            print_results('total', startTime, Date.now());
            console.log('');
        });
}

function js_test(name){
    var startTime = Date.now();

    eval('test_' + name)(data);
    print_results(name, startTime, Date.now());
}

function print_results(name, startTime, endTime){
    console.log(name+': ' + (endTime-startTime) +'ms');
}

function test_dot_notation(data){
    //read data
    console.olog(data.catastropheUsefulLink);
}

function test_bracket_notation(data){
    //read data
    console.olog(data['catastropheUsefulLink']);
}

function test_json_parse(data){
    return JSON.parse(data);
}

function test_json_stringify(data){
    return JSON.stringify(data);
}

begin();