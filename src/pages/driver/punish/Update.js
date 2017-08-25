/*
 * @Author: zengyufei 
 * @Date: 2017-08-25 15:11:45 
 * @Last Modified by: zengyufei 
 * @Last Modified time: 2017-08-25 15:11:45 
 */
import TweenOne from 'rc-tween-one'
import { connect } from 'dva'
import { Form, Input, Row, Col, Button, Card,DatePicker, Radio } from 'antd'
import moment from 'moment'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item
const RadioGroup = Radio.Group

let Update = options => {
  const { dispatch, form, punish } = options
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
          type: 'punishStore/update',
          ...values,
          creditTime: form.getFieldValue('creditTime') !== undefined ? form.getFieldValue('creditTime').format('YYYY-MM-DD HH:mm:ss') : undefined,
        })
      }
    })
  }

  /* 返回分页 */
  const toPage = e => {
    dispatch({
      type: 'punishStore/toPage',
    })
  }

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={14}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '100%', marginTop: '10px' }}>
              {getFieldDecorator('id', { initialValue: punish.id })(<Input type="hidden" />)}
              <Card title="修改营运违章">
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
                    initialValue: punish.qualificationNo,
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
                    initialValue: punish.userName,
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
                    initialValue: punish.carNo,
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
                    initialValue: punish.plateNumber,
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        违章类型&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('punishType', {
                    rules: [{ required: true, whitespace: true, message: '请输入违章编号!' }],
                    initialValue: punish.punishType,
                  })(
                    <RadioGroup>
                      <Radio value={'punish_one'}>私调计价器、视频监控</Radio><br />
                      <Radio value={'punish_two'}>在车站、码头、机场、口岸区域及市区主干道两侧街道专用候客站不遵守有关规定，妨碍营运秩序</Radio><br />
                      <Radio value={'punish_three'}>无驾驶准许证或使用无效驾驶准许证从事出租营运</Radio><br />
                      <Radio value={'punish_four'}>拒绝载客</Radio><br />
                      <Radio value={'punish_five'}>未在出租车内外规定位置印制、张贴或者悬挂车主名称、驾驶准许证、价目表、本车车牌号、市运政管理机关的投诉电话号码</Radio><br />
                      <Radio value={'punish_six'}>未在车辆内外规定位置印制、张贴经营企业名称、驾驶准许证、价目表、本车车牌号、服务承诺的主要内容、市主管部门的投<br />诉电话号码和市主管部门认为有必要让乘客知道的内容</Radio><br />
                      <Radio value={'punish_seven'}>营运载客时不使用或不当使用计价表的</Radio><br />
                      <Radio value={'punish_eight'}>在车站、码头、机场、口岸区域及市内主干道专用候车站不按顺序候客</Radio><br />
                      <Radio value={'punish_nine'}>不按照规定停车上下客</Radio><br />
                      <Radio value={'punish_ten'}>营运载客时不使用计价表</Radio><br />
                      <Radio value={'punish_eleven'}>未使用标准座套</Radio><br />
                      <Radio value={'punish_twelve'}>车厢不整洁</Radio><br />
                      <Radio value={'punish_thirteen'}>车内吸烟</Radio><br />
                      <Radio value={'punish_fourteen'}>不按规定穿着工服或佩戴工作证</Radio><br />
                      <Radio value={'punish_fifteen'}>其它</Radio><br />
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        具体地址&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('detailAddress', {
                    rules: [{ required: true, whitespace: true, message: '请输入具体地址!' }],
                    initialValue: punish.detailAddress,
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        发生时间&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('creditTime', {
                    rules: [{ required: true, message: '请输入发生时间!' }],
                    initialValue: moment(punish.creditTime),
                  })(
                    <DatePicker style={{ width: 200 }} format="YYYY-MM-DD HH:mm:ss" showTime />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        发生经过&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('creditDesc', {
                    rules: [{ required: true, whitespace: true, message: '请输入发生经过!' }],
                    initialValue: punish.creditDesc,
                  })(
                    <Input type="textarea" rows={4} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        处理结果&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('punishResult', {
                    initialValue: punish.punishResult,
                  })(
                    <Input type="textarea" rows={4} />
                  )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                  <ZButton permission="driver:punish:update">
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

function mapStateToProps({ punishStore }) {
  return {
    punish: punishStore.punish,
  }
}

export default Form.create()(connect(mapStateToProps)(Update))
