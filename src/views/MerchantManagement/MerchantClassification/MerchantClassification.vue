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
import { Form } from '@/components/Form'
import { Breadcrumb } from '@/components/Breadcrumb'
import { SelectOption, RadioOption, CheckboxOption, FormSchema } from '@/components/Form'
import { BaseButton } from '@/components/Button'
import {
  ElOption,
  ElOptionGroup,
  ElRadio,
  ElRadioButton,
  ElCheckbox,
  ElCheckboxButton,
  ElInput,
  ElMessage,
  ElMessageBox,
  ElTag,
  ElIcon,
  ElRow,
  ElSelect,
  ElButton,
  ElCol,
  RowJustify,
  ElDropdownMenu,
  ElDropdown,
  ElDropdownItem
} from 'element-plus'

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
const { loading, total, currentPage, pageSize } = tableState
const { getList } = tableMethods

const searchParams = ref({})
const setSearchParams = (params: any) => {
  searchParams.value = params
  getList()
}

const { t } = useI18n()
const addCategorySchema = reactive<FormSchema[]>([
  {
    field: 'categoryName',
    label: t('merchantClassification.categoryName'),
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: t('merchantClassification.categoryName')
    }
  },
  {
    field: 'remark',
    label: t('merchantClassification.remark'),
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: t('merchantClassification.remark')
    }
  }
])
const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'CategoryName',
    label: t('merchantClassification.categoryName'),
    search: {
      component: 'Input',
      label: 'Search:',
      componentProps: {
        placeholder: t('merchantClassification.categoryName')
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
    field: 'AddTime',
    label: t('merchantClassification.addTime'),
    search: {
      hidden: true
    }
  },
  {
    field: 'Remark',
    label: t('merchantClassification.remark'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('merchantClassification.remark')
      }
    }
  },
  {
    field: 'Operate',
    label: t('merchantClassification.operate'),
    search: {
      hidden: true
    },
    table: {
      slots: {
        default: (data: any) => {
          return (
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              <BaseButton type="primary">{t('exampleDemo.edit')}</BaseButton>
              <ElDropdown trigger="click">
                {{
                  default: () => {
                    return <BaseButton type="info">{t('workplace.more')}</BaseButton>
                  },
                  dropdown: () => {
                    return (
                      <ElDropdownMenu>
                        <ElDropdownItem key={'x'}>{t('formDemo.delete')}</ElDropdownItem>
                        <ElDropdownItem key={'x'}>
                          {t('merchantList.channelConfiguration')}
                        </ElDropdownItem>
                      </ElDropdownMenu>
                    )
                  }
                }}
              </ElDropdown>
            </div>
          )
        }
      }
    }
  }
])
const dataList = reactive([
  {
    CategoryName: '234',
    AddTime: '2024-09-03 16:25:46',
    AvailableBalance: '9950000',
    Remark: '234'
  },
  {
    CategoryName: '234',
    AddTime: '2024-09-03 16:25:46',
    AvailableBalance: '9950000',
    Remark: '234'
  },
  {
    CategoryName: '234',
    AddTime: '2024-09-03 16:25:46',
    AvailableBalance: '9950000',
    Remark: '234'
  }
])
// @ts-ignore
const { allSchemas } = useCrudSchemas(crudSchemas)

const dialogVisible = ref(false)
const dialogTitle = ref('')
const addCategory = (params: any) => {
  dialogVisible.value = true
}
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
        show-add-statistics
        show-add-category
        @search="setSearchParams"
        @reset="setSearchParams"
        @addCategory="addCategory"
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
    <Form :schema="addCategorySchema" style="height: 21rem; overflow-y: auto"></Form>
    <ElRow>
      <ElCol :style="{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }">
        <ElButton :type="'primary'">{{ t('common.ok') }}</ElButton>
        <ElButton>{{ t('common.cancel') }}</ElButton>
      </ElCol>
    </ElRow>
  </Dialog>
</template>
