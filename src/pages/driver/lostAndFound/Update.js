/*
 * @Author: zengyufei 
 * @Date: 2017-08-25 15:02:31 
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-08-25 15:03:01
 */
import TweenOne from 'rc-tween-one'
import { connect } from 'dva'
import { Form, Input, Row, Col, Button, Card, DatePicker, InputNumber } from 'antd'
import moment from 'moment'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item

let Update = options => {
  const { dispatch, form, lostAndFound } = options
  const { getFieldDecorator } = form

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

  /* 提交事件 */
  const handleSubmit = e => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'lostAndFoundStore/update',
          ...values,
          handTime: form.getFieldValue('handTime') !== undefined ? form.getFieldValue('handTime').format('YYYY-MM-DD HH:mm:ss') : undefined,
          returnTime: form.getFieldValue('returnTime') !== undefined ? form.getFieldValue('returnTime').format('YYYY-MM-DD HH:mm:ss') : undefined,
        })
      }
    })
  }

  /* 返回分页 */
  const toPage = () => {
    dispatch({
      type: 'lostAndFoundStore/toPage',
    })
  }

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={14}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="修改失物认领">
                {getFieldDecorator('id', { initialValue: lostAndFound.id })(<Input type="hidden" />)}
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        从业资格证号&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('qualificationNo', {
                    initialValue: lostAndFound.qualificationNo,
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        驾驶员姓名&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('userName', {
                    initialValue: lostAndFound.userName,
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        自编号&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('carNo', {
                    initialValue: lostAndFound.carNo,
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车牌号&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('plateNumber', {
                    initialValue: lostAndFound.plateNumber,
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        物品名称&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('articleName', {
                    rules: [{ required: true, whitespace: true, message: '请输入物品名称!' }],
                    initialValue: lostAndFound.articleName,
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        物品数量&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('articleCount', {
                    rules: [{ required: true, message: '请输入物品数量!' }],
                    initialValue: lostAndFound.articleCount,
                  })(<InputNumber />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        物品金额&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('articleAmount', { initialValue: lostAndFound.articleAmount })(<InputNumber max={9999999} />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        上交时间&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('handTime', {
                    rules: [{ required: true, message: '请选择上交时间!' }],
                    initialValue: moment(lostAndFound.handTime),
                  })(
                    <DatePicker style={{ width: 200 }} format="YYYY-MM-DD HH:mm:ss" showTime />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        归还时间&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('returnTime', {
                    initialValue: moment(lostAndFound.returnTime),
                  })(
                    <DatePicker style={{ width: 200 }} format="YYYY-MM-DD HH:mm:ss" showTime />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        失主姓名&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('lostUserName', {
                    initialValue: lostAndFound.lostUserName,
                  })(<Input />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        失主电话&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('lostMobile', {
                    initialValue: lostAndFound.lostMobile,
                  })(<Input />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        归还经办人&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('returnOprator', { initialValue: lostAndFound.returnOprator })(<Input />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        备注&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('remark', { initialValue: lostAndFound.remark })(<Input type="textarea" rows={4} />)}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                  <ZButton permission="driver:lostAndFound:update">
                    <Button key="registerButton" type="primary" htmlType="submit" size="large">保存</Button>
                  </ZButton>
                  <Button key="returnLoginButton" htmlType="button" size="large" style={{ marginLeft: '30px' }} onClick={toPage}>返回</Button>
                </FormItem>
              </Card>
            </Form>
          </Col>
        </Row>
      </TweenOneGroup>
    </div>
  )
}

function mapStateToProps({ lostAndFoundStore }) {
  return {
    lostAndFound: lostAndFoundStore.lostAndFound,
  }
}

export default Form.create()(connect(mapStateToProps)(Update))
