const { tokenSessionKey } = constant

const prefix = 'car'
const storeName = `${prefix}Store`

// 搜索条
const searchCacheKey = `${prefix}_condin`
const defaultSearchFields = ['carNo', 'plateNumber', 'carType']
const allSearchFields = ['carNo', 'plateNumber', 'carType', 'carFrame', 'ownershipNo', 'engineNumber', 'carColor', 'carStatus', 'certificateNo']
// 上传文件
const uploadAction = `${BASE_URL}/${prefix}/import.htm`
// 下载文件
const exportFileParam = ['carNo', 'plateNumber']

// 表格
const defaultTableFields = ['carNo', 'plateNumber', 'carType', 'carFrame', 'ownershipNo', 'ownershipBeginDate', 'ownershipEndDate', 'engineNumber', 'drivingLicenseDate', 'roadTransportBeginDate', 'roadTransportEndDate', 'carColor', 'carStatus', 'certificateNo']

module.exports = {
  tokenSessionKey,
  prefix,
  storeName,
  searchCacheKey,
  defaultSearchFields,
  allSearchFields,
  uploadAction,
  exportFileParam,
  defaultTableFields,
}
