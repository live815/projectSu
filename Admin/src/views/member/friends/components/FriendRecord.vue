<!-- 流水分成 -->
<template>
  <div class="running-water">
    <label class="invite-mall"
    ><span class="required-star"></span
    >{{ $t("member.turnoverWithdrawMultiple") }}</label
    >
    <el-input
        v-model="percentage"
        :placeholder="$t('member.pleaseInput')"
        style="width: 200px"
        clearable
        type="text"
        oninput="value=value.replace(/\D/g,'')"
        maxlength="10"
    >
    </el-input>
    <el-button
        @click="saveInviteBet"
        type="primary"
        style="margin-left: 30px"
        icon="Setting"
    >{{ $t("member.config") }}
    </el-button
    >
  </div>
  <el-form
      :model="queryParams"
      ref="queryRef"
      label-position="top"
      :rules="rules"
      class="form-data"
  >
    <el-row>
      <el-col :span="20">
        <el-form-item label="" prop="tableData" class="full-width">
          <el-table
              :data="queryParams.tableData"
              style="width: 100%"
              :empty-text="$t('member.noData')"
          >
            <el-table-column
                prop="lobbyName"
                :label="$t('member.platformName')"
                min-width="200"
                align="center"
            />
            <el-table-column
                prop="awardPer"
                min-width="200"
                :label="$t('member.upgradeLeastDp')"
                align="center"
            >
              <template #default="{ row, $index }">
                <el-row>
                  <el-col :span="20">
                    <el-form-item
                        :prop="`tableData.${$index}.awardPer`"
                        style="height: 50px"
                    >
                      <el-input
                          :placeholder="$t('member.pleaseInput')"
                          v-model="row['awardPer']"
                          clearable
                          oninput="value=value.toString().match(/^\d+(?:\.\d{0,4})?/); if(value> 100) value = 100; if(value < 0) value = null"
                          maxlength="20"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">%</el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-row class="theme-invite">
    <div class="button-container">
      <el-button type="primary" @click="submit">{{
          $t("member.save")
        }}
      </el-button>
      <el-button @click="recoveryLastData">{{
          $t("member.recoverLastSetting")
        }}
      </el-button>
    </div>
  </el-row>
</template>

<script setup>
import {getCurrentInstance, onMounted, ref} from "vue";
import i18n from "@/i18n";
import {queryInviteBetConfig, saveInviteBetConfig, saveInviteBetDraw,} from "@/api/member/invite/index";
import {deepCopy} from "@/utils/index";
import {ElMessage} from "element-plus";

const percentage = ref("");
const {proxy} = getCurrentInstance();
const queryParams = ref({
  tableData: [],
});
const tableDataClone = ref([]);
const isFirstLoad = ref(true);
const rules = ref({
  awardPer: [
    {
      pattern: /^\d+(\.\d{1,2})?$/,
      message: i18n.global.t("member.pleaseInputMaxTwoNumberDecimal"),
      trigger: "blur",
    },
  ],
  wdAmountsLimit: [
    {
      pattern: /^[0-9]*[1-9][0-9]*$/,
      message: i18n.global.t("member.pleaseInputPositive"),
      trigger: "blur",
    },
    {min: 0, max: 100}
  ],
});

onMounted(async () => {
  if(isFirstLoad.value){
    await getList();
    isFirstLoad.value = false;
  }
});

const saveInviteBet = () => {
  saveInviteBetDraw({betAwardMultiple: percentage.value}).then(() => {
    ElMessage.success(
        i18n.global.t("member.save") + i18n.global.t("member.success")
    );
    getList();
  });
};

function getList() {
  return queryInviteBetConfig().then((res) => {
    // console.log("res==", res);
    // const arr = res?.["list"] && !!res?.["list"].length && res?.["list"].map(item => {
    //   item.awardPer = item.awardPer + ''
    //   return item
    // })
    queryParams.value.tableData = res?.["list"];
    tableDataClone.value = res ? deepCopy(queryParams.value.tableData) : [];
    percentage.value = res?.["betAwardMultiple"] || "";
  });
}

function submit() {
  saveInviteBetConfig(queryParams.value.tableData).then(() => {
    ElMessage.success(
        i18n.global.t("member.save") + i18n.global.t("member.success")
    );
    getList();
  });
}

const recoveryLastData = () => {
  queryParams.value.tableData = deepCopy(tableDataClone.value);
};
onActivated(()=>{
  !isFirstLoad.value && getList()
})
</script>

<style lang="scss" scoped>
.required-star::before {
  content: "*";
  color: red;
  margin-left: 2px;
}

.running-water {
  margin: 20px 0 30px 0;
}

.invite-mall {
  font-weight: normal;
  font-size: 15px;
}

.percentage-symbol {
  background-color: transparent;
}

.theme-invite {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: flex-end; /* 垂直底部对齐 */
  height: 20vh;
}
</style>
