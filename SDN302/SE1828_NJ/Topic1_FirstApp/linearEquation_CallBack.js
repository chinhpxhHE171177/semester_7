const sovleLinearEquation = (a, b, callback) => {
    if (a === 0) {
        if (b === 0) {
            callback("The equation has infinitely many solution", null);
        } else {
            callback("The equation has no solution", null);
        }
    } else {
        let x = -b / a;
        callback(null, [x.toFixed(2)]);
    }
}

module.exports = sovleLinearEquation;