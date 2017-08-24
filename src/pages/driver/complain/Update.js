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
import { Form, Input, Icon, Row, Col, Button, Card, message, Upload, Modal, DatePicker, Radio } from 'antd';
import moment from 'moment';

const TweenOneGroup = TweenOne.TweenOneGroup;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TOKEN_KEY } = constant;

let Update = (props) => {
  const { dispatch, form, complain, startValue, endValue, imgURLList,imgURLImage,previewVisible,previewImage } = props;
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

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">添加</div>
    </div>
  );
  /* 上传图片*/
  const imgChange = ({ fileList }) => {
    dispatch({
      type: 'complainStore/imgChange',
      imgURLList: fileList,
    });
  };
  // 预览图片
  const lookPreview = (file) => {
    dispatch({
      type: 'complainStore/lookPreview',
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };
  // 关闭预览图片
  const unlookPreview = (e) => {
    dispatch({
      type: 'complainStore/unlookPreview',
    });
  };

  /**
   * 上传文件
   * @type {{name: string, action: string, headers: {authorization: string}, onChange: ((info))}}
   */
  const token = session.get(TOKEN_KEY);
  let fileURL;
  const importCar = {
    name: 'file',
    action: `/fileupload/docs.htm?token=${token}`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log('uploading');
      }
      if (info.file.status === 'done') {
        fileURL = info.file.response;
      } else if (info.file.status === 'error') {
        console.log('error');
      }
    },
  };

  /* 提交事件 */
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'complainStore/update',
          ...values,
          callTime: form.getFieldValue('callTime') != undefined ? form.getFieldValue('callTime').format('YYYY-MM-DD HH:mm:ss') : undefined,
          creditTime: form.getFieldValue('creditTime') != undefined ? form.getFieldValue('creditTime').format('YYYY-MM-DD HH:mm:ss') : undefined,
          replyTime: form.getFieldValue('replyTime') != undefined ? form.getFieldValue('replyTime').format('YYYY-MM-DD HH:mm:ss') : undefined,
          imgURL: imgURLImage,
          fileURL: fileURL,
        });
      }
    });
  };

  /* 返回分页 */
  const toPage = (e) => {
    dispatch({
      type: 'complainStore/toPage',
    });
  };

  // 自定义日期范围
  const disabledStartDate = (startValue) => {
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };
  const disabledEndDate = (endValue) => {
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };
  const onStartChange = (value) => {
    dispatch({
      type: 'driverCommonStore/onStartChange',
      startValue: value,
    });
  };
  const onEndChange = (value) => {
    dispatch({
      type: 'driverCommonStore/onEndChange',
      endValue: value,
    });
  };

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={14}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="修改服务投诉">
                {getFieldDecorator('id', { initialValue: complain.id })(<Input type="hidden" />)}
                {getFieldDecorator('creditLogNo', { initialValue: complain.creditLogNo })(<Input type="hidden" />)}
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        从业资格证号&nbsp;
                      </span>
                    )}
                  hasFeedback
                >
                  {getFieldDecorator('qualificationNo', {
                    initialValue: complain.qualificationNo,
                  })(
                    <Input disabled />
                  )}
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
                    initialValue: complain.userName,
                  })(
                    <Input disabled />
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
                  {getFieldDecorator('carNo', {
                    initialValue: complain.carNo,
                  })(
                    <Input disabled />
                  )}
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
                    initialValue: complain.plateNumber,
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        来电者姓名&nbsp;
                      </span>
                    )}
                  hasFeedback
                >
                  {getFieldDecorator('callName', {
                    rules: [{ required: true, whitespace: true, message: '请输入来电者姓名!' }],
                    initialValue: complain.callName,
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        来电者联系方式&nbsp;
                      </span>
                    )}
                  hasFeedback
                >
                  {getFieldDecorator('callMobile', {
                    rules: [{ required: true, whitespace: true, message: '请输入来电者联系方式!' }, { pattern: /^1[34578]\d{9}$/, message: '手机格式错误!' }],
                    initialValue: complain.callMobile,
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        发生时间&nbsp;
                      </span>
                    )}
                  hasFeedback
                >
                  {getFieldDecorator('creditTime', {
                    rules: [{ required: true, message: '请输入发生时间!' }],
                    initialValue: moment(complain.creditTime),
                  })(
                    <DatePicker
                      showTime
                      style={{ width: 200 }}
                      format="YYYY-MM-DD HH:mm:ss"
                      onChange={onStartChange}
                      disabledDate={disabledStartDate}
                    />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        来电时间&nbsp;
                      </span>
                    )}
                  hasFeedback
                >
                  {getFieldDecorator('callTime', {
                    initialValue: moment(complain.callTime),
                  })(
                    <DatePicker
                      showTime
                      style={{ width: 200 }}
                      format="YYYY-MM-DD HH:mm:ss"
                      onChange={onEndChange}
                      disabledDate={disabledEndDate}
                    />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        发生经过&nbsp;
                      </span>
                    )}
                  hasFeedback
                >
                  {getFieldDecorator('creditDesc', {
                    rules: [{ required: true, whitespace: true, message: '请输入发生经过!' }],
                    initialValue: complain.creditDesc,
                  })(
                    <Input type="textarea" rows={4} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        回复乘客时间&nbsp;
                      </span>
                    )}
                  hasFeedback
                >
                  {getFieldDecorator('replyTime', { initialValue: moment(complain.replyTime) })(
                    <DatePicker />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        是否有责&nbsp;
                      </span>
                    )}
                  hasFeedback
                >
                  {getFieldDecorator('inFault', { initialValue: complain.inFault })(
                    <RadioGroup>
                      <Radio value={true}>是</Radio>
                      <Radio value={false}>否</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        考核&nbsp;
                      </span>
                    )}
                  hasFeedback
                >
                  {getFieldDecorator('punish', { initialValue: complain.punish })(
                    <RadioGroup>
                      <Radio value={true}>是</Radio>
                      <Radio value={false}>否</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        处理结果&nbsp;
                      </span>
                    )}
                  hasFeedback
                >
                  {getFieldDecorator('punishResult', {
                    initialValue: complain.punishResult,
                  })(
                    <Input type="textarea" rows={4} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        投诉类型&nbsp;
                      </span>
                    )}
                  hasFeedback
                >
                  {getFieldDecorator('complainType', {
                    rules: [{ required: true, message: '请选择投诉类型!' }],
                    initialValue: complain.complainType,
                  })(
                    <RadioGroup>
                      <Radio value={'complain_one'}>不打表营运</Radio>
                      <Radio value={'complain_two'}>不提供有效车票</Radio>
                      <Radio value={'complain_three'}>多收费</Radio>
                      <Radio value={'complain_four'}>服务态度差</Radio>
                      <Radio value={'complain_five'}>拒载</Radio>
                      <Radio value={'complain_six'}>咪表有问题</Radio>
                      <Radio value={'complain_seven'}>拼客</Radio>
                      <Radio value={'complain_eight'}>绕路</Radio>
                      <Radio value={'complain_nine'}>危险驾驶</Radio>
                      <Radio value={'complain_ten'}>误导乘客</Radio>
                      <Radio value={'complain_eleven'}>议价</Radio>
                      <Radio value={'complain_twelve'}>中途甩客</Radio>
                      <Radio value={'complain_thirteen'}>其它类</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        具体地址&nbsp;
                      </span>
                    )}
                  hasFeedback
                >
                  {getFieldDecorator('detailAddress', {
                    initialValue: complain.detailAddress,
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        备注&nbsp;
                    </span>
                    )}
                  hasFeedback
                >
                  {getFieldDecorator('bz',{initialValue: complain.bz})(<Input type="textarea" rows={4}/>)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        图片&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('imgURL', {})(
                    <div>
                      <Upload
                        action="/fileupload/image.htm"
                        listType="picture-card"
                        fileList={imgURLList}
                        onPreview={lookPreview}
                        onChange={imgChange}
                      >
                        {imgURLList.length >= 1 ? null : uploadButton}
                      </Upload>
                      <Modal visible={previewVisible} footer={null} onCancel={unlookPreview}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                    </div>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        文件上传&nbsp;
                      </span>
                    )}
                >
                  {getFieldDecorator('fileURL', {})(
                    <div>
                      <Upload {...importCar}>
                        <Button>
                          <Icon type="upload" />上传
                        </Button>
                      </Upload>
                    </div>
                  )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                  <ZButton permission="driver:complain:update">
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

function mapStateToProps({ complainStore, driverCommonStore }) {
  return {
    complain: complainStore.complain,
    startValue: driverCommonStore.startValue,
    endValue: driverCommonStore.endValue,
    previewVisible: complainStore.previewVisible,
    imgURLList: complainStore.imgURLList,
    previewImage: complainStore.previewImage,
    imgURLImage: complainStore.imgURLImage,
  };
}

Update = Form.create()(Update);
export default connect(mapStateToProps)(Update);
