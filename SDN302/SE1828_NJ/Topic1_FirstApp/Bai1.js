// const printMessage = () => console.log("Hello World!");

// printMessage();

//Bài 1. Viết một chương trình sử dụng cú pháp arrow function để tìm số lớn nhất trong một mảng các số.
//C1:
// const arrays = [1, 8, 1, 2, 0, 3];
// const findMax = (arr) => Math.max(...arr);
// const numMax = findMax(arrays);
// console.log("Max: " + numMax);

//C2:
const findMax = (arr) => arr.length === 0 ? null : Math.max(...arr);
console.log(findMax([10, 20, 15, 30]));

//Bài 2. Viết một chương trình sử dụng cú pháp arrow function để lọc ra các số chẵn từ một mảng.
const evenNumbers = (arr=[]) => arr.filter(e => e % 2 === 0);
console.log(evenNumbers([3, 7, 18, 12, 14, 17]));


//Bài 3. Viết một chương trình sử dụng hàm để tìm tất cả các chuỗi chứa một ký tự hoặc từ khóa cụ thể trong mảng chuỗi ký tự.
const searchString = (arr = [], search) => arr.filter(e => e.toLowerCase().includes(search.toLowerCase()));
console.log(searchString(["Hello", "Hi", "FPT", "University"], "h"));
