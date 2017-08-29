import { connect } from 'dva'
import { Card, Collapse } from 'antd'
import { routerRedux } from 'dva/router'

const Panel = Collapse.Panel

const Home = options => {
  const { methods, homeStore } = options
  // 车辆
  const { queryRoadTransporting, queryRoadTransport, queryOwnershiping, queryOwnership, querySynthesizeing, querySynthesize, queryDrivingLicenseing, queryDrivingLicense, queryTaximetering, queryTaximeter, queryPlanFinishing, queryPlanFinish, queryInsuranceForceing, queryInsuranceForce, queryInsuranceBusinessing, queryInsuranceBusiness } = methods
  let { roadTransporting, roadTransport, ownershiping, ownership, synthesizeing, synthesize, drivingLicenseing, drivingLicense, taximetering, taximeter, planFinishing, planFinish, insuranceForceing, insuranceForce, insuranceBusinessing, insuranceBusiness } = homeStore
  // 驾驶员
  const { queryAccidentring, queryAccident, queryLabourring, queryLabour, queryManagering, queryManage, queryLicensering, queryLicense } = methods
  let { accidentring, accident, labourring, labour, managering, manage, licensering, license } = homeStore

  return (
    <div>
      <Collapse defaultActiveKey={['1', '2', '3']}>
        <Panel header="车辆管理" key="1">
          {/* 道路运输证 */}
          {
            roadTransporting.totalCount > 0 && <Card
              title={
                <div>
                  <span style={{ color: 'rgb(255, 131, 0)', fontWeight: 'bold', fontSize: 14 }}>道路运输证</span>
                  <span> 即将到期</span>
                </div>}
              style={{ marginLeft: 15, width: '20%', float: 'left', marginBottom: 30 }}
            >
              <div>
                <p style={{ paddingBottom: '7px' }}>共有<span style={{ color: 'rgb(255, 131, 0)', fontWeight: 'bold', fontSize: 14 }}> {roadTransporting.totalCount} </span>条记录，<a onClick={queryRoadTransporting}>马上查看</a></p>
              </div>
            </Card>
          }
          {
            roadTransport.totalCount > 0 && <Card
              title={
                <div>
                  <span style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}>道路运输证</span>
                  <span> 已到期</span>
                </div>}
              style={{ marginLeft: 15, width: '20%', float: 'left', marginBottom: 30 }}
            >
              <div>
                <p style={{ paddingBottom: '7px' }}>共有<span style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}> {roadTransport.totalCount} </span>条记录，<a onClick={queryRoadTransport}>马上查看</a></p>
              </div>
            </Card>
          }

          {/* 产权证 */}
          {
            ownershiping.totalCount > 0 && <Card
              title={
                <div>
                  <span style={{ color: 'rgb(255, 131, 0)', fontWeight: 'bold', fontSize: 14 }}>产权证</span>
                  <span> 即将到期</span>
                </div>}
              style={{ marginLeft: 15, width: '20%', float: 'left', marginBottom: 30 }}
            >
              <div>
                <p style={{ paddingBottom: '7px' }}>共有<span style={{ color: 'rgb(255, 131, 0)', fontWeight: 'bold', fontSize: 14 }}> {ownershiping.totalCount} </span>条记录，<a onClick={queryOwnershiping}>马上查看</a></p>
              </div>
            </Card>
          }
          {
            ownership.totalCount > 0 && <Card
              title={
                <div>
                  <span style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}>产权证</span>
                  <span> 已到期</span>
                </div>}
              style={{ marginLeft: 15, width: '20%', float: 'left', marginBottom: 30 }}
            >
              <div>
                <p style={{ paddingBottom: '7px' }}>共有<span style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}> {ownership.totalCount} </span>条记录，<a onClick={queryOwnership}>马上查看</a></p>
              </div>
            </Card>
          }

          {/* 营运证年审 */}
          {
            synthesizeing.totalCount > 0 && <Card
              title={
                <div>
                  <span style={{ color: 'rgb(255, 131, 0)', fontWeight: 'bold', fontSize: 14 }}>营运证年审</span>
                  <span> 即将到期</span>
                </div>}
              style={{ marginLeft: 15, width: '20%', float: 'left', marginBottom: 30 }}
            >
              <div>
                <p style={{ paddingBottom: '7px' }}>共有<span style={{ color: 'rgb(255, 131, 0)', fontWeight: 'bold', fontSize: 14 }}> {synthesizeing.totalCount} </span>条记录，<a onClick={querySynthesizeing}>马上查看</a></p>
              </div>
            </Card>
          }
          {
            synthesize.totalCount > 0 && <Card
              title={
                <div>
                  <span style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}>营运证年审</span>
                  <span> 已到期</span>
                </div>}
              style={{ marginLeft: 15, width: '20%', float: 'left', marginBottom: 30 }}
            >
              <div>
                <p style={{ paddingBottom: '7px' }}>共有<span style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}> {synthesize.totalCount} </span>条记录，<a onClick={querySynthesize}>马上查看</a></p>
              </div>
            </Card>
          }

          {/* 行驶证 */}
          {
            drivingLicenseing.totalCount > 0 && <Card
              title={
                <div>
                  <span style={{ color: 'rgb(255, 131, 0)', fontWeight: 'bold', fontSize: 14 }}>行驶证</span>
                  <span> 即将到期</span>
                </div>}
              style={{ marginLeft: 15, width: '20%', float: 'left', marginBottom: 30 }}
            >
              <div>
                <p style={{ paddingBottom: '7px' }}>共有<span style={{ color: 'rgb(255, 131, 0)', fontWeight: 'bold', fontSize: 14 }}> {drivingLicenseing.totalCount} </span>条记录，<a onClick={queryDrivingLicenseing}>马上查看</a></p>
              </div>
            </Card>
          }
          {
            drivingLicense.totalCount > 0 && <Card
              title={
                <div>
                  <span style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}>行驶证</span>
                  <span> 已到期</span>
                </div>}
              style={{ marginLeft: 15, width: '20%', float: 'left', marginBottom: 30 }}
            >
              <div>
                <p style={{ paddingBottom: '7px' }}>共有<span style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}> {drivingLicense.totalCount} </span>条记录，<a onClick={queryDrivingLicense}>马上查看</a></p>
              </div>
            </Card>
          }

          {/* 计价器 */}
          {
            taximetering.totalCount > 0 && <Card
              title={
                <div>
                  <span style={{ color: 'rgb(255, 131, 0)', fontWeight: 'bold', fontSize: 14 }}>计价器</span>
                  <span> 即将到期</span>
                </div>}
              style={{ marginLeft: 15, width: '20%', float: 'left', marginBottom: 30 }}
            >
              <div>
                <p style={{ paddingBottom: '7px' }}>共有<span style={{ color: 'rgb(255, 131, 0)', fontWeight: 'bold', fontSize: 14 }}> {taximetering.totalCount} </span>条记录，<a onClick={queryTaximetering}>马上查看</a></p>
              </div>
            </Card>
          }
          {
            taximeter.totalCount > 0 && <Card
              title={
                <div>
                  <span style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}>计价器</span>
                  <span> 已到期</span>
                </div>}
              style={{ marginLeft: 15, width: '20%', float: 'left', marginBottom: 30 }}
            >
              <div>
                <p style={{ paddingBottom: '7px' }}>共有<span style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}> {taximeter.totalCount} </span>条记录，<a onClick={queryTaximeter}>马上查看</a></p>
              </div>
            </Card>
          }

          {/* 维护计划 */}
          {
            planFinishing.totalCount > 0 && <Card
              title={
                <div>
                  <span style={{ color: 'rgb(255, 131, 0)', fontWeight: 'bold', fontSize: 14 }}>维护计划</span>
                  <span> 即将到期</span>
                </div>}
              style={{ marginLeft: 15, width: '20%', float: 'left', marginBottom: 30 }}
            >
              <div>
                <p style={{ paddingBottom: '7px' }}>共有<span style={{ color: 'rgb(255, 131, 0)', fontWeight: 'bold', fontSize: 14 }}> {planFinishing.totalCount} </span>条记录，<a onClick={queryPlanFinishing}>马上查看</a></p>
              </div>
            </Card>
          }
          {
            planFinish.totalCount > 0 && <Card
              title={
                <div>
                  <span style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}>维护计划</span>
                  <span> 已到期</span>
                </div>}
              style={{ marginLeft: 15, width: '20%', float: 'left', marginBottom: 30 }}
            >
              <div>
                <p style={{ paddingBottom: '7px' }}>共有<span style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}> {planFinish.totalCount} </span>条记录，<a onClick={queryPlanFinish}>马上查看</a></p>
              </div>
            </Card>
          }

          {/* 交强险 */}
          {
            insuranceForceing.totalCount > 0 && <Card
              title={
                <div>
                  <span style={{ color: 'rgb(255, 131, 0)', fontWeight: 'bold', fontSize: 14 }}>交强险</span>
                  <span> 即将到期</span>
                </div>}
              style={{ marginLeft: 15, width: '20%', float: 'left', marginBottom: 30 }}
            >
              <div>
                <p style={{ paddingBottom: '7px' }}>共有<span style={{ color: 'rgb(255, 131, 0)', fontWeight: 'bold', fontSize: 14 }}> {insuranceForceing.totalCount} </span>条记录，<a onClick={queryInsuranceForceing}>马上查看</a></p>
              </div>
            </Card>
          }
          {
            insuranceForce.totalCount > 0 && <Card
              title={
                <div>
                  <span style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}>交强险</span>
                  <span> 已到期</span>
                </div>}
              style={{ marginLeft: 15, width: '20%', float: 'left', marginBottom: 30 }}
            >
              <div>
                <p style={{ paddingBottom: '7px' }}>共有<span style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}> {insuranceForce.totalCount} </span>条记录，<a onClick={queryInsuranceForce}>马上查看</a></p>
              </div>
            </Card>
          }

          {/* 商业险 */}
          {
            insuranceBusinessing.totalCount > 0 && <Card
              title={
                <div>
                  <span style={{ color: 'rgb(255, 131, 0)', fontWeight: 'bold', fontSize: 14 }}>商业险</span>
                  <span> 即将到期</span>
                </div>}
              style={{ marginLeft: 15, width: '20%', float: 'left', marginBottom: 30 }}
            >
              <div>
                <p style={{ paddingBottom: '7px' }}>共有<span style={{ color: 'rgb(255, 131, 0)', fontWeight: 'bold', fontSize: 14 }}> {insuranceBusinessing.totalCount} </span>条记录，<a onClick={queryInsuranceBusinessing}>马上查看</a></p>
              </div>
            </Card>
          }
          {
            insuranceBusiness.totalCount > 0 && <Card
              title={
                <div>
                  <span style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}>商业险</span>
                  <span> 已到期</span>
                </div>}
              style={{ marginLeft: 15, width: '20%', float: 'left', marginBottom: 30 }}
            >
              <div>
                <p style={{ paddingBottom: '7px' }}>共有<span style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}> {insuranceBusiness.totalCount} </span>条记录，<a onClick={queryInsuranceBusiness}>马上查看</a></p>
              </div>
            </Card>
          }

        </Panel>
        <Panel header="驾驶员管理" key="2">
          {/* 意外险 */}
          {
            accidentring.totalCount > 0 && <Card
              title={
                <div>
                  <span style={{ color: 'rgb(255, 131, 0)', fontWeight: 'bold', fontSize: 14 }}>意外险</span>
                  <span> 即将到期</span>
                </div>}
              style={{ marginLeft: 15, width: '20%', float: 'left', marginBottom: 30 }}
            >
              <div>
                <p style={{ paddingBottom: '7px' }}>共有<span style={{ color: 'rgb(255, 131, 0)', fontWeight: 'bold', fontSize: 14 }}> {accidentring.totalCount} </span>条记录，<a onClick={queryAccidentring}>马上查看</a></p>
              </div>
            </Card>
          }
          {
            accident.totalCount > 0 && <Card
              title={
                <div>
                  <span style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}>意外险</span>
                  <span> 已到期</span>
                </div>}
              style={{ marginLeft: 15, width: '20%', float: 'left', marginBottom: 30 }}
            >
              <div>
                <p style={{ paddingBottom: '7px' }}>共有<span style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}> {accident.totalCount} </span>条记录，<a onClick={queryAccident}>马上查看</a></p>
              </div>
            </Card>
          }

          {/* 驾驶证 */}
          {
            licensering.totalCount > 0 && <Card
              title={
                <div>
                  <span style={{ color: 'rgb(255, 131, 0)', fontWeight: 'bold', fontSize: 14 }}>驾驶证</span>
                  <span> 即将到期</span>
                </div>}
              style={{ marginLeft: 15, width: '20%', float: 'left', marginBottom: 30 }}
            >
              <div>
                <p style={{ paddingBottom: '7px' }}>共有<span style={{ color: 'rgb(255, 131, 0)', fontWeight: 'bold', fontSize: 14 }}> {licensering.totalCount} </span>条记录，<a onClick={queryLicensering}>马上查看</a></p>
              </div>
            </Card>
          }
          {
            license.totalCount > 0 && <Card
              title={
                <div>
                  <span style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}>驾驶证</span>
                  <span> 已到期</span>
                </div>}
              style={{ marginLeft: 15, width: '20%', float: 'left', marginBottom: 30 }}
            >
              <div>
                <p style={{ paddingBottom: '7px' }}>共有<span style={{ color: 'red', fontWeight: 'bold', fontSize: 16 }}> {license.totalCount} </span>条记录，<a onClick={queryLicense}>马上查看</a></p>
              </div>
            </Card>
          }

          {/* 劳动合同 */}
          {
            labourring.totalCount > 0 && <Card
              title={
                <div>
                  <span style={{ color: 'rgb(255, 131, 0)', fontWeight: 'bold', fontSize: 14 }}>劳动合同</span>
                  <span> 即将到期</span>
                </div>}
              style={{ marginLeft: 15, width: '20%', float: 'left', marginBottom: 30 }}
            >
              <div>
                <p style={{ paddingBottom: '7px' }}>共有<span style={{ color: 'rgb(255, 131, 0)', fontWeight: 'bold', fontSize: 14 }}> {labourring.totalCount} </span>条记录，<a onClick={queryLabourring}>马上查看</a></p>
              </div>
            </Card>
          }
          {
            labour.totalCount > 0 && <Card
              title={
                <div>
                  <span style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}>劳动合同</span>
                  <span> 已到期</span>
                </div>}
              style={{ marginLeft: 15, width: '20%', float: 'left', marginBottom: 30 }}
            >
              <div>
                <p style={{ paddingBottom: '7px' }}>共有<span style={{ color: 'red', fontWeight: 'bold', fontSize: 16 }}> {labour.totalCount} </span>条记录，<a onClick={queryLabour}>马上查看</a></p>
              </div>
            </Card>
          }

          {/* 经营合同 */}
          {
            managering.totalCount > 0 && <Card
              title={
                <div>
                  <span style={{ color: 'rgb(255, 131, 0)', fontWeight: 'bold', fontSize: 14 }}>经营合同</span>
                  <span> 即将到期</span>
                </div>}
              style={{ marginLeft: 15, width: '20%', float: 'left', marginBottom: 30 }}
            >
              <div>
                <p style={{ paddingBottom: '7px' }}>共有<span style={{ color: 'rgb(255, 131, 0)', fontWeight: 'bold', fontSize: 16 }}> {managering.totalCount} </span>条记录，<a onClick={queryManagering}>马上查看</a></p>
              </div>
            </Card>
          }
          {
            manage.totalCount > 0 && <Card
              title={
                <div>
                  <span style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}>经营合同</span>
                  <span> 已到期</span>
                </div>}
              style={{ marginLeft: 15, width: '20%', float: 'left', marginBottom: 30 }}
            >
              <div>
                <p style={{ paddingBottom: '7px' }}>共有<span style={{ color: 'red', fontWeight: 'bold', fontSize: 16 }}> {manage.totalCount} </span>条记录，<a onClick={queryManage}>马上查看</a></p>
              </div>
            </Card>
          }
        </Panel>
      </Collapse>
    </div>
  )
}

