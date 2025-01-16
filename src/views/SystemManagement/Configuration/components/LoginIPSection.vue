<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'
import { useValidator } from '@/hooks/web/useValidator'
import { ContentWrap } from '@/components/ContentWrap'
import { reactive } from 'vue'
import { ElInput } from 'element-plus'

const { t } = useI18n()
const { required } = useValidator()
const rules = reactive({
  label: [required()],
  value: [required()]
})
</script>
<template>
  <ContentWrap>
    <div class="config-section">
      <p>{{ t('configuration.loginIPWhitelist') }}</p>
      <ElInput :rules="rules" type="textarea" />
    </div>
  </ContentWrap>
</template>
