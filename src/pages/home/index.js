import React from 'react'
import PropTypes from 'prop-types'
/**
 * 依赖的摆放顺序是：
 * 1. 非按需加载在最上面
 * 2. 按需加载的在下面
 * 3. 按长度从短到长
 * 4. 从对象再获取对象点出来的在按需加载下面
 * 5. 本系统业务对象在最下面，且路径不应该为相对路径，应为别名路径，别名查看 webpack.config.js
 */
import { connect } from 'dva'
import { Layout } from 'antd'
import { menus } from 'src/menus'

const Home = option => {
  const { children, location, dispatch } = option

  return (
    <div style={{ backgroundColor: 'yellow' }}>
    home
    </div>
  )
}


export default Home
