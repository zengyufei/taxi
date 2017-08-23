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
import { Form, Input, Tooltip, Icon, Cascader, Row, Col, Button, Card, Radio, InputNumber, DatePicker, AutoComplete, Modal } from 'antd';

const TweenOneGroup = TweenOne.TweenOneGroup;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { MonthPicker } = DatePicker;

let Add = (props) => {
  const { dispatch, form, driver,drivers,carNos,visible } = props;
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
          type: 'subtractAmountStore/insert',
          ...values,
          subDate: form.getFieldValue('subDate') != undefined ? form.getFieldValue('subDate').format('YYYY-MM-DD') : undefined,
          yearMonth: form.getFieldValue('yearMonth') != undefined ? form.getFieldValue('yearMonth').format('YYYYMM') : undefined,
        });
      }
    });
  };

  /* 返回分页 */
  const toPage = (e) => {
    dispatch({
      type: 'subtractAmountStore/toPage',
    });
  };

  /** 模糊查询 车辆自编号 */
  const handleSearch = (value) => {
    dispatch({
      type: 'commonStore/queryLikeCarNo',
      str: value,
    });
  };
  /** 自编号查询车信息 */
  const queryByCarNo = () => {
    dispatch({
      type: 'commonStore/queryDriverListByOption',
      carNo: form.getFieldValue('carNo'),
    });
  };
  let carNo,rbs=[];
  const onCancel = () => {
    dispatch({
      type: 'commonStore/onCancel',
      visible: false,
      drivers: [],
    });
  }

  if(drivers.length == 1) {
    dispatch({
      type: 'commonStore/queryDriver',
      drivers: drivers,
      driver: driver,
      index: 0,
    });
    onCancel();
  } else if (drivers.length > 1) {
    drivers.forEach((value, index) => {
      rbs.push(<RadioButton key={index} value={index}>{value.userName} {value.qualificationNo}</RadioButton>);
    })
    // 弹出选择框
    dispatch({
      type: 'commonStore/onCancel',
      visible: true,
      drivers: drivers,
    });
  }
  const onOk = (e) => {
    dispatch({
      type: 'commonStore/queryDriver',
      drivers: drivers,
      driver: driver,
      index: e.target.value,
    });
    onCancel();
  }
  if(driver.features != undefined || driver.features != null){
    carNo = JSON.parse(driver.features).carNo;
  }

  return (
    <div>
      <Modal
        visible={visible}
        title="驾驶员人员"
        onCancel={onCancel}
        footer={null}
      >
        <RadioGroup onChange={onOk} size="large">
          {rbs}
        </RadioGroup>
      </Modal>
      <TweenOneGroup>
        <Row key="0">
          <Col span={12}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="新增核减金额明细">
                {getFieldDecorator('carId', { initialValue: driver != undefined ? driver.carId : '' })(<Input type="hidden" />)}
                {getFieldDecorator('driverId', { initialValue: driver != undefined ? driver.id : '' })(<Input type="hidden" />)}
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        自编号&nbsp;
                      </span>
                    )}
                  hasFeedback
                >
                  <Col span={18}>
                    {getFieldDecorator('carNo', {
                      rules: [{ required: true, message: '请输入自编号!', whitespace: true }],
                    })(
                      <AutoComplete
                        dataSource={carNos}
                        onSearch={handleSearch}
                        placeholder="车辆自编号"
                      />
                    )}
                  </Col>
                  <Col span={4}>
                    <Button style={{ marginLeft: '30px' }}  onClick={queryByCarNo}>查询</Button>
                  </Col>
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
                  {getFieldDecorator('plateNumber', {
                    initialValue: form.getFieldValue('carNo') == carNo && driver.features != undefined ? JSON.parse(driver.features).plateNumber : '',
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        从业资格证号&nbsp;
                      </span>
                    )}
                  hasFeedback
                >
                  <Col span={18}>
                    {getFieldDecorator('qualificationNo', {
                      initialValue: form.getFieldValue('carNo') == carNo && driver != undefined ? driver.qualificationNo : '',
                    })(
                      <Input disabled />
                    )}
                  </Col>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        驾驶员姓名&nbsp;
                      </span>
                    )}
                  hasFeedback
                >
                  {getFieldDecorator('userName', {
                    initialValue: form.getFieldValue('carNo') == carNo && driver != undefined ? driver.userName : '',
                  })(
                    <Input disabled />
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        年月&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('yearMonth', {
                    rules: [{ required: true, message: '请选择年月!' }],
                  })(<MonthPicker format="YYYYMM" />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        核减类型&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('subtractType', {
                    rules: [{ required: true, message: '请选择核减类型!' }],
                  })(
                    <RadioGroup>
                      <Radio value={'SERVICE_SUB'}>营运核减</Radio>
                      <Radio value={'REPAIR_SUB'}>维修核减</Radio>
                      <Radio value={'ACCIDENT_SUB'}>事故核减</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        核减金额&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('subAmount', {
                    rules: [{ required: true, message: '请输入核减金额!' }],
                  })(
                    <InputNumber min={0} max={9999999} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        核减日期&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('subDate', {
                    rules: [{ required: true, message: '请选择核减日期!' }],
                  })(<DatePicker />)}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <ZButton permission="finance:subtractAmount:insert">
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

function mapStateToProps({ commonStore }) {
  return {
    carNos: commonStore.carNos,
    driver: commonStore.driver,
    drivers: commonStore.drivers,
    visible: commonStore.visible,
  };
}

Add = Form.create()(Add);
export default connect(mapStateToProps)(Add);
