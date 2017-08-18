/**
 * 遍历 mock 文件夹，获取 mock 接口
 */
import fs from 'fs';
import path from 'path';
const perfix = 'mock';

let files = []
let filePaths = []
function readSyncDirToPath(dirPath, isAbsolute = true) {
  const split = '/';

  const projectPath = path.join(process.cwd(), split);
  const preDirPath = process.cwd().length < 4 ? dirPath : dirPath.replace(projectPath, '');

  if (dirPath.indexOf(process.cwd()) > -1) {
    console.log(`上次目录： ${preDirPath}`);
  } else {
    console.log(`项目路径加载： ${projectPath}`);
    console.log(`首次加载： ${preDirPath}`);
  }

  const loadPath = path.join(projectPath, preDirPath, split);
  console.log(`本次查找目录： ${loadPath}`);

  const readdir = fs.readdirSync(loadPath);
  readdir.forEach((ele) => {
    const absolutePath = path.join(loadPath, ele);
    const relativePath = path.join(preDirPath, ele);
    const tempSingleFile = fs.statSync(absolutePath);
    if (tempSingleFile.isDirectory()) {
      if (ele.indexOf('.') !== 0) {
        console.log(`找到一个文件夹： ${relativePath}`);
        readSyncDirToPath(absolutePath, isAbsolute);
      }
    } else if (/.js$/.test(ele)) {
      console.log(`添加一个文件到集合： ${relativePath}`);
      const perfixPath = loadPath.replace(process.cwd(), '').replace('\\', './');
      filePaths.push(isAbsolute ? absolutePath : relativePath);
    }
  });
  console.log(`查找完毕： ${preDirPath}`);
  console.log('-----------------');
  return filePaths;
}

function readSyncDirToRequire(dirPath, isAbsolute = true) {
  const filePaths = readSyncDirToPath(dirPath, isAbsolute);
  filePaths.map((path) => {
    Object.assign(files, require(path));
  });
  return files;
}

let mock = {};
if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'dev') {
  mock = readSyncDirToRequire(perfix);
}

module.exports = mock;
