/*
 * @Author: zengyufei 
 * @Date: 2017-08-25 15:15:05 
 * @Last Modified by: zengyufei 
 * @Last Modified time: 2017-08-25 15:15:05 
 */
import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Row, Col, Button, Card } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item

let Detail = options => {
  const { dispatch, trafficViolation } = options

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
      type: 'trafficViolationStore/toPage',
    })
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
                        自编号&nbsp;
                    </span>
                  )}
                >
                  {trafficViolation.carNo}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车牌号&nbsp;
                    </span>
                  )}
                >
                  {trafficViolation.plateNumber}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        驾驶员姓名&nbsp;
                    </span>
                  )}
                >
                  {trafficViolation.userName}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        从业资格证号&nbsp;
                    </span>
                  )}
                >
                  {trafficViolation.qualificationNo}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        发生时间&nbsp;
                    </span>
                  )}
                >
                  {trafficViolation.violationTime}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        详细地址&nbsp;
                    </span>
                  )}
                >
                  {trafficViolation.violationAddress}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        违章代码&nbsp;
                    </span>
                  )}
                >
                  {trafficViolation.violationNo}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        违章内容&nbsp;
                    </span>
                  )}
                >
                  {trafficViolation.content}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        处理结果&nbsp;
                    </span>
                  )}
                >
                  {trafficViolation.punishResult}
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

function mapStateToProps({ trafficViolationStore }) {
  return {
    trafficViolation: trafficViolationStore.trafficViolation,
  }
}

export default Form.create()(connect(mapStateToProps)(Detail))
