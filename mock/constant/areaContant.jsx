const areas = [
  {
    id: 1, code: 44, codeName: '广东省', parentCode: 0, parentName: '中国', fullName: '广东省',
  }, {
    id: 2, code: 22, codeName: '吉林省', parentCode: 0, parentName: '中国', fullName: '吉林省',
  }, {
    id: 3, code: 45, codeName: '广西壮族自治区', parentCode: 0, parentName: '中国', fullName: '广西壮族自治区',
  }, {
    id: 4, code: 23, codeName: '黑龙江省', parentCode: 0, parentName: '中国', fullName: '黑龙江省',
  }, {
    id: 5, code: 46, codeName: '海南省', parentCode: 0, parentName: '中国', fullName: '海南省',
  }, {
    id: 6, code: 71, codeName: '台湾省', parentCode: 0, parentName: '中国', fullName: '台湾省',
  }, {
    id: 7, code: 50, codeName: '重庆市', parentCode: 0, parentName: '中国', fullName: '重庆市',
  }, {
    id: 8, code: 51, codeName: '四川省', parentCode: 0, parentName: '中国', fullName: '四川省',
  }, {
    id: 9, code: 52, codeName: '贵州省', parentCode: 0, parentName: '中国', fullName: '贵州省',
  }, {
    id: 10, code: 53, codeName: '云南省', parentCode: 0, parentName: '中国', fullName: '云南省',
  }, {
    id: 11, code: 31, codeName: '上海市', parentCode: 0, parentName: '中国', fullName: '上海市',
  }, {
    id: 12, code: 54, codeName: '西藏自治区', parentCode: 0, parentName: '中国', fullName: '西藏自治区',
  }, {
    id: 13, code: 32, codeName: '江苏省', parentCode: 0, parentName: '中国', fullName: '江苏省',
  }, {
    id: 14, code: 33, codeName: '浙江省', parentCode: 0, parentName: '中国', fullName: '浙江省',
  }, {
    id: 15, code: 11, codeName: '北京市', parentCode: 0, parentName: '中国', fullName: '北京市',
  }, {
    id: 16, code: 34, codeName: '安徽省', parentCode: 0, parentName: '中国', fullName: '安徽省',
  }, {
    id: 17, code: 12, codeName: '天津市', parentCode: 0, parentName: '中国', fullName: '天津市',
  }, {
    id: 18, code: 13, codeName: '河北省', parentCode: 0, parentName: '中国', fullName: '河北省',
  }, {
    id: 19, code: 35, codeName: '福建省', parentCode: 0, parentName: '中国', fullName: '福建省',
  }, {
    id: 20, code: 14, codeName: '山西省', parentCode: 0, parentName: '中国', fullName: '山西省',
  }, {
    id: 21, code: 36, codeName: '江西省', parentCode: 0, parentName: '中国', fullName: '江西省',
  }, {
    id: 22, code: 15, codeName: '内蒙古自治区', parentCode: 0, parentName: '中国', fullName: '内蒙古自治区',
  }, {
    id: 23, code: 37, codeName: '山东省', parentCode: 0, parentName: '中国', fullName: '山东省',
  }, {
    id: 24, code: 81, codeName: '香港特别行政区', parentCode: 0, parentName: '中国', fullName: '香港特别行政区',
  }, {
    id: 25, code: 82, codeName: '澳门特别行政区', parentCode: 0, parentName: '中国', fullName: '澳门特别行政区',
  }, {
    id: 26, code: 61, codeName: '陕西省', parentCode: 0, parentName: '中国', fullName: '陕西省',
  }, {
    id: 27, code: 62, codeName: '甘肃省', parentCode: 0, parentName: '中国', fullName: '甘肃省',
  }, {
    id: 28, code: 41, codeName: '河南省', parentCode: 0, parentName: '中国', fullName: '河南省',
  }, {
    id: 29, code: 63, codeName: '青海省', parentCode: 0, parentName: '中国', fullName: '青海省',
  }, {
    id: 30, code: 42, codeName: '湖北省', parentCode: 0, parentName: '中国', fullName: '湖北省',
  }, {
    id: 31, code: 64, codeName: '宁夏回族自治区', parentCode: 0, parentName: '中国', fullName: '宁夏回族自治区',
  }, {
    id: 32, code: 43, codeName: '湖南省', parentCode: 0, parentName: '中国', fullName: '湖南省',
  }, {
    id: 33, code: 21, codeName: '辽宁省', parentCode: 0, parentName: '中国', fullName: '辽宁省',
  }, {
    id: 34, code: 65, codeName: '新疆维吾尔自治区', parentCode: 0, parentName: '中国', fullName: '新疆维吾尔自治区',
  }, {
    id: 35, code: 6230, codeName: '甘南藏族自治州', parentCode: 62, fullName: '甘肃省甘南藏族自治州',
  }, {
    id: 36, code: 6110, codeName: '商洛市', parentCode: 61, fullName: '陕西省商洛市',
  }, {
    id: 37, code: 4290, codeName: '省直辖行政单位', parentCode: 42, fullName: '湖北省省直辖行政单位',
  }, {
    id: 38, code: 6590, codeName: '省直辖行政单位', parentCode: 65, fullName: '新疆省直辖行政单位',
  }, {
    id: 39, code: 2306, codeName: '大庆市', parentCode: 23, fullName: '黑龙江省大庆市',
  }, {
    id: 40, code: 2305, codeName: '双鸭山市', parentCode: 23, fullName: '黑龙江省双鸭山市',
  }, {
    id: 41, code: 2304, codeName: '鹤岗市', parentCode: 23, fullName: '黑龙江省鹤岗市',
  }, {
    id: 42, code: 2303, codeName: '鸡西市', parentCode: 23, fullName: '黑龙江省鸡西市',
  }, {
    id: 43, code: 2302, codeName: '齐齐哈尔市', parentCode: 23, fullName: '黑龙江省齐齐哈尔市',
  }, {
    id: 44, code: 2301, codeName: '哈尔滨市', parentCode: 23, fullName: '黑龙江省哈尔滨市',
  }, {
    id: 45, code: 6106, codeName: '延安市', parentCode: 61, fullName: '陕西省延安市',
  }, {
    id: 46, code: 6105, codeName: '渭南市', parentCode: 61, fullName: '陕西省渭南市',
  }, {
    id: 47, code: 6229, codeName: '临夏回族自治州', parentCode: 62, fullName: '甘肃省临夏回族自治州',
  }, {
    id: 48, code: 6108, codeName: '榆林市', parentCode: 61, fullName: '陕西省榆林市',
  }, {
    id: 49, code: 6107, codeName: '汉中市', parentCode: 61, fullName: '陕西省汉中市',
  }, {
    id: 50, code: 4601, codeName: '海口市', parentCode: 46, fullName: '海南省海口市',
  }, {
    id: 51, code: 4602, codeName: '三亚市', parentCode: 46, fullName: '海南省三亚市',
  }, {
    id: 52, code: 6109, codeName: '安康市', parentCode: 61, fullName: '陕西省安康市',
  }, {
    id: 53, code: 2309, codeName: '七台河市', parentCode: 23, fullName: '黑龙江省七台河市',
  }, {
    id: 54, code: 2308, codeName: '佳木斯市', parentCode: 23, fullName: '黑龙江省佳木斯市',
  }, {
    id: 55, code: 2307, codeName: '伊春市', parentCode: 23, fullName: '黑龙江省伊春市',
  }, {
    id: 56, code: 3406, codeName: '淮北市', parentCode: 34, fullName: '安徽省淮北市',
  }, {
    id: 57, code: 3405, codeName: '马鞍山市', parentCode: 34, fullName: '安徽省马鞍山市',
  }, {
    id: 58, code: 3404, codeName: '淮南市', parentCode: 34, fullName: '安徽省淮南市',
  }, {
    id: 59, code: 3403, codeName: '蚌埠市', parentCode: 34, fullName: '安徽省蚌埠市',
  }, {
    id: 60, code: 3402, codeName: '芜湖市', parentCode: 34, fullName: '安徽省芜湖市',
  }, {
    id: 61, code: 2312, codeName: '绥化市', parentCode: 23, fullName: '黑龙江省绥化市',
  }, {
    id: 62, code: 1102, codeName: '北京市县', parentCode: 11, fullName: '北京市县',
  }, {
    id: 63, code: 3401, codeName: '合肥市', parentCode: 34, fullName: '安徽省合肥市',
  }, {
    id: 64, code: 2311, codeName: '黑河市', parentCode: 23, fullName: '黑龙江省黑河市',
  }, {
    id: 65, code: 1101, codeName: '市辖区', parentCode: 11, fullName: '北京市市辖区',
  }, {
    id: 66, code: 2310, codeName: '牡丹江市', parentCode: 23, fullName: '黑龙江省牡丹江市',
  }, {
    id: 67, code: 3408, codeName: '安庆市', parentCode: 34, fullName: '安徽省安庆市',
  }, {
    id: 68, code: 3407, codeName: '铜陵市', parentCode: 34, fullName: '安徽省铜陵市',
  }, {
    id: 69, code: 4507, codeName: '钦州市', parentCode: 45, fullName: '广西钦州市',
  }, {
    id: 70, code: 2207, codeName: '松原市', parentCode: 22, fullName: '吉林省松原市',
  }, {
    id: 71, code: 3417, codeName: '池州市', parentCode: 34, fullName: '安徽省池州市',
  }, {
    id: 72, code: 2206, codeName: '白山市', parentCode: 22, fullName: '吉林省白山市',
  }, {
    id: 73, code: 3416, codeName: '亳州市', parentCode: 34, fullName: '安徽省亳州市',
  }, {
    id: 74, code: 4508, codeName: '贵港市', parentCode: 45, fullName: '广西贵港市',
  }, {
    id: 75, code: 2327, codeName: '大兴安岭地区', parentCode: 23, fullName: '黑龙江省大兴安岭地区',
  }, {
    id: 76, code: 2205, codeName: '通化市', parentCode: 22, fullName: '吉林省通化市',
  }, {
    id: 77, code: 3415, codeName: '六安市', parentCode: 34, fullName: '安徽省六安市',
  }, {
    id: 78, code: 4509, codeName: '玉林市', parentCode: 45, fullName: '广西玉林市',
  }, {
    id: 79, code: 2204, codeName: '辽源市', parentCode: 22, fullName: '吉林省辽源市',
  }, {
    id: 80, code: 3414, codeName: '巢湖市', parentCode: 34, fullName: '安徽省巢湖市',
  }, {
    id: 81, code: 2203, codeName: '四平市', parentCode: 22, fullName: '吉林省四平市',
  }, {
    id: 82, code: 3413, codeName: '宿州市', parentCode: 34, fullName: '安徽省宿州市',
  }, {
    id: 83, code: 2202, codeName: '吉林市', parentCode: 22, fullName: '吉林省吉林市',
  }, {
    id: 84, code: 3412, codeName: '阜阳市', parentCode: 34, fullName: '安徽省阜阳市',
  }, {
    id: 85, code: 2201, codeName: '长春市', parentCode: 22, fullName: '吉林省长春市',
  }, {
    id: 86, code: 3411, codeName: '滁州市', parentCode: 34, fullName: '安徽省滁州市',
  }, {
    id: 87, code: 3410, codeName: '黄山市', parentCode: 34, fullName: '安徽省黄山市',
  }, {
    id: 88, code: 4501, codeName: '南宁市', parentCode: 45, fullName: '广西南宁市',
  }, {
    id: 89, code: 4502, codeName: '柳州市', parentCode: 45, fullName: '广西柳州市',
  }, {
    id: 90, code: 4503, codeName: '桂林市', parentCode: 45, fullName: '广西桂林市',
  }, {
    id: 91, code: 4504, codeName: '梧州市', parentCode: 45, fullName: '广西梧州市',
  }, {
    id: 92, code: 4505, codeName: '北海市', parentCode: 45, fullName: '广西北海市',
  }, {
    id: 93, code: 4506, codeName: '防城港市', parentCode: 45, fullName: '广西防城港市',
  }, {
    id: 94, code: 2208, codeName: '白城市', parentCode: 22, fullName: '吉林省白城市',
  }, {
    id: 95, code: 3418, codeName: '宣城市', parentCode: 34, fullName: '安徽省宣城市',
  }, {
    id: 96, code: 3310, codeName: '台州市', parentCode: 33, fullName: '浙江省台州市',
  }, {
    id: 97, code: 3307, codeName: '金华市', parentCode: 33, fullName: '浙江省金华市',
  }, {
    id: 98, code: 3306, codeName: '绍兴市', parentCode: 33, fullName: '浙江省绍兴市',
  }, {
    id: 99, code: 3305, codeName: '湖州市', parentCode: 33, fullName: '浙江省湖州市',
  }, {
    id: 100, code: 3304, codeName: '嘉兴市', parentCode: 33, fullName: '浙江省嘉兴市',
  }, {
    id: 101, code: 3303, codeName: '温州市', parentCode: 33, fullName: '浙江省温州市',
  }, {
    id: 102, code: 3302, codeName: '宁波市', parentCode: 33, fullName: '浙江省宁波市',
  }, {
    id: 103, code: 3301, codeName: '杭州市', parentCode: 33, fullName: '浙江省杭州市',
  }, {
    id: 104, code: 4510, codeName: '百色市', parentCode: 45, fullName: '广西百色市',
  }, {
    id: 105, code: 4511, codeName: '贺州市', parentCode: 45, fullName: '广西贺州市',
  }, {
    id: 106, code: 4512, codeName: '河池市', parentCode: 45, fullName: '广西河池市',
  }, {
    id: 107, code: 4513, codeName: '来宾市', parentCode: 45, fullName: '广西来宾市',
  }, {
    id: 108, code: 4514, codeName: '崇左市', parentCode: 45, fullName: '广西崇左市',
  }, {
    id: 109, code: 3309, codeName: '舟山市', parentCode: 33, fullName: '浙江省舟山市',
  }, {
    id: 110, code: 3308, codeName: '衢州市', parentCode: 33, fullName: '浙江省衢州市',
  }, {
    id: 111, code: 2111, codeName: '盘锦市', parentCode: 21, fullName: '辽宁省盘锦市',
  }, {
    id: 112, code: 2110, codeName: '辽阳市', parentCode: 21, fullName: '辽宁省辽阳市',
  }, {
    id: 113, code: 2108, codeName: '营口市', parentCode: 21, fullName: '辽宁省营口市',
  }, {
    id: 114, code: 4408, codeName: '湛江市', parentCode: 44, fullName: '广东省湛江市',
  }, {
    id: 115, code: 4409, codeName: '茂名市', parentCode: 44, fullName: '广东省茂名市',
  }, {
    id: 116, code: 2107, codeName: '锦州市', parentCode: 21, fullName: '辽宁省锦州市',
  }, {
    id: 117, code: 2106, codeName: '丹东市', parentCode: 21, fullName: '辽宁省丹东市',
  }, {
    id: 118, code: 2105, codeName: '本溪市', parentCode: 21, fullName: '辽宁省本溪市',
  }, {
    id: 119, code: 2104, codeName: '抚顺市', parentCode: 21, fullName: '辽宁省抚顺市',
  }, {
    id: 120, code: 2224, codeName: '延边朝鲜族自治州', parentCode: 22, fullName: '吉林省延边朝鲜族自治州',
  }, {
    id: 121, code: 2103, codeName: '鞍山市', parentCode: 21, fullName: '辽宁省鞍山市',
  }, {
    id: 122, code: 2102, codeName: '大连市', parentCode: 21, fullName: '辽宁省大连市',
  }, {
    id: 123, code: 2101, codeName: '沈阳市', parentCode: 21, fullName: '辽宁省沈阳市',
  }, {
    id: 124, code: 3311, codeName: '丽水市', parentCode: 33, fullName: '浙江省丽水市',
  }, {
    id: 125, code: 4401, codeName: '广州市', parentCode: 44, fullName: '广东省广州市',
  }, {
    id: 126, code: 4402, codeName: '韶关市', parentCode: 44, fullName: '广东省韶关市',
  }, {
    id: 127, code: 4403, codeName: '深圳市', parentCode: 44, fullName: '广东省深圳市',
  }, {
    id: 128, code: 4404, codeName: '珠海市', parentCode: 44, fullName: '广东省珠海市',
  }, {
    id: 129, code: 4405, codeName: '汕头市', parentCode: 44, fullName: '广东省汕头市',
  }, {
    id: 130, code: 4406, codeName: '佛山市', parentCode: 44, fullName: '广东省佛山市',
  }, {
    id: 131, code: 4407, codeName: '江门市', parentCode: 44, fullName: '广东省江门市',
  }, {
    id: 132, code: 2109, codeName: '阜新市', parentCode: 21, fullName: '辽宁省阜新市',
  }, {
    id: 133, code: 4420, codeName: '中山市', parentCode: 44, fullName: '广东省中山市',
  }, {
    id: 134, code: 3211, codeName: '镇江市', parentCode: 32, fullName: '江苏省镇江市',
  }, {
    id: 135, code: 3210, codeName: '扬州市', parentCode: 32, fullName: '江苏省扬州市',
  }, {
    id: 136, code: 4419, codeName: '东莞市', parentCode: 44, fullName: '广东省东莞市',
  }, {
    id: 137, code: 3208, codeName: '淮安市', parentCode: 32, fullName: '江苏省淮安市',
  }, {
    id: 138, code: 3207, codeName: '连云港市', parentCode: 32, fullName: '江苏省连云港市',
  }, {
    id: 139, code: 3206, codeName: '南通市', parentCode: 32, fullName: '江苏省南通市',
  }, {
    id: 140, code: 3205, codeName: '苏州市', parentCode: 32, fullName: '江苏省苏州市',
  }, {
    id: 141, code: 3204, codeName: '常州市', parentCode: 32, fullName: '江苏省常州市',
  }, {
    id: 142, code: 3203, codeName: '徐州市', parentCode: 32, fullName: '江苏省徐州市',
  }, {
    id: 143, code: 2114, codeName: '葫芦岛市', parentCode: 21, fullName: '辽宁省葫芦岛市',
  }, {
    id: 144, code: 2113, codeName: '朝阳市', parentCode: 21, fullName: '辽宁省朝阳市',
  }, {
    id: 145, code: 3202, codeName: '无锡市', parentCode: 32, fullName: '江苏省无锡市',
  }, {
    id: 146, code: 2112, codeName: '铁岭市', parentCode: 21, fullName: '辽宁省铁岭市',
  }, {
    id: 147, code: 3201, codeName: '南京市', parentCode: 32, fullName: '江苏省南京市',
  }, {
    id: 148, code: 4412, codeName: '肇庆市', parentCode: 44, fullName: '广东省肇庆市',
  }, {
    id: 149, code: 4413, codeName: '惠州市', parentCode: 44, fullName: '广东省惠州市',
  }, {
    id: 150, code: 4414, codeName: '梅州市', parentCode: 44, fullName: '广东省梅州市',
  }, {
    id: 151, code: 4415, codeName: '汕尾市', parentCode: 44, fullName: '广东省汕尾市',
  }, {
    id: 152, code: 4416, codeName: '河源市', parentCode: 44, fullName: '广东省河源市',
  }, {
    id: 153, code: 4417, codeName: '阳江市', parentCode: 44, fullName: '广东省阳江市',
  }, {
    id: 154, code: 3209, codeName: '盐城市', parentCode: 32, fullName: '江苏省盐城市',
  }, {
    id: 155, code: 4418, codeName: '清远市', parentCode: 44, fullName: '广东省清远市',
  }, {
    id: 156, code: 4310, codeName: '郴州市', parentCode: 43, fullName: '湖南省郴州市',
  }, {
    id: 157, code: 4311, codeName: '永州市', parentCode: 43, fullName: '湖南省永州市',
  }, {
    id: 158, code: 3101, codeName: '市辖区', parentCode: 31, fullName: '上海市市辖区',
  }, {
    id: 159, code: 4309, codeName: '益阳市', parentCode: 43, fullName: '湖南省益阳市',
  }, {
    id: 160, code: 3213, codeName: '宿迁市', parentCode: 32, fullName: '江苏省宿迁市',
  }, {
    id: 161, code: 3212, codeName: '泰州市', parentCode: 32, fullName: '江苏省泰州市',
  }, {
    id: 162, code: 4301, codeName: '长沙市', parentCode: 43, fullName: '湖南省长沙市',
  }, {
    id: 163, code: 4302, codeName: '株洲市', parentCode: 43, fullName: '湖南省株洲市',
  }, {
    id: 164, code: 4303, codeName: '湘潭市', parentCode: 43, fullName: '湖南省湘潭市',
  }, {
    id: 165, code: 4304, codeName: '衡阳市', parentCode: 43, fullName: '湖南省衡阳市',
  }, {
    id: 166, code: 4305, codeName: '邵阳市', parentCode: 43, fullName: '湖南省邵阳市',
  }, {
    id: 167, code: 4306, codeName: '岳阳市', parentCode: 43, fullName: '湖南省岳阳市',
  }, {
    id: 168, code: 4307, codeName: '常德市', parentCode: 43, fullName: '湖南省常德市',
  }, {
    id: 169, code: 4308, codeName: '张家界市', parentCode: 43, fullName: '湖南省张家界市',
  }, {
    id: 170, code: 4201, codeName: '武汉市', parentCode: 42, fullName: '湖北省武汉市',
  }, {
    id: 171, code: 3102, codeName: '上海市县', parentCode: 31, fullName: '上海市县',
  }, {
    id: 172, code: 4312, codeName: '怀化市', parentCode: 43, fullName: '湖南省怀化市',
  }, {
    id: 173, code: 5401, codeName: '拉萨市', parentCode: 54, fullName: '西藏拉萨市',
  }, {
    id: 174, code: 4313, codeName: '娄底市', parentCode: 43, fullName: '湖南省娄底市',
  }, {
    id: 175, code: 4690, codeName: '省直辖县级行政单位', parentCode: 46, fullName: '海南省省直辖县级行政单位',
  }, {
    id: 176, code: 4451, codeName: '潮州市', parentCode: 44, fullName: '广东省潮州市',
  }, {
    id: 177, code: 4331, codeName: '湘西土家族苗族自治州', parentCode: 43, fullName: '湖南省湘西土家族苗族自治州',
  }, {
    id: 178, code: 4210, codeName: '荆州市', parentCode: 42, fullName: '湖北省荆州市',
  }, {
    id: 179, code: 4452, codeName: '揭阳市', parentCode: 44, fullName: '广东省揭阳市',
  }, {
    id: 180, code: 4211, codeName: '黄冈市', parentCode: 42, fullName: '湖北省黄冈市',
  }, {
    id: 181, code: 5421, codeName: '昌都地区', parentCode: 54, fullName: '西藏昌都地区',
  }, {
    id: 182, code: 4453, codeName: '云浮市', parentCode: 44, fullName: '广东省云浮市',
  }, {
    id: 183, code: 5422, codeName: '山南地区', parentCode: 54, fullName: '西藏山南地区',
  }, {
    id: 184, code: 5301, codeName: '昆明市', parentCode: 53, fullName: '云南省昆明市',
  }, {
    id: 185, code: 4212, codeName: '咸宁市', parentCode: 42, fullName: '湖北省咸宁市',
  }, {
    id: 186, code: 4202, codeName: '黄石市', parentCode: 42, fullName: '湖北省黄石市',
  }, {
    id: 187, code: 6502, codeName: '克拉玛依市', parentCode: 65, fullName: '新疆克拉玛依市',
  }, {
    id: 188, code: 6501, codeName: '乌鲁木齐市', parentCode: 65, fullName: '新疆乌鲁木齐市',
  }, {
    id: 189, code: 4203, codeName: '十堰市', parentCode: 42, fullName: '湖北省十堰市',
  }, {
    id: 190, code: 4205, codeName: '宜昌市', parentCode: 42, fullName: '湖北省宜昌市',
  }, {
    id: 191, code: 4206, codeName: '襄阳市', parentCode: 42, fullName: '湖北省襄阳市',
  }, {
    id: 192, code: 4207, codeName: '鄂州市', parentCode: 42, fullName: '湖北省鄂州市',
  }, {
    id: 193, code: 4208, codeName: '荆门市', parentCode: 42, fullName: '湖北省荆门市',
  }, {
    id: 194, code: 4209, codeName: '孝感市', parentCode: 42, fullName: '湖北省孝感市',
  }, {
    id: 195, code: 6522, codeName: '哈密地区', parentCode: 65, fullName: '新疆哈密地区',
  }, {
    id: 196, code: 4101, codeName: '郑州市', parentCode: 41, fullName: '河南省郑州市',
  }, {
    id: 197, code: 6401, codeName: '银川市', parentCode: 64, fullName: '宁夏银川市',
  }, {
    id: 198, code: 4102, codeName: '开封市', parentCode: 41, fullName: '河南省开封市',
  }, {
    id: 199, code: 6521, codeName: '克拉玛依市吐鲁番地区', parentCode: 65, fullName: '新疆克拉玛依市吐鲁番地区',
  }, {
    id: 200, code: 1503, codeName: '乌海市', parentCode: 15, fullName: '内蒙古乌海市',
  }, {
    id: 201, code: 1502, codeName: '包头市', parentCode: 15, fullName: '内蒙古包头市',
  }, {
    id: 202, code: 1501, codeName: '呼和浩特市', parentCode: 15, fullName: '内蒙古呼和浩特市',
  }, {
    id: 203, code: 4213, codeName: '随州市', parentCode: 42, fullName: '湖北省随州市',
  }, {
    id: 204, code: 5423, codeName: '日喀则地区', parentCode: 54, fullName: '西藏日喀则地区',
  }, {
    id: 205, code: 5424, codeName: '那曲地区', parentCode: 54, fullName: '西藏那曲地区',
  }, {
    id: 206, code: 5303, codeName: '曲靖市', parentCode: 53, fullName: '云南省曲靖市',
  }, {
    id: 207, code: 1509, codeName: '乌兰察布市', parentCode: 15, fullName: '内蒙古乌兰察布市',
  }, {
    id: 208, code: 5425, codeName: '阿里地区', parentCode: 54, fullName: '西藏阿里地区',
  }, {
    id: 209, code: 5304, codeName: '玉溪市', parentCode: 53, fullName: '云南省玉溪市',
  }, {
    id: 210, code: 1508, codeName: '巴彦淖尔市', parentCode: 15, fullName: '内蒙古巴彦淖尔市',
  }, {
    id: 211, code: 5426, codeName: '林芝地区', parentCode: 54, fullName: '西藏林芝地区',
  }, {
    id: 212, code: 5305, codeName: '保山市', parentCode: 53, fullName: '云南省保山市',
  }, {
    id: 213, code: 1507, codeName: '呼伦贝尔市', parentCode: 15, fullName: '内蒙古呼伦贝尔市',
  }, {
    id: 214, code: 5306, codeName: '昭通市', parentCode: 53, fullName: '云南省昭通市',
  }, {
    id: 215, code: 5307, codeName: '丽江市', parentCode: 53, fullName: '云南省丽江市',
  }, {
    id: 216, code: 1506, codeName: '鄂尔多斯市', parentCode: 15, fullName: '内蒙古鄂尔多斯市',
  }, {
    id: 217, code: 5308, codeName: '思茅市', parentCode: 53, fullName: '云南省思茅市',
  }, {
    id: 218, code: 1505, codeName: '通辽市', parentCode: 15, fullName: '内蒙古通辽市',
  }, {
    id: 219, code: 1504, codeName: '赤峰市', parentCode: 15, fullName: '内蒙古赤峰市',
  }, {
    id: 220, code: 5309, codeName: '临沧市', parentCode: 53, fullName: '云南省临沧市',
  }, {
    id: 221, code: 6531, codeName: '喀什地区', parentCode: 65, fullName: '新疆喀什地区',
  }, {
    id: 222, code: 4110, codeName: '许昌市', parentCode: 41, fullName: '河南省许昌市',
  }, {
    id: 223, code: 4111, codeName: '漯河市', parentCode: 41, fullName: '河南省漯河市',
  }, {
    id: 224, code: 6530, codeName: '克孜勒苏柯尔克孜自治州', parentCode: 65, fullName: '新疆克孜勒苏柯尔克孜自治州',
  }, {
    id: 225, code: 4112, codeName: '三门峡市', parentCode: 41, fullName: '河南省三门峡市',
  }, {
    id: 226, code: 5201, codeName: '贵阳市', parentCode: 52, fullName: '贵州省贵阳市',
  }, {
    id: 227, code: 4113, codeName: '南阳市', parentCode: 41, fullName: '河南省南阳市',
  }, {
    id: 228, code: 5323, codeName: '楚雄彝族自治州', parentCode: 53, fullName: '云南省楚雄彝族自治州',
  }, {
    id: 229, code: 6532, codeName: '和田地区', parentCode: 65, fullName: '新疆和田地区',
  }, {
    id: 230, code: 5202, codeName: '六盘水市', parentCode: 52, fullName: '贵州省六盘水市',
  }, {
    id: 231, code: 4103, codeName: '洛阳市', parentCode: 41, fullName: '河南省洛阳市',
  }, {
    id: 232, code: 6403, codeName: '吴忠市', parentCode: 64, fullName: '宁夏吴忠市',
  }, {
    id: 233, code: 6523, codeName: '昌吉回族自治州', parentCode: 65, fullName: '新疆昌吉回族自治州',
  }, {
    id: 234, code: 6402, codeName: '石嘴山市', parentCode: 64, fullName: '宁夏石嘴山市',
  }, {
    id: 235, code: 4104, codeName: '平顶山市', parentCode: 41, fullName: '河南省平顶山市',
  }, {
    id: 236, code: 4105, codeName: '安阳市', parentCode: 41, fullName: '河南省安阳市',
  }, {
    id: 237, code: 6405, codeName: '中卫市', parentCode: 64, fullName: '宁夏中卫市',
  }, {
    id: 238, code: 4106, codeName: '鹤壁市', parentCode: 41, fullName: '河南省鹤壁市',
  }, {
    id: 239, code: 6404, codeName: '固原市', parentCode: 64, fullName: '宁夏固原市',
  }, {
    id: 240, code: 4228, codeName: '恩施土家族苗族自治州', parentCode: 42, fullName: '湖北省恩施土家族苗族自治州',
  }, {
    id: 241, code: 6528, codeName: '巴音郭楞蒙古自治州', parentCode: 65, fullName: '新疆巴音郭楞蒙古自治州',
  }, {
    id: 242, code: 4107, codeName: '新乡市', parentCode: 41, fullName: '河南省新乡市',
  }, {
    id: 243, code: 4108, codeName: '焦作市', parentCode: 41, fullName: '河南省焦作市',
  }, {
    id: 244, code: 6527, codeName: '博尔塔拉蒙古自治州', parentCode: 65, fullName: '新疆博尔塔拉蒙古自治州',
  }, {
    id: 245, code: 4109, codeName: '濮阳市', parentCode: 41, fullName: '河南省濮阳市',
  }, {
    id: 246, code: 6529, codeName: '阿克苏地区', parentCode: 65, fullName: '新疆阿克苏地区',
  }, {
    id: 247, code: 6540, codeName: '伊犁哈萨克自治州', parentCode: 65, fullName: '新疆伊犁哈萨克自治州',
  }, {
    id: 248, code: 6542, codeName: '塔城地区', parentCode: 65, fullName: '新疆塔城地区',
  }, {
    id: 249, code: 5331, codeName: '德宏傣族景颇族自治州', parentCode: 53, fullName: '云南省德宏傣族景颇族自治州',
  }, {
    id: 250, code: 5333, codeName: '怒江傈僳族自治州', parentCode: 53, fullName: '云南省怒江傈僳族自治州',
  }, {
    id: 251, code: 5334, codeName: '迪庆藏族自治州', parentCode: 53, fullName: '云南省迪庆藏族自治州',
  }, {
    id: 252, code: 6543, codeName: '阿勒泰地区', parentCode: 65, fullName: '新疆阿勒泰地区',
  }, {
    id: 253, code: 6301, codeName: '西宁市', parentCode: 63, fullName: '青海省西宁市',
  }, {
    id: 254, code: 1525, codeName: '锡林郭勒盟', parentCode: 15, fullName: '内蒙古锡林郭勒盟',
  }, {
    id: 255, code: 1404, codeName: '长治市', parentCode: 14, fullName: '山西省长治市',
  }, {
    id: 256, code: 3704, codeName: '枣庄市', parentCode: 37, fullName: '山东省枣庄市',
  }, {
    id: 257, code: 3705, codeName: '东营市', parentCode: 37, fullName: '山东省东营市',
  }, {
    id: 258, code: 1403, codeName: '阳泉市', parentCode: 14, fullName: '山西省阳泉市',
  }, {
    id: 259, code: 1402, codeName: '大同市', parentCode: 14, fullName: '山西省大同市',
  }, {
    id: 260, code: 3706, codeName: '烟台市', parentCode: 37, fullName: '山东省烟台市',
  }, {
    id: 261, code: 1522, codeName: '兴安盟', parentCode: 15, fullName: '内蒙古兴安盟',
  }, {
    id: 262, code: 1401, codeName: '太原市', parentCode: 14, fullName: '山西省太原市',
  }, {
    id: 263, code: 3707, codeName: '潍坊市', parentCode: 37, fullName: '山东省潍坊市',
  }, {
    id: 264, code: 3708, codeName: '济宁市', parentCode: 37, fullName: '山东省济宁市',
  }, {
    id: 265, code: 3709, codeName: '泰安市', parentCode: 37, fullName: '山东省泰安市',
  }, {
    id: 266, code: 4114, codeName: '商丘市', parentCode: 41, fullName: '河南省商丘市',
  }, {
    id: 267, code: 5203, codeName: '遵义市', parentCode: 52, fullName: '贵州省遵义市',
  }, {
    id: 268, code: 5204, codeName: '安顺市', parentCode: 52, fullName: '贵州省安顺市',
  }, {
    id: 269, code: 4115, codeName: '信阳市', parentCode: 41, fullName: '河南省信阳市',
  }, {
    id: 270, code: 5325, codeName: '红河哈尼族彝族自治州', parentCode: 53, fullName: '云南省红河哈尼族彝族自治州',
  }, {
    id: 271, code: 4116, codeName: '周口市', parentCode: 41, fullName: '河南省周口市',
  }, {
    id: 272, code: 5326, codeName: '文山壮族苗族自治州', parentCode: 53, fullName: '云南省文山壮族苗族自治州',
  }, {
    id: 273, code: 1409, codeName: '忻州市', parentCode: 14, fullName: '山西省忻州市',
  }, {
    id: 274, code: 4117, codeName: '驻马店市', parentCode: 41, fullName: '河南省驻马店市',
  }, {
    id: 275, code: 1529, codeName: '阿拉善盟', parentCode: 15, fullName: '内蒙古阿拉善盟',
  }, {
    id: 276, code: 5328, codeName: '西双版纳傣族自治州', parentCode: 53, fullName: '云南省西双版纳傣族自治州',
  }, {
    id: 277, code: 1408, codeName: '运城市', parentCode: 14, fullName: '山西省运城市',
  }, {
    id: 278, code: 5329, codeName: '大理白族自治州', parentCode: 53, fullName: '云南省大理白族自治州',
  }, {
    id: 279, code: 1407, codeName: '晋中市', parentCode: 14, fullName: '山西省晋中市',
  }, {
    id: 280, code: 3701, codeName: '济南市', parentCode: 37, fullName: '山东省济南市',
  }, {
    id: 281, code: 3702, codeName: '青岛市', parentCode: 37, fullName: '山东省青岛市',
  }, {
    id: 282, code: 1406, codeName: '朔州市', parentCode: 14, fullName: '山西省朔州市',
  }, {
    id: 283, code: 1405, codeName: '晋城市', parentCode: 14, fullName: '山西省晋城市',
  }, {
    id: 284, code: 3703, codeName: '淄博市', parentCode: 37, fullName: '山东省淄博市',
  }, {
    id: 285, code: 1526, codeName: '乌兰察布盟', parentCode: 15, fullName: '内蒙古乌兰察布盟',
  }, {
    id: 286, code: 5222, codeName: '铜仁地区', parentCode: 52, fullName: '贵州省铜仁地区',
  }, {
    id: 287, code: 5101, codeName: '成都市', parentCode: 51, fullName: '四川省成都市',
  }, {
    id: 288, code: 5223, codeName: '黔西南布依族苗族自治州', parentCode: 52, fullName: '贵州省黔西南布依族苗族自治州',
  }, {
    id: 289, code: 5224, codeName: '毕节地区', parentCode: 52, fullName: '贵州省毕节地区',
  }, {
    id: 290, code: 5103, codeName: '自贡市', parentCode: 51, fullName: '四川省自贡市',
  }, {
    id: 291, code: 3715, codeName: '聊城市', parentCode: 37, fullName: '山东省聊城市',
  }, {
    id: 292, code: 3716, codeName: '滨州市', parentCode: 37, fullName: '山东省滨州市',
  }, {
    id: 293, code: 3717, codeName: '菏泽市', parentCode: 37, fullName: '山东省菏泽市',
  }, {
    id: 294, code: 1411, codeName: '吕梁市', parentCode: 14, fullName: '山西省吕梁市',
  }, {
    id: 295, code: 1410, codeName: '临汾市', parentCode: 14, fullName: '山西省临汾市',
  }, {
    id: 296, code: 3710, codeName: '威海市', parentCode: 37, fullName: '山东省威海市',
  }, {
    id: 297, code: 3711, codeName: '日照市', parentCode: 37, fullName: '山东省日照市',
  }, {
    id: 298, code: 3712, codeName: '莱芜市', parentCode: 37, fullName: '山东省莱芜市',
  }, {
    id: 299, code: 3713, codeName: '临沂市', parentCode: 37, fullName: '山东省临沂市',
  }, {
    id: 300, code: 3714, codeName: '德州市', parentCode: 37, fullName: '山东省德州市',
  }, {
    id: 301, code: 5110, codeName: '内江市', parentCode: 51, fullName: '四川省内江市',
  }, {
    id: 302, code: 5111, codeName: '乐山市', parentCode: 51, fullName: '四川省乐山市',
  }, {
    id: 303, code: 6201, codeName: '兰州市', parentCode: 62, fullName: '甘肃省兰州市',
  }, {
    id: 304, code: 6322, codeName: '海北藏族自治州', parentCode: 63, fullName: '青海省海北藏族自治州',
  }, {
    id: 305, code: 6321, codeName: '海东地区', parentCode: 63, fullName: '青海省海东地区',
  }, {
    id: 306, code: 5113, codeName: '南充市', parentCode: 51, fullName: '四川省南充市',
  }, {
    id: 307, code: 6203, codeName: '金昌市', parentCode: 62, fullName: '甘肃省金昌市',
  }, {
    id: 308, code: 5114, codeName: '眉山市', parentCode: 51, fullName: '四川省眉山市',
  }, {
    id: 309, code: 6323, codeName: '黄南藏族自治州', parentCode: 63, fullName: '青海省黄南藏族自治州',
  }, {
    id: 310, code: 6202, codeName: '嘉峪关市', parentCode: 62, fullName: '甘肃省嘉峪关市',
  }, {
    id: 311, code: 1305, codeName: '邢台市', parentCode: 13, fullName: '河北省邢台市',
  }, {
    id: 312, code: 3604, codeName: '九江市', parentCode: 36, fullName: '江西省九江市',
  }, {
    id: 313, code: 1304, codeName: '邯郸市', parentCode: 13, fullName: '河北省邯郸市',
  }, {
    id: 314, code: 3603, codeName: '萍乡市', parentCode: 36, fullName: '江西省萍乡市',
  }, {
    id: 315, code: 1303, codeName: '秦皇岛市', parentCode: 13, fullName: '河北省秦皇岛市',
  }, {
    id: 316, code: 3602, codeName: '景德镇市', parentCode: 36, fullName: '江西省景德镇市',
  }, {
    id: 317, code: 3601, codeName: '南昌市', parentCode: 36, fullName: '江西省南昌市',
  }, {
    id: 318, code: 1302, codeName: '唐山市', parentCode: 13, fullName: '河北省唐山市',
  }, {
    id: 319, code: 1301, codeName: '石家庄市', parentCode: 13, fullName: '河北省石家庄市',
  }, {
    id: 320, code: 5104, codeName: '攀枝花市', parentCode: 51, fullName: '四川省攀枝花市',
  }, {
    id: 321, code: 5226, codeName: '黔东南苗族侗族自治州', parentCode: 52, fullName: '贵州省黔东南苗族侗族自治州',
  }, {
    id: 322, code: 5105, codeName: '泸州市', parentCode: 51, fullName: '四川省泸州市',
  }, {
    id: 323, code: 5106, codeName: '德阳市', parentCode: 51, fullName: '四川省德阳市',
  }, {
    id: 324, code: 5227, codeName: '黔南布依族苗族自治州', parentCode: 52, fullName: '贵州省黔南布依族苗族自治州',
  }, {
    id: 325, code: 3609, codeName: '宜春市', parentCode: 36, fullName: '江西省宜春市',
  }, {
    id: 326, code: 5107, codeName: '绵阳市', parentCode: 51, fullName: '四川省绵阳市',
  }, {
    id: 327, code: 1309, codeName: '沧州市', parentCode: 13, fullName: '河北省沧州市',
  }, {
    id: 328, code: 5108, codeName: '广元市', parentCode: 51, fullName: '四川省广元市',
  }, {
    id: 329, code: 3608, codeName: '吉安市', parentCode: 36, fullName: '江西省吉安市',
  }, {
    id: 330, code: 3607, codeName: '赣州市', parentCode: 36, fullName: '江西省赣州市',
  }, {
    id: 331, code: 5109, codeName: '遂宁市', parentCode: 51, fullName: '四川省遂宁市',
  }, {
    id: 332, code: 1308, codeName: '承德市', parentCode: 13, fullName: '河北省承德市',
  }, {
    id: 333, code: 1307, codeName: '张家口市', parentCode: 13, fullName: '河北省张家口市',
  }, {
    id: 334, code: 3606, codeName: '鹰潭市', parentCode: 36, fullName: '江西省鹰潭市',
  }, {
    id: 335, code: 1306, codeName: '保定市', parentCode: 13, fullName: '河北省保定市',
  }, {
    id: 336, code: 3605, codeName: '新余市', parentCode: 36, fullName: '江西省新余市',
  }, {
    id: 337, code: 5120, codeName: '资阳市', parentCode: 51, fullName: '四川省资阳市',
  }, {
    id: 338, code: 6210, codeName: '庆阳市', parentCode: 62, fullName: '甘肃省庆阳市',
  }, {
    id: 339, code: 6212, codeName: '陇南市', parentCode: 62, fullName: '甘肃省陇南市',
  }, {
    id: 340, code: 5001, codeName: '市辖区', parentCode: 50, fullName: '重庆市市辖区',
  }, {
    id: 341, code: 5002, codeName: '重庆市县', parentCode: 50, fullName: '重庆市县',
  }, {
    id: 342, code: 6211, codeName: '定西市', parentCode: 62, fullName: '甘肃省定西市',
  }, {
    id: 343, code: 5003, codeName: '重庆市', parentCode: 50, fullName: '重庆市',
  }, {
    id: 344, code: 3611, codeName: '上饶市', parentCode: 36, fullName: '江西省上饶市',
  }, {
    id: 345, code: 1311, codeName: '衡水市', parentCode: 13, fullName: '河北省衡水市',
  }, {
    id: 346, code: 3610, codeName: '抚州市', parentCode: 36, fullName: '江西省抚州市',
  }, {
    id: 347, code: 1310, codeName: '廊坊市', parentCode: 13, fullName: '河北省廊坊市',
  }, {
    id: 348, code: 6326, codeName: '果洛藏族自治州', parentCode: 63, fullName: '青海省果洛藏族自治州',
  }, {
    id: 349, code: 5115, codeName: '宜宾市', parentCode: 51, fullName: '四川省宜宾市',
  }, {
    id: 350, code: 6205, codeName: '天水市', parentCode: 62, fullName: '甘肃省天水市',
  }, {
    id: 351, code: 5116, codeName: '广安市', parentCode: 51, fullName: '四川省广安市',
  }, {
    id: 352, code: 3730, codeName: '胜利油田', parentCode: 37, fullName: '山东省胜利油田',
  }, {
    id: 353, code: 6325, codeName: '海南藏族自治州', parentCode: 63, fullName: '青海省海南藏族自治州',
  }, {
    id: 354, code: 6204, codeName: '白银市', parentCode: 62, fullName: '甘肃省白银市',
  }, {
    id: 355, code: 5117, codeName: '达州市', parentCode: 51, fullName: '四川省达州市',
  }, {
    id: 356, code: 6207, codeName: '张掖市', parentCode: 62, fullName: '甘肃省张掖市',
  }, {
    id: 357, code: 6328, codeName: '海西蒙古族藏族自治州', parentCode: 63, fullName: '青海省海西蒙古族藏族自治州',
  }, {
    id: 358, code: 6327, codeName: '玉树藏族自治州', parentCode: 63, fullName: '青海省玉树藏族自治州',
  }, {
    id: 359, code: 6206, codeName: '武威市', parentCode: 62, fullName: '甘肃省武威市',
  }, {
    id: 360, code: 5118, codeName: '雅安市', parentCode: 51, fullName: '四川省雅安市',
  }, {
    id: 361, code: 5119, codeName: '巴中市', parentCode: 51, fullName: '四川省巴中市',
  }, {
    id: 362, code: 6209, codeName: '酒泉市', parentCode: 62, fullName: '甘肃省酒泉市',
  }, {
    id: 363, code: 6208, codeName: '平凉市', parentCode: 62, fullName: '甘肃省平凉市',
  }, {
    id: 364, code: 5132, codeName: '阿坝藏族羌族自治州', parentCode: 51, fullName: '四川省阿坝藏族羌族自治州',
  }, {
    id: 365, code: 5133, codeName: '甘孜藏族自治州', parentCode: 51, fullName: '四川省甘孜藏族自治州',
  }, {
    id: 366, code: 6102, codeName: '铜川市', parentCode: 61, fullName: '陕西省铜川市',
  }, {
    id: 367, code: 6101, codeName: '西安市', parentCode: 61, fullName: '陕西省西安市',
  }, {
    id: 368, code: 5134, codeName: '凉山彝族自治州', parentCode: 51, fullName: '四川省凉山彝族自治州',
  }, {
    id: 369, code: 6104, codeName: '咸阳市', parentCode: 61, fullName: '陕西省咸阳市',
  }, {
    id: 370, code: 6103, codeName: '宝鸡市', parentCode: 61, fullName: '陕西省宝鸡市',
  }, {
    id: 371, code: 3505, codeName: '泉州市', parentCode: 35, fullName: '福建省泉州市',
  }, {
    id: 372, code: 3504, codeName: '三明市', parentCode: 35, fullName: '福建省三明市',
  }, {
    id: 373, code: 3503, codeName: '莆田市', parentCode: 35, fullName: '福建省莆田市',
  }, {
    id: 374, code: 3502, codeName: '厦门市', parentCode: 35, fullName: '福建省厦门市',
  }, {
    id: 375, code: 1202, codeName: '天津市县', parentCode: 12, fullName: '天津市县',
  }, {
    id: 376, code: 3501, codeName: '福州市', parentCode: 35, fullName: '福建省福州市',
  }, {
    id: 377, code: 1201, codeName: '市辖区', parentCode: 12, fullName: '天津市市辖区',
  }, {
    id: 378, code: 3509, codeName: '宁德市', parentCode: 35, fullName: '福建省宁德市',
  }, {
    id: 379, code: 3508, codeName: '龙岩市', parentCode: 35, fullName: '福建省龙岩市',
  }, {
    id: 380, code: 3507, codeName: '南平市', parentCode: 35, fullName: '福建省南平市',
  }, {
    id: 381, code: 3506, codeName: '漳州市', parentCode: 35, fullName: '福建省漳州市',
  }, {
    id: 382, code: 542222, codeName: '西藏扎囊县', parentCode: 5422, fullName: '西藏山南地区西藏扎囊县',
  }, {
    id: 383, code: 513334, codeName: '理塘县', parentCode: 5133, fullName: '四川省甘孜藏族自治州理塘县',
  }, {
    id: 384, code: 542221, codeName: '西藏乃东县', parentCode: 5422, fullName: '西藏山南地区西藏乃东县',
  }, {
    id: 385, code: 513333, codeName: '色达县', parentCode: 5133, fullName: '四川省甘孜藏族自治州色达县',
  }, {
    id: 386, code: 513332, codeName: '石渠县', parentCode: 5133, fullName: '四川省甘孜藏族自治州石渠县',
  }, {
    id: 387, code: 513331, codeName: '白玉县', parentCode: 5133, fullName: '四川省甘孜藏族自治州白玉县',
  }, {
    id: 388, code: 513330, codeName: '德格县', parentCode: 5133, fullName: '四川省甘孜藏族自治州德格县',
  }, {
    id: 389, code: 440308, codeName: '盐田区', parentCode: 4403, fullName: '广东省深圳市盐田区',
  }, {
    id: 390, code: 440307, codeName: '龙岗区', parentCode: 4403, fullName: '广东省深圳市龙岗区',
  }, {
    id: 391, code: 440306, codeName: '宝安区', parentCode: 4403, fullName: '广东省深圳市宝安区',
  }, {
    id: 392, code: 440305, codeName: '南山区', parentCode: 4403, fullName: '广东省深圳市南山区',
  }, {
    id: 393, code: 440304, codeName: '福田区', parentCode: 4403, fullName: '广东省深圳市福田区',
  }, {
    id: 394, code: 440303, codeName: '罗湖区', parentCode: 4403, fullName: '广东省深圳市罗湖区',
  }, {
    id: 395, code: 410329, codeName: '伊川县', parentCode: 4103, fullName: '河南省洛阳市伊川县',
  }, {
    id: 396, code: 440301, codeName: '市辖区', parentCode: 4403, fullName: '广东省深圳市市辖区',
  }, {
    id: 397, code: 140581, codeName: '高平市', parentCode: 1405, fullName: '山西省晋城市高平市',
  }, {
    id: 398, code: 410328, codeName: '洛宁县', parentCode: 4103, fullName: '河南省洛阳市洛宁县',
  }, {
    id: 399, code: 513329, codeName: '新龙县', parentCode: 5133, fullName: '四川省甘孜藏族自治州新龙县',
  }, {
    id: 400, code: 410327, codeName: '宜阳县', parentCode: 4103, fullName: '河南省洛阳市宜阳县',
  }, {
    id: 401, code: 513328, codeName: '甘孜县', parentCode: 5133, fullName: '四川省甘孜藏族自治州甘孜县',
  }, {
    id: 402, code: 410326, codeName: '汝阳县', parentCode: 4103, fullName: '河南省洛阳市汝阳县',
  }, {
    id: 403, code: 513327, codeName: '炉霍县', parentCode: 5133, fullName: '四川省甘孜藏族自治州炉霍县',
  }, {
    id: 404, code: 410325, codeName: '嵩县', parentCode: 4103, fullName: '河南省洛阳市嵩县',
  }, {
    id: 405, code: 513326, codeName: '道孚县', parentCode: 5133, fullName: '四川省甘孜藏族自治州道孚县',
  }, {
    id: 406, code: 410324, codeName: '栾川县', parentCode: 4103, fullName: '河南省洛阳市栾川县',
  }, {
    id: 407, code: 513325, codeName: '雅江县', parentCode: 5133, fullName: '四川省甘孜藏族自治州雅江县',
  }, {
    id: 408, code: 410323, codeName: '新安县', parentCode: 4103, fullName: '河南省洛阳市新安县',
  }, {
    id: 409, code: 513324, codeName: '九龙县', parentCode: 5133, fullName: '四川省甘孜藏族自治州九龙县',
  }, {
    id: 410, code: 410322, codeName: '孟津县', parentCode: 4103, fullName: '河南省洛阳市孟津县',
  }, {
    id: 411, code: 513323, codeName: '丹巴县', parentCode: 5133, fullName: '四川省甘孜藏族自治州丹巴县',
  }, {
    id: 412, code: 513322, codeName: '泸定县', parentCode: 5133, fullName: '四川省甘孜藏族自治州泸定县',
  }, {
    id: 413, code: 513321, codeName: '康定县', parentCode: 5133, fullName: '四川省甘孜藏族自治州康定县',
  }, {
    id: 414, code: 130108, codeName: '裕华区', parentCode: 1301, fullName: '河北省石家庄市裕华区',
  }, {
    id: 415, code: 130107, codeName: '井陉矿区', parentCode: 1301, fullName: '河北省石家庄市井陉矿区',
  }, {
    id: 416, code: 130105, codeName: '新华区', parentCode: 1301, fullName: '河北省石家庄市新华区',
  }, {
    id: 417, code: 130104, codeName: '桥西区', parentCode: 1301, fullName: '河北省石家庄市桥西区',
  }, {
    id: 418, code: 130103, codeName: '桥东区', parentCode: 1301, fullName: '河北省石家庄市桥东区',
  }, {
    id: 419, code: 130102, codeName: '长安区', parentCode: 1301, fullName: '河北省石家庄市长安区',
  }, {
    id: 420, code: 130101, codeName: '市辖区', parentCode: 1301, fullName: '河北省石家庄市市辖区',
  }, {
    id: 421, code: 152502, codeName: '锡林浩特市', parentCode: 1525, fullName: '内蒙古锡林郭勒盟内蒙古锡林浩特市',
  }, {
    id: 422, code: 152501, codeName: '二连浩特市', parentCode: 1525, fullName: '内蒙古锡林郭勒盟内蒙古二连浩特市',
  }, {
    id: 423, code: 411403, codeName: '睢阳区', parentCode: 4114, fullName: '河南省商丘市睢阳区',
  }, {
    id: 424, code: 411402, codeName: '梁园区', parentCode: 4114, fullName: '河南省商丘市梁园区',
  }, {
    id: 425, code: 411401, codeName: '市辖区', parentCode: 4114, fullName: '河南省商丘市市辖区',
  }, {
    id: 426, code: 330803, codeName: '衢江区', parentCode: 3308, fullName: '浙江省衢州市衢江区',
  }, {
    id: 427, code: 330802, codeName: '柯城区', parentCode: 3308, fullName: '浙江省衢州市柯城区',
  }, {
    id: 428, code: 330801, codeName: '市辖区', parentCode: 3308, fullName: '浙江省衢州市市辖区',
  }, {
    id: 429, code: 511133, codeName: '马边彝族自治县', parentCode: 5111, fullName: '四川省乐山市马边彝族自治县',
  }, {
    id: 430, code: 511132, codeName: '峨边彝族自治县', parentCode: 5111, fullName: '四川省乐山市峨边彝族自治县',
  }, {
    id: 431, code: 410307, codeName: '洛龙区', parentCode: 4103, fullName: '河南省洛阳市洛龙区',
  }, {
    id: 432, code: 410306, codeName: '吉利区', parentCode: 4103, fullName: '河南省洛阳市吉利区',
  }, {
    id: 433, code: 410305, codeName: '涧西区', parentCode: 4103, fullName: '河南省洛阳市涧西区',
  }, {
    id: 434, code: 410304, codeName: '廛河回族区', parentCode: 4103, fullName: '河南省洛阳市廛河回族区',
  }, {
    id: 435, code: 410303, codeName: '西工区', parentCode: 4103, fullName: '河南省洛阳市西工区',
  }, {
    id: 436, code: 410302, codeName: '老城区', parentCode: 4103, fullName: '河南省洛阳市老城区',
  }, {
    id: 437, code: 410301, codeName: '市辖区', parentCode: 4103, fullName: '河南省洛阳市市辖区',
  }, {
    id: 438, code: 511129, codeName: '沐川县', parentCode: 5111, fullName: '四川省乐山市沐川县',
  }, {
    id: 439, code: 511126, codeName: '夹江县', parentCode: 5111, fullName: '四川省乐山市夹江县',
  }, {
    id: 440, code: 430529, codeName: '城步苗族自治县', parentCode: 4305, fullName: '湖南省邵阳市城步苗族自治县',
  }, {
    id: 441, code: 430528, codeName: '新宁县', parentCode: 4305, fullName: '湖南省邵阳市新宁县',
  }, {
    id: 442, code: 511124, codeName: '井研县', parentCode: 5111, fullName: '四川省乐山市井研县',
  }, {
    id: 443, code: 430527, codeName: '绥宁县', parentCode: 4305, fullName: '湖南省邵阳市绥宁县',
  }, {
    id: 444, code: 511123, codeName: '犍为县', parentCode: 5111, fullName: '四川省乐山市犍为县',
  }, {
    id: 445, code: 430525, codeName: '洞口县', parentCode: 4305, fullName: '湖南省邵阳市洞口县',
  }, {
    id: 446, code: 430524, codeName: '隆回县', parentCode: 4305, fullName: '湖南省邵阳市隆回县',
  }, {
    id: 447, code: 430523, codeName: '邵阳县', parentCode: 4305, fullName: '湖南省邵阳市邵阳县',
  }, {
    id: 448, code: 430522, codeName: '新邵县', parentCode: 4305, fullName: '湖南省邵阳市新邵县',
  }, {
    id: 449, code: 430521, codeName: '邵东县', parentCode: 4305, fullName: '湖南省邵阳市邵东县',
  }, {
    id: 450, code: 150304, codeName: '乌达区', parentCode: 1503, fullName: '内蒙古乌海市乌达区',
  }, {
    id: 451, code: 150303, codeName: '海南区', parentCode: 1503, fullName: '内蒙古乌海市海南区',
  }, {
    id: 452, code: 150302, codeName: '海勃湾区', parentCode: 1503, fullName: '内蒙古乌海市海勃湾区',
  }, {
    id: 453, code: 150301, codeName: '市辖区', parentCode: 1503, fullName: '内蒙古乌海市市辖区',
  }, {
    id: 454, code: 511113, codeName: '金口河区', parentCode: 5111, fullName: '四川省乐山市金口河区',
  }, {
    id: 455, code: 511112, codeName: '五通桥区', parentCode: 5111, fullName: '四川省乐山市五通桥区',
  }, {
    id: 456, code: 511111, codeName: '沙湾区', parentCode: 5111, fullName: '四川省乐山市沙湾区',
  }, {
    id: 457, code: 371083, codeName: '乳山市', parentCode: 3710, fullName: '山东省威海市乳山市',
  }, {
    id: 458, code: 371082, codeName: '荣成市', parentCode: 3710, fullName: '山东省威海市荣成市',
  }, {
    id: 459, code: 371081, codeName: '文登市', parentCode: 3710, fullName: '山东省威海市文登市',
  }, {
    id: 460, code: 430511, codeName: '北塔区', parentCode: 4305, fullName: '湖南省邵阳市北塔区',
  }, {
    id: 461, code: 440983, codeName: '信宜市', parentCode: 4409, fullName: '广东省茂名市信宜市',
  }, {
    id: 462, code: 440982, codeName: '化州市', parentCode: 4409, fullName: '广东省茂名市化州市',
  }, {
    id: 463, code: 440981, codeName: '高州市', parentCode: 4409, fullName: '广东省茂名市高州市',
  }, {
    id: 464, code: 211382, codeName: '凌源市', parentCode: 2113, fullName: '辽宁省朝阳市凌源市',
  }, {
    id: 465, code: 511102, codeName: '市中区', parentCode: 5111, fullName: '四川省乐山市市中区',
  }, {
    id: 466, code: 211381, codeName: '北票市', parentCode: 2113, fullName: '辽宁省朝阳市北票市',
  }, {
    id: 467, code: 511101, codeName: '市辖区', parentCode: 5111, fullName: '四川省乐山市市辖区',
  }, {
    id: 468, code: 430503, codeName: '大祥区', parentCode: 4305, fullName: '湖南省邵阳市大祥区',
  }, {
    id: 469, code: 430502, codeName: '双清区', parentCode: 4305, fullName: '湖南省邵阳市双清区',
  }, {
    id: 470, code: 430501, codeName: '市辖区', parentCode: 4305, fullName: '湖南省邵阳市市辖区',
  }, {
    id: 471, code: 450722, codeName: '浦北县', parentCode: 4507, fullName: '广西钦州市广西浦北县',
  }, {
    id: 472, code: 450721, codeName: '灵山县', parentCode: 4507, fullName: '广西钦州市广西灵山县',
  }, {
    id: 473, code: 210283, codeName: '庄河市', parentCode: 2102, fullName: '辽宁省大连市庄河市',
  }, {
    id: 474, code: 210282, codeName: '普兰店市', parentCode: 2102, fullName: '辽宁省大连市普兰店市',
  }, {
    id: 475, code: 210281, codeName: '瓦房店市', parentCode: 2102, fullName: '辽宁省大连市瓦房店市',
  }, {
    id: 476, code: 140525, codeName: '泽州县', parentCode: 1405, fullName: '山西省晋城市泽州县',
  }, {
    id: 477, code: 140524, codeName: '陵川县', parentCode: 1405, fullName: '山西省晋城市陵川县',
  }, {
    id: 478, code: 140522, codeName: '阳城县', parentCode: 1405, fullName: '山西省晋城市阳城县',
  }, {
    id: 479, code: 140521, codeName: '沁水县', parentCode: 1405, fullName: '山西省晋城市沁水县',
  }, {
    id: 480, code: 500243, codeName: '彭水苗族土家族自治县', parentCode: 5002, fullName: '重庆市县彭水苗族土家族自治县',
  }, {
    id: 481, code: 500242, codeName: '酉阳土家族苗族自治县', parentCode: 5002, fullName: '重庆市县酉阳土家族苗族自治县',
  }, {
    id: 482, code: 500241, codeName: '秀山土家族苗族自治县', parentCode: 5002, fullName: '重庆市县秀山土家族苗族自治县',
  }, {
    id: 483, code: 500240, codeName: '石柱土家族自治县', parentCode: 5002, fullName: '重庆市县石柱土家族自治县',
  }, {
    id: 484, code: 450703, codeName: '钦北区', parentCode: 4507, fullName: '广西钦州市钦北区',
  }, {
    id: 485, code: 450702, codeName: '钦南区', parentCode: 4507, fullName: '广西钦州市钦南区',
  }, {
    id: 486, code: 450701, codeName: '市辖区', parentCode: 4507, fullName: '广西钦州市市辖区',
  }, {
    id: 487, code: 150981, codeName: '丰镇市', parentCode: 1509, fullName: '内蒙古乌兰察布市内蒙古丰镇市',
  }, {
    id: 488, code: 632128, codeName: '循化撒拉族自治县', parentCode: 6321, fullName: '青海省海东地区循化撒拉族自治县',
  }, {
    id: 489, code: 632127, codeName: '化隆回族自治县', parentCode: 6321, fullName: '青海省海东地区化隆回族自治县',
  }, {
    id: 490, code: 500238, codeName: '巫溪县', parentCode: 5002, fullName: '重庆市县巫溪县',
  }, {
    id: 491, code: 632126, codeName: '互助土族自治县', parentCode: 6321, fullName: '青海省海东地区互助土族自治县',
  }, {
    id: 492, code: 500237, codeName: '巫山县', parentCode: 5002, fullName: '重庆市县巫山县',
  }, {
    id: 493, code: 500236, codeName: '奉节县', parentCode: 5002, fullName: '重庆市县奉节县',
  }, {
    id: 494, code: 500235, codeName: '云阳县', parentCode: 5002, fullName: '重庆市县云阳县',
  }, {
    id: 495, code: 632123, codeName: '乐都县', parentCode: 6321, fullName: '青海省海东地区乐都县',
  }, {
    id: 496, code: 500234, codeName: '开县', parentCode: 5002, fullName: '重庆市县开县',
  }, {
    id: 497, code: 632122, codeName: '民和回族土族自治县', parentCode: 6321, fullName: '青海省海东地区民和回族土族自治县',
  }, {
    id: 498, code: 500233, codeName: '忠县', parentCode: 5002, fullName: '重庆市县忠县',
  }, {
    id: 499, code: 632121, codeName: '平安县', parentCode: 6321, fullName: '青海省海东地区平安县',
  }, {
    id: 500, code: 500232, codeName: '武隆县', parentCode: 5002, fullName: '重庆市县武隆县',
  }, {
    id: 501, code: 500231, codeName: '垫江县', parentCode: 5002, fullName: '重庆市县垫江县',
  }, {
    id: 502, code: 522636, codeName: '丹寨县', parentCode: 5226, fullName: '贵州省黔东南苗族侗族自治州丹寨县',
  }, {
    id: 503, code: 500230, codeName: '丰都县', parentCode: 5002, fullName: '重庆市县丰都县',
  }, {
    id: 504, code: 522635, codeName: '麻江县', parentCode: 5226, fullName: '贵州省黔东南苗族侗族自治州麻江县',
  }, {
    id: 505, code: 522634, codeName: '雷山县', parentCode: 5226, fullName: '贵州省黔东南苗族侗族自治州雷山县',
  }, {
    id: 506, code: 522633, codeName: '从江县', parentCode: 5226, fullName: '贵州省黔东南苗族侗族自治州从江县',
  }, {
    id: 507, code: 522632, codeName: '榕江县', parentCode: 5226, fullName: '贵州省黔东南苗族侗族自治州榕江县',
  }, {
    id: 508, code: 522631, codeName: '黎平县', parentCode: 5226, fullName: '贵州省黔东南苗族侗族自治州黎平县',
  }, {
    id: 509, code: 522630, codeName: '台江县', parentCode: 5226, fullName: '贵州省黔东南苗族侗族自治州台江县',
  }, {
    id: 510, code: 140502, codeName: '城区', parentCode: 1405, fullName: '山西省晋城市城区',
  }, {
    id: 511, code: 140501, codeName: '市辖区', parentCode: 1405, fullName: '山西省晋城市市辖区',
  }, {
    id: 512, code: 500229, codeName: '城口县', parentCode: 5002, fullName: '重庆市县城口县',
  }, {
    id: 513, code: 500228, codeName: '梁平县', parentCode: 5002, fullName: '重庆市县梁平县',
  }, {
    id: 514, code: 500227, codeName: '璧山县', parentCode: 5002, fullName: '重庆市县璧山县',
  }, {
    id: 515, code: 500226, codeName: '荣昌县', parentCode: 5002, fullName: '重庆市县荣昌县',
  }, {
    id: 516, code: 500225, codeName: '大足县', parentCode: 5002, fullName: '重庆市县大足县',
  }, {
    id: 517, code: 500224, codeName: '铜梁县', parentCode: 5002, fullName: '重庆市县铜梁县',
  }, {
    id: 518, code: 522629, codeName: '剑河县', parentCode: 5226, fullName: '贵州省黔东南苗族侗族自治州剑河县',
  }, {
    id: 519, code: 500223, codeName: '潼南县', parentCode: 5002, fullName: '重庆市县潼南县',
  }, {
    id: 520, code: 522628, codeName: '锦屏县', parentCode: 5226, fullName: '贵州省黔东南苗族侗族自治州锦屏县',
  }, {
    id: 521, code: 500222, codeName: '綦江县', parentCode: 5002, fullName: '重庆市县綦江县',
  }, {
    id: 522, code: 522627, codeName: '天柱县', parentCode: 5226, fullName: '贵州省黔东南苗族侗族自治州天柱县',
  }, {
    id: 523, code: 522626, codeName: '岑巩县', parentCode: 5226, fullName: '贵州省黔东南苗族侗族自治州岑巩县',
  }, {
    id: 524, code: 522625, codeName: '镇远县', parentCode: 5226, fullName: '贵州省黔东南苗族侗族自治州镇远县',
  }, {
    id: 525, code: 522624, codeName: '三穗县', parentCode: 5226, fullName: '贵州省黔东南苗族侗族自治州三穗县',
  }, {
    id: 526, code: 522623, codeName: '施秉县', parentCode: 5226, fullName: '贵州省黔东南苗族侗族自治州施秉县',
  }, {
    id: 527, code: 522622, codeName: '黄平县', parentCode: 5226, fullName: '贵州省黔东南苗族侗族自治州黄平县',
  }, {
    id: 528, code: 511781, codeName: '万源市', parentCode: 5117, fullName: '四川省达州市万源市',
  }, {
    id: 529, code: 420704, codeName: '鄂城区', parentCode: 4207, fullName: '湖北省鄂州市鄂城区',
  }, {
    id: 530, code: 420703, codeName: '华容区', parentCode: 4207, fullName: '湖北省鄂州市华容区',
  }, {
    id: 531, code: 420702, codeName: '梁子湖区', parentCode: 4207, fullName: '湖北省鄂州市梁子湖区',
  }, {
    id: 532, code: 420701, codeName: '市辖区', parentCode: 4207, fullName: '湖北省鄂州市市辖区',
  }, {
    id: 533, code: 130733, codeName: '崇礼县', parentCode: 1307, fullName: '河北省张家口市崇礼县',
  }, {
    id: 534, code: 130732, codeName: '赤城县', parentCode: 1307, fullName: '河北省张家口市赤城县',
  }, {
    id: 535, code: 130731, codeName: '涿鹿县', parentCode: 1307, fullName: '河北省张家口市涿鹿县',
  }, {
    id: 536, code: 130730, codeName: '怀来县', parentCode: 1307, fullName: '河北省张家口市怀来县',
  }, {
    id: 537, code: 652328, codeName: '木垒哈萨克自治县', parentCode: 6523, fullName: '新疆昌吉回族自治州新疆木垒哈萨克自治县',
  }, {
    id: 538, code: 510683, codeName: '绵竹市', parentCode: 5106, fullName: '四川省德阳市绵竹市',
  }, {
    id: 539, code: 652327, codeName: '吉木萨尔县', parentCode: 6523, fullName: '新疆昌吉回族自治州新疆吉木萨尔县',
  }, {
    id: 540, code: 510682, codeName: '什邡市', parentCode: 5106, fullName: '四川省德阳市什邡市',
  }, {
    id: 541, code: 510681, codeName: '广汉市', parentCode: 5106, fullName: '四川省德阳市广汉市',
  }, {
    id: 542, code: 652325, codeName: '奇台县', parentCode: 6523, fullName: '新疆昌吉回族自治州新疆奇台县',
  }, {
    id: 543, code: 440923, codeName: '电白县', parentCode: 4409, fullName: '广东省茂名市电白县',
  }, {
    id: 544, code: 652324, codeName: '玛纳斯县', parentCode: 6523, fullName: '新疆昌吉回族自治州新疆玛纳斯县',
  }, {
    id: 545, code: 652323, codeName: '呼图壁县', parentCode: 6523, fullName: '新疆昌吉回族自治州新疆呼图壁县',
  }, {
    id: 546, code: 130729, codeName: '万全县', parentCode: 1307, fullName: '河北省张家口市万全县',
  }, {
    id: 547, code: 211324, codeName: '喀喇沁左翼蒙古族自治县', parentCode: 2113, fullName: '辽宁省朝阳市喀喇沁左翼蒙古族自治县',
  }, {
    id: 548, code: 130728, codeName: '怀安县', parentCode: 1307, fullName: '河北省张家口市怀安县',
  }, {
    id: 549, code: 130727, codeName: '阳原县', parentCode: 1307, fullName: '河北省张家口市阳原县',
  }, {
    id: 550, code: 211322, codeName: '建平县', parentCode: 2113, fullName: '辽宁省朝阳市建平县',
  }, {
    id: 551, code: 130726, codeName: '蔚县', parentCode: 1307, fullName: '河北省张家口市蔚县',
  }, {
    id: 552, code: 211321, codeName: '朝阳县', parentCode: 2113, fullName: '辽宁省朝阳市朝阳县',
  }, {
    id: 553, code: 130725, codeName: '尚义县', parentCode: 1307, fullName: '河北省张家口市尚义县',
  }, {
    id: 554, code: 130724, codeName: '沽源县', parentCode: 1307, fullName: '河北省张家口市沽源县',
  }, {
    id: 555, code: 130723, codeName: '康保县', parentCode: 1307, fullName: '河北省张家口市康保县',
  }, {
    id: 556, code: 130722, codeName: '张北县', parentCode: 1307, fullName: '河北省张家口市张北县',
  }, {
    id: 557, code: 130721, codeName: '宣化县', parentCode: 1307, fullName: '河北省张家口市宣化县',
  }, {
    id: 558, code: 445122, codeName: '饶平县', parentCode: 4451, fullName: '广东省潮州市饶平县',
  }, {
    id: 559, code: 522601, codeName: '凯里市', parentCode: 5226, fullName: '贵州省黔东南苗族侗族自治州凯里市',
  }, {
    id: 560, code: 445121, codeName: '潮安县', parentCode: 4451, fullName: '广东省潮州市潮安县',
  }, {
    id: 561, code: 520425, codeName: '紫云苗族布依族自治县', parentCode: 5204, fullName: '贵州省安顺市紫云苗族布依族自治县',
  }, {
    id: 562, code: 520424, codeName: '关岭布依族苗族自治县', parentCode: 5204, fullName: '贵州省安顺市关岭布依族苗族自治县',
  }, {
    id: 563, code: 520423, codeName: '镇宁布依族苗族自治县', parentCode: 5204, fullName: '贵州省安顺市镇宁布依族苗族自治县',
  }, {
    id: 564, code: 520422, codeName: '普定县', parentCode: 5204, fullName: '贵州省安顺市普定县',
  }, {
    id: 565, code: 520421, codeName: '平坝县', parentCode: 5204, fullName: '贵州省安顺市平坝县',
  }, {
    id: 566, code: 640381, codeName: '宁夏青铜峡市', parentCode: 6403, fullName: '宁夏吴忠市宁夏青铜峡市',
  }, {
    id: 567, code: 371006, codeName: '高技术产业开发区', parentCode: 3710, fullName: '山东省威海市高技术产业开发区',
  }, {
    id: 568, code: 371005, codeName: '经济技术开发区', parentCode: 3710, fullName: '山东省威海市经济技术开发区',
  }, {
    id: 569, code: 371004, codeName: '高新技术开发区', parentCode: 3710, fullName: '山东省威海市高新技术开发区',
  }, {
    id: 570, code: 371003, codeName: '开发区', parentCode: 3710, fullName: '山东省威海市开发区',
  }, {
    id: 571, code: 371002, codeName: '环翠区', parentCode: 3710, fullName: '山东省威海市环翠区',
  }, {
    id: 572, code: 371001, codeName: '市辖区', parentCode: 3710, fullName: '山东省威海市市辖区',
  }, {
    id: 573, code: 210224, codeName: '长海县', parentCode: 2102, fullName: '辽宁省大连市长海县',
  }, {
    id: 574, code: 330185, codeName: '临安市', parentCode: 3301, fullName: '浙江省杭州市临安市',
  }, {
    id: 575, code: 341024, codeName: '祁门县', parentCode: 3410, fullName: '安徽省黄山市祁门县',
  }, {
    id: 576, code: 330183, codeName: '富阳市', parentCode: 3301, fullName: '浙江省杭州市富阳市',
  }, {
    id: 577, code: 341023, codeName: '黟县', parentCode: 3410, fullName: '安徽省黄山市黟县',
  }, {
    id: 578, code: 330182, codeName: '建德市', parentCode: 3301, fullName: '浙江省杭州市建德市',
  }, {
    id: 579, code: 341022, codeName: '休宁县', parentCode: 3410, fullName: '安徽省黄山市休宁县',
  }, {
    id: 580, code: 341021, codeName: '歙县', parentCode: 3410, fullName: '安徽省黄山市歙县',
  }, {
    id: 581, code: 440903, codeName: '茂港区', parentCode: 4409, fullName: '广东省茂名市茂港区',
  }, {
    id: 582, code: 440902, codeName: '茂南区', parentCode: 4409, fullName: '广东省茂名市茂南区',
  }, {
    id: 583, code: 652303, codeName: '米泉市', parentCode: 6523, fullName: '新疆昌吉回族自治州新疆米泉市',
  }, {
    id: 584, code: 440901, codeName: '市辖区', parentCode: 4409, fullName: '广东省茂名市市辖区',
  }, {
    id: 585, code: 652302, codeName: '阜康市', parentCode: 6523, fullName: '新疆昌吉回族自治州新疆阜康市',
  }, {
    id: 586, code: 410928, codeName: '濮阳县', parentCode: 4109, fullName: '河南省濮阳市濮阳县',
  }, {
    id: 587, code: 652301, codeName: '昌吉市', parentCode: 6523, fullName: '新疆昌吉回族自治州新疆昌吉市',
  }, {
    id: 588, code: 410927, codeName: '台前县', parentCode: 4109, fullName: '河南省濮阳市台前县',
  }, {
    id: 589, code: 410926, codeName: '范县', parentCode: 4109, fullName: '河南省濮阳市范县',
  }, {
    id: 590, code: 410923, codeName: '南乐县', parentCode: 4109, fullName: '河南省濮阳市南乐县',
  }, {
    id: 591, code: 410922, codeName: '清丰县', parentCode: 4109, fullName: '河南省濮阳市清丰县',
  }, {
    id: 592, code: 650121, codeName: '乌鲁木齐县', parentCode: 6501, fullName: '新疆乌鲁木齐市新疆乌鲁木齐县',
  }, {
    id: 593, code: 211303, codeName: '龙城区', parentCode: 2113, fullName: '辽宁省朝阳市龙城区',
  }, {
    id: 594, code: 211302, codeName: '双塔区', parentCode: 2113, fullName: '辽宁省朝阳市双塔区',
  }, {
    id: 595, code: 130706, codeName: '下花园区', parentCode: 1307, fullName: '河北省张家口市下花园区',
  }, {
    id: 596, code: 211301, codeName: '市辖区', parentCode: 2113, fullName: '辽宁省朝阳市市辖区',
  }, {
    id: 597, code: 130705, codeName: '宣化区', parentCode: 1307, fullName: '河北省张家口市宣化区',
  }, {
    id: 598, code: 130703, codeName: '桥西区', parentCode: 1307, fullName: '河北省张家口市桥西区',
  }, {
    id: 599, code: 130702, codeName: '桥东区', parentCode: 1307, fullName: '河北省张家口市桥东区',
  }, {
    id: 600, code: 210213, codeName: '金州区', parentCode: 2102, fullName: '辽宁省大连市金州区',
  }, {
    id: 601, code: 130701, codeName: '市辖区', parentCode: 1307, fullName: '河北省张家口市市辖区',
  }, {
    id: 602, code: 210212, codeName: '旅顺口区', parentCode: 2102, fullName: '辽宁省大连市旅顺口区',
  }, {
    id: 603, code: 445102, codeName: '湘桥区', parentCode: 4451, fullName: '广东省潮州市湘桥区',
  }, {
    id: 604, code: 210211, codeName: '甘井子区', parentCode: 2102, fullName: '辽宁省大连市甘井子区',
  }, {
    id: 605, code: 445101, codeName: '市辖区', parentCode: 4451, fullName: '广东省潮州市市辖区',
  }, {
    id: 606, code: 150929, codeName: '四子王旗', parentCode: 1509, fullName: '内蒙古乌兰察布市内蒙古四子王旗',
  }, {
    id: 607, code: 150928, codeName: '察哈尔右翼后旗', parentCode: 1509, fullName: '内蒙古乌兰察布市内蒙古察哈尔右翼后旗',
  }, {
    id: 608, code: 150927, codeName: '察哈尔右翼中旗', parentCode: 1509, fullName: '内蒙古乌兰察布市内蒙古察哈尔右翼中旗',
  }, {
    id: 609, code: 520402, codeName: '西秀区', parentCode: 5204, fullName: '贵州省安顺市西秀区',
  }, {
    id: 610, code: 150926, codeName: '察哈尔右翼前旗', parentCode: 1509, fullName: '内蒙古乌兰察布市内蒙古察哈尔右翼前旗',
  }, {
    id: 611, code: 220681, codeName: '临江市', parentCode: 2206, fullName: '吉林省白山市临江市',
  }, {
    id: 612, code: 520401, codeName: '市辖区', parentCode: 5204, fullName: '贵州省安顺市市辖区',
  }, {
    id: 613, code: 150925, codeName: '凉城县', parentCode: 1509, fullName: '内蒙古乌兰察布市内蒙古凉城县',
  }, {
    id: 614, code: 150924, codeName: '兴和县', parentCode: 1509, fullName: '内蒙古乌兰察布市内蒙古兴和县',
  }, {
    id: 615, code: 150923, codeName: '商都县', parentCode: 1509, fullName: '内蒙古乌兰察布市内蒙古商都县',
  }, {
    id: 616, code: 150922, codeName: '化德县', parentCode: 1509, fullName: '内蒙古乌兰察布市内蒙古化德县',
  }, {
    id: 617, code: 150921, codeName: '卓资县', parentCode: 1509, fullName: '内蒙古乌兰察布市内蒙古卓资县',
  }, {
    id: 618, code: 621228, codeName: '两当县', parentCode: 6212, fullName: '甘肃省陇南市两当县',
  }, {
    id: 619, code: 621227, codeName: '徽县', parentCode: 6212, fullName: '甘肃省陇南市徽县',
  }, {
    id: 620, code: 621226, codeName: '礼县', parentCode: 6212, fullName: '甘肃省陇南市礼县',
  }, {
    id: 621, code: 621225, codeName: '西和县', parentCode: 6212, fullName: '甘肃省陇南市西和县',
  }, {
    id: 622, code: 621224, codeName: '康县', parentCode: 6212, fullName: '甘肃省陇南市康县',
  }, {
    id: 623, code: 621223, codeName: '宕昌县', parentCode: 6212, fullName: '甘肃省陇南市宕昌县',
  }, {
    id: 624, code: 621222, codeName: '文县', parentCode: 6212, fullName: '甘肃省陇南市文县',
  }, {
    id: 625, code: 621221, codeName: '成县', parentCode: 6212, fullName: '甘肃省陇南市成县',
  }, {
    id: 626, code: 210204, codeName: '沙河口区', parentCode: 2102, fullName: '辽宁省大连市沙河口区',
  }, {
    id: 627, code: 210203, codeName: '西岗区', parentCode: 2102, fullName: '辽宁省大连市西岗区',
  }, {
    id: 628, code: 210202, codeName: '中山区', parentCode: 2102, fullName: '辽宁省大连市中山区',
  }, {
    id: 629, code: 210201, codeName: '市辖区', parentCode: 2102, fullName: '辽宁省大连市市辖区',
  }, {
    id: 630, code: 341004, codeName: '徽州区', parentCode: 3410, fullName: '安徽省黄山市徽州区',
  }, {
    id: 631, code: 341003, codeName: '黄山区', parentCode: 3410, fullName: '安徽省黄山市黄山区',
  }, {
    id: 632, code: 341002, codeName: '屯溪区', parentCode: 3410, fullName: '安徽省黄山市屯溪区',
  }, {
    id: 633, code: 341001, codeName: '市辖区', parentCode: 3410, fullName: '安徽省黄山市市辖区',
  }, {
    id: 634, code: 650108, codeName: '东山区', parentCode: 6501, fullName: '新疆乌鲁木齐市东山区',
  }, {
    id: 635, code: 410902, codeName: '华龙区', parentCode: 4109, fullName: '河南省濮阳市华龙区',
  }, {
    id: 636, code: 230422, codeName: '绥滨县', parentCode: 2304, fullName: '黑龙江省鹤岗市绥滨县',
  }, {
    id: 637, code: 650107, codeName: '达坂城区', parentCode: 6501, fullName: '新疆乌鲁木齐市达坂城区',
  }, {
    id: 638, code: 410901, codeName: '市辖区', parentCode: 4109, fullName: '河南省濮阳市市辖区',
  }, {
    id: 639, code: 230421, codeName: '萝北县', parentCode: 2304, fullName: '黑龙江省鹤岗市萝北县',
  }, {
    id: 640, code: 650106, codeName: '头屯河区', parentCode: 6501, fullName: '新疆乌鲁木齐市头屯河区',
  }, {
    id: 641, code: 650105, codeName: '水磨沟区', parentCode: 6501, fullName: '新疆乌鲁木齐市水磨沟区',
  }, {
    id: 642, code: 650104, codeName: '新市区', parentCode: 6501, fullName: '新疆乌鲁木齐市新市区',
  }, {
    id: 643, code: 650103, codeName: '沙依巴克区', parentCode: 6501, fullName: '新疆乌鲁木齐市沙依巴克区',
  }, {
    id: 644, code: 650102, codeName: '天山区', parentCode: 6501, fullName: '新疆乌鲁木齐市天山区',
  }, {
    id: 645, code: 650101, codeName: '市辖区', parentCode: 6501, fullName: '新疆乌鲁木齐市市辖区',
  }, {
    id: 646, code: 511725, codeName: '渠县', parentCode: 5117, fullName: '四川省达州市渠县',
  }, {
    id: 647, code: 511724, codeName: '大竹县', parentCode: 5117, fullName: '四川省达州市大竹县',
  }, {
    id: 648, code: 620123, codeName: '榆中县', parentCode: 6201, fullName: '甘肃省兰州市榆中县',
  }, {
    id: 649, code: 511723, codeName: '开江县', parentCode: 5117, fullName: '四川省达州市开江县',
  }, {
    id: 650, code: 620122, codeName: '皋兰县', parentCode: 6201, fullName: '甘肃省兰州市皋兰县',
  }, {
    id: 651, code: 511722, codeName: '宣汉县', parentCode: 5117, fullName: '四川省达州市宣汉县',
  }, {
    id: 652, code: 620121, codeName: '永登县', parentCode: 6201, fullName: '甘肃省兰州市永登县',
  }, {
    id: 653, code: 511721, codeName: '达县', parentCode: 5117, fullName: '四川省达州市达县',
  }, {
    id: 654, code: 150902, codeName: '集宁区', parentCode: 1509, fullName: '内蒙古乌兰察布市集宁区',
  }, {
    id: 655, code: 150901, codeName: '市辖区', parentCode: 1509, fullName: '内蒙古乌兰察布市市辖区',
  }, {
    id: 656, code: 621202, codeName: '武都区', parentCode: 6212, fullName: '甘肃省陇南市武都区',
  }, {
    id: 657, code: 621201, codeName: '市辖区', parentCode: 6212, fullName: '甘肃省陇南市市辖区',
  }, {
    id: 658, code: 360124, codeName: '进贤县', parentCode: 3601, fullName: '江西省南昌市进贤县',
  }, {
    id: 659, code: 360123, codeName: '安义县', parentCode: 3601, fullName: '江西省南昌市安义县',
  }, {
    id: 660, code: 360122, codeName: '新建县', parentCode: 3601, fullName: '江西省南昌市新建县',
  }, {
    id: 661, code: 360121, codeName: '南昌县', parentCode: 3601, fullName: '江西省南昌市南昌县',
  }, {
    id: 662, code: 620111, codeName: '红古区', parentCode: 6201, fullName: '甘肃省兰州市红古区',
  }, {
    id: 663, code: 510626, codeName: '罗江县', parentCode: 5106, fullName: '四川省德阳市罗江县',
  }, {
    id: 664, code: 510623, codeName: '中江县', parentCode: 5106, fullName: '四川省德阳市中江县',
  }, {
    id: 665, code: 230407, codeName: '兴山区', parentCode: 2304, fullName: '黑龙江省鹤岗市兴山区',
  }, {
    id: 666, code: 230406, codeName: '东山区', parentCode: 2304, fullName: '黑龙江省鹤岗市东山区',
  }, {
    id: 667, code: 230405, codeName: '兴安区', parentCode: 2304, fullName: '黑龙江省鹤岗市兴安区',
  }, {
    id: 668, code: 230404, codeName: '南山区', parentCode: 2304, fullName: '黑龙江省鹤岗市南山区',
  }, {
    id: 669, code: 230403, codeName: '工农区', parentCode: 2304, fullName: '黑龙江省鹤岗市工农区',
  }, {
    id: 670, code: 230402, codeName: '向阳区', parentCode: 2304, fullName: '黑龙江省鹤岗市向阳区',
  }, {
    id: 671, code: 230401, codeName: '市辖区', parentCode: 2304, fullName: '黑龙江省鹤岗市市辖区',
  }, {
    id: 672, code: 620105, codeName: '安宁区', parentCode: 6201, fullName: '甘肃省兰州市安宁区',
  }, {
    id: 673, code: 620104, codeName: '西固区', parentCode: 6201, fullName: '甘肃省兰州市西固区',
  }, {
    id: 674, code: 620103, codeName: '七里河区', parentCode: 6201, fullName: '甘肃省兰州市七里河区',
  }, {
    id: 675, code: 360111, codeName: '青山湖区', parentCode: 3601, fullName: '江西省南昌市青山湖区',
  }, {
    id: 676, code: 620102, codeName: '城关区', parentCode: 6201, fullName: '甘肃省兰州市城关区',
  }, {
    id: 677, code: 511702, codeName: '通川区', parentCode: 5117, fullName: '四川省达州市通川区',
  }, {
    id: 678, code: 320382, codeName: '邳州市', parentCode: 3203, fullName: '江苏省徐州市邳州市',
  }, {
    id: 679, code: 620101, codeName: '市辖区', parentCode: 6201, fullName: '甘肃省兰州市市辖区',
  }, {
    id: 680, code: 511701, codeName: '市辖区', parentCode: 5117, fullName: '四川省达州市市辖区',
  }, {
    id: 681, code: 320381, codeName: '新沂市', parentCode: 3203, fullName: '江苏省徐州市新沂市',
  }, {
    id: 682, code: 433130, codeName: '龙山县', parentCode: 4331, fullName: '湖南省湘西土家族苗族自治州龙山县',
  }, {
    id: 683, code: 640324, codeName: '宁夏同心县', parentCode: 6403, fullName: '宁夏吴忠市宁夏同心县',
  }, {
    id: 684, code: 640323, codeName: '宁夏盐池县', parentCode: 6403, fullName: '宁夏吴忠市宁夏盐池县',
  }, {
    id: 685, code: 360105, codeName: '湾里区', parentCode: 3601, fullName: '江西省南昌市湾里区',
  }, {
    id: 686, code: 360104, codeName: '青云谱区', parentCode: 3601, fullName: '江西省南昌市青云谱区',
  }, {
    id: 687, code: 360103, codeName: '西湖区', parentCode: 3601, fullName: '江西省南昌市西湖区',
  }, {
    id: 688, code: 360102, codeName: '东湖区', parentCode: 3601, fullName: '江西省南昌市东湖区',
  }, {
    id: 689, code: 360101, codeName: '市辖区', parentCode: 3601, fullName: '江西省南昌市市辖区',
  }, {
    id: 690, code: 330127, codeName: '淳安县', parentCode: 3301, fullName: '浙江省杭州市淳安县',
  }, {
    id: 691, code: 433127, codeName: '永顺县', parentCode: 4331, fullName: '湖南省湘西土家族苗族自治州永顺县',
  }, {
    id: 692, code: 433126, codeName: '古丈县', parentCode: 4331, fullName: '湖南省湘西土家族苗族自治州古丈县',
  }, {
    id: 693, code: 433125, codeName: '保靖县', parentCode: 4331, fullName: '湖南省湘西土家族苗族自治州保靖县',
  }, {
    id: 694, code: 433124, codeName: '花垣县', parentCode: 4331, fullName: '湖南省湘西土家族苗族自治州花垣县',
  }, {
    id: 695, code: 510603, codeName: '旌阳区', parentCode: 5106, fullName: '四川省德阳市旌阳区',
  }, {
    id: 696, code: 210882, codeName: '大石桥市', parentCode: 2108, fullName: '辽宁省营口市大石桥市',
  }, {
    id: 697, code: 433123, codeName: '凤凰县', parentCode: 4331, fullName: '湖南省湘西土家族苗族自治州凤凰县',
  }, {
    id: 698, code: 330122, codeName: '桐庐县', parentCode: 3301, fullName: '浙江省杭州市桐庐县',
  }, {
    id: 699, code: 210881, codeName: '盖州市', parentCode: 2108, fullName: '辽宁省营口市盖州市',
  }, {
    id: 700, code: 433122, codeName: '泸溪县', parentCode: 4331, fullName: '湖南省湘西土家族苗族自治州泸溪县',
  }, {
    id: 701, code: 510601, codeName: '市辖区', parentCode: 5106, fullName: '四川省德阳市市辖区',
  }, {
    id: 702, code: 530829, codeName: '西盟佤族自治县', parentCode: 5308, fullName: '云南省思茅市西盟佤族自治县',
  }, {
    id: 703, code: 530828, codeName: '澜沧拉祜族自治县', parentCode: 5308, fullName: '云南省思茅市澜沧拉祜族自治县',
  }, {
    id: 704, code: 530827, codeName: '孟连傣族拉祜族佤族自治县', parentCode: 5308, fullName: '云南省思茅市孟连傣族拉祜族佤族自治县',
  }, {
    id: 705, code: 530826, codeName: '江城哈尼族彝族自治县', parentCode: 5308, fullName: '云南省思茅市江城哈尼族彝族自治县',
  }, {
    id: 706, code: 530825, codeName: '镇沅彝族哈尼族拉祜族自治县', parentCode: 5308, fullName: '云南省思茅市镇沅彝族哈尼族拉祜族自治县',
  }, {
    id: 707, code: 530824, codeName: '景谷傣族彝族自治县', parentCode: 5308, fullName: '云南省思茅市景谷傣族彝族自治县',
  }, {
    id: 708, code: 530823, codeName: '景东彝族自治县', parentCode: 5308, fullName: '云南省思茅市景东彝族自治县',
  }, {
    id: 709, code: 530822, codeName: '墨江哈尼族自治县', parentCode: 5308, fullName: '云南省思茅市墨江哈尼族自治县',
  }, {
    id: 710, code: 530821, codeName: '普洱哈尼族彝族自治县', parentCode: 5308, fullName: '云南省思茅市普洱哈尼族彝族自治县',
  }, {
    id: 711, code: 610331, codeName: '太白县', parentCode: 6103, fullName: '陕西省宝鸡市太白县',
  }, {
    id: 712, code: 610330, codeName: '凤县', parentCode: 6103, fullName: '陕西省宝鸡市凤县',
  }, {
    id: 713, code: 330110, codeName: '余杭区', parentCode: 3301, fullName: '浙江省杭州市余杭区',
  }, {
    id: 714, code: 220625, codeName: '江源县', parentCode: 2206, fullName: '吉林省白山市江源县',
  }, {
    id: 715, code: 220623, codeName: '长白朝鲜族自治县', parentCode: 2206, fullName: '吉林省白山市长白朝鲜族自治县',
  }, {
    id: 716, code: 220622, codeName: '靖宇县', parentCode: 2206, fullName: '吉林省白山市靖宇县',
  }, {
    id: 717, code: 220621, codeName: '抚松县', parentCode: 2206, fullName: '吉林省白山市抚松县',
  }, {
    id: 718, code: 421182, codeName: '武穴市', parentCode: 4211, fullName: '湖北省黄冈市武穴市',
  }, {
    id: 719, code: 421181, codeName: '麻城市', parentCode: 4211, fullName: '湖北省黄冈市麻城市',
  }, {
    id: 720, code: 640302, codeName: '利通区', parentCode: 6403, fullName: '宁夏吴忠市利通区',
  }, {
    id: 721, code: 610329, codeName: '麟游县', parentCode: 6103, fullName: '陕西省宝鸡市麟游县',
  }, {
    id: 722, code: 640301, codeName: '市辖区', parentCode: 6403, fullName: '宁夏吴忠市市辖区',
  }, {
    id: 723, code: 610328, codeName: '千阳县', parentCode: 6103, fullName: '陕西省宝鸡市千阳县',
  }, {
    id: 724, code: 610327, codeName: '陇县', parentCode: 6103, fullName: '陕西省宝鸡市陇县',
  }, {
    id: 725, code: 610326, codeName: '眉县', parentCode: 6103, fullName: '陕西省宝鸡市眉县',
  }, {
    id: 726, code: 610324, codeName: '扶风县', parentCode: 6103, fullName: '陕西省宝鸡市扶风县',
  }, {
    id: 727, code: 610323, codeName: '岐山县', parentCode: 6103, fullName: '陕西省宝鸡市岐山县',
  }, {
    id: 728, code: 610322, codeName: '凤翔县', parentCode: 6103, fullName: '陕西省宝鸡市凤翔县',
  }, {
    id: 729, code: 632726, codeName: '曲麻莱县', parentCode: 6327, fullName: '青海省玉树藏族自治州曲麻莱县',
  }, {
    id: 730, code: 632725, codeName: '囊谦县', parentCode: 6327, fullName: '青海省玉树藏族自治州囊谦县',
  }, {
    id: 731, code: 632724, codeName: '治多县', parentCode: 6327, fullName: '青海省玉树藏族自治州治多县',
  }, {
    id: 732, code: 632723, codeName: '称多县', parentCode: 6327, fullName: '青海省玉树藏族自治州称多县',
  }, {
    id: 733, code: 632722, codeName: '杂多县', parentCode: 6327, fullName: '青海省玉树藏族自治州杂多县',
  }, {
    id: 734, code: 330109, codeName: '萧山区', parentCode: 3301, fullName: '浙江省杭州市萧山区',
  }, {
    id: 735, code: 632721, codeName: '玉树县', parentCode: 6327, fullName: '青海省玉树藏族自治州玉树县',
  }, {
    id: 736, code: 330108, codeName: '滨江区', parentCode: 3301, fullName: '浙江省杭州市滨江区',
  }, {
    id: 737, code: 330106, codeName: '西湖区', parentCode: 3301, fullName: '浙江省杭州市西湖区',
  }, {
    id: 738, code: 330105, codeName: '拱墅区', parentCode: 3301, fullName: '浙江省杭州市拱墅区',
  }, {
    id: 739, code: 330104, codeName: '江干区', parentCode: 3301, fullName: '浙江省杭州市江干区',
  }, {
    id: 740, code: 330103, codeName: '下城区', parentCode: 3301, fullName: '浙江省杭州市下城区',
  }, {
    id: 741, code: 330102, codeName: '上城区', parentCode: 3301, fullName: '浙江省杭州市上城区',
  }, {
    id: 742, code: 330101, codeName: '市辖区', parentCode: 3301, fullName: '浙江省杭州市市辖区',
  }, {
    id: 743, code: 433101, codeName: '吉首市', parentCode: 4331, fullName: '湖南省湘西土家族苗族自治州吉首市',
  }, {
    id: 744, code: 530802, codeName: '翠云区', parentCode: 5308, fullName: '云南省思茅市翠云区',
  }, {
    id: 745, code: 350322, codeName: '仙游县', parentCode: 3503, fullName: '福建省莆田市仙游县',
  }, {
    id: 746, code: 530801, codeName: '市辖区', parentCode: 5308, fullName: '云南省思茅市市辖区',
  }, {
    id: 747, code: 220602, codeName: '八道江区', parentCode: 2206, fullName: '吉林省白山市八道江区',
  }, {
    id: 748, code: 220601, codeName: '市辖区', parentCode: 2206, fullName: '吉林省白山市市辖区',
  }, {
    id: 749, code: 610304, codeName: '陈仓区', parentCode: 6103, fullName: '陕西省宝鸡市陈仓区',
  }, {
    id: 750, code: 610303, codeName: '金台区', parentCode: 6103, fullName: '陕西省宝鸡市金台区',
  }, {
    id: 751, code: 610302, codeName: '渭滨区', parentCode: 6103, fullName: '陕西省宝鸡市渭滨区',
  }, {
    id: 752, code: 610301, codeName: '市辖区', parentCode: 6103, fullName: '陕西省宝鸡市市辖区',
  }, {
    id: 753, code: 371626, codeName: '邹平县', parentCode: 3716, fullName: '山东省滨州市邹平县',
  }, {
    id: 754, code: 371625, codeName: '博兴县', parentCode: 3716, fullName: '山东省滨州市博兴县',
  }, {
    id: 755, code: 371624, codeName: '沾化县', parentCode: 3716, fullName: '山东省滨州市沾化县',
  }, {
    id: 756, code: 371623, codeName: '无棣县', parentCode: 3716, fullName: '山东省滨州市无棣县',
  }, {
    id: 757, code: 360782, codeName: '南康市', parentCode: 3607, fullName: '江西省赣州市南康市',
  }, {
    id: 758, code: 371622, codeName: '阳信县', parentCode: 3716, fullName: '山东省滨州市阳信县',
  }, {
    id: 759, code: 360781, codeName: '瑞金市', parentCode: 3607, fullName: '江西省赣州市瑞金市',
  }, {
    id: 760, code: 371621, codeName: '惠民县', parentCode: 3716, fullName: '山东省滨州市惠民县',
  }, {
    id: 761, code: 652929, codeName: '柯坪县', parentCode: 6529, fullName: '新疆阿克苏地区新疆柯坪县',
  }, {
    id: 762, code: 652928, codeName: '阿瓦提县', parentCode: 6529, fullName: '新疆阿克苏地区新疆阿瓦提县',
  }, {
    id: 763, code: 652927, codeName: '乌什县', parentCode: 6529, fullName: '新疆阿克苏地区新疆乌什县',
  }, {
    id: 764, code: 652926, codeName: '拜城县', parentCode: 6529, fullName: '新疆阿克苏地区新疆拜城县',
  }, {
    id: 765, code: 652925, codeName: '新和县', parentCode: 6529, fullName: '新疆阿克苏地区新疆新和县',
  }, {
    id: 766, code: 652924, codeName: '沙雅县', parentCode: 6529, fullName: '新疆阿克苏地区新疆沙雅县',
  }, {
    id: 767, code: 652923, codeName: '库车县', parentCode: 6529, fullName: '新疆阿克苏地区新疆库车县',
  }, {
    id: 768, code: 652922, codeName: '温宿县', parentCode: 6529, fullName: '新疆阿克苏地区新疆温宿县',
  }, {
    id: 769, code: 131182, codeName: '深州市', parentCode: 1311, fullName: '河北省衡水市深州市',
  }, {
    id: 770, code: 131181, codeName: '冀州市', parentCode: 1311, fullName: '河北省衡水市冀州市',
  }, {
    id: 771, code: 350305, codeName: '秀屿区', parentCode: 3503, fullName: '福建省莆田市秀屿区',
  }, {
    id: 772, code: 350304, codeName: '荔城区', parentCode: 3503, fullName: '福建省莆田市荔城区',
  }, {
    id: 773, code: 350303, codeName: '涵江区', parentCode: 3503, fullName: '福建省莆田市涵江区',
  }, {
    id: 774, code: 350302, codeName: '城厢区', parentCode: 3503, fullName: '福建省莆田市城厢区',
  }, {
    id: 775, code: 350301, codeName: '市辖区', parentCode: 3503, fullName: '福建省莆田市市辖区',
  }, {
    id: 776, code: 320324, codeName: '睢宁县', parentCode: 3203, fullName: '江苏省徐州市睢宁县',
  }, {
    id: 777, code: 320323, codeName: '铜山县', parentCode: 3203, fullName: '江苏省徐州市铜山县',
  }, {
    id: 778, code: 320322, codeName: '沛县', parentCode: 3203, fullName: '江苏省徐州市沛县',
  }, {
    id: 779, code: 320321, codeName: '丰县', parentCode: 3203, fullName: '江苏省徐州市丰县',
  }, {
    id: 780, code: 451123, codeName: '富川瑶族自治县', parentCode: 4511, fullName: '广西贺州市广西富川瑶族自治县',
  }, {
    id: 781, code: 440282, codeName: '南雄市', parentCode: 4402, fullName: '广东省韶关市南雄市',
  }, {
    id: 782, code: 451122, codeName: '钟山县', parentCode: 4511, fullName: '广西贺州市广西钟山县',
  }, {
    id: 783, code: 440281, codeName: '乐昌市', parentCode: 4402, fullName: '广东省韶关市乐昌市',
  }, {
    id: 784, code: 451121, codeName: '昭平县', parentCode: 4511, fullName: '广西贺州市广西昭平县',
  }, {
    id: 785, code: 370523, codeName: '广饶县', parentCode: 3705, fullName: '山东省东营市广饶县',
  }, {
    id: 786, code: 370522, codeName: '利津县', parentCode: 3705, fullName: '山东省东营市利津县',
  }, {
    id: 787, code: 370521, codeName: '垦利县', parentCode: 3705, fullName: '山东省东营市垦利县',
  }, {
    id: 788, code: 371609, codeName: '高新技术产业开发区', parentCode: 3716, fullName: '山东省滨州市高新技术产业开发区',
  }, {
    id: 789, code: 320311, codeName: '泉山区', parentCode: 3203, fullName: '江苏省徐州市泉山区',
  }, {
    id: 790, code: 371602, codeName: '滨城区', parentCode: 3716, fullName: '山东省滨州市滨城区',
  }, {
    id: 791, code: 371601, codeName: '市辖区', parentCode: 3716, fullName: '山东省滨州市市辖区',
  }, {
    id: 792, code: 411381, codeName: '邓州市', parentCode: 4113, fullName: '河南省南阳市邓州市',
  }, {
    id: 793, code: 330784, codeName: '永康市', parentCode: 3307, fullName: '浙江省金华市永康市',
  }, {
    id: 794, code: 330783, codeName: '东阳市', parentCode: 3307, fullName: '浙江省金华市东阳市',
  }, {
    id: 795, code: 341623, codeName: '利辛县', parentCode: 3416, fullName: '安徽省亳州市利辛县',
  }, {
    id: 796, code: 330782, codeName: '义乌市', parentCode: 3307, fullName: '浙江省金华市义乌市',
  }, {
    id: 797, code: 341622, codeName: '蒙城县', parentCode: 3416, fullName: '安徽省亳州市蒙城县',
  }, {
    id: 798, code: 330781, codeName: '兰溪市', parentCode: 3307, fullName: '浙江省金华市兰溪市',
  }, {
    id: 799, code: 341621, codeName: '涡阳县', parentCode: 3416, fullName: '安徽省亳州市涡阳县',
  }, {
    id: 800, code: 652901, codeName: '阿克苏市', parentCode: 6529, fullName: '新疆阿克苏地区新疆阿克苏市',
  }, {
    id: 801, code: 622927, codeName: '积石山保安族东乡族撒拉族自治县', parentCode: 6229, fullName: '甘肃省临夏回族自治州积石山保安族东乡族撒拉族自治',
  }, {
    id: 802, code: 622926, codeName: '东乡族自治县', parentCode: 6229, fullName: '甘肃省临夏回族自治州东乡族自治县',
  }, {
    id: 803, code: 622925, codeName: '和政县', parentCode: 6229, fullName: '甘肃省临夏回族自治州和政县',
  }, {
    id: 804, code: 622924, codeName: '广河县', parentCode: 6229, fullName: '甘肃省临夏回族自治州广河县',
  }, {
    id: 805, code: 622923, codeName: '永靖县', parentCode: 6229, fullName: '甘肃省临夏回族自治州永靖县',
  }, {
    id: 806, code: 622922, codeName: '康乐县', parentCode: 6229, fullName: '甘肃省临夏回族自治州康乐县',
  }, {
    id: 807, code: 622921, codeName: '临夏县', parentCode: 6229, fullName: '甘肃省临夏回族自治州临夏县',
  }, {
    id: 808, code: 320305, codeName: '贾汪区', parentCode: 3203, fullName: '江苏省徐州市贾汪区',
  }, {
    id: 809, code: 320304, codeName: '九里区', parentCode: 3203, fullName: '江苏省徐州市九里区',
  }, {
    id: 810, code: 320303, codeName: '云龙区', parentCode: 3203, fullName: '江苏省徐州市云龙区',
  }, {
    id: 811, code: 320302, codeName: '鼓楼区', parentCode: 3203, fullName: '江苏省徐州市鼓楼区',
  }, {
    id: 812, code: 320301, codeName: '市辖区', parentCode: 3203, fullName: '江苏省徐州市市辖区',
  }, {
    id: 813, code: 451102, codeName: '八步区', parentCode: 4511, fullName: '广西贺州市八步区',
  }, {
    id: 814, code: 451101, codeName: '市辖区', parentCode: 4511, fullName: '广西贺州市市辖区',
  }, {
    id: 815, code: 210811, codeName: '老边区', parentCode: 2108, fullName: '辽宁省营口市老边区',
  }, {
    id: 816, code: 421127, codeName: '黄梅县', parentCode: 4211, fullName: '湖北省黄冈市黄梅县',
  }, {
    id: 817, code: 370503, codeName: '河口区', parentCode: 3705, fullName: '山东省东营市河口区',
  }, {
    id: 818, code: 421126, codeName: '蕲春县', parentCode: 4211, fullName: '湖北省黄冈市蕲春县',
  }, {
    id: 819, code: 370502, codeName: '东营区', parentCode: 3705, fullName: '山东省东营市东营区',
  }, {
    id: 820, code: 421125, codeName: '浠水县', parentCode: 4211, fullName: '湖北省黄冈市浠水县',
  }, {
    id: 821, code: 370501, codeName: '市辖区', parentCode: 3705, fullName: '山东省东营市市辖区',
  }, {
    id: 822, code: 421124, codeName: '英山县', parentCode: 4211, fullName: '湖北省黄冈市英山县',
  }, {
    id: 823, code: 421123, codeName: '罗田县', parentCode: 4211, fullName: '湖北省黄冈市罗田县',
  }, {
    id: 824, code: 421122, codeName: '红安县', parentCode: 4211, fullName: '湖北省黄冈市红安县',
  }, {
    id: 825, code: 421121, codeName: '团风县', parentCode: 4211, fullName: '湖北省黄冈市团风县',
  }, {
    id: 826, code: 340521, codeName: '当涂县', parentCode: 3405, fullName: '安徽省马鞍山市当涂县',
  }, {
    id: 827, code: 210804, codeName: '鲅鱼圈区', parentCode: 2108, fullName: '辽宁省营口市鲅鱼圈区',
  }, {
    id: 828, code: 210803, codeName: '西市区', parentCode: 2108, fullName: '辽宁省营口市西市区',
  }, {
    id: 829, code: 210802, codeName: '站前区', parentCode: 2108, fullName: '辽宁省营口市站前区',
  }, {
    id: 830, code: 210801, codeName: '市辖区', parentCode: 2108, fullName: '辽宁省营口市市辖区',
  }, {
    id: 831, code: 341602, codeName: '谯城区', parentCode: 3416, fullName: '安徽省亳州市谯城区',
  }, {
    id: 832, code: 341601, codeName: '市辖区', parentCode: 3416, fullName: '安徽省亳州市市辖区',
  }, {
    id: 833, code: 469039, codeName: '中沙群岛的岛礁及其海域', parentCode: 4690, fullName: '海南省省直辖县级行政单位中沙群岛的岛礁及其海域',
  }, {
    id: 834, code: 469038, codeName: '南沙群岛', parentCode: 4690, fullName: '海南省省直辖县级行政单位南沙群岛',
  }, {
    id: 835, code: 469037, codeName: '西沙群岛', parentCode: 4690, fullName: '海南省省直辖县级行政单位西沙群岛',
  }, {
    id: 836, code: 469036, codeName: '琼中黎族苗族自治县', parentCode: 4690, fullName: '海南省省直辖县级行政单位琼中黎族苗族自治县',
  }, {
    id: 837, code: 469035, codeName: '保亭黎族苗族自治县', parentCode: 4690, fullName: '海南省省直辖县级行政单位保亭黎族苗族自治县',
  }, {
    id: 838, code: 469034, codeName: '陵水黎族自治县', parentCode: 4690, fullName: '海南省省直辖县级行政单位陵水黎族自治县',
  }, {
    id: 839, code: 469033, codeName: '乐东黎族自治县', parentCode: 4690, fullName: '海南省省直辖县级行政单位乐东黎族自治县',
  }, {
    id: 840, code: 469031, codeName: '昌江黎族自治县', parentCode: 4690, fullName: '海南省省直辖县级行政单位昌江黎族自治县',
  }, {
    id: 841, code: 469030, codeName: '白沙黎族自治县', parentCode: 4690, fullName: '海南省省直辖县级行政单位白沙黎族自治县',
  }, {
    id: 842, code: 622901, codeName: '临夏市', parentCode: 6229, fullName: '甘肃省临夏回族自治州临夏市',
  }, {
    id: 843, code: 350982, codeName: '福鼎市', parentCode: 3509, fullName: '福建省宁德市福鼎市',
  }, {
    id: 844, code: 350981, codeName: '福安市', parentCode: 3509, fullName: '福建省宁德市福安市',
  }, {
    id: 845, code: 360735, codeName: '石城县', parentCode: 3607, fullName: '江西省赣州市石城县',
  }, {
    id: 846, code: 360734, codeName: '寻乌县', parentCode: 3607, fullName: '江西省赣州市寻乌县',
  }, {
    id: 847, code: 620725, codeName: '山丹县', parentCode: 6207, fullName: '甘肃省张掖市山丹县',
  }, {
    id: 848, code: 360733, codeName: '会昌县', parentCode: 3607, fullName: '江西省赣州市会昌县',
  }, {
    id: 849, code: 620724, codeName: '高台县', parentCode: 6207, fullName: '甘肃省张掖市高台县',
  }, {
    id: 850, code: 360732, codeName: '兴国县', parentCode: 3607, fullName: '江西省赣州市兴国县',
  }, {
    id: 851, code: 620723, codeName: '临泽县', parentCode: 6207, fullName: '甘肃省张掖市临泽县',
  }, {
    id: 852, code: 360731, codeName: '于都县', parentCode: 3607, fullName: '江西省赣州市于都县',
  }, {
    id: 853, code: 620722, codeName: '民乐县', parentCode: 6207, fullName: '甘肃省张掖市民乐县',
  }, {
    id: 854, code: 360730, codeName: '宁都县', parentCode: 3607, fullName: '江西省赣州市宁都县',
  }, {
    id: 855, code: 620721, codeName: '肃南裕固族自治县', parentCode: 6207, fullName: '甘肃省张掖市肃南裕固族自治县',
  }, {
    id: 856, code: 421102, codeName: '黄州区', parentCode: 4211, fullName: '湖北省黄冈市黄州区',
  }, {
    id: 857, code: 421101, codeName: '市辖区', parentCode: 4211, fullName: '湖北省黄冈市市辖区',
  }, {
    id: 858, code: 469028, codeName: '临高县', parentCode: 4690, fullName: '海南省省直辖县级行政单位临高县',
  }, {
    id: 859, code: 469027, codeName: '澄迈县', parentCode: 4690, fullName: '海南省省直辖县级行政单位澄迈县',
  }, {
    id: 860, code: 340504, codeName: '雨山区', parentCode: 3405, fullName: '安徽省马鞍山市雨山区',
  }, {
    id: 861, code: 469026, codeName: '屯昌县', parentCode: 4690, fullName: '海南省省直辖县级行政单位屯昌县',
  }, {
    id: 862, code: 340503, codeName: '花山区', parentCode: 3405, fullName: '安徽省马鞍山市花山区',
  }, {
    id: 863, code: 469025, codeName: '定安县', parentCode: 4690, fullName: '海南省省直辖县级行政单位定安县',
  }, {
    id: 864, code: 340502, codeName: '金家庄区', parentCode: 3405, fullName: '安徽省马鞍山市金家庄区',
  }, {
    id: 865, code: 340501, codeName: '市辖区', parentCode: 3405, fullName: '安徽省马鞍山市市辖区',
  }, {
    id: 866, code: 360729, codeName: '全南县', parentCode: 3607, fullName: '江西省赣州市全南县',
  }, {
    id: 867, code: 441324, codeName: '龙门县', parentCode: 4413, fullName: '广东省惠州市龙门县',
  }, {
    id: 868, code: 360728, codeName: '定南县', parentCode: 3607, fullName: '江西省赣州市定南县',
  }, {
    id: 869, code: 441323, codeName: '惠东县', parentCode: 4413, fullName: '广东省惠州市惠东县',
  }, {
    id: 870, code: 360727, codeName: '龙南县', parentCode: 3607, fullName: '江西省赣州市龙南县',
  }, {
    id: 871, code: 430482, codeName: '常宁市', parentCode: 4304, fullName: '湖南省衡阳市常宁市',
  }, {
    id: 872, code: 441322, codeName: '博罗县', parentCode: 4413, fullName: '广东省惠州市博罗县',
  }, {
    id: 873, code: 360726, codeName: '安远县', parentCode: 3607, fullName: '江西省赣州市安远县',
  }, {
    id: 874, code: 430481, codeName: '耒阳市', parentCode: 4304, fullName: '湖南省衡阳市耒阳市',
  }, {
    id: 875, code: 360725, codeName: '崇义县', parentCode: 3607, fullName: '江西省赣州市崇义县',
  }, {
    id: 876, code: 360724, codeName: '上犹县', parentCode: 3607, fullName: '江西省赣州市上犹县',
  }, {
    id: 877, code: 360723, codeName: '大余县', parentCode: 3607, fullName: '江西省赣州市大余县',
  }, {
    id: 878, code: 360722, codeName: '信丰县', parentCode: 3607, fullName: '江西省赣州市信丰县',
  }, {
    id: 879, code: 440233, codeName: '新丰县', parentCode: 4402, fullName: '广东省韶关市新丰县',
  }, {
    id: 880, code: 360721, codeName: '赣县', parentCode: 3607, fullName: '江西省赣州市赣县',
  }, {
    id: 881, code: 440232, codeName: '乳源瑶族自治县', parentCode: 4402, fullName: '广东省韶关市乳源瑶族自治县',
  }, {
    id: 882, code: 131128, codeName: '阜城县', parentCode: 1311, fullName: '河北省衡水市阜城县',
  }, {
    id: 883, code: 131127, codeName: '景县', parentCode: 1311, fullName: '河北省衡水市景县',
  }, {
    id: 884, code: 131126, codeName: '故城县', parentCode: 1311, fullName: '河北省衡水市故城县',
  }, {
    id: 885, code: 131125, codeName: '安平县', parentCode: 1311, fullName: '河北省衡水市安平县',
  }, {
    id: 886, code: 131124, codeName: '饶阳县', parentCode: 1311, fullName: '河北省衡水市饶阳县',
  }, {
    id: 887, code: 131123, codeName: '武强县', parentCode: 1311, fullName: '河北省衡水市武强县',
  }, {
    id: 888, code: 131122, codeName: '武邑县', parentCode: 1311, fullName: '河北省衡水市武邑县',
  }, {
    id: 889, code: 131121, codeName: '枣强县', parentCode: 1311, fullName: '河北省衡水市枣强县',
  }, {
    id: 890, code: 440229, codeName: '翁源县', parentCode: 4402, fullName: '广东省韶关市翁源县',
  }, {
    id: 891, code: 440224, codeName: '仁化县', parentCode: 4402, fullName: '广东省韶关市仁化县',
  }, {
    id: 892, code: 620702, codeName: '甘州区', parentCode: 6207, fullName: '甘肃省张掖市甘州区',
  }, {
    id: 893, code: 440222, codeName: '始兴县', parentCode: 4402, fullName: '广东省韶关市始兴县',
  }, {
    id: 894, code: 320982, codeName: '大丰市', parentCode: 3209, fullName: '江苏省盐城市大丰市',
  }, {
    id: 895, code: 620701, codeName: '市辖区', parentCode: 6207, fullName: '甘肃省张掖市市辖区',
  }, {
    id: 896, code: 440221, codeName: '曲江县', parentCode: 4402, fullName: '广东省韶关市曲江县',
  }, {
    id: 897, code: 320981, codeName: '东台市', parentCode: 3209, fullName: '江苏省盐城市东台市',
  }, {
    id: 898, code: 411330, codeName: '桐柏县', parentCode: 4113, fullName: '河南省南阳市桐柏县',
  }, {
    id: 899, code: 542133, codeName: '西藏边坝县', parentCode: 5421, fullName: '西藏昌都地区西藏边坝县',
  }, {
    id: 900, code: 542132, codeName: '西藏洛隆县', parentCode: 5421, fullName: '西藏昌都地区西藏洛隆县',
  }, {
    id: 901, code: 469007, codeName: '东方市', parentCode: 4690, fullName: '海南省省直辖县级行政单位东方市',
  }, {
    id: 902, code: 469006, codeName: '万宁市', parentCode: 4690, fullName: '海南省省直辖县级行政单位万宁市',
  }, {
    id: 903, code: 469005, codeName: '文昌市', parentCode: 4690, fullName: '海南省省直辖县级行政单位文昌市',
  }, {
    id: 904, code: 469003, codeName: '儋州市', parentCode: 4690, fullName: '海南省省直辖县级行政单位儋州市',
  }, {
    id: 905, code: 469002, codeName: '琼海市', parentCode: 4690, fullName: '海南省省直辖县级行政单位琼海市',
  }, {
    id: 906, code: 469001, codeName: '五指山市', parentCode: 4690, fullName: '海南省省直辖县级行政单位五指山市',
  }, {
    id: 907, code: 441303, codeName: '惠阳区', parentCode: 4413, fullName: '广东省惠州市惠阳区',
  }, {
    id: 908, code: 441302, codeName: '惠城区', parentCode: 4413, fullName: '广东省惠州市惠城区',
  }, {
    id: 909, code: 411329, codeName: '新野县', parentCode: 4113, fullName: '河南省南阳市新野县',
  }, {
    id: 910, code: 441301, codeName: '市辖区', parentCode: 4413, fullName: '广东省惠州市市辖区',
  }, {
    id: 911, code: 411328, codeName: '唐河县', parentCode: 4113, fullName: '河南省南阳市唐河县',
  }, {
    id: 912, code: 411327, codeName: '社旗县', parentCode: 4113, fullName: '河南省南阳市社旗县',
  }, {
    id: 913, code: 411326, codeName: '淅川县', parentCode: 4113, fullName: '河南省南阳市淅川县',
  }, {
    id: 914, code: 360702, codeName: '章贡区', parentCode: 3607, fullName: '江西省赣州市章贡区',
  }, {
    id: 915, code: 411325, codeName: '内乡县', parentCode: 4113, fullName: '河南省南阳市内乡县',
  }, {
    id: 916, code: 360701, codeName: '市辖区', parentCode: 3607, fullName: '江西省赣州市市辖区',
  }, {
    id: 917, code: 411324, codeName: '镇平县', parentCode: 4113, fullName: '河南省南阳市镇平县',
  }, {
    id: 918, code: 542129, codeName: '西藏芒康县', parentCode: 5421, fullName: '西藏昌都地区西藏芒康县',
  }, {
    id: 919, code: 411323, codeName: '西峡县', parentCode: 4113, fullName: '河南省南阳市西峡县',
  }, {
    id: 920, code: 330727, codeName: '磐安县', parentCode: 3307, fullName: '浙江省金华市磐安县',
  }, {
    id: 921, code: 542128, codeName: '西藏左贡县', parentCode: 5421, fullName: '西藏昌都地区西藏左贡县',
  }, {
    id: 922, code: 411322, codeName: '方城县', parentCode: 4113, fullName: '河南省南阳市方城县',
  }, {
    id: 923, code: 330726, codeName: '浦江县', parentCode: 3307, fullName: '浙江省金华市浦江县',
  }, {
    id: 924, code: 542127, codeName: '西藏八宿县', parentCode: 5421, fullName: '西藏昌都地区西藏八宿县',
  }, {
    id: 925, code: 411321, codeName: '南召县', parentCode: 4113, fullName: '河南省南阳市南召县',
  }, {
    id: 926, code: 542126, codeName: '西藏察雅县', parentCode: 5421, fullName: '西藏昌都地区西藏察雅县',
  }, {
    id: 927, code: 542125, codeName: '西藏丁青县', parentCode: 5421, fullName: '西藏昌都地区西藏丁青县',
  }, {
    id: 928, code: 330723, codeName: '武义县', parentCode: 3307, fullName: '浙江省金华市武义县',
  }, {
    id: 929, code: 542124, codeName: '西藏类乌齐县', parentCode: 5421, fullName: '西藏昌都地区西藏类乌齐县',
  }, {
    id: 930, code: 542123, codeName: '西藏贡觉县', parentCode: 5421, fullName: '西藏昌都地区西藏贡觉县',
  }, {
    id: 931, code: 542122, codeName: '西藏江达县', parentCode: 5421, fullName: '西藏昌都地区西藏江达县',
  }, {
    id: 932, code: 513233, codeName: '红原县', parentCode: 5132, fullName: '四川省阿坝藏族羌族自治州红原县',
  }, {
    id: 933, code: 542121, codeName: '西藏昌都县', parentCode: 5421, fullName: '西藏昌都地区西藏昌都县',
  }, {
    id: 934, code: 513232, codeName: '若尔盖县', parentCode: 5132, fullName: '四川省阿坝藏族羌族自治州若尔盖县',
  }, {
    id: 935, code: 513231, codeName: '阿坝县', parentCode: 5132, fullName: '四川省阿坝藏族羌族自治州阿坝县',
  }, {
    id: 936, code: 513230, codeName: '壤塘县', parentCode: 5132, fullName: '四川省阿坝藏族羌族自治州壤塘县',
  }, {
    id: 937, code: 450681, codeName: '东兴市', parentCode: 4506, fullName: '广西防城港市广西东兴市',
  }, {
    id: 938, code: 131102, codeName: '桃城区', parentCode: 1311, fullName: '河北省衡水市桃城区',
  }, {
    id: 939, code: 131101, codeName: '市辖区', parentCode: 1311, fullName: '河北省衡水市市辖区',
  }, {
    id: 940, code: 440204, codeName: '浈江区', parentCode: 4402, fullName: '广东省韶关市浈江区',
  }, {
    id: 941, code: 440203, codeName: '武江区', parentCode: 4402, fullName: '广东省韶关市武江区',
  }, {
    id: 942, code: 440202, codeName: '北江区', parentCode: 4402, fullName: '广东省韶关市北江区',
  }, {
    id: 943, code: 440201, codeName: '市辖区', parentCode: 4402, fullName: '广东省韶关市市辖区',
  }, {
    id: 944, code: 140481, codeName: '潞城市', parentCode: 1404, fullName: '山西省长治市潞城市',
  }, {
    id: 945, code: 513229, codeName: '马尔康县', parentCode: 5132, fullName: '四川省阿坝藏族羌族自治州马尔康县',
  }, {
    id: 946, code: 513228, codeName: '黑水县', parentCode: 5132, fullName: '四川省阿坝藏族羌族自治州黑水县',
  }, {
    id: 947, code: 513227, codeName: '小金县', parentCode: 5132, fullName: '四川省阿坝藏族羌族自治州小金县',
  }, {
    id: 948, code: 410225, codeName: '兰考县', parentCode: 4102, fullName: '河南省开封市兰考县',
  }, {
    id: 949, code: 513226, codeName: '金川县', parentCode: 5132, fullName: '四川省阿坝藏族羌族自治州金川县',
  }, {
    id: 950, code: 410224, codeName: '开封县', parentCode: 4102, fullName: '河南省开封市开封县',
  }, {
    id: 951, code: 513225, codeName: '九寨沟县', parentCode: 5132, fullName: '四川省阿坝藏族羌族自治州九寨沟县',
  }, {
    id: 952, code: 410223, codeName: '尉氏县', parentCode: 4102, fullName: '河南省开封市尉氏县',
  }, {
    id: 953, code: 513224, codeName: '松潘县', parentCode: 5132, fullName: '四川省阿坝藏族羌族自治州松潘县',
  }, {
    id: 954, code: 410222, codeName: '通许县', parentCode: 4102, fullName: '河南省开封市通许县',
  }, {
    id: 955, code: 513223, codeName: '茂县', parentCode: 5132, fullName: '四川省阿坝藏族羌族自治州茂县',
  }, {
    id: 956, code: 410221, codeName: '杞县', parentCode: 4102, fullName: '河南省开封市杞县',
  }, {
    id: 957, code: 513222, codeName: '理县', parentCode: 5132, fullName: '四川省阿坝藏族羌族自治州理县',
  }, {
    id: 958, code: 513221, codeName: '汶川县', parentCode: 5132, fullName: '四川省阿坝藏族羌族自治州汶川县',
  }, {
    id: 959, code: 530181, codeName: '安宁市', parentCode: 5301, fullName: '云南省昆明市安宁市',
  }, {
    id: 960, code: 610929, codeName: '白河县', parentCode: 6109, fullName: '陕西省安康市白河县',
  }, {
    id: 961, code: 610928, codeName: '旬阳县', parentCode: 6109, fullName: '陕西省安康市旬阳县',
  }, {
    id: 962, code: 610927, codeName: '镇坪县', parentCode: 6109, fullName: '陕西省安康市镇坪县',
  }, {
    id: 963, code: 610926, codeName: '平利县', parentCode: 6109, fullName: '陕西省安康市平利县',
  }, {
    id: 964, code: 610925, codeName: '岚皋县', parentCode: 6109, fullName: '陕西省安康市岚皋县',
  }, {
    id: 965, code: 610924, codeName: '紫阳县', parentCode: 6109, fullName: '陕西省安康市紫阳县',
  }, {
    id: 966, code: 610923, codeName: '宁陕县', parentCode: 6109, fullName: '陕西省安康市宁陕县',
  }, {
    id: 967, code: 610922, codeName: '石泉县', parentCode: 6109, fullName: '陕西省安康市石泉县',
  }, {
    id: 968, code: 610921, codeName: '汉阴县', parentCode: 6109, fullName: '陕西省安康市汉阴县',
  }, {
    id: 969, code: 411303, codeName: '卧龙区', parentCode: 4113, fullName: '河南省南阳市卧龙区',
  }, {
    id: 970, code: 411302, codeName: '宛城区', parentCode: 4113, fullName: '河南省南阳市宛城区',
  }, {
    id: 971, code: 411301, codeName: '市辖区', parentCode: 4113, fullName: '河南省南阳市市辖区',
  }, {
    id: 972, code: 330703, codeName: '金东区', parentCode: 3307, fullName: '浙江省金华市金东区',
  }, {
    id: 973, code: 150223, codeName: '达尔罕茂明安联合旗', parentCode: 1502, fullName: '内蒙古包头市内蒙古达尔罕茂明安联合旗',
  }, {
    id: 974, code: 330702, codeName: '婺城区', parentCode: 3307, fullName: '浙江省金华市婺城区',
  }, {
    id: 975, code: 150222, codeName: '固阳县', parentCode: 1502, fullName: '内蒙古包头市内蒙古固阳县',
  }, {
    id: 976, code: 330701, codeName: '市辖区', parentCode: 3307, fullName: '浙江省金华市市辖区',
  }, {
    id: 977, code: 150221, codeName: '土默特右旗', parentCode: 1502, fullName: '内蒙古包头市内蒙古土默特右旗',
  }, {
    id: 978, code: 410211, codeName: '郊区', parentCode: 4102, fullName: '河南省开封市郊区',
  }, {
    id: 979, code: 420684, codeName: '宜城市', parentCode: 4206, fullName: '湖北省襄阳市宜城市',
  }, {
    id: 980, code: 420683, codeName: '枣阳市', parentCode: 4206, fullName: '湖北省襄阳市枣阳市',
  }, {
    id: 981, code: 420682, codeName: '老河口市', parentCode: 4206, fullName: '湖北省襄阳市老河口市',
  }, {
    id: 982, code: 350926, codeName: '柘荣县', parentCode: 3509, fullName: '福建省宁德市柘荣县',
  }, {
    id: 983, code: 350925, codeName: '周宁县', parentCode: 3509, fullName: '福建省宁德市周宁县',
  }, {
    id: 984, code: 350924, codeName: '寿宁县', parentCode: 3509, fullName: '福建省宁德市寿宁县',
  }, {
    id: 985, code: 350923, codeName: '屏南县', parentCode: 3509, fullName: '福建省宁德市屏南县',
  }, {
    id: 986, code: 350922, codeName: '古田县', parentCode: 3509, fullName: '福建省宁德市古田县',
  }, {
    id: 987, code: 350921, codeName: '霞浦县', parentCode: 3509, fullName: '福建省宁德市霞浦县',
  }, {
    id: 988, code: 410205, codeName: '南关区', parentCode: 4102, fullName: '河南省开封市南关区',
  }, {
    id: 989, code: 410204, codeName: '鼓楼区', parentCode: 4102, fullName: '河南省开封市鼓楼区',
  }, {
    id: 990, code: 410203, codeName: '顺河回族区', parentCode: 4102, fullName: '河南省开封市顺河回族区',
  }, {
    id: 991, code: 410202, codeName: '龙亭区', parentCode: 4102, fullName: '河南省开封市龙亭区',
  }, {
    id: 992, code: 410201, codeName: '市辖区', parentCode: 4102, fullName: '河南省开封市市辖区',
  }, {
    id: 993, code: 511028, codeName: '隆昌县', parentCode: 5110, fullName: '四川省内江市隆昌县',
  }, {
    id: 994, code: 511025, codeName: '资中县', parentCode: 5110, fullName: '四川省内江市资中县',
  }, {
    id: 995, code: 511024, codeName: '威远县', parentCode: 5110, fullName: '四川省内江市威远县',
  }, {
    id: 996, code: 430426, codeName: '祁东县', parentCode: 4304, fullName: '湖南省衡阳市祁东县',
  }, {
    id: 997, code: 430424, codeName: '衡东县', parentCode: 4304, fullName: '湖南省衡阳市衡东县',
  }, {
    id: 998, code: 430423, codeName: '衡山县', parentCode: 4304, fullName: '湖南省衡阳市衡山县',
  }, {
    id: 999, code: 610902, codeName: '汉滨区', parentCode: 6109, fullName: '陕西省安康市汉滨区',
  }, { id: 1000, code: 430422, codeName: '衡南县', parentCode: 4304, fullName: '湖南省衡阳市衡南县' }]

module.exports = {
	areas,
}
