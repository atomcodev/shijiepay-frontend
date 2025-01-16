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
import { useEventBus } from '@/hooks/event/useEventBus'

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
// const { loading, dataList, total, currentPage, pageSize } = tableState
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
const dataList = reactive([
  {
    OrderID: 'ORD12345',
    MerchantName: 'Merchant A',
    MerchantOrderID: 'MO123',
    CallbackAddress: 'https://example.com/callback',
    CallbackContent: 'Content A',
    CallbackStatus: '0',
    ResponseCode: '200',
    ResponseContent: 'OK',
    Time: '2024-01-01 10:00:00',
    Remark: 'Success'
  },
  {
    OrderID: 'ORD67890',
    MerchantName: 'Merchant B',
    MerchantOrderID: 'MO456',
    CallbackAddress: 'https://example.com/callback2',
    CallbackContent: 'Content B',
    CallbackStatus: '1',
    ResponseCode: '500',
    ResponseContent: 'Failed',
    Time: '2024-01-02 15:00:00',
    Remark: 'Failed'
  },
  {
    OrderID: 'ORD11122',
    MerchantName: 'Merchant C',
    MerchantOrderID: 'MO789',
    CallbackAddress: 'https://example.com/callback3',
    CallbackContent: 'Content C',
    CallbackStatus: '2',
    ResponseCode: '404',
    ResponseContent: 'Not Found',
    Time: '2024-01-03 18:30:00',
    Remark: 'Pending'
  }
])

// Dummy pagination variables
const total = ref(dataList.length)
const pageSize = ref(10)
const currentPage = ref(1)

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'OrderID',
    label: t('paymentManagement.orderID'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('paymentManagement.orderID')
      }
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
    label: t('paymentManagement.merchantName'),
    search: {
      hidden: true
    }
  },
  {
    field: 'MerchantOrderID',
    label: t('paymentManagement.merchantOrderID'),
    search: {
      hidden: true
    }
  },
  {
    field: 'CallbackAddress',
    label: t('paymentManagement.callbackAddress'),
    search: {
      hidden: true
    }
  },
  {
    field: 'CallbackContent',
    label: t('paymentManagement.callbackContent'),
    search: {
      hidden: true
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
          { label: t('paymentManagement.success'), value: '0' },
          { label: t('paymentManagement.failed'), value: '1' },
          { label: t('paymentManagement.all'), value: '2' }
        ]
      }
    }
  },
  {
    field: 'ResponseCode',
    label: t('paymentManagement.responseCode'),
    search: {
      hidden: true
    }
  },
  {
    field: 'ResponseContent',
    label: t('paymentManagement.responseContent'),
    search: {
      hidden: true
    }
  },
  {
    field: 'Time',
    label: t('paymentManagement.time'),
    search: {
      component: 'DatePicker',
      componentProps: {
        type: 'datetimerange',
        placeholder: t('paymentManagement.time'),
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
    field: 'Remark',
    label: t('paymentManagement.remark'),
    search: {
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
        @search="setSearchParams"
        @reset="setSearchParams"
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

  <Dialog v-model="dialogVisible" :title="dialogTitle">
    <Write
      v-if="actionType !== 'detail'"
      ref="writeRef"
      :form-schema="allSchemas.formSchema"
      :current-row="currentRow"
    />

    <Detail
      v-if="actionType === 'detail'"
      :detail-schema="allSchemas.detailSchema"
      :current-row="currentRow"
    />
  </Dialog>
</template>
