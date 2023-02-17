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