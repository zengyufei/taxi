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
  const { dispatch, monthQuota } = props;

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
      type: 'monthQuotaStore/toPage',
    });
  };

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="月缴定额详情">
                <FormItem {...formItemLayout} label={(<span>自编号&nbsp;</span>)}>
                  {monthQuota.carNo}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>车牌号&nbsp;</span>)}>
                  {monthQuota.plateNumber}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>驾驶员姓名&nbsp;</span>)}>
                  {monthQuota.userName}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>从业资格证号&nbsp;</span>)}>
                  {monthQuota.qualificationNo}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>年月&nbsp;</span>)}>
                  {monthQuota.yearMonth}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>出勤天数&nbsp;</span>)}>
                  {monthQuota.workDays}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>月末状态&nbsp;</span>)}>
                  {monthQuota.endStatus == 'WORKING' ? '在职' : '离职'}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>标准营收金额&nbsp;</span>)}>
                  {monthQuota.standardAmount}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>计划营收金额&nbsp;</span>)}>
                  {monthQuota.planAmount}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>营运核减金额 &nbsp;</span>)}>
                  {monthQuota.serviceSubAmount}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>维修核减金额 &nbsp;</span>)}>
                  {monthQuota.repairSubAmount}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>事故核减金额 &nbsp;</span>)}>
                  {monthQuota.accidentSubAmount}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>实际营收金额 &nbsp;</span>)}>
                  {monthQuota.realAmount}
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

function mapStateToProps({ monthQuotaStore }) {
  return {
    monthQuota: monthQuotaStore.monthQuota,
  };
}

Detail = Form.create()(Detail);
export default connect(mapStateToProps)(Detail);
