<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/CustomSearch'
import { Dialog } from '@/components/Dialog'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { getPayoutOrderCheckApi } from '@/api/systemmonitoring'
import { useTable } from '@/hooks/web/useTable'
import { TableData } from '@/api/table/types'
import { ref, unref, reactive } from 'vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { Breadcrumb } from '@/components/Breadcrumb'
import { useEventBus } from '@/hooks/event/useEventBus'

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const res = await getPayoutOrderCheckApi({
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
    field: 'MerchantName',
    label: t('security.merchantName'),
    search: {
      hidden: true
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
    field: 'ReceivingBank',
    label: t('security.receivingBank'),
    search: {
      hidden: true
    }
  },
  {
    field: 'ReceivingAccount',
    label: t('security.receivingAccount'),
    search: {
      hidden: true
    }
  },
  {
    field: 'DebitCardName',
    label: t('security.debitCardName'),
    search: {
      hidden: true
    }
  },
  {
    field: 'State',
    label: t('security.state'),
    search: {
      hidden: true
    }
  },
  {
    field: 'OrderTime',
    label: t('security.orderTime'),
    search: {
      component: 'DatePicker',
      componentProps: {
        type: 'datetimerange',
        placeholder: t('collectionManagement.time'),
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      }
    }
  },
  {
    field: 'Operate',
    label: t('security.operate'),
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
