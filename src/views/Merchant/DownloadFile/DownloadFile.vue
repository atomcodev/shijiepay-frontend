<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import Search from '@/components/CustomSearch/src/Search.vue'
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
const dataList = [
  {
    ChannelName: 'Channel 1',
    RequestMode: 'get',
    RequestIP: '192.168.0.1',
    OrderNumber: 'ORD123456',
    RequestPath: '/api/v1/data',
    RequestAddress: '127.0.0.1',
    OurOrderNumber: 'O123456',
    RequestContent: '{"param1": "value1", "param2": "value2"}',
    ResponseCode: '200',
    ErrorMessage: '',
    RequestTime: '2024-01-01 12:00:00'
  },
  {
    ChannelName: 'Channel 2',
    RequestMode: 'post',
    RequestIP: '192.168.0.2',
    OrderNumber: 'ORD123457',
    RequestPath: '/api/v1/update',
    RequestAddress: '127.0.0.2',
    OurOrderNumber: 'O123457',
    RequestContent: '{"param3": "value3", "param4": "value4"}',
    ResponseCode: '404',
    ErrorMessage: 'Not Found',
    RequestTime: '2024-01-02 13:00:00'
  },
  {
    ChannelName: 'Channel 3',
    RequestMode: 'get',
    RequestIP: '192.168.0.3',
    OrderNumber: 'ORD123458',
    RequestPath: '/api/v1/info',
    RequestAddress: '127.0.0.3',
    OurOrderNumber: 'O123458',
    RequestContent: '{"param5": "value5", "param6": "value6"}',
    ResponseCode: '500',
    ErrorMessage: 'Internal Server Error',
    RequestTime: '2024-01-03 14:00:00'
  },
  {
    ChannelName: 'Channel 4',
    RequestMode: 'get',
    RequestIP: '192.168.0.4',
    OrderNumber: 'ORD123459',
    RequestPath: '/api/v1/login',
    RequestAddress: '127.0.0.4',
    OurOrderNumber: 'O123459',
    RequestContent: '{"username": "user1", "password": "pass1"}',
    ResponseCode: '200',
    ErrorMessage: '',
    RequestTime: '2024-01-04 15:00:00'
  },
  {
    ChannelName: 'Channel 5',
    RequestMode: 'post',
    RequestIP: '192.168.0.5',
    OrderNumber: 'ORD123460',
    RequestPath: '/api/v1/logout',
    RequestAddress: '127.0.0.5',
    OurOrderNumber: 'O123460',
    RequestContent: '{"token": "abcdef12345"}',
    ResponseCode: '200',
    ErrorMessage: '',
    RequestTime: '2024-01-05 16:00:00'
  },
  {
    ChannelName: 'Channel 6',
    RequestMode: 'get',
    RequestIP: '192.168.0.6',
    OrderNumber: 'ORD123461',
    RequestPath: '/api/v1/verify',
    RequestAddress: '127.0.0.6',
    OurOrderNumber: 'O123461',
    RequestContent: '{"code": "123456"}',
    ResponseCode: '200',
    ErrorMessage: '',
    RequestTime: '2024-01-06 17:00:00'
  },
  {
    ChannelName: 'Channel 7',
    RequestMode: 'post',
    RequestIP: '192.168.0.7',
    OrderNumber: 'ORD123462',
    RequestPath: '/api/v1/register',
    RequestAddress: '127.0.0.7',
    OurOrderNumber: 'O123462',
    RequestContent: '{"name": "John Doe", "email": "john@example.com"}',
    ResponseCode: '201',
    ErrorMessage: '',
    RequestTime: '2024-01-07 18:00:00'
  },
  {
    ChannelName: 'Channel 8',
    RequestMode: 'get',
    RequestIP: '192.168.0.8',
    OrderNumber: 'ORD123463',
    RequestPath: '/api/v1/user/details',
    RequestAddress: '127.0.0.8',
    OurOrderNumber: 'O123463',
    RequestContent: '{"userId": "9876"}',
    ResponseCode: '200',
    ErrorMessage: '',
    RequestTime: '2024-01-08 19:00:00'
  },
  {
    ChannelName: 'Channel 9',
    RequestMode: 'post',
    RequestIP: '192.168.0.9',
    OrderNumber: 'ORD123464',
    RequestPath: '/api/v1/password/reset',
    RequestAddress: '127.0.0.9',
    OurOrderNumber: 'O123464',
    RequestContent: '{"email": "user2@example.com"}',
    ResponseCode: '200',
    ErrorMessage: '',
    RequestTime: '2024-01-09 20:00:00'
  }
]

// Dummy pagination variables
const total = ref(dataList.length)
const pageSize = ref(10)
const currentPage = ref(1)

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
