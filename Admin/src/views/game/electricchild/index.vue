<!-- 电子子游戏 -->
<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      label-width="68px"
    >
      <el-form-item :label="$t('game.gameName')" prop="lobbyName">
        <el-input
          v-model="queryParams.lobbyName"
          :placeholder="$t('member.pleaseInput')"
          @keyup.enter="handleQuery"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('game.gameType')" prop="slotType">
        <el-select
          v-model="queryParams.slotType"
          :placeholder="$t('member.pleaseSelect')"
          clearable
          style="width: 240px"
        >
          <el-option
            v-for="item in gametype"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('game.gameLine')" prop="line">
        <el-select
          v-model="startLine"
          :placeholder="$t('member.pleaseSelect')"
          clearable
          style="width: 240px"
          @change="change(startLine)"
        >
          <el-option
            v-for="item in sys_game_line"
            :key="item.label"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('game.status')" prop="status">
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
          v-hasPermi="['game:layer3:slotList']"
          >{{ $t('member.search') }}</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">{{ $t('member.reset') }}</el-button>
        <el-button type="success" @click="goBack">{{ $t('game.goBackParentMenu') }}</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格数据 -->
    <el-table v-loading="loading" :data="gameList">
      <el-table-column
        :label="$t('game.sort')"
        prop="sort"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        :label="$t('game.gameName')"
        prop="lobbyName"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        :label="$t('game.gameType')"
        prop="slotType"
        :show-overflow-tooltip="true"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ slotTypeChange(row.slotType) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('game.appLobbyIconBigcover')"
        prop="appLobbySlotIcon"
        :show-overflow-tooltip="true"
        width="168"
        align="center"
      >
        <template #default="scope">
          <div class="stadimgBox">
            <div v-if="!scope.row.appLobbySlotIcon" style="text-align: center">
              {{ $t('game.noPictures') }}
            </div>
            <img
              :src="getImgUrl(scope.row.appLobbySlotIcon)"
              :alt="$t('game.noPictures')"
              v-else
            />
          </div>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('game.lineNum')"
        prop="line"
        :show-overflow-tooltip="true"
        align="center"
        width="150"
      >
      </el-table-column>

      <el-table-column :label="$t('game.status')" align="center" prop="status">
        <template #default="scope">
          <div :class="[scope.row.status === 0 ? 'start' : 'disable']">
            {{ scope.row.status === 0 ? $t('game.strating') : $t('game.disabled') }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('game.createTime')"
        align="center"
        prop="createTime"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        :label="$t('game.lastUpdateTime')"
        align="center"
        prop="updateTime"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('member.handle')" align="center" width="160px">
        <template #default="scope">
          <div>
            <el-button
              size="small"
              type="success"
              v-hasPermi="['game:layer3:slotSubGameUpdate']"
              v-if="scope.row.status === 1"
              @click="changeStatus(scope.row)"
              >{{ $t('game.start') }}</el-button
            >
            <el-button
              size="small"
              type="danger"
              v-hasPermi="['game:layer3:slotSubGameUpdate']"
              v-if="scope.row.status === 0"
              @click="changeStatus(scope.row)"
              >{{ $t('game.disable') }}</el-button
            >
            <el-button
              size="small"
              type="primary"
              v-hasPermi="['game:layer3:slotSubGameUpdate']"
              @click="editInfo(scope.row)"
              >{{ $t('member.edit') }}</el-button
            >
            <el-button
              size="small"
              type="primary"
              @click="gameConfig(scope.row)"
              v-if="scope.row.hasSub === 1"
              >{{ $t('game.gameConfig') }}</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <ThreeLevelDialog
      v-model:open="open"
      :row="form"
      v-if="open"
      @onrefresh="getList"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pager.current"
      v-model:limit="queryParams.pager.size"
      @pagination="getList"
    />
  </div>
</template>
<script setup name="">
import i18n from "@/i18n";
import { listLobbySlot, updateStatus } from "@/api/game/entertcity";
import { useRoute, useRouter } from "vue-router";
import ThreeLevelDialog from "./ThreeLevelDialog.vue";
import { getImgUrl } from "@/utils";
import { computed } from "vue";

const { proxy } = getCurrentInstance();
const { sys_game_line } = proxy.useDict("sys_game_line");
const route = useRoute();
const router = useRouter();

const total = ref(0);
const loading = ref(false);
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
const gametype = ref([
  {
    label: i18n.global.t("game.electicTiger"),
    value: 1,
  },
  {
    label: i18n.global.t("game.classicTiger"),
    value: 2,
  },
  {
    label: i18n.global.t("game.lottery"),
    value: 3,
  },
  {
    label: i18n.global.t("game.cardGame"),
    value: 4,
  },
  {
    label: i18n.global.t("game.streetGame"),
    value: 5,
  },
]);

const queryParams = ref({
  lobbyName: null,
  slotType: null,
  startLine: null,
  endLine: null,
  status: null,
  parentId: route.query.id,
  pager: {
    current: 1,
    size: 10,
  },
});

//表格数据
const gameList = ref([]);
const form = ref({});
const open = ref(false);
const startLine = ref();

/** 查询子游戏列表 */
function getList() {
  listLobbySlot(queryParams.value).then((res) => {
    // console.log(res, "查询");
    total.value = res.total;
    // gameList.value = res.records
    let list = res.records || [];
    list.forEach((game) => {
      // console.log(game.line,'game.line')
      game.lineType = getLineType(Number(game.line));
    });
    gameList.value = list;
    console.log(gameList.value, "222");
  });
}
getList();

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pager.current = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  queryParams.value.startLine = null;
  queryParams.value.endLine = null;
  startLine.value = null;
  proxy.resetForm("queryRef");
  handleQuery();
}
//返回上级菜单
const goBack = () => {
  router.back();
};
//三级游戏类型转换
const slotTypeChange = (val) => {
  switch (val) {
    case 1:
      return i18n.global.t("game.electicTiger");
    case 2:
      return i18n.global.t("game.classicTiger");
    case 3:
      return i18n.global.t("game.lottery");
    case 4:
      return i18n.global.t("game.cardGame");
    case 5:
      return i18n.global.t("game.streetGame");
    default:
      return i18n.global.t("game.noGame");
  }
};

