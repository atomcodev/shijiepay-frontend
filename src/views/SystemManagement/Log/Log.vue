<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { getOperationLogApi } from '@/api/systemmanagement'
import { useTable } from '@/hooks/web/useTable'
import { ref, unref, reactive } from 'vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { Breadcrumb } from '@/components/Breadcrumb'
import { useEventBus } from '@/hooks/event/useEventBus'

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const res = await getOperationLogApi({
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
    field: 'Operator',
    label: t('tableDemo.operator'),
    search: {
      component: 'Input',
      label: 'Search:',
      componentProps: {
        placeholder: t('tableDemo.operator')
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
    field: 'create_time',
    label: t('tableDemo.date'),
    search: {
      component: 'DatePicker',
      componentProps: {
        type: 'datetimerange',
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
    field: 'state_code',
    label: t('tableDemo.statusCode'),
    search: {
      hidden: true
    }
  },
  {
    field: 'ip',
    label: t('tableDemo.requestIP'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('common.ipInput')
      }
    }
  },
  {
    field: 'method',
    label: t('tableDemo.requestMethod'),
    search: {
      hidden: true
    },
    form: {
      component: 'InputNumber',
      value: 0
    }
  },
  {
    field: 'url_path',
    label: t('tableDemo.requestPath'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('common.requestPathInput')
      }
    },
    table: {
      show: false
    },
    form: {
      component: 'Editor',
      colProps: {
        span: 24
      }
    },
    detail: {
      span: 24,
      slots: {
        default: (data: any) => {
          return <div innerHTML={data.content}></div>
        }
      }
    }
  },
  {
    field: 'illustrate',
    label: t('tableDemo.illustrate'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('common.illustrateInput')
      }
    },
    table: {
      show: false
    },
    form: {
      component: 'Editor',
      colProps: {
        span: 24
      }
    },
    detail: {
      span: 24,
      slots: {
        default: (data: any) => {
          return <div innerHTML={data.content}></div>
        }
      }
    }
  }
])

// @ts-ignore
const { allSchemas } = useCrudSchemas(crudSchemas)
</script>

<template>
  <ContentWrap style="margin-bottom: 20px">
    <Breadcrumb class="<md:hidden" />
  </ContentWrap>
  <ContentWrap class="search-section">
    <div class="log-search">
      <p style="min-width: 40px; padding-top: 5px">{{ t('common.search') }} :</p>
      <Search
        :schema="allSchemas.searchSchema"
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
</template>
