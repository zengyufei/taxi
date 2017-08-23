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
  const { dispatch, form, punishInfo } = props;
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
          type: 'punishInfoStore/update',
          ...values,
        });
      }
    });
  };

  /* 返回分页 */
  const toPage = (e) => {
    dispatch({
      type: 'punishInfoStore/toPage',
    });
  };

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={14}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '100%', marginTop: '10px' }}>
              {getFieldDecorator('id', { initialValue: punishInfo.id })(<Input type="hidden" />)}
              <Card title="修改违章详情">
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        违章编号&nbsp;
                      </span>
                    )}
                  hasFeedback
                >
                  {getFieldDecorator('punishCode', {
                    rules: [{ required: true, whitespace: true, message: '请输入违章编号!' }],
                    initialValue: punishInfo.punishCode,
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        违章描述&nbsp;
                      </span>
                    )}
                  hasFeedback
                >
                  {getFieldDecorator('punishDesc', {
                    rules: [{ required: true, whitespace: true, message: '请输入违章描述!' }],
                    initialValue: punishInfo.punishDesc,
                  })(
                    <Input type="textarea" rows={4} />
                  )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                  <ZButton permission="driver:punishInfo:update">
                    <Button key="registerButton" type="primary" htmlType="submit" size="large">保存</Button>
                  </ZButton>
                  <Button key="returnLoginButton" htmlType="button" size="large" style={{ marginLeft: '30px' }} onClick={toPage}>返回</Button>
                </FormItem>
              </Card>
            </Form>
          </Col>
        </Row>
      </TweenOneGroup>
    </div>
  );
};

function mapStateToProps({ punishInfoStore }) {
  return {
    punishInfo: punishInfoStore.punishInfo,
  };
}

Update = Form.create()(Update);
export default connect(mapStateToProps)(Update);
