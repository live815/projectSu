<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
    >
      <el-form-item :label="$t('system.PositTitle')" prop="postName">
        <el-input
          v-model="queryParams.postName"
          :placeholder="$t('system.tip66')"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('system.status')" prop="status">
        <el-select
          v-model="queryParams.status"
          :placeholder="$t('system.Positstatus')"
          clearable
          style="width: 200px"
        >
          <el-option
            v-for="dict in sys_normal_disable"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">{{
          $t("system.search")
        }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("system.reset")
        }}</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['system:post:add']"
          >{{ $t("system.add") }}</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:post:edit']"
          >{{ $t("system.edit") }}</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:post:remove']"
          >{{ $t("system.delete") }}</el-button
        >
      </el-col>
      <!-- <el-col :span="1.5">
            <el-button
               type="warning"
               plain
               icon="Download"
               @click="handleExport"
               v-hasPermi="['system:post:export']"
            >导出</el-button>
         </el-col> -->
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="postList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        :label="$t('system.PositTitle')"
        align="center"
        prop="postName"
        width="300"
      />
      <!-- <el-table-column label="岗位排序" align="center" prop="postSort" /> -->
      <el-table-column
        :label="$t('system.status')"
        align="center"
        prop="status"
        width="300"
      >
        <template #default="scope">
          <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('system.creationtime')"
        align="center"
        prop="createTime"
        width="300"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          :label="$t('system.dataEncryption')"
          align="center"
          prop="dataSafetyItem"
      >
        <template #default="scope">
          <span>{{ dataSafetyItemName(scope.row.dataSafetyItem) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('system.operate')"
        width="300"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-button
            link
            type="primary"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:post:edit']"
            >{{ $t("system.edit") }}</el-button
          >
          <el-button
            link
            type="primary"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:post:remove']"
            >{{ $t("system.delete") }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改岗位对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="postRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('system.PositTitle')" prop="postName">
          <el-input
            v-model="form.postName"
            :placeholder="$t('system.Positstatus')"
          />
        </el-form-item>
        <!-- <el-form-item label="岗位顺序" prop="postSort">
               <el-input-number v-model="form.postSort" controls-position="right" :min="0" />
            </el-form-item> -->
        <el-form-item :label="$t('system.Positstatus')" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in sys_normal_disable"
              :key="dict.value"
              :label="dict.value"
              >{{ dict.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('system.dataEncryption')" prop="dataSafetyItem">
          <el-checkbox-group v-model="form.dataSafetyItem">
            <el-checkbox label="手机号" />
            <el-checkbox label="银行卡" />
            <el-checkbox label="姓名" />
            <el-checkbox label="虚拟币地址" />
            <el-checkbox label="开户地址" />
            <el-checkbox label="邮箱" />
            <el-checkbox label="微信号" />
            <el-checkbox label="QQ" />
            <el-checkbox label="手机验证码" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item :label="$t('system.remark')" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            :placeholder="$t('system.tip4')"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">{{
            $t("system.sure")
          }}</el-button>
          <el-button @click="cancel">{{ $t("system.cancle") }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Post">
import {
  listPost,
  addPost,
  delPost,
  getPost,
  updatePost,
} from "@/api/system/post";
import {numberToFont, dataSafetyItemName, fontToNumber} from "@/utils";
import i18n from "@/i18n";
const { proxy } = getCurrentInstance();
const { sys_normal_disable } = proxy.useDict("sys_normal_disable");

const postList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    postName: undefined,
    status: undefined,
  },
  rules: {
    postName: [
      {
        required: true,
        message: i18n.global.t("system.tip66"),
        trigger: "blur",
      },
    ],
    postSort: [
      {
        required: true,
        message: i18n.global.t("system.tip67"),
        trigger: "blur",
      },
    ],
  },
});

const { queryParams, form, rules } = toRefs(data);

/** 查询岗位列表 */
function getList() {
  loading.value = true;
  listPost(queryParams.value).then((response) => {
    postList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}
/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}
/** 表单重置 */
function reset() {
  form.value = {
    postId: undefined,
    postName: undefined,
    postSort: 0,
    status: "0",
    dataSafetyItem: [],
    remark: undefined,
  };
  proxy.resetForm("postRef");
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}
/** 多选框选中数据 */
function handleSelectionChange(selection) {
  ids.value = selection.map((item) => item.postId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}
/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = i18n.global.t("system.Addposition");
}
/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const postId = row.postId || ids.value;
  getPost(postId).then((response) => {
    let dataSafetyItem_res = response.dataSafetyItem;
    let dataSafetyItem = [];
    numberToFont(dataSafetyItem_res, dataSafetyItem);
    delete response.postCode;
    form.value = response;
    form.value.dataSafetyItem = dataSafetyItem;
    open.value = true;
    title.value = i18n.global.t("system.editposition");
  });
}
/** 提交按钮 */
function submitForm() {
  proxy.$refs["postRef"].validate((valid) => {
    if (valid) {
      let dataSafetyItem = [];
      fontToNumber(form.value.dataSafetyItem, dataSafetyItem);
      form.value.dataSafetyItem = dataSafetyItem;
      if (form.value.postId != undefined) {
        updatePost(form.value).then((response) => {
          proxy.$modal.msgSuccess(i18n.global.t("system.SuccessfulModif"));
          open.value = false;
          getList();
        });
      } else {
        addPost(form.value).then((response) => {
          proxy.$modal.msgSuccess(i18n.global.t("system.addSuccessful"));
          open.value = false;
          getList();
        });
      }
    }
  });
}
/** 删除按钮操作 */
function handleDelete(row) {
  const postIds = row.postId || ids.value;
  proxy.$modal
    .confirm(i18n.global.t("system.tip68", { num: postIds }))

    .then(function () {
      return delPost(postIds);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess(i18n.global.t("system.successfuldele"));
    })
    .catch(() => {});
}
/** 导出按钮操作 */
function handleExport() {
  proxy.download(
    "system/post/export",
    {
      ...queryParams.value,
    },
    `post_${new Date().getTime()}.xlsx`
  );
}

getList();
</script>
