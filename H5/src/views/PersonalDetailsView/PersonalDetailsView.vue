<template>
  <div class="personalDetails-center">
    <NavBar :title="$t('Pletter.personalinformat')" />
    <div class="personalDetails-content-top" @click="onClickActivePopup">
      <div class="heads">
        <img
          v-if="user.userInfo.avatar && avatarList[user.userInfo.avatar]"
          class="headImg"
          :src="avatarList[user.userInfo.avatar].img"
        />
        <img v-else :src="avatar" class="headImg" />
      </div>
    </div>
    <div class="personalDetails-content-title" @click.stop="router.push('/editNickname')">
      <span>{{ user.userInfo.nickName || $t('Pletter.Nosetnickname') }}</span>
      <span class="span"><van-icon name="edit" size="21" /></span>
    </div>
    <div class="personalDetails-content-min">
      <div class="personalDetails-content-min-item">
        <div class="personalDetails-content-min-item-title">{{ $t('Pletter.account') }}</div>
        <div class="personalDetails-content-min-item-input">
          <CustomInputBorder :disabled="true" v-model="userInfo.userName" />
        </div>
      </div>
      <div class="personalDetails-content-min-item">
        <div class="personalDetails-content-min-item-title">{{ $t('Pletter.Registrattime') }}</div>
        <div class="personalDetails-content-min-item-input">
          <CustomInputBorder :disabled="true" v-model="userInfo.regTime" />
        </div>
      </div>
      <div class="personalDetails-content-min-item">
        <div class="personalDetails-content-min-item-title">{{ $t('Pletter.Registratarea') }}</div>
        <div class="personalDetails-content-min-item-input">
          <CustomInputBorder :disabled="true" v-model="userInfo.regNation" />
        </div>
        <div class="personalDetails-content-min-item-text">
          {{ $t('Pletter.Plettertip11') }}
        </div>
      </div>

      <div class="personalDetails-content-min-item">
        <div class="personalDetails-content-min-item-title">{{ $t('Pletter.gender') }}</div>
        <div class="personalDetails-content-min-item-input" v-if="onComputedGender">
          <CustomInputBorder :disabled="true" v-model="onComputedGender" />
        </div>
        <div class="personalDetails-content-min-item-input" v-else>
          <van-field
            class="border-cell"
            is-link
            readonly
            :disabled="true"
            name="picker"
            :placeholder="$t('Pletter.Plettertip13')"
            @click="showPickerGender = true"
          />
          <van-popup v-model:show="showPickerGender" position="bottom">
            <van-picker
              :columns="columns"
              :title="genderPickerTitle"
              @confirm="onConfirmGender"
              @cancel="showPickerGender = false"
            />
          </van-popup>
        </div>
      </div>
      <div class="personalDetails-content-min-item">
        <div class="personalDetails-content-min-item-title">{{ $t('Pletter.birthday') }}</div>
        <div class="personalDetails-content-min-item-input" v-if="userInfo.birthday">
          <CustomInputBorder :disabled="true" v-model="userInfo.birthday" />
        </div>
        <div class="personalDetails-content-min-item-input" v-else>
          <van-field
            class="border-cell"
            is-link
            readonly
            :disabled="true"
            name="datePicker"
            :placeholder="$t('Pletter.Plettertip12')"
            @click="showPickerBirthday = true"
          />
          <van-popup v-model:show="showPickerBirthday" position="bottom">
            <van-date-picker
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="onConfirmBirthday"
              :title="birthdayPickerTitle"
              @cancel="showPickerBirthday = false"
            />
          </van-popup>
        </div>
      </div>
    </div>
    <AvatarPopup ref="avatarPopupDom"></AvatarPopup>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { useRouter } from 'vue-router'
import AvatarPopup from './components/AvatarPopup/AvatarPopup.vue'
import { getUpdatebBirthday, getUpdateSex } from '@/api/bindInfo'
import { showToast } from 'vant'
import avatar from '@/assets/img/headImg/avatar0.png'
import i18n from '@/i18n'
const router = useRouter()

