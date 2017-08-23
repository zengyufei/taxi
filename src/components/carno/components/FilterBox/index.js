import { Button, Icon, Popover, Checkbox, Row, Col } from 'antd'
import classNames from 'classnames'
import styles from './index.less'
import HSearchForm from '../Form/SearchForm'
import { local } from '../../utils/storage'

const CheckboxGroup = Checkbox.Group

class FilterBox extends React.Component {
  constructor() {
    super()

    this.state = {
      visible: true,
      filterIcon: false,
      newFields: [],
    }

    this.timer = ''
  }

  componentDidMount() {
    this.setState({ newFields: this.props.fields })
  }

  handleFilterClick(visible) {
    this.setState({
      visible: !visible,
    })
  }

  handleChangeFilter(e, searchCacheKey, searchFields) {
    const newFields = searchFields.filter(x => e.includes(x.key))
    this.setState({
      newFields,
    })
    local.set(searchCacheKey, newFields.map(x => x.key))
  }

  render() {
    const { visible, filterIcon, newFields } = this.state
    const { searchCacheKey, searchFields, btns, formProps } = this.props

    const btnsCls = classNames({
      [styles.filterBtns]: true,
      [styles.filterActive]: visible,
    })

    const filterBtnCls = classNames({
      [styles.active]: visible,
    })

    const filterBoxCls = classNames({
      [styles.filterBox]: true,
      [styles.active]: visible,
    })

    return (
      <div>
        <div className={btnsCls}>
          {
            newFields && <Button className={filterBtnCls} onClick={() => this.handleFilterClick(visible)} style={{ float: 'left' }}>过滤<Icon type="down" /></Button>
          }
          {
            searchCacheKey && <Popover
              placement="bottom"
              content={
                <CheckboxGroup defaultValue={newFields.map(e => e.key)} onChange={e => this.handleChangeFilter(e, searchCacheKey, searchFields)} >
                  <Row style={{ width: formProps.width || '150px' }}>
                    {
                      searchFields.map(e => {
                        return <Col key={e.key} style={{ margin: '3px' }} span={24}><Checkbox value={e.key}>{e.name}</Checkbox></Col>
                      })
                    }
                  </Row>
                </CheckboxGroup>
              }
              trigger="click"
              onVisibleChange={() => this.setState({ filterIcon: !filterIcon })}
            >
              <Button style={{ float: 'left',
                color: '#2baee9',
                borderColor: '#2baee9',
                background: '#fff' }}
              >过滤条件<Icon type={filterIcon ? 'down' : 'up'} /></Button>
            </Popover>
          }
          <span style={{ float: 'left', marginLeft: '10px' }}>
            {btns}
          </span>
        </div>
        {newFields && visible &&
          <div className={filterBoxCls}>
            {
              newFields && <HSearchForm className={styles.searchForm} fields={newFields} {...formProps} />
            }
          </div>
        }
      </div>
    )
  }
}

export default FilterBox
