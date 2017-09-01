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
import { Form, Row, Col,
  Button, Card, Upload, Modal } from 'antd'

import ZForm from 'ZForm'
import { getFields, validate, formBindType } from 'FormUtils'

import { prefix, storeName } from './constant'
import fields from './fields'

const TweenOneGroup = TweenOne.TweenOneGroup

const Info = options => {
  const { dispatch, car } = options
  const { previewVisible, previewImage, plateList, ownershipList, roadTransportList, certificateList } = options

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
      type: 'carStore/updateState',
      pageState: false,
    })
  }

  // 预览图片
  const handlePreview = file => {
    dispatch({
      type: 'carStore/updateState',
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }
  // 删除图片
  const handleCancel = () => {
    dispatch({
      type: 'carStore/updateState',
      previewVisible: false,
    })
  }


  formBindType({
    // 参数：初始值,meta(字段meta数据，例如: rows,min,max等), field字段定义对象
    /* plateImage: initialValue => {
      return {
        input: <div >
          <Upload
            action={`${BASE_URL}/fileupload/image.htm`}
            listType="picture-card"
            fileList={plateList}
            onPreview={handlePreview}
            onChange={plateChange}
          >
            { plateList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>,
        initialValue,
      }
    },
    ownershipImage: initialValue => {
      return {
        input: <div >
          <Upload
            action={`${BASE_URL}/fileupload/image.htm`}
            listType="picture-card"
            fileList={ownershipList}
            onPreview={handlePreview}
            onChange={ownershipChange}
          >
            { ownershipList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>,
        initialValue,
      }
    },
    roadTransportImage: initialValue => {
      return {
        input: <div >
          <Upload
            action={`${BASE_URL}/fileupload/image.htm`}
            listType="picture-card"
            fileList={roadTransportList}
            onPreview={handlePreview}
            onChange={roadTransportChange}
          >
            { roadTransportList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>,
        initialValue,
      }
    },
    certificateImage: initialValue => {
      return {
        input: <div >
          <Upload
            action={`${BASE_URL}/fileupload/image.htm`}
            listType="picture-card"
            fileList={certificateList}
            onPreview={handlePreview}
            onChange={certificateChange}
          >
            { certificateList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>,
        initialValue,
      }
    }, */

  })

  const formProps = {
    formType: 'update',
    fields: getFields(fields).values(),
    item: {
      ...car,
    },
    layout: {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    },
    btn: <div>
      <Button key="returnLoginButton" htmlType="button" size="large" style={{ marginLeft: '30px' }} onClick={toPage}>返回</Button>
    </div>,
  }

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Card title="编辑车辆">
              <ZForm {...formProps} style={{ maxWidth: '100%', marginTop: '10px' }} />
            </Card>
          </Col>
          <Col span={12} />
        </Row>
      </TweenOneGroup>
    </div>
  )
}

function mapStateToProps({ carStore }) {
  return {
    car: carStore.car,
    plateList: carStore.plateList,
    ownershipList: carStore.ownershipList,
    roadTransportList: carStore.roadTransportList,
    certificateList: carStore.certificateList,
    previewVisible: carStore.previewVisible,
    previewImage: carStore.previewImage,
  }
}

export default Form.create()(connect(mapStateToProps)(Info))

