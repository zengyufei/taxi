/*
 * @Author: zengyufei 
 * @Date: 2017-08-25 15:01:52 
 * @Last Modified by: zengyufei 
 * @Last Modified time: 2017-08-25 15:01:52 
 */
import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Row, Col, Button, Card } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item

let Detail = options => {
  const { dispatch, lostAndFound } = options

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
      type: 'lostAndFoundStore/toPage',
    })
  };

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={14}>
            <Form style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="失物认领详情">
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        从业资格证号&nbsp;
                    </span>
                  )}
                >
                  {lostAndFound.qualificationNo}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        驾驶员姓名&nbsp;
                    </span>
                  )}
                >
                  {lostAndFound.userName}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        自编号&nbsp;
                    </span>
                  )}
                >
                  {lostAndFound.carNo}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车牌号&nbsp;
                    </span>
                  )}
                >
                  {lostAndFound.plateNumber}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        物品名称&nbsp;
                    </span>
                  )}
                >
                  {lostAndFound.articleName}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        物品数量&nbsp;
                    </span>
                  )}
                >
                  {lostAndFound.articleCount}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        物品金额&nbsp;
                    </span>
                  )}
                >
                  {lostAndFound.articleAmount}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        上交时间&nbsp;
                    </span>
                  )}
                >
                  {lostAndFound.handTime}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        归还时间&nbsp;
                    </span>
                  )}
                >
                  {lostAndFound.returnTime}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        失主姓名&nbsp;
                    </span>
                  )}
                >
                  {lostAndFound.lostUserName}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        失主电话&nbsp;
                    </span>
                  )}
                >
                  {lostAndFound.lostMobile}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        归还经办人&nbsp;
                    </span>
                  )}
                >
                  {lostAndFound.returnOprator}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        备注&nbsp;
                    </span>
                  )}
                >
                  {lostAndFound.remark}
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
};

function mapStateToProps({ lostAndFoundStore }) {
  return {
    lostAndFound: lostAndFoundStore.lostAndFound,
  }
}

export default Form.create()(connect(mapStateToProps)(Detail))
