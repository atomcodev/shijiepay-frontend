<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/CustomSearch'
import { ElMessageBox, ElRow, ElCol } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import {
  getPayOrderApi,
  getPayConfigStatisticsApi,
  exportPayOrderApi
} from '@/api/paymentmanagement'
import { useTable } from '@/hooks/web/useTable'
import { ref, unref, reactive, onMounted } from 'vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { Breadcrumb } from '@/components/Breadcrumb'
import { useEventBus } from '@/hooks/event/useEventBus'
import { Dialog } from '@/components/Dialog'

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const res = await getPayOrderApi({
      pageIndex: unref(currentPage),
      pageSize: unref(pageSize),
      ...unref(searchParams)
    })
    return {
      list: res.data.list,
      total: res.data.total
    }
  }
})
const { loading, dataList, total, currentPage, pageSize } = tableState
const { getList } = tableMethods

const searchParams = ref({})
const setSearchParams = (params: any) => {
  searchParams.value = params
  getList()
}

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

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'OrderNumber',
    label: t('paymentManagement.orderNumber'),
    search: {
      hidden: true
    }
  },
  {
    field: 'MerchantName',
    label: t('paymentManagement.merchantName'),
    search: {
      hidden: true
    }
  },
  {
    field: 'MerchantOrderNumber',
    label: t('paymentManagement.merchantOrderNumber'),
    search: {
      hidden: true
    }
  },
  {
    field: 'PaymentInformation',
    label: t('paymentManagement.paymentInformation'),
    search: {
      hidden: true
    }
  },
  {
    field: 'OrderAmount',
    label: t('paymentManagement.orderAmount'),
    search: {
      hidden: true
    }
  },
  {
    field: 'Fees',
    label: t('paymentManagement.fees'),
    search: {
      hidden: true
    }
  },
  {
    field: 'paymentCode',
    label: t('paymentManagement.paymentCode'),
    search: {
      hidden: true
    }
  },
  {
    field: 'OrderTime',
    label: t('paymentManagement.orderTime'),
    search: {
      component: 'DatePicker',
      componentProps: {
        type: 'datetimerange',
        placeholder: t('paymentManagement.orderTime'),
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      }
    },
    form: {
      component: 'DatePicker',
      componentProps: {
        type: 'datetimerange'
        // valueFormat: 'YYYY-MM-DD HH:mm:ss'
      }
    }
  },
  {
    field: 'PaymentStatus',
    label: t('paymentManagement.paymentStatus'),
    search: {
      component: 'Select',
      componentProps: {
        placeholder: t('paymentManagement.paymentStatus'),
        options: [
          { label: t('paymentManagement.paid'), value: '1' },
          { label: t('paymentManagement.not_paid'), value: '0' },
          { label: t('paymentManagement.payment_failed'), value: '2' }
        ]
      }
    }
  },
  {
    field: 'PaymentChannels',
    label: t('paymentManagement.paymentChannels'),
    search: {
      hidden: true
    }
  },
  {
    field: 'PaymentTime',
    label: t('paymentManagement.paymentTime'),
    search: {
      component: 'DatePicker',
      componentProps: {
        type: 'datetimerange',
        placeholder: t('paymentManagement.paymentTime'),
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      }
    },
    form: {
      component: 'DatePicker',
      componentProps: {
        type: 'datetimerange'
        // valueFormat: 'YYYY-MM-DD HH:mm:ss'
      }
    }
  },
  {
    field: 'CallbackStatus',
    label: t('paymentManagement.callbackStatus'),
    search: {
      component: 'Select',
      componentProps: {
        placeholder: t('paymentManagement.callbackStatus'),
        options: [
          { label: t('paymentManagement.success'), value: 'success' },
          { label: t('paymentManagement.failed'), value: 'failed' },
          { label: t('paymentManagement.all'), value: 'not_calledback' }
        ]
      }
    }
  },
  {
    field: 'CallbackType',
    label: t('paymentManagement.callbackType'),
    search: {
      hidden: true
    }
  },
  {
    field: 'CallbackTime',
    label: t('paymentManagement.callbackTime'),
    search: {
      hidden: true
    },
    form: {
      component: 'DatePicker',
      componentProps: {
        type: 'datetimerange'
        // valueFormat: 'YYYY-MM-DD HH:mm:ss'
      }
    }
  },
  {
    field: 'Operate',
    label: t('paymentManagement.operate'),
    search: {
      hidden: true
    }
  },
  {
    field: 'SortBy',
    label: t('paymentManagement.sortBy'),
    search: {
      component: 'Select',
      componentProps: {
        placeholder: t('paymentManagement.sortBy'),
        options: [
          { label: t('paymentManagement.order_time_0'), value: 'order_time_0' },
          { label: t('paymentManagement.order_time_1'), value: 'order_time_1' }
        ]
      }
    },
    table: {
      hidden: true
    }
  },
  {
    field: 'selectSearchType',
    label: t('paymentManagement.selectSearchType'),
    search: {
      component: 'Select',
      componentProps: {
        placeholder: t('paymentManagement.selectSearchType'),
        options: [
          { label: t('paymentManagement.merchantID'), value: 'merchant_id' },
          { label: t('paymentManagement.merchantName'), value: 'merchant_name' },
          { label: t('paymentManagement.bankcardAccount'), value: 'bankcard_account' },
          { label: t('paymentManagement.orderId'), value: 'order_id' },
          { label: t('paymentManagement.merchantOrderID'), value: 'merchant_order_id' },
          { label: t('paymentManagement.orderAmount'), value: 'order_amount' },
          { label: t('paymentManagement.actualAmount'), value: 'actual_amount' },
          { label: t('paymentManagement.receiveAccount'), value: 'receive_account' },
          { label: t('paymentManagement.receiveOwner'), value: 'receive_owner' },
          { label: t('paymentManagement.agentadminAccount'), value: 'agentadmin_account' },
          { label: t('paymentManagement.outMoneyUserId'), value: 'out_money_userid' }
        ]
      }
    },
    table: {
      hidden: true
    }
  },
  {
    field: 'SearchContent',
    label: t('paymentManagement.searchContent'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('paymentManagement.searchContent')
      }
    },
    table: {
      hidden: true
    }
  }
])

