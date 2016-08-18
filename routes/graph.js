
function getData(data){
    var dataPoints = [];
    const keys = Object.keys(data);
    for(var i=0;i<keys.length;i++){
        var item = data[keys[i]];
        var subItemKeys = Object.keys(item);
        var subItemDataPoints = [];
        for(var j=0;j<subItemKeys.length;j++){
            var subItem = item[subItemKeys[j]];
            subItemDataPoints.push(subItem.byteTime);
        }
        dataPoints.push({
            name: keys[i],
            data: subItemDataPoints
        });

    }
    return dataPoints;
}

function getCharacterSizes(data){
    var characterSizes = [];
    var set = Object.keys(data)[0];
    var keys = Object.keys(data[set]);
    for(var i=0;i<keys.length;i++){
        var key = keys[i];
        characterSizes.push(data[set][key].characters);
    }
    return characterSizes;
}

module.exports = function(data){
    return {
        title: {
            text: 'Load Time vs Character Size',
            x: -20 //center
        },
        xAxis: {
            categories: getCharacterSizes(data)
        },
        yAxis: {
            title: {
                text: 'Load Time'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'ms'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: getData(data)
    }
};