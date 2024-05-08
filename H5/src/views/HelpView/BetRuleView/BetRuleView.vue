<template>
  <div>
    <NavBar :title="$t('Hletter.BetRules')" v-if="!isCTYWebApp() && !isIOSPure() && !token" />
    <van-tabs v-model:active="active" class="tab-bar" line-width="16px">
      <van-tab :title="$t('Hletter.CommonRules')"
        ><div class="rule-content">
          <div class="rule-container">
            <p class="title">{{ $t('Hletter.Title1') }}</p>
            <p>
              {{ $t('Hletter.Pcontent1') }}
            </p>
            <p>
              {{ $t('Hletter.Pcontent2') }}
            </p>
            <p>{{ $t('Hletter.Pcontent3') }}</p>

            <p class="title">{{ $t('Hletter.Title2') }}</p>
            <p>
              {{ $t('Hletter.Pcontent4') }}
            </p>
            <p>{{ $t('Hletter.Pcontent5') }}</p>
            <p class="title">{{ $t('Hletter.Title3') }}</p>
            <p>{{ $t('Hletter.Pcontent6') }}</p>
            <p>{{ $t('Hletter.Pcontent877') }}</p>
            <p>{{ $t('Hletter.Pcontent887') }}</p>

            <p class="title">{{ $t('Hletter.Title4') }}</p>
            <p>
              {{ $t('Hletter.Pcontent7') }}
            </p>
            <p>{{ $t('Hletter.Pcontent8') }}</p>
            <p>{{ $t('Hletter.Pcontent9') }}</p>
            <p>{{ $t('Hletter.Pcontent10') }}</p>
            <p>{{ $t('Hletter.Pcontent11') }}</p>
            <br />
            <p>{{ $t('Hletter.Pcontent12') }}</p>
            <p>{{ $t('Hletter.Pcontent13') }}</p>
            <p>{{ $t('Hletter.Pcontent14') }}</p>
            <br />
            <p>{{ $t('Hletter.Pcontent15') }}</p>
            <p>{{ $t('Hletter.Pcontent16') }}</p>
            <p>{{ $t('Hletter.Pcontent17') }}</p>
            <p>{{ $t('Hletter.Pcontent18') }}</p>
            <p>{{ $t('Hletter.Pcontent19') }}</p>
            <p class="title">{{ $t('Hletter.Title5') }}</p>
            <p>{{ $t('Hletter.Pcontent20') }}</p>
            <p>{{ $t('Hletter.Pcontent21') }}</p>
            <p class="title">{{ $t('Hletter.Title6') }}</p>
            <p>{{ $t('Hletter.Pcontent22') }}</p>
            <p class="title">{{ $t('Hletter.Title7') }}</p>
            <p>{{ $t('Hletter.Pcontent23') }}</p>
            <p class="title">{{ $t('Hletter.Title8') }}</p>
            <p>
              {{ $t('Hletter.Pcontent24') }}
            </p>
            <p class="title">{{ $t('Hletter.Title9') }}</p>
            <p>
              {{ $t('Hletter.Pcontent25') }}
            </p>
          </div>
        </div></van-tab
      >
      <van-tab :title="$t('Hletter.AllRules')"
        ><div class="Allrule-content">
          <AllRule /></div
      ></van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import NavBar from '@/components/NavBar/NavBar.vue'
import { onMounted } from 'vue'
import AllRule from './components/AllRule.vue'
import { useRoute } from 'vue-router'
import { isCTYWebApp, isIOSPure } from '@/utils'
const route = useRoute()
const active = ref(0)
const token = ref('')

onMounted(() => {
  if (route.query.activeNames) {
    active.value = Number(route.query.activeNames)
  }
  if (route.query.token) {
    token.value = route.query.token
  }
})
</script>

<style lang="scss" scoped>
.Allrule-content {
  padding: 15px;
}
.rule-container .title:first-child {
  margin-top: 0;
}
.tab-bar {
  margin-top: 1px;
}
.rule-content {
  padding: 15px 7px 0 7px;
  background-color: #f7f7f7;
}
.rule-container {
  padding: 15px;
  color: #666;

  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  border-radius: 4px;
  background: #fff;
}
.title {
  margin-top: 20px;
  color: #111;

  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
}
:deep() {
  .van-tabs__nav {
    width: 100vw;
    height: 44px;
    justify-content: center;
    gap: 60px;
  }
  .van-tab {
    flex: none;
  }
}
</style>
