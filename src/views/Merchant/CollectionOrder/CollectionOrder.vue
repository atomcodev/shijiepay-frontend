<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import Search from './components/Search.vue'
import { Dialog } from '@/components/Dialog'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { getTableListApi, delTableListApi } from '@/api/table'
import { useTable } from '@/hooks/web/useTable'
import { TableData } from '@/api/table/types'
import { ref, unref, reactive } from 'vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { Breadcrumb } from '@/components/Breadcrumb'
import { ElMessage, ElMessageBox, ElRow, ElCol } from 'element-plus'

const ids = ref<string[]>([])

const { t } = useI18n()

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

const totalData = reactive({
  orderAmount: 0,
  actualAmount: 0,
  actualNumber: 0,
  actualFee: 0,
  callbackAmount: 0,
  callbackNumber: 0,
  AmountDropped: 0,
  NumberDropped: 0
})

const { loading, dataList, total, currentPage, pageSize } = tableState
const { getList } = tableMethods

const searchParams = ref({})
const setSearchParams = (params: any) => {
  searchParams.value = params
  getList()
}

const saveLoading = ref(false)
const getTotal = (params: any) => {
  searchParams.value = params
  totalDialogVisible.value = true
}
const showExport = (params: any) => {
  ElMessageBox.confirm(t('paymentManagement.confirmExportData'), t('common.delWarning'), {
    confirmButtonText: t('common.delOk'),
    cancelButtonText: t('common.delCancel'),
    type: 'warning',
    boxType: 'confirm'
  })
    .then(async () => {
      try {
        saveLoading.value = true
        // 这里可以调用修改密码的接口
        // ElMessage.success('修改成功')
      } catch (error) {
        console.log(error)
      } finally {
        saveLoading.value = false
      }
    })
    .catch(() => {})
}

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'OurOrderNumber',
    label: t('collectionManagement.ourOrderNumber'),
    search: {
      hidden: true
    },
    form: {
      component: 'Input',
      colProps: {
        span: 24
      }
    },
    detail: {
      span: 24
    }
  },
  {
    field: 'MerchantName',
    label: t('collectionManagement.merchantName'),
    search: {
      hidden: true
    }
  },
  {
    field: 'PlatformOrderNumber',
    label: t('collectionManagement.platformOrderNumber'),
    search: {
      hidden: true
    }
  },
  {
    field: 'Third-partyOrderNumber',
    label: t('collectionManagement.thirdpartyOrderNumber'),
    search: {
      hidden: true
    }
  },
  {
    field: 'AccountInformation',
    label: t('collectionManagement.accountInformation'),
    search: {
      hidden: true
    }
  },
  {
    field: 'PaymentMode',
    label: t('collectionManagement.paymentMode'),
    search: {
      component: 'Select',
      componentProps: {
        placeholder: t('collectionManagement.paymentMode'),
        options: [
          { label: t('collectionManagement.paid'), value: '0' },
          { label: t('collectionManagement.notpaid'), value: '1' },
          { label: t('collectionManagement.all'), value: '2' }
        ]
      }
    }
  },
  {
    field: 'PaymentChannels',
    label: t('collectionManagement.paymentChannels'),
    search: {
      hidden: true
    }
  },
  {
    field: 'OrderAmount',
    label: t('collectionManagement.orderAmount'),
    search: {
      hidden: true
    }
  },
  {
    field: 'Fees',
    label: t('collectionManagement.fees'),
    search: {
      hidden: true
    }
  },
  {
    field: 'PaymentAmount',
    label: t('collectionManagement.paymentAmount'),
    search: {
      hidden: true
    }
  },
  {
    field: 'OrderTime',
    label: t('collectionManagement.orderTime'),
    search: {
      component: 'DatePicker',
      componentProps: {
        type: 'datetimerange',
        placeholder: t('collectionManagement.orderTime'),
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
    label: t('collectionManagement.paymentStatus'),
    search: {
      component: 'Select',
      componentProps: {
        placeholder: t('collectionManagement.paymentStatus'),
        options: [
          { label: t('collectionManagement.paid'), value: '0' },
          { label: t('collectionManagement.notpaid'), value: '1' },
          { label: t('collectionManagement.all'), value: '2' }
        ]
      }
    }
  },
  {
    field: 'CallbackStatus',
    label: t('collectionManagement.callbackStatus'),
    search: {
      component: 'Select',
      componentProps: {
        placeholder: t('collectionManagement.callbackStatus'),
        options: [
          { label: t('collectionManagement.success'), value: '0' },
          { label: t('collectionManagement.failed'), value: '1' },
          { label: t('collectionManagement.all'), value: '2' }
        ]
      }
    }
  },
  {
    field: 'CallbackType',
    label: t('collectionManagement.callbackType'),
    search: {
      component: 'Select',
      componentProps: {
        placeholder: t('collectionManagement.callbackType'),
        options: [
          { label: t('collectionManagement.manual'), value: '0' },
          { label: t('collectionManagement.automatic'), value: '1' },
          { label: t('collectionManagement.all'), value: '2' }
        ]
      }
    }
  },
  {
    field: 'CallbackTime',
    label: t('collectionManagement.callbackTime'),
    search: {
      component: 'DatePicker',
      componentProps: {
        type: 'datetimerange',
        placeholder: t('collectionManagement.orderTime'),
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      }
    }
  },
  {
    field: 'Operate',
    label: t('collectionManagement.operate'),
    search: {
      hidden: true
    }
  },
  {
    search: {
      component: 'Select',
      label: t('collectionManagement.selectSearchType'),
      componentProps: {
        placeholder: t('collectionManagement.selectSearchType'),
        options: [
          { label: t('collectionManagement.merchantID'), value: '0' },
          { label: t('collectionManagement.merchantName'), value: '1' },
          { label: t('collectionManagement.cardNumber'), value: '2' },
          { label: t('collectionManagement.orderNumber'), value: '3' },
          { label: t('collectionManagement.merchantOrderNumber'), value: '4' },
          { label: t('collectionManagement.actualAmount'), value: '5' },
          { label: t('collectionManagement.remark'), value: '6' }
        ]
      }
    }
  },
  {
    search: {
      component: 'Input',
      label: t('collectionManagement.searchContent'),
      componentProps: {
        placeholder: t('collectionManagement.searchContent')
      }
    }
  }
])

