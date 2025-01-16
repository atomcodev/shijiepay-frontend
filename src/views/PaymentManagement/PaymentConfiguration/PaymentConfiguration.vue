<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { ElCheckboxButton } from 'element-plus'
import { ElSwitch } from 'element-plus'
import { ref, onMounted } from 'vue'
import { Infotip } from '@/components/Infotip'
import { useI18n } from '@/hooks/web/useI18n'
import { Breadcrumb } from '@/components/Breadcrumb'
import { getPayoutConfigApi, updatePayoutConfigApi } from '@/api/paymentmanagement'
import { BankType } from '@/api/paymentmanagement/types'

const banks = ref<BankType[]>([])
const selectedBanks = ref<BankType[]>([])
const paymentServiceEnabled = ref(false)
const loading = ref(false) // Loading state
const { t } = useI18n()

const fetchBanks = async () => {
  loading.value = true
  try {
    const response = await getPayoutConfigApi()
    if (response && response.data && response.data.bank_datas) {
      banks.value = response.data.bank_datas.map((bank) => ({
        code: bank.code,
        name: bank.shortName,
        logo: bank.logo,
        transferSupported: bank.transferSupported
      }))

      const selectedBanksCodes = response.data.site_data.maintain_bankcodes || []
      selectedBanks.value = banks.value.filter((bank) => selectedBanksCodes.includes(bank.code))

      paymentServiceEnabled.value = response.data.site_data.maintain_switch ? true : false
    } else {
      console.error('No bank data found in the response')
    }
  } catch (error) {
    console.error('Error fetching bank data:', error)
  } finally {
    loading.value = false
  }
}
const toggleBankSelection = (bank: BankType) => {
  if (selectedBanks.value.includes(bank)) {
    selectedBanks.value = selectedBanks.value.filter((b) => b !== bank)
  } else {
    selectedBanks.value.push(bank)
  }
}
const submitSelectedBank = async () => {
  loading.value = true
  try {
    const action = 'updateConfig'
    const maintain_switch = paymentServiceEnabled.value
    const maintain_bankcodes = selectedBanks.value.map((bank) => bank.code).join(',')
    const response = await updatePayoutConfigApi(action, maintain_switch, maintain_bankcodes)
    if (response && response.data && response.data.code == 200) {
      alert('Success')
    } else {
      console.error('No data in response')
    }
  } catch (error) {
    console.error('Error fetching bank data:', error)
  } finally {
    loading.value = false
  }
}

const resetSelection = () => {
  selectedBanks.value = []
  paymentServiceEnabled.value = false
}
const keyClick = (key: string) => {
  if (key === t('iconDemo.accessAddress')) {
    window.open('https://iconify.design/')
  }
}

onMounted(() => {
  fetchBanks()
})
</script>

<template>
  <ContentWrap style="margin-bottom: 20px; padding: 20px">
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
  <ContentWrap style="margin-bottom: 20px">
    <div class="header">
      <h2>{{ t('iconDemo.accessAddress') }}</h2>
      <div class="actions">
        <BaseButton type="primary" @click="submitSelectedBank">{{
          t('paymentManagement.submit')
        }}</BaseButton>
        <BaseButton @click="resetSelection">{{ t('paymentManagement.reset') }}</BaseButton>
      </div>
    </div>
    <div class="page-body">
      <div>
        <h2 style="font-size: 16px">{{ t('paymentManagement.selectBankTitle') }}</h2>
        <p>{{ t('paymentManagement.selectBank') }}</p>
      </div>
      <div class="bank-buttons">
        <ElCheckboxButton
          v-for="bank in banks"
          :key="bank.code"
          :label="bank"
          :model-value="selectedBanks.includes(bank)"
          @change="toggleBankSelection(bank)"
        >
          {{ bank.name }}
        </ElCheckboxButton>
      </div>
    </div>
  </ContentWrap>
  <ContentWrap style="padding: 20px">
    <p>{{ t('paymentManagement.switchTitle') }}</p>
    <div class="service-section">
      <label>{{ t('paymentManagement.switch') }}</label>
      <ElSwitch v-model="paymentServiceEnabled" />
    </div>
  </ContentWrap>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #fafafa;
}

.header h2 {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.page-body {
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 30px;
}

.actions {
  display: flex;
  gap: 10px;
}

.service-section {
  width: 40%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.bank-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 0;
}

:deep(.el-card__body) {
  padding: 0%;
}

:deep(.el-checkbox-button__inner) {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
  cursor: pointer;
}
</style>
