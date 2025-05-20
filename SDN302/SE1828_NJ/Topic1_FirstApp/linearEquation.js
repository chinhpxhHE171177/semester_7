// Su dung arrow function viet mot ham tim nghiem cua phuong trinh bac nhat mot an 
const linearEquation = (a, b) => {
    if (a === 0) {
        if (b === 0) {
            return "Equation has infinite solutions";
        } else {
            return "Equation has no solution";
        }
    } else {
        let x = -b / a;
        return "Equation has one solution: " + [x.toFixed(2)];
    }
}

function test() {
    console.log("Test function");
}

// Xuat khau module nay 
//module.exports = linearEquation; //Default module 
//module.exports = {test}; // neu nhieu thanh phan thi them dau phay

module.exports = { linearEquation, test };