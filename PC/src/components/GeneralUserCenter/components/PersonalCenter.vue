<template>
  <div class="main-container personal" v-loading="loading">
    <div class="outter-box">
      <div class="left-col">
        <div class="personal-center">
          <div class="title">{{ $t('GeneralUserCenter.PersonalCenter') }}</div>
          <div class="input-container">
            <el-form
              class="input-form"
              :model="userInfo"
              label-width="150px"
              status-icon
              label-position="left"
            >
              <el-form-item
                :label="$t('GeneralUserCenter.NickName')"
                prop="nickNames"
                :rules="[
                  { min: 4, max: 10, message: $t('GeneralUserCenter.Notice_18'), trigger: 'blur' }
                ]"
              >
                <el-input
                  v-model.trim="userInfo.nickNames"
                  :placeholder="$t('GeneralUserCenter.EnterNickname')"
                />
                <span v-if="!!user.userInfo['nickNameStatus']" class="nike-name-status">{{
                  $t('friends.inReview')
                }}</span>
              </el-form-item>
              <el-form-item
                class="el-form-item-box"
                :label="$t('GeneralUserCenter.CountryOfRegistration')"
                prop="region"
              >
                <el-input v-model="user.userInfo.regNation" disabled />
                <div class="el-form-item-box-text">{{ $t('GeneralUserCenter.CountryTip') }}</div>
              </el-form-item>
              <!-- <div class="input-container-box">
                <div class="input-container-box-item">
                  <el-form-item :label="$t('GeneralUserCenter.Gender')">
                    <el-input
                      v-if="onComputedGender"
                      v-model="onComputedGender"
                      disabled
                    ></el-input>
                    <el-select
                      v-else
                      v-model="userInfo.sex"
                      :placeholder="$t('GeneralUserCenter.Notice_19')"
                    >
                      <el-option :label="$t('GeneralUserCenter.Male')" value="0"></el-option>
                      <el-option :label="$t('GeneralUserCenter.Female')" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="input-container-box-item labels">
                  <el-form-item :label="$t('GeneralUserCenter.Birthday')">
                    <el-input
                      v-if="user.userInfo.birthday"
                      v-model="user.userInfo.birthday"
                      disabled
                    ></el-input>
                    <el-date-picker
                      v-else
                      v-model="userInfo.birthday"
                      type="date"
                      :placeholder="$t('GeneralUserCenter.Notice_20')"
                    />
                  </el-form-item>
                </div>
              </div> -->
              <el-form-item :label="$t('GeneralUserCenter.Gender')">
                <el-input v-if="onComputedGender" v-model="onComputedGender" disabled></el-input>
                <el-select
                  v-else
                  v-model="userInfo.sex"
                  :placeholder="$t('GeneralUserCenter.Notice_19')"
                >
                  <el-option :label="$t('GeneralUserCenter.Male')" value="0"></el-option>
                  <el-option :label="$t('GeneralUserCenter.Female')" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('GeneralUserCenter.Birthday')">
                <el-input
                  v-if="user.userInfo.birthday"
                  v-model="user.userInfo.birthday"
                  disabled
                ></el-input>
                <el-date-picker
                  v-else
                  v-model="userInfo.birthday"
                  type="date"
                  :placeholder="$t('GeneralUserCenter.Notice_20')"
                />
              </el-form-item>
            </el-form>
            <div class="footer-box">
              <div class="footer-btn" :class="{ btn: onComputedSava }" @click="onClickSava">
                {{ $t('GeneralUserCenter.Save') }}
              </div>
            </div>
          </div>
        </div>
        <div class="safe-center">
          <div class="title">
            <span>{{ $t('GeneralUserCenter.SecurityCenter') }}</span>
            <span class="safe-tip small-text">{{ $t('GeneralUserCenter.Notice_21') }}</span>
          </div>
          <SafeConfigMenu :isPersonal="true"></SafeConfigMenu>
        </div>
      </div>
      <div class="right-col">
        <div class="title">{{ $t('GeneralUserCenter.CardManagement') }}</div>
        <div class="bank-card" v-if="listData.length">
          <div class="bank-information" v-for="item in listData" :key="item.id">
            <div class="bank-name">
              <div class="img"><img :src="getImgUrl(item.icon)" /></div>
              <div>{{ item.bankname }}</div>
            </div>
            <div class="bank-card-number">
              <div>****</div>
              <div>****</div>
              <div>****</div>
              <div>{{ item.cardNo.substr(-4) }}</div>
            </div>
            <div class="bank-delete">
              <div>{{ $t('GeneralUserCenter.DebitCard') }}</div>
              <!-- <div @click="onClickDelete(item)">{{ $t('GeneralUserCenter.Delete') }}</div> -->
              <div v-if="item.status == 1" class="bank-text">
                {{ $t('GeneralUserCenter.forbidden') }}
              </div>
            </div>
          </div>
        </div>
        <div class="card-tip small-text" v-else>
          {{ $t('GeneralUserCenter.Notice_22') }}，<span @click="router.push('/personal/6')">{{
            $t('GeneralUserCenter.PleaseAdd')
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { computed, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import SafeConfigMenu from './SafeConfiguration/SafeConfigMenu'
import { useUserStore } from '@/stores/user.js'
import { getImgUrl } from '@/utils/cache'
import { updateMemberInfo, getBankList } from '@/api/bindInfo'
import { useRouter } from 'vue-router'

const user = useUserStore()
const router = useRouter()

const loading = ref(false)
// 个人信息
const userInfo = reactive({
  nickNames: '', //用户昵称(更新昵称信息时必填)
  birthday: '', // 生日
  sex: '' // 性别
})

// const nickName = ref('')
userInfo.nickNames = user.userInfo.nickName

console.log(' user.userInfo', user.userInfo)
// 性别
const onComputedGender = computed(() => {
  if (user.userInfo.sex == '0') {
    return i18n.global.t('GeneralUserCenter.Male')
  } else if (user.userInfo.sex == '1') {
    return i18n.global.t('GeneralUserCenter.Female')
  } else {
    return ''
  }
})

// 生日时间
const formattedDate = ref('')

// 保存按钮高亮
const onComputedSava = computed(() => {
  return !!(
    (userInfo.nickNames.length >= 4 && userInfo.nickNames.length < 10) ||
    user.userInfo.birthday ||
    userInfo.birthday ||
    user.userInfo.sex ||
    (userInfo.sex >= 0 && userInfo.sex)
  )
})

// 保存
const onClickSava = () => {
  if (onComputedSava.value) {
    if (userInfo.birthday) {
      const date = new Date(userInfo.birthday)
      // 获取年、月、日
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从0开始，需要加1
      const day = String(date.getDate()).padStart(2, '0')
      formattedDate.value = `${year}-${month}-${day}`
      const currentDate = new Date()
      // 计算年龄差
      const ageDifference = currentDate.getFullYear() - userInfo.birthday.getFullYear()

      // 判断年龄是否大于等于18岁
      const isOver18 = ageDifference >= 18
      if (!isOver18) {
        return ElMessage({
          message: i18n.global.t('GeneralUserCenter.Notice_23'),
          type: 'warning'
        })
      }
    }
    loading.value = true

    const params = {
      nickName: userInfo.nickNames ? userInfo.nickNames : '',
      birthday: user.userInfo.birthday ? user.userInfo.birthday : formattedDate.value,
      sex: user.userInfo.sex ? user.userInfo.sex : userInfo.sex
    }
    updateMemberInfo(params)
      .then(() => {
        user.getUserInfoAction()
        ElMessage.success(i18n.global.t('GeneralUserCenter.SavedSuccessfully'))
        loading.value = false
      })
      .catch(() => {
        loading.value = false
      })
  }
}

onMounted(() => {
  getList()
})

// 银行卡列表数据
const listData = ref([])
const getList = () => {
  // 获取银行卡列表
  getBankList().then((res) => {
    listData.value = res.data || []
  })
}
</script>

<style lang="scss" scoped>
.personal {
  padding: 4px 0 40px 0;
  min-width: 1320px;
  max-width: 1320px;
}

.outter-box {
  display: flex;
  border-radius: 8px;
  background: #272b45;
  padding-bottom: 68px;
  .left-col {
    width: 905px;
    padding: 30px 80px 0 40px;
    border-right: 1px solid var(--unnamed, rgba(255, 255, 255, 0.1));
    .input-container {
      padding-top: 30px;
      color: var(--60, rgba(255, 255, 255, 0.6));

      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
      .input-form {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 260px;
      }
      .el-form-item-box {
        position: relative;
        .el-form-item-box-text {
          position: absolute;
          bottom: -31px;
          white-space: nowrap;
        }
      }
      .input-container-box {
        display: flex;
        align-items: center;
        margin-top: 20px;
        .input-container-box-item {
          display: flex;
          align-items: center;
        }
        .labels {
          margin-left: 30px;
        }
      }
      .footer-box {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        .footer-btn {
          width: 104px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          border-radius: 4px;
          cursor: pointer;
          color: #fff;
          font-size: 14px;
          letter-spacing: -0.01px;
          border: 1px solid #ccc;
        }
        .btn {
          background: var(--unnamed, #ff9000);
          border: none;
        }
      }
    }
    .safe-center {
      margin-top: 34px;
    }
  }
  .right-col {
    flex-grow: 1;
    padding: 27px 40px 0 80px;
    .card-tip {
      margin-top: 40px;
      span {
        color: var(--unnamed, #e93d3d);
      }
    }
    .bank-card {
      width: 100%;
      height: 986px;
      overflow: auto;
      margin-top: 20px;
      .bank-information {
        width: 295px;
        height: 126px;
        border-radius: 10px;
        border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
        background-color: #171a2f;
        margin: 20px 0;
        .bank-name {
          display: flex;
          margin: 15px 0 0 20px;
          .img {
            width: 16px;
            height: 16px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          div:nth-child(2) {
            color: var(--60, rgba(255, 255, 255, 0.6));

            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 16px; /* 114.286% */
            margin-left: 8px;
          }
        }
        .bank-card-number {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          margin-left: 20px;
          div {
            color: var(--100, #fff);
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: 50px; /* 80% */
          }
        }
        .bank-delete {
          display: flex;
          color: var(--60, rgba(255, 255, 255, 0.6));
          font-size: 12px;
          font-style: normal;
          font-weight: 400;

          align-items: center;
          justify-content: space-between;
          div:nth-child(1) {
            // width: 100%;
            padding-left: 23px;
          }
          div:nth-child(2) {
            // min-width: 22%;
            text-align: center;
            margin-right: 15px;
            cursor: pointer;
            line-height: 24px;
            border-radius: 2px;
            border: 0.5px solid var(--20, rgba(255, 255, 255, 0.2));
            color: var(--1, #f53f3f);
            padding: 0 5px;
          }
        }
      }
    }
  }
}
.title {
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--unnamed, rgba(255, 255, 255, 0.1));
  color: var(--100, #fff);

  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.small-text {
  color: var(--60, rgba(255, 255, 255, 0.6));

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  span {
    cursor: pointer;
  }
}
.el-item-con {
  display: flex;
}
:deep() {
  .personal-center .el-input {
    width: 316px;
  }
  .personal-center .el-radio__inner {
    background-color: #272b45;
    border: 1px solid #9292bf;
  }
  .personal-center .el-form-item__label,
  .personal-center .el-radio__label,
  .personal-center .el-input__inner {
    color: var(--60, rgba(255, 255, 255, 0.6));
  }
  .personal-center .el-input__wrapper {
    background-color: #272b45;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2) !important;
  }
  .personal-center .el-input.is-disabled .el-input__wrapper {
    background-color: #272b45;
  }
}

.nike-name-status {
  display: inline-block;
  margin-left: 15px;
  color: #e5a369;
}
</style>

<style>
.el-date-table td.current:not(.disabled) .el-date-table-cell__text {
  background-color: var(--unnamed, #ff9000);
}
.el-date-picker {
  --el-datepicker-hover-text-color: var(--unnamed, #ff9000);
}
</style>