// @ts-ignore
const { allSchemas } = useCrudSchemas(crudSchemas)
const totalDialogVisible = ref(false)

const currentRow = ref<TableData | null>(null)
const actionType = ref('')
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
        show-total
        show-export-data
        @search="setSearchParams"
        @reset="setSearchParams"
        @export-data="showExport"
        @total="getTotal"
      />
    </div>
    <!-- <div class="mb-10px">
      <BaseButton type="primary" @click="AddAction">{{ t('exampleDemo.add') }}</BaseButton>
      <BaseButton :loading="delLoading" type="danger" @click="delData(null)">
        {{ t('exampleDemo.del') }}
      </BaseButton>
    </div> -->
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

  <Dialog v-model="totalDialogVisible" :title="t('totalData.total')" :style="{ maxWidth: '500px' }">
    <ElRow>
      <ElCol :span="15" :tag="'h3'" style="text-align: right; padding: 10px">
        {{ t('totalData.orderAmount') + ' :' }}
      </ElCol>
      <ElCol :span="9" :tag="'h3'" style="color: black; padding: 10px">
        {{ totalData.orderAmount }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="15" :tag="'h3'" style="text-align: right; padding: 10px">
        {{ t('totalData.actualAmountPaid') + ' :' }}
      </ElCol>
      <ElCol :span="9" :tag="'h3'" style="color: black; padding: 10px">
        {{ totalData.actualAmount }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="15" :tag="'h3'" style="text-align: right; padding: 10px">
        {{ t('totalData.actualNumberOfPayments') + ' :' }}
      </ElCol>
      <ElCol :span="9" :tag="'h3'" style="color: black; padding: 10px">
        {{ totalData.actualNumber }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="15" :tag="'h3'" style="text-align: right; padding: 10px">
        {{ t('totalData.acutalHandlingFeePaid') + ' :' }}
      </ElCol>
      <ElCol :span="9" :tag="'h3'" style="color: black; padding: 10px">
        {{ totalData.actualFee }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="15" :tag="'h3'" style="text-align: right; padding: 10px">
        {{ t('totalData.callbackAmount') + ' :' }}
      </ElCol>
      <ElCol :span="9" :tag="'h3'" style="color: black; padding: 10px">
        {{ totalData.callbackAmount }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="15" :tag="'h3'" style="text-align: right; padding: 10px">
        {{ t('totalData.callbackNumber') + ' :' }}
      </ElCol>
      <ElCol :span="9" :tag="'h3'" style="color: black; padding: 10px">
        {{ totalData.callbackNumber }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="15" :tag="'h3'" style="text-align: right; padding: 10px">
        {{ t('totalData.amountOfDroppedOrders') + ' :' }}
      </ElCol>
      <ElCol :span="9" :tag="'h3'" style="color: black; padding: 10px">
        {{ totalData.AmountDropped }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="15" :tag="'h3'" style="text-align: right; padding: 10px">
        {{ t('totalData.numberOfDroppedOrders') + ' :' }}
      </ElCol>
      <ElCol :span="9" :tag="'h3'" style="color: black; padding: 10px">
        {{ totalData.NumberDropped }}
      </ElCol>
    </ElRow>
  </Dialog>
</template>
