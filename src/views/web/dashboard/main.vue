<template>
    <div>
      <disease-item/>
      <item-bar name="出国实例" subTitle="出国就医真实案例，让每一位患者享受世界优质医疗服务"/>
      <example-item/>
      <item-bar name="新闻报道" subTitle="国内外多家知名媒体合作，医疗新闻早知道"/>
      <web-news/>
      <item-bar name="医疗新闻资讯" subTitle="国内外医疗前沿快讯，及时掌握第一手消息"/>
      <medical-report/>
      <item-bar name="品牌实力" subTitle="优质医疗资源，专业咨询团队，延续生命无限可能"/>
      <brand/>
      <logo-display/>
    </div>
</template>

<script>
  import { ItemBar, DiseaseItem, ExampleItem, WebNews, MedicalReport, brand, LogoDisplay } from './components'
  export default {
    name: 'main',
    components: {
      ItemBar,
      DiseaseItem,
      ExampleItem,
      WebNews,
      MedicalReport,
      brand,
      LogoDisplay
    }
  }
</script>

<style scoped>

</style>
