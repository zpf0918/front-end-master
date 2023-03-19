const list = [
  {
    value: '1',
    used: true,
    children: [
      {
        value: '1.1',
      },
      {
        value: '1.2',
        used: true,
      },
      {
        value: '1.3',
        children: [
          {
            value: '1.3.1',
          },
          {
            value: '1.3.2',
            used: false,
          },
          {
            value: '1.3.3',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    used: false,
    children: [
      {
        value: '2.1',
      },
      {
        value: '2.2',
        used: false,
      },
    ],
  },
  {
    value: '3',
    used: true,
    children: [
      {
        value: '3.1',
      },
      {
        value: '3.2',
        used: true,
      },
    ],
  },
]


function filterUnusedNodes(nodes) {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.used === false || node.used === undefined) {
      nodes.splice(i, 1);
      i--;
    } else if (node.children && node.children.length > 0) {
      filterUnusedNodes(node.children);
    }
  }
  return nodes;
}

const res = filterUnusedNodes(list);
console.log(res);