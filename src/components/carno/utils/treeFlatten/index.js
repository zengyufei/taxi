let map = Array.prototype.map
let reduce = Array.prototype.reduce

let find = function (list, predicate) {
  let len = list.length
  for (let i = 0; i < len; i++) {
    if (predicate(list[i])) {
      return list[i]
    }
  }
  return undefined
}

function flatten(tree, getChildNodes, convertNode, generateId) {
  if (!convertNode) {
    convertNode = function (node) {
      if (!node) { node = {} }
      return node
    }
  }
  if (!generateId) { generateId = function () { return undefined } }
  let stack = tree && tree.length ? [{ pointer: tree, offset: 0 }] : []
  let flat = []
  let current
  while (stack.length) {
    current = stack.pop()
    while (current.offset < current.pointer.length) {
      let node = current.pointer[current.offset]
      let nodeId = generateId(node)
      let children = getChildNodes(node)
      flat.push(convertNode(node, current.node, nodeId, current.nodeId))
      current.offset += 1
      if (children) {
        stack.push(current)
        current = {
          pointer: children,
          offset: 0,
          node,
          nodeId,
        }
      }
    }
  }
  return flat
}
exports.flatten = flatten

function unflatten(list, isChildNode, addChildNode, convertNode) {
  if (convertNode === undefined) {
    return reduce.call(list, (tree, node) => {
      let parentNode = find(list, parent => { return isChildNode(node, parent) })
      if (parentNode === undefined) {
        tree.push(node)
      } else {
        addChildNode(node, parentNode)
      }
      return tree
    }, [])
  }
  let mappedList = map.call(list, node => {
    return ({
      in: node,
      out: convertNode(node),
    })
  })
  return reduce.call(mappedList, (tree, node) => {
    let parentNode = find(mappedList, parent => { return isChildNode(node.in, parent.in) })
    if (parentNode === undefined) {
      tree.push(node.out)
    } else {
      addChildNode(node.out, find(mappedList, treeNode => { return treeNode.in === parentNode.in }).out)
    }
    return tree
  }, [])
}
exports.unflatten = unflatten
