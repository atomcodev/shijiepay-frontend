<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/CustomSearch'
import { useI18n } from '@/hooks/web/useI18n'
import { Table, TableColumn } from '@/components/Table'
import { getChannelFormApi } from '@/api/financialmanagement'
import { useTable } from '@/hooks/web/useTable'
import { reactive, ref, unref } from 'vue'
import { useEventBus } from '@/hooks/event/useEventBus'
import { FormSchema } from '@/components/Form'
import { Breadcrumb } from '@/components/Breadcrumb'

defineOptions({
  name: 'ExamplePage'
})
const searchParams = ref({})
const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const res = await getChannelFormApi({
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
      placeholder: t('tableDemo.channelName') // Set the placeholder text
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
    field: 'channelname',
    label: t('tableDemo.channelName')
  },
  {
    field: 'collectionamount',
    label: t('formDemo.collectionamount')
  },
  {
    field: 'collectionfee',
    label: t('formDemo.collectionfee')
  },
  {
    field: 'paymentamount',
    label: t('formDemo.paymentamount')
  },
  {
    field: 'paymentofhandlingfee',
    label: t('formDemo.paymentofhandlingfee')
  },
  {
    field: 'issue',
    label: t('formDemo.issue')
  },
  {
    field: 'issuingfee',
    label: t('formDemo.issuingfee')
  },
  {
    field: 'errorvalue',
    label: t('formDemo.errorvalue')
  }
])
</script>

<template>
  <ContentWrap style="margin-bottom: 20px">
    <Breadcrumb class="<md:hidden" />
  </ContentWrap>
  <ContentWrap class="search-section">
    <div>
      <Search :schema="schema" v-model="searchParams" />
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
</template>

<style>
.select-state,
.select-role {
  width: 75px !important;
}
.list-of-roles {
  min-width: auto !important;
}
.el-form-item:has(.list-of-roles) {
  margin-right: 0.5rem !important;
}
</style>
@/hooks/event/useEventBus
