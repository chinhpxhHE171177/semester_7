const linearEquationAsync_Await = require("./linearEquation_Async_Await.js");

const linearEquation = async (a, b) => {
    try {
        const result = await linearEquationAsync_Await(0, 1); // Must be complete function\
        //Is resovle 
        console.log(`The solution of the linear equation is: ${result}`);
    } catch (error) {
        //Is reject 
        console.log("Error: " + error.message);
    }
}

//call async function 
linearEquation();