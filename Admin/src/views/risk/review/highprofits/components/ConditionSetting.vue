<template>
  <div class="condition-setting" v-loading="loading">
    <el-row>
      <el-col style="text-align:right">
        <el-button v-if="!isEdit" type="danger" @click="isEdit=!isEdit">{{ $t('risk.edit') }}</el-button>
        <el-button v-if="isEdit" @click="isEdit=!isEdit">{{ $t('risk.cancel') }}</el-button>
        <el-button v-if="isEdit" type="primary" @click="submit">{{ $t('risk.save') }}</el-button>
      </el-col>
    </el-row>
    <div class="member-profits">
      <CommonTitle :title="$t('risk.highMemberProfits')" isBold="true" />
      <el-row :gutter="24" class="mt-20 mb-20">
        <el-col :span="8" v-for="member in memberList">
          <el-input v-model="member.rankCount" clearable :placeholder="$t('risk.pleaseInput')" :disabled="!isEdit">
            <template #prepend>
              <span>{{ titleLabel }}</span>
            </template>
            <template #append>
              {{ rank }}
            </template>
          </el-input>
        </el-col>
        <el-col :span="8"></el-col>
      </el-row>
    </div>
    <div class="game-profits">
      <CommonTitle :title="$t('risk.highGameProfits')" isBold="true" />
      <el-row :gutter="24" class="mt-20 mb-20">
        <el-col :span="8" class="mb-20" v-for="game in gameList">
          <el-col class="mb-12 font-14">
            {{ game.lobbyName }}
          </el-col>
          <el-col>
            <el-input v-model="game.rankCount" clearable :placeholder="$t('risk.pleaseInput')" :disabled="!isEdit">
              <template #prepend>
                <span>{{ titleLabel }}</span>
              </template>
              <template #append>
                {{ rank }}
              </template>
            </el-input>
          </el-col>
        </el-col>
      </el-row>
    </div>
    <div class="game-profits">
      <CommonTitle :title="$t('risk.highLobbyProfits')" isBold="true" />
      <el-row :gutter="24" class="mt-20 mb-20">
        <el-col class="font-14 ml-12 mb-20" v-if="sportList && sportList.length">{{ sportTitle }}</el-col>
        <el-col :span="8" class="mb-20" v-for="sport in sportList">
          <el-col class="mb-12 font-14">
            {{ sport.lobbyName }}
          </el-col>
          <el-col>
            <el-input v-model="sport.rankCount" clearable :placeholder="$t('risk.pleaseInput')" :disabled="!isEdit">
              <template #prepend>
                <span>{{ titleLabel }}</span>
              </template>
              <template #append>
                {{ rank }}
              </template>
            </el-input>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="mt-20 mb-20">
        <el-col class="font-14 ml-12 mb-20" v-if="realList && realList.length">{{ realTitle }}</el-col>
        <el-col :span="8" class="mb-20" v-for="real in realList">
          <el-col class="mb-12 font-14">
            {{ real.lobbyName }}
          </el-col>
          <el-col>
            <el-input v-model="real.rankCount" clearable :placeholder="$t('risk.pleaseInput')" :disabled="!isEdit">
              <template #prepend>
                <span>{{ titleLabel }}</span>
              </template>
              <template #append>
                {{ rank }}
              </template>
            </el-input>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="mt-20 mb-20">
        <el-col class="font-14 ml-12 mb-20"  v-if="cardList && cardList.length">{{ cardTitle }}</el-col>
        <el-col :span="8" class="mb-20" v-for="card in cardList">
          <el-col class="mb-12 font-14">
            {{ card.lobbyName }}
          </el-col>
          <el-col>
            <el-input v-model="card.rankCount" clearable :placeholder="$t('risk.pleaseInput')" :disabled="!isEdit">
              <template #prepend>
                <span>{{ titleLabel }}</span>
              </template>
              <template #append>
                {{ rank }}
              </template>
            </el-input>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="mt-20 mb-20">
        <el-col class="font-14 ml-12 mb-20"  v-if="electricList && electricList.length">{{ electricTitle }}</el-col>
        <el-col :span="8" class="mb-20" v-for="electric in electricList">
          <el-col class="mb-12 font-14">
            {{ electric.lobbyName }}
          </el-col>
          <el-col>
            <el-input v-model="electric.rankCount" clearable :placeholder="$t('risk.pleaseInput')" :disabled="!isEdit">
              <template #prepend>
                <span>{{ titleLabel }}</span>
              </template>
              <template #append>
                {{ rank }}
              </template>
            </el-input>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="mt-20 mb-20">
        <el-col class="font-14 ml-12 mb-20"  v-if="lotteryList && lotteryList.length">{{ lotteryTitle }}</el-col>
        <el-col :span="8" class="mb-20" v-for="lottery in lotteryList">
          <el-col class="mb-12 font-14">
            {{ lottery.lobbyName }}
          </el-col>
          <el-col>
            <el-input v-model="lottery.rankCount" clearable :placeholder="$t('risk.pleaseInput')" :disabled="!isEdit">
              <template #prepend>
                <span>{{ titleLabel }}</span>
              </template>
              <template #append>
                {{ rank }}
              </template>
            </el-input>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="mt-20 mb-20">
        <el-col class="font-14 ml-12 mb-20" v-if="competionList && competionList.length">{{ competionTitle }}</el-col>
        <el-col :span="8" class="mb-20" v-for="competion in competionList">
          <el-col class="mb-12 font-14">
            {{ competion.lobbyName }}
          </el-col>
          <el-col>
            <el-input v-model="competion.rankCount" clearable :placeholder="$t('risk.pleaseInput')" :disabled="!isEdit">
              <template #prepend>
                <span>{{ titleLabel }}</span>
              </template>
              <template #append>
                {{ rank }}
              </template>
            </el-input>
          </el-col>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import CommonTitle from "./CommonTitle.vue";
