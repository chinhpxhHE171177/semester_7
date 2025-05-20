const sovleLinearEquation = require('./linearEquation_Promise.js');

const a = 18, b = 12;

sovleLinearEquation(a, b).then(result => {
    console.log("The euqation has solution is: " + result);
}).catch((err) => {
    console.log("Error: ", err);
});