const changeStatus = (row) => {
  updateStatus({
    id: row.id,
    status: row.status === 0 ? 1 : 0,
  }).then((res) => {
    console.log("sssss", res);
    proxy.$modal.msgSuccess(i18n.global.t("member.operateSuccess"));
    getList();
  });
};
const editInfo = (row) => {
  console.log("row", row);
  row.slotTypeName = slotTypeChange(row.slotType);
  form.value = JSON.parse(JSON.stringify(row));
  open.value = true;
};

const selectLine = ref("");
const change = (val) => {
  console.log(val);
  if (val == i18n.global.t("risk.all")) {
    queryParams.value.startLine = null;
    queryParams.value.endLine = null;
  } else if (val == "0-20") {
    queryParams.value.startLine = Number(-1);
    queryParams.value.endLine = Number(20);
  } else if (val == "21-50") {
    queryParams.value.startLine = Number(21);
    queryParams.value.endLine = Number(50);
  } else {
    queryParams.value.startLine = Number(51);
    queryParams.value.endLine = null;
  }

  selectLine.value = val;
};

// const filterGameLine = computed(() => {
//   //全部线路
//   if (!selectLine.value || selectLine.value == 0) {
//     return gameList.value;
//   }
//   return gameList.value.filter((game) => {
//     return game.lineType == Number(selectLine.value);
//   });
// });

function getLineType(line) {
  if (line >= 0 && line <= 20) {
    return 1;
  }
  if (line >= 21 && line <= 50) {
    return 2;
  }
  if (line >= 51 && line <= 100) {
    return 3;
  }
  if (line > 100) {
    return 4;
  }
}
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
