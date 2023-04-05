// 函数声明
function sum(x: number, y:number): number {
  return x + y;
}

sum(10, 2);

// 函数表达式
const sum1: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y;
}

sum1(1, 2);

// 使用接口定义
interface SearchFunc {
  (source: string, subString: string): boolean
}

// 使用type定义
type SearchFunc1 = (source: string, subString: string) =>  boolean;

let mySearch: SearchFunc1 = function (source: string, subString: string) {
  return false;
}

// 可选参数，必须放在最后
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName;
  } else {
    return firstName;
  }
}

let tocat = buildName('tom', 'cat');
let tom = buildName('tom');

// 默认参数，没有限制
function buildName2(firstName: string = 'Cat', lastName: string) {
  return firstName + ' ' + lastName;
}
let toct = buildName2('Tom', 'Cat');


// 函数重载
function reverse1(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}

function reverse(x: number): number;
function reverse(x: string): string; 
function reverse(x: number | string): number | string | void {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}

console.log(reverse(123));
console.log(reverse('abc'));

function average(arr: Array<number>): number;
function average(arr: Array<string>): number;
function average(arr: Array<number | string>): number {
  let sum = 0;
  for (let item of arr) {
    if (typeof item === 'number') {
      sum += item;
    } else if (typeof item === 'string' && !isNaN(parseFloat(item))) {
      sum += parseFloat(item);
    }
  }

  return sum / arr.length;
}

const res1 = average([1,2,3,4]);
const res2 = average(['1', '2', '3' ,'4']);
console.log(res1);
console.log(res2);

// 函数的重载是为了更加清晰和明确描述函数体内的逻辑，让代码变得更加健壮和安全。