// @ts-ignore
const { allSchemas } = useCrudSchemas(crudSchemas)

const dialogVisible = ref(false)
const dialogTitle = ref('')

const showExportOrderData = async () => {
  try {
    // Await for the confirmation dialog
    await ElMessageBox.confirm(
      t('paymentManagement.confirmExportData'),
      t('paymentManagement.warning'),
      {
        confirmButtonText: t('paymentManagement.ok'),
        cancelButtonText: t('paymentManagement.cancel'),
        type: 'warning',
        center: true
      }
    )

    // If the user confirms, proceed to export
    const response = await exportPayOrderApi()
    if (response && response.code == 200) {
      alert('Success')
    }
  } catch (error) {
    // Handles user cancelation or other errors
    console.log('Action canceled or an error occurred:', error)
  }
}

interface StaData {
  actual_amount_total: string
  callback_amount_total: string
  callback_order_count: number
  nf_callback_amount: string
  nf_callback_count: number
  order_amount_total: string
  pay_repay_amount_total: string
  repay_amount_total: string
  total_order_count: number
  total_pay_count: number
}

const statisticsData = ref<StaData>()

const fetchStatistics = async () => {
  loading.value = true
  try {
    const response = await getPayConfigStatisticsApi()
    if (response && response.data) {
      statisticsData.value = response.data
    } else {
      console.error('No data in response')
    }
  } catch (error) {
    console.error('Error fetching bank data:', error)
  } finally {
    loading.value = false
  }
}

