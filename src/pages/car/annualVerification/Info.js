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
import { Form, Row, Col,
  Button, Card, Upload, Modal } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item


const Info = options => {
  const { dispatch, annualVerification } = options
  const { previewVisible, previewImage, plateList, synthesizeFileList, taximeterFileList, drivingLicenseFileList } = options

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
      type: 'annualVerificationStore/toPage',
    })
  }

  // 预览图片
  const handlePreview = file => {
    dispatch({
      type: 'annualVerificationStore/lookPreview',
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }
  // 删除图片
  const handleCancel = () => {
    dispatch({
      type: 'annualVerificationStore/unlookPreview',
    })
  }

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="车辆年审详情">
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        自编号&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {annualVerification.carNo}
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
                  {annualVerification.plateNumber}
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
                        营运证年审有效期截止时间&nbsp;
                    </span>
                  )}
                >
                  {annualVerification.synthesizeDate}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        营运证年审有效扫描件&nbsp;
                    </span>
                  )}
                >
                  <div >
                    <Upload
                      action=""
                      listType="picture-card"
                      fileList={synthesizeFileList}
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
                        行驶证有效期截止时间&nbsp;
                    </span>
                  )}
                >
                  {annualVerification.drivingLicenseDate}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        行驶证有效扫描件&nbsp;
                    </span>
                  )}
                >
                  <div >
                    <Upload
                      action=""
                      listType="picture-card"
                      fileList={drivingLicenseFileList}
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
                        计价器年审有效期截止时间&nbsp;
                    </span>
                  )}
                >
                  {annualVerification.taximeterDate}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        计价器年审有效期截止时间扫描件&nbsp;
                    </span>
                  )}
                >
                  <div >
                    <Upload
                      action=""
                      listType="picture-card"
                      fileList={taximeterFileList}
                      onPreview={handlePreview}
                    />
                    <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>
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
function mapStateToProps({ annualVerificationStore }) {
  return {
    annualVerification: annualVerificationStore.annualVerification,

    plateList: annualVerificationStore.plateList,
    previewVisible: annualVerificationStore.previewVisible,
    previewImage: annualVerificationStore.previewImage,
    synthesizeFileList: annualVerificationStore.synthesizeFileList,
    synthesizeFile: annualVerificationStore.synthesizeFile,
    drivingLicenseFileList: annualVerificationStore.drivingLicenseFileList,
    drivingLicenseFile: annualVerificationStore.drivingLicenseFile,
    taximeterFileList: annualVerificationStore.taximeterFileList,
    taximeterFile: annualVerificationStore.taximeterFile,

  }
}

export default Form.create()(connect(mapStateToProps)(Info))
