<template>
  <el-form :model="queryParams" ref="ruleFormRef" :rules="rules" label-width="130px">
    <el-form-item :label="$t('newbie.form.label27')" prop="activitySwitch">
      <el-switch
        v-model="queryParams.activitySwitch"
        :active-value="1"
        :inactive-value="0"
        class="drawer-switch"
      />
    </el-form-item>
    <el-form-item :label="$t('newbie.form.label28')" prop="limitDays">
      <el-input
        v-model="queryParams.limitDays"
        :placeholder="$t('newbie.form.placeholder1')"
        show-word-limit
        type="number"
        style="width: 440px"
        min="0"
        :disabled="queryParams.id"
      />
      <span style="color: red; margin-left: 10px">
        {{ $t('newbie.form.label38') }}
      </span>
    </el-form-item>
    <el-form-item :label="$t('newbie.form.label32')" prop="achievedDays">
      <el-input
        v-model="queryParams.achievedDays"
        :placeholder="$t('newbie.form.placeholder1')"
        show-word-limit
        type="number"
        style="width: 440px"
        min="0"
        :disabled="queryParams.id"
      />
      <span style="color: red; margin-left: 10px">
        {{ $t('newbie.form.label38') }}
      </span>
    </el-form-item>
    <el-form-item :label="$t('newbie.form.label33')" prop="taskRequire">
      <el-select
        v-model="queryParams.taskRequire"
        class="m-2"
        :placeholder="$t('newbie.form.placeholder2')"
        style="width: 440px"
        :disabled="queryParams.id"
      >
        <el-option :key="1" :label="$t('newbie.form.label16')" :value="1" />
      </el-select>
      <span style="color: red; margin-left: 10px">
        {{ $t('newbie.form.label38') }}
      </span>
    </el-form-item>
    <el-form-item :label="$t('newbie.form.label29')" prop="gifts">
      <RewardContentList :list="queryParams.gifts" />
    </el-form-item>
    <el-form-item :label="$t('newbie.form.label34')" prop="playGame">
      <PlayTheGame :gameTypeList="gameTypeList" :disabled="Boolean(queryParams.id)"></PlayTheGame>
    </el-form-item>
    <el-form-item :label="$t('newbie.form.label30')" prop="pictureList">
      <TopImage :queryParams="queryParams" />
    </el-form-item>
    <el-form-item :label="$t('newbie.form.label31')" prop="activityDesc" required>
      <el-input
        v-model="queryParams.activityDesc"
        :rows="8"
        type="textarea"
        style="width: 440px"
        @input="inputTextarea"
      />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import RewardContentList from './NewbieRewardContentListType2.vue'
import TopImage from './NewbieParametersImage.vue'
import PlayTheGame from '../PlayTheGame.vue'
import { palyInGameNameApi } from '@/api/operation/activeConfiguration'
import i18n from '@/i18n'

const props = defineProps(['queryParams'])

// 获取参与游戏列表
const gameTypeList = ref([])
const getPlayInGameList = async () => {
  let res = await palyInGameNameApi()
  let subGameList = res[0]
  subGameList.forEach((item) => {
    item.checked = false
    for (let key in res) {
      if (item.id == key) {
        item.lobbyList = res[key].map((item) => {
          const { parentId, ...rest } = item
          return { ...rest, check: false }
        })
      }
    }
  })
  gameTypeList.value = subGameList
}

watch(
  () => JSON.stringify(gameTypeList.value),
  (val) => {
    props.queryParams.venueList = []
    gameTypeList.value.forEach((item) => {
      let temp = { lobbyCode: '', lobbyList: [] }
      if (item.checked) {
        temp.lobbyCode = item.lobbyCode
        item.lobbyList.forEach((subItem) => {
          if (subItem.check) {
            let subTemp = {
              lobbyCode: subItem.lobbyCode,
              lobbyName: subItem.lobbyName
            }
            temp.lobbyList.push(subTemp)
          }
        })
        props.queryParams.venueList.push(temp)
      }
    })
  }
)

watch([() => props.queryParams.venueList.length, () => gameTypeList.value.length], async () => {
  gameTypeList.value.forEach((gameType) => {
    const matchingCallBackType = props.queryParams.venueList.find(
      (callBackType) => gameType.lobbyCode === callBackType.lobbyCode
    )

    if (matchingCallBackType) {
      gameType.checked = true
      gameType.lobbyList.forEach((subGameType) => {
        const matchingCallBackSubType = matchingCallBackType.lobbyList.find(
          (callBackSubType) => subGameType.lobbyCode === callBackSubType.lobbyCode
        )
        if (matchingCallBackSubType) {
          subGameType.check = true
        }
      })
    }
  })
})

const rules = {
  activityDesc: [
    {
      required: true,
      message: i18n.global.t('newbie.form.message14'),
      trigger: 'blur'
    }
  ],
  limitDays: [
    {
      required: true,
      message: i18n.global.t('newbie.form.message15'),
      trigger: 'blur'
    }
  ],
  achievedDays: [
    {
      required: true,
      message: i18n.global.t('newbie.form.message16'),
      trigger: 'blur'
    }
  ],
  gifts: [
    {
      required: true,
      trigger: 'blur'
    }
  ],
  pictureList: [
    {
      required: true,
      trigger: 'blur'
    }
  ]
}

onMounted(async () => {
  await getPlayInGameList()
})
</script>
