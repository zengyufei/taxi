/*
 * @Author: zengyufei 
 * @Date: 2017-09-04 09:01:49 
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-09-04 14:14:18
 */
import TweenOne from 'rc-tween-one'
import { Row, Col, Button, Card, Upload, Modal } from 'antd'

import ZForm from 'ZForm'
import { getFields, formBindType } from 'FormUtils'

import { prefix, storeName } from './constant'
import fields from './fields'

const TweenOneGroup = TweenOne.TweenOneGroup

const Info = options => {
  const { form, dispatch } = options
  const { car, plateList, ownershipList, roadTransportList, certificateList, previewVisible, previewImage } = options[storeName]

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
    plateImage: initialValue => {
      return {
        input: <div >
          <Upload
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
    ownershipImage: initialValue => {
      return {
        input: <div >
          <Upload
            listType="picture-card"
            fileList={ownershipList}
            onPreview={handlePreview}
          />
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
            listType="picture-card"
            fileList={roadTransportList}
            onPreview={handlePreview}
          />
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
            listType="picture-card"
            fileList={certificateList}
            onPreview={handlePreview}
          />
          <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>,
        initialValue,
      }
    },

  })

  const formProps = {
    form,
    formType: false,
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

function mapStateToProps(state) {
  return {
    [storeName]: state[storeName],
  }
}

export default PageUtils.extend({ prefix, mapStateToProps })(Info)

