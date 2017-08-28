/**
 * 遍历 mock 文件夹，获取 mock 接口
 */
const fs = require('fs')
const path = require('path')

const perfix = 'mock'

let files = []
let filePaths = []
function readSyncDirToPath(dirPath, isAbsolute = true, excludeFile) {
  const split = '/'

  const projectPath = path.join(process.cwd(), split)
  const preDirPath = process.cwd().length < 4 ? dirPath : dirPath.replace(projectPath, '')

  if (dirPath.indexOf(process.cwd()) > -1) {
    console.log(`上次目录： ${preDirPath}`)
  } else {
    console.log(`项目路径加载： ${projectPath}`)
    console.log(`首次加载： ${preDirPath}`)
  }

  const loadPath = path.join(projectPath, preDirPath, split)
  console.log(`本次查找目录： ${loadPath}`)

  const readdir = fs.readdirSync(loadPath)
  readdir.forEach(ele => {
    const absolutePath = path.join(loadPath, ele)
    const relativePath = path.join(preDirPath, ele)
    const tempSingleFile = fs.statSync(absolutePath)
    let exclude = false
    excludeFile && excludeFile.forEach(e => {
      if (e === ele) {
        exclude = true
      }
    })
    if (exclude) {
      return
    }
    if (tempSingleFile.isDirectory()) {
      if (ele.indexOf('.') !== 0) {
        console.log(`找到一个文件夹： ${relativePath}`)
        readSyncDirToPath(absolutePath, isAbsolute, excludeFile)
      }
    } else if (/.js$/.test(ele)) {
      console.log(`添加一个文件到集合： ${relativePath}`)
      filePaths.push(isAbsolute ? absolutePath : relativePath)
    }
  })
  console.log(`查找完毕： ${preDirPath}`)
  console.log('-----------------')
  return filePaths
}

function readSyncDirToRequire(dirPath, isAbsolute = true, excludeFile) {
  const fileAbsolutePaths = readSyncDirToPath(dirPath, isAbsolute, excludeFile)
  fileAbsolutePaths.forEach(absolutePath => {
    Object.assign(files, require(absolutePath))
  })
  return files
}

let mock = {}
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev') {
  Object.assign(mock, readSyncDirToRequire(`${perfix}/before`))
  Object.assign(mock, readSyncDirToRequire(perfix, true, ['before']))
  console.log(mock)
}
module.exports = mock
