/**
 * 依赖的摆放顺序是：
 * 1. 非按需加载在最上面
 * 2. 按需加载的在下面
 * 3. 按长度从短到长
 * 4. 从对象再获取对象点出来的在按需加载下面
 * 5. 本系统业务对象在最下面，且路径不应该为相对路径，应为别名路径，别名查看 webpack.config.js
 */
import TweenOne from 'rc-tween-one';
import { connect } from 'dva';
import { Form, Input, Icon, Row, Col, Button, Card, Upload, Modal } from 'antd';

const TweenOneGroup = TweenOne.TweenOneGroup;
const FormItem = Form.Item;

let Update = (props) => {
  const { dispatch, form, driver, previewVisible, previewImage } = props;
  const { registerFileList, checkFileList, noCriminalFileList, serviceFileList, insuranceFileList, IDCardImgFileList, safetyResponsibilityFileList } = props;
  const { registerPreviewImage, checkPreviewImage, noCriminalPreviewImage, servicePreviewImage, insurancePreviewImage, IDCardImgPreviewImage, safetyResponsibilityPreviewImage } = props;
  const { getFieldDecorator } = form;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
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
  };

  /* 提交事件 */
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'driverStore/updateImg',
          ...values,
          registerRecord: registerPreviewImage,
          checkReport: checkPreviewImage,
          noCriminalRecord: noCriminalPreviewImage,
          serviceCommitment: servicePreviewImage,
          insuranceCommitment: insurancePreviewImage,
          IDCardImg: IDCardImgPreviewImage,
          safetyResponsibility: safetyResponsibilityPreviewImage,
        });
      }
    });
  };

  /* 返回分页 */
  const toPage = (e) => {
    dispatch({
      type: 'driverStore/toPage',
    });
  };
  /* 入职登记表 上传图片*/
  const registerChange = ({ fileList }) => {
    dispatch({
      type: 'driverStore/registerChange',
      registerFileList: fileList,
    });
  };
  /* 体检报告 上传图片*/
  const checkChange = ({ fileList }) => {
    dispatch({
      type: 'driverStore/checkChange',
      checkFileList: fileList,
    });
  };
  /* 无犯罪记录证明 上传图片*/
  const noCriminalChange = ({ fileList }) => {
    dispatch({
      type: 'driverStore/noCriminalChange',
      noCriminalFileList: fileList,
    });
  };
  /* 优质服务承诺书 上传图片*/
  const serviceChange = ({ fileList }) => {
    dispatch({
      type: 'driverStore/serviceChange',
      serviceFileList: fileList,
    });
  };
  /* 意外险自愿购买承诺书 上传图片*/
  const insuranceChange = ({ fileList }) => {
    dispatch({
      type: 'driverStore/insuranceChange',
      insuranceFileList: fileList,
    });
  };
  /* 身份证复印件 上传图片*/
  const IDCardImgChange = ({ fileList }) => {
    dispatch({
      type: 'driverStore/IDCardImgChange',
      IDCardImgFileList: fileList,
    });
  };
  /* 安全责任书 上传图片*/
  const safetyResponsibilityChange = ({ fileList }) => {
    dispatch({
      type: 'driverStore/safetyResponsibilityChange',
      safetyResponsibilityFileList: fileList,
    });
  };
  // 预览图片
  const lookPreview = (file) => {
    dispatch({
      type: 'driverStore/lookPreview',
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };
  // 关闭预览图片
  const unlookPreview = (e) => {
    dispatch({
      type: 'driverStore/unlookPreview',
    });
  };

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">添加</div>
    </div>
  );

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={14}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="修改档案">
                {getFieldDecorator('id', { initialValue: driver.id })(<Input type="hidden" />)}
                {getFieldDecorator('insurance', { initialValue: driver.insurance })(<Input type="hidden" />)}
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        自编号&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('carNo', {
                    initialValue: driver.carNo,
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
                >
                  {getFieldDecorator('plateNumber', {
                    initialValue: driver.plateNumber,
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
                >
                  {getFieldDecorator('userName', {
                    initialValue: driver.userName,
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        从业资格证号&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('qualificationNo', {
                    initialValue: driver.qualificationNo,
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        入职登记表&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('registerRecord', {})(
                    <div>
                      <Upload
                        action="/fileupload/image.htm"
                        listType="picture-card"
                        fileList={registerFileList}
                        onPreview={lookPreview}
                        onChange={registerChange}
                      >
                        {registerFileList.length >= 1 ? null : uploadButton}
                      </Upload>
                      <Modal visible={previewVisible} footer={null} onCancel={unlookPreview}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                    </div>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        体检报告&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('checkReport', {})(
                    <div>
                      <Upload
                        action="/fileupload/image.htm"
                        listType="picture-card"
                        fileList={checkFileList}
                        onPreview={lookPreview}
                        onChange={checkChange}
                      >
                        {checkFileList.length >= 1 ? null : uploadButton}
                      </Upload>
                      <Modal visible={previewVisible} footer={null} onCancel={unlookPreview}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                    </div>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                   无犯罪记录证明&nbsp;
                   </span>
                   )}
                >
                  {getFieldDecorator('noCriminalRecord', {})(
                    <div>
                      <Upload
                        action="/fileupload/image.htm"
                        listType="picture-card"
                        fileList={noCriminalFileList}
                        onPreview={lookPreview}
                        onChange={noCriminalChange}
                      >
                        {noCriminalFileList.length >= 1 ? null : uploadButton}
                      </Upload>
                      <Modal visible={previewVisible} footer={null} onCancel={unlookPreview}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                    </div>
                   )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                   优质服务承诺书&nbsp;
                   </span>
                   )}
                >
                  {getFieldDecorator('serviceCommitment', {})(
                    <div>
                      <Upload
                        action="/fileupload/image.htm"
                        listType="picture-card"
                        fileList={serviceFileList}
                        onPreview={lookPreview}
                        onChange={serviceChange}
                      >
                        {serviceFileList.length >= 1 ? null : uploadButton}
                      </Upload>
                      <Modal visible={previewVisible} footer={null} onCancel={unlookPreview}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                    </div>
                   )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                   意外险自愿购买承诺书&nbsp;
                   </span>
                   )}
                >
                  {getFieldDecorator('insuranceCommitment', {})(
                    <div>
                      <Upload
                        action="/fileupload/image.htm"
                        listType="picture-card"
                        fileList={insuranceFileList}
                        onPreview={lookPreview}
                        onChange={insuranceChange}
                      >
                        {insuranceFileList.length >= 1 ? null : uploadButton}
                      </Upload>
                      <Modal visible={previewVisible} footer={null} onCancel={unlookPreview}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                    </div>
                   )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                   身份证复印件&nbsp;
                   </span>
                   )}
                >
                  {getFieldDecorator('IDCardImg', {})(
                    <div>
                      <Upload
                        action="/fileupload/image.htm"
                        listType="picture-card"
                        fileList={IDCardImgFileList}
                        onPreview={lookPreview}
                        onChange={IDCardImgChange}
                      >
                        {IDCardImgFileList.length >= 1 ? null : uploadButton}
                      </Upload>
                      <Modal visible={previewVisible} footer={null} onCancel={unlookPreview}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                    </div>
                   )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                   安全责任书&nbsp;
                   </span>
                   )}
                >
                  {getFieldDecorator('safetyResponsibility', {})(
                    <div>
                      <Upload
                        action="/fileupload/image.htm"
                        listType="picture-card"
                        fileList={safetyResponsibilityFileList}
                        onPreview={lookPreview}
                        onChange={safetyResponsibilityChange}
                      >
                        {safetyResponsibilityFileList.length >= 1 ? null : uploadButton}
                      </Upload>
                      <Modal visible={previewVisible} footer={null} onCancel={unlookPreview}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                    </div>
                   )}
                </FormItem>
                }
                <FormItem {...tailFormItemLayout}>
                  <ZButton permission="driver:archives:update">
                    <Button key="registerButton" type="primary" htmlType="submit" size="large">保存</Button>
                  </ZButton>
                  <Button key="returnLoginButton" htmlType="button" size="large" style={{ marginLeft: '30px' }} onClick={toPage}>返回</Button>
                </FormItem>
              </Card>
            </Form>
          </Col>
          <Col span={10} />
        </Row>
      </TweenOneGroup>
    </div>
  );
};

function mapStateToProps({ driverStore }) {
  return {
    driver: driverStore.driver,
    previewVisible: driverStore.previewVisible,
    previewImage: driverStore.previewImage,
    registerFileList: driverStore.registerFileList,
    registerPreviewImage: driverStore.registerPreviewImage,
    checkFileList: driverStore.checkFileList,
    checkPreviewImage: driverStore.checkPreviewImage,
    noCriminalFileList: driverStore.noCriminalFileList,
    noCriminalPreviewImage: driverStore.noCriminalPreviewImage,
    serviceFileList: driverStore.serviceFileList,
    servicePreviewImage: driverStore.servicePreviewImage,
    insuranceFileList: driverStore.insuranceFileList,
    insurancePreviewImage: driverStore.insurancePreviewImage,
    IDCardImgFileList: driverStore.IDCardImgFileList,
    IDCardImgPreviewImage: driverStore.IDCardImgPreviewImage,
    safetyResponsibilityFileList: driverStore.safetyResponsibilityFileList,
    safetyResponsibilityPreviewImage: driverStore.safetyResponsibilityPreviewImage,
  };
}

Update = Form.create()(Update);
export default connect(mapStateToProps)(Update);
