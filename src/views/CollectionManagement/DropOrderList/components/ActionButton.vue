<script setup lang="ts">
import { useIcon } from '@/hooks/web/useIcon'
import { propTypes } from '@/utils/propTypes'
import { useI18n } from '@/hooks/web/useI18n'

const emit = defineEmits(['search', 'reset', 'expand'])

const { t } = useI18n()

defineProps({
  showSearch: propTypes.bool.def(true),
  showReset: propTypes.bool.def(true),
  showExpand: propTypes.bool.def(false),
  showTotal: propTypes.bool.def(false),
  showNotProcessing: propTypes.bool.def(false),
  showExportData: propTypes.bool.def(false),
  visible: propTypes.bool.def(true),
  searchLoading: propTypes.bool.def(false),
  resetLoading: propTypes.bool.def(false)
})

const onSearch = () => {
  emit('search')
}

const onReset = () => {
  emit('reset')
}

const onExpand = () => {
  emit('expand')
}

const onTotal = () => {
  console.log('onAddAccount')
}

const onNotProcessing = () => {
  console.log('onAddAccount')
}

const onExportData = () => {
  console.log('onAddAccount')
}
</script>

<template>
  <BaseButton v-if="showSearch" type="primary" :loading="searchLoading" @click="onSearch">
    {{ t('common.search') }}
  </BaseButton>
  <BaseButton v-if="showReset" :loading="resetLoading" plain @click="onReset">
    {{ t('common.reset') }}
  </BaseButton>
  <BaseButton
    v-if="showExpand"
    :icon="useIcon({ icon: visible ? 'vi-ep:arrow-up' : 'vi-ep:arrow-down' })"
    text
    @click="onExpand"
  >
    {{ t(visible ? 'common.shrink' : 'common.expand') }}
  </BaseButton>
  <BaseButton v-if="showTotal" type="warning" @click="onTotal">
    {{ t('collectionManagement.total') }}
  </BaseButton>
  <BaseButton v-if="showNotProcessing" type="warning" @click="onNotProcessing">
    {{ t('collectionManagement.notProcessingYet') }}
  </BaseButton>
  <BaseButton v-if="showExportData" type="warning" @click="onExportData">
    {{ t('collectionManagement.exportOrderData') }}
  </BaseButton>
</template>
