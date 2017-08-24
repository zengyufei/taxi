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
  const { dispatch, form, reserveMoney } = props;
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
          type: 'reserveMoneyStore/update',
          ...values,
          payDate: form.getFieldValue('payDate') != undefined ? form.getFieldValue('payDate').format('YYYY-MM-DD') : undefined,
        });
      }
    });
  };

  /* 返回分页 */
  const toPage = (e) => {
    dispatch({
      type: 'reserveMoneyStore/toPage',
    });
  };

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="修改预留金">
                {getFieldDecorator('id', { initialValue: reserveMoney.id })(<Input type="hidden" />)}
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        从业资格证号&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('qualificationNo', {
                    initialValue: reserveMoney.qualificationNo,
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
                    initialValue: reserveMoney.userName,
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
                    initialValue: reserveMoney.carNo,
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
                    initialValue: reserveMoney.plateNumber,
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        预留金金额&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('totalAmount', {
                    rules: [{ required: true, message: '请输入预留金金额!' }],
                    initialValue: reserveMoney.totalAmount,
                  })(
                    <InputNumber min={0} max={9999999} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        交通事故扣减金额&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('accidentSubAmount', { initialValue: reserveMoney.accidentSubAmount })(
                    <InputNumber min={0} max={9999999} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        交通违法扣减金额&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('violationSubAmount', { initialValue: reserveMoney.violationSubAmount })(
                    <InputNumber min={0} max={9999999} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        充电费用扣减金额&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('chargingSubAmount', { initialValue: reserveMoney.chargingSubAmount })(
                    <InputNumber min={0} max={9999999} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        其它项扣减金额&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('otherSubAmount', { initialValue: reserveMoney.otherSubAmount })(
                    <InputNumber min={0} max={9999999} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        退款金额&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('refundAmount', { initialValue: reserveMoney.refundAmount })(
                    <InputNumber min={0} max={9999999} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        退款日期&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('payDate', { initialValue: moment(reserveMoney.payDate) })(<DatePicker />)}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <ZButton permission="finance:reserveMoney:update">
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

function mapStateToProps({ reserveMoneyStore }) {
  return {
    reserveMoney: reserveMoneyStore.reserveMoney,
  };
}

Update = Form.create()(Update);
export default connect(mapStateToProps)(Update);
