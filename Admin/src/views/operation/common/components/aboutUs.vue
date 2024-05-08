<template>
  <div class="app-container">
    <div class="text-field">
      <el-row>
        <el-col :span="4">
          <div class="primary">
            <div class="primary-one">
              <el-button type="primary" @click="toShowAddOpt(true)">{{
                $t("operation.tip19")
              }}</el-button>
            </div>
            <div>
              <el-input
                class="w-50 m-2"
                :placeholder="$t('operation.pleaseEnter')"
                :suffix-icon="Search"
                style="width: 230px"
              />
            </div>

            <div
              :class="
                currentTutorialId == item.id
                  ? 'tutorial active-tab'
                  : 'tutorial '
              "
              v-for="(item, index) in tutorialData"
              :key="index"
            >
              <div class="text" @click.stop="changeTutorial(index)">
                {{ item.title }}
              </div>
              <div class="icon">
                <div @click="toShowAddOpt(true, item)">
                  <el-icon><Edit /></el-icon>
                </div>
                <div>
                  <el-icon @click.stop="deleTutorial(item.id)"
                    ><DeleteFilled
                  /></el-icon>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="options">
            <el-form>
              <el-form-item :label="$t('operation.titlecontent')">
                <el-input v-model="title" style="width: 500px" />
              </el-form-item>
              <el-form-item>
                <Editor v-model="content" :minHeight="200"></Editor>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  style="width: 120px; margin-left: 760px"
                  @click="toEditConfigApi"
                  >{{ $t("operation.save") }}</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog
      v-model="showAddOpt"
      :title="isShowEdit ? $t('operation.tip20') : $t('operation.tip21')"
      width="700px"
      :center="true"
    >
      <AddTutorial
        :viewLetterId="showAddOpt"
        v-if="showAddOpt"
        :currentTutorial="currentTutorial"
        :typeId="tutorialForm.configType"
        @handleClose="toShowAddOpt"
        :close="toShowAddOpt"
      ></AddTutorial>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  editConfigApi,
  deleConfigApi,
  addConfigApi,
} from "@/api/operation/tutorial.js";
import { onMounted } from "vue";
import AddTutorial from "./AddTutorial.vue";
import {
  getTutorialListApi,
  deleTutorialApi,
  getConfigApi,
} from "@/api/operation/common.js";
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { Base64 } from "js-base64";
import { ElMessage } from "element-plus";
import i18n from "@/i18n";

// 编辑功能
const toEditConfigApi = () => {
  let temp = Base64.encode(content.value);
  configData.value.tabName = title.value;
  configData.value.tabContent = temp;
  editConfigApi(configData.value);
  getTutorialList();
  ElMessage({
    type: "success",
    message: i18n.global.t("operation.saveSuccess"),
  });
};

// 表单内容
const title = ref("");
const configData = ref({
  tabName: "",
  tabContent: "",
});
const content = ref("");
const tutorialData = ref([]);
const tutorialForm = ref({
  configType: "2",
});

// 切换一级菜单
const currentTutorialId = ref(null);
const changeTutorial = (index) => {
  currentTutorialId.value = tutorialData.value[index].id;
  getConfig(currentTutorialId.value);
};

// 获取一级菜单列表(导页签/教程)和二级菜单（选项）
const getTutorialList = () => {
  getTutorialListApi(tutorialForm.value)
    .then((res) => {
      tutorialData.value = res;
      if (res.length == 0) {
        return;
      }
    })
    .then(() => {
      if (!currentTutorialId.value) {
        currentTutorialId.value = tutorialData.value[0].id;
      }
      getConfig(currentTutorialId.value);
    });
};

// 删除一级菜单
const deleTutorial = async (id) => {
  getConfigApi(id)
    .then((res) => {
      let tempList = res;
      const deletePromises = tempList.map((item) => deleConfigApi(item.id));
      return Promise.all(deletePromises);
    })
    .then(() => {
      return deleTutorialApi(id);
    })
    .then(() => {
      getTutorialList(tutorialForm.value);
      ElMessage({
        type: "success",
        message: i18n.global.t("operation.deleteSuccess"),
      });
    });
};

// 获取二级菜单
const getConfig = async (id) => {
  const res = await getConfigApi(id);

  if (res.length === 0) {
    await addConfigApi({
      tuId: currentTutorialId.value,
      tabContent: "6K+36L6T5YWl5YaF5a65",
      tabName: i18n.global.t("operation.tip8"),
    });

    // 再次获取配置信息
    const newRes = await getConfigApi(id);
    configData.value = newRes[0];
  } else {
    configData.value = res[0];
  }

  configData.value.tabContent = Base64.decode(configData.value.tabContent);
  content.value = configData.value.tabContent;
  title.value = configData.value.tabName;
};

// 添加与编辑弹窗
const showAddOpt = ref(false);
const isShowEdit = ref(false);
const currentTutorial = ref(null);
const toShowAddOpt = (n, item) => {
  if (item) {
    isShowEdit.value = true;
    currentTutorial.value = item;
  } else {
    isShowEdit.value = false;
    currentTutorial.value = null;
  }
  if (n == false) {
    getTutorialList();
  }
  showAddOpt.value = n;
};

onMounted(async () => {
  getTutorialList();
});
</script>
<style lang="scss" scoped>
.active-tab {
  background-color: rgba(0, 0, 0, 0.2);
}
.img-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon {
  width: 25px;
  height: 25px;
  margin: 0 !important;
}
.text-field {
  .primary {
    width: 230px;
    margin-right: 20px;
    .primary-one {
      margin-bottom: 20px;
    }
    .tutorial {
      margin-top: 10px;
      display: flex;
      gap: 10px;
      div {
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        line-height: 25px;
      }
      .text {
        cursor: pointer;
      }
      .icon {
        margin-left: auto;
        display: flex;
        gap: 10px;
        line-height: 30px;
        cursor: pointer;
        div:nth-child(1) {
          color: #1890ff;
        }
        div:nth-child(2) {
          color: rgba(0, 0, 0, 0.65);
        }
      }
    }
    .tutorial:hover {
      background-color: var(--el-fill-color-light);
    }
  }
}
</style>
