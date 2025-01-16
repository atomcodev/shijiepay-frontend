<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { ConfigGlobal } from '@/components/ConfigGlobal'
import { useDesign } from '@/hooks/web/useDesign'
import { ElNotification } from 'element-plus'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('app')

const appStore = useAppStore()

const currentSize = computed(() => appStore.getCurrentSize)

const greyMode = computed(() => appStore.getGreyMode)

appStore.initTheme()
</script>

<template>
  <ConfigGlobal :size="currentSize">
    <RouterView :class="greyMode ? `${prefixCls}-grey-mode` : ''" />
  </ConfigGlobal>
</template>

<style lang="less">
@prefix-cls: ~'@{adminNamespace}-app';

.size {
  width: 100%;
  height: 100%;
}

html,
body {
  padding: 0 !important;
  margin: 0;
  overflow: hidden;
  .size;

  #app {
    .size;
  }
}

.@{prefix-cls}-grey-mode {
  filter: grayscale(100%);
}
.search-section .el-form-item--label-right {
  width: 420px;
}
.search-section .el-form-item--label-right:last-child {
  width: 100%;
}
.search-section .el-form-item--label-right:last-child > * {
  margin-left: 0 !important;
  padding: 0 !important;
}
.search-section .el-form-item__content {
  padding: 0 !important;
}
.search-section .el-form-item__content .el-input__wrapper {
  height: 34px !important;
  border-radius: 0 !important;
  border: none !important;
  border-color: gray !important;
}
.search-section .el-form-item__content .el-tooltip__trigger {
  border-radius: 0 !important;
  border: none !important;
  border-color: gray !important;
  height: 34px !important;
}
.search-section .el-form-item__label-wrap {
  margin: 0 !important;
  padding-left: 15px !important;
  width: auto;
  border: 1px solid rgb(184, 180, 180);
  font-weight: bold;
}
.search-section {
  margin-bottom: 5px;
}
.search-section > div {
  padding-bottom: 0;
}
.el-table__cell > .cell {
  text-align: center;
}
</style>
