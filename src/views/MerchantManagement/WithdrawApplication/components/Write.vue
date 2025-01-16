<script setup lang="tsx">
import { Form, FormSchema } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch, ref, unref, nextTick } from 'vue'
import { useValidator } from '@/hooks/web/useValidator'
import { useI18n } from '@/hooks/web/useI18n'
import { ElTree, ElCheckboxGroup, ElCheckbox } from 'element-plus'
import { getMenuListApi } from '@/api/menu'
import { filter, eachTree } from '@/utils/tree'
import { findIndex } from '@/utils'

const { t } = useI18n()

const { required } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<any>,
    default: () => null
  }
})

const treeRef = ref<typeof ElTree>()

const formSchema = ref<FormSchema[]>([
  // {
  //   field: 'roleName',
  //   label: t('role.roleName'),
  //   component: 'Input'
  // },
  // {
  //   field: 'status',
  //   label: t('menu.status'),
  //   component: 'Select',
  //   componentProps: {
  //     options: [
  //       {
  //         label: t('userDemo.disable'),
  //         value: 0
  //       },
  //       {
  //         label: t('userDemo.enable'),
  //         value: 1
  //       }
  //     ]
  //   }
  // }
  {
    field: 'roleName',
    label: t('role.roleName'),
    component: 'Input'
  }
])

const currentTreeData = ref()
const nodeClick = (treeData: any) => {
  currentTreeData.value = treeData
}

const rules = reactive({
  roleName: [required()],
  role: [required()],
  status: [required()]
})

const { formRegister, formMethods } = useForm()
const { setValues, getFormData, getElFormExpose } = formMethods

const treeData = ref([])
const getMenuList = async () => {
  const res = await getMenuListApi()
  if (res) {
    treeData.value = res.data.list
    if (!props.currentRow) return
    await nextTick()
    const checked: any[] = []
    eachTree(props.currentRow.menu, (v) => {
      checked.push({
        id: v.id,
        permission: v.meta?.permission || []
      })
    })
    eachTree(treeData.value, (v) => {
      const index = findIndex(checked, (item) => {
        return item.id === v.id
      })
      if (index > -1) {
        const meta = { ...(v.meta || {}) }
        meta.permission = checked[index].permission
        v.meta = meta
      }
    })
    for (const item of checked) {
      unref(treeRef)?.setChecked(item.id, true, false)
    }
    // unref(treeRef)?.setCheckedKeys(
    //   checked.map((v) => v.id),
    //   false
    // )
  }
}
getMenuList()

const submit = async () => {
  const elForm = await getElFormExpose()
  const valid = await elForm?.validate().catch((err) => {
    console.log(err)
  })
  if (valid) {
    const formData = await getFormData()
    const checkedKeys = unref(treeRef)?.getCheckedKeys() || []
    const data = filter(unref(treeData), (item: any) => {
      return checkedKeys.includes(item.id)
    })
    formData.menu = data || []
    console.log(formData)
    return formData
  }
}

watch(
  () => props.currentRow,
  (currentRow) => {
    if (!currentRow) return
    setValues(currentRow)
  },
  {
    deep: true,
    immediate: true
  }
)

defineExpose({
  submit
})
</script>

<template>
  <!-- <Form :rules="rules" @register="formRegister" :schema="formSchema" /> -->
  <h1><b>Order data statistics</b></h1>
  <p>Total Items: 0</p>
  <p>Total amount: 0</p>
</template>

<style>
h1 {
  text-align: center;
  font-size: 36px;
  margin-bottom: 50px;
}
p {
  margin-left: 70px;
  font-size: 18px;
}
</style>
