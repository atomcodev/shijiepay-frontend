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
  totalInternalAmount: 0,
  totalInternalFee: 0
})

const { loading, dataList, total, currentPage, pageSize } = tableState
const { getList } = tableMethods

const searchParams = ref({})
const setSearchParams = (params: any) => {
  searchParams.value = params
  getList()
}

const saveLoading = ref(false)
const getStatistics = (params: any) => {
  searchParams.value = params
  totalDialogVisible.value = true
}

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'operator',
    label: t('formDemo.operator'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('formDemo.operator')
      }
    }
  },
  {
    field: 'merchantId',
    label: t('merchantList.merchantID'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('merchantList.merchantID')
      }
    }
  },
  {
    field: 'merchantName',
    label: t('merchantList.merchantName'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('merchantList.merchantName')
      }
    }
  },
  {
    field: 'rechargeAmount',
    label: t('merchantList.rechargeAmount'),
    search: {
      hidden: true
    }
  },
  {
    field: 'handlingFees',
    label: t('merchantList.handlingFee'),
    search: {
      hidden: true
    }
  },
  {
    field: 'time',
    label: t('formDemo.time'),
    search: {
      component: 'DatePicker',
      componentProps: {
        type: 'datetimerange',
        placeholder: t('formDemo.time'),
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      }
    }
  },
  {
    field: 'remark',
    label: t('merchantList.remark'),
    search: {
      hidden: true
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
        show-statistics
        @search="setSearchParams"
        @statistic="getStatistics"
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

  <Dialog
    v-model="totalDialogVisible"
    :title="t('merchantList.orderDataStatistics')"
    :style="{ maxWidth: '500px' }"
  >
    <ElRow>
      <ElCol :span="15" :tag="'h3'" style="text-align: right; padding: 10px">
        {{ t('merchantList.totalInternalAmount') + ' :' }}
      </ElCol>
      <ElCol :span="9" :tag="'h3'" style="color: black; padding: 10px">
        {{ totalData.totalInternalAmount }}
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="15" :tag="'h3'" style="text-align: right; padding: 10px">
        {{ t('merchantList.totalInternalFee') + ' :' }}
      </ElCol>
      <ElCol :span="9" :tag="'h3'" style="color: black; padding: 10px">
        {{ totalData.totalInternalFee }}
      </ElCol>
    </ElRow>
  </Dialog>
</template>
