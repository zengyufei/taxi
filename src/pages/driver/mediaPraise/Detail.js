/*
 * @Author: zengyufei
 * @Date: 2017-08-25 15:07:45
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-08-25 15:07:45
 */
import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Row, Col, Upload, Modal, Button, Card } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item

let Detail = options => {
  const { dispatch, mediaPraise, imgURLList, previewVisible, previewImage } = options

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
      type: 'mediaPraiseStore/lookPreview',
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }
  // 关闭预览图片
  const unlookPreview = e => {
    dispatch({
      type: 'mediaPraiseStore/unlookPreview',
    })
  }

  /* 返回分页 */
  const toPage = e => {
    dispatch({
      type: 'mediaPraiseStore/toPage',
    })
  }

  let praiseGradeDesc
  switch (mediaPraise.praiseGrade) {
    case 'COUNTRY':
      praiseGradeDesc = '国家级'
      break
    case 'PROVINCE':
      praiseGradeDesc = '省级'
      break
    case 'CITY':
      praiseGradeDesc = '市级'
      break
    case 'DISTRICT':
      praiseGradeDesc = '区级'
      break
  }

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={14}>
            <Form style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="媒体报道详情">
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        从业资格证号&nbsp;
                    </span>
                  )}
                >
                  {mediaPraise.qualificationNo}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        驾驶员姓名&nbsp;
                    </span>
                  )}
                >
                  {mediaPraise.userName}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        自编号&nbsp;
                    </span>
                  )}
                >
                  {mediaPraise.carNo}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车牌号&nbsp;
                    </span>
                  )}
                >
                  {mediaPraise.plateNumber}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        表彰的报道名称&nbsp;
                    </span>
                  )}
                >
                  {mediaPraise.praiseFileName}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        媒体协会&nbsp;
                    </span>
                  )}
                >
                  {mediaPraise.mediaOrg}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        表彰时间&nbsp;
                    </span>
                  )}
                >
                  {mediaPraise.creditDate}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        等级&nbsp;
                    </span>
                  )}
                >
                  {praiseGradeDesc}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        网址链接&nbsp;
                    </span>
                  )}
                >
                  {mediaPraise.newsUrl}
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
                  {mediaPraise.fileURL ? <a type="danger" icon="download" href={BASE_URL+ '/common/download.htm?url='+ mediaPraise.fileURL} >下载</a> : '未上传'}
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

function mapStateToProps({ mediaPraiseStore }) {
  return {
    mediaPraise: mediaPraiseStore.mediaPraise,
    previewVisible: mediaPraiseStore.previewVisible,
    imgURLList: mediaPraiseStore.imgURLList,
    previewImage: mediaPraiseStore.previewImage,
  }
}

export default Form.create()(connect(mapStateToProps)(Detail))
