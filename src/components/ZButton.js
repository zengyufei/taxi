/**
 * 依赖的摆放顺序是：
 * 1. 非按需加载在最上面
 * 2. 按需加载的在下面
 * 3. 按长度从短到长
 * 4. 从对象再获取对象点出来的在按需加载下面
 * 5. 本系统业务对象在最下面，且路径不应该为相对路径，应为别名路径，别名查看 webpack.config.js
 */
import { Button } from 'antd';

const { RESOURCES_KEY } = constant;

function ZButton(option) {
  const { permission, children } = option;
  const resourceList = session.get(RESOURCES_KEY);
  let ifPermission = false;
  if (resourceList && resourceList.length > 0) {
    ifPermission = resourceList.indexOf(permission) > -1;
  }

  return (
    ifPermission && <span>
      {children}
    </span>
  );
}

export default ZButton;
