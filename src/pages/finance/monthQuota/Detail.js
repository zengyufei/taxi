/*
 * @Author: zengyufei 
 * @Date: 2017-08-25 14:12:19 
 * @Last Modified by: zengyufei 
 * @Last Modified time: 2017-08-25 14:12:19 
 */
import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Row, Col, Button, Card } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item

let Detail = options => {
  const { dispatch, monthQuota } = options

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
      type: 'monthQuotaStore/toPage',
    })
  };

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="月缴定额详情">
                <FormItem {...formItemLayout} label={(<span>自编号&nbsp;</span>)}>
                  {monthQuota.carNo}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>车牌号&nbsp;</span>)}>
                  {monthQuota.plateNumber}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>驾驶员姓名&nbsp;</span>)}>
                  {monthQuota.userName}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>从业资格证号&nbsp;</span>)}>
                  {monthQuota.qualificationNo}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>年月&nbsp;</span>)}>
                  {monthQuota.yearMonth}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>出勤天数&nbsp;</span>)}>
                  {monthQuota.workDays}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>月末状态&nbsp;</span>)}>
                  {monthQuota.endStatus === 'WORKING' ? '在职' : '离职'}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>标准营收金额&nbsp;</span>)}>
                  {monthQuota.standardAmount}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>计划营收金额&nbsp;</span>)}>
                  {monthQuota.planAmount}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>营运核减金额 &nbsp;</span>)}>
                  {monthQuota.serviceSubAmount}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>维修核减金额 &nbsp;</span>)}>
                  {monthQuota.repairSubAmount}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>事故核减金额 &nbsp;</span>)}>
                  {monthQuota.accidentSubAmount}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>实际营收金额 &nbsp;</span>)}>
                  {monthQuota.realAmount}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <Button
                    key="returnLoginButton"
htmlType="button"
size="large"
style={{ marginLeft: '30px' }}
                    onClick={toPage}
                  >返回</Button>
                </FormItem>
              </Card>
            </Form>
          </Col>
        </Row>
      </TweenOneGroup>
    </div>
  )
};

function mapStateToProps({ monthQuotaStore }) {
  return {
    monthQuota: monthQuotaStore.monthQuota,
  }
}

export default Form.create()(connect(mapStateToProps)(Detail))
