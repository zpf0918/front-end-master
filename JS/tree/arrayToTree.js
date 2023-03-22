function arrayToTree(array) {
  const map = {};
  const roots = [];

  array.forEach(node => {
    map[node.id] = { ...node, children: map[node.id]?.children || [] };
    if (node.parentId === undefined || node.parentId === null) {
      roots.push(node.id);
    } else {
      if (!map[node.parentId]) {
        map[node.parentId] = { id: node.parentId, children: [] };
      }
      map[node.parentId].children.push(map[node.id]);
    }
  })

  const res = [];
  roots.forEach(rootId => {
    res.push(map[rootId]);
  })
  return res;
}

const arr = [
  { id: 2, name: 'Node 2', parentId: 1 },
  { id: 3, name: 'Node 3', parentId: 1 },
  { id: 4, name: 'Node 4', parentId: 2 },
  { id: 5, name: 'Node 5', parentId: 2 },
  { id: 6, name: 'Node 6', parentId: 3 },
  { id: 7, name: 'Node 7', parentId: 3 },
  { id: 8, name: 'Node 8', parentId: 4 },
  { id: 9, name: 'Node 9', parentId: 4 },
  { id: 10, name: 'Node 10', parentId: 5 },
  { id: 11, name: 'Node 11', parentId: 5 },
  { id: 12, name: 'Node 12' },
  { id: 1, name: 'Node 1' },
];

console.log(arrayToTree(arr))