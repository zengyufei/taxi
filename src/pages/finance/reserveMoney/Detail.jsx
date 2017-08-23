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
  const { dispatch, reserveMoney } = props;

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
      type: 'reserveMoneyStore/toPage',
    });
  };

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="预留金详情">
                <FormItem {...formItemLayout} label={(<span>资格证&nbsp;</span>)}>
                  {reserveMoney.qualificationNo}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>驾驶员姓名&nbsp;</span>)}>
                  {reserveMoney.userName}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>自编号&nbsp;</span>)}>
                  {reserveMoney.carNo}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>车牌号&nbsp;</span>)}>
                  {reserveMoney.plateNumber}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>预留金金额&nbsp;</span>)}>
                  {reserveMoney.totalAmount}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>交通事故扣减金额&nbsp;</span>)}>
                  {reserveMoney.accidentSubAmount}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>交通违法扣减金额&nbsp;</span>)}>
                  {reserveMoney.violationSubAmount}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>充电费用扣减金额&nbsp;</span>)}>
                  {reserveMoney.chargingSubAmount}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>其它项扣减金额&nbsp;</span>)}>
                  {reserveMoney.otherSubAmount}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>退款金额&nbsp;</span>)}>
                  {reserveMoney.refundAmount}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>扣减日期&nbsp;</span>)}>
                  {reserveMoney.payDate}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>缴纳日期&nbsp;</span>)}>
                  {reserveMoney.createTime}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>离职日期&nbsp;</span>)}>
                  {reserveMoney.leaveDate}
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

function mapStateToProps({ reserveMoneyStore }) {
  return {
    reserveMoney: reserveMoneyStore.reserveMoney,
  };
}

Detail = Form.create()(Detail);
export default connect(mapStateToProps)(Detail);
