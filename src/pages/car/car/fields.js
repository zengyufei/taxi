module.exports = [
  {
    key: 'id',
    type: 'hidden',
  }, {
    name: '自编号',
    key: 'carNo',
    form: {
      add: {
        rules: [{ required: true, message: '请输入自编号!', whitespace: true }, { max: 16, message: '自编号最多长度16', whitespace: true }],
      },
      update: {
        submit: false,
      },
    },
  }, {
    name: '车牌号',
    key: 'plateNumber',
    form: {
      add: {
        rules: [{ required: true, message: '请输入车牌号!' }, { max: 16, message: '车牌号最多长度16', whitespace: true }],
      },
      update: {
        submit: false,
      },
    },
  }, {
    name: '车辆照片（45度角）',
    key: 'plateImage',
    type: 'plateImage',
    form: {
      rules: [
        { required: true, type: 'string', message: '请上传车辆照片（45度角）!' },
      ],
    },
  }, {
    name: '车架号',
    key: 'carFrame',
    form: {
      rules: [{ required: true, message: '请输入车架号!' }, { max: 32, message: '车架号最多长度32', whitespace: true }],
    },
  }, {
    name: '产权证号',
    key: 'ownershipNo',
    form: {
      rules: [{ required: true, message: '请输入产权证号!' }, { max: 32, message: '产权证号最多长度32', whitespace: true }],
    },
  }, {
    name: '产权证',
    key: 'ownershipImage',
    type: 'ownershipImage',
    form: {
      rules: [{ required: true, type: 'string', message: '上传产权证!' }],
    },
  }, {
    name: '产权证起始时间',
    key: 'ownershipBeginDate',
    type: 'date',
    form: {
      rules: [{ required: true, message: '请选择产权证起始时间!' }],
    },
  }, {
    name: '产权证截止时间 ',
    key: 'ownershipEndDate',
    type: 'date',
    form: {
      rules: [{ required: true, message: '请选择产权证截止时间!' }],
    },
  }, {
    name: '发动机号',
    key: 'engineNumber',
    form: {
      rules: [{ required: true, message: '请输入发动机号!' }, { max: 16, message: '发动机号最多长度16', whitespace: true }],
    },
  }, {
    name: '行驶证注册日期',
    key: 'drivingLicenseDate',
    type: 'date',
    form: {
      rules: [{ required: true, message: '请选择行驶证注册日期!' }],
    },
  }, {
    name: '道路运输证',
    key: 'roadTransportImage',
    type: 'roadTransportImage',
    form: {
      rules: [{ required: true, type: 'string', message: '上传道路运输证!' }],
    },
  }, {
    name: '道路运输证起止日期',
    key: 'roadTransportBeginDate',
    type: 'date',
    form: {
      rules: [{ required: true, message: '请选择道路运输证起始时间!' }],
    },
  }, {
    name: '道路运输证截止日期',
    key: 'roadTransportEndDate',
    type: 'date',
    form: {
      rules: [{ required: true, message: '请选择道路运输证截止时间!' }],
    },
  }, {
    name: '车身颜色',
    key: 'carColor',
    form: {
      rules: [{ required: true, message: '请选择车辆颜色!' }],
    },
    enums: {
      BLUE: '蓝色',
      RED: '红色',
      GREEN: '绿色',
      YELLOW: '黄色',
      BLUEWHITE: '蓝白色',
      LAKEBLUE: '湖青色',
    },
  }, {
    name: '机动车登记证书',
    key: 'certificateImage',
    type: 'certificateImage',
    form: {
      rules: [{ required: true, type: 'string', message: '机动车登记证书!' }],
    },
  }, {
    name: '车辆营运状态',
    key: 'carStatus',
    form: {
      rules: [{ required: true, message: '请选择车辆营运状态!' }],
    },
    enums: {
      OPERATE_WAIT: '待营运',
      OPERATE_USED: '营运中',
      ACCIDENT_REPAIR: '事故维修',
      ACCIDENT_SCRAP: '事故报废',
      ROUTINE_SCRAP: '正常报废',
      BUSINESS_CAR: '公务用车',
      LONG_DISTANCE_LEASE: '长途租赁',
    },
  }, {
    name: '机动车登记证号',
    key: 'certificateNo',
    form: {
      rules: [{ required: true, message: '请输入机动车登记证号!' }, { max: 32, message: '机动车登记证号最多长度32', whitespace: true }],
    },
  }, {
    name: '车辆类型',
    key: 'carType',
    form: {
      rules: [{ required: true, message: '请选择车辆类型!' }],
    },
    enums: {
      BYD_E6: '比亚迪E6',
      BYD_E5: '比亚迪E5',
      BM_EU220: '北汽EU220',
    },
  }]
