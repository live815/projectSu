<template>
  <div class="exclusive-business">
    <NavBar v-if="!route.query.token" :border="true" :title="$t('BusinessAgentView.TitleOne')" />
    <div class="content">
      <div class="chat-wrapper">
        <ItemLink
          @click="selectLiveChat"
          :title="$t('BusinessAgentView.AgencyConsult')"
          :btnText="$t('BusinessAgentView.Consult')"
          :icon="AgentKefuIcon"
        />
        <div class="list">
          <ItemApp @download="download" :item="item" v-for="(item, idx) in dataInfo" :key="idx" />
        </div>
      </div>
      <!-- 全面推广 -->
      <Promo />
      <!-- 行业顶尖平台 -->
      <!-- <IndustryTop /> -->
      <!-- 强强联手 -->
      <div class="cooperation-wrapper">
        <Cooperation />
      </div>
    </div>
  </div>
  <LiveChat ref="liveChat" />
</template>

<script setup>
import ItemLink from './components/ItemLink.vue'
import ItemApp from './components/ItemApp.vue'
import Promo from './components/Promo/Promo.vue'
// import IndustryTop from './components/IndustryTop/IndustryTop.vue'
import Cooperation from './components/Cooperation/Cooperation.vue'
import { getPromotionContact } from '@/api/business'
import AgentKefuIcon from './img/icon/head-phone.png'
// import { useRouter } from 'vue-router'
import { webviewBridgeRedirect } from '@/utils'
import { useRoute } from 'vue-router'
import LiveChat from '@/components/LiveChat/LiveChat.vue'
const liveChat = ref(null)
const route = useRoute()
// 列表数据
const dataInfo = ref([])

onMounted(() => {
  getList()
})
const getList = () => {
  getPromotionContact()
    .then((res) => {
      dataInfo.value = res.data || []
    })
    .catch(() => {})
}

const download = (url) => {
  webviewBridgeRedirect({ url })
}
const selectLiveChat = () => {
  liveChat.value.open()
}
</script>

<style lang="scss" scoped>
.exclusive-business {
  @include mobile-padding();
  background: #f7f7f7;
  .content {
    margin-top: 10px;
    padding-bottom: 200px;
    .chat-wrapper {
      background: #fff;
      border-radius: 5px;
      padding: 10px;
    }
    .cooperation-wrapper {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
    }
  }
}
</style>
