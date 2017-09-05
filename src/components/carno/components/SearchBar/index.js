import qs from 'qs'
import FilterBox from '../FilterBox'
/**
 * 搜索栏组件
 * @props btns 自定义按钮
 * @props ...formProps 参考HSearchForm组件属性
 */

// type: box, bar
// trigger: change, submit
function SearchBar(props) {
  const { btns, searchCacheKey, fields, searchFields, ...formProps } = props
  const filterBoxProps = {
    btns, searchCacheKey, fields, searchFields,
  }
  return (
    <FilterBox {...filterBoxProps} formProps={formProps} />
  )
}

export default SearchBar

