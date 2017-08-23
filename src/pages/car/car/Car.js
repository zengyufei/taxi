/**
 * 依赖的摆放顺序是：
 * 1. 非按需加载在最上面
 * 2. 按需加载的在下面
 * 3. 按长度从短到长
 * 4. 从对象再获取对象点出来的在按需加载下面
 * 5. 本系统业务对象在最下面，且路径不应该为相对路径，应为别名路径，别名查看 webpack.config.js
 */
import { connect } from 'dva';
import { Button, Table, DatePicker, Icon, Popconfirm, Alert, Input, Select, Form, Upload, Modal } from 'antd';

import styles from './Car.css';
import CarAdd from './CarAdd.js';
import CarUpdate from './CarUpdate.js';
import CarInfo from './CarInfo.js';
import qs from 'qs';

const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
const { TOKEN_KEY, RESOURCES_KEY } = constant;

let Car = (option) => {
  const columns = [
    {
      title: '自编号',
      dataIndex: 'carNo',
      key: 'carNo',
    }, {
      title: '车牌号',
      dataIndex: 'plateNumber',
      key: 'plateNumber',
    }, {
      title: '车辆类型',
      dataIndex: 'carTypeName',
      key: 'carTypeName',
    }, {
      title: '车架号',
      dataIndex: 'carFrame',
      key: 'carFrame',
    }, {
      title: '产权证号',
      dataIndex: 'ownershipNo',
      key: 'ownershipNo',
    }, {
      title: '产权证开始日期',
      dataIndex: 'ownershipBeginDate',
      key: 'ownershipBeginDate',
    }, {
      title: '产权证结束日期',
      dataIndex: 'ownershipEndDate',
      key: 'ownershipEndDate',
    }, {
      title: '发动机号',
      dataIndex: 'engineNumber',
      key: 'engineNumber',
    }, {
      title: '行驶证注册日期',
      dataIndex: 'drivingLicenseDate',
      key: 'drivingLicenseDate',
    }, {
      title: '道路运输证起止日期',
      dataIndex: 'roadTransportBeginDate',
      key: 'roadTransportBeginDate',
    }, {
    title: '道路运输证截止日期',
    dataIndex: 'roadTransportEndDate',
    key: 'roadTransportEndDate',
  }, {
    title: '车身颜色',
    dataIndex: 'carColorName',
    key: 'carColorName',
  }, {
    title: '车辆营运状态',
    dataIndex: 'carStatusName',
    key: 'carStatusName',
  }, {
    title: '机动车登记证号',
    dataIndex: 'certificateNo',
    key: 'certificateNo',
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <span>
        <Button type="primary" onClick={() => toInfo(record)} >详情</Button>&nbsp;
        <Button type="primary" onClick={() => toEdit(record)} >编辑</Button>&nbsp;

      </span>
    ),
  }];

  const { form, page, dispatch, res, pageState, car } = option;
  const { getFieldDecorator } = form;

  function queryPage(e) {
    dispatch({
      type: 'carStore/queryPage',
      carNo: form.getFieldValue('carNo'),
      carType: form.getFieldValue('carType'),
      plateNumber: form.getFieldValue('plateNumber'),
      plateNumber: form.getFieldValue('plateNumber'),
    });
  }
  function queryByCarNo() {
    dispatch({
      type: 'carStore/queryByCarNo',
      carNo: form.getFieldValue('carNo'),
    });
  }

  function toAdd(e) {
    dispatch({
      type: 'carStore/toAdd',
      res: 'carAdd',
    });
  }

  function toEdit(car) {
    dispatch({
      car,
      type: 'carStore/toEdit',
      res: 'carUpdate',
    });
  }

  function toInfo(car) {
    dispatch({
      car,
      type: 'carStore/toInfo',
      res: 'carInfo',
    });
  }

  function Delete(id) {
    dispatch({
      id,
      type: 'carStore/deleteById',
    });
  }
  const token = session.get(TOKEN_KEY);
  function exportCar() {
    const carNo = form.getFieldValue('carNo');
    const plateNumber = form.getFieldValue('plateNumber');
    const params = {
      carNo,
      plateNumber,
    };
    // 删除空值、undefind
    Object.keys(params).map(v => params[v] || delete params[v]);
    const paramsForGet = (params && qs.stringify(params)) || '';
    window.location.href = `/car/export.htm?token=${token}&${paramsForGet}`;
  }
  /**
   * 上传文件
   * @type {{name: string, action: string, headers: {authorization: string}, onChange: ((info))}}
   */
  const importCar = {
    name: 'file',
    action: `car/import.htm?token=${token}`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log('uploading');
      }
      if (info.file.status === 'done') {
        // console.log(`${info.file.name} file uploaded successfully`);
        console.log(info);
        Modal.info({
          title: '导入结果',
          content: (
            info.file.response.msg
          ),
          onOk() {
            dispatch({
              type: 'carStore/queryPage',
            });
          },
        });
      } else if (info.file.status === 'error') {
        console.log('error');
      }
    },
  };


  let pageSwitch;
  if (res == 'carAdd') {
    pageSwitch = <CarAdd key="carAdd" />;
  } else if (res == 'carUpdate') {
    pageSwitch = <CarUpdate key="carUpdate" />;
  } else if (res == 'carInfo') {
    pageSwitch = <CarInfo key="carInfo" />;
  }
  /*
   <FormItem  label="行驶证登记日期：">
   {getFieldDecorator('beginTime')(
   <DatePicker showTime   />
   )}
   </FormItem>
   <FormItem>
   {getFieldDecorator('endTime')(
   <DatePicker showTime  />
   )}
   </FormItem>*/
  return (
    <div>
      {
        pageState ? pageSwitch
         :
        <div>
          <div>
            <Button type="primary" icon="plus-circle-o" onClick={toAdd}>新增</Button>&nbsp;
            <Popconfirm title="是否确定要导出" onConfirm={exportCar} >
              <Button type="primary" icon="export" >导出</Button>&nbsp;
            </Popconfirm>
            <Upload {...importCar}>
              <Button type="primary" icon="download" >导入</Button>
            </Upload>
          </div>
          <div className={styles.query}>
            <Form layout="inline" >
              <FormItem label="自编号：">
                {getFieldDecorator('carNo')(
                  <Input placeholder="自编号" />,
                )}
              </FormItem>
              <FormItem label="车牌号：">
                {getFieldDecorator('plateNumber')(
                  <Input placeholder="车牌号" />,
                )}
              </FormItem>

              <FormItem label="车类型：">
                {getFieldDecorator('carType')(
                  <Select style={{ width: 120 }}>
                    <Option value="">请选择</Option>
                    <Option value="BYD_E6">比亚迪E6</Option>
                    <Option value="BYD_E5">比亚迪E5</Option>
                    <Option value="BM_EU220">北汽EU220</Option>
                  </Select>,
                )}
              </FormItem>

              <Button type="primary" onClick={queryPage} htmlType="submit" >查询</Button>
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
                dispatch({
                  type: 'carStore/queryPage',
                  pageNo: current,
                  pageSize,
                });
              },
              onChange(current, pageSize) {  // 点击改变页数的选项时调用函数，current:将要跳转的页数
                dispatch({
                  type: 'carStore/queryPage',
                  pageNo: current,
                  pageSize,
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

function mapStateToProps({ carStore }) {
  return {
    page: carStore.page,
    pageState: carStore.pageState,
    res: carStore.res,
    car: carStore.car,
  };
}

Car = Form.create()(Car);
export default connect(mapStateToProps)(Car);
