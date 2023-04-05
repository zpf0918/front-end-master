// 断言联合类型
interface Cat {
  name: string,
  run: () => void;
}

interface Dog {
  name: string,
  swim: () => void
}

function getName(animal: Cat | Dog) {
  return animal.name;
}

function isDog(animal: Cat | Dog) {
  if (typeof (animal as Dog).swim === 'function') {
    return true;
  }
  return false;
}

// 父类断言
class ApiError extends Error {
  code: number = 0;
}

class HttpError extends Error {
  statusCode: number = 401;
}

function isApiError(err: Error) {
  if ((err as ApiError).code) {
    return true;
  }
  return false;
}

// 将任意一个类型断言为any
type MyObject = {
  a?: number
};
const obj: MyObject = {};

obj.a = 1;
(obj as any).foo = 1;

// 将any断言为某一个类型
function getData(key: string): any {
  return (obj as any).cache[key];
}

interface Cat1 {
  name: string;
  run(): void;
}

const tom1 = getData('tom') as Cat1;
tom1.run();

