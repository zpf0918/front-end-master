function breadthFirstSearch(root) {
  const nodes = Array.isArray(root) ? root : [root];
  const result = [];
  const queue = [];
  for (let i = 0; i < nodes.length; i++) {
    queue.push(nodes[i]);
  }
  while (queue.length !== 0) {
    const item = queue.shift();
    result.push(item);
    const children = item.children || [];
    for (let i = 0; i < children.length; i++) {
      queue.push(children[i]);
    }
  }
  return result;
}

// 返回一个二维数组，二维数组中的每个元素为一层
function breadthFirstSearchTwo(value) {
  const nodes = Array.isArray(value) ? value : [value];
  const result = [], queue = [];
  for (let node of nodes) {
    queue.push(node);
  }

  while (queue.length !== 0) {
    const size = queue.length;
    const level = [];
    for (let i = 0; i < size; i++) {
      const item = queue.shift();
      level.push(item.name);
      const children = item.children || [];
      for (let j = 0; j < children.length; j++) {
        queue.push(children[j]);
      }
    }
    result.push(level);
  }
  return result;
}

const node = {
  name: 'name0',
  children: [
    {
    name: 'name1',
    children: [
      {
        name: 'name11',
        children: [
        {
          name: 'name111',
        }
    ]
      }
    ]
  },
  {
    name: 'name2',
    children: [
      {
        name: 'name22',
      }
    ]
  }
  ]
}

const nodes = [
  {
    name: 'name1',
    children: [
      {
        name: 'name11',
        children: [
        {
          name: 'name111',
        }
    ]
      }
    ]
  },
  {
    name: 'name2',
    children: [
      {
        name: 'name22',
      }
    ]
  }
]

const resNode = breadthFirstSearch(node);
const resNodes = breadthFirstSearch(nodes);
console.log(resNode);
console.log(resNodes);