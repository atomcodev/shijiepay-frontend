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
const { loading, dataList, total, currentPage, pageSize } = tableState
const { getList } = tableMethods

const searchParams = ref({})
const setSearchParams = (params: any) => {
  searchParams.value = params
  getList()
}

const { t } = useI18n()

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'OrderNumber',
    label: t('collectionManagement.orderNumber'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('collectionManagement.orderNumber')
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
    label: t('collectionManagement.merchantName'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('collectionManagement.merchantName')
      }
    }
  },
  {
    field: 'MerchantOrderNumber',
    label: t('collectionManagement.merchantOrderNumber'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('collectionManagement.merchantOrderNumber')
      }
    }
  },
  {
    field: 'PaymentCardNumber',
    label: t('collectionManagement.cardNumber'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('collectionManagement.cardNumber')
      }
    }
  },
  {
    field: 'OrderAmount',
    label: t('collectionManagement.orderAmount'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('collectionManagement.orderAmount')
      }
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
    field: 'Source',
    label: t('collectionManagement.source'),
    search: {
      hidden: true
    }
  },
  {
    field: 'Reason',
    label: t('collectionManagement.reason'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('collectionManagement.reason')
      }
    }
  },
  {
    field: 'ProcessingStatus',
    label: t('collectionManagement.processingStatus'),
    search: {
      hidden: true
    }
  },
  {
    field: 'Remark',
    label: t('collectionManagement.remark'),
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
        startPlaceholder: t('collectionManagement.orderStartTime'),
        endPlaceholder: t('collectionManagement.orderEndTime'),
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
    field: 'paymentTime',
    label: t('collectionManagement.paymentTime'),
    search: {
      hidden: true
    }
  },
  {
    field: 'ProcessingTime',
    label: t('collectionManagement.processingTime'),
    search: {
      component: 'DatePicker',
      componentProps: {
        type: 'datetimerange',
        startPlaceholder: t('collectionManagement.processingStartTime'),
        endPlaceholder: t('collectionManagement.processingEndTime'),
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
<style lang="css">
/* //search-section */
</style>
