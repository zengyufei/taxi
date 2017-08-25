/*
 * @Author: zengyufei 
 * @Date: 2017-08-25 15:16:21 
 * @Last Modified by: zengyufei 
 * @Last Modified time: 2017-08-25 15:16:21 
 */
import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Row, Col, Button, Card } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item

let Detail = options => {
  const { dispatch, transfer } = options

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
      type: 'transferStore/toPage',
    })
  }

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="过户信息详情">
                <FormItem {...formItemLayout} label={(<span>旧用户资格证&nbsp;</span>)}>
                  {transfer.oldQualificationNo}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>旧用户姓名&nbsp;</span>)}>
                  {transfer.oldUserName}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>自编号&nbsp;</span>)}>
                  {transfer.carNo}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>车牌号&nbsp;</span>)}>
                  {transfer.plateNumber}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>新用户资格证&nbsp;</span>)}>
                  {transfer.newQualificationNo}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>新用户姓名&nbsp;</span>)}>
                  {transfer.newUserName}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>缴款日期&nbsp;</span>)}>
                  {transfer.transferDate}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>经办人&nbsp;</span>)}>
                  {transfer.opratorUser}
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

function mapStateToProps({ transferStore }) {
  return {
    transfer: transferStore.transfer,
  }
}

export default Form.create()(connect(mapStateToProps)(Detail))
