<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/CustomSearch'
import { useI18n } from '@/hooks/web/useI18n'
import { ref, unref, reactive, computed } from 'vue'
import { Dialog } from '@/components/Dialog'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { Table, TableColumn } from '@/components/Table'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  getCollectionChannelApi,
  addCollectionChannelApi,
  editCollectionChannelApi,
  deleteCollectionChannelApi,
  getModuleCodeApi,
  getPayMethodApi
} from '@/api/channelmanagement'
import { CollectionChannelType } from '@/api/channelmanagement/types'
import { useTable } from '@/hooks/web/useTable'
import { getMaxListeners } from 'events'
import { useEventBus } from '@/hooks/event/useEventBus'
import Write from './components/Write.vue'
import { BaseButton } from '@/components/Button'
import { Icon } from '@/components/Icon'
import { onMounted } from 'vue'
import {
  ElTag,
  ElDialog,
  ElMessageBox,
  ElDropdownMenu,
  ElDropdownItem,
  ElDropdown,
  ElMessage
} from 'element-plus'

const ids = ref<string[]>([])
const moduleCodeOptions = ref([])
const payMethodOptions = ref([])

const { t } = useI18n()

const fetchModuleCodeOptions = async () => {
  try {
    const res = await getModuleCodeApi()
    if (!res || !res.data || !res.data.data || !res.data.data.select_options) {
      throw new Error('Invalid response structure or no data available')
    }
    moduleCodeOptions.value = res.data.data.select_options.map((item: any) => ({
      label: item.label,
      value: item.value
    }))
  } catch (error) {
    console.error('Failed to fetch module codes:', error)
  }
}

const fetchPayMethodOptions = async (uuid: string, key: string) => {
  console.log('fetch paymethod options')
  try {
    const res = await getPayMethodApi(uuid, key)
    if (!res || !res.data || !res.data.datas) {
      throw new Error('Invalid response structure or no data available')
    }
    payMethodOptions.value = []
    payMethodOptions.value = res.data.datas.map((item: any) => ({
      label: item.label,
      value: item.value,
      checked: item.checked
    }))
  } catch (error) {
    console.error('Failed to fetch module codes:', error)
  }
}

