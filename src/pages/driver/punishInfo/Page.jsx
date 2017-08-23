import { connect } from 'dva';
import { Form, Input, Button, Icon, Popconfirm, Alert, Table, Upload, Modal, Select } from 'antd';
import styles from './Page.css';
import Add from './Add.jsx';
import Update from './Update.jsx';

const FormItem = Form.Item;
const { tokenSessionKey, resourceSessionKey } = constant;

let Index = (option) => {
  const { dispatch, form, res, register, page } = option;
  const { getFieldDecorator } = form;

  /* 添加 */
  function toAdd(e) {
    dispatch({
      type: 'punishInfoStore/toRegister',
      res: 'add',
    });
  }
  /* 编辑 */
  function toEdit(punishInfo) {
    dispatch({
      type: 'punishInfoStore/toEdit',
      res: 'update',
      punishInfo,
    });
  }

  const token = session.get(tokenSessionKey);
  /**
   * 上传文件
   * @type {{name: string, action: string, headers: {authorization: string}, onChange: ((info))}}
   */
  const importCar = {
    name: 'file',
    action: `/punishInfo/import.htm?token=${token}`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log('uploading');
      }
      if (info.file.status === 'done') {
        Modal.info({
          title: '导入结果',
          content: (
            info.file.response.msg
          ),
          onOk() {
            dispatch({
              type: 'punishInfoStore/queryPage',
            });
          },
        });
      } else if (info.file.status === 'error') {
        console.log('error');
      }
    },
  };

  /**
   * 条件查询
   */
  const query = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      dispatch({
        type: 'punishInfoStore/queryPage',
        ...values,
      });
    });
  };

  let a;
  if (res == 'add') {
    a = <Add key="add" />;
  } else if (res == 'update') {
    a = <Update key="update" />;
  }

  const columns = [{
    title: '违章编码',
    dataIndex: 'punishCode',
    key: 'punishCode',
  }, {
    title: '违章描述',
    dataIndex: 'punishDesc',
    key: 'punishDesc',
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <span>
        <ZButton permission="driver:punishInfo:update">
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
            <ZButton permission="driver:punishInfo:insert">
              <Button type="primary" icon="plus-circle-o" onClick={toAdd}>新增</Button>&nbsp;
            </ZButton>
            <ZButton permission="driver:punishInfo:import">
              <Upload {...importCar}>
                <Button type="primary" icon="download" >导入</Button>
              </Upload>
            </ZButton>
          </div>
          <div className={styles.query}>
            <Form layout="inline" onSubmit={query}>
              <FormItem
                label={(<span>违章编码&nbsp;</span>)}
              >
                {getFieldDecorator('punishCode')(<Input />)}
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
                    type: 'punishInfoStore/queryPage',
                    pageNo: current,
                    pageSize,
                    ...values,
                  });
                });
              },
              onChange(page, pageSize) {  // 点击改变页数的选项时调用函数，current:将要跳转的页数
                form.validateFields((err, values) => {
                  dispatch({
                    type: 'punishInfoStore/queryPage',
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

function mapStateToProps({ punishInfoStore }) {
  return {
    register: punishInfoStore.register,
    res: punishInfoStore.res,
    page: punishInfoStore.page,
  };
}

Index = Form.create()(Index);
export default connect(mapStateToProps)(Index);
