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
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox,
  Button, Card, Radio, InputNumber, DatePicker, Alert, message, Upload, Modal } from 'antd';

const TweenOneGroup = TweenOne.TweenOneGroup;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const Option = Select.Option;

let CarInfo = (props) => {
  const { dispatch, form, car } = props;
  const { getFieldDecorator } = form;
  const { previewVisible, previewImage, plateList, ownershipList, roadTransportList, certificateList } = props;

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

  /* 返回分页 */
  const toPage = (e) => {
    dispatch({
      type: 'carStore/queryPage',
    });
  };

  // 预览图片
  const handlePreview = (file) => {
    console.log('handlePreview');
    console.log(file);
    dispatch({
      type: 'carStore/lookPreview',
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };
  // 删除图片
  const handleCancel = (e) => {
    console.log('handleCancel');
    dispatch({
      type: 'carStore/unlookPreview',
    });
  };

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="车辆详情">
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        自编号&nbsp;
                      </span>
                    )}
                >
                  {car.carNo}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车牌号&nbsp;
                      </span>
                    )}
                >
                  {car.plateNumber}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车辆照片（45度角）&nbsp;
                      </span>
                    )}
                >
                  <Upload
                    action=""
                    listType="picture-card"
                    fileList={plateList}
                    onPreview={handlePreview}
                  />
                  <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车架号&nbsp;
                      </span>
                    )}
                >
                  {car.carFrame}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        产权证&nbsp;
                      </span>
                    )}
                >
                  <Upload
                    action=""
                    listType="picture-card"
                    fileList={ownershipList}
                    onPreview={handlePreview}
                  />
                  <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        产权证号&nbsp;
                      </span>
                    )}
                >
                  {car.ownershipNo}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        产权证起始时间&nbsp;
                      </span>
                    )}
                >
                  {car.ownershipBeginDate}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        产权证截止时间&nbsp;
                      </span>
                    )}
                >
                  {car.ownershipEndDate}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        发动机号&nbsp;
                      </span>
                    )}
                >
                  {car.engineNumber}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        行驶证登记日期&nbsp;
                      </span>
                    )}
                >
                  {car.drivingLicenseDate}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车辆类型&nbsp;
                      </span>
                    )}
                >
                  {car.carTypeName}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        道路运输证&nbsp;
                      </span>
                    )}
                >
                  <Upload
                    action=""
                    listType="picture-card"
                    fileList={roadTransportList}
                    onPreview={handlePreview}
                  />
                  <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        道路运输证起始时间&nbsp;
                      </span>
                    )}
                >
                  {car.roadTransportBeginDate}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        道路运输证截止时间&nbsp;
                      </span>
                    )}
                >
                  {car.roadTransportEndDate}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车辆颜色&nbsp;
                      </span>
                    )}
                >
                  {car.carColorName}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        机动车登记证书&nbsp;
                      </span>
                    )}
                >
                  <Upload
                    action=""
                    listType="picture-card"
                    fileList={certificateList}
                    onPreview={handlePreview}
                  />
                  <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        机动车登记证号&nbsp;
                      </span>
                    )}

                >
                  {car.certificateNo}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车辆营运状态&nbsp;
                      </span>
                    )}
                >
                  {car.carStatusName}
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
  );
};

function mapStateToProps({ carStore }) {
  return {
    car:　carStore.car,
    plateList: carStore.plateList,
    ownershipList: carStore.ownershipList,
    roadTransportList: carStore.roadTransportList,
    certificateList: carStore.certificateList,
    previewVisible: carStore.previewVisible,
    previewImage: carStore.previewImage,
  };
}

CarInfo = Form.create()(CarInfo);
export default connect(mapStateToProps)(CarInfo);
