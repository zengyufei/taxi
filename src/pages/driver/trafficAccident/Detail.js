/*
 * @Author: zengyufei 
 * @Date: 2017-08-25 15:13:33 
 * @Last Modified by: zengyufei 
 * @Last Modified time: 2017-08-25 15:13:33 
 */
import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Row, Col, Button, Card } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item

let Detail = options => {
  const { dispatch, trafficAccident } = options

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  }
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 14,
        offset: 6,
      },
    },
  }

  /* 返回分页 */
  const toPage = e => {
    dispatch({
      type: 'trafficAccidentStore/toPage',
    })
  }
  let dutyTypeDesc,
    accidentModelDesc,
    accidentNatureDesc
  switch (trafficAccident.dutyType) {
    case 'FULL_DUTY':
      dutyTypeDesc = '全责'
      break
    case 'MAIN_DUTY':
      dutyTypeDesc = '主责'
      break
    case 'SAME_DUTY':
      dutyTypeDesc = '同责'
      break
    case 'LESS_DUTY':
      dutyTypeDesc = '次责'
      break
    case 'NO_DUTY':
      dutyTypeDesc = '无责'
      break
  }
  switch (trafficAccident.accidentModel) {
    case 'model_one':
      accidentModelDesc = '同向侧面碰刮'
      break
    case 'model_two':
      accidentModelDesc = '追尾相撞'
      break
    case 'model_three':
      accidentModelDesc = '倒车相撞'
      break
    case 'model_four':
      accidentModelDesc = '左转弯相撞'
      break
    case 'model_five':
      accidentModelDesc = '右转弯相撞'
      break
    case 'model_six':
      accidentModelDesc = '正面相撞'
      break
    case 'model_seven':
      accidentModelDesc = '运行伤害人体'
      break
    case 'model_eight':
      accidentModelDesc = '与其他物体相撞'
      break
    case 'model_nine':
      accidentModelDesc = '其他'
      break
  }
  switch (trafficAccident.accidentNature) {
    case 'PROPERTY_LOSS':
      accidentNatureDesc = '财产损失事故'
      break
    case 'INJURED':
      accidentNatureDesc = '伤人事故'
      break
    case 'DEATH':
      accidentNatureDesc = '死亡事故'
      break
  }

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={14}>
            <Form style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="交通事故详情">
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        从业资格证号&nbsp;
                    </span>
                  )}
                >
                  {trafficAccident.qualificationNo}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        驾驶员姓名&nbsp;
                    </span>
                  )}
                >
                  {trafficAccident.userName}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        自编号&nbsp;
                    </span>
                  )}
                >
                  {trafficAccident.carNo}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车牌号&nbsp;
                    </span>
                  )}
                >
                  {trafficAccident.plateNumber}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        肇事时间&nbsp;
                    </span>
                  )}
                >
                  {trafficAccident.accidentTime}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        天气&nbsp;
                    </span>
                  )}
                >
                  {trafficAccident.weather}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        初次领证日期&nbsp;
                    </span>
                  )}
                >
                  {trafficAccident.licenseDate}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        入职日期&nbsp;
                    </span>
                  )}
                >
                  {trafficAccident.entryDate}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        入职年限&nbsp;
                    </span>
                  )}
                >
                  {trafficAccident.entryYear}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        接触对象&nbsp;
                    </span>
                  )}
                >
                  {trafficAccident.canDriverCar}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        出事地点类型&nbsp;
                    </span>
                  )}
                >
                  {trafficAccident.accidentPlace}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        事发区域&nbsp;
                    </span>
                  )}
                >
                  {trafficAccident.areaDesc}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        具体路段&nbsp;
                    </span>
                  )}
                >
                  {trafficAccident.accidentAddress}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        事故原因&nbsp;
                    </span>
                  )}
                >
                  {trafficAccident.accidentCause}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        事故形态&nbsp;
                    </span>
                  )}
                >
                  {accidentModelDesc}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        摘要伤亡情况&nbsp;
                    </span>
                  )}
                >
                  {trafficAccident.accidentDesc}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        受伤人数&nbsp;
                    </span>
                  )}
                >
                  {trafficAccident.injuredNumber}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        死亡人数&nbsp;
                    </span>
                  )}
                >
                  {trafficAccident.deathNumber}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        对方资料&nbsp;
                    </span>
                  )}
                >
                  {trafficAccident.otherInfoDesc}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        事故性质&nbsp;
                    </span>
                  )}
                >
                  {accidentNatureDesc}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        责任&nbsp;
                    </span>
                  )}
                >
                  {dutyTypeDesc}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        总经损&nbsp;
                    </span>
                  )}
                >
                  {trafficAccident.totalLoss}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        结案日期&nbsp;
                    </span>
                  )}
                >
                  {trafficAccident.closeDate}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                  <Button key="returnLoginButton" htmlType="button" size="large" onClick={toPage}>返回</Button>
                </FormItem>
              </Card>
            </Form>
          </Col>
        </Row>
      </TweenOneGroup>
    </div>
  )
}

function mapStateToProps({ trafficAccidentStore }) {
  return {
    trafficAccident: trafficAccidentStore.trafficAccident,
  }
}

export default Form.create()(connect(mapStateToProps)(Detail))
