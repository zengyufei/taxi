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
  const { dispatch, subtractAmount } = props;
  let subtractTypeDesc;
  switch (subtractAmount.subtractType) {
    case 'SERVICE_SUB':
      subtractTypeDesc = '营运核减';
      break;
    case 'REPAIR_SUB':
      subtractTypeDesc = '维修核减';
      break;
    case 'ACCIDENT_SUB':
      subtractTypeDesc = '维修核减';
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
      type: 'subtractAmountStore/toPage',
    });
  };

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="核减金额明细详情">
                <FormItem {...formItemLayout} label={(<span>自编号&nbsp;</span>)}>
                  {subtractAmount.carNo}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>车牌号&nbsp;</span>)}>
                  {subtractAmount.plateNumber}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>驾驶员姓名&nbsp;</span>)}>
                  {subtractAmount.userName}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>资格证&nbsp;</span>)}>
                  {subtractAmount.qualificationNo}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>年月&nbsp;</span>)}>
                  {subtractAmount.yearMonth}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>核减类型&nbsp;</span>)}>
                  {subtractTypeDesc}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>核减金额&nbsp;</span>)}>
                  {subtractAmount.subAmount}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>核减日期&nbsp;</span>)}>
                  {subtractAmount.subDate}
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

function mapStateToProps({ subtractAmountStore }) {
  return {
    subtractAmount: subtractAmountStore.subtractAmount,
  };
}

Detail = Form.create()(Detail);
export default connect(mapStateToProps)(Detail);
