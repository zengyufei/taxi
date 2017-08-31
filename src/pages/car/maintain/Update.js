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
import { Form, Input, Icon, Row, Col,
  Button, Card, DatePicker, Upload, Modal } from 'antd'
import moment from 'moment'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item

let Update = options => {
  const { dispatch, form, maintain } = options
  const { getFieldDecorator } = form
  const { plateList, previewVisible, previewImage, maintainList, maintainImage } = options

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
  const updateMaintain = e => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const planFinishDate = form.getFieldValue('planFinishDate') ? form.getFieldValue('planFinishDate').format('YYYY-MM-DD') : null
        const planRealityDate = form.getFieldValue('planRealityDate') ? form.getFieldValue('planRealityDate').format('YYYY-MM-DD') : null
        dispatch({
          type: 'maintainStore/updateNotNull',
          ...values,
          planFinishDate,
          planRealityDate,
          maintainImage,
        })
      }
    })
  }

  /* 返回分页 */
  const toPage = () => {
    dispatch({
      type: 'maintainStore/toPage',
    })
  }

  // 上传图片
  const maintainChange = ({ fileList }) => {
    dispatch({
      type: 'maintainStore/maintainChange',
      maintainList: fileList,
    })
  }
  // 预览图片
  const handlePreview = file => {
    console.log('handlePreview')
    console.log(file)
    dispatch({
      type: 'maintainStore/lookPreview',
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }
  // 删除图片
  const handleCancel = () => {
    console.log('handleCancel')
    dispatch({
      type: 'maintainStore/unlookPreview',
    })
  }
  // 添加图片样式
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">点击上传文件</div>
    </div>
  )

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form onSubmit={updateMaintain} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="编辑二级维修">
                <FormItem>
                  {getFieldDecorator('id', { initialValue: maintain.id,
                  })(
                    <Input type="hidden" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('carId', { initialValue: maintain.carId,
                  })(
                    <Input type="hidden" />
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
                    rules: [{ required: true, message: '请输入自编号!', whitespace: true }], initialValue: maintain.carNo,
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
                    rules: [{ required: true, message: '请输入车牌号!' }], initialValue: maintain.plateNumber,
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车辆照片&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('plateImage')(
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
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        二级维护计划完成日期&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('planFinishDate', {
                    rules: [{ required: true, message: '请选择二级维护计划完成日期!' }], initialValue: moment(maintain.planFinishDate),
                  })(<DatePicker />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        二级维护实际完成日期&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('planRealityDate', {
                    initialValue: moment(maintain.planRealityDate),
                  })(<DatePicker />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        二级维护单据的扫描件&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('maintainImage')(
                    <div >
                      <Upload
                        action={`${BASE_URL}/fileupload/image.htm`}
                        listType="picture-card"
                        fileList={maintainList}
                        onPreview={handlePreview}
                        onChange={maintainChange}
                      >
                        { maintainList.length >= 1 ? null : uploadButton}
                      </Upload>
                      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                    </div>
                  )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                  <Button key="registerButton" type="primary" htmlType="submit" size="large">保存编辑</Button>
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

function mapStateToProps({ maintainStore }) {
  return {
    maintain: maintainStore.maintain,
    plateList: maintainStore.plateList,
    previewVisible: maintainStore.previewVisible,
    previewImage: maintainStore.previewImage,
    maintainList: maintainStore.maintainList,
    maintainImage: maintainStore.maintainImage,
  }
}
export default Form.create()(connect(mapStateToProps)(Update))
