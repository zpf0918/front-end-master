function depthFirstSearch(nodes) {
  const result = [];
  const stack = [];
  for (let i = nodes.length - 1; i >= 0; i--) {
    stack.push(nodes[i]);
  }
  while (stack.length !== 0) {
    const item = stack.pop();
    result.push(item);
    const children = item.children || [];
    for (let i = children.length - 1; i >= 0; i--) {
      stack.push(children[i]);
    }
  }
  return result;
}

function depthFirstSearchTwo(node) {
  const result = [];
  const traverse = (node) => {
    result.push(node);
    const children = node.children || [];
    for (let i = 0; i < children.length; i++) {
      traverse(children[i]);
    }
  }
  traverse(node);
  return result;
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

const res = depthFirstSearch(nodes);
const resTwo = depthFirstSearchTwo(node);
console.log(resTwo);