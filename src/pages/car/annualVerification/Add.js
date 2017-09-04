/*
 * @Author: zengyufei 
 * @Date: 2017-08-28 17:56:24 
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-09-04 15:20:29
 */
import TweenOne from 'rc-tween-one'
import { Icon, Row, Col, Button, Card, Upload, Modal, AutoComplete } from 'antd'

import ZForm from 'ZForm'
import { getFields, validate, formBindType } from 'FormUtils'

import { prefix, name, storeName, uploadAction } from './constant'
import fields from './fields'

const TweenOneGroup = TweenOne.TweenOneGroup

const Add = options => {
  const { methods, form } = options
  const { car, plateList } = options.carStore
  const { carNos } = options.driverCommonStore

  const { previewVisible, previewImage, synthesizeFileList, synthesizeFile, taximeterFileList, taximeterFile, drivingLicenseFileList, drivingLicenseFile } = options[storeName]

  const { handlerInsert, handleSearch, queryByCarNo, toPage, synthesizeFileChange, drivingLicenseFileChange, taximeterFileChange, handlePreview, handleCancel } = methods

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
            action=""
            listType="picture-card"
            fileList={plateList}
            onPreview={handlePreview}
          />
          <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>,
        initialValue,
      }
    },
    synthesizeFile: initialValue => {
      return {
        input: <div >
          <Upload
            action={uploadAction}
            listType="picture-card"
            fileList={synthesizeFileList}
            onPreview={handlePreview}
            onChange={synthesizeFileChange}
          >
            { synthesizeFileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>,
        initialValue,
      }
    },
    drivingLicenseFile: initialValue => {
      return {
        input: <div >
          <Upload
            action={uploadAction}
            listType="picture-card"
            fileList={drivingLicenseFileList}
            onPreview={handlePreview}
            onChange={drivingLicenseFileChange}
          >
            { drivingLicenseFileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>,
        initialValue,
      }
    },
    taximeterFile: initialValue => {
      return {
        input: <div >
          <Upload
            action={uploadAction}
            listType="picture-card"
            fileList={taximeterFileList}
            onPreview={handlePreview}
            onChange={taximeterFileChange}
          >
            { taximeterFileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>,
        initialValue,
      }
    },
    carNo: () => {
      return {
        input: <Row>
          <Col span={12}>
            <AutoComplete
              onChange={e => form.setFieldsValue({ carNo: e })}
              dataSource={carNos}
              onSearch={handleSearch}
              placeholder="车辆自编号"
            />
          </Col>
          <Col span={12}>
            <Button style={{ marginLeft: '30px' }} onClick={queryByCarNo}>查询</Button>
          </Col>
        </Row>,
      }
    },

  })

  const formProps = {
    formType: 'add',
    fields: getFields(fields).values(),
    item: {
      plateNumber: car ? car.plateNumber : '',
      carId: car ? car.id : '',
    },
    form,
    layout: {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
      },
    },
    onSubmit(e) {
      handlerInsert(e, synthesizeFile, drivingLicenseFile, taximeterFile)
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
            <Card title="新增车辆年审">
              <ZForm {...formProps} style={{ maxWidth: '100%', marginTop: '10px' }} />
            </Card>
          </Col>
        </Row>
      </TweenOneGroup>
    </div>
  )
}

function mapStateToProps({ carStore, annualVerificationStore, driverCommonStore }) {
  return {
    carStore,
    driverCommonStore,
    annualVerificationStore,
  }
}

const mapDispatchToProps = (dispatch, { form }) => {
  return {

    /* 提交事件 */
    handlerInsert(e, synthesizeFile, drivingLicenseFile, taximeterFile) {
      e.preventDefault()
      validate(form, fields)(values => {
        dispatch({
          type: `${storeName}/insert`,
          ...values,
          synthesizeFile,
          drivingLicenseFile,
          taximeterFile,
        })
      })
    },
    /** 模糊查询 车辆自编号 */
    handleSearch(value) {
      dispatch({
        type: 'driverCommonStore/queryLikeCarNo',
        str: value,
      })
    },
    queryByCarNo() {
      dispatch({
        type: 'carStore/queryByCarNo',
        carNo: form.getFieldValue('carNo'),
      })
    },

    /* 返回分页 */
    toPage() {
      dispatch({
        type: 'annualVerificationStore/queryPage',
      })
    },

    // 上传营运证年审有效扫描件
    synthesizeFileChange({ fileList }) {
      dispatch({
        type: 'annualVerificationStore/synthesizeFileChange',
        synthesizeFileList: fileList,
      })
    },
    // 上传行驶证有效扫描件
    drivingLicenseFileChange({ fileList }) {
      dispatch({
        type: 'annualVerificationStore/drivingLicenseFileChange',
        drivingLicenseFileList: fileList,
      })
    },
    // 上传计价器年审有效期截止时间扫描件
    taximeterFileChange({ fileList }) {
      dispatch({
        type: 'annualVerificationStore/taximeterFileChange',
        taximeterFileList: fileList,
      })
    },
    // 预览图片
    handlePreview(file) {
      dispatch({
        type: 'annualVerificationStore/lookPreview',
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      })
    },
    // 删除图片
    handleCancel() {
      dispatch({
        type: 'annualVerificationStore/unlookPreview',
      })
    },

  }
}

export default PageUtils.extend({ prefix, mapStateToProps, mapDispatchToProps })(Add)
