<template>
  <div>
    <el-form labelPosition="left" label-width="120px">
      <el-form-item
        :label="$t('operation.VenueType')"
        v-if="LetterData.gameType"
      >
        <el-tag v-if="LetterData.gameType == 0">{{
          $t("operation.Csports")
        }}</el-tag>
        <el-tag v-if="LetterData.gameType == 1">{{
          $t("operation.FBsports")
        }}</el-tag>
        <el-tag v-if="LetterData.gameType == 2">{{
          $t("operation.DBsports")
        }}</el-tag></el-form-item
      >
      <el-form-item :label="$t('operation.sendTime')">{{
        LetterData.sendTime
      }}</el-form-item>
      <el-form-item :label="$t('operation.title')">{{
        LetterData.title
      }}</el-form-item>
      <el-form-item :label="$t('operation.content')"
        >
        <div class="editor">
          <div class="ql-container">
            <div class="ql-editor">
              <div v-html="LetterData.content" class="content-box"></div>
            </div>
          </div>
        </div>
        </el-form-item>
      <el-form-item :label="$t('operation.Accounttype')">
        <div v-if="LetterData.accountType == 0">
          {{ $t("operation.Allmembers") }}
        </div>
        <el-tag v-if="LetterData.accountType == 1">
          {{ $t("operation.designatmember") }}</el-tag
        >
        <el-tag v-if="LetterData.accountType == 2">
          {{ $t("operation.Fullagentline") }}</el-tag
        >
        <el-tag v-if="LetterData.accountType == 3">
          {{ $t("operation.tip4") }}</el-tag
        >
      </el-form-item>
      <el-form-item :label="$t('operation.account')" v-if="LetterData.accounts">
        <div class="ac-text" v-if="LetterData.accounts">
          {{ LetterData.accounts }}
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { getLetterApi } from "@/api/operation/announcement.js";
import { Base64 } from "js-base64";
const props = defineProps({
  viewLetterId: {},
});
const LetterData = ref({});
const getLetter = async () => {
  console.log(props.viewLetterId);
  await getLetterApi(props.viewLetterId).then((res) => {
    LetterData.value = res;
    LetterData.value.content = Base64.decode(LetterData.value.content);
    console.log(res);
  });
};
onMounted(() => {
  getLetter();
});
</script>

<style lang="scss" scoped>
:deep() {
  .content-box {
    // width:828px;
    // p {
    //   width:798px;
    // }
    img{
      width:798px;
    }
  }
}

// .ac-text {
//   width: 80%;
//   height: 300px;
//   border: 1px solid rgb(121, 121, 121);
//   overflow-x: scroll;
// }
</style>
