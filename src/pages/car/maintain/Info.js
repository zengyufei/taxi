/*
 * @Author: zengyufei 
 * @Date: 2017-08-25 14:07:29 
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-08-25 14:08:06
 */

import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Row, Col,
  Button, Card, Upload, Modal } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item

let Info = options => {
  const { dispatch, maintain } = options
  const { plateList, previewVisible, previewImage, maintainList } = options

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


  /* 返回分页 */
  const toPage = () => {
    dispatch({
      type: 'maintainStore/toPage',
    })
  };


  // 预览图片
  const handlePreview = file => {
    console.log('handlePreview')
    console.log(file)
    dispatch({
      type: 'maintainStore/lookPreview',
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  };
  // 删除图片
  const handleCancel = e => {
    console.log('handleCancel')
    dispatch({
      type: 'maintainStore/unlookPreview',
    })
  };

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="二级维修详情">
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        自编号&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {maintain.carNo}
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
                  {maintain.plateNumber}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车辆照片&nbsp;
                    </span>
                  )}
                >
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
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        二级维护计划完成日期&nbsp;
                    </span>
                  )}
                >
                  {maintain.planFinishDate}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        二级维护实际完成日期&nbsp;
                    </span>
                  )}
                >
                  {maintain.planRealityDate}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        二级维护单据的扫描件&nbsp;
                    </span>
                  )}
                >
                  <div >
                    <Upload
                      action=""
                      listType="picture-card"
                      fileList={maintainList}
                      onPreview={handlePreview}
                    />
                    <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>
                </FormItem>

                <FormItem {...tailFormItemLayout}>
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

function mapStateToProps({ maintainStore }) {
  return {
    maintain: maintainStore.maintain,
    plateList: maintainStore.plateList,
    previewVisible: maintainStore.previewVisible,
    previewImage: maintainStore.previewImage,
    maintainList: maintainStore.maintainList,
  }
}

export default Form.create()(connect(mapStateToProps)(Info))

