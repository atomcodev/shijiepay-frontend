<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/CustomSearch'
import { useI18n } from '@/hooks/web/useI18n'
import { Table, TableColumn } from '@/components/Table'
import { getTableListApi, delTableListApi } from '@/api/table'
import { useTable } from '@/hooks/web/useTable'
import { reactive, ref, unref, onMounted } from 'vue'
import { useEventBus } from '@/hooks/event/useEventBus'
import { FormSchema } from '@/components/Form'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Dialog } from '@/components/Dialog'
import Write from './components/Write.vue'
import { getWithdrawalStatistics } from '@/api/merchantmanagement'

defineOptions({
  name: 'ExamplePage'
})

const ids = ref<string[]>([])

const searchParams = ref({})

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const res = await getTableListApi({
      pageIndex: unref(currentPage),
      pageSize: unref(pageSize),
      ...unref(searchParams)
    })
    return {
      list: res.data.list,
      total: res.data.total
    }
  },
  fetchDelApi: async () => {
    const res = await delTableListApi(unref(ids))
    return !!res
  }
})
const { loading, total, currentPage, pageSize } = tableState
const { getList } = tableMethods

getList()

useEventBus({
  name: 'getList',
  callback: (type: string) => {
    if (type === 'add') {
      currentPage.value = 1
    }
    getList()
  }
})

const { t } = useI18n()

const schema = reactive<FormSchema[]>([
  {
    field: 'field1',
    label: t('formDemo.search'),
    component: 'Select',
    componentProps: {
      options: [
        {
          label: t('formDemo.processingstatus'),
          value: '1'
        },
        {
          label: t('formDemo.awaitingreview'),
          value: '2'
        },
        {
          label: t('formDemo.reject'),
          value: '3'
        },
        {
          label: t('formDemo.success'),
          value: '4'
        }
      ],
      class: 'list-of-roles select-state'
      // modelValue: '1'
    }
  },
  {
    field: 'merchantnameormerchantid',
    label: t('formDemo.merchantnameormerchantid'),
    component: 'Input',
    componentProps: {
      placeholder: t('formDemo.merchantnameormerchantid') // Set the placeholder text
    }
  },
  {
    field: 'receivingbandcardnumber',
    label: t('formDemo.receivingbandcardnumber'),
    component: 'Input',
    componentProps: {
      placeholder: t('formDemo.receivingbandcardnumber') // Set the placeholder text
    }
  },
  {
    field: 'amount',
    label: t('formDemo.amount'),
    component: 'Input',
    componentProps: {
      placeholder: t('formDemo.amount') // Set the placeholder text
    }
  },
  {
    field: 'date',
    label: t('formDemo.datePlaceholder'),
    component: 'DatePicker',
    componentProps: {
      type: 'datetimerange',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      placeholder: t('formDemo.datePlaceholder')
    }
  }
])

const columns = reactive<TableColumn[]>([
  {
    field: 'merchantname',
    label: t('formDemo.merchantname')
  },
  {
    field: 'proxyaccount',
    label: t('formDemo.proxyaccount')
  },
  {
    field: 'merchantid',
    label: t('formDemo.merchantid')
  },
  {
    field: 'receiveingbank',
    label: t('formDemo.receivingbank')
  },
  {
    field: 'paymentcardnumber',
    label: t('formDemo.paymentcardnumber')
  },
  {
    field: 'payeename',
    label: t('formDemo.payeename')
  },
  {
    field: 'withdrawalamount',
    label: t('formDemo.withdrawalamount')
  },
  {
    field: 'fees',
    label: t('formDemo.fees')
  },
  {
    field: 'actualdeductionamount',
    label: t('formDemo.actualdeductionamount')
  },
  {
    field: 'processingstatus',
    label: t('formDemo.processingstatus')
  },
  {
    field: 'handler',
    label: t('formDemo.handler')
  },
  {
    field: 'processingtime',
    label: t('formDemo.processingtime')
  },
  {
    field: 'applicationperiod',
    label: t('formDemo.applicationperiod')
  },
  {
    field: 'operate',
    label: t('formDemo.operate')
  }
])

const dialogVisible = ref(false)
const dialogTitle = 'Order data statistics'
const actionType = ref('')

const showDialog = () => {
  dialogVisible.value = true
}
interface setData {
  amount_total: number
  number_count: string
}

const totalData = ref<setData>()

const fetchStatistics = async () => {
  loading.value = true
  try {
    const response = await getWithdrawalStatistics()
    if (response && response.data) {
      totalData.value = response.data
    } else {
      console.error('No data in response')
    }
  } catch (error) {
    console.error('Error fetching bank data:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchStatistics() // Fetch bank data when the component is mounted
})
</script>

<template>
  <ContentWrap style="margin-bottom: 20px">
    <Breadcrumb class="<md:hidden" />
  </ContentWrap>
  <ContentWrap class="search-section">
    <div>
      <Search :schema="schema" show-add-statistics @show-dialog="showDialog" />
    </div>
  </ContentWrap>
  <ContentWrap style="height: 700px">
    <Table
      v-model:pageSize="pageSize"
      v-model:currentPage="currentPage"
      :columns="columns"
      row-key="id"
      :loading="loading"
      sortable
      :pagination="{
        total: total
      }"
      @register="tableRegister"
      style="height: 550px; font-size: small"
    />
  </ContentWrap>

  <Dialog v-model="dialogVisible" :title="dialogTitle">
    <Write v-if="actionType !== 'detail'" ref="writeRef" :totalData="totalData" />
  </Dialog>
</template>

<style>
.list-of-roles {
  min-width: auto !important;
}
.el-form-item:has(.list-of-roles) {
  margin-right: 0.5rem !important;
}
</style>