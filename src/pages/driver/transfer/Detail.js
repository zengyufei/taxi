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
import { Form, Input, Tooltip, Icon, Cascader, Row, Col, Checkbox, Button, Card } from 'antd';

const TweenOneGroup = TweenOne.TweenOneGroup;
const FormItem = Form.Item;

let Detail = (props) => {
  const { dispatch, transfer } = props;

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
      type: 'transferStore/toPage',
    });
  };

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="过户信息详情">
                <FormItem {...formItemLayout} label={(<span>旧用户资格证&nbsp;</span>)}>
                  {transfer.oldQualificationNo}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>旧用户姓名&nbsp;</span>)}>
                  {transfer.oldUserName}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>自编号&nbsp;</span>)}>
                  {transfer.carNo}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>车牌号&nbsp;</span>)}>
                  {transfer.plateNumber}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>新用户资格证&nbsp;</span>)}>
                  {transfer.newQualificationNo}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>新用户姓名&nbsp;</span>)}>
                  {transfer.newUserName}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>缴款日期&nbsp;</span>)}>
                  {transfer.transferDate}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>经办人&nbsp;</span>)}>
                  {transfer.opratorUser}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
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

Detail = Form.create()(Detail);
export default connect(mapStateToProps)(Detail);
