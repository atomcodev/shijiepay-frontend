<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'
import { ContentWrap } from '@/components/ContentWrap'
import { ElInputNumber } from 'element-plus'

const { t } = useI18n()
</script>
<template>
  <ContentWrap>
    <div class="config-section">
      <p>{{ t('configuration.loginSetting') }}</p>
      <div class="config-input-div">
        <label>{{ t('configuration.loginPeriod') }}</label>
        <ElInputNumber :controls-position="'right'" :placeholder="t('configuration.loginPeriod')" />
      </div>
      <div class="config-input-div">
        <label>{{ t('configuration.loginPeriod') }}</label>
        <ElInputNumber
          :controls-position="'right'"
          :placeholder="t('configuration.operationsideLogin')"
        />
      </div>
      <div class="config-input-div">
        <label>{{ t('configuration.loginPeriod') }}</label>
        <ElInputNumber
          :controls-position="'right'"
          :placeholder="t('configuration.validityPeriod')"
        />
      </div>
    </div>
  </ContentWrap>
</template>
<style lang="css" scoped>
.config-section {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin-left: 15px;
}
.config-section > * {
  /* margin-bottom: 10px; */
  width: 100%;
}
.config-section * {
  text-align: left;
}
.config-input-div {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
}
.config-input-div > * {
  margin-bottom: 10px;
}
.el-input-number {
  width: 100%;
}
</style>