const mapStateToProps = ({ homeStore }) => {
  return {
    homeStore,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    methods: {
      queryRoadTransporting() {
        dispatch(
          routerRedux.push({
            pathname: '/car',
            query: {
              warningEnum: 'roadTransportEndDate',
              startDate: moment().format('YYYY-MM-DD'),
              endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
            },
          })
        )
      },
      queryRoadTransport() {
        dispatch(
          routerRedux.push({
            pathname: '/car',
            query: {
              warningEnum: 'roadTransportEndDate',
              endDate: moment().format('YYYY-MM-DD'),
            },
          })
        )
      },
      queryOwnershiping() {
        dispatch(
          routerRedux.push({
            pathname: '/car',
            query: {
              warningEnum: 'ownershipEndDate',
              startDate: moment().format('YYYY-MM-DD'),
              endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
            },
          })
        )
      },
      queryOwnership() {
        dispatch(
          routerRedux.push({
            pathname: '/car',
            query: {
              warningEnum: 'ownershipEndDate',
              endDate: moment().format('YYYY-MM-DD'),
            },
          })
        )
      },
      querySynthesizeing() {
        dispatch(
          routerRedux.push({
            pathname: '/annualVerification',
            query: {
              warningEnum: 'synthesizeDate',
              startDate: moment().format('YYYY-MM-DD'),
              endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
            },
          })
        )
      },
      querySynthesize() {
        dispatch(
          routerRedux.push({
            pathname: '/annualVerification',
            query: {
              warningEnum: 'synthesizeDate',
              endDate: moment().format('YYYY-MM-DD'),
            },
          })
        )
      },
      queryDrivingLicenseing() {
        dispatch(
          routerRedux.push({
            pathname: '/annualVerification',
            query: {
              warningEnum: 'drivingLicenseDate',
              startDate: moment().format('YYYY-MM-DD'),
              endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
            },
          })
        )
      },
      queryDrivingLicense() {
        dispatch(
          routerRedux.push({
            pathname: '/annualVerification',
            query: {
              warningEnum: 'drivingLicenseDate',
              endDate: moment().format('YYYY-MM-DD'),
            },
          })
        )
      },
      queryTaximetering() {
        dispatch(
          routerRedux.push({
            pathname: '/annualVerification',
            query: {
              warningEnum: 'taximeterDate',
              startDate: moment().format('YYYY-MM-DD'),
              endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
            },
          })
        )
      },
      queryTaximeter() {
        dispatch(
          routerRedux.push({
            pathname: '/annualVerification',
            query: {
              warningEnum: 'taximeterDate',
              endDate: moment().format('YYYY-MM-DD'),
            },
          })
        )
      },

      queryPlanFinishing() {
        dispatch(
          routerRedux.push({
            pathname: '/maintain',
            query: {
              warningEnum: 'planFinishDate',
              startDate: moment().format('YYYY-MM-DD'),
              endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
            },
          })
        )
      },
      queryPlanFinish() {
        dispatch(
          routerRedux.push({
            pathname: '/maintain',
            query: {
              warningEnum: 'planFinishDate',
              endDate: moment().format('YYYY-MM-DD'),
            },
          })
        )
      },

      queryInsuranceForceing() {
        dispatch(
          routerRedux.push({
            pathname: '/insurance',
            query: {
              warningEnum: 'insuranceForceDate',
              startDate: moment().format('YYYY-MM-DD'),
              endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
            },
          })
        )
      },
      queryInsuranceForce() {
        dispatch(
          routerRedux.push({
            pathname: '/insurance',
            query: {
              warningEnum: 'insuranceForceDate',
              endDate: moment().format('YYYY-MM-DD'),
            },
          })
        )
      },

      queryInsuranceBusinessing() {
        dispatch(
          routerRedux.push({
            pathname: '/insurance',
            query: {
              warningEnum: 'insuranceBusinessDate',
              startDate: moment().format('YYYY-MM-DD'),
              endDate: moment().add(1, 'M').format('YYYY-MM-DD'),
            },
          })
        )
      },
      queryInsuranceBusiness() {
        dispatch(
          routerRedux.push({
            pathname: '/insurance',
            query: {
              warningEnum: 'insuranceBusinessDate',
              endDate: moment().format('YYYY-MM-DD'),
            },
          })
        )
      },

      queryAccidentring() {
        dispatch(
          routerRedux.push({
            pathname: '/archives',
            query: {
              insurance: '1',
              accidentInsuranceEndDate: moment().add(1, 'M').format('YYYY-MM-DD'),
            },
          })
        )
      },
      queryAccident() {
        dispatch(
          routerRedux.push({
            pathname: '/archives',
            query: {
              insurance: '1',
              accidentInsuranceEndDate: moment().format('YYYY-MM-DD'),
            },
          })
        )
      },
      queryLicensering() {
        dispatch(
          routerRedux.push({
            pathname: '/archives',
            query: {
              licenseEndDate: moment().add(1, 'M').format('YYYY-MM-DD'),
            },
          })
        )
      },
      queryLicense() {
        dispatch(
          routerRedux.push({
            pathname: '/archives',
            query: {
              licenseEndDate: moment().format('YYYY-MM-DD'),
            },
          })
        )
      },
      queryLabourring() {
        dispatch(
          routerRedux.push({
            pathname: '/archives',
            query: {
              labourContractEndDate: moment().add(1, 'M').format('YYYY-MM-DD'),
            },
          })
        )
      },
      queryLabour() {
        dispatch(
          routerRedux.push({
            pathname: '/archives',
            query: {
              labourContractEndDate: moment().format('YYYY-MM-DD'),
            },
          })
        )
      },
      queryManagering() {
        dispatch(
          routerRedux.push({
            pathname: '/archives',
            query: {
              manageContractEndDate: moment().add(1, 'M').format('YYYY-MM-DD'),
            },
          })
        )
      },
      queryManage() {
        dispatch(
          routerRedux.push({
            pathname: '/archives',
            query: {
              manageContractEndDate: moment().format('YYYY-MM-DD'),
            },
          })
        )
      },
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
