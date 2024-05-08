<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" label-width="">
      <el-form-item :label="$t('game.lobbyType1')" prop="id">
        <el-select
          v-model="queryParams.id"
          :placeholder="$t('member.pleaseSelect')"
          clearable
          style="width: 240px"
        >
          <el-option
            v-for="dict in lobbyTypeList"
            :key="dict.id"
            :label="dict.lobbyType"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('game.status1')" prop="status">
        <el-select
          v-model="queryParams.status"
          :placeholder="$t('member.pleaseSelect')"
          clearable
          style="width: 240px"
        >
          <el-option
            v-for="dict in statusList"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          icon="Search"
          @click="handleQuery"
          v-hasPermi="['game:layer1:typeList']"
          >{{ $t("member.search") }}</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">{{
          $t("member.reset")
        }}</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格数据 -->
    <el-table :data="tableList" :empty-text="$t('member.noData')">
      <el-table-column
        :label="$t('game.sort')"
        prop="sort"
        :show-overflow-tooltip="true"
        align="center"
      />

      <el-table-column
        :label="$t('game.lobbyType')"
        prop="lobbyType"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        :label="$t('game.appLobbyPic')"
        prop="appLobbyIconTab"
        :show-overflow-tooltip="true"
        width="168"
        align="center"
      >
        <template #default="scope">
          <div class="stadimgBox">
            <div v-if="!scope.row.appLobbyIconTab" style="text-align: center">
              {{ $t("game.noPictures") }}
            </div>
            <img
              :src="getImgUrl(scope.row.appLobbyIconTab)"
              :alt="$t('game.noPictures')"
              v-else
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('game.appLobbyTypePic')"
        prop="appLobbyIconName"
        :show-overflow-tooltip="true"
        width="168"
        align="center"
      >
        <template #default="scope">
          <div class="stadimgBox">
            <div v-if="!scope.row.appLobbyIconName" style="text-align: center">
              {{ $t("game.noPictures") }}
            </div>
            <img
              :src="getImgUrl(scope.row.appLobbyIconName)"
              :alt="$t('game.noPictures')"
              v-else
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('game.appLobbyIconBg')"
        prop="appLobbyIconBg"
        :show-overflow-tooltip="true"
        width="168"
        align="center"
      >
        <template #default="scope">
          <div class="stadimgBox">
            <div v-if="!scope.row.appLobbyIconBg" style="text-align: center">
              {{ $t("game.noPictures") }}
            </div>
            <img
              :src="getImgUrl(scope.row.appLobbyIconBg)"
              :alt="$t('game.noPictures')"
              v-else
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('game.pcLobbyBigImg')"
        prop="pcLobbyBigImg"
        :show-overflow-tooltip="true"
        width="168"
        align="center"
      >
        <template #default="scope">
          <div class="stadimgBox">
            <div v-if="!scope.row.pcLobbyBigImg" style="text-align: center">
              {{ $t("game.noPictures") }}
            </div>
            <img
              :src="getImgUrl(scope.row.pcLobbyBigImg)"
              :alt="$t('game.noPictures')"
              v-else
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('game.pcLobbySmallImg')"
        prop="pcLobbySmallImg"
        :show-overflow-tooltip="true"
        width="168"
        align="center"
      >
        <template #default="scope">
          <div class="stadimgBox">
            <div v-if="!scope.row.pcLobbySmallImg" style="text-align: center">
              {{ $t("game.noPictures") }}
            </div>
            <img
              :src="getImgUrl(scope.row.pcLobbySmallImg)"
              :alt="$t('game.noPictures')"
              v-else
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('game.pcLobbyIconTabList')"
        prop="pcLobbyIconTab"
        :show-overflow-tooltip="true"
        width="168"
        align="center"
      >
        <template #default="scope">
          <div class="stadimgBox">
            <div v-if="!scope.row.pcLobbyIconTab" style="text-align: center">
              {{ $t("game.noPictures") }}
            </div>
            <img
              :src="getImgUrl(scope.row.pcLobbyIconTab)"
              :alt="$t('game.noPictures')"
              v-else
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('game.updateBy')"
        prop="updater"
        :show-overflow-tooltip="true"
        width="150"
      />

      <el-table-column
        :label="$t('game.updateTime')"
        align="center"
        prop="updateTime"
        width="180"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('game.status')"
        align="center"
        prop="status"
        width="150"
      >
        <template #default="scope">
          <div :class="[scope.row.status === 0 ? 'start' : 'disable']">
            {{
              scope.row.status === 0 ? $t("game.strating") : $t("game.disabled")
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('game.lobbyName')"
        prop="counts"
        align="center"
      />

      <el-table-column :label="$t('member.handle')" align="center" width="260">
        <template #default="scope">
          <div>
            <el-button
              size="small"
              type="success"
              v-hasPermi="['game:layer1:typeUpdate']"
              v-if="scope.row.status === 1"
              @click="changeStatus(scope.row)"
              >{{ $t("game.start") }}</el-button
            >
            <el-button
              size="small"
              type="danger"
              v-hasPermi="['game:layer1:typeUpdate']"
              v-if="scope.row.status === 0"
              @click="changeStatus(scope.row)"
              >{{ $t("game.disable") }}</el-button
            >
            <el-button
              size="small"
              type="primary"
              v-hasPermi="['game:layer1:typeUpdate']"
              @click="editInfo(scope.row)"
              >{{ $t("member.edit") }}</el-button
            >
            <el-button
              size="small"
              type="primary"
              @click="handleUpdate(scope.row)"
              v-if="scope.row.hasSub === 1"
              >{{ $t("game.gameConfig") }}</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pager.current"
      v-model:limit="queryParams.pager.size"
    />
    <EditDialogFirst
      v-model:open="open"
      :row="form"
      v-if="open"
      @onrefresh="getList"
    />
  </div>
</template>
<script setup name="Entertcity">
import i18n from "@/i18n";
import useQueryConditionList from "../arena/hooks/useQueryConditionList";
import { listLobbyType, listLobby, updateStatus } from "@/api/game/entertcity";
import { useRouter } from "vue-router";
import { getImgUrl } from "@/utils";
import EditDialogFirst from "./EditDialogFirst.vue";
import { onMounted } from "vue";

const { proxy } = getCurrentInstance();
const router = useRouter();
const total = ref(0);
// const loading = ref(true);
const isFirstLoad = ref(true);
const tableList = ref([]);
const form = ref({});
const open = ref(false);

const statusList = ref([
  {
    label: i18n.global.t("game.strating"),
    value: 0,
  },
  {
    label: i18n.global.t("game.disabled"),
    value: 1,
  },
]);
const queryParams = ref({
  id: null,
  status: null,
  pager: {
    current: 1,
    size: 10,
  },
});
const lobbyTypeList = ref([]);

//查询场馆类型列表
const getLobbyTypeList = () => {
  return listLobbyType({
    pager: { current: 1, size: 30 },
    status: 0,
  }).then((res) => {
    // console.log('listLobbyType',res)
    lobbyTypeList.value = res.records || [];
    total.value = res.total || 0;
  });
};

onMounted(async()=>{
  if(isFirstLoad.value){
    await getList();
    await getLobbyTypeList();
    isFirstLoad.value = false
  }
})
/** 查询角色列表 */
function getList() {
  return listLobbyType(queryParams.value).then((res) => {
    tableList.value = res.records || [];
    total.value = res.total||0;
  });
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
function handleUpdate(row) {
  router.push({
    path: "/game/electric-child/config-electronic",
    query: { id: row.id },
  });
}

const changeStatus = (row) => {
  updateStatus({
    id: row.id,
    status: row.status === 0 ? 1 : 0,
  }).then((res) => {
    proxy.$modal.msgSuccess(i18n.global.t("member.operateSuccessfully"));
    getList();
  });
};
const editInfo = (row) => {
  form.value = JSON.parse(JSON.stringify(row));
  open.value = true;
};
onActivated(async()=>{
  if(!isFirstLoad.value){
    await getList();
  }
})
</script>
<style lang="scss" scoped>
.stadimgBox {
  img {
    width: 80px;
    height: 80px;
  }
}
.start {
  width: 80px;
  height: 20px;
  border: 1px solid rgba(82, 196, 26, 0.5);
  text-align: center;
  margin: 0 auto;
  line-height: 20px;
  color: rgba(82, 196, 26, 0.5);
}
.disable {
  width: 80px;
  height: 20px;
  border: 1px solid rgba(235, 143, 145, 0.5);
  text-align: center;
  margin: 0 auto;
  line-height: 20px;
  color: rgba(235, 143, 145, 0.5);
}
</style>
