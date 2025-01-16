<script setup lang="ts">
import { CountTo } from '@/components/CountTo'
import { useDesign } from '@/hooks/web/useDesign'
import { useI18n } from '@/hooks/web/useI18n'
import { ref, reactive } from 'vue'
import { getCountApi } from '@/api/dashboard/analysis'
import type { AnalysisTotalTypes } from '@/api/dashboard/analysis/types'
import { ElRow } from 'element-plus'
import { ElCard } from 'element-plus'
import { ElCol } from 'element-plus'
import { ElSkeleton } from 'element-plus'

const { t } = useI18n()

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('panel')

const loading = ref(true)

let totalState = reactive<AnalysisTotalTypes>({
  users: 0,
  messages: 0,
  moneys: 0,
  shoppings: 0
})

const getCount = async () => {
  const res = await getCountApi()
    .catch(() => {})
    .finally(() => {
      loading.value = false
    })
  totalState = Object.assign(totalState, res?.data || {})
}

const merchantTotalBalance = 10240
const todayGrowth = 0
const totalOrderQuantity = 0

const todayOrderQuantity = 8121
const todayCollectionAmount = 928
const todayPaymentAmount = 1360

getCount()
</script>

<template>
  <ElRow :gutter="20" justify="space-between" :class="prefixCls">
    <ElCol :xl="6" :lg="6" :md="12" :sm="12" :xs="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElSkeleton :loading="loading" animated :rows="2">
          <template #default>
            <div :class="`${prefixCls}__item flex flex-col justify-between`">
              <div
                :class="`${prefixCls}__item flex items-center justify-between p-10px`"
                style="border-bottom: solid 1px #aaa"
              >
                <div :class="`${prefixCls}__item--text text-16px text-right`">{{
                  t('home.merchantTotalBalance')
                }}</div>
                <div
                  style="
                    color: #531dab;
                    background: #f9f0ff;
                    border: #d3adf7 solid 1px;
                    border-radius: 10%;
                    padding: 2px 5px;
                  "
                  >{{ t('home.total') }}</div
                >
              </div>
              <div :class="`${prefixCls}__item flex flex-col p-20px`">
                <div :class="`${prefixCls}__item flex items-center justify-between`">
                  <CountTo
                    class="text-20px font-700 text-right"
                    :start-val="0"
                    :end-val="merchantTotalBalance"
                    :duration="2600"
                  />
                  <div>
                    <div
                      :class="`${prefixCls}__item--icon ${prefixCls}__item--peoples p-10px inline-block rounded-6px`"
                    >
                      <Icon icon="ant-design:credit-card-filled" :size="40" />
                    </div>
                  </div>
                </div>
                <div class="flex justify-between pt-10px px-10px">
                  <div :class="`${prefixCls}__item--text text-16px text-right`">{{
                    t('home.todayGrowth')
                  }}</div>
                  <div :class="`${prefixCls}__item--text text-16px text-right`"
                    >+ {{ todayGrowth }}%</div
                  >
                </div>
              </div>
            </div>
          </template>
        </ElSkeleton>
      </ElCard>
    </ElCol>

    <ElCol :xl="6" :lg="6" :md="12" :sm="12" :xs="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElSkeleton :loading="loading" animated :rows="2">
          <template #default>
            <div :class="`${prefixCls}__item flex flex-col justify-between`">
              <div
                :class="`${prefixCls}__item flex items-center justify-between p-10px`"
                style="border-bottom: solid 1px #aaa"
              >
                <div :class="`${prefixCls}__item--text text-16px text-right`">{{
                  t('home.todayOrderQuantity')
                }}</div>
                <div
                  style="
                    color: #0958d9;
                    background: #e6f4ff;
                    border: #91caff solid 1px;
                    border-radius: 10%;
                    padding: 2px 5px;
                  "
                  >{{ t('home.day') }}</div
                >
              </div>
              <div :class="`${prefixCls}__item flex flex-col p-20px`">
                <div :class="`${prefixCls}__item flex items-center justify-between`">
                  <CountTo
                    class="text-20px font-700 text-right"
                    :start-val="0"
                    :end-val="todayOrderQuantity"
                    :duration="2600"
                  />
                  <div>
                    <div
                      :class="`${prefixCls}__item--icon ${prefixCls}__item--orderquantity p-10px inline-block rounded-6px`"
                    >
                      <Icon icon="ant-design:pie-chart-filled" :size="40" />
                    </div>
                  </div>
                </div>
                <div class="flex justify-between pt-10px px-10px">
                  <div :class="`${prefixCls}__item--text text-16px text-right`">{{
                    t('home.totalOrderQuantity')
                  }}</div>
                  <div :class="`${prefixCls}__item--text text-16px text-right`">{{
                    totalOrderQuantity
                  }}</div>
                </div>
              </div>
            </div>
          </template>
        </ElSkeleton>
      </ElCard>
    </ElCol>

    <ElCol :xl="6" :lg="6" :md="12" :sm="12" :xs="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElSkeleton :loading="loading" animated :rows="2">
          <template #default>
            <div :class="`${prefixCls}__item flex flex-col justify-between`">
              <div
                :class="`${prefixCls}__item flex items-center justify-between p-10px`"
                style="border-bottom: solid 1px #aaa"
              >
                <div :class="`${prefixCls}__item--text text-16px text-right`">{{
                  t('home.todayCollectionAmount')
                }}</div>
                <div
                  style="
                    color: #389e0d;
                    background: #f6ffed;
                    border: #b7eb8f solid 1px;
                    border-radius: 10%;
                    padding: 2px 5px;
                  "
                  >{{ t('home.day') }}</div
                >
              </div>
              <div :class="`${prefixCls}__item flex flex-col p-20px`">
                <div :class="`${prefixCls}__item flex items-center justify-between`">
                  <CountTo
                    class="text-20px font-700 text-right"
                    :start-val="0"
                    :end-val="todayCollectionAmount"
                    :duration="2600"
                  />
                  <div>
                    <div
                      :class="`${prefixCls}__item--icon ${prefixCls}__item--money p-10px inline-block rounded-6px`"
                    >
                      <Icon icon="ant-design:database-filled" :size="40" />
                    </div>
                  </div>
                </div>
                <div class="flex justify-between pt-10px px-10px">
                  <div :class="`${prefixCls}__item--text text-16px text-right`">&ensp;</div>
                  <div :class="`${prefixCls}__item--text text-16px text-right`">&ensp;</div>
                </div>
              </div>
            </div>
          </template>
        </ElSkeleton>
      </ElCard>
    </ElCol>

    <ElCol :xl="6" :lg="6" :md="12" :sm="12" :xs="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElSkeleton :loading="loading" animated :rows="2">
          <template #default>
            <div :class="`${prefixCls}__item flex flex-col justify-between`">
              <div
                :class="`${prefixCls}__item flex items-center justify-between p-10px`"
                style="border-bottom: solid 1px #aaa"
              >
                <div :class="`${prefixCls}__item--text text-16px text-right`">{{
                  t('home.todayPaymentAmount')
                }}</div>
                <div
                  style="
                    color: #d46b08;
                    background: #fff7e6;
                    border: #ffd591 solid 1px;
                    border-radius: 10%;
                    padding: 2px 5px;
                  "
                  >{{ t('home.day') }}</div
                >
              </div>
              <div :class="`${prefixCls}__item flex flex-col p-20px`">
                <div :class="`${prefixCls}__item flex items-center justify-between`">
                  <CountTo
                    class="text-20px font-700 text-right"
                    :start-val="0"
                    :end-val="todayPaymentAmount"
                    :duration="2600"
                  />
                  <div>
                    <div
                      :class="`${prefixCls}__item--icon ${prefixCls}__item--shopping p-10px inline-block rounded-6px`"
                    >
                      <Icon icon="ant-design:hdd-filled" :size="40" />
                    </div>
                  </div>
                </div>
                <div class="flex justify-between pt-10px px-10px">
                  <div :class="`${prefixCls}__item--text text-16px text-right`">&ensp;</div>
                  <div :class="`${prefixCls}__item--text text-16px text-right`">&ensp;</div>
                </div>
              </div>
            </div>
          </template>
        </ElSkeleton>
      </ElCard>
    </ElCol>
  </ElRow>
</template>

<style lang="less" scoped>
:deep(.el-card__body) {
  padding: 0%;
}

@prefix-cls: ~'@{adminNamespace}-panel';

.@{prefix-cls} {
  &__item {
    &--peoples {
      color: #40c9c6;
    }

    &--orderquantity {
      color: #36a3f7;
    }

    &--money {
      color: #f4516c;
    }

    &--shopping {
      color: #34bfa3;
    }

    &:hover {
      :deep(.@{adminNamespace}-icon) {
        color: #fff !important;
      }
      .@{prefix-cls}__item--icon {
        transition: all 0.38s ease-out;
      }
      .@{prefix-cls}__item--peoples {
        background: #40c9c6;
      }
      .@{prefix-cls}__item--orderquantity {
        background: #36a3f7;
      }
      .@{prefix-cls}__item--money {
        background: #f4516c;
      }
      .@{prefix-cls}__item--shopping {
        background: #34bfa3;
      }
    }
  }
}
</style>
