/*
 * @Author: zengyufei
 * @Date: 2017-08-25 14:57:46
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-08-25 14:57:46
 */
import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Row, Col, Upload, Modal, Button, Card } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item

let Detail = options => {
  const { dispatch, complain, imgURLList, previewVisible, previewImage } = options

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

  // 预览图片
  const lookPreview = file => {
    dispatch({
      type: 'complainStore/lookPreview',
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }
  // 关闭预览图片
  const unlookPreview = e => {
    dispatch({
      type: 'complainStore/unlookPreview',
    })
  }

  /* 返回分页 */
  const toPage = e => {
    dispatch({
      type: 'complainStore/toPage',
    })
  }

  let complainTypeDesc
  switch (complain.complainType) {
    case 'complain_one':
      complainTypeDesc = '不打表营运'
      break
    case 'complain_two':
      complainTypeDesc = '不提供有效车票'
      break
    case 'complain_three':
      complainTypeDesc = '多收费'
      break
    case 'complain_four':
      complainTypeDesc = '服务态度差'
      break
    case 'complain_five':
      complainTypeDesc = '拒载'
      break
    case 'complain_six':
      complainTypeDesc = '咪表有问题'
      break
    case 'complain_seven':
      complainTypeDesc = '拼客'
      break
    case 'complain_eight':
      complainTypeDesc = '绕路'
      break
    case 'complain_nine':
      complainTypeDesc = '危险驾驶'
      break
    case 'complain_ten':
      complainTypeDesc = '误导乘客'
      break
    case 'complain_eleven':
      complainTypeDesc = '议价'
      break
    case 'complain_twelve':
      complainTypeDesc = '中途甩客'
      break
    case 'complain_thirteen':
      complainTypeDesc = '其它类'
      break
  }

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={14}>
            <Form style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="服务投诉详情">
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        从业资格证号&nbsp;
                    </span>
                  )}
                >
                  {complain.qualificationNo}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        驾驶员姓名&nbsp;
                    </span>
                  )}
                >
                  {complain.userName}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        自编号&nbsp;
                    </span>
                  )}
                >
                  {complain.carNo}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车牌号&nbsp;
                    </span>
                  )}
                >
                  {complain.plateNumber}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        来电者姓名&nbsp;
                    </span>
                  )}
                >
                  {complain.callName}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        来电者联系方式&nbsp;
                    </span>
                  )}
                >
                  {complain.callMobile}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        来电时间&nbsp;
                    </span>
                  )}
                >
                  {complain.callTime}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        发生时间&nbsp;
                    </span>
                  )}
                >
                  {complain.creditTime}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        发生经过&nbsp;
                    </span>
                  )}
                >
                  {complain.creditDesc}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        回复乘客时间&nbsp;
                    </span>
                  )}
                >
                  {complain.replyTime}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        是否有责&nbsp;
                    </span>
                  )}
                >
                  {complain.inFault ? '是' : '否'}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        处罚&nbsp;
                    </span>
                  )}
                >
                  {complain.punish ? '是' : '否'}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        处理结果&nbsp;
                    </span>
                  )}
                >
                  {complain.punishResult}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        投诉类型&nbsp;
                    </span>
                  )}
                >
                  {complainTypeDesc}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        具体地址&nbsp;
                    </span>
                  )}
                >
                  {complain.detailAddress}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        图片&nbsp;
                    </span>
                  )}
                >
                  <div>
                    <Upload
                      listType="picture-card"
                      fileList={imgURLList}
                      onPreview={lookPreview}
                    />
                    <Modal visible={previewVisible} footer={null} onCancel={unlookPreview}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        上传文件&nbsp;
                    </span>
                  )}
                >
                  {complain.fileURL ? <a type="danger" icon="download" href={BASE_URL+ '/common/download.htm?url='+ complain.fileURL} >下载</a> : '未上传'}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                  <Button key="returnLoginButton" htmlType="button" size="large" onClick={toPage}>返回</Button>
                </FormItem>
              </Card>
            </Form>
          </Col>
        </Row>
      </TweenOneGroup>
    </div>
  )
}

function mapStateToProps({ complainStore }) {
  return {
    complain: complainStore.complain,
    previewVisible: complainStore.previewVisible,
    imgURLList: complainStore.imgURLList,
    previewImage: complainStore.previewImage,
  }
}

export default Form.create()(connect(mapStateToProps)(Detail))
