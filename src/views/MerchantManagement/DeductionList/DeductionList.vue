<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import Search from './components/Search.vue'
import { useI18n } from '@/hooks/web/useI18n'
import { Table, TableColumn } from '@/components/Table'
import { getTableListApi, delTableListApi } from '@/api/table'
import { useTable } from '@/hooks/web/useTable'
import { reactive, ref, unref } from 'vue'
import { useEventBus } from '@/hooks/event/useEventBus'
import { FormSchema } from '@/components/Form'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Dialog } from '@/components/Dialog'
import Write from './components/Write.vue'

defineOptions({
  name: 'ExamplePage'
})

const ids = ref<string[]>([])

const searchParams = ref({})

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const res = await getTableListApi({
      pageIndex: unref(currentPage),
      pageSize: unref(pageSize),
      ...unref(searchParams),
      startDate: searchParams.value ? searchParams.value : null,
      endDate: searchParams.value ? searchParams.value : null
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

getList()

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

const schema = reactive<FormSchema[]>([
  {
    field: 'search',
    label: t('formDemo.search'),
    component: 'Input',
    componentProps: {
      placeholder: t('formDemo.search') // Set the placeholder text
    }
  },
  {
    field: 'merchantid',
    label: t('formDemo.merchantid'),
    component: 'Input',
    componentProps: {
      placeholder: t('formDemo.merchantid') // Set the placeholder text
    }
  },
  {
    field: 'merchantname',
    label: t('formDemo.merchantname'),
    component: 'Input',
    componentProps: {
      placeholder: t('formDemo.merchantname') // Set the placeholder text
    }
  },
  {
    field: 'date',
    label: t('formDemo.datePlaceholder'),
    component: 'DatePicker',
    componentProps: {
      type: 'datetimerange',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      placeholder: t('formDemo.datePlaceholder')
    }
  }
])

const columns = reactive<TableColumn[]>([
  {
    field: 'operator',
    label: t('formDemo.operator')
  },
  {
    field: 'merchantid',
    label: t('formDemo.merchantid')
  },
  {
    field: 'merchantname',
    label: t('formDemo.merchantname')
  },
  {
    field: 'deductionamount',
    label: t('formDemo.deductionamount')
  },
  {
    field: 'time',
    label: t('formDemo.time')
  },
  {
    field: 'remark',
    label: t('formDemo.remark')
  }
])

const dialogVisible = ref(false)
const dialogTitle = ref('')
const currentRow = ref()
const actionType = ref('')
const showDialog = () => {
  dialogVisible.value = true
}
</script>

<template>
  <ContentWrap style="margin-bottom: 20px">
    <Breadcrumb class="<md:hidden" />
  </ContentWrap>
  <ContentWrap class="search-section">
    <div>
      <Search :schema="schema" show-add-statistics @show-dialog="showDialog" />
    </div>
  </ContentWrap>
  <ContentWrap style="height: 700px">
    <Table
      v-model:pageSize="pageSize"
      v-model:currentPage="currentPage"
      :columns="columns"
      row-key="id"
      :loading="loading"
      sortable
      :pagination="{
        total: total
      }"
      @register="tableRegister"
      style="height: 550px"
    />
  </ContentWrap>

  <Dialog v-model="dialogVisible" :title="dialogTitle">
    <Write v-if="actionType !== 'detail'" ref="writeRef" :current-row="currentRow" />
  </Dialog>
</template>

<style>
.list-of-roles {
  min-width: auto !important;
}
.el-form-item:has(.list-of-roles) {
  margin-right: 0.5rem !important;
}
/* //search-section */
</style>
