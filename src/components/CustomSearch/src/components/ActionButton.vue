<script setup lang="ts">
import { useIcon } from '@/hooks/web/useIcon'
import { propTypes } from '@/utils/propTypes'
import { useI18n } from '@/hooks/web/useI18n'

const emit = defineEmits([
  'search',
  'reset',
  'expand',
  'add-account',
  'add-role',
  'add-channel',
  'export-order-data',
  'order-statistics',
  'add-bankcard',
  'apply-settlement'
])

const { t } = useI18n()

defineProps({
  showSearch: propTypes.bool.def(true),
  showReset: propTypes.bool.def(true),
  showExpand: propTypes.bool.def(false),
  showAddAccount: propTypes.bool.def(false),
  showAddRole: propTypes.bool.def(false),
  showAddChannel: propTypes.bool.def(false),
  showExportOrderData: propTypes.bool.def(false),
  showOrderStatistics: propTypes.bool.def(false),
  showAddBankcard: propTypes.bool.def(false),
  showApplySettlement: propTypes.bool.def(false),
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

const onAddAccount = () => {
  emit('add-account')
}

const onAddRole = () => {
  emit('add-role')
}

const onAddChannel = () => {
  emit('add-channel')
}

const onExportOrderData = () => {
  emit('export-order-data')
}

const onOrderStatistics = () => {
  emit('order-statistics')
}

const onAddBankcard = () => {
  emit('add-bankcard')
}

const onApplySettlement = () => {
  emit('apply-settlement')
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
  <BaseButton v-if="showAddAccount" type="warning" @click="onAddAccount">
    {{ t('systemManagement.addAccount') }}
  </BaseButton>
  <BaseButton v-if="showAddRole" type="warning" @click="onAddRole">
    {{ t('systemManagement.addRole') }}
  </BaseButton>
  <BaseButton v-if="showExportOrderData" type="warning" @click="onExportOrderData">
    {{ t('paymentManagement.exportOrderData') }}
  </BaseButton>
  <BaseButton v-if="showOrderStatistics" type="warning" @click="onOrderStatistics">
    {{ t('paymentManagement.statistics') }}
  </BaseButton>
  <BaseButton v-if="showAddBankcard" type="warning" @click="onAddBankcard">
    {{ t('bankCardInfo.addBankcard') }}
  </BaseButton>
  <BaseButton v-if="showApplySettlement" type="warning" @click="onApplySettlement">
    {{ t('bankCardInfo.applySettlement') }}
  </BaseButton>
  <BaseButton v-if="showAddChannel" type="warning" @click="onAddChannel">
    {{ t('common.addChannel') }}
  </BaseButton>
</template>
