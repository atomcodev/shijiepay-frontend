<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'
import { useValidator } from '@/hooks/web/useValidator'
import { ContentWrap } from '@/components/ContentWrap'
import { BaseButton } from '@/components/Button'
import { ElInput } from 'element-plus'
import { reactive } from 'vue'

const { t } = useI18n()
const { required } = useValidator()
const rules = reactive({
  label: [required()],
  value: [required()]
})
</script>
<template>
  <div class="config-header">
    <h4>{{ t('router.configuration') }}</h4>
    <span>
      <BaseButton type="primary">{{ t('configuration.saveButton') }}</BaseButton>
      <BaseButton>{{ t('common.reset') }}</BaseButton>
    </span>
  </div>
  <ContentWrap>
    <div class="config-section">
      <p>{{ t('configuration.notice') }}</p>
      <ElInput :rules="rules" type="textarea" />
    </div>
  </ContentWrap>
</template>
<style lang="css">
.config-section {
  max-width: 600px;
  margin-left: 15px;
}
.config-section textarea {
  min-height: 120px !important;
}
.config-header {
  display: flex;
  justify-content: space-between;
  background-color: #eeeded;
  padding: 10px;
}
.config-header h4 {
  padding-left: 15px;
  line-height: 32px;
}
</style>
