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
import { Form, Input, Tooltip, Icon, Cascader, Row, Col, Button, Card, DatePicker } from 'antd';
import moment from 'moment';

const TweenOneGroup = TweenOne.TweenOneGroup;
const FormItem = Form.Item;

let Update = (props) => {
  const { dispatch, form, transfer } = props;
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
          type: 'transferStore/update',
          ...values,
          transferDate: form.getFieldValue('transferDate') != undefined ? form.getFieldValue('transferDate').format('YYYY-MM-DD') : undefined,
        });
      }
    });
  };

  /* 返回分页 */
  const toPage = (e) => {
    dispatch({
      type: 'transferStore/toPage',
    });
  };

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="修改过户信息">
                {getFieldDecorator('id', { initialValue: transfer.id })(<Input type="hidden" />)}
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        旧用户从业资格证号&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('oldQualificationNo', {
                    rules: [{ required: true, whitespace: true, message: '请输入旧用户从业资格证号!' }],
                    initialValue: transfer.oldQualificationNo,
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        旧用户姓名&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('oldUserName', {
                    initialValue: transfer.oldUserName,
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
                    initialValue: transfer.carNo,
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
                    initialValue: transfer.plateNumber,
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        新车主从业资格证号&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('newQualificationNo', {
                    initialValue: transfer.newQualificationNo,
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        新车主姓名&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('newUserName', {
                    initialValue: transfer.newUserName,
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        过户时间&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('transferDate', {
                    rules: [{ required: true, message: '请选择过户时间!' }],
                    initialValue: moment(transfer.transferDate),
                  })(<DatePicker />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        经办人&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('opratorUser', {
                    initialValue: transfer.opratorUser,
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <ZButton permission="driver:transfer:update">
                    <Button key="registerButton" type="primary" htmlType="submit" size="large">修改</Button>
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

function mapStateToProps({ transferStore }) {
  return {
    transfer: transferStore.transfer,
  };
}

Update = Form.create()(Update);
export default connect(mapStateToProps)(Update);
