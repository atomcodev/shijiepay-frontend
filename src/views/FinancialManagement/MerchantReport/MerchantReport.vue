<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/CustomSearch'
import { useI18n } from '@/hooks/web/useI18n'
import { Table, TableColumn } from '@/components/Table'
import { getMerchantFormApi } from '@/api/financialmanagement'
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
    const res = await getMerchantFormApi({
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
      placeholder: t('formDemo.merchantnameormerchantid') // Set the placeholder text
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
    field: 'merchantid',
    label: t('formDemo.merchantid')
  },
  {
    field: 'merchantname',
    label: t('formDemo.merchantname')
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
    field: 'manualdelivery',
    label: t('formDemo.manualdelivery')
  },
  {
    field: 'manuallyissuehandlingfees',
    label: t('formDemo.manuallyissuehandlingfees')
  },
  {
    field: 'internalfeeamount',
    label: t('formDemo.internalfeeamount')
  },
  {
    field: 'internalcharges',
    label: t('formDemo.internalcharges')
  },
  {
    field: 'startingmerchantbalance',
    label: t('formDemo.startingmerchantbalance')
  },
  {
    field: 'endingmerchantbalance',
    label: t('formDemo.endingmerchantbalance')
  },
  {
    field: 'errorvalue',
    label: t('formDemo.errorvalue')
  }
])
</script>

<template>
  <ContentWrap style="margin-bottom: 20px; font-size: smaller">
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
      style="height: 550px; font-size: small"
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
