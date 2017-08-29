/*
 * @Author: zengyufei 
 * @Date: 2017-08-25 15:10:03 
 * @Last Modified by: zengyufei 
 * @Last Modified time: 2017-08-25 15:10:03 
 */
import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Row, Col, Button, Card } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item

let Detail = options => {
  const { dispatch, punish } = options

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
      type: 'punishStore/toPage',
    })
  }

  let punishTypeDesc
  switch (punish.punishType) {
    case 'punish_one':
      punishTypeDesc = '私调计价器、视频监控'
      break
    case 'punish_two':
      punishTypeDesc = '在车站、码头、机场、口岸区域及市区主干道两侧街道专用候客站不遵守有关规定，妨碍营运秩序'
      break
    case 'punish_three':
      punishTypeDesc = '无驾驶准许证或使用无效驾驶准许证从事出租营运'
      break
    case 'punish_four':
      punishTypeDesc = '拒绝载客'
      break
    case 'punish_five':
      punishTypeDesc = '未在出租车内外规定位置印制、张贴或者悬挂车主名称、驾驶准许证、价目表、本车车牌号、市运政管理机关的投诉电话号码'
      break
    case 'punish_six':
      punishTypeDesc = '未在车辆内外规定位置印制、张贴经营企业名称、驾驶准许证、价目表、本车车牌号、服务承诺的主要内容、市主管部门的投诉电话号码和市主管部门认为有必要让乘客知道的内容'
      break
    case 'punish_seven':
      punishTypeDesc = '无驾驶准许证或者使用无效驾驶准许证从事出租营运'
      break
    case 'punish_eight':
      punishTypeDesc = '营运载客时不使用或不当使用计价表的'
      break
    case 'punish_nine':
      punishTypeDesc = '在车站、码头、机场、口岸区域及市内主干道专用候车站不按顺序候客'
      break
    case 'punish_ten':
      punishTypeDesc = '不按照规定停车上下客'
      break
    case 'punish_eleven':
      punishTypeDesc = '营运载客时不使用计价表'
      break
    case 'punish_twelve':
      punishTypeDesc = '其它'
      break
  }

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={14}>
            <Form style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="服务投诉详情">
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        从业资格证号&nbsp;
                    </span>
                  )}
                >
                  {punish.qualificationNo}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        驾驶员姓名&nbsp;
                    </span>
                  )}
                >
                  {punish.userName}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        自编号&nbsp;
                    </span>
                  )}
                >
                  {punish.carNo}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车牌号&nbsp;
                    </span>
                  )}
                >
                  {punish.plateNumber}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        违章类型&nbsp;
                    </span>
                  )}
                >
                  {punishTypeDesc}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        具体地址&nbsp;
                    </span>
                  )}
                >
                  {punish.detailAddress}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        发生时间&nbsp;
                    </span>
                  )}
                >
                  {punish.creditTime}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        发生经过&nbsp;
                    </span>
                  )}
                >
                  {punish.creditDesc}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        处理结果&nbsp;
                    </span>
                  )}
                >
                  {punish.punishResult}
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

function mapStateToProps({ punishStore }) {
  return {
    punish: punishStore.punish,
  }
}

export default Form.create()(connect(mapStateToProps)(Detail))
