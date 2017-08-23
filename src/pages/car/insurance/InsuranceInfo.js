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
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Switch,
  Button, Card, Radio, InputNumber, DatePicker, Alert, message, Upload, Modal } from 'antd';
import moment from 'moment';

const TweenOneGroup = TweenOne.TweenOneGroup;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const Option = Select.Option;

let InsuranceInfo = (props) => {
  const { dispatch, form, insurance } = props;
  const { getFieldDecorator } = form;
  const { plateList, previewVisible, previewImage, insuranceList } = props;

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
      type: 'insuranceStore/queryPage',
    });
  };

  // 预览图片
  const handlePreview = (file) => {
    dispatch({
      type: 'insuranceStore/lookPreview',
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };
  // 删除图片
  const handleCancel = (e) => {
    dispatch({
      type: 'insuranceStore/unlookPreview',
    });
  };

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="新增车辆保险">
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        自编号&nbsp;
                      </span>
                    )}
                  hasFeedback
                >
                  {insurance.carNo}
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
                  {insurance.plateNumber}
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
                        保险类型 &nbsp;
                      </span>
                    )}
                  hasFeedback
                >
                  {insurance.insuranceTypeName}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        保险公司 &nbsp;
                      </span>
                    )}
                  hasFeedback
                >
                  {insurance.insuranceCompany}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        保险名称 &nbsp;
                      </span>
                    )}
                  hasFeedback
                >
                  {insurance.insuranceName}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        保险金额 &nbsp;
                      </span>
                    )}
                  hasFeedback
                >
                  {insurance.insuranceMoney}(元)
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        保险单号 &nbsp;
                      </span>
                    )}
                  hasFeedback
                >
                  {insurance.policyNo}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        保险有效扫描件&nbsp;
                      </span>
                    )}
                >
                  <div >
                    <Upload
                      action=""
                      listType="picture-card"
                      fileList={insuranceList}
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
                        保险生效时间 &nbsp;
                      </span>
                    )}
                >
                  { insurance.insuranceBuyDate}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                         保险到期时间&nbsp;
                      </span>
                    )}
                >
                  { insurance.insuranceExpireDate}
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

function mapStateToProps({ insuranceStore }) {
  return {
    insurance: insuranceStore.insurance,
    plateList: insuranceStore.plateList,
    previewVisible: insuranceStore.previewVisible,
    previewImage: insuranceStore.previewImage,
    insuranceList: insuranceStore.insuranceList,
  };
}
InsuranceInfo = Form.create()(InsuranceInfo);
export default connect(mapStateToProps)(InsuranceInfo);
