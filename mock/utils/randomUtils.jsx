module.exports = {

  /**
   * 取得范围随机整数
   * @param start 区间起始
   * @param end 区间结束
   * @returns 起始-结束区间的随机数
   */
  get: (start, end) => {
    const range = Math.abs(start - end)
    return Math.round(Math.random() * range + start)
  },


}
