/**
 * 依赖的摆放顺序是：
 * 1. 非按需加载在最上面
 * 2. 按需加载的在下面
 * 3. 按长度从短到长
 * 4. 从对象再获取对象点出来的在按需加载下面
 * 5. 本系统业务对象在最下面，且路径不应该为相对路径，应为别名路径，别名查看 webpack.config.js
 */
import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Row, Col, Button, Card, Upload, Modal } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item

let Info = options => {
  const { dispatch, form, carOperateLog } = options
  const { plateList, previewVisible, previewImage } = options

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
      type: 'carOperateLogStore/toPage',
    })
  }

  // 预览图片
  const handlePreview = file => {
    console.log('handlePreview')
    dispatch({
      type: 'carOperateLogStore/lookPreview',
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }
  // 删除图片
  const handleCancel = e => {
    console.log('handleCancel')
    dispatch({
      type: 'carOperateLogStore/unlookPreview',
    })
  }

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="车辆运营数据详情">
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        自编号&nbsp;
                    </span>
                  )}
                >
                  {carOperateLog.carNo}
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
                  {carOperateLog.plateNumber}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车辆照片&nbsp;
                    </span>
                  )}
                >
                  <div >
                    <Upload
                      action=""
                      listType="picture-card"
                      fileList={plateList}
                      onPreview={handlePreview}
                    />
                    <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        选择年月份&nbsp;
                    </span>
                  )}
                >
                  {carOperateLog.yearMonth}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                       车辆月度行驶里程&nbsp;
                    </span>
                  )}
                >
                  {carOperateLog.travelMileage}(公里)
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车辆月度营运里程&nbsp;
                    </span>
                  )}
                >
                  {carOperateLog.operateMileage}(公里)
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车辆月度营业收入&nbsp;
                    </span>
                  )}
                >
                  {carOperateLog.incomeAmount}(元)
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车辆月度载客次数&nbsp;
                    </span>
                  )}
                >
                  {carOperateLog.passengerTimes}(人次)
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车辆月度客运量&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {carOperateLog.passengerCapacity}(人次)
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车辆月度耗电量&nbsp;
                    </span>
                  )}
                >
                  {carOperateLog.powerConsume}(度)
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                  <Button key="returnLoginButton" htmlType="button" size="large" style={{ marginLeft: '30px' }} onClick={toPage}>返回</Button>
                </FormItem>
              </Card>
            </Form>
          </Col>
          <Col span={12} />
        </Row>
      </TweenOneGroup>
    </div>
  )
}

function mapStateToProps({ carOperateLogStore }) {
  return {
    carOperateLog: carOperateLogStore.carOperateLog,
    plateList: carOperateLogStore.plateList,
    previewVisible: carOperateLogStore.previewVisible,
    previewImage: carOperateLogStore.previewImage,
  }
}

export default Form.create()(connect(mapStateToProps)(Info))
