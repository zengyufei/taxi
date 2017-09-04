/*
 * @Author: zengyufei 
 * @Date: 2017-09-01 14:13:29 
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-09-04 15:58:21
 */
import TweenOne from 'rc-tween-one'

import { Icon, Row, Col,
  Button, Card, Upload, Modal } from 'antd'

import ZForm from 'ZForm'
import { getFields, validate, formBindType } from 'FormUtils'

import { prefix, name, storeName } from './constant'
import fields from './fields'

const TweenOneGroup = TweenOne.TweenOneGroup

const Update = options => {
  const { form, methods } = options
  const { handlePreview, plateChange, handleCancel, ownershipChange, roadTransportChange, certificateChange, carUpdate, toPage } = methods
  const { car, previewVisible, previewImage, plateList, ownershipList, roadTransportList, certificateList, plateImage, ownershipImage, roadTransportImage, certificateImage } = options[storeName]

  // 添加图片样式
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">点击上传文件</div>
    </div>
  )

  formBindType({
    // 参数：初始值,meta(字段meta数据，例如: rows,min,max等), field字段定义对象
    plateImage: initialValue => {
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
    },

  })

  const formProps = {
    formType: 'update',
    fields: getFields(fields).values(),
    item: {
      ...car,
    },
    form,
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
    onSubmit(e) {
      carUpdate(e, plateImage, ownershipImage, roadTransportImage, certificateImage)
    },
    btn: <div>
      <Button key="registerButton" type="primary" htmlType="submit" size="large">保存编辑</Button>
      <Button key="returnLoginButton" htmlType="button" size="large" style={{ marginLeft: '30px' }} onClick={toPage}>返回</Button>
    </div>,
  }

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Card title={`编辑${name}`}>
              <ZForm {...formProps} style={{ maxWidth: '100%', marginTop: '10px' }} />
            </Card>
          </Col>
          <Col span={12} />
        </Row>
      </TweenOneGroup>
    </div>
  )
}

const mapDispatchToProps = (dispatch, { form }) => {
  return {

    /* 提交事件 */
    carUpdate(e, plateImage, ownershipImage, roadTransportImage, certificateImage) {
      e.preventDefault()
      validate(form, fields)(values => {
        dispatch({
          type: `${storeName}/update`,
          ...values,
          plateImage,
          ownershipImage,
          roadTransportImage,
          certificateImage,
        })
      })
    },

    /* 返回分页 */
    toPage() {
      dispatch({
        type: `${storeName}/updateState`,
        pageState: false,
      })
    },

    // 上传车辆车牌图片
    plateChange({ fileList }) {
      dispatch({
        type: `${storeName}/updateState`,
        plateList: fileList,
        plateImage: fileList.length >= 1 ? fileList[0].response : '',
      })
    },
    // 上传车辆产权证图片
    ownershipChange({ fileList }) {
      dispatch({
        type: `${storeName}/updateState`,
        ownershipList: fileList,
        ownershipImage: fileList.length >= 1 ? fileList[0].response : '',
      })
    },
    // 上传车辆道路运输证 图片
    roadTransportChange({ fileList }) {
      dispatch({
        type: `${storeName}/updateState`,
        roadTransportList: fileList,
        roadTransportImage: fileList.length >= 1 ? fileList[0].response : '',
      })
    },
    // 上传车辆机动车登记证书图片
    certificateChange({ fileList }) {
      dispatch({
        type: `${storeName}/updateState`,
        certificateList: fileList,
        certificateImage: fileList.length >= 1 ? fileList[0].response : '',
      })
    },

    // 预览图片
    handlePreview(file) {
      dispatch({
        type: `${storeName}/updateState`,
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      })
    },
    // 删除图片
    handleCancel() {
      dispatch({
        type: `${storeName}/updateState`,
        previewVisible: false,
      })
    },

  }
}

export default PageUtils.extend({ prefix, mapDispatchToProps })(Update)
