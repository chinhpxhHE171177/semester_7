const sovleLinearEquation = require('./linearEquation_CallBack.js');

const a = 5, b = 3;

sovleLinearEquation(a, b, (err, result) => {
    if (err) {
        console.log("Error: ", err);
    } else {
        console.log("The equation has solution is: " + result)
    }
});