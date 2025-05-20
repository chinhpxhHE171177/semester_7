const sovleLinearEquation = (a, b) => {
    return new Promise((resovle, reject) => {
        if (a === 0) {
            if (b === 0) {
                reject("The equation has infinitely many solution");
            } else {
                reject("The equation has no solution");
            }
        } else {
            let x = -b / a;
            resovle([x.toFixed(2)]);
        }
    });
}

module.exports = sovleLinearEquation;