<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/CustomSearch'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { getUserListApi, saveUserApi } from '@/api/systemmanagement'
import { useTable } from '@/hooks/web/useTable'
import { ref, unref, reactive } from 'vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { Breadcrumb } from '@/components/Breadcrumb'
import { useEventBus } from '@/hooks/event/useEventBus'
import { BaseButton } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import Write from './components/Write.vue'
import Detail from './components/Detail.vue'
import { UserType } from '@/api/systemmanagement/types'

const ids = ref<string[]>([])

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const res = await getUserListApi({
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

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'username',
    label: t('systemManagement.name'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('systemManagement.name')
      }
    },
    form: {
      component: 'Input',
      componentProps: {
        placeholder: t('systemManagement.name')
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
    field: 'account',
    label: t('systemManagement.account'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('systemManagement.account')
      }
    },
    form: {
      component: 'Input',
      componentProps: {
        placeholder: t('systemManagement.account')
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
    field: 'password',
    label: t('systemManagement.password'),
    search: {
      hidden: true
    },
    form: {
      component: 'Input',
      componentProps: {
        type: 'password',
        placeholder: t('systemManagement.password')
      },
      colProps: {
        span: 24
      }
    },
    detail: {
      hidden: true
    },
    table: {
      hidden: true
    }
  },
  {
    field: 'ConfirmPassword',
    label: t('systemManagement.confirmPassword'),
    search: {
      hidden: true
    },
    form: {
      component: 'Input',
      componentProps: {
        type: 'password',
        placeholder: t('systemManagement.confirmPassword')
      },
      colProps: {
        span: 24
      }
    },
    detail: {
      hidden: true
    },
    table: {
      hidden: true
    }
  },
  {
    field: 'statu',
    label: t('systemManagement.state'),
    search: {
      component: 'Select',
      componentProps: {
        placeholder: t('systemManagement.state'),
        options: [
          { label: t('systemManagement.normal'), value: '1' },
          { label: t('systemManagement.disable'), value: '0' }
        ]
      }
    },
    form: {
      hidden: true
    },
    detail: {
      hidden: true
    }
  },
  {
    field: 'role_code',
    label: t('systemManagement.role'),
    search: {
      component: 'Select',
      componentProps: {
        placeholder: t('systemManagement.role')
      }
    },
    form: {
      component: 'Select',
      componentProps: {
        placeholder: t('systemManagement.role')
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
    field: 'email',
    label: t('systemManagement.mail'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('systemManagement.mail')
      }
    },
    form: {
      component: 'Input',
      componentProps: {
        placeholder: t('systemManagement.mail')
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
    field: 'create_time',
    label: t('systemManagement.creationTime'),
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
    field: 'last_login_time',
    label: t('systemManagement.lastLoginTime'),
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
    field: 'remark',
    label: t('systemManagement.remark'),
    search: {
      component: 'Input',
      componentProps: {
        placeholder: t('systemManagement.remark')
      }
    },
    form: {
      component: 'Input',
      componentProps: {
        placeholder: t('systemManagement.remark')
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
    field: 'operate',
    label: t('systemManagement.operate'),
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
          const row = data.row as UserType
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

// @ts-ignore
const { allSchemas } = useCrudSchemas(crudSchemas)

const dialogVisible = ref(false)
const dialogTitle = ref('')

const currentRow = ref<UserType>()
const actionType = ref('')

const onShowAddAccount = () => {
  dialogTitle.value = t('exampleDemo.add')
  currentRow.value = undefined
  dialogVisible.value = true
  actionType.value = ''
}

const delLoading = ref(false)

const delData = async (row?: UserType) => {
  const elTableExpose = await getElTableExpose()
  ids.value = row ? [row.id] : elTableExpose?.getSelectionRows().map((v: UserType) => v.id) || []
  delLoading.value = true

  await delList(unref(ids).length).finally(() => {
    delLoading.value = false
  })
}

const action = (row: UserType, type: string) => {
  dialogTitle.value = t(type === 'edit' ? 'exampleDemo.edit' : 'exampleDemo.detail')
  actionType.value = type
  currentRow.value = { ...row }
  dialogVisible.value = true
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
      dialogVisible.value = false
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
        show-add-account
        @add-account="onShowAddAccount"
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

    <template #footer>
      <BaseButton
        v-if="actionType !== 'detail'"
        type="primary"
        :loading="saveLoading"
        @click="save"
      >
        {{ t('exampleDemo.save') }}
      </BaseButton>
      <BaseButton @click="dialogVisible = false">{{ t('dialogDemo.close') }}</BaseButton>
    </template>
  </Dialog>
</template>
<style lang="css">
/* //search-section */
</style>
