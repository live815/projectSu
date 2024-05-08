<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      v-show="showSearch"
      :inline="true"
      label-width="68px"
    >
      <el-form-item :label="$t('game.gameName')" prop="gamename">
        <el-input
          v-model="queryParams.gamename"
          :placeholder="$t('member.pleaseInput')"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('game.lobbyType')" prop="type">
        <el-select
          v-model="queryParams.type"
          :placeholder="$t('member.pleaseSelect')"
          clearable
          style="width: 240px"
        >
          <el-option
            v-for="dict in typeList"
            :key="dict.roleId"
            :label="dict.roleName"
            :value="dict.roleId"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('game.status')" prop="status">
        <el-select
          v-model="queryParams.status"
          :placeholder="$t('member.pleaseInput')"
          clearable
          style="width: 240px"
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
        <el-button type="primary" icon="Search" @click="handleQuery"
          >{{ $t('member.search') }}</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">{{ $t('member.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格数据 -->
    <el-table v-loading="loading" :data="roleList">
      <el-table-column :label="$t('game.gameName')" prop="gamename" align="center" />

      <el-table-column
        label="类型"
        prop="gametype"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column label="图片" prop="img" align="center" />
      <el-table-column label="线路" prop="linenum" align="center" />
      <el-table-column label="状态" align="center" prop="status">
        <template #default="scope">
          <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column
        label="新建时间"
        align="center"
        prop="createTime"
        width="180"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="updatetime"
        width="180"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.updatetime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <div>
            <template v-if="Number(scope.row.status) === 1">
              <el-button type="success">启用</el-button>
            </template>
            <template v-if="Number(scope.row.status) === 0">
              <el-button type="warning">禁用</el-button>
            </template>
            <el-button
              type="primary"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['system:role:edit']"
              >编辑</el-button
            >
          </div>
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
  </div>
</template>

<script setup>
import useQueryConditionList from "../arena/hooks/useQueryConditionList";

const { proxy } = getCurrentInstance();
const { sys_normal_disable } = proxy.useDict("sys_normal_disable");
const showSearch = ref(true);
// const loading = ref(true);
const roleList = ref([
  {
    gamename: "美人捕",
    gametype: "电动老虎机",
    linenum: 5000,
    status: "0",
    createTime: "2023-07-08 17:01:53",
    updatetime: "2023-07-08 17:01:53",
  },
  {
    gamename: "雷霆战警",
    gametype: "经典老虎机",
    linenum: "-",
    status: "1",
    createTime: "2023-07-08 17:01:53",
    updatetime: "2023-07-08 17:01:53",
  },
]);
const total = ref(0);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    gamename: undefined,
    type: undefined,
    status: undefined,
  },
  rules: {
    gamename: [
      { required: true, message: "游戏名称不能为空", trigger: "blur" },
    ],
  },
});
const { queryParams, form, rules } = toRefs(data);
const { typeList } = useQueryConditionList();

/** 查询角色列表 */
function getList() {
  // loading.value = true;
  // listRole(proxy.addDateRange(queryParams.value)).then((response) => {
  //   roleList.value = response.rows;
  //   total.value = response.total;
  //   loading.value = false;
  // });
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
</script>
