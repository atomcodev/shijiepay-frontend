<script setup lang="tsx">
import { useI18n } from '@/hooks/web/useI18n'
import { ContentWrap } from '@/components/ContentWrap'
import { Breadcrumb } from '@/components/Breadcrumb'
import { h, reactive, ref, unref } from 'vue'
import { ChannelInfotip } from '@/components/ChannelInfotip'
import { Table, TableColumn } from '@/components/Table'
import { getTunnelApi, updateTunnelApi } from '@/api/channelmanagement'
import { TunnelType } from '@/api/channelmanagement/types'
import { useTable } from '@/hooks/web/useTable'
import { useEventBus } from '@/hooks/event/useEventBus'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { BaseButton } from '@/components/Button'
import { ElMessage, ElMessageBox, ElTag } from 'element-plus'

const { tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const res = await getTunnelApi({})
    return {
      list: res.data.list,
      total: res.data.total
    }
  }
})
const { loading, dataList, currentPage } = tableState
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

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'tunnel_name',
    label: t('tableDemo.channelName'),
    width: '300px'
  },
  {
    field: 'code',
    label: t('tableDemo.channelCode')
  },
  {
    field: 'tunnel_statu',
    label: t('tableDemo.channelStatus'),
    formatter: (_: Recordable, __: TableColumn, cellValue: boolean) => {
      // Check if the cellValue is 1 (enabled) or 0 (closed)
      return h(
        ElTag,
        {
          type: cellValue === true ? 'success' : 'danger' // Use strict equality and check for 1 or 0
        },
        () => (cellValue === true ? t('common.enabled') : t('common.closed')) // Use 1 and 0 to compare
      )
    }
  },
  {
    field: 'operate',
    label: t('tableDemo.operate'),
    table: {
      slots: {
        default: (data: any) => {
          const row = data.row as TunnelType
          return (
            <BaseButton
              type={row.tunnel_statu === true ? 'danger' : 'primary'}
              onClick={() => confirmStatus(row)}
            >
              {row.tunnel_statu === true
                ? t('channelManagement.closure')
                : t('channelManagement.open')}
            </BaseButton>
          )
        }
      }
    }
  }
])

const { allSchemas } = useCrudSchemas(crudSchemas)

const confirmStatus = (row: TunnelType) => {
  ElMessageBox.confirm(
    row.tunnel_statu
      ? t('channelManagement.tunnelCloseStatu')
      : t('channelManagement.tunnelOpenStatu'),
    t('paymentManagement.warning'),
    {
      confirmButtonText: t('paymentManagement.ok'),
      cancelButtonText: t('paymentManagement.cancel'),
      type: 'warning',
      center: true
    }
  )
    .then(async () => {
      try {
        await updateTunnelApi(row)
        getList()
      } catch (error) {
        console.log(error)
        ElMessage({
          type: 'error',
          message: t('common.error')
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: t('common.operationCanceled')
      })
    })
}
</script>

<template>
  <ContentWrap style="margin-bottom: 20px">
    <Breadcrumb class="<md:hidden" />
  </ContentWrap>
  <ChannelInfotip :show-index="false" :title="`${t('channelInfotip.recommendedUse')}`" />
  <ContentWrap class="lg-middle">
    <Table
      :loading="loading"
      :columns="allSchemas.tableColumns"
      :data="dataList"
      style="font-size: small"
    />
  </ContentWrap>
</template>

<style>
.lg-middle {
  width: 100%;
}
@media (min-width: 992px) {
  .lg-middle {
    min-width: 60%;
    max-width: 65%;
  }
}
</style>