const showOrderStatistics = () => {
  dialogVisible.value = true
  dialogTitle.value = t('paymentManagement.statistics')
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
    <div class="log-search">
      <!-- <p style="min-width: 50px; padding-top: 8px">{{ t('common.search') }} :</p> -->
      <Search
        :schema="allSchemas.searchSchema"
        show-export-order-data
        show-order-statistics
        @export-order-data="showExportOrderData"
        @order-statistics="showOrderStatistics"
        @search="setSearchParams"
        @reset="setSearchParams"
      />
    </div>
  </ContentWrap>
  <ContentWrap :style="{ minHeight: '700px' }">
    <Table
      v-model:pageSize="pageSize"
      v-model:currentPage="currentPage"
      :columns="allSchemas.tableColumns"
      :data="dataList"
      :loading="loading"
      :pagination="{
        total: total
      }"
      @register="tableRegister"
    />
  </ContentWrap>

  <Dialog v-model="dialogVisible" :title="t('statisticsData.title')" :style="{ maxWidth: '600px' }">
    <ElRow>
      <ElCol :span="20" :tag="'h3'" style="text-align: left; padding: 10px; padding-left: 50px">
        {{ t('statisticsData.orderAmount') + ' :' }}
      </ElCol>
      <ElCol :span="4" :tag="'h3'" style="color: black; padding: 10px">
        {{ statisticsData ? statisticsData.order_amount_total : ' ' }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="20" :tag="'h3'" style="text-align: left; padding: 10px; padding-left: 50px">
        {{ t('statisticsData.numberOfOrder') + ' :' }}
      </ElCol>
      <ElCol :span="4" :tag="'h3'" style="color: black; padding: 10px">
        {{ statisticsData ? statisticsData.total_order_count : ' ' }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="20" :tag="'h3'" style="text-align: left; padding: 10px; padding-left: 50px">
        {{ t('statisticsData.orderHandlingFee') + ' :' }}
      </ElCol>
      <ElCol :span="4" :tag="'h3'" style="color: black; padding: 10px">
        {{ statisticsData ? statisticsData.repay_amount_total : ' ' }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="20" :tag="'h3'" style="text-align: left; padding: 10px; padding-left: 50px">
        {{ t('statisticsData.paymentAmount') + ' :' }}
      </ElCol>
      <ElCol :span="4" :tag="'h3'" style="color: black; padding: 10px">
        {{ statisticsData ? statisticsData.actual_amount_total : ' ' }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="20" :tag="'h3'" style="text-align: left; padding: 10px; padding-left: 50px">
        {{ t('statisticsData.payments') + ' :' }}
      </ElCol>
      <ElCol :span="4" :tag="'h3'" style="color: black; padding: 10px">
        {{ statisticsData ? statisticsData.total_pay_count : ' ' }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="20" :tag="'h3'" style="text-align: left; padding: 10px; padding-left: 50px">
        {{ t('statisticsData.paymentFee') + ' :' }}
      </ElCol>
      <ElCol :span="4" :tag="'h3'" style="color: black; padding: 10px">
        {{ statisticsData ? statisticsData.pay_repay_amount_total : ' ' }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="20" :tag="'h3'" style="text-align: left; padding: 10px; padding-left: 50px">
        {{ t('statisticsData.callbacks') + ' :' }}
      </ElCol>
      <ElCol :span="4" :tag="'h3'" style="color: black; padding: 10px">
        {{ statisticsData ? statisticsData.callback_order_count : ' ' }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="20" :tag="'h3'" style="text-align: left; padding: 10px; padding-left: 50px">
        {{ t('statisticsData.callbackAmount') + ' :' }}
      </ElCol>
      <ElCol :span="4" :tag="'h3'" style="color: black; padding: 10px">
        {{ statisticsData ? statisticsData.callback_amount_total : ' ' }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="20" :tag="'h3'" style="text-align: left; padding: 10px; padding-left: 50px">
        {{ t('statisticsData.numberFailedCallback') + ' :' }}
      </ElCol>
      <ElCol :span="4" :tag="'h3'" style="color: black; padding: 10px">
        {{ statisticsData ? statisticsData.nf_callback_count : ' ' }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="20" :tag="'h3'" style="text-align: left; padding: 10px; padding-left: 50px">
        {{ t('statisticsData.failureAmount') + ' :' }}
      </ElCol>
      <ElCol :span="4" :tag="'h3'" style="color: black; padding: 10px">
        {{ statisticsData ? statisticsData.nf_callback_amount : ' ' }}
      </ElCol>
    </ElRow>
  </Dialog>
</template>
<style lang="css">
/* //search-section */
</style>