<template>
  <div class="edit-dialog-first">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :title="title"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form
        :model="queryParams"
        ref="queryRef"
        label-position="top"
        :rules="rules"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item
              :label="$t('live.coverlabel')"
              prop="tagCode"
              class="full-width"
            >
              <el-select
                clearable
                v-model="queryParams.tagCode"
                :placeholder="$t('member.pleaseSelect')"
                class="full-width"
              >
                <el-option
                  v-for="item in live_front_cover_tag"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="itemShow(item)"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <!-- <el-col>
            <el-form-item
              label="状态"
              prop="status"
              class="full-width"
              v-if="showedit"
            >
              <el-radio-group v-model="queryParams.status" class="ml-4">
                <el-radio label="0" size="large">启用</el-radio>
                <el-radio label="1" size="large">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col> -->
          <el-col>
            <el-form-item
              :label="$t('live.LabelbackColor')"
              prop="backgroundColor"
              class="full-width"
            >
              <el-col>
                <el-upload
                  class="avatar-uploader"
                  action="/admin/file/live/image/upload"
                  :data="{}"
                  :show-file-list="false"
                  :on-success="handleUploadSuccessdig"
                  :headers="headers"
                >
                  <img
                    v-if="queryParams.backgroundColor"
                    :src="getImgUrl(queryParams.backgroundColor)"
                    class="avatar"
                  />
                  <el-icon v-else class="avatar-uploader-icon rewrite-icon"
                    ><Plus
                  /></el-icon>
                </el-upload>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ $t("live.cancel") }}</el-button>
          <el-button type="primary" @click="submit"
            >{{ $t("live.makesure") }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import { getToken } from "@/utils/auth";
import { getImgUrl, filterLabel } from "@/utils";
import {
  addCoverlabelList,
  editCoverlabelList,
} from "@/api/live/coverlabel.js";
import i18n from "@/i18n";

const { proxy } = getCurrentInstance();
const { live_front_cover_tag } = proxy.useDict("live_front_cover_tag");

const headers = ref({ Authorization: "Bearer " + getToken() });
const props = defineProps(["open", "row", "title", "showedit", "tableData"]);

const itemShow=computed(()=>{
  return (val)=>{
    return props.tableData.map((item)=>item.tagName).includes(val.label)

  }
})


const queryParams = props.row;

const emit = defineEmits(["update:open", "onrefresh"]);
const queryRef = ref("");

onMounted(() => {
   
});
const dialogVisible = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit("update:open", val);
  },
});

const rules = reactive({
  tagCode: [
    { required: true, trigger: "blur", message: i18n.global.t("live.tip103") },
  ],
  backgroundColor: [
    {
      required: true,
      trigger: "change",
      message: i18n.global.t("live.tip104"),
    },
  ],
  // tagCode: [
  //   {
  //     required: true,
  //     trigger: "change",
  //     message: i18n.global.t("live.tip105"),
  //   },
  // ],
});

// const dialogVisible = computed({
//   get() {
//     return props.open;
//   },
//   set(val) {
//     console.log(val,'222')
//     emit("update:open", val);
//   },
// });

//根据ID查询详情
const cancel = () => {
  dialogVisible.value = false;
  
};

// 确定事件
const submit = () => {
  queryRef.value.validate((valid) => {
    queryParams.tagName = filterLabel(
      live_front_cover_tag.value,
      queryParams.tagCode
    );

    if (valid) {
      if (!props.showedit) {
        addCoverlabelList(queryParams).then((res) => {
          proxy.$modal.msgSuccess(i18n.global.t("live.tip106"));
          dialogVisible.value = false;
          emit("onrefresh");
        });
      } else if (props.showedit) {
        queryParams.status = Number(queryParams.status);
        editCoverlabelList(queryParams).then((res) => {
          proxy.$modal.msgSuccess(i18n.global.t("live.tip107"));
          dialogVisible.value = false;
          emit("onrefresh");
        });
      }
    } else {
      return;
    }
  });
};
const handleUploadSuccessdig = (res) => {
  queryParams.backgroundColor = res.data;
};
</script>

<style lang="scss" scoped>
.edit-dialog-first {
  .header-title {
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }

  img {
    width: 80px;
    height: 80px;
  }
  .rewrite-icon {
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    border: 1px dashed #eee;
  }
}
</style>
