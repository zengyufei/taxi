import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Row, Col, Button, Card } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item

let Detail = options => {
  const { dispatch, securityDeposit } = options

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
  const toPage = () => {
    dispatch({
      type: 'securityDepositStore/toPage',
    })
  }

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="安全保证金详情">
                <FormItem {...formItemLayout} label={(<span>自编号&nbsp;</span>)}>
                  {securityDeposit.carNo}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>车牌号&nbsp;</span>)}>
                  {securityDeposit.plateNumber}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>驾驶员姓名&nbsp;</span>)}>
                  {securityDeposit.userName}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>资格证&nbsp;</span>)}>
                  {securityDeposit.qualificationNo}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>安全保证金金额&nbsp;</span>)}>
                  {securityDeposit.amount}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>安全保证金缴纳日期&nbsp;</span>)}>
                  {securityDeposit.payDate}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>安全保证金退还日期&nbsp;</span>)}>
                  {securityDeposit.refundDate}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>入职日期&nbsp;</span>)}>
                  {securityDeposit.entryDate}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>状态&nbsp;</span>)}>
                  {securityDeposit.status === true ? '正常' : '退还'}
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
}

function mapStateToProps({ securityDepositStore }) {
  return {
    securityDeposit: securityDepositStore.securityDeposit,
  }
}

export default Form.create()(connect(mapStateToProps)(Detail))
