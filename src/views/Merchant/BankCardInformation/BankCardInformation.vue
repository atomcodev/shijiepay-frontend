<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/CustomSearch'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { getTableListApi, delTableListApi } from '@/api/table'
import { useTable } from '@/hooks/web/useTable'
import { TableData } from '@/api/table/types'
import { ref, unref, reactive, computed, readonly } from 'vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { Breadcrumb } from '@/components/Breadcrumb'
import { useEventBus } from '@/hooks/event/useEventBus'
import { BaseButton } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import Write from './components/Write.vue'
import { DepartmentUserItem } from '@/api/department/types'
import { saveUserApi } from '@/api/department'
import { ElRadioButton } from 'element-plus'
import { FormSchema, RadioOption } from '@/components/Form'
import { bind } from 'lodash-es'

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
const { getList, getElTableExpose, delList } = tableMethods

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

const bankTypes = computed(() => [
  { label: 'Bank A', value: 'bank_a' },
  { label: 'Bank B', value: 'bank_b' },
  { label: 'Bank C', value: 'bank_c' },
  { label: 'Bank D', value: 'bank_d' },
  { label: 'Bank E', value: 'bank_e' }
  // Add more banks as needed
])

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'BankType',
    label: t('bankCardInfo.bankType'),
    search: {
      component: 'Select',
      componentProps: {
        placeholder: t('bankCardInfo.bankType'),
        options: bankTypes
      }
    },
    form: {
      component: 'RadioButton',
      componentProps: {
        options: bankTypes.value
      },
      colProps: {
        span: 24
      }
    },
    detail: {
      hidden: true
    }
  },
  {
    field: 'Account',
    label: t('bankCardInfo.account'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('bankCardInfo.account')
      }
    },
    form: {
      component: 'Input',
      componentProps: {
        placeholder: t('bankCardInfo.account')
      },
      colProps: {
        span: 24
      }
    },
    detail: {
      span: 24
    },
    table: {
      hidden: true
    }
  },
  {
    field: 'BankcardNumber',
    label: t('bankCardInfo.bankcardnumber'),
    search: {
      hidden: true
    },
    form: {
      hidden: true
    },
    detail: {
      hidden: true
    }
  },
  {
    field: 'CardHolder',
    label: t('bankCardInfo.cardholder'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('bankCardInfo.cardholder')
      }
    },
    form: {
      component: 'Input',
      componentProps: {
        placeholder: t('bankCardInfo.cardholder')
      },
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
    label: t('bankCardInfo.addTime'),
    search: {
      hidden: true
    },
    form: {
      hidden: true
    },
    detail: {
      hidden: true
    }
  },
  {
    field: 'Operate',
    label: t('bankCardInfo.operate'),
    form: {
      hidden: true
    },
    detail: {
      hidden: true
    },
    search: {
      hidden: true
    },
    table: {
      width: 240,
      slots: {
        default: (data: any) => {
          const row = data.row as DepartmentUserItem
          return (
            <>
              <BaseButton type="primary" onClick={() => action(row, 'edit')}>
                {t('exampleDemo.edit')}
              </BaseButton>
              <BaseButton type="danger" onClick={() => delData(row)}>
                {t('exampleDemo.del')}
              </BaseButton>
            </>
          )
        }
      }
    }
  }
])

const settlementSchema = reactive<FormSchema[]>([
  {
    field: 'bankcard',
    label: t('bankCardInfo.bankcard'),
    component: 'Select',
    componentProps: {
      placeholder: t('bankCardInfo.selectBankcard'),
      options: bankTypes.value
    },
    colProps: {
      span: 24
    }
  },
  {
    field: 'settlementAmount',
    label: t('bankCardInfo.settlementAmount'),
    component: 'InputNumber',
    colProps: {
      span: 24
    },
    componentProps: {
      controlsPosition: 'right',
      placeholder: t('bankCardInfo.settlementAmount'),
      onchange: (value: number) => {
        settlementAmount.value = value
      }
    }
  },
  {
    field: 'availableBalance',
    label: t('bankCardInfo.availableBalance'),
    colProps: {
      span: 24
    }
  },
  {
    field: 'afterBalance',
    label: t('bankCardInfo.afterBalance'),
    colProps: {
      span: 24
    }
  }
])

