import Layout from '@/views/layout'
// import store from '@/store'

export default [
  {
    path: '/user',
    component: Layout,
    name: '用户管理',
    meta: ['admin'],
    children: [
      { path: 'userManage', name: '用户管理', component: () => import('@/views/back/main/user') }
    ]
  },
  {
    path: '/homePage',
    component: Layout,
    name: '首页配置',
    children: [
      { path: 'NavBanner', name: '导航配置', component: () => import('@/views/back/main/DashboardSetting/NavBanner') },
      { path: 'diseaseBase', name: '常见疾病库', component: () => import('@/views/back/main/DashboardSetting/DiseaseDatabase') },
      { path: 'diseaseItem', name: '疾病专栏', component: () => import('@/views/back/main/DashboardSetting/DiseaseItems') },
      { path: 'abroadCases', name: '出国实例', component: () => import('@/views/back/main/DashboardSetting/AbroadCases') },
      { path: 'newsReport', name: '新闻报道', component: () => import('@/views/back/main/DashboardSetting/ReportSetting') },
      { path: 'newsArticle', name: '新闻资讯', component: () => import('@/views/back/main/DashboardSetting/NewsSetting') },
      { path: 'brand', name: '品牌实力', component: () => import('@/views/back/main/DashboardSetting/brand') },
      { path: 'footerLinks', name: '医诺寰球', component: () => import('@/views/back/main/DashboardSetting/FooterLinks') },
      { path: 'friendLink', name: '友情链接', component: () => import('@/views/back/main/DashboardSetting/friendLink') },
      { path: 'publish', name: '官方发布', component: () => import('@/views/back/main/DashboardSetting/publish') },
      { path: 'contactUs', name: '联系我们', component: () => import('@/views/back/main/DashboardSetting/ContactUs') }
    ]
  },
  {
    path: '/drugDbBack',
    component: Layout,
    name: '医疗数据库',
    children: [
      { path: 'drugDb', name: '医药数据', component: () => import('@/views/back/main/OtherPageSetting/DrugDb/edit') },
      { path: 'medicineManage', name: '药品管理', component: () => import('@/views/back/main/MedicineManage') },
      { path: 'diseaseManage', name: '疾病管理', component: () => import('@/views/back/main/DiseaseManage/page') },
      { path: 'diseaseTypeManage', name: '疾病类型管理', component: () => import('@/views/back/main/DiseaseTypeManage') }
    ]
  },
  {
    path: '/caseBack',
    component: Layout,
    name: '案例管理',
    children: [
      { path: 'caseManage', name: '治疗案例管理', component: () => import('@/views/back/main/CasesManageNew') },
      { path: 'caseChannelManage', name: '案例频道栏目', component: () => import('@/views/back/main/CasesChannelItems') }
    ]
  },
  /* {
    path: '/medicalNews',
    component: Layout,
    name: '新闻管理',
    children: [
      { path: '', name: '医疗新闻管理', component: () => import('@/views/back/main/MedicalNews') }
    ]
  },*/
  {
    path: '/medicalArticle',
    component: Layout,
    name: '文章管理',
    children: [
      { path: 'articleManage', name: '医疗新闻管理', component: () => import('@/views/back/main/MedicalArticle') },
      { path: 'articleChannelManage', name: '新闻频道管理', component: () => import('@/views/back/main/ChannelItems') }
    ]
  },
  {
    path: '/aboutUs',
    component: Layout,
    name: '关于我们',
    children: [
      { path: 'about', name: '关于我们', component: () => import('@/views/back/main/OtherPageSetting/About/edit') }
    ]
  },
  {
    path: '/searchWord',
    component: Layout,
    name: '搜索词',
    children: [
      { path: 'searchWord', name: '搜索词', component: () => import('@/views/back/main/searchWord') }
    ]
  }
]

