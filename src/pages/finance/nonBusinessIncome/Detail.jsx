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
  const { dispatch, nonBusinessIncome } = props;

  let inComeTypeDesc;
  switch (nonBusinessIncome.inComeType) {
    case 'BUSINESS_INCOME':
      inComeTypeDesc = '运营收入';
      break;
    case 'CLOTHING_INCOME':
      inComeTypeDesc = '服装收入';
      break;
    case 'LABEL_INCOME':
      inComeTypeDesc = '标识贴收入';
      break;
    case 'BILL_INCOME':
      inComeTypeDesc = '票据收入';
      break;
    case 'ORTHER_INCOME':
      inComeTypeDesc = '其它收入';
      break;
  }

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
      type: 'nonBusinessIncomeStore/toPage',
    });
  };

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="营业外收入详情">
                <FormItem {...formItemLayout} label={(<span>资格证&nbsp;</span>)}>
                  {nonBusinessIncome.qualificationNo}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>驾驶员姓名&nbsp;</span>)}>
                  {nonBusinessIncome.userName}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>自编号&nbsp;</span>)}>
                  {nonBusinessIncome.carNo}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>车牌号&nbsp;</span>)}>
                  {nonBusinessIncome.plateNumber}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>类型&nbsp;</span>)}>
                  {inComeTypeDesc}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>项目名称&nbsp;</span>)}>
                  {nonBusinessIncome.itemName}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>金额&nbsp;</span>)}>
                  {nonBusinessIncome.amount}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>缴款日期&nbsp;</span>)}>
                  {nonBusinessIncome.payDate}
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

function mapStateToProps({ nonBusinessIncomeStore }) {
  return {
    nonBusinessIncome: nonBusinessIncomeStore.nonBusinessIncome,
  };
}

Detail = Form.create()(Detail);
export default connect(mapStateToProps)(Detail);
