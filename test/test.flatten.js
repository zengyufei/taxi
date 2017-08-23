let uft = require('../src/utils/treeFlatten')

let tree = [
  { name: 'A',
    items: [
      { name: 'B' },
      { name: 'C' },
    ] },
  { name: 'D',
    items: [
      { name: 'E', items: [] },
    ] },
]

let list = uft.flatten(
  tree,
  node => node.items, // obtain child nodes
  node => node.name // create output node
)

console.log(list)
module.exports = list
