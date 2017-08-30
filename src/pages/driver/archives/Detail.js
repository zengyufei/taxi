/*
 * @Author: zengyufei 
 * @Date: 2017-08-25 14:54:56 
 * @Last Modified by: zengyufei 
 * @Last Modified time: 2017-08-25 14:54:56 
 */
import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Row, Col, Button, Card, Upload, Modal } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item

let Detail = options => {
  const { dispatch, driver, previewImage, previewVisible } = options
  const { registerFileList, checkFileList, noCriminalFileList, serviceFileList, insuranceFileList, IDCardImgFileList, safetyResponsibilityFileList } = options

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
      type: 'driverStore/toPage',
    })
  };

  // 预览图片
  const lookPreview = file => {
    dispatch({
      type: 'driverStore/lookPreview',
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  };
  // 关闭预览图片
  const unlookPreview = e => {
    dispatch({
      type: 'driverStore/unlookPreview',
    })
  };

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="档案详情">
                <FormItem {...formItemLayout} label={(<span>自编号&nbsp;</span>)}>
                  {driver.carNo}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>车牌号&nbsp;</span>)}>
                  {driver.plateNumber}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>驾驶员姓名&nbsp;</span>)}>
                  {driver.userName}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>从业资格证号&nbsp;</span>)}>
                  {driver.qualificationNo}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        入职登记表&nbsp;
                    </span>
                  )}
                >
                  <div>
                    <Upload
                      listType="picture-card"
                      fileList={registerFileList}
                      onPreview={lookPreview}
                    />
                    <Modal visible={previewVisible} footer={null} onCancel={unlookPreview}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        体检报告&nbsp;
                    </span>
                  )}
                >
                  <div>
                    <Upload
                      listType="picture-card"
                      fileList={checkFileList}
                      onPreview={lookPreview}
                    />
                    <Modal visible={previewVisible} footer={null} onCancel={unlookPreview}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                   无犯罪记录证明&nbsp;
                    </span>
                  )}
                >
                  <div>
                    <Upload
                      listType="picture-card"
                      fileList={noCriminalFileList}
                      onPreview={lookPreview}
                    />
                    <Modal visible={previewVisible} footer={null} onCancel={unlookPreview}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                   优质服务承诺书&nbsp;
                    </span>
                  )}
                >
                  <div>
                    <Upload
                      listType="picture-card"
                      fileList={serviceFileList}
                      onPreview={lookPreview}
                    />
                    <Modal visible={previewVisible} footer={null} onCancel={unlookPreview}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                   意外险自愿购买承诺书&nbsp;
                    </span>
                  )}
                >
                  <div>
                    <Upload
                      listType="picture-card"
                      fileList={insuranceFileList}
                      onPreview={lookPreview}
                    />
                    <Modal visible={previewVisible} footer={null} onCancel={unlookPreview}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                   身份证复印件&nbsp;
                    </span>
                  )}
                >
                  <div>
                    <Upload
                      listType="picture-card"
                      fileList={IDCardImgFileList}
                      onPreview={lookPreview}
                    />
                    <Modal visible={previewVisible} footer={null} onCancel={unlookPreview}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                   安全责任书&nbsp;
                    </span>
                  )}
                >
                  <div>
                    <Upload
                      listType="picture-card"
                      fileList={safetyResponsibilityFileList}
                      onPreview={lookPreview}
                    />
                    <Modal visible={previewVisible} footer={null} onCancel={unlookPreview}>
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
        </Row>
      </TweenOneGroup>
    </div>
  )
};

function mapStateToProps({ driverStore }) {
  return {
    driver: driverStore.driver,
    previewVisible: driverStore.previewVisible,
    previewImage: driverStore.previewImage,
    registerFileList: driverStore.registerFileList,
    checkFileList: driverStore.checkFileList,
    noCriminalFileList: driverStore.noCriminalFileList,
    serviceFileList: driverStore.serviceFileList,
    insuranceFileList: driverStore.insuranceFileList,
    IDCardImgFileList: driverStore.IDCardImgFileList,
    safetyResponsibilityFileList: driverStore.safetyResponsibilityFileList,
  }
}

export default Form.create()(connect(mapStateToProps)(Detail))
