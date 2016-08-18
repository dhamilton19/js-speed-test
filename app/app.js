require('./styles.css');


(function () {
    const logger = document.getElementById('output');
    consoleFunctionSetup(logger, 'log', 'log');
})();

function consoleFunctionSetup(logger, func, outputClass){
    console['o' + func] = console[func];
    console[func] = function (message) {
        console['o' + func](message);
        if (typeof message == 'object') {
            message = (JSON && JSON.stringify ? JSON.stringify(message) : message);
        }
        logger.innerHTML += '<div class="output-message output-' + outputClass + '">' + message + '</div>';
        
    }
}


require('./viewGraph');