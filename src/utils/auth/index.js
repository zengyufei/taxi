const { tokenSessionKey, resourceSessionKey, redirectLoginUrl, redirectNotPermissionUrl } = constant

function redirectLoginPage() {
  session.removeAll()
  window.location.href = redirectLoginUrl
}

function redirectNotPermissionPage() {
  window.location.href = redirectNotPermissionUrl
}

export function hasPermission(permission) {
  const resourceList = session.get(resourceSessionKey) // 获取登录用户的所有权限
  resourceList || redirectLoginPage()
  if (!resourceList || !resourceList.length || (permission && resourceList.indexOf(permission) === -1)) {
    // 无权限访问跳转到无权限页面
    return false
  }
  return true
}

export default function authenticated(permission) {
  // 判断是否登录
  const token = session.get(tokenSessionKey)
  if (!token) {
    // 清除所有 session 并重定向到登录页面
    redirectLoginPage()
    return false
  }
  if (hasPermission(permission)) {
    return true
  }
  redirectNotPermissionPage()
  return false
}
