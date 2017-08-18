import { Modal } from 'antd';

export default {
  info(msg) {
    return Modal.info({
      maskClosable: true,
      content: msg,
    });
  },

  success(msg) {
    return Modal.success({
      maskClosable: true,
      content: msg,
    });
  },

  error(msg) {
    return Modal.error({
      maskClosable: true,
      content: msg,
    });
  },
};
