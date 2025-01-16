<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'
import { ContentWrap } from '@/components/ContentWrap'
import { ElSwitch } from 'element-plus'
import { ref } from 'vue'

const switchValue = ref(false)
const { t } = useI18n()
</script>
<template>
  <ContentWrap>
    <div class="config-section">
      <p>{{ t('configuration.googleVerify') }}</p>
    </div>
    <div class="config-section">
      <span class="google-span">
        <label>{{ t('configuration.googleSwitch') }}</label>
        <ElSwitch v-model="switchValue" />
      </span>
    </div>
  </ContentWrap>
</template>
<style lang="css" scoped>
.google-span {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
</style>
