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




### flatten

Converts tree to list.

```javascript
var uft = require('un-flatten-tree');

var tree = [
    {name: 'A', items: [
        {name: 'B'},
        {name: 'C'}
    ]},
    {name: 'D', items: [
        {name: 'E', items: []}
    ]}
];
```
```javascript
var list = uft.flatten(
    tree,
    node => node.items, // obtain child nodes
    node => node.name   // create output node
);
list should be ['A', 'B', 'C', 'D', 'E']
```
### unflatten

Converts list to tree.
```javascript
var uft = require('un-flatten-tree');

var list = [
    {id: 1, pid: null},
    {id: 2, pid: null},
    {id: 3, pid: 2},
    {id: 4, pid: 3},
    {id: 5, pid: 4}
];
```
```javascript
var tree = uft.unflatten(
    list,
    (node, parentNode) => node.pid === parentNode.id,  // check if node is a child of parentNode
    (node, parentNode) => parentNode.items.push(node), // add node to parentNode
    node => ({id: node.id, items: []})                 // create output node
);
```
tree should be
```javascript
[
    {id: 1, items: []}, 
    {id: 2, items: [
        {id: 3, items: [
            {id: 4, items: [
                {id: 5, items: []}
            ]}
        ]}
    ]}
]
```
More complex examples of usage can be found in tests folder.