<template>
  <div class="">
    <div class="head-title">
      <div
        class="chat-btn"
        :class="{ check: colorIndex == '0' }"
        @click="handleChange('0')"
      >
        {{ $t("live.Livechatroom") }}
      </div>
      <div
        class="chat-btn"
        :class="{ check: colorIndex == '1' }"
        @click="handleChange('1')"
      >
        {{ $t("live.satelliteChatroom") }}
      </div>
    </div>
    <el-form :model="queryParams" :rules="rules" ref="queryRef" label-width="">
      <el-row>
        <el-col>
          <div class="item-title">{{ $t("live.Functionswitch") }}</div>
          <el-form-item
            :label="$t('live.ChatRoomfunction')"
            prop="chatRoomEnable"
            class="full-width"
            label-width="130px"
          >
            <el-switch
              v-model="boolean1"
              class="mb-2"
              :active-text="$t('live.tip77')"
              inactive-text=""
              @change="handleChange1"
            />
          </el-form-item>
        </el-col>
        <el-col>
          <div class="item-title" v-if="colorIndex == '0'">
            {{ $t("live.giftfunction") }}
          </div>
          <el-form-item
            :label="$t('live.giftfunctionSWitch')"
            prop="giftEnable"
            class="full-width"
            label-width="130px"
            v-if="colorIndex == '0'"
          >
            <el-switch
              v-model="boolean2"
              class="mb-2"
              :active-text="$t('live.tip78')"
              inactive-text=""
              @change="handleChange2"
            />
          </el-form-item>
        </el-col>
        <el-col>
          <div class="item-title">{{ $t("live.SpeechCondit") }}</div>
          <el-form-item
            :label="$t('live.SpeakSwitch')"
            prop="speakEnable"
            class="full-width"
            label-width="130px"
          >
            <el-switch
              v-model="boolean3"
              class="mb-2"
              :active-text="$t('live.tip79')"
              inactive-text=""
              @change="handleChange3"
            />
          </el-form-item>
          <el-form-item
            :label="$t('live.tip80')"
            prop="speakVipLevel"
            class="full-width"
            label-width="150px"
          >
            <!--  @change="handleCheckbox" -->
            <el-checkbox-group v-model="queryParams.speakVipLevel">
              <el-checkbox
                v-for="item in list"
                :key="item.value"
                :label="item.value"
              >
                {{ item.label }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col>
          <div class="item-title">{{ $t("live.speakrules") }}</div>
          <el-form-item
            :label="$t('live.tip81')"
            prop="phoneNumberEnable"
            class="full-width"
            label-width="130px"
          >
            <el-switch
              v-model="boolean4"
              class="mb-2"
              :active-text="$t('live.tip82')"
              inactive-text=""
              @change="handleChange4"
            />
          </el-form-item>
          <el-form-item
            :label="$t('live.URLfiltering')"
            prop="internetUrlEnable"
            class="full-width"
            label-width="130px"
          >
            <el-switch
              v-model="boolean5"
              class="mb-2"
              :active-text="$t('live.tip83')"
              inactive-text=""
              @change="handleChange5"
            />
          </el-form-item>
          <el-form-item
            :label="$t('live.tip84')"
            prop=""
            class="full-width"
            label-width="130px"
          >
            <div class="mg-50">
              <el-col style="margin-bottom: 15px">
                <el-checkbox
                  v-model="checked1"
                  :label="$t('live.tip85')"
                  size="large"
                  @change="handleRadio"
                />
                <el-checkbox
                  v-model="checked"
                  :label="$t('live.Normalban')"
                  size="large"
                  disabled
                />
              </el-col>
              <el-form-item
                label=""
                prop="input1"
                class="full-width"
                label-width=""
              >
                <el-col>
                  <div class="bantimebox">
                    <span class="bantime-title">{{ $t("live.mutetime") }}</span>
                    <el-input
                      v-model="queryParams.input1"
                      placeholder=""
                      size="small"
                      style="width: 100px"
                      @blur="blueInput('1')"
                    />
                    <span class="bantime-end">({{ $t("live.tip86") }})</span>
                  </div>
                </el-col>
              </el-form-item>
            </div>

            <div class="mg-50">
              <el-col style="margin-bottom: 15px">
                <el-checkbox
                  v-model="checked2"
                  :label="$t('live.tip85')"
                  size="large"
                  @change="handleRadio1"
                />
                <el-checkbox
                  v-model="checked"
                  :label="$t('live.Normalban')"
                  size="large"
                  disabled
                />
              </el-col>
              <el-form-item
                label=""
                prop="input2"
                class="full-width"
                label-width=""
              >
                <el-col>
                  <div class="bantimebox">
                    <span class="bantime-title">{{ $t("live.mutetime") }}</span>
                    <el-input
                      v-model="queryParams.input2"
                      placeholder=""
                      size="small"
                      style="width: 100px"
                      @blur="blueInput('2')"
                    />
                    <span class="bantime-end">({{ $t("live.tip86") }})</span>
                  </div>
                </el-col>
              </el-form-item>
            </div>
            <div class="mg-50">
              <el-col style="margin-bottom: 15px">
                <el-checkbox
                  v-model="checked3"
                  :label="$t('live.tip85')"
                  size="large"
                  @change="handleRadio2"
                />

                <el-checkbox
                  v-model="checked"
                  :label="$t('live.Normalban')"
                  size="large"
                  disabled
                />
              </el-col>
              <el-form-item
                label=""
                prop="input3"
                class="full-width"
                label-width=""
              >
                <el-col>
                  <div class="bantimebox">
                    <span class="bantime-title">{{ $t("live.mutetime") }}</span>
                    <el-input
                      v-model="queryParams.input3"
                      placeholder=""
                      size="small"
                      style="width: 100px"
                      @blur="blueInput('3')"
                    />
                    <span class="bantime-end">({{ $t("live.tip86") }})</span>
                  </div>
                </el-col>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item
            :label="$t('live.tip87')"
            class="full-width"
            label-width="140px"
          >
            <div class="mg-20">
              <span class="bantime-title">{{ $t("live.tip88") }}</span>
              <el-select
                v-model="select1"
                placeholder=""
                size="small"
                style="width: 150px"
                @change="handleSelect"
              >
                <el-option label="90%" value="90%" />
                <el-option label="100%" value="100%" />
              </el-select>
            </div>
            <div class="mg-20">
              <el-form-item :label="$t('live.quantityReaches')"
              prop="input5"
              class=""
              label-width="">
            <el-input
                v-model="queryParams.input5"
                placeholder=""
                size="small"
                style="width: 100px"
                @blur="blueInput('5')"
              />
              <span class="bantime-end">{{ $t("live.tip89") }}</span>
          </el-form-item>
              <!-- <span class="bantime-title">{{
                $t("live.quantityReaches")
              }}</span> -->
              
            </div>

            <div class="flex">
              <div class="bantime-title">{{ $t("live.tip90_1") }}</div>
              <div class="bantime-right">
                <el-col style="margin-bottom: 15px">
                  <el-checkbox
                    v-model="checked4"
                    :label="$t('live.tip85')"
                    size="large"
                    @change="handleRadioChange"
                  />
                  <el-checkbox
                    v-model="checked"
                    :label="$t('live.Normalban')"
                    size="large"
                    disabled
                  />
                </el-col>
                <el-form-item
                  label=""
                  prop="input4"
                  class="full-width"
                  label-width=""
                >
                  <el-col class="bantimebox">
                    <span class="bantime-title">{{ $t("live.mutetime") }}</span>
                    <el-input
                      v-model="queryParams.input4"
                      placeholder=""
                      size="small"
                      style="width: 100px"
                      @blur="blueInput('4')"
                    />
                    <span class="bantime-end">({{ $t("live.tip86") }})</span>
                  </el-col>
                </el-form-item>
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col style="margin-top: 30px">
          <div class="item-title">{{ $t("live.Chatroomessages") }}</div>
          <el-form-item
            :label="$t('live.Chatroomannounce')"
            class="full-width"
            label-width="100px"
          >
            <el-input v-model="queryParams.bulletin" type="textarea" />
          </el-form-item>
          <el-form-item
            :label="$t('live.Chatroomassistant')"
            class="full-width"
            label-width="100px"
          >
            <el-input
              v-model="queryParams.tinyAssistant1"
              type="textarea"
              maxlength="150"
              show-word-limit
            />
          </el-form-item>
          <el-form-item
            :label="$t('live.Chatroomassistant')"
            class="full-width"
            label-width="100px"
          >
            <el-input
              v-model="queryParams.tinyAssistant2"
              type="textarea"
              maxlength="150"
              show-word-limit
            />
          </el-form-item>
          <el-form-item
            :label="$t('live.Chatroomassistant')"
            class="full-width"
            label-width="100px"
          >
            <el-input
              v-model="queryParams.tinyAssistant3"
              type="textarea"
              maxlength="150"
              show-word-limit
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="bom-btn">
      <el-button
        type="primary"
        @click="submit"
        size="large"
        v-hasPermi="['chatroom:config:add']"
      >
        {{ $t("live.save") }}
      </el-button>
      <el-button @click="cancel" size="large">{{
        $t("live.cancel")
      }}</el-button>
    </div>
  </div>
</template>
<script setup>
import { addChatroomConfig, getChatroomConfig } from "@/api/live/chatroomange";
import { onMounted } from "vue";
import i18n from "@/i18n";
const { proxy } = getCurrentInstance();
// 整数数字校验规则
const checknumber = (rule, value, callback) => {
  const reguserName = /^\+?[1-9]\d*$/;
  if (reguserName.test(value)) {
    callback();
  } else {
    callback(new Error(i18n.global.t("live.tip89")));
  }
};
const queryRef = ref("");
const currentIndex = ref(1);
const data = reactive({
  queryParams: {
    chatRoomType: 1,
    chatRoomEnable: false,
    giftEnable: 0,
    speakEnable: 0,
    repeatNum: "",
    systemBanItem: "1",
    phoneNumberEnable: 0,
    internetUrlEnable: 0,
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    speakVipLevel: [],
  },
  rules: {
    chatRoomEnable: [{ required: true, message: "1", trigger: "change" }],
    giftEnable: [{ required: true, message: "2", trigger: "change" }],
    speakEnable: [{ required: true, message: "3", trigger: "change" }],
    phoneNumberEnable: [{ required: true, message: "4", trigger: "change" }],
    speakVipLevel: [
      {
        required: true,
        message: i18n.global.t("live.tip90_1"),
        trigger: "change",
      },
    ],
    internetUrlEnable: [{ required: true, message: "6", trigger: "change" }],
    input1: [
      { required: true, message: i18n.global.t("live.tip91"), trigger: "blur" },
      {
        validator: checknumber,
        trigger: "blur",
      },
    ],
    input2: [
      { required: true, message: i18n.global.t("live.tip91"), trigger: "blur" },
      {
        validator: checknumber,
        trigger: "blur",
      },
    ],
    input3: [
      { required: true, message: i18n.global.t("live.tip91"), trigger: "blur" },
      {
        validator: checknumber,
        trigger: "blur",
      },
    ],
    input4: [
      { required: true, message: i18n.global.t("live.tip91"), trigger: "blur" },
      {
        validator: checknumber,
        trigger: "blur",
      },
    ],
    input5: [
      { required: true, message: i18n.global.t("live.tip91"), trigger: "blur" },
      {
        validator: checknumber,
        trigger: "blur",
      },
    ],
    bulletin: [
      { required: true, message: i18n.global.t("live.tip92"), trigger: "blur" },
    ],
    tinyAssistant1: [
      { required: true, message: i18n.global.t("live.tip93"), trigger: "blur" },
    ],
    tinyAssistant2: [
      { required: true, message: i18n.global.t("live.tip93"), trigger: "blur" },
    ],
    tinyAssistant3: [
      { required: true, message: i18n.global.t("live.tip93"), trigger: "blur" },
    ],
  },
});
const { queryParams, rules } = toRefs(data);
const colorIndex = ref("0");
const checkList = ref([]);
const boolean1 = ref(false);
const boolean2 = ref(false);
const boolean3 = ref(false);
const boolean4 = ref(false);
const boolean5 = ref(false);
const obj1 = ref({ type: "1" });
const obj2 = ref({ type: "1" });
const obj3 = ref({ type: "1" });
const checked = ref(true);
const checked1 = ref(false);
const checked2 = ref(false);
const checked3 = ref(false);
const checked4 = ref(false);
const clientBanList = ref([]);
const select1 = ref("");
const list = ref([
  {
    label: "VIP0",
    value: "0",
  },
  {
    label: "VIP1",
    value: "1",
  },
  {
    label: "VIP2",
    value: "2",
  },
  {
    label: "VIP3",
    value: "3",
  },
  {
    label: "VIP4",
    value: "4",
  },
  {
    label: "VIP5",
    value: "5",
  },
  {
    label: "VIP6",
    value: "6",
  },
  {
    label: "VIP7",
    value: "7",
  },
  {
    label: "VIP8",
    value: "8",
  },
  {
    label: "VIP9",
    value: "9",
  },
  {
    label: "VIP10",
    value: "10",
  },
  {
    label: "VIP11",
    value: "11",
  },
]);
const isFirstLoad = ref(true);
function handleChange(val) {
  proxy.resetForm("queryRef");
  colorIndex.value = val;
  if (val == "0") {
    queryParams.value.chatRoomType = Number(1);
    currentIndex.value = 1;
  } else if (val == "1") {
    queryParams.value.chatRoomType = Number(2);
    currentIndex.value = 2;
  }
  getConfigList();
}
function handleChange1(val) {
  if (val) {
    queryParams.value.chatRoomEnable = 1;
  } else if (!val) {
    queryParams.value.chatRoomEnable = 0;
  }
}
function handleChange2(val) {
  if (val) {
    queryParams.value.giftEnable = 1;
  } else if (!val) {
    queryParams.value.giftEnable = 0;
  }
}
function handleChange3(val) {
  if (val) {
    queryParams.value.speakEnable = 1;
  } else if (!val) {
    queryParams.value.speakEnable = 0;
  }
}
function handleChange4(val) {
  if (val) {
    queryParams.value.phoneNumberEnable = 1;
  } else if (!val) {
    queryParams.value.phoneNumberEnable = 0;
  }
}
function handleChange5(val) {
  if (val) {
    queryParams.value.internetUrlEnable = 1;
  } else if (!val) {
    queryParams.value.internetUrlEnable = 0;
  }
}
function handleCheckbox(val) {
  console.log(val, "val");
  checkList.value = val;
  queryParams.value.speakVipLevel = checkList.value;
}
function changeNumber(val) {
  var str = val.replace("%", "");
  str = str / 100;
  return str;
}
function handleSelect(val) {
  queryParams.value.repeatContentRatio = changeNumber(val);
}

function handleRadio(val) {
  if (val) {
    obj1.value.type = "2";
  } else if (!val) {
    obj1.value.type = "1";
  }
}
function handleRadio1(val) {
  if (val) {
    obj2.value.type = "2";
  } else if (!val) {
    obj2.value.type = "1";
  }
}
function handleRadio2(val) {
  if (val) {
    obj3.value.type = "2";
  } else if (!val) {
    obj3.value.type = "1";
  }
}
// 客户端禁言配置 输入禁言时间
function blueInput(val) {
  if (val == "1") {
    obj1.value.time = queryParams.value.input1;
  } else if (val == "2") {
    obj2.value.time = queryParams.value.input2;
  } else if (val == "3") {
    obj3.value.time = queryParams.value.input3;
  } else if (val == "4") {
    queryParams.value.systemBanDuration = queryParams.value.input4;
  }else if(val=='5'){
    queryParams.value.repeatNum=queryParams.value.input5;

  }
}
function handleRadioChange(val) {
  if (val) {
    queryParams.value.systemBanItem = "2";
  } else if (!val) {
    queryParams.value.systemBanItem = "1";
  }
}
function submit() {
  queryRef.value.validate((valid) => {
    if (valid) {
      clientBanList.value = [];
      clientBanList.value.push(obj1.value);
      clientBanList.value.push(obj2.value);
      clientBanList.value.push(obj3.value);
      queryParams.value.speakVipLevel =
        queryParams.value.speakVipLevel.join(",");
      var last = JSON.stringify(clientBanList.value);
      queryParams.value.clientBanItem = last;
      console.log(last, clientBanList.value, "888");
      addChatroomConfig(queryParams.value).then((res) => {
        proxy.$modal.msgSuccess(i18n.global.t("live.tip94"));
        // resetQuery();
        getConfigList();
      });
    } else {
      return;
    }
  });
}
function resetQuery() {
  checkList.value = [];
  queryParams.value.speakVipLevel = "";
  checked1.value = false;
  checked2.value = false;
  checked3.value = false;
  checked4.value = false;
  boolean1.value = false;
  boolean2.value = false;
  boolean3.value = false;
  boolean4.value = false;
  boolean5.value = false;
  select1.value = "";
  queryParams.value.repeatNum = "";

  proxy.resetForm("queryRef");
}
function cancel() {
  resetQuery();
}
onMounted(async() => {
  if(isFirstLoad.value){
    await getConfigList();
    isFirstLoad.value = false
  }
});
const getConfigList = async () => {
  try {
    let res = await getChatroomConfig({ chatRoomType: currentIndex.value });
    if (res.rows?.length > 0) {
      queryParams.value = res.rows[0];
      queryParams.value.clientBanItem = res.rows[0]?.clientBanItem;
      let clientBanItem = JSON.parse(res.rows[0]?.clientBanItem);
      if (clientBanItem && clientBanItem.length > 0) {
        checked1.value = clientBanItem[0].type == 2 ? true : false;
        queryParams.value.input1 = clientBanItem[0].time;
        obj1.value.time = queryParams.value.input1;
        obj1.value.type = clientBanItem[0].type;

        checked2.value = clientBanItem[1].type == 2 ? true : false;
        queryParams.value.input2 = clientBanItem[1].time;
        obj2.value.time = clientBanItem[1].time;
        obj2.value.type = clientBanItem[1].type;

        checked3.value = clientBanItem[2].type == 2 ? true : false;
        queryParams.value.input3 = clientBanItem[2].time;
        obj3.value.time = clientBanItem[2].time;
        obj3.value.type = clientBanItem[2].type;

        queryParams.value.input4 = res.rows[0].systemBanDuration;
        queryParams.value.input5 = res.rows[0].repeatNum;
        checked4.value = res.rows[0].systemBanItem == 2 ? true : false;
        boolean1.value = res.rows[0].chatRoomEnable == 1 ? true : false;
        boolean2.value = res.rows[0].giftEnable == 1 ? true : false;
        boolean3.value = res.rows[0].speakEnable == 1 ? true : false;
        boolean4.value = res.rows[0].phoneNumberEnable == 1 ? true : false;
        boolean5.value = res.rows[0].internetUrlEnable == 1 ? true : false;
        select1.value = res.rows[0].repeatContentRatio
          ? res.rows[0].repeatContentRatio * 100 + "%"
          : "";
      }
      queryParams.value.speakVipLevel = res.rows[0].speakVipLevel.split(",");
    } else {
      resetQuery();
    }
  } catch (e) {
    console.log(e);
  }
};
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getConfigList();
  }
})
</script>
<style lang="scss" scoped>
.head-title {
  display: flex;
  margin-bottom: 16px;
  .chat-btn {
    width: 150px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    color: #fff;
    background-color: #9b9b9b;
    margin-right: 36px;
  }
}
.check {
  background-color: #1890ff !important;
}
.item-title {
  margin-bottom: 16px;
  font-weight: 600;
}
.bantimebox {
  display: flex;
  align-items: center;
  height: 20px;
}
.bantime-title {
  white-space: nowrap;
  margin-right: 12px;
}
.bantime-end {
  white-space: nowrap;
  margin-left: 12px;
}
.mg-20 {
  margin-right: 46px;
}
.mg-50 {
  height: 40px;
  display: flex;
  flex-direction: column;
  margin-right: 60px;
  margin-bottom: 46px;
}
.flex {
  display: flex;
  align-items: center;
}
.bantime-right {
  margin-top: 35px;
}
.el-form {
  :deep(.el-form-item__label) {
    justify-content: flex-start;
  }
}
.bom-btn {
  margin: 26px 0;
}
</style>
