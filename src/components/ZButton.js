/*
 * @Author: zengyufei 
 * @Date: 2017-08-30 12:06:58 
 * @Last Modified by: zengyufei 
 * @Last Modified time: 2017-08-30 12:06:58 
 */
const { resourceSessionKey } = constant

function ZButton(option) {
  const { permission, children } = option
  const resourceList = session.get(resourceSessionKey)
  let ifPermission = false
  if (resourceList && resourceList.length > 0) {
    ifPermission = resourceList.indexOf(permission) > -1
  }

  return (
    ifPermission && <span>
      {children}
    </span>
  )
}

export default ZButton