const user = useUserStore()
// 头像地址
const avatarList = reactive([
  {
    id: 1,
    img: new URL('@/assets/img/headImg/avatar0.png', import.meta.url).href
  },
  {
    id: 2,
    img: new URL('@/assets/img/headImg/avatar1.png', import.meta.url).href
  },
  {
    id: 3,
    img: new URL('@/assets/img/headImg/avatar2.png', import.meta.url).href
  },
  {
    id: 4,
    img: new URL('@/assets/img/headImg/avatar3.png', import.meta.url).href
  },
  {
    id: 5,
    img: new URL('@/assets/img/headImg/avatar4.png', import.meta.url).href
  },
  {
    id: 6,
    img: new URL('@/assets/img/headImg/avatar5.png', import.meta.url).href
  },
  {
    id: 7,
    img: new URL('@/assets/img/headImg/avatar6.png', import.meta.url).href
  },
  {
    id: 8,
    img: new URL('@/assets/img/headImg/avatar7.png', import.meta.url).href
  },
  {
    id: 9,
    img: new URL('@/assets/img/headImg/avatar8.png', import.meta.url).href
  },
  {
    id: 10,
    img: new URL('@/assets/img/headImg/avatar9.png', import.meta.url).href
  }
])

const avatarPopupDom = ref(null)

// 打开头像弹窗
const onClickActivePopup = () => {
  avatarPopupDom.value.showhide()
}

const onComputedGender = computed(() => {
  if (user.userInfo.sex == '0') {
    return i18n.global.t('Pletter.man')
  } else if (user.userInfo.sex == '1') {
    return i18n.global.t('Pletter.woman')
  } else {
    return ''
  }
})
// 个人信息
const userInfo = reactive({
  userName: computed(() => user.userInfo.userName ?? ''),
  regNation: computed(() => user.userInfo.regNation ?? ''),
  regTime: computed(() => user.userInfo.regTime ?? ''),
  birthday: computed(() => user.userInfo.birthday ?? '')
})

// 选择性别模块
const showPickerGender = ref(false)
const genderPickerTitle = i18n.global.t('Pletter.Plettertip14')
const columns = [
  { text: i18n.global.t('Pletter.man'), value: '0' },
  { text: i18n.global.t('Pletter.woman'), value: '1' }
]

// 确定按钮性别
const onConfirmGender = ({ selectedOptions }) => {
  const params = {
    sex: selectedOptions[0]?.value
  }
  getUpdateSex(params).then(() => {
    user.getUserInfoAction()
  })
  showPickerGender.value = false
}

// 生日模块
const showPickerBirthday = ref(false)
const birthdayPickerTitle = i18n.global.t('Pletter.Plettertip15')
// 获取当前时间
const currentDate = new Date()
// 设置最小日期为当前时间
const minDate = new Date(1920, 0, 1)

// 设置最大日期为当前时间
const maxDate = ref(currentDate)

// 确定按钮生日
const onConfirmBirthday = ({ selectedOptions }) => {
  const formattedDate = selectedOptions.map((item) => item.value).join('-')

  const selectedDate = new Date(formattedDate)
  const currentDate = new Date()
  // 计算年龄差
  const ageDifference = currentDate.getFullYear() - selectedDate.getFullYear()

  // 判断年龄是否大于等于18岁
  const isOver18 = ageDifference >= 18
  if (isOver18) {
    // 大于等于18岁的逻辑处理
    const params = {
      birthday: formattedDate
    }
    getUpdatebBirthday(params).then(() => {
      user.getUserInfoAction()
    })
    showPickerBirthday.value = false
  } else {
    // 小于18岁的逻辑处理
    showToast(i18n.global.t('Pletter.Plettertip16'))
    showPickerBirthday.value = false
  }
}
</script>
<style lang="scss" scoped>
.personalDetails-center {
  background: #fff;

  overflow: hidden;
  .personalDetails-content-top {
    color: #111;
    font-size: 14px;
    width: 80px;
    height: 80px;
    border-radius: 80px;
    margin: 23px auto 0;
    border: 1px solid #ccc;
    overflow: hidden;
    .heads {
      width: 100%;
      height: 100%;
    }
    .headImg {
      width: 80px;
      height: 80px;
      text-align: center;
      line-height: 80px;
    }
  }
  .personalDetails-content-title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0 20px 0;
    .span {
      margin-left: 5px;
    }
  }
  .personalDetails-content-min {
    width: 325px;
    margin: 0 auto;
    .personalDetails-content-min-item {
      color: #111;
      font-size: 15px;
      margin-bottom: 20px;
      .personalDetails-content-min-item-title {
        font-weight: 600;
        margin-bottom: 7px;
      }
      .personalDetails-content-min-item-input {
        width: 325px;
        height: 50px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0);
        color: #111;
        font-weight: 500;
        .border-cell {
          display: flex;
          align-items: center;
          height: 100%;
          border-radius: 8px;
          border: 1px solid #eee;
          background: rgba(255, 255, 255, 0);

          font-size: 15px;
        }
      }
      .personalDetails-content-min-item-text {
        color: #666;
        font-size: 12px;
        font-weight: 400;
        margin: 10px 0 0 13px;
      }
    }
  }
}
</style>
