/*
 * @Author: zengyufei
 * @Date: 2017-08-25 14:07:02
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-08-25 14:07:02
 */
import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Input, Icon, Row, Col,
  Button, Card, DatePicker, Upload, Modal, AutoComplete } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item

let Add = options => {
  const { dispatch, form, car, carNos } = options
  const { plateList, previewVisible, previewImage, maintainList, maintainImage } = options
  const { getFieldDecorator } = form

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
  const addMaintain = e => {
    e.preventDefault()

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (form.getFieldValue('plateNumber') === '') {
          Modal.info({
            title: '温馨提示',
            content: (
              '自编号不存在'
            ),
          })
          return
        }
        /*
        if(maintainImage === ''){
          Modal.info({
            title: '温馨提示',
            content: (
              "没有上传二级维护单据的扫描件 "
            )
          })
          return ;
        } */
        const planFinishDate = form.getFieldValue('planFinishDate') ? form.getFieldValue('planFinishDate').format('YYYY-MM-DD') : null
        const planRealityDate = form.getFieldValue('planRealityDate') ? form.getFieldValue('planRealityDate').format('YYYY-MM-DD') : null
        dispatch({
          type: 'maintainStore/insert',
          ...values,
          planFinishDate,
          planRealityDate,
          maintainImage,

        })
      }
    })
  }

  let carno = form.getFieldValue('carNo');
  /** 模糊查询 车辆自编号 */
  const handleSearch = value => {
    carno = value;
    dispatch({
      type: 'driverCommonStore/queryLikeCarNo',
      str: value,
    })
  }
  const queryByCarNo = () => {
    dispatch({
      type: 'carStore/queryByCarNo',
      carNo: form.getFieldValue('carNo'),
    })
  }

  /* 返回分页 */
  const toPage = () => {
    dispatch({
      type: 'maintainStore/toPage',
    })
  }

  // 上传图片
  const maintainChange = ({ fileList }) => {
    dispatch({
      type: 'maintainStore/maintainChange',
      maintainList: fileList,
    })
  }
  // 预览图片
  const handlePreview = file => {
    console.log('handlePreview')
    dispatch({
      type: 'maintainStore/lookPreview',
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }
  // 删除图片
  const handleCancel = e => {
    console.log('handleCancel')
    dispatch({
      type: 'maintainStore/unlookPreview',
    })
  }
  // 添加图片样式
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">点击上传文件</div>
    </div>
  )

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form onSubmit={addMaintain} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="新增二级维修">
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
                >
                  {getFieldDecorator('plateNumber', { initialValue: car && car.carNo === carno ? car.plateNumber : '',
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
                        二级维护计划完成日期&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('planFinishDate', {
                    rules: [{ required: true, message: '请选择二级维护计划完成日期!' }],
                  })(<DatePicker />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        二级维护实际完成日期&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('planRealityDate')(<DatePicker />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        二级维护单据的扫描件&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('maintainImage')(
                    <div >
                      <Upload
                        action={`${BASE_URL}/fileupload/image.htm`}
                        listType="picture-card"
                        fileList={maintainList}
                        onPreview={handlePreview}
                        onChange={maintainChange}
                      >
                        { maintainList.length >= 1 ? null : uploadButton}
                      </Upload>
                      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                    </div>
                  )}
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
}

function mapStateToProps({ carStore, maintainStore, driverCommonStore }) {
  return {
    car: carStore.car,
    plateList: carStore.plateList,
    carNos: driverCommonStore.carNos,
    previewVisible: maintainStore.previewVisible,
    previewImage: maintainStore.previewImage,
    maintainList: maintainStore.maintainList,
    maintainImage: maintainStore.maintainImage,

  }
}
export default Form.create()(connect(mapStateToProps)(Add))
