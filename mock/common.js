const { areaContant } = require('./constant/index.jsx')

const { areas } = areaContant

module.exports = {

  /**
   * 查询全部省份
   */
  'GET /areacode/queryAll2.htm': (req, res) => {
    res.json(areas)
  },

}
