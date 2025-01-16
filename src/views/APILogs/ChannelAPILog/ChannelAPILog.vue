<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/CustomSearch'
import { Dialog } from '@/components/Dialog'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { getChannelAPILogs } from '@/api/apilogs'
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
    const res = await getChannelAPILogs({
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
    field: 'ChannelName',
    label: t('APILogs.channelName'),
    search: {
      hidden: true
    }
  },
  {
    field: 'RequestMode',
    label: t('APILogs.requestMode'),
    search: {
      component: 'Select',
      label: t('APILogs.requestMode'),
      componentProps: {
        placeholder: t('APILogs.requestMode'),
        options: [
          { label: t('APILogs.get'), value: 'get' },
          { label: t('APILogs.post'), value: 'post' }
        ]
      }
    }
  },
  {
    field: 'RequestIP',
    label: t('APILogs.requestIP'),
    search: {
      component: 'Input',
      label: t('APILogs.requestIP'),
      componentProps: {
        placeholder: t('APILogs.requestIP')
      }
    },
    table: {
      hidden: true
    }
  },
  {
    field: 'OrderNumber',
    label: t('APILogs.orderNumber'),
    search: {
      component: 'Input',
      label: t('APILogs.orderNumber'),
      componentProps: {
        placeholder: t('APILogs.orderNumber')
      }
    },
    table: {
      hidden: true
    }
  },
  {
    field: 'RequestPath',
    label: t('APILogs.requestIP'),
    search: {
      component: 'Input',
      label: t('APILogs.requestIP'),
      componentProps: {
        placeholder: t('APILogs.requestIP')
      }
    },
    table: {
      hidden: true
    }
  },
  {
    field: 'RequestAddress',
    label: t('APILogs.requestAddress'),
    search: {
      hidden: true
    }
  },
  {
    field: 'OurOrderNumber',
    label: t('APILogs.ourOrderNumber'),
    search: {
      hidden: true
    }
  },
  {
    field: 'RequestContent',
    label: t('APILogs.requestContent'),
    search: {
      component: 'Input',
      label: t('APILogs.requestContent'),
      componentProps: {
        placeholder: t('APILogs.requestContent')
      }
    }
  },
  {
    field: 'ResponseCode',
    label: t('APILogs.responseCode'),
    search: {
      hidden: true
    }
  },
  {
    field: 'ErrorMessage',
    label: t('APILogs.errorMessage'),
    search: {
      hidden: true
    }
  },
  {
    field: 'RequestTime',
    label: t('APILogs.requestTime'),
    search: {
      component: 'DatePicker',
      componentProps: {
        type: 'datetimerange',
        placeholder: t('APILogs.requestTime'),
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
