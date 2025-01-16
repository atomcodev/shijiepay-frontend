<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Infotip } from '@/components/Infotip'
import HeaderSection from './components/HeaderSection.vue'
import LoginSection from './components/LoginSection.vue'
import LoginIPSection from './components/LoginIPSection.vue'
import GoogleSection from './components/GoogleSection.vue'
import { Breadcrumb } from '@/components/Breadcrumb'

const { t } = useI18n()

const keyClick = (key: string) => {
  if (key === t('iconDemo.accessAddress')) {
    window.open('https://iconify.design/')
  }
}
</script>
<template>
  <ContentWrap style="margin-bottom: 20px">
    <Breadcrumb class="<md:hidden" />
  </ContentWrap>
  <Infotip
    :show-index="false"
    :title="`${t('saveDemo.recommendeDes')}`"
    :schema="[
      // {
      //   label: t('saveDemo.recommendeDes'),
      //   keys: []
      // }
    ]"
    :class="'config-infotip'"
    :style="{ padding: '15px 20px' }"
    @click="keyClick"
  />
  <form>
    <HeaderSection />
    <LoginSection />
    <LoginIPSection />
    <GoogleSection />
  </form>
</template>
<style lang="css">
.config-infotip .v-infotip__title {
  font-size: 14px !important;
}
</style>
