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
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Switch,
    Button, Card, Radio, InputNumber, DatePicker, Alert, Upload, Modal, AutoComplete } from 'antd';

const TweenOneGroup = TweenOne.TweenOneGroup;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const Option = Select.Option;

let InsuranceAdd = (props) => {
  const { dispatch, form, businessState, trafficState, car, carNos } = props;
  const { getFieldDecorator } = form;
  const { plateList, previewVisible, previewImage, trafficInsuranceFile, trafficInsuranceList, businessInsuranceFile, businessInsuranceList } = props;

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

  /* 提交事件 */
  const addInsurance = (e) => {
    console.log(`${form.getFieldValue('trafficBoolean')}-----${form.getFieldValue('businessBoolean')}`);
    if (form.getFieldValue('trafficBoolean') || form.getFieldValue('businessBoolean')) {
      e.preventDefault();
      form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          if (form.getFieldValue('plateNumber') == '') {
            Modal.info({
              title: '温馨提示',
              content: (
                '自编号不存在'
              ),
            });
            return;
          }
          let trafficInsuranceBuyDate = null;
          let trafficInsuranceExpireDate = null;
          let businessInsuranceBuyDate = null;
          let businessInsuranceExpireDate = null;

          if (form.getFieldValue('trafficBoolean')) {
            /*
            if(trafficInsuranceFile == ''){
              Modal.info({
                title: '温馨提示',
                content: (
                  "没有上传交强险有效扫描件"
                )
              })
              return ;
            }*/
            trafficInsuranceBuyDate = form.getFieldValue('trafficInsuranceBuyDate').format('YYYY-MM-DD') ? form.getFieldValue('trafficInsuranceBuyDate').format('YYYY-MM-DD') : null;
            trafficInsuranceExpireDate = form.getFieldValue('trafficInsuranceExpireDate').format('YYYY-MM-DD') ? form.getFieldValue('trafficInsuranceBuyDate').format('YYYY-MM-DD') : null;
          }
          if (form.getFieldValue('businessBoolean')) {
          /*
            if(businessInsuranceFile == ''){
              Modal.info({
                title: '温馨提示',
                content: (
                  "没有上传商业险有效扫描件"
                )
              })
              return ;
            }*/
            businessInsuranceBuyDate = form.getFieldValue('businessInsuranceBuyDate').format('YYYY-MM-DD') ? form.getFieldValue('businessInsuranceBuyDate').format('YYYY-MM-DD') : null;
            businessInsuranceExpireDate = form.getFieldValue('businessInsuranceExpireDate').format('YYYY-MM-DD') ? form.getFieldValue('businessInsuranceExpireDate').format('YYYY-MM-DD') : null;
          }
          dispatch({
            type: 'insuranceStore/insert',
            ...values,
            trafficInsuranceBuyDate,
            trafficInsuranceExpireDate,
            businessInsuranceBuyDate,
            businessInsuranceExpireDate,
            trafficInsuranceFile,
            businessInsuranceFile,
          });
        }
      });
    } else {
      e.preventDefault();
      alert('交强险和商业险必须选择一个');
    }
  };

  /* 返回分页 */
  const toPage = (e) => {
    dispatch({
      type: 'insuranceStore/queryPage',
    });
  };

  function traffic() {
    console.log(form.getFieldValue('trafficBoolean'));
    dispatch({
      type: 'insuranceStore/traffic',
      trafficState: !form.getFieldValue('trafficBoolean'),
    });
  }
  function business() {
    dispatch({
      type: 'insuranceStore/business',
      businessState: !form.getFieldValue('businessBoolean'),
    });
    console.log(form.getFieldValue('businessBoolean'));
  }

  /** 模糊查询 车辆自编号 */
  const handleSearch = (value) => {
    dispatch({
      type: 'commonStore/queryLikeCarNo',
      str: value,
    });
  };
  function queryByCarNo(value) {
    dispatch({
      type: 'carStore/queryByCarNo',
      carNo: value,
    });
  }

  // 上传交强险图片
  const trafficInsuranceChange = ({ fileList }) => {
    dispatch({
      type: 'insuranceStore/trafficInsuranceChange',
      trafficInsuranceList: fileList,
    });
  };
  // 上传商业保险图片
  const businessInsuranceChange = ({ fileList }) => {
    dispatch({
      type: 'insuranceStore/businessInsuranceChange',
      businessInsuranceList: fileList,
    });
  };
  // 预览图片
  const handlePreview = (file) => {
    dispatch({
      type: 'insuranceStore/lookPreview',
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };
  // 删除图片
  const handleCancel = (e) => {
    console.log('handleCancel');
    dispatch({
      type: 'insuranceStore/unlookPreview',
    });
  };
  // 添加图片样式
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">点击上传文件</div>
    </div>
  );

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form onSubmit={addInsurance} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="新增车辆保险">
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
                >
                  {getFieldDecorator('plateNumber', { initialValue: car ? car.plateNumber : '',
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
                <FormItem>
                  {getFieldDecorator('carId', { initialValue: car ? car.id : 0,
                  })(
                    <Input type="hidden" />
                  )}
                </FormItem>

                <Card title="交强险" style={{ border: '2px solid 	#C0C0C0' }}>
                  <FormItem
                    {...formItemLayout}
                    label={(
                      <span>
                          是否购买交强险&nbsp;
                        </span>
                      )}
                  >
                    {getFieldDecorator('trafficBoolean', { initialValue: true })(<Switch checkedChildren="是" onChange={traffic} unCheckedChildren="否" defaultChecked />)}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={(
                      <span>
                          保险公司&nbsp;
                        </span>
                      )}
                    hasFeedback
                  >
                    {
                      trafficState ? <div>
                        {getFieldDecorator('trafficInsuranceCompany', { rules: [{ required: true, message: '请输入保险公司!', whitespace: true },{ max: 64, message: '保险公司最多长度64', whitespace: true }] }
                        )(
                          <Input />
                        )}
                      </div> : <div>
                        {getFieldDecorator('trafficInsuranceCompany')(
                          <Input disabled />
                        )}
                      </div>
                    }
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={(
                      <span>
                          保险单号&nbsp;
                        </span>
                      )}
                    hasFeedback
                  >
                    {
                      trafficState ? <div>
                        {getFieldDecorator('trafficPolicyNo', {
                          rules: [{ required: true, message: '请输入保险单号!', whitespace: true },{ max: 64, message: '保险单号最多长度64', whitespace: true }],
                        })(
                          <Input />
                        )}
                      </div> : <div>
                        {getFieldDecorator('trafficPolicyNo')(
                          <Input disabled />
                        )}
                      </div>
                    }
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={(
                      <span>
                          保险费用 &nbsp;
                        </span>
                      )}
                    hasFeedback
                  >
                    {
                      trafficState ? <div>
                        {getFieldDecorator('trafficInsuranceMoney')(
                          <InputNumber min={0} max={1000000}/>
                        )}(元)
                      </div> : <div>
                        {getFieldDecorator('trafficInsuranceMoney')(
                          <InputNumber disabled />
                        )} (元)
                      </div>
                    }
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={(
                      <span>
                          交强险有效扫描件&nbsp;
                        </span>
                      )}
                  >
                    {
                      trafficState ? <div>
                        {getFieldDecorator('trafficInsuranceFile')(
                          <div >
                            <Upload
                              action="/fileupload/image.htm"
                              listType="picture-card"
                              fileList={trafficInsuranceList}
                              onPreview={handlePreview}
                              onChange={trafficInsuranceChange}
                            >
                              { trafficInsuranceList.length >= 1 ? null : uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                              <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                          </div>
                        )}
                      </div> : <div>
                        {getFieldDecorator('trafficInsuranceFile')(
                          <div >
                            <Upload
                              action=""
                              listType="picture-card"
                              fileList={trafficInsuranceList}
                              onPreview={handlePreview}
                            />
                            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                              <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                          </div>
                        )}
                      </div>
                    }
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={(
                      <span>
                          交强险生效时间&nbsp;
                        </span>
                      )}
                    hasFeedback
                  >
                    {
                      trafficState ? <div>
                        {getFieldDecorator('trafficInsuranceBuyDate', {
                          rules: [{ required: true, message: '请选择交强险生效时间!' }],
                        })(<DatePicker />)}
                      </div> : <div>
                        {getFieldDecorator('trafficInsuranceBuyDate')(<DatePicker disabled />)}
                      </div>
                    }
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={(
                      <span>
                           交强险截止时间&nbsp;
                        </span>
                      )}
                    hasFeedback
                  >
                    {
                      trafficState ? <div>
                        {getFieldDecorator('trafficInsuranceExpireDate', {
                          rules: [{ required: true, message: '请选择交强险截止时间!' }],
                        })(<DatePicker />)}
                      </div> : <div>
                        {getFieldDecorator('trafficInsuranceExpireDate')(<DatePicker disabled />)}
                      </div>
                    }
                  </FormItem>
                </Card>

                <Card title="商业险" style={{ border: '2px solid 	#C0C0C0', margin: '20px 0px 20px 0px' }}>
                  <FormItem
                    {...formItemLayout}
                    label={(
                      <span>
                          是否购买商业险&nbsp;
                        </span>
                      )}
                  >
                    {getFieldDecorator('businessBoolean', { initialValue: true })(<Switch checkedChildren="是" unCheckedChildren="否" onChange={business} defaultChecked />)}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={(
                      <span>
                          保险公司&nbsp;
                        </span>
                      )}
                    hasFeedback
                  >
                    {
                      businessState ?
                        <div>{getFieldDecorator('businessInsuranceCompany', {
                          rules: [{ required: true, message: '请输入保险公司!' },{ max: 64, message: '保险公司最多长度64', whitespace: true }],
                        })(
                          <Input />
                        )}</div>
                        :
                        <div>{getFieldDecorator('businessInsuranceCompany')(
                          <Input disabled />
                        )}</div>
                    }
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={(
                      <span>
                          保险名称&nbsp;
                        </span>
                      )}
                    hasFeedback
                  >
                    {
                      businessState ? <div>
                        {getFieldDecorator('businessInsuranceName'
                        )(
                          <Input />
                        )}
                      </div>
                        :
                      <div>
                        {getFieldDecorator('businessInsuranceName')(
                          <Input disabled />
                        )}
                      </div>
                    }
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={(
                      <span>
                          保险单号&nbsp;
                        </span>
                      )}
                    hasFeedback
                  >
                    {
                      businessState ?
                        <div>{getFieldDecorator('businessPolicyNo', {
                          rules: [{ required: true, message: '请输入保险单号!', whitespace: true },{ max: 64, message: '保险单号最多长度64', whitespace: true }],
                        })(
                          <Input />
                        )}</div>
                        :
                        <div>{getFieldDecorator('businessPolicyNo')(
                          <Input disabled />
                        )}</div>
                    }
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={(
                      <span>
                          保险费用 &nbsp;
                        </span>
                      )}
                    hasFeedback
                  >
                    {
                      businessState ? <div>
                        {getFieldDecorator('businessInsuranceMoney')(
                          <InputNumber min={0} max={1000000}/>
                        )}(元)
                      </div> : <div>
                        {getFieldDecorator('businessInsuranceMoney')(
                          <InputNumber disabled />
                        )}(元)
                      </div>
                    }
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={(
                      <span>
                          商业险有效扫描件 &nbsp;
                        </span>
                      )}
                  >
                    {
                      businessState ? <div>
                        {getFieldDecorator('businessInsuranceFile')(
                          <div >
                            <Upload
                              action="/fileupload/image.htm"
                              listType="picture-card"
                              fileList={businessInsuranceList}
                              onPreview={handlePreview}
                              onChange={businessInsuranceChange}
                            >
                              { businessInsuranceList.length >= 1 ? null : uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                              <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                          </div>
                        )}
                      </div> : <div>
                        {getFieldDecorator('businessInsuranceFile')(
                          <div >
                            <Upload
                              action=""
                              listType="picture-card"
                              fileList={businessInsuranceList}
                              onPreview={handlePreview}
                            />
                            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                              <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                          </div>
                        )}
                      </div>
                    }
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={(
                      <span>
                          商业险生效时间 &nbsp;
                        </span>
                      )}
                    hasFeedback
                  >
                    {
                      businessState ?
                        <div>
                          {getFieldDecorator('businessInsuranceBuyDate', {
                            rules: [{ required: true, message: '请选择商业险生效时间!' }],
                          })(<DatePicker />)}
                        </div> : <div>
                          {getFieldDecorator('businessInsuranceBuyDate')(
                            <DatePicker disabled />
                        )}
                        </div>
                    }
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={(
                      <span>
                           商业险截止时间&nbsp;
                        </span>
                      )}
                    hasFeedback
                  >
                    {
                      businessState ? <div>
                        {getFieldDecorator('businessInsuranceExpireDate', {
                          rules: [{ required: true, message: '请选择商业险截止时间!' }],
                        })(<DatePicker />)}
                      </div> : <div>
                        {getFieldDecorator('businessInsuranceExpireDate')(
                          <DatePicker disabled />
                        )}
                      </div>
                    }
                  </FormItem>
                </Card>

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
  );
};
function mapStateToProps({ insuranceStore, carStore, commonStore }) {
  return {
    car: carStore.car,
    plateList: carStore.plateList,
    carNos: commonStore.carNos,
    previewVisible: insuranceStore.previewVisible,
    previewImage: insuranceStore.previewImage,
    businessState: insuranceStore.businessState,
    trafficState: insuranceStore.trafficState,
    trafficInsuranceFile: insuranceStore.trafficInsuranceFile,
    trafficInsuranceList: insuranceStore.trafficInsuranceList,
    businessInsuranceFile: insuranceStore.businessInsuranceFile,
    businessInsuranceList: insuranceStore.businessInsuranceList,

  };
}
InsuranceAdd = Form.create()(InsuranceAdd);
export default connect(mapStateToProps)(InsuranceAdd);
