// 单个节点
function breadthFirstSearchOne(node) {
  const result = [];
  const queue = [node];
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

// 多个节点
function breadthFirstSearchTwo(nodes) {
  const result = [];
  const queue = [];
  for (let node of nodes) {
    queue.push(node);
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

const resNode = breadthFirstSearchOne(node);
const resNodes = breadthFirstSearchTwo(nodes);
console.log(resNode);
console.log(resNodes);