onMounted(() => {
  console.log('---onmounted---')
  fetchModuleCodeOptions()
})

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const res = await getCollectionChannelApi({
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
    const res = await deleteCollectionChannelApi(unref(ids))
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

const dialogVisible = ref(false)
const dialogTitle = ref('')
const currentRow = ref()
const actionType = ref('')
const isHidden = ref(true)

const handleKeyiconClicked = (key: string) => {
  ElMessageBox.confirm('', key, {
    confirmButtonText: t('common.delOk'),
    type: 'info',
    boxType: 'confirm',
    showCancelButton: false
  })
}

const copyToClipboard = (key: string) => {
  navigator.clipboard.writeText(key).then(
    () => {
      ElMessage.success('Copied to clipboard!')
    },
    (err) => {
      ElMessage.error('Could not copy text')
    }
  )
}

const delLoading = ref(false)

const delData = async (row?: CollectionChannelType) => {
  const elTableExpose = await getElTableExpose()
  ids.value = row
    ? [row.uuid]
    : elTableExpose?.getSelectionRows().map((v: CollectionChannelType) => v.uuid) || []
  delLoading.value = true

  await delList(unref(ids).length).finally(() => {
    delLoading.value = false
  })
}

const action = (type: string, row?: CollectionChannelType) => {
  dialogTitle.value = t(type === 'edit' ? 'exampleDemo.edit' : 'exampleDemo.add')
  actionType.value = type
  currentRow.value = row === undefined ? undefined : { ...row }
  fetchPayMethodOptions(
    row === undefined ? '*' : row.uuid,
    row === undefined ? '*' : row.module_code
  )
  dialogVisible.value = true
  isHidden.value = !!row
}

const writeRef = ref<ComponentRef<typeof Write>>()

const saveLoading = ref(false)

const addCollectionChannel = async () => {
  const write = unref(writeRef)
  const formData = await write?.submit()
  if (formData) {
    saveLoading.value = true
    try {
      const res = await addCollectionChannelApi(formData)
      if (res) {
        currentPage.value = 1
        getList()
      }
    } catch (error) {
      console.log(error)
    } finally {
      saveLoading.value = false
      dialogVisible.value = false
    }
  }
}

const editCollectionChannel = async () => {
  const write = unref(writeRef)
  const formData = await write?.submit()
  if (formData) {
    saveLoading.value = true
    try {
      const res = await editCollectionChannelApi(formData)
      console.log('vue-editcollectionchannel');
      if (res) {
        currentPage.value = 1
        getList()
      }
    } catch (error) {
      console.log(error)
    } finally {
      saveLoading.value = false
      dialogVisible.value = false
    }
  }
}

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'channel_name',
    label: t('tableDemo.channelName'),
    width: '200px',
    search: {
      hidden: true
    },
    form: {
      component: 'Input',
      colProps: {
        span: 24
      }
    }
  },
  {
    field: 'mer_id',
    label: t('tableDemo.upstreammerchantID'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('channelManagement.merchantID')
      }
    },
    form: {
      component: 'Input',
      colProps: {
        span: 24
      },
      componentProps: {
        placeholder: t('channelManagement.merchantID')
      }
    }
  },
  {
    field: 'mer_account',
    label: t('channelManagement.merchantAccount'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('channelManagement.merchantAccount')
      }
    },
    form: {
      component: 'Input',
      colProps: {
        span: 24
      },
      componentProps: {
        placeholder: t('channelManagement.merchantAccount')
      }
    }
  },
  {
    field: 'mer_password',
    label: t('channelManagement.merchantPassword'),
    table: {
      hidden: true
    },
    search: {
      hidden: true
    },
    form: {
      component: 'Input',
      colProps: {
        span: 24
      },
      componentProps: {
        showPassword: true,
        placeholder: t('channelManagement.merchantPassword')
      }
    }
  },
  {
    field: 'module_code',
    label: t('channelManagement.processingModule'),
    search: {
      hidden: true
    },
    form: {
      component: 'Select',
      colProps: {
        span: 24
      },
      componentProps: {
        placeholder: t('channelManagement.selectProcessingModule'),
        hidden: isHidden.value,
        options: moduleCodeOptions,
        onChange: (value: any) => {
          fetchPayMethodOptions(currentRow.value === undefined ? '*' : currentRow.value.uuid, value)
        }
      }
    }
  },
  {
    field: 'secret_key',
    label: t('tableDemo.upstreammerchantkey'),
    search: {
      hidden: true
    },
    form: {
      component: 'Input',
      colProps: {
        span: 24
      },
      componentProps: {
        placeholder: t('channelManagement.merchantKey')
      }
    },
    table: {
      slots: {
        default: (data: any) => {
          const row = data.row as CollectionChannelType
          return (
            <div
              style="cursor: pointer; display: inline-block"
              onClick={() => handleKeyiconClicked(row.secret_key)}
            >
              <Icon icon="vi-ant-design:security-scan-outlined" />
            </div>
          )
        }
      }
    }
  },
  {
    field: 'public_key',
    label: t('tableDemo.upstreammerchantpublickey'),
    search: {
      hidden: true
    },
    form: {
      component: 'Input',
      colProps: {
        span: 24
      },
      componentProps: {
        placeholder: t('channelManagement.merchantPublicKey')
      }
    },
    table: {
      slots: {
        default: (data: any) => {
          const row = data.row as CollectionChannelType
          return (
            <div
              style="cursor: pointer; display: inline-block"
              onClick={() => handleKeyiconClicked(row.public_key)}
            >
              <Icon icon="vi-ant-design:security-scan-outlined" />
            </div>
          )
        }
      }
    }
  },
  {
    field: 'select_codes',
    label: t('tableDemo.selectedOptions'),
    table: {
      hidden: true
    },
    form: {
      component: 'CheckboxGroup',
      componentProps: {
        options: payMethodOptions
      },
      colProps: { span: 24 }
    },
    search: {
      hidden: true
    }
  },
  {
    field: 'callback_ip',
    label: t('channelManagement.callbackIpWhitelist'),
    search: {
      hidden: true
    },
    form: {
      component: 'Input',
      colProps: {
        span: 24
      },
      componentProps: {
        type: 'textarea',
        placeholder: t('channelManagement.callbackIpWhitelist'),
        rows: 4
      }
    },
    table: {
      slots: {
        default: (data: any) => {
          const row = data.row as CollectionChannelType
          return (
            <div
              style="cursor: pointer; display: inline-block"
              onClick={() => copyToClipboard(row.callback_ip)}
            >
              <Icon icon="vi-ant-design:link-outlined" />
            </div>
          )
        }
      }
    }
  },
  {
    field: 'statu',
    label: t('tableDemo.state'),
    width: '100px',
    search: {
      component: 'Select',
      componentProps: {
        placeholder: t('searchDemo.channelStatus'),
        options: [
          {
            label: t('searchDemo.open'),
            value: true
          },
          {
            label: t('searchDemo.disable'),
            value: false
          }
        ],
        class: 'select-state'
      }
    },
    form: {
      hidden: true
    },
    table: {
      slots: {
        default: (data: any) => {
          const status = data.row.statu
          return (
            <>
              <ElTag type={status === false ? 'danger' : 'success'}>
                {status === true ? t('userDemo.enable') : t('userDemo.disable')}
              </ElTag>
            </>
          )
        }
      }
    }
  },
  {
    field: 'balance_amount',
    label: t('tableDemo.balance'),
    search: {
      hidden: true
    },
    form: {
      hidden: true
    }
  },
  {
    field: 'amount_max',
    label: t('channelManagement.maximumPaymentAmount'),
    search: {
      hidden: true
    },
    form: {
      component: 'InputNumber',
      colProps: {
        span: 24
      },
      componentProps: {
        controlsPosition: 'right',
        placeholder: t('channelManagement.maximumPaymentAmount')
      }
    }
  },
  {
    field: 'amount_min',
    label: t('channelManagement.minimumPaymentAmount'),
    search: {
      hidden: true
    },
    form: {
      component: 'InputNumber',
      colProps: {
        span: 24
      },
      componentProps: {
        controlsPosition: 'right',
        placeholder: t('channelManagement.minimumPaymentAmount')
      }
    }
  },
  {
    field: 'daily_limit_count',
    label: t('channelManagement.limitTransactionsPerDay'),
    search: {
      hidden: true
    },
    form: {
      component: 'InputNumber',
      colProps: {
        span: 24
      },
      componentProps: {
        controlsPosition: 'right',
        placeholder: t('channelManagement.limitTransactionsPerDay')
      }
    }
  },
  {
    field: 'create_time',
    label: t('tableDemo.creationTime'),
    width: '200px',
    search: {
      hidden: true
    },
    form: {
      hidden: true
    },
    formatter: (_: Recordable, __: TableColumn, cellValue: string | Date) => {
      const date = new Date(cellValue)
      if (isNaN(date.getTime())) return cellValue

      const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ')
      return formattedDate
    }
  },
  {
    field: 'note',
    label: t('tableDemo.remark'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('channelManagement.remark')
      }
    },
    form: {
      component: 'Input',
      componentProps: {
        placeholder: t('channelManagement.remark')
      },
      colProps: {
        span: 24
      }
    }
  },
  {
    field: 'operate',
    label: t('tableDemo.operate'),
    search: {
      hidden: true
    },
    form: {
      hidden: true
    },
    table: {
      width: 200,
      slots: {
        default: (data: any) => {
          const row = data.row as CollectionChannelType
          return (
            <div class="flex justify-between px-6">
              <BaseButton type="primary" onClick={() => action('edit', row)}>
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
                        <ElDropdownItem key={'x'} onClick={() => delData(row)}>
                          {t('merchantList.delete')}
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

const { allSchemas } = useCrudSchemas(crudSchemas)
</script>

<template>
  <ContentWrap style="margin-bottom: 20px">
    <Breadcrumb class="<md:hidden" />
  </ContentWrap>
  <ContentWrap class="search-section">
    <Search
      :schema="allSchemas.searchSchema"
      show-add-channel
      @add-channel="action('add', undefined)"
      @search="setSearchParams"
      @reset="setSearchParams"
    />
  </ContentWrap>
  <ContentWrap style="height: 700px">
    <Table
      v-model:page-size="pageSize"
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
    <Write ref="writeRef" :form-schema="allSchemas.formSchema" :current-row="currentRow" />

    <template #footer>
      <BaseButton
        v-if="actionType === 'edit'"
        type="primary"
        :loading="saveLoading"
        @click="editCollectionChannel"
      >
        {{ t('exampleDemo.save') }}
      </BaseButton>
      <BaseButton
        v-if="actionType !== 'edit'"
        type="primary"
        :loading="saveLoading"
        @click="addCollectionChannel"
      >
        {{ t('exampleDemo.save') }}
      </BaseButton>
      <BaseButton @click="dialogVisible = false">{{ t('dialogDemo.close') }}</BaseButton>
    </template>
  </Dialog>
</template>
<style lang="css" scoped>
.collection-channel {
  min-width: auto !important;
}
.el-form-item:has(.collection-channel) {
  margin-right: 0.5rem !important;
}
/* /* //search-section */
</style>
