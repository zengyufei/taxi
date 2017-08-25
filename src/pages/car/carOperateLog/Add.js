/**
 * 依赖的摆放顺序是：
 * 1. 非按需加载在最上面
 * 2. 按需加载的在下面
 * 3. 按长度从短到长
 * 4. 从对象再获取对象点出来的在按需加载下面
 * 5. 本系统业务对象在最下面，且路径不应该为相对路径，应为别名路径，别名查看 webpack.config.js
 */
import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox,
  Button, Card, Radio, InputNumber, DatePicker, Alert, message, Upload, Modal, AutoComplete } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item
const RadioGroup = Radio.Group
const { RangePicker, MonthPicker } = DatePicker
const Option = Select.Option

let CarOperateLogAdd = props => {
  const { dispatch, form, car, carNos } = props
  const { getFieldDecorator } = form
  const { plateList, previewVisible, previewImage } = props

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  }
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
  }

  /* 提交事件 */
  const addCarOperateLog = e => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (form.getFieldValue('plateNumber') == '') {
          Modal.info({
            title: '温馨提示',
            content: (
              '自编号不存在'
            ),
          })
          return;
        }
        const yearMonth = form.getFieldValue('yearMonth') ? form.getFieldValue('yearMonth').format('YYYYMM') : 0
        dispatch({
          type: 'carOperateLogStore/insert',
          ...values,
          yearMonth,
        })
      }
    })
  };
  /** 模糊查询 车辆自编号 */
  const handleSearch = value => {
    dispatch({
      type: 'commonStore/queryLikeCarNo',
      str: value,
    })
  };
  function queryByCarNo() {
    dispatch({
      type: 'carStore/queryByCarNo',
      carNo: form.getFieldValue('carNo'),
    })
    console.log(form.getFieldValue('carNo'))
  }

  /* 返回分页 */
  const toPage = e => {
    dispatch({
      type: 'carOperateLogStore/queryPage',
    })
  };

  // 预览图片
  const handlePreview = file => {
    console.log('handlePreview')
    dispatch({
      type: 'carOperateLogStore/lookPreview',
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  };
  // 删除图片
  const handleCancel = e => {
    console.log('handleCancel')
    dispatch({
      type: 'carOperateLogStore/unlookPreview',
    })
  };

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form onSubmit={addCarOperateLog} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="新增车辆运营数据">
                <FormItem>
                  {getFieldDecorator('carId', { initialValue: car ? car.id : 0,
                  })(
                    <Input type="hidden" />
                  )}
                </FormItem>
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
                      rules: [{ required: true, message: '请输入自编号!' }],
                    })(
                      <AutoComplete
                        dataSource={carNos}
                        onSearch={handleSearch}
                        onSelect={queryByCarNo}
                        onChange={queryByCarNo}
                        placeholder="车辆自编号"
                      />
                    )}
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
                    rules: [{ required: true, message: '请输入车牌号!' }], initialValue: car ? car.plateNumber : '',
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车辆照片&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('plateImage')(
                    <div >
                      <Upload
                        action=""
                        listType="picture-card"
                        fileList={plateList}
                        onPreview={handlePreview}
                      />
                      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                    </div>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        选择年月份&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('yearMonth', {
                    rules: [{ required: true, message: '请选择年月份!' }],
                  })(<MonthPicker format={'YYYY-MM'} />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                       车辆月度行驶里程&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('travelMileage', {
                    rules: [{ required: true, message: '请输入车辆月度行驶里程!' }],
                  })(
                    <InputNumber min={0} max={1000000} />
                  )}
                  (公里)
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车辆月度营运里程&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('operateMileage')(
                    <InputNumber min={0} max={1000000} />
                  )}
                  (公里)
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车辆月度营业收入&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('incomeAmount', {
                    rules: [{ required: true, message: '请输入月度营业收入!' }],
                  })(
                    <InputNumber min={0} max={1000000} />
                  )}
                  (元)
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车辆月度载客次数&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('passengerTimes', {
                    rules: [{ required: true, message: '请输入车辆月度载客次数!' }],
                  })(
                    <InputNumber min={0} max={100000} />
                  )}
                  (人次)
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车辆月度客运量&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('passengerCapacity')(
                    <InputNumber min={0} max={100000} />
                  )}
                  (人次)
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车辆月度耗电量&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('powerConsume')(
                    <InputNumber min={0} max={1000000} />
                  )}
                  (度)
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                  <Button key="registerButton" type="primary" htmlType="submit" size="large">保存</Button>
                  <Button key="returnLoginButton" htmlType="button" size="large" style={{ marginLeft: '30px' }} onClick={toPage}>返回</Button>
                </FormItem>
              </Card>
            </Form>
          </Col>
          <Col span={12} />
        </Row>
      </TweenOneGroup>
    </div>
  )
};

function mapStateToProps({ carStore, carOperateLogStore, commonStore }) {
  return {
    car: carStore.car,
    plateList: carStore.plateList,
    carNos: commonStore.carNos,
    previewVisible: carOperateLogStore.previewVisible,
    previewImage: carOperateLogStore.previewImage,

  }
}
CarOperateLogAdd = Form.create()(CarOperateLogAdd)
export default connect(mapStateToProps)(CarOperateLogAdd)
