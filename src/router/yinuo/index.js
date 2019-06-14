import Layout from '@/views/layout'

export default [
  {
    path: '/homePage',
    component: Layout,
    name: '首页配置',
    children: [
      { path: 'NavBanner', name: '导航配置', component: () => import('@/views/back/main/DashboardSetting/NavBanner') },
      { path: 'diseaseBase', name: '疾病库', component: () => import('@/views/back/main/DashboardSetting/DiseaseDatabase') },
      { path: 'brand', name: '品牌实力', component: () => import('@/views/back/main/DashboardSetting/brand') },
      { path: 'friendLink', name: '友情链接', component: () => import('@/views/back/main/DashboardSetting/friendLink') },
      { path: 'newsReport', name: '新闻报道', component: () => import('@/views/back/main/DashboardSetting/ReportSetting') },
      { path: 'newsArticle', name: '新闻资讯', component: () => import('@/views/back/main/DashboardSetting/NewsSetting') },
      { path: 'abroadCases', name: '出国实例', component: () => import('@/views/back/main/DashboardSetting/AbroadCases') },
      { path: 'publish', name: '官方发布', component: () => import('@/views/back/main/DashboardSetting/publish') },
      { path: 'contactUs', name: '联系我们', component: () => import('@/views/back/main/DashboardSetting/ContactUs') }
    ]
  },
  {
    path: '/otherPage',
    component: Layout,
    name: '其他配置',
    children: [
      { path: 'about', name: '关于我们', component: () => import('@/views/back/main/OtherPageSetting/About/edit') },
      { path: 'drugDb', name: '医药数据', component: () => import('@/views/back/main/OtherPageSetting/DrugDb/edit') }
    ]
  },
  {
    path: '/user',
    component: Layout,
    name: '用户管理',
    children: [
      { path: '', name: '用户管理', component: () => import('@/views/back/main/user/index') }
    ]
  },
  {
    path: '/medicine',
    component: Layout,
    name: '药品管理',
    children: [
      { path: '', name: '药品管理', component: () => import('@/views/back/main/MedicineManage') },
      { path: 'rank', name: '排行榜管理', component: () => import('@/views/back/main/MedicineManage/rank'), hidden: true }
    ]
  },
  {
    path: '/disease',
    component: Layout,
    name: '疾病管理',
    children: [
      { path: '', name: '疾病管理', component: () => import('@/views/back/main/DiseaseManage/page') }
    ]
  },
  {
    path: '/case',
    component: Layout,
    name: '案例管理',
    children: [
      { path: '', name: '转阴案例管理', component: () => import('@/views/back/main/CasesManage') }
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
      { path: '', name: '医疗文章管理', component: () => import('@/views/back/main/MedicalArticle') }
    ]
  },
  {
    path: '/channel',
    component: Layout,
    name: '频道管理',
    children: [
      { path: '', name: '频道栏目', component: () => import('@/views/back/main/ChannelItems') }
    ]
  }
]
