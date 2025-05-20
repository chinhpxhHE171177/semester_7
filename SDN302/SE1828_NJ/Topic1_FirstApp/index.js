// // Su dung arrow function viet mot ham tim nghiem cua phuong trinh bac nhat mot an 
// const linearEquation = (a, b) => {
//     if (a === 0) {
//         if (b === 0) {
//             return "Equation has infinite solutions";
//         } else {
//             return "Equation has no solution";
//         }
//     } else {
//         let x = -b / a;
//         return "Equation has one solution: " + [x.toFixed(2)];
//     }
// }

// Khai bao module se su dung trong chuong trinh nay 
const {linearEquation, test} = require("./linearEquation.js");
const quadraticEquation = require("./quadraticEquation.js");

// Goi ham
console.log(`The solution of the linear equation is: ${linearEquation(18, 12)}`);
test();

const a = 1, b = -5, c = 6;
const solution = quadraticEquation(a, b, c);
console.log(`Result: `, solution);
console.log(`The solution of the quadratic equation is: `, quadraticEquation(1, -5, -6));

