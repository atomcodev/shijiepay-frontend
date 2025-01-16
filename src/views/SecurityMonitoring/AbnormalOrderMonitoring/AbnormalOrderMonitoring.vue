<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/CustomSearch'
import { Dialog } from '@/components/Dialog'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { getOrderMonitorApi } from '@/api/systemmonitoring'
import { useTable } from '@/hooks/web/useTable'
import { TableData } from '@/api/table/types'
import { ref, unref, reactive } from 'vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { Breadcrumb } from '@/components/Breadcrumb'
import { useEventBus } from '@/hooks/event/useEventBus'

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const res = await getOrderMonitorApi({
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
    label: t('security.orderNumber'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('security.orderID')
      }
    }
  },
  {
    field: 'MerchantId',
    label: t('security.merchantId'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('security.merchantId')
      }
    }
  },
  {
    field: 'MerchantOrderNumber',
    label: t('security.merchantOrderNumber'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('security.merchantOrderNumber')
      }
    }
  },
  {
    field: 'OrderTime',
    label: t('security.orderTime'),
    search: {
      component: 'DatePicker',
      componentProps: {
        type: 'datetimerange',
        startPlaceholder: t('security.orderStartTime'),
        endPlaceholder: t('security.orderEndTime'),
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      }
    }
  },
  {
    field: 'OrderType',
    label: t('security.orderType'),
    search: {
      component: 'Select',
      componentProps: {
        placeholder: t('security.orderType'),
        options: [
          { label: t('security.allOrders'), value: '0' },
          { label: t('security.collection'), value: '1' },
          { label: t('security.payment'), value: '2' }
        ]
      }
    }
  },
  {
    field: 'ExceptionType',
    label: t('security.exceptionType'),
    search: {
      component: 'Select',
      componentProps: {
        placeholder: t('security.callbackStatus'),
        options: [
          { label: t('security.paymentFailedAndNoRefund'), value: '0' },
          { label: t('security.paymentFailure'), value: '1' },
          { label: t('security.paymentNoDeduction'), value: '2' },
          { label: t('security.paymentDeductions'), value: '3' },
          { label: t('security.collectionSuccessfulNotAdd'), value: '4' },
          { label: t('security.collectionSuccessfulAdd'), value: '5' },
          { label: t('security.collectionAdd'), value: '6' },
          { label: t('security.all'), value: '7' }
        ]
      }
    }
  },
  {
    field: 'UpdateTime',
    label: t('security.updateTime'),
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
