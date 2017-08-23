import { connect } from 'dva';
import { Form, Input, Select, Button, Icon, Popconfirm, Alert, Table, message } from 'antd';
import styles from './Page.css';
import Update from './Update.jsx';
import Detail from './Detail.jsx';
import moment from 'moment';

const Option = Select.Option;
const FormItem = Form.Item;

let Index = (option) => {
  const { page, dispatch, form, res, register } = option;
  const { getFieldDecorator } = form;

  /* 详情 */
  function toDetail(commonPraise) {
    dispatch({
      type: 'driverStore/toEdit',
      res: 'detail',
      driver: commonPraise,
    });
  }
  /* 编辑 */
  function toEdit(commonPraise) {
    dispatch({
      type: 'driverStore/toEdit',
      res: 'update',
      driver: commonPraise,
    });
  }

  /**
   * 条件查询
   */
  const query = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      dispatch({
        type: 'driverStore/queryPage',
        ...values,
      });
    });
  };
  /** 即将到期和已到期 */
  const accidentring = () => {
    dispatch({
      type: 'driverStore/queryPage',
      insurance: '1',
      accidentInsuranceEndDate: moment().add(1,'M').format('YYYY-MM-DD'),
    });
  }
  const accident = () => {
    dispatch({
      type: 'driverStore/queryPage',
      insurance: '1',
      accidentInsuranceEndDate: moment().format('YYYY-MM-DD'),
    });
  }
  const licensering = () => {
    dispatch({
      type: 'driverStore/queryPage',
      licenseEndDate: moment().add(1,'M').format('YYYY-MM-DD'),
    });
  }
  const license = () => {
    dispatch({
      type: 'driverStore/queryPage',
      licenseEndDate: moment().format('YYYY-MM-DD'),
    });
  }
  const labourring = () => {
    dispatch({
      type: 'driverStore/queryPage',
      labourContractEndDate: moment().add(1,'M').format('YYYY-MM-DD'),
    });
  }
  const labour = () => {
    dispatch({
      type: 'driverStore/queryPage',
      labourContractEndDate: moment().format('YYYY-MM-DD'),
    });
  }
  const managering = () => {
    dispatch({
      type: 'driverStore/queryPage',
      manageContractEndDate: moment().add(1,'M').format('YYYY-MM-DD'),
    });
  }
  const manage = () => {
    dispatch({
      type: 'driverStore/queryPage',
      manageContractEndDate: moment().format('YYYY-MM-DD'),
    });
  }

  let a;
  if (res == 'update') {
    a = <Update key="update" />;
  } else if (res == 'detail') {
    a = <Detail key="detail" />;
  }

  const columns = [{
    title: '自编号',
    dataIndex: 'carNo',
    key: 'carNo',
  }, {
    title: '车牌号',
    dataIndex: 'plateNumber',
    key: 'plateNumber',
  }, {
    title: '姓名',
    dataIndex: 'userName',
    key: 'userName',
  }, {
    title: '资格证',
    dataIndex: 'qualificationNo',
    key: 'qualificationNo',
  }, {
    title: '岗位',
    dataIndex: 'job',
    key: 'job',
    render: (text) => {
      if (text == 'MASTER_CLASS') {
        return '主班';
      } else if (text == 'DEPUTY_CLASS') {
        return '副班';
      } else {
        return '机动班';
      }
    },
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <span>
        <ZButton permission="driver:driver:query">
          <Button type="primary" onClick={() => toDetail(record)}>详情</Button>&nbsp;
        </ZButton>
        <ZButton permission="driver:archives:update">
          <Button type="primary" onClick={() => toEdit(record)}>编辑</Button>&nbsp;
        </ZButton>
      </span>
    ),
  }];

  return (
    <div>
      {
        register ? a
          :
        <div>
          <div>
            <Button type="primary" icon="clock-circle-o" onClick={accidentring}>保险即将到期</Button>&nbsp;
            <Button type="primary" icon="close-circle-o" onClick={accident}>保险已到期</Button>&nbsp;
            <Button type="primary" icon="clock-circle-o" onClick={licensering}>驾驶证即将到期</Button>&nbsp;
            <Button type="primary" icon="close-circle-o" onClick={license}>驾驶证已到期</Button>&nbsp;
            <Button type="primary" icon="clock-circle-o" onClick={labourring}>劳动合同即将到期</Button>&nbsp;
            <Button type="primary" icon="close-circle-o" onClick={labour}>劳动合同已到期</Button>&nbsp;
            <Button type="primary" icon="clock-circle-o" onClick={managering}>经营合同即将到期</Button>&nbsp;
            <Button type="primary" icon="close-circle-o" onClick={manage}>经营合同已到期</Button>&nbsp;
          </div>
          <div className={styles.query}>
            <Form layout="inline" onSubmit={query}>
              <FormItem label={(<span>自编号&nbsp;</span>)}>
                {getFieldDecorator('carNo')(<Input />)}
              </FormItem>
              <FormItem label={(<span>车牌号&nbsp;</span>)}>
                {getFieldDecorator('plateNumber')(<Input />)}
              </FormItem>
              <FormItem label={(<span>姓名&nbsp;</span>)}>
                {getFieldDecorator('userName')(<Input />)}
              </FormItem>
              <FormItem label={(<span>资格证&nbsp;</span>)}>
                {getFieldDecorator('qualificationNo')(<Input />)}
              </FormItem>
              <FormItem label={(<span>身份证&nbsp;</span>)}>
                {getFieldDecorator('identity')(<Input />)}
              </FormItem>
              <FormItem label={(<span>岗位&nbsp;</span>)}>
                {getFieldDecorator('job')(
                  <Select style={{ width: 80 }}>
                    <Option value="">请选择</Option>
                    <Option value="MASTER_CLASS">主班</Option>
                    <Option value="DEPUTY_CLASS">副班</Option>
                    <Option value="FLEXIBLE_CLASS">机动班</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem label={(<span>状态&nbsp;</span>)}>
                {getFieldDecorator('driverStatus')(
                  <Select style={{ width: 80 }}>
                    <Option value="">请选择</Option>
                    <Option value="WORKING">在职</Option>
                    <Option value="DIMISSION">离职</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem label={(<span>性别&nbsp;</span>)}>
                {getFieldDecorator('sex')(
                  <Select style={{ width: 80 }}>
                    <Option value="">请选择</Option>
                    <Option value="female">女</Option>
                    <Option value="male">男</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem label={(<span>政治面貌&nbsp;</span>)}>
                {getFieldDecorator('politics')(
                  <Select style={{ width: 80 }}>
                    <Option value="">请选择</Option>
                    <Option value="MASSES">群众</Option>
                    <Option value="LEAGUE">团员</Option>
                    <Option value="PARTY">党员</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem label={(<span>保险&nbsp;</span>)}>
                {getFieldDecorator('insurance')(
                  <Select style={{ width: 80 }}>
                    <Option value="">请选择</Option>
                    <Option value="0">否</Option>
                    <Option value="1">是</Option>
                  </Select>
                )}
              </FormItem>
              <Button type="primary" htmlType="submit">查询</Button>
            </Form>
          </div>
          <Table
            rowKey="id"
            dataSource={(page && page.dataList) || []}
            columns={columns}
            bordered
            pagination={{  // 分页
              total: (page && +page.totalCount) || 0, // 总数量
              pageSize: (page && +page.pageSize) || 10,  // 显示几条一页
              defaultPageSize: 10, // 默认显示几条一页
              showSizeChanger: true,  // 是否显示可以设置几条一页的选项
              onShowSizeChange(current, pageSize) {  // 当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
              　form.validateFields((err, values) => {
              　　dispatch({
                    type: 'driverStore/queryPage',
                    pageNo: current,
                    pageSize,
                    ...values,
                  });
                });
              },
              onChange(page, pageSize) {  // 点击改变页数的选项时调用函数，current:将要跳转的页数
                form.validateFields((err, values) => {
                  dispatch({
                    type: 'driverStore/queryPage',
                    pageNo: page,
                    pageSize,
                    ...values,
                  });
                });
              },
              showTotal() {  // 设置显示一共几条数据
                return `共 ${(page && page.totalCount) || 0} 条数据`;
              },
            }}
          />
        </div>
      }
    </div>
  );
};

function mapStateToProps({ driverStore }) {
  return {
    register: driverStore.register,
    res: driverStore.res,
    page: driverStore.page,
  };
}

Index = Form.create()(Index);
export default connect(mapStateToProps)(Index);
