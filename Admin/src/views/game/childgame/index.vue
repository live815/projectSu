<!-- 娱乐城电子游戏页面 -->
<template>
  <div class="app-container child-game" v-loading="loading">
    <el-form :model="queryParams" ref="queryRef" :inline="true" label-width="68px">
      <el-form-item :label="$t('game.lobbyName')" prop="lobbyName">
        <el-input
          v-model="queryParams.lobbyName"
          :placeholder="$t('member.pleaseInput')"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="场馆类型" prop="type">
        <el-select
          v-model="queryParams.lobbyType"
          placeholder="请选择"
          clearable
          style="width: 240px"
        >
          <el-option
            v-for="item in lobbyTypeList"
            :key="item.id"
            :label="item.lobbyType"
            :value="item.id"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item :label="$t('game.status')" prop="status">
        <el-select
          v-model="queryParams.status"
          :placeholder="$t('member.pleaseSelect')"
          clearable
          style="width: 240px"
        >
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="Search"
          @click="handleQuery"
          v-hasPermi="['game:layer2:list']"
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
        width="80px"
      />
      <el-table-column
        :label="$t('game.lobbyName')"
        prop="lobbyName"
        align="center"
        :show-overflow-tooltip="true"
        width="160px"
      />

      <el-table-column
        :label="$t('game.appGameUnclickPicture')"
        prop="appLobbyIconDark"
        :show-overflow-tooltip="true"
        width="168"
        align="center"
      >
        <template #default="scope">
          <div class="stadimgBox">
            <div v-if="!scope.row.appLobbyIconDark" style="text-align: center">
              {{ $t('game.noPictures') }}
            </div>
            <img :src="getImgUrl(scope.row.appLobbyIconDark)" :alt="$t('game.noPictures')" v-else />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('game.appGameClickPicture')"
        prop="appLobbyIconLight"
        :show-overflow-tooltip="true"
        width="168"
        align="center"
      >
        <template #default="scope">
          <div class="stadimgBox">
            <div v-if="!scope.row.appLobbyIconLight" style="text-align: center">
              {{ $t('game.noPictures') }}
            </div>
            <img
              :src="getImgUrl(scope.row.appLobbyIconLight)"
              :alt="$t('game.noPictures')"
              v-else
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('game.appLobbyIconBigcover')"
        prop="appLobbyIconBigcover"
        :show-overflow-tooltip="true"
        align="center"
        width="130"
      >
        <template #default="scope">
          <div class="stadimgBox">
            <div v-if="!scope.row.appLobbyIconBigcover" style="text-align: center">
              {{ $t('game.noPictures') }}
            </div>
            <img
              :src="getImgUrl(scope.row.appLobbyIconBigcover)"
              :alt="$t('game.noPictures')"
              v-else
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('game.pcFrontCoverImg')"
        prop="pcFrontCoverImg"
        :show-overflow-tooltip="true"
        align="center"
        width="168"
      >
        <template #default="scope">
          <div class="stadimgBox">
            <img :src="getImgUrl(scope.row.pcFrontCoverImg)" :alt="$t('game.noPictures')" />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('game.pcLobbyIconTab')"
        prop="pcLobbyIconTab"
        :show-overflow-tooltip="true"
        align="center"
        width="200"
      >
        <template #default="scope">
          <div class="stadimgBox">
            <img :src="getImgUrl(scope.row.pcLobbyIconTab)" :alt="$t('game.noPictures')" />
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('game.appHotImg')" width="150">
        <template #default="scope">
          <div class="stadimgBox">
            <img :src="getImgUrl(scope.row.appHotIconModule)" :alt="$t('game.noPictures')" />
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('game.isHotGame')" width="120">
        <template #default="scope">
         <span>{{ scope.row.isHotGame ? $t('funds.no') : $t('funds.yes') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('game.pcGameDesc')"
        prop="pcGameDesc"
        :show-overflow-tooltip="true"
        align="center"
        width="200"
      />

      <el-table-column
        :label="$t('game.promotionLabel')"
        :show-overflow-tooltip="true"
        align="center"
        width="160px"
      >
        <template #default="scope">
          <div class="stadimgBox">
            {{ sys_game_label_type.find((item) => item.value == scope.row.promotionLabel)?.label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('game.promotionGuideText')"
        prop="promotionGuideText"
        :show-overflow-tooltip="true"
        align="center"
        width="150"
      />
      <el-table-column
        :label="$t('game.updateBy')"
        align="center"
        prop="updater"
        :show-overflow-tooltip="true"
        width="90"
      />
      <el-table-column :label="$t('game.updateTime')" align="center" prop="updateTime" width="180">
        <template #default="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('game.lobbyChildGame')"
        align="center"
        prop="counts"
        width="90"
        v-if="isEletric"
      >
        <template #default="{ row }">
          <span>{{ row.counts ? row.counts : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('game.status')" align="center" prop="status">
        <template #default="scope">
          <div :class="[scope.row.status === 0 ? 'start' : 'disable']">
            {{ scope.row.status === 0 ? $t('game.strating') : $t('game.disabled') }}
          </div>
        </template>
      </el-table-column>

      <el-table-column :label="$t('member.handle')" align="center" width="260px">
        <template #default="scope">
          <div>
            <el-button
              size="small"
              type="success"
              v-hasPermi="['game:layer2:updateStatus']"
              v-if="scope.row.status === 1"
              @click="changeStatus(scope.row)"
              >{{ $t('game.start') }}</el-button
            >
            <el-button
              size="small"
              type="danger"
              v-hasPermi="['game:layer2:updateStatus']"
              v-if="scope.row.status === 0"
              @click="changeStatus(scope.row)"
              >{{ $t('game.disable') }}</el-button
            >
            <el-button
              size="small"
              type="primary"
              v-hasPermi="['game:layer2:subGameUpdate']"
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
    <ElectronicChildDialog v-model:open="open" :row="form" v-if="open" @onrefresh="getList" />
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
import { getChildLit, updateStatus } from '@/api/game/childgame'
import { useRoute, useRouter } from 'vue-router'
import ElectronicChildDialog from './ElectronicChildDialog.vue'
import { getImgUrl } from '@/utils'
const { proxy } = getCurrentInstance()
const { sys_game_label_type } = proxy.useDict('sys_game_label_type')

const router = useRouter()
const route = useRoute()
const total = ref(0)
const loading = ref(false)
const gameList = ref([])
const form = ref({})
const open = ref(false)
const queryParams = ref({
  lobbyName: null,
  lobbyType: null,
  status: null,
  parentId: route.query.id,
  pager: {
    current: 1,
    size: 10
  }
})
const statusList = ref([
  {
    label: '开启中',
    value: 0
  },
  {
    label: '已禁用',
    value: 1
  }
])

//查询场馆类型列表
// const getLobbyTypeList = ()=>{
//   listLobbyType({
//     pager:{current:1,size:30},
//     status:0
//   }).then(res=>{
//     // console.log('listLobbyType',res)
//     lobbyTypeList.value = res.records
//   })
// }
// getLobbyTypeList()
/** 查询子游戏列表 */
function getList() {
  loading.value = true
  getChildLit(queryParams.value)
    .then((res) => {
      gameList.value = res.records
      total.value = res.total
    })
    .finally(() => {
      loading.value = false
    })
}
getList()

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pager.current = 1
  getList()
}
/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm('queryRef')
  handleQuery()
}
//返回上级菜单
const goBack = () => {
  router.back()
}

//状态开启和禁用
const changeStatus = (row) => {
  updateStatus({
    id: row.id,
    status: row.status === 0 ? 1 : 0
  }).then((res) => {
    proxy.$modal.msgSuccess('状态更改成功')
    getList()
  })
}
//编辑游戏内容
const editInfo = (row) => {
  form.value = JSON.parse(JSON.stringify(row))
  open.value = true
}
//游戏配置
const gameConfig = (row) => {
  router.push({ path: '/game/electronic', query: { id: row.id || 2 } })
}

const isEletric = computed(() => {
  return route.query.id == 1001104
})
</script>
<style lang="scss" scoped>
.child-game {
  .stadimgBox {
    img {
      width: 80px;
      height: 80px;
    }
  }
  .start {
    width: 60px;
    height: 20px;
    border: 1px solid rgba(82, 196, 26, 0.5);
    text-align: center;
    margin: 0 auto;
    line-height: 20px;
    color: rgba(82, 196, 26, 0.5);
  }
  .disable {
    width: 60px;
    height: 20px;
    border: 1px solid rgba(235, 143, 145, 0.5);
    text-align: center;
    margin: 0 auto;
    line-height: 20px;
    color: rgba(235, 143, 145, 0.5);
  }
}
</style>
