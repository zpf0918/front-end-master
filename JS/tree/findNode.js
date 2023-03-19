// 根据id找到城市级联中的该节点的父级路径 

// 数据
const data = [
  {
    id: '1',
    name: '内蒙古',
    children: [
      {
        id: '11',
        name: '包头市',
        children: [
          {
            id: '111',
            name: '青山区'
          },
          {
            id: '112',
            name: '昆区'
          },
          {
            id: '113',
            name: '九原区'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: '河南省',
    children: [
      {
        id: '21',
        name: '许昌市',
        children: [
          {
            id: '211',
            name: '禹州市',
            children: [
              {
                id: '2111',
                name: '神垕镇'
              }
            ]
          }
        ]
      }
    ]
  }
]

// 解法1： 给每一级构建一个path
const find1 = (data, path, id) => {
  let res = []
  const traverse = (data, path, id) => {
    for (let item of data) {
      item.path = path.concat(item.name);
      if (id === item.id) {
        res = item.path;
      } else {
        if (item.children && item.children.length !== 0) {
          traverse(item.children, item.path, id);
        }
      }
    }  
  }
  traverse(data, [], id);
  return res;
}

// 解法2： 直接递归返回
const find2 = (data, id) => {
  for (let item of data) {
    if (id === item.id) {
      return [item.name];
    } else {
      if (item.children && item.children.length !== 0) {
        const res = find(item.children, id);
        if (res !== undefind) {
          return [item.name].concat(res);
        }
      }
    }
  }
}