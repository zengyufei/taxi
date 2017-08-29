import { extend } from 'ModelUtils'
import { hasPermission } from 'utils/auth'

const prefix = 'home'

const roadTransportingKey = 'roadTransporting'
const roadTransportKey = 'roadTransport'
const ownershipingKey = 'ownershiping'
const ownershipKey = 'ownership'

const synthesizeingKey = 'synthesizeing'
const synthesizeKey = 'synthesize'
const drivingLicenseingKey = 'drivingLicenseing'
const drivingLicenseKey = 'drivingLicense'
const taximeteringKey = 'taximetering'
const taximeterKey = 'taximeter'

const planFinishingKey = 'planFinishing'
const planFinishKey = 'planFinish'

const insuranceForceingKey = 'insuranceForceing'
const insuranceForceKey = 'insuranceForce'
const insuranceBusinessingKey = 'insuranceBusinessing'
const insuranceBusinessKey = 'insuranceBusiness'

const accidentKey = 'accident'
const accidentringKey = 'accidentring'
const licenseringKey = 'licensering'
const licenseKey = 'license'
const labourKey = 'labour'
const labourringKey = 'labourring'
const manageringKey = 'managering'
const manageKey = 'manage'

export default extend({
  namespace: `${prefix}Store`,
  state: {
    // 道路运输证
    [roadTransportingKey]: local.get(roadTransportingKey) || {},
    [roadTransportKey]: local.get(roadTransportKey) || {},
    // 产权证
    [ownershipingKey]: local.get(ownershipingKey) || {},
    [ownershipKey]: local.get(ownershipKey) || {},
    // 营运证年审
    [synthesizeingKey]: local.get(synthesizeingKey) || {},
    [synthesizeKey]: local.get(synthesizeKey) || {},
    // 行驶证
    [drivingLicenseingKey]: local.get(drivingLicenseingKey) || {},
    [drivingLicenseKey]: local.get(drivingLicenseKey) || {},
    // 计价器
    [taximeteringKey]: local.get(taximeteringKey) || {},
    [taximeterKey]: local.get(taximeterKey) || {},
    // 维护计划
    [planFinishingKey]: local.get(planFinishingKey) || {},
    [planFinishKey]: local.get(planFinishKey) || {},
    // 交强险
    [insuranceForceingKey]: local.get(insuranceForceingKey) || {},
    [insuranceForceKey]: local.get(insuranceForceKey) || {},
    // 商业险
    [insuranceBusinessingKey]: local.get(insuranceBusinessingKey) || {},
    [insuranceBusinessKey]: local.get(insuranceBusinessKey) || {},

    // 意外险
    [accidentKey]: local.get(accidentKey) || {},
    [accidentringKey]: local.get(accidentringKey) || {},
    // 驾驶证
    [licenseringKey]: local.get(licenseringKey) || {},
    [licenseKey]: local.get(licenseKey) || {},
    // 劳动合同
    [labourKey]: local.get(labourKey) || {},
    [labourringKey]: local.get(labourringKey) || {},
    // 经营合同
    [manageringKey]: local.get(manageringKey) || {},
    [manageKey]: local.get(manageKey) || {},
  },
  effects: {
    // 车辆
    * [roadTransportingKey]({}, { get, update, localCache }) {
      if (!localCache.get(roadTransportingKey)) {
        const { result } = yield get('/car/warnList', {
          warningEnum: 'roadTransportEndDate',
          startDate: moment().format('YYYY-MM-DD'),
          endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
        yield update({ [roadTransportingKey]: result || {} })
        localCache.set(roadTransportingKey, result || {}, 120)
      }
    },

    * [roadTransportKey]({}, { get, update, localCache }) {
      if (!localCache.get(roadTransportKey)) {
        const { result } = yield get('/car/warnList', {
          warningEnum: 'roadTransportEndDate',
          endDate: moment().format('YYYY-MM-DD'),
        })
        yield update({ [roadTransportKey]: result || {} })
        localCache.set(roadTransportKey, result || {}, 120)
      }
    },

    * [ownershipingKey]({}, { get, update, localCache }) {
      if (!localCache.get(ownershipingKey)) {
        const { result } = yield get('/car/warnList', {
          warningEnum: 'ownershipEndDate',
          startDate: moment().format('YYYY-MM-DD'),
          endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
        yield update({ [ownershipingKey]: result || {} })
        localCache.set(ownershipingKey, result || {}, 120)
      }
    },

    * [ownershipKey]({}, { get, update, localCache }) {
      if (!localCache.get(ownershipKey)) {
        const { result } = yield get('/car/warnList', {
          warningEnum: 'ownershipEndDate',
          endDate: moment().format('YYYY-MM-DD'),
        })
        yield update({ [ownershipKey]: result || {} })
        localCache.set(ownershipingKey, result || {}, 120)
      }
    },

    * [synthesizeingKey]({}, { get, update, localCache }) {
      if (!localCache.get(synthesizeingKey)) {
        const { result } = yield get('/annualVerification/warnList', {
          warningEnum: 'synthesizeDate',
          startDate: moment().format('YYYY-MM-DD'),
          endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
        yield update({ [synthesizeingKey]: result || {} })
        localCache.set(ownershipingKey, result || {}, 120)
      }
    },

    * [synthesizeKey]({}, { get, update, localCache }) {
      if (!localCache.get(synthesizeKey)) {
        const { result } = yield get('/annualVerification/warnList', {
          warningEnum: 'synthesizeDate',
          endDate: moment().format('YYYY-MM-DD'),
        })
        yield update({ [synthesizeKey]: result || {} })
        localCache.set(ownershipingKey, result || {}, 120)
      }
    },

    * [drivingLicenseingKey]({}, { get, update, localCache }) {
      if (!localCache.get(drivingLicenseingKey)) {
        const { result } = yield get('/annualVerification/warnList', {
          warningEnum: 'drivingLicenseDate',
          startDate: moment().format('YYYY-MM-DD'),
          endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
        yield update({ [drivingLicenseingKey]: result || {} })
        localCache.set(drivingLicenseingKey, result || {}, 120)
      }
    },

    * [drivingLicenseKey]({}, { get, update, localCache }) {
      if (!localCache.get(drivingLicenseKey)) {
        const { result } = yield get('/annualVerification/warnList', {
          warningEnum: 'drivingLicenseDate',
          endDate: moment().format('YYYY-MM-DD'),
        })
        yield update({ [drivingLicenseKey]: result || {} })
        localCache.set(drivingLicenseKey, result || {}, 120)
      }
    },

    * [taximeteringKey]({}, { get, update, localCache }) {
      if (!localCache.get(taximeteringKey)) {
        const { result } = yield get('/annualVerification/warnList', {
          warningEnum: 'taximeterDate',
          startDate: moment().format('YYYY-MM-DD'),
          endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
        yield update({ [taximeteringKey]: result || {} })
        localCache.set(taximeteringKey, result || {}, 120)
      }
    },

    * [taximeterKey]({}, { get, update, localCache }) {
      if (!localCache.get(taximeterKey)) {
        const { result } = yield get('/annualVerification/warnList', {
          warningEnum: 'taximeterDate',
          endDate: moment().format('YYYY-MM-DD'),
        })
        yield update({ [taximeterKey]: result || {} })
        localCache.set(taximeterKey, result || {}, 120)
      }
    },

    * [planFinishingKey]({}, { get, update, localCache }) {
      if (!localCache.get(planFinishingKey)) {
        const { result } = yield get('/maintain/warnList', {
          warningEnum: 'planFinishDate',
          startDate: moment().format('YYYY-MM-DD'),
          endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
        yield update({ [planFinishingKey]: result || {} })
        localCache.set(planFinishingKey, result || {}, 120)
      }
    },

    * [planFinishKey]({}, { get, update, localCache }) {
      if (!localCache.get(planFinishKey)) {
        const { result } = yield get('/maintain/warnList', {
          warningEnum: 'planFinishDate',
          endDate: moment().format('YYYY-MM-DD'),
        })
        yield update({ [planFinishKey]: result || {} })
        localCache.set(planFinishKey, result || {}, 120)
      }
    },

    * [insuranceForceingKey]({}, { get, update, localCache }) {
      if (!localCache.get(insuranceForceingKey)) {
        const { result } = yield get('/insurance/warnList', {
          warningEnum: 'insuranceForceDate',
          startDate: moment().format('YYYY-MM-DD'),
          endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
        yield update({ [insuranceForceingKey]: result || {} })
        localCache.set(insuranceForceingKey, result || {}, 120)
      }
    },

    * [insuranceForceKey]({}, { get, update, localCache }) {
      if (!localCache.get(insuranceForceKey)) {
        const { result } = yield get('/insurance/warnList', {
          warningEnum: 'insuranceForceDate',
          endDate: moment().format('YYYY-MM-DD'),
        })
        yield update({ [insuranceForceKey]: result || {} })
        localCache.set(insuranceForceKey, result || {}, 120)
      }
    },

    * [insuranceBusinessingKey]({}, { get, update, localCache }) {
      if (!localCache.get(insuranceBusinessingKey)) {
        const { result } = yield get('/insurance/warnList', {
          warningEnum: 'insuranceBusinessDate',
          startDate: moment().format('YYYY-MM-DD'),
          endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
        yield update({ [insuranceBusinessingKey]: result || {} })
        localCache.set(insuranceBusinessingKey, result || {}, 120)
      }
    },

    * [insuranceBusinessKey]({}, { get, update, localCache }) {
      if (!localCache.get(insuranceBusinessKey)) {
        const { result } = yield get('/insurance/warnList', {
          warningEnum: 'insuranceBusinessDate',
          endDate: moment().format('YYYY-MM-DD'),
        })
        yield update({ [insuranceBusinessKey]: result || {} })
        localCache.set(insuranceBusinessKey, result || {}, 120)
      }
    },

    // 驾驶员
    * [accidentringKey]({}, { get, update, localCache }) {
      if (!localCache.get(accidentringKey)) {
        const { result } = yield get('/driver/driver/queryPage', {
          insurance: '1',
          accidentInsuranceEndDate: moment().add(1, 'M').format('YYYY-MM-DD'),
        })
        yield update({ [accidentringKey]: result || {} })
        localCache.set(accidentringKey, result || {}, 120)
      }
    },

    * [accidentKey]({}, { get, update, localCache }) {
      if (!localCache.get(accidentKey)) {
        const { result } = yield get('/driver/driver/queryPage', {
          insurance: '1',
          accidentInsuranceEndDate: moment().format('YYYY-MM-DD'),
        })
        yield update({ [accidentKey]: result || {} })
        localCache.set(accidentKey, result || {}, 120)
      }
    },

    * [licenseringKey]({}, { get, update, localCache }) {
      if (!localCache.get(licenseringKey)) {
        const { result } = yield get('/driver/driver/queryPage', { licenseEndDate: moment().add(1, 'M').format('YYYY-MM-DD') })
        yield update({ [licenseringKey]: result || {} })
        localCache.set(licenseringKey, result || {}, 120)
      }
    },

    * [licenseKey]({}, { get, update, localCache }) {
      if (!localCache.get(licenseKey)) {
        const { result } = yield get('/driver/driver/queryPage', { licenseEndDate: moment().format('YYYY-MM-DD') })
        yield update({ [licenseKey]: result || {} })
        localCache.set(licenseKey, result || {}, 120)
      }
    },

    * [labourringKey]({}, { get, update, localCache }) {
      if (!localCache.get(labourringKey)) {
        const { result } = yield get('/driver/driver/queryPage', { labourContractEndDate: moment().add(1, 'M').format('YYYY-MM-DD') })
        yield update({ [labourringKey]: result || {} })
        localCache.set(labourringKey, result || {}, 120)
      }
    },

    * [labourKey]({}, { get, update, localCache }) {
      if (!localCache.get(labourKey)) {
        const { result } = yield get('/driver/driver/queryPage', { labourContractEndDate: moment().format('YYYY-MM-DD') })
        yield update({ [labourKey]: result || {} })
        localCache.set(labourKey, result || {}, 120)
      }
    },

    * [manageringKey]({}, { get, update, localCache }) {
      if (!localCache.get(manageringKey)) {
        const { result } = yield get('/driver/driver/queryPage', { manageContractEndDate: moment().add(1, 'M').format('YYYY-MM-DD') })
        yield update({ [manageringKey]: result || {} })
        localCache.set(manageringKey, result || {}, 120)
      }
    },

    * [manageKey]({}, { get, update, localCache }) {
      if (!localCache.get(manageKey)) {
        const { result } = yield get('/driver/driver/queryPage', { manageContractEndDate: moment().format('YYYY-MM-DD') })
        yield update({ [manageKey]: result || {} })
        localCache.set(manageKey, result || {}, 120)
      }
    },
  },
  reducers: {
  },
  subscriptions: {
    setup({ dispatch, listen }) {
      listen({
        '/': () => {
          // 车辆信息
          if (hasPermission('car:car:*')) {
            dispatch({ type: roadTransportingKey })
            dispatch({ type: roadTransportKey })
            dispatch({ type: ownershipingKey })
            dispatch({ type: ownershipKey })
          }

          // 车辆年审
          if (hasPermission('car:annualVerification:*')) {
            dispatch({ type: synthesizeingKey })
            dispatch({ type: synthesizeKey })
            dispatch({ type: drivingLicenseingKey })
            dispatch({ type: drivingLicenseKey })
            dispatch({ type: taximeteringKey })
            dispatch({ type: taximeterKey })
          }

          // 二级维护
          if (hasPermission('car:maintain:*')) {
            dispatch({ type: planFinishingKey })
            dispatch({ type: planFinishKey })
          }

          // 保险
          if (hasPermission('car:insurance:*')) {
            dispatch({ type: insuranceForceingKey })
            dispatch({ type: insuranceForceKey })
            dispatch({ type: insuranceBusinessingKey })
            dispatch({ type: insuranceBusinessKey })
          }

          // 驾驶员
          if (hasPermission('driver:driver:*') || hasPermission('driver:archives:*')) {
            dispatch({ type: accidentringKey })
            dispatch({ type: accidentKey })
            dispatch({ type: licenseringKey })
            dispatch({ type: licenseKey })
            dispatch({ type: labourringKey })
            dispatch({ type: labourKey })
            dispatch({ type: manageringKey })
            dispatch({ type: manageKey })
          }
        },
      })
    },
  },
})
