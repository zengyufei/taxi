/*
 * @Author: zengyufei 
 * @Date: 2017-08-25 14:59:28 
 * @Last Modified by: zengyufei 
 * @Last Modified time: 2017-08-25 14:59:28 
 */
import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Row, Col, Button, Card } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item

let Detail = options => {
  const { dispatch, driver } = options

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

  let jobDesc,
    educationDesc,
    marriageDesc,
    politicsDesc
  switch (driver.job) {
    case 'MASTER_CLASS':
      jobDesc = '主班'
      break
    case 'DEPUTY_CLASS':
      jobDesc = '主班'
      break
    case 'FLEXIBLE_CLASS':
      jobDesc = '机动班'
      break
  }
  switch (driver.education) {
    case 'PRIMARY_SCHOOL':
      educationDesc = '小学'
      break
    case 'MIDDLE_SCHOOL':
      educationDesc = '初中'
      break
    case 'HIGH_SCHOOL':
      educationDesc = '高中'
      break
    case 'JUNIOR_COLLEGE':
      educationDesc = '大专'
      break
    case 'UNDERGRADUATE':
      educationDesc = '本科'
      break
  }
  switch (driver.marriage) {
    case 'UNMARRIED':
      marriageDesc = '未婚'
      break
    case 'MARRIED':
      marriageDesc = '已婚'
      break
    case 'DIVORCE':
      marriageDesc = '离婚'
      break
    case 'WIDOWED':
      marriageDesc = '丧偶'
      break
  }
  switch (driver.politics) {
    case 'MASSES':
      politicsDesc = '群众'
      break
    case 'LEAGUE':
      politicsDesc = '团员'
      break
    case 'PARTY':
      politicsDesc = '党员'
      break
  }

  /* 返回分页 */
  const toPage = e => {
    dispatch({
      type: 'driverStore/toPage',
    })
  }

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="驾驶员详情">
                <FormItem {...formItemLayout} label={(<span>自编号&nbsp;</span>)}>
                  {driver.carNo}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>车牌号&nbsp;</span>)}>
                  {driver.plateNumber}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>驾驶员姓名&nbsp;</span>)}>
                  {driver.userName}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>性别&nbsp;</span>)}>
                  {driver.sex === 'male' ? '男' : '女'}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>状态&nbsp;</span>)}>
                  {driver.driverStatus === 'WORKING' ? '在职' : '离职'}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>岗位&nbsp;</span>)}>
                  {jobDesc}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>从业资格证号&nbsp;</span>)}>
                  {driver.qualificationNo}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>联系电话&nbsp;</span>)}>
                  {driver.mobile.split(',')[0]}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>备用联系电话&nbsp;</span>)}>
                  {driver.mobile.split(',')[1]}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>身份证号&nbsp;</span>)}>
                  {driver.identity}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>身高&nbsp;</span>)}>
                  {driver.height} cm
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>体重&nbsp;</span>)}>
                  {driver.weight} kg
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>血压&nbsp;</span>)}>
                  {driver.maxBloodPressure}/{driver.minBloodPressure}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>血型&nbsp;</span>)}>
                  {driver.bloodType}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>户籍&nbsp;</span>)}>
                  {driver.censusDesc}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>籍贯&nbsp;</span>)}>
                  {driver.nativeDesc}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>身份证地址&nbsp;</span>)}>
                  {driver.identityAddress}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>现居住地址&nbsp;</span>)}>
                  {driver.presentAddress}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>学历&nbsp;</span>)}>
                  {educationDesc}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>婚姻状况&nbsp;</span>)}>
                  {marriageDesc}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>政治面貌&nbsp;</span>)}>
                  {politicsDesc}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>购买意外险&nbsp;</span>)}>
                  {driver.insurance === true ? '有' : '无'}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>保险公司&nbsp;</span>)}>
                  {driver.insuranceCompany}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>意外险单号&nbsp;</span>)}>
                  {driver.policyNo}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>意外险有效时间&nbsp;</span>)}>
                  {driver.accidentInsuranceBeginDate} 至 {driver.accidentInsuranceEndDate}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>驾驶证号&nbsp;</span>)}>
                  {driver.licenseNumber}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>驾驶证档案号&nbsp;</span>)}>
                  {driver.licenseDocNumber}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span> 准驾车型&nbsp;</span>)}>
                  {driver.carModel}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>初次领证日期&nbsp;</span>)}>
                  {driver.licenseDate}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>驾驶证起止日期&nbsp;</span>)}>
                  {driver.licenseStartDate} 至 {driver.licenseEndDate}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>入职日期&nbsp;</span>)}>
                  {driver.entryDate}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>离职时间&nbsp;</span>)}>
                  {driver.leaveDate}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>劳动合同起止时间&nbsp;</span>)}>
                  {driver.labourContractBeginDate} 至 {driver.labourContractEndDate}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>经营合同起止时间&nbsp;</span>)}>
                  {driver.manageContractBeginDate} 至 {driver.manageContractEndDate}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>紧急联系人姓名&nbsp;</span>)}>
                  {driver.emergencyContact}
                </FormItem>
                <FormItem {...formItemLayout} label={(<span>紧急联系人手机号码&nbsp;</span>)}>
                  {driver.emergencyMobile}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <Button
                    key="returnLoginButton"
                    htmlType="button"
                    size="large"
                    style={{ marginLeft: '30px' }}
                    onClick={toPage}
                  >返回</Button>
                </FormItem>
              </Card>
            </Form>
          </Col>
        </Row>
      </TweenOneGroup>
    </div>
  )
}

function mapStateToProps({ driverStore }) {
  return {
    driver: driverStore.driver,
  }
}

export default Form.create()(connect(mapStateToProps)(Detail))
