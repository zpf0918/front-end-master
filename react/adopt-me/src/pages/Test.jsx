import { useRef, useState, useEffect } from "react";

function createTodos() {
  console.log("okok");
  const todos = [];
  for (let i = 1; i <= 10; i++) {
    todos.push({
      id: i,
      name: `第${i}个`,
    });
  }
  return todos;
}

const Test = () => {
  const [num, setNum] = useState(0);
  const ref = useRef(0);
  const [todos, setTodos] = useState(createTodos);
  ref.current = 1;

  const handleNum = () => {
    setNum(num + 1);
  };

  const handleRef = () => {
    ref.current++;
  };

  useEffect(() => {});

  return <div></div>;
};

export default Test;
