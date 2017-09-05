module.exports = [
  {
    key: 'carId',
    type: 'hidden',
  }, {
    name: '自编号',
    key: 'carNo',
    form: {
      add: {
        type: 'carNo',
        rules: [{ required: true, message: '请输入自编号!', whitespace: true }, { max: 16, message: '自编号最多长度16', whitespace: true }],
      },
      update: {
        hasFeedback: false,
        disabled: true,
        rules: [{ required: true, message: '请输入自编号!', whitespace: true }, { max: 16, message: '自编号最多长度16', whitespace: true }],
      },
    },
  }, {
    name: '车牌号',
    key: 'plateNumber',
    form: {
      add: {
        disabled: true,
        placeholder: false,
        hasFeedback: false,
      },
      update: {
        disabled: true,
        placeholder: false,
        hasFeedback: false,
      },
    },
  }, {
    name: '车辆照片',
    key: 'plateImage',
    type: 'plateImage',
    hasFeedback: false,
    submit: false,
  }, {
    name: '营运证年审有效期截止时间',
    key: 'synthesizeDate',
    type: 'date',
    form: {
      rules: [{ required: true, message: '请选择营运证年审有效期截止时间!' }],
    },
  }, {
    name: '营运证年审有效扫描件',
    key: 'synthesizeFile',
    type: 'synthesizeFile',
    form: {
      rules: [
        { required: true, type: 'string', message: '请上传营运证年审有效扫描件!' },
      ],
    },
  }, {
    name: '行驶证有效期截止时间',
    key: 'drivingLicenseDate',
    type: 'date',
    form: {
      rules: [{ required: true, message: '请选择行驶证有效期截止时间!' }],
    },
  }, {
    name: '行驶证有效扫描件',
    key: 'drivingLicenseFile',
    type: 'drivingLicenseFile',
    form: {
      rules: [
        { required: true, type: 'string', message: '请上传行驶证有效扫描件!' },
      ],
    },
  }, {
    name: '计价器年审有效期截止时间',
    key: 'taximeterDate',
    type: 'date',
    form: {
      rules: [{ required: true, message: '请选择计价器年审有效期截止时间!' }],
    },
  }, {
    name: '计价器年审有效期截止时间扫描件',
    key: 'taximeterFile',
    type: 'taximeterFile',
    form: {
      rules: [
        { required: true, type: 'string', message: '请上传计价器年审有效期截止时间扫描件!' },
      ],
    },
  }]
