import { extend } from 'ModelUtils'
import { Cascader } from 'antd'
import { local } from 'utils/storage'

const prefix = 'common'

// 区域，省市
const queryAreasUrl = '/areacode/queryAll2'
const areakey = 'areas'
const areaTreekey = 'areaTree'
const areaCityTreekey = 'areaCityTree'
const areaMapkey = 'areaMap'

export default extend({
  namespace: `${prefix}Store`,
  state: {
    [areakey]: local.get(areakey) || [],
    [areaTreekey]: local.get(areaTreekey) || [],
    [areaCityTreekey]: local.get(areaCityTreekey) || [],
  },
  effects: {
    * queryAreas({}, { get, update, localCache, arrayToTree, arrayToMap, tableBindType, _, formBindType }) {
      let areaCache = localCache.get(areakey)
      let areaMap = localCache.get(areaMapkey)
      let areaTree = localCache.get(areaTreekey)
      let areaCityTree = localCache.get(areaCityTreekey)

      if (!areaCache) {
        const res = yield get(queryAreasUrl)
        let cascaderArray = []
        let cascaderCityArray = []
        _.cloneDeep(res).forEach(e => {
          e.label = e.codeName
          e.value = e.code
          e.key = e.id
          cascaderArray.push(e)
          if (e.code <= 9999) {
            cascaderCityArray.push(e)
          }
        })

        areaMap = yield arrayToMap(res, e => e.code)
        areaTree = yield arrayToTree(cascaderArray, {
          id: 'code',
          parent: 'parentCode',
          children: 'children',
        })
        areaCityTree = yield arrayToTree(cascaderCityArray, {
          id: 'code',
          parent: 'parentCode',
          children: 'children',
        })

        yield update({ [areakey]: res, [areaTreekey]: areaTree, [areaCityTreekey]: areaCityTree })
        localCache.set(areaTreekey, areaTree, 3600 * 24 * 30)
        localCache.set(areaCityTreekey, areaCityTree, 3600 * 24 * 30)
        localCache.set(areaMapkey, areaMap, 3600 * 24 * 30)
        localCache.set(areakey, areaCache = res, 3600 * 24 * 30)
      }

      yield tableBindType({
        province: value => {
          return areaMap[`${value}`] && areaMap[`${value}`].codeName
        },
        city: value => {
          return areaMap[`${value}`] && areaMap[`${value}`].codeName
        },
      })

      yield formBindType({
        // 参数：初始值,meta(字段meta数据，例如: rows,min,max 等), field字段定义对象
        provinceAndCity: ({ initialValue }) => {
          let result = {
            input: (
              <Cascader
                key="provinceAndCityCascaderForm"
                allowClear
                changeOnSelect
                expandTrigger="hover"
                options={areaCityTree}
                placeholder="请选择省市"
              />
            ),
          }
          initialValue && (result.initialValue = initialValue)
          return result
        },
        // 参数：初始值,meta(字段meta数据，例如: rows,min,max 等), field字段定义对象
        area: ({ initialValue }) => {
          let result = {
            input: (
              <Cascader
                key="provinceAndCityCascaderForm"
                allowClear
                changeOnSelect
                expandTrigger="hover"
                options={areaTree}
                placeholder="请选择省市"
              />
            ),
          }
          initialValue && (result.initialValue = initialValue)
          return result
        },
      })
    },
  },
  reducers: {},
  subscriptions: {
    setup({ dispatch, listen }) {
      // 支持对多个path的监听
      listen({
        '/sysOrg': () => {
          dispatch({
            type: 'queryAreas',
          })
        },
        '/driver': () => {
          dispatch({
            type: 'queryAreas',
          })
        },
      })
    },
  },
})