import { getHighProfitStaticList,updateHighProfitStaticList } from "@/api/risk/review/index";
import i18n from "@/i18n";

const { proxy } = getCurrentInstance();
const titleLabel = ref(i18n.global.t("risk.todayPlayerRank"));
const rank = ref(i18n.global.t("risk.rank"));
const sportTitle = ref(i18n.global.t("risk.sport"));
const realTitle = ref(i18n.global.t("risk.real"));
const cardTitle = ref(i18n.global.t("risk.card"));
const electricTitle = ref(i18n.global.t("risk.electric"));
const lotteryTitle = ref(i18n.global.t("risk.lottery"));
const competionTitle = ref(i18n.global.t("risk.competion"));
const isEdit = ref(false); 
const memberList = ref([]); // 高额会员盈利
const gameList = ref([]); // 高额游戏盈利
const sportList = ref([]); // 高额场馆盈利-体育
const realList = ref([]); // 高额场馆盈利-真人
const cardList = ref([]); // 高额场馆盈利-棋牌
const electricList = ref([]); // 高额场馆盈利-电子
const lotteryList = ref([]); // 高额场馆盈利-彩票
const competionList = ref([]); // 高额场馆盈利-彩票
const loading = ref(false);


onMounted(async()=>{
  getList();
})
function getList(){
  loading.value = true
  return getHighProfitStaticList().then(res=>{
    memberList.value = res ? res.filter(item=>item.parentId === 0):[]
    gameList.value = res ? res.filter(item=>item.parentId === 1):[]
    sportList.value = res ? res.filter(item=>item.parentId === 1001101 ):[]
    realList.value = res ? res.filter(item=>item.parentId === 1001102 ):[]
    cardList.value = res ? res.filter(item=>item.parentId === 1001103 ):[]
    electricList.value = res ? res.filter(item=>item.parentId === 1001104 ):[]
    lotteryList.value = res ? res.filter(item=>item.parentId === 1001105 ):[]
    competionList.value = res ? res.filter(item=>item.parentId === 1001106 ):[]
    loading.value = false
  }).catch(_=>{
    loading.value = false
  })
}
function submit(){
  const params = [...memberList.value,...gameList.value,
  ...sportList.value,...realList.value,...cardList.value,
  ...electricList.value,...lotteryList.value,...competionList.value]
  updateHighProfitStaticList(params).then(res=>{
    proxy.$modal.msgSuccess(i18n.global.t("risk.saveSuccessfully"));
    isEdit.value = false;
    getList();
  })
}
</script>

<style lang="scss" scoped>
.condition-setting {
}
</style>
