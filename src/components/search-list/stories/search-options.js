// 基础资源参数
const genBaseOptions = function () {
  return [
    {
      value: '01',
      label: '人口基础信息',
      children: [
        {value: '001', label: '基本信息'},
        {value: '002', label: '社情民意'},
        {value: '003', label: '行政执法与司法'},
        {value: '004', label: '资产'},
        {value: '005', label: '教育就业'},
        {value: '006', label: '社会保障'},
        {value: '007', label: '婚姻家庭'},
        {value: '008', label: '健康档案'},
        {value: '009', label: '纳税与缴费'},
        {value: '010', label: '信用评价'},
      ],
    },
    {
      value: '02',
      label: '法人单位基础信息',
      children: [
        {value: '001', label: '基本信息'},
        {value: '002', label: '报表'},
        {value: '003', label: '资产'},
        {value: '004', label: '资质许可荣誉'},
        {value: '005', label: '纳税参保缴费'},
        {value: '006', label: '生产经营'},
        {value: '007', label: '行政执法'},
        {value: '008', label: '司法信息'},
        {value: '009', label: '信用评价'},
      ],
    },
    {
      value: '03',
      label: '资源和空间地理基础信息',
      children: [
        {value: '001', label: '空间地理'},
        {value: '002', label: '资源'},
      ],
    },
    {
      value: '04',
      label: '宏观经济基础信息',
      children: [
        {value: '001', label: '综合'},
        {value: '002', label: '国民经济核算'},
        {value: '003', label: '人口'},
        {value: '004', label: '就业人员和工资'},
        {value: '005', label: '资产投资'},
        {value: '006', label: '对外经济贸易'},
        {value: '007', label: '资源和环境'},
        {value: '008', label: '能源'},
        {value: '009', label: '财政'},
        {value: '010', label: '价格指数'},
        {value: '011', label: '人民生活'},
        {value: '012', label: '城市概况'},
        {value: '013', label: '农业'},
        {value: '014', label: '工业'},
        {value: '015', label: '建筑业'},
        {value: '016', label: '运输和邮电'},
        {value: '017', label: '批发和零售业'},
        {value: '018', label: '住宿餐饮旅游业'},
        {value: '019', label: '金融业'},
        {value: '020', label: '教育和科技'},
        {value: '021', label: '卫生和社会服务'},
        {value: '022', label: '文化和体育'},
        {value: '023', label: '保险福利'},
        {value: '024', label: '计量质监'},
        {value: '025', label: '周期指标'},
      ],
    },
    {
      value: '05',
      label: '电子证照基础信息',
      children: [
        {value: '001', label: '许可批文'},
        {value: '002', label: '证件'},
        {value: '003', label: '执（牌）照'},
        {value: '004', label: '鉴定报告'},
        {value: '005', label: '证明材料'},
      ],
    },
  ]
}

// 主题资源参数
const genThemeOptions = function () {
  return [
    {value: '01', label: '全民健康保障信息'},
    {value: '02', label: '全民住房保障信息'},
    {value: '03', label: '公共事务基础信息'},
    {value: '04', label: '药品安全监督信息'},
    {value: '05', label: '食品安全监管信息'},
    {value: '06', label: '安全生产监督信息'},
    {value: '07', label: '市场价格监管信息'},
    {value: '08', label: '能源安全保障信息'},
    {value: '09', label: '信用体系建设信息'},
    {value: '10', label: '生态环境保护'},
    {value: '11', label: '应急维稳保障信息'},
    {value: '12', label: '行政执法监督'},
    {value: '13', label: '投资审批（招商引资）'},
    {value: '14', label: '金融监管'},
    {value: '15', label: '城市运行全景图'},
    {value: '16', label: '事件分析'},
    {value: '17', label: '教育专题'},
    {value: '18', label: '运行体征'},
    {value: '19', label: '全民社会保障信息'},
  ]
}

export default {
  name: [
    {value: '1', label: '市发展改革委'},
    {value: '2', label: '市教委'},
    {value: '3', label: '市科委'},
    {value: '4', label: '市经济信息化委'},
    {value: '5', label: '市民委'},
    {value: '6', label: '市公安局'},
    {value: '7', label: '市民政局'},
    {value: '8', label: '市司法局'},
    {value: '9', label: '市财政局'},
    {value: '10', label: '市人力社保局'},
  ],
  base: genBaseOptions(),
  theme: genThemeOptions(),
  format: [
    {value: 'file', label: '电子文件'},
    {value: 'table', label: '电子表格'},
    {value: 'database', label: '数据库'},
    {value: 'image', label: '图形图像'},
    {value: 'stream', label: '流媒体'},
    {value: 'other', label: '自描述格式'},
  ],
  share: [
    {value: 'condition', label: '有条件共享'},
    {value: 'uncondition', label: '无条件共享'},
    {value: 'reject', label: '不共享'},
  ],
  status: [
    {value: 1, label: '未审核'},
    {value: 2, label: '部门审核通过'},
    {value: 3, label: '审核未通过'},
    {value: 4, label: '已停用'},
    {value: 5, label: '联审通过'},
    {value: 6, label: '已发布'},
  ],
}
