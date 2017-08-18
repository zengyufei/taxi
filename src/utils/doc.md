## 工具类相关说明


### tree-flatten

将 tree 变成 array 结构, 具体用法看代码.

``` javascript
const flatten = require('tree-flatten');

const tree = {
  name: 'root-1',
  children: [
    {
      name: 'root-1-1'
    }, {
      name: 'root-1-2',
      children:[{
        name: 'root-1-2-1'
      }]
    }
  ]
};

flatten(tree, 'children')

/*
******resutl*******
  [
    { name: 'root-1' },
    { name: 'root-1-1' },
    { name: 'root-1-2' },
    { name: 'root-1-2-1' },
  ]
*/
```

### tree-transform

将 array 转换成 tree，具体用法看代码。

```javascript
// transform(data, option)
/*
//default option 
{
    id: 'id',
    parent: 'parentId',
    children: 'children'
}
*/
var transform = require('tree-transform')
 
var a = [
  {
      id:1
  },{
    id:2,
    parentId:1
  },{
    id:3,
    parentId:2
  }
]
 
var b = transform(a)
/* 
******resutl*******
{
  id: 1, 
  children: [
    {
      id: 2,
      parentId: 1, 
      children: [
        {
          id: 3,
          parentId: 2
        }
      ]
    }
  ]
}  
*/
```