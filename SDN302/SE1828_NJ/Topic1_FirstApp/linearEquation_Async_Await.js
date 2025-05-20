async function linearEquation(a, b) {
    if (a === 0) {
        if (b === 0) {
            throw new Error("Equation has infinite solutions");
        } else {
            throw new Error("Equation has no solution");
        }
    } else {
        return "Equation has one solution: " + [(-b / a).toFixed(2)];
    }
}

module.exports = linearEquation;