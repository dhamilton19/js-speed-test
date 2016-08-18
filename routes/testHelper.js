const numTests = 20;

function getNumTests(){
    return numTests;
}

function sliceTestFile(data, number){
    var keys = Object.keys(data);
    var numKeys = keys.length;
    var subset = number * numKeys/numTests;
    var newObject= {};
    for(var i=0;i<subset;i++){
        var key = keys[i];
        newObject[key] = data[key];
    }
    return newObject;
}

module.exports = {
    getNumTests: getNumTests,
    sliceTestFile: sliceTestFile
};