// @ts-ignore
const { allSchemas } = useCrudSchemas(crudSchemas)

const addBankcardDialogVisible = ref(false)
const applySettlementDialogVisible = ref(false)
const dialogTitle = ref('')

const currentRow = ref<TableData | null>(null)
const actionType = ref('')

const onShowAddBankCard = () => {
  dialogTitle.value = t('bankCardInfo.addBankcard')
  // currentRow.value = undefined
  addBankcardDialogVisible.value = true
  actionType.value = ''
}

const settlementAmount = ref(0)
const availableBalance = ref(10000000) // Set the initial available balance

// Second label value (computed based on first label and settlementAmount)
const afterBalance = computed(() => {
  return availableBalance.value - settlementAmount.value
})

const onShowApplySettlement = () => {
  dialogTitle.value = t('bankCardInfo.applySettlement')
  availableBalance.value = 10000000
  applySettlementDialogVisible.value = true
  actionType.value = ''
}

const delLoading = ref(false)

const delData = async (row?: DepartmentUserItem) => {
  const elTableExpose = await getElTableExpose()
  ids.value = row
    ? [row.id]
    : elTableExpose?.getSelectionRows().map((v: DepartmentUserItem) => v.id) || []
  delLoading.value = true

  await delList(unref(ids).length).finally(() => {
    delLoading.value = false
  })
}

const action = (row: DepartmentUserItem, type: string) => {
  dialogTitle.value = t(type === 'edit' ? 'exampleDemo.edit' : 'exampleDemo.detail')
  actionType.value = type
  // currentRow.value = { ...row, department: unref(treeEl)?.getCurrentNode() || {} }
  addBankcardDialogVisible.value = true
}

const writeRef = ref<ComponentRef<typeof Write>>()

const saveLoading = ref(false)

const save = async () => {
  const write = unref(writeRef)
  const formData = await write?.submit()
  if (formData) {
    saveLoading.value = true
    try {
      const res = await saveUserApi(formData)
      if (res) {
        currentPage.value = 1
        getList()
      }
    } catch (error) {
      console.log(error)
    } finally {
      saveLoading.value = false
      addBankcardDialogVisible.value = false
    }
  }
}
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
        show-add-bankcard
        show-apply-settlement
        @add-bankcard="onShowAddBankCard"
        @apply-settlement="onShowApplySettlement"
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

  <Dialog v-model="addBankcardDialogVisible" :title="dialogTitle">
    <Write
      v-if="actionType !== 'detail'"
      ref="writeRef"
      :form-schema="allSchemas.formSchema"
      :current-row="currentRow"
    />

    <template #footer>
      <BaseButton
        v-if="actionType !== 'detail'"
        type="primary"
        :loading="saveLoading"
        @click="save"
      >
        {{ t('exampleDemo.save') }}
      </BaseButton>
      <BaseButton @click="addBankcardDialogVisible = false">{{ t('dialogDemo.close') }}</BaseButton>
    </template>
  </Dialog>
  <Dialog v-model="applySettlementDialogVisible" :title="dialogTitle">
    <Write ref="writeRef" :form-schema="settlementSchema" />
    <template #footer>
      <BaseButton type="primary" :loading="saveLoading" @click="save">
        {{ t('exampleDemo.save') }}
      </BaseButton>
      <BaseButton @click="applySettlementDialogVisible = false">{{
        t('dialogDemo.close')
      }}</BaseButton>
    </template>
  </Dialog>
</template>
<style lang="css" scoped>
:deep(.el-radio-button__inner) {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

:deep(.el-radio-button:first-child .el-radio-button__inner) {
  border-radius: 5px;
}

:deep(.el-radio-button:last-child .el-radio-button__inner) {
  border-radius: 5px;
}

:deep(.el-radio-group) {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
  gap: 10px;
}
</style>
