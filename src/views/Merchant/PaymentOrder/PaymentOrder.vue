<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/CustomSearch'
import { ElMessage, ElMessageBox, ElRow, ElCol } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { getTableListApi, delTableListApi } from '@/api/table'
import { useTable } from '@/hooks/web/useTable'
import { TableData } from '@/api/table/types'
import { ref, unref, reactive } from 'vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { Breadcrumb } from '@/components/Breadcrumb'
import { useEventBus } from '@/hooks/event/useEventBus'
import { Dialog } from '@/components/Dialog'

const ids = ref<string[]>([])

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

const dataList = reactive([
  {
    id: 1,
    OrderNumber: 'ORD12345',
    MerchantName: 'Merchant A',
    MerchantOrderNumber: 'MO123',
    PaymentInformation: 'Card Payment',
    OrderAmount: '100.00',
    Fees: '2.00',
    paymentCode: 'PC123',
    OrderTime: '2024-01-01 12:00:00',
    PaymentStatus: 1,
    PaymentChannels: 'Channel A',
    PaymentTime: '2024-01-01 12:30:00',
    CallbackStatus: 'success',
    CallbackType: 'type1',
    CallbackTime: '2024-01-01 12:45:00',
    Operate: 'Details'
  },
  {
    id: 2,
    OrderNumber: 'ORD67890',
    MerchantName: 'Merchant B',
    MerchantOrderNumber: 'MO456',
    PaymentInformation: 'Bank Transfer',
    OrderAmount: '200.00',
    Fees: '3.50',
    paymentCode: 'PC456',
    OrderTime: '2024-01-02 15:00:00',
    PaymentStatus: 0,
    PaymentChannels: 'Channel B',
    PaymentTime: null,
    CallbackStatus: 'failed',
    CallbackType: 'type2',
    CallbackTime: null,
    Operate: 'Details'
  },
  {
    id: 3,
    OrderNumber: 'ORD11122',
    MerchantName: 'Merchant C',
    MerchantOrderNumber: 'MO789',
    PaymentInformation: 'PayPal',
    OrderAmount: '50.00',
    Fees: '1.50',
    paymentCode: 'PC789',
    OrderTime: '2024-01-03 10:00:00',
    PaymentStatus: 2,
    PaymentChannels: 'Channel C',
    PaymentTime: '2024-01-03 10:30:00',
    CallbackStatus: 'not_calledback',
    CallbackType: 'type3',
    CallbackTime: null,
    Operate: 'Details'
  }
])

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

const currentRow = ref<TableData | null>(null)
const actionType = ref('')

const showExportOrderData = () => {
  ElMessageBox.confirm(t('paymentManagement.confirmExportData'), t('paymentManagement.warning'), {
    confirmButtonText: t('paymentManagement.ok'),
    cancelButtonText: t('paymentManagement.cancel'),
    type: 'warning',
    center: true
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: 'Delete completed'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}

const statisticsData = reactive({
  orderAmount: 0,
  numberOfOrder: 0,
  orderHandlingFee: 0,
  paymentAmount: 0,
  payments: 0,
  paymentFee: 0,
  callbacks: 0,
  callbackAmount: 0,
  numberFailedCallback: 0,
  failureAmount: 0
})

const showOrderStatistics = () => {
  dialogVisible.value = true
  dialogTitle.value = t('paymentManagement.statistics')
}
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
      <ElCol :span="15" :tag="'h3'" style="text-align: right; padding: 10px">
        {{ t('statisticsData.orderAmount') + ' :' }}
      </ElCol>
      <ElCol :span="9" :tag="'h3'" style="color: black; padding: 10px">
        {{ statisticsData.orderAmount }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="15" :tag="'h3'" style="text-align: right; padding: 10px">
        {{ t('statisticsData.numberOfOrder') + ' :' }}
      </ElCol>
      <ElCol :span="9" :tag="'h3'" style="color: black; padding: 10px">
        {{ statisticsData.numberOfOrder }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="15" :tag="'h3'" style="text-align: right; padding: 10px">
        {{ t('statisticsData.orderHandlingFee') + ' :' }}
      </ElCol>
      <ElCol :span="9" :tag="'h3'" style="color: black; padding: 10px">
        {{ statisticsData.orderHandlingFee }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="15" :tag="'h3'" style="text-align: right; padding: 10px">
        {{ t('statisticsData.paymentAmount') + ' :' }}
      </ElCol>
      <ElCol :span="9" :tag="'h3'" style="color: black; padding: 10px">
        {{ statisticsData.paymentAmount }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="15" :tag="'h3'" style="text-align: right; padding: 10px">
        {{ t('statisticsData.payments') + ' :' }}
      </ElCol>
      <ElCol :span="9" :tag="'h3'" style="color: black; padding: 10px">
        {{ statisticsData.payments }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="15" :tag="'h3'" style="text-align: right; padding: 10px">
        {{ t('statisticsData.paymentFee') + ' :' }}
      </ElCol>
      <ElCol :span="9" :tag="'h3'" style="color: black; padding: 10px">
        {{ statisticsData.paymentFee }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="15" :tag="'h3'" style="text-align: right; padding: 10px">
        {{ t('statisticsData.callbacks') + ' :' }}
      </ElCol>
      <ElCol :span="9" :tag="'h3'" style="color: black; padding: 10px">
        {{ statisticsData.callbacks }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="15" :tag="'h3'" style="text-align: right; padding: 10px">
        {{ t('statisticsData.callbackAmount') + ' :' }}
      </ElCol>
      <ElCol :span="9" :tag="'h3'" style="color: black; padding: 10px">
        {{ statisticsData.callbackAmount }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="15" :tag="'h3'" style="text-align: right; padding: 10px">
        {{ t('statisticsData.numberFailedCallback') + ' :' }}
      </ElCol>
      <ElCol :span="9" :tag="'h3'" style="color: black; padding: 10px">
        {{ statisticsData.numberFailedCallback }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="15" :tag="'h3'" style="text-align: right; padding: 10px">
        {{ t('statisticsData.failureAmount') + ' :' }}
      </ElCol>
      <ElCol :span="9" :tag="'h3'" style="color: black; padding: 10px">
        {{ statisticsData.failureAmount }}
      </ElCol>
    </ElRow>
  </Dialog>
</template>
<style lang="css">
/* //search-section */
</style>
