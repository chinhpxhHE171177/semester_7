import { useState } from "react";
import { Button } from "react-native";

const handlePress = () => {
    console.log("Button just on pressed!");
};

<Button title="Click me" onPress={handlePress} />

const handlePress1 = (id) => {
    console.log(`Button ${id} just on pressed!`);
};

<Button title="Click me" onPress={() => handlePress1(1)} />


const MyComponent = () => {
    const [count, setCount] = useState(0);
    const increment = () => setCount(count + 1);

    return (
        <Button title="Click me" onPress={() => increment()} />
    );
};

const greet = (name) => {
    console.log(`Hello, ${name}!`);
};
greet("John");
const showInfo = (person) => {
    console.log(`Name: ${person.name}, Age: ${person.age}`);
}
const person = { name: "John", age: 30 };
showInfo(person);

//-----------------
const functionSumArray = (numbers) => {
    return numbers.reduce((total, num) => total + num, 0);
};

const numbers = [1, 2, 3, 4, 5];
console.log(functionSumArray(numbers)); // return 15

//------------------
const executeCallBack = (callback) => {
    console.log("Executing callback...");
    callback();
    console.log("Callback executed.");
}
executeCallBack(() => console.log("This is a callback function."));

//------------------
const printPersonInfo = (name, age) => {
    console.log(`Name: ${name}, Age: ${age}`);
}
const person1 = {name: "John", age: 20};
printPersonInfo(person1);

//-----------------
const printSomeElementArray = (first, second) => {
    console.log(`First: ${first}, Second: ${second}`);
}
const array = [10, 20, 30, 40, 50, 60 ,70 ,80];
printSomeElementArray(array[0], array[1]);

