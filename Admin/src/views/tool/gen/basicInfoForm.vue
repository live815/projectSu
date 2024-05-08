<template>
  <el-form ref="basicInfoForm" :model="info" :rules="rules" label-width="150px">
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('system.tip138')" prop="tableName">
          <el-input
            :placeholder="$t('system.tip139')"
            v-model="info.tableName"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('system.tip140')" prop="tableComment">
          <el-input
            :placeholder="$t('system.tip141')"
            v-model="info.tableComment"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('system.tip142')" prop="className">
          <el-input
            :placeholder="$t('system.tip141')"
            v-model="info.className"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('system.tip143')" prop="functionAuthor">
          <el-input
            :placeholder="$t('system.tip141')"
            v-model="info.functionAuthor"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item :label="$t('system.remark')" prop="remark">
          <el-input type="textarea" :rows="3" v-model="info.remark"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
import i18n from "@/i18n";
defineProps({
  info: {
    type: Object,
    default: null,
  },
});

// 表单校验
const rules = ref({
  tableName: [
    {
      required: true,
      message: i18n.global.t("system.tip144"),
      trigger: "blur",
    },
  ],
  tableComment: [
    {
      required: true,
      message: i18n.global.t("system.tip145"),
      trigger: "blur",
    },
  ],
  className: [
    {
      required: true,
      message: i18n.global.t("system.tip146"),
      trigger: "blur",
    },
  ],
  functionAuthor: [
    {
      required: true,
      message: i18n.global.t("system.tip147"),
      trigger: "blur",
    },
  ],
});
</script>
