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
import { Form, Input, Tooltip, Icon, Cascader, Row, Col, Button, Card, Radio, InputNumber, DatePicker } from 'antd';
import moment from 'moment';

const TweenOneGroup = TweenOne.TweenOneGroup;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

let Update = (props) => {
  const { dispatch, form, securityDeposit, startValue, endValue } = props;
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
          type: 'securityDepositStore/update',
          ...values,
          payDate: form.getFieldValue('payDate') != undefined ? form.getFieldValue('payDate').format('YYYY-MM-DD') : undefined,
          refundDate: form.getFieldValue('refundDate') != undefined ? form.getFieldValue('refundDate').format('YYYY-MM-DD') : undefined,
        });
      }
    });
  };

  /* 返回分页 */
  const toPage = (e) => {
    dispatch({
      type: 'securityDepositStore/toPage',
    });
  };

  // 自定义日期范围
  const disabledStartDate = (startValue) => {
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };
  const disabledEndDate = (endValue) => {
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };
  const onStartChange = (value) => {
    dispatch({
      type: 'commonStore/onStartChange',
      startValue: value,
    });
  };
  const onEndChange = (value) => {
    dispatch({
      type: 'commonStore/onEndChange',
      endValue: value,
    });
  };

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="修改月缴定额">
                {getFieldDecorator('id', { initialValue: securityDeposit.id })(<Input type="hidden" />)}
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        从业资格证号&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('qualificationNo', {
                    initialValue: securityDeposit.qualificationNo,
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
                    initialValue: securityDeposit.userName,
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
                >
                  {getFieldDecorator('carNo', {
                    initialValue: securityDeposit.carNo,
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
                    initialValue: securityDeposit.plateNumber,
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        安全保证金金额&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('amount', {
                    rules: [{ required: true, message: '请输入安全保证金金额!' }],
                    initialValue: securityDeposit.amount })(
                      <InputNumber min={0} max={9999999} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        安全保证金缴纳日期&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('payDate', { initialValue: moment(securityDeposit.payDate) })(
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD"
                      onChange={onStartChange}
                      disabledDate={disabledStartDate}
                    />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        安全保证金退还日期&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('refundDate', { initialValue: moment(securityDeposit.refundDate) })(
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD"
                      onChange={onEndChange}
                      disabledDate={disabledEndDate}
                    />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        状态&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('status', { initialValue: securityDeposit.status })(
                    <RadioGroup>
                      <Radio value>正常</Radio>
                      <Radio value={false}>退还</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <ZButton permission="finance:securityDeposit:update">
                    <Button key="registerButton" type="primary" htmlType="submit" size="large">保存</Button>
                  </ZButton>
                  <Button
                    key="returnLoginButton" htmlType="button" size="large" style={{ marginLeft: '30px' }}
                    onClick={toPage}
                  >返回</Button>
                </FormItem>
              </Card>
            </Form>
          </Col>
        </Row>
      </TweenOneGroup>
    </div>
  );
};

function mapStateToProps({ securityDepositStore, commonStore }) {
  return {
    securityDeposit: securityDepositStore.securityDeposit,
    startValue: commonStore.startValue,
    endValue: commonStore.endValue,
  };
}

Update = Form.create()(Update);
export default connect(mapStateToProps)(Update);
