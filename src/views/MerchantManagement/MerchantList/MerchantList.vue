<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import Search from './components/Search.vue'
import { Dialog } from '@/components/Dialog'
import { useI18n } from '@/hooks/web/useI18n'
import { Table, TableColumn } from '@/components/Table'
import { getTableListApi, delTableListApi } from '@/api/table'
import { useTable } from '@/hooks/web/useTable'
import { TableData } from '@/api/table/types'
import { ref, unref, reactive, computed, onMounted, h } from 'vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { Breadcrumb } from '@/components/Breadcrumb'
import { SelectOption, RadioOption, CheckboxOption, FormSchema } from '@/components/Form'
import { Form } from '@/components/Form'
import { getDictOneApi } from '@/api/common'
import { Icon } from '@/components/Icon'
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
import { Position } from 'monaco-editor'
import { title } from 'process'
import { findLastIndex } from 'lodash-es'

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
const addMerchantSchema = reactive<FormSchema[]>([
  {
    field: 'SelectCategory',
    label: t('AddMerchantForm.merchantCategory'),
    component: 'Select',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: t('AddMerchantForm.selectCategory'),
      options: [
        { label: '11', value: '0' },
        { label: '2', value: '1' },
        { label: '2', value: '1' },
        { label: '3', value: '1' },
        { label: '123', value: '1' },
        { label: '234', value: '1' },
        { label: t('AddMerchantForm.testCategory'), value: '2' }
      ]
    }
  },
  {
    field: 'merchantName',
    label: t('AddMerchantForm.merchantName'),
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: t('AddMerchantForm.merchantName')
    }
  },
  {
    field: 'account',
    label: t('AddMerchantForm.account'),
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: t('AddMerchantForm.account')
    }
  },
  {
    field: 'password',
    label: t('AddMerchantForm.password'),
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      showPassword: true,
      placeholder: t('AddMerchantForm.password')
    }
  },
  {
    field: 'password',
    label: t('AddMerchantForm.confirmPassword'),
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: t('AddMerchantForm.password'),
      showPassword: true
    }
  },
  {
    field: 'paymentInterest',
    label: t('AddMerchantForm.paymentInterest'),
    component: 'InputNumber',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: t('AddMerchantForm.paymentDefaultInterest'),
      controlsPosition: 'right'
    }
  },
  {
    field: 'issuanceInterest',
    label: t('AddMerchantForm.issuanceInterest'),
    component: 'InputNumber',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: t('AddMerchantForm.issuanceDefaultInterest'),
      controlsPosition: 'right'
    }
  },
  {
    field: 'internalRecharge',
    label: t('AddMerchantForm.internalRecharge'),
    component: 'InputNumber',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: t('AddMerchantForm.internalRecharegeDefault'),
      controlsPosition: 'right'
    }
  },
  {
    field: 'minimumPayment',
    label: t('AddMerchantForm.minimumPayment'),
    component: 'InputNumber',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: t('AddMerchantForm.minimumPayment'),
      controlsPosition: 'right'
    },
    value: 10000
  },
  {
    field: 'maximumPayment',
    label: t('AddMerchantForm.maximumPayment'),
    component: 'InputNumber',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: t('AddMerchantForm.maximumPayment'),
      controlsPosition: 'right'
    },
    value: 300000000
  },
  {
    field: 'remarks',
    label: t('AddMerchantForm.remarks'),
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: t('AddMerchantForm.remarks')
    }
  },
  {
    field: 'apiIpWhitelist',
    label: t('AddMerchantForm.apiIpWhitelist'),
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      type: 'textarea',
      placeholder: t('AddMerchantForm.apiIpWhitelistOnePerLine'),
      rows: 4
    }
  },
  {
    field: 'loginIpWhitelist',
    label: t('AddMerchantForm.loginIpWhitelist'),
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      type: 'textarea',
      placeholder: t('AddMerchantForm.ipWhitelistOnePerLine'),
      rows: 4
    }
  },
  {
    field: 'collectionFunctionSwitch',
    label: t('AddMerchantForm.loginIpWhitelist'),
    component: 'Switch',
    colProps: {
      span: 24
    },
    value: false
  },
  {
    field: 'paymentFunctionSwitch',
    label: t('AddMerchantForm.loginIpWhitelist'),
    component: 'Switch',
    colProps: {
      span: 24
    },
    value: false
  }
])
const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'MerchantID',
    label: t('merchantList.merchantID'),
    search: {
      component: 'Input',
      label: 'Search:',
      componentProps: {
        placeholder: t('merchantList.merchantID')
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
    field: 'MerchantName',
    label: t('merchantList.merchantName'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('merchantList.merchantName')
      }
    }
  },
  {
    field: 'MerchantAccount',
    label: t('merchantList.merchantAccount'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('merchantList.merchantAccount')
      }
    }
  },
  {
    field: 'AvailableBalance',
    label: t('merchantList.availableBalance'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('merchantList.availableBalance')
      }
    }
  },
  {
    field: 'SecretKey',
    label: t('merchantList.secretKey'),
    search: {
      hidden: true
    },
    table: {
      slots: {
        default: (data: any) => {
          return <Icon icon="vi-ant-design:security-scan-outlined"></Icon>
        }
      }
    }
  },
  {
    field: 'AccountStatus',
    label: t('merchantList.accountStatus'),
    search: {
      component: 'Select',
      componentProps: {
        placeholder: t('merchantList.accountStatus'),
        options: [
          { label: t('merchantList.active'), value: '0' },
          { label: t('merchantList.inactive'), value: '1' },
          { label: t('merchantList.all'), value: '2' }
        ]
      }
    },
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return h(
        ElTag,
        {
          type: cellValue === 1 ? 'success' : cellValue === 2 ? 'warning' : 'danger'
        },
        () =>
          cellValue === 1
            ? t('systemManagement.normal')
            : cellValue === 2
              ? t('systemManagement.disable')
              : t('tableDemo.commonly')
      )
    }
  },
  {
    field: 'LoginAddress',
    label: t('merchantList.loginAddress'),
    search: {
      hidden: true
    },
    formatter: (_: Recordable, __: TableColumn, cellValue: any) => {
      return <a href={cellValue} innerHTML={cellValue}></a>
      // detail: {
      //   slots: {
      //     default: (data: any) => {
      //       return <a href={data} innerHTML={data.content}></a>
      //     }
      //   }
      // }
    }
  },
  {
    field: 'remark',
    label: t('merchantList.remark'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('merchantList.remark')
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
    field: 'RegisterTime',
    label: t('merchantList.registerTime'),
    search: {
      hidden: true
    }
  },
  {
    field: 'Operate',
    label: t('merchantList.operate'),
    search: {
      hidden: true
    },
    table: {
      slots: {
        default: (data: any) => {
          return (
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              <BaseButton type="success">{t('merchantList.internalFilling')}</BaseButton>
              <BaseButton type="primary" style="margin-left: 0">
                {t('exampleDemo.edit')}
              </BaseButton>
              <ElDropdown trigger="click">
                {{
                  default: () => {
                    return <BaseButton type="info">{t('workplace.more')}</BaseButton>
                  },
                  dropdown: () => {
                    return (
                      <ElDropdownMenu>
                        <ElDropdownItem key={'x'}>{t('merchantList.freezeAccount')}</ElDropdownItem>
                        <ElDropdownItem key={'x'}>{t('merchantList.cashFlow')}</ElDropdownItem>
                        <ElDropdownItem key={'x'}>
                          {t('merchantList.clearLoginToken')}
                        </ElDropdownItem>
                        <ElDropdownItem key={'x'}>
                          {t('merchantList.viewGoogleCode')}
                        </ElDropdownItem>
                        <ElDropdownItem key={'x'}>
                          {t('merchantList.updateGoogleCode')}
                        </ElDropdownItem>
                        <ElDropdownItem key={'x'}>{t('merchantList.updateKey')}</ElDropdownItem>
                        <ElDropdownItem key={'x'}>
                          {t('merchantList.deductionAmount')}
                        </ElDropdownItem>
                        <ElDropdownItem key={'x'}>
                          {t('merchantList.moreInformation')}
                        </ElDropdownItem>
                        <ElDropdownItem key={'x'}>{t('merchantList.delete')}</ElDropdownItem>
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
const addMerchant = (params: any) => {
  dialogVisible.value = true
}
const dataList = reactive([
  {
    MerchantID: '1520451',
    MerchantName: 'test01',
    MerchantAccount: 'test01',
    AvailableBalance: '9950000',
    AccountStatus: 1,
    LoginAddress: 'https://mch.shijiepay.vip/merchant/login/j8KKpz4g4fJ5jHggYeAANt',
    RegisterTime: '2024-09-03 16:25:46'
  },
  {
    MerchantID: '1520451',
    MerchantName: 'test01',
    MerchantAccount: 'test01',
    AvailableBalance: '9950000',
    AccountStatus: 2,
    LoginAddress: 'https://mch.shijiepay.vip/merchant/login/j8KKpz4g4fJ5jHggYeAANt',
    RegisterTime: '2024-09-03 16:25:46'
  },
  {
    MerchantID: '1520451',
    MerchantName: 'test01',
    MerchantAccount: 'test01',
    AvailableBalance: '9950000',
    AccountStatus: 1,
    LoginAddress: 'https://mch.shijiepay.vip/merchant/login/j8KKpz4g4fJ5jHggYeAANt',
    RegisterTime: '2024-09-03 16:25:46'
  }
])
// @ts-ignore
const { allSchemas } = useCrudSchemas(crudSchemas)

const dialogVisible = ref(false)
const dialogTitle = ref('')
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
        show-add-merchant
        @search="setSearchParams"
        @reset="setSearchParams"
        @addMerchant="addMerchant"
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
    v-model="dialogVisible"
    :title="t('AddMerchantForm.addMechant')"
    style="overflow-y: hidden"
  >
    <Form :schema="addMerchantSchema" style="height: 21rem; overflow-y: auto"></Form>
    <ElRow>
      <ElCol :style="{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }">
        <ElButton :type="'primary'">{{ t('common.ok') }}</ElButton>
        <ElButton>{{ t('common.cancel') }}</ElButton>
      </ElCol>
    </ElRow>
  </Dialog>
</template>
