const fs = require('fs')
const path = require('path')

const findFiles = []
let sourcePath = ''

function readSyncDirToPath(dirPath, isAbsolute = true, level = 0, reg = /.js$/) {
  const split = '/'

  const projectPath = path.join(process.cwd(), split)
  const preDirPath = process.cwd().length < 4 ? dirPath : dirPath.replace(projectPath, '')
  if (sourcePath === '') {
    sourcePath = path.join(projectPath, preDirPath)
  }

  if (dirPath.indexOf(process.cwd()) === -1) {
    console.log(`项目路径： ${projectPath}`)
    console.log(`查找路径： findDirPath`)
  }

  const loadPath = path.join(projectPath, preDirPath, split)

  const readdir = fs.readdirSync(loadPath)
  readdir.forEach(ele => {
    const absolutePath = path.join(loadPath, ele)
    const relativePath = path.join(preDirPath, ele)

    const tempSingleFile = fs.statSync(absolutePath)
    if (tempSingleFile.isDirectory()) {
      console.log(`找到一个文件夹： ${relativePath}`)
      console.log('-----------------')
      if (ele.indexOf('.') !== 0) {
        readSyncDirToPath(absolutePath, isAbsolute, level, reg)
      }
    } else if (reg.test(ele)) {
      const fileLevel = absolutePath.substring(sourcePath.length + 1, absolutePath.length).split('\\').length
      if (level === 0) {
        findFiles.push(isAbsolute ? absolutePath : relativePath)
      } else if (fileLevel >= level) {
        findFiles.push(isAbsolute ? absolutePath : relativePath)
      }
    }
  })
  return findFiles
}

module.exports = readSyncDirToPath
