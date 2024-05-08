<template>
  <el-form :model="queryParams" ref="ruleFormRef" :rules="rules" label-width="130px">
    <el-form-item :label="$t('newbie.form.label27')" prop="activitySwitch">
      <el-switch
        v-model="queryParams.activitySwitch"
        :active-value="1"
        :inactive-value="0"
        class="drawer-switch"
      />
    </el-form-item>
    <el-form-item :label="$t('newbie.form.label28')" prop="limitDays">
      <el-input
        v-model="queryParams.limitDays"
        :placeholder="$t('newbie.form.placeholder1')"
        show-word-limit
        type="number"
        style="width: 440px"
        min="0"
        :disabled="queryParams.id"
      />
      <span style="color: red; margin-left: 10px">
        {{ $t('newbie.form.label38') }}
      </span>
    </el-form-item>
    <el-form-item :label="$t('newbie.form.label29')" prop="gifts">
      <RewardContentList :list="queryParams.gifts" />
    </el-form-item>
    <el-form-item :label="$t('newbie.form.label30')" prop="pictureList">
      <TopImage :queryParams="queryParams" />
    </el-form-item>
    <el-form-item :label="$t('newbie.form.label31')" prop="activityDesc" required>
      <el-input
        v-model="queryParams.activityDesc"
        :rows="8"
        type="textarea"
        style="width: 440px"
        @input="inputTextarea"
      />
    </el-form-item>
  </el-form>
</template>

<script setup>
import RewardContentList from './NewbieRewardContentList.vue'
import TopImage from './NewbieParametersImage.vue'
import i18n from '@/i18n'

const props = defineProps(['queryParams'])

const rules = {
  activityDesc: [
    {
      required: true,
      message: i18n.global.t('newbie.form.message14'),
      trigger: 'blur'
    }
  ],
  limitDays: [
    {
      required: true,
      message: i18n.global.t('newbie.form.message15'),
      trigger: 'blur'
    }
  ],
  gifts: [
    {
      required: true,
      trigger: 'blur'
    }
  ],
  pictureList: [
    {
      required: true,
      trigger: 'blur'
    }
  ]
}
</script>
