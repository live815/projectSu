<template>
  <div class="exception-tip-yesterday">
    <div class="content">
      <div class="title">
        <img src="../img/bell.svg" alt="" />
        <span class="ml-16">{{ title }}</span>
      </div>
    </div>
    <ul v-if="isShow">
      <li v-for="item in data.yesAberrantList" class="exception-main">
        <img src="../img/warning.svg" alt="" />
        <span class="ml-8">{{ assembleData(item) }}</span>
      </li>
      <li class="exception-main" v-if="data.windUserName && data.windUserName.length">
        <img src="../img/warning.svg" alt="" />
        <span class="ml-8">{{ $t('summary.yesterdayProfitTop20') }}</span>
        <span v-for="(child,index) in data.windUserName">
          [<span class="pointer" style="text-decoration: underline;" @click="goMemberDetail(child)">{{ child.userName }}</span>]
          <span v-if="index!==data.windUserName.length - 1">、</span>
        </span>
        <span class="ml-8">{{ $t('summary.keepProfitTwoDay') }}</span>
      </li>
    </ul>
    <el-empty :description="$t('member.noData')" v-else />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { computed } from 'vue';

const props = defineProps(["title","data"]);
const router = useRouter();

const isShow = computed({
  get(){
    return (props.data.yesAberrantList && props.data.yesAberrantList.length !== 0)||
    (props.data.windUserName && props.data.windUserName.length !== 0)
  }
})
function assembleData(item){
  // return `[${item.dataName}] 今日数据较昨日${item.dataPer}%以上`
  return `${i18n.global.t("summary.yesterdayThanThisMonth",{num1:item.dataName||"-",num2:item.dataPer})}`
}
function goMemberDetail(item) {
  router.push({path:"/member/detail-basic/info/" + item.userName,query:{
    tenantId:item.tenantId,
    userId:item.userId
  }});
}
</script>

<style lang="scss" scoped>
.exception-tip-yesterday{
  padding: 16px 32px;
  border:1px solid rgb(121,121,121);
  background: #FFFFFF;
  border-radius: 19px;
  .content {
    .title {
      font-weight: 600;
      font-size: 20px;
      color: #f26d6d;
      background-color: rgb(255, 255, 255);
      display: flex;
      align-items: center;
    }
  }
  .exception-main {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 12px;
    background:#fce0e0;
    margin-bottom: 12px;
    border-radius: 13px;
    color:#f26d6d;
  }
  ul{
    padding:0;
    padding-right:8px;
    max-height:530px;
    overflow-y: auto;
  }
}
</style>
