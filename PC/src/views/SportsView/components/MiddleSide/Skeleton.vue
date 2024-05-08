<template>
  <div>
    <div v-for="item in 4" :key="item" class="skeleton-box" v-if="fbStore.queryMatchListParams.type !== 7">
      <div class="top"></div>
      <div class="second-top"></div>
      <div class="content">
        <div class="content-left"></div>
        <div class="content-right">
          <div class="name">
            <div  v-for="item in 3" :key="item"></div>
          </div>
          <div class="handcip">
            <div class="collum"  v-for="item in 12" :key="item"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="skeleton-box" v-for="items in 3" :key="items"  v-else>
      <div class="top"></div>
      <div class="con">
        <div class="coll" v-for="itemes in 10" :key="itemes"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()
</script>

<style lang="scss" scoped>
.skeleton-box{
  width: 100%;
  margin-bottom: 5px;
  border-radius: 3px;
  .top,.second-top{
    width:100%;
    height: 36px;
    background: #1D223C;
    margin-bottom: 5px;
    border-radius: 3px;
  }
  .content{
    height: 108px;
    // background: #1D223C;
    border-radius: 3px;
    display: flex;
    flex-direction: row;

    .content-left{
      height: 100%;
      width: 64px;
      background: #1D223C;
      border-radius: 3px;
      margin-right: 5px;
    }
    .content-right{
      flex: 1;
      display: flex;
      flex-direction: row;
      .name{
        width: 218px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 5px;
        >div{
          height: 27px;
          background: #1D223C;
          border-radius: 3px;
          margin-top: 5px;
          margin-bottom: 5px;
          width: 98%;
        }
      }
      .handcip{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        .collum{
          height: 30px;
          background: #1D223C;
          border-radius: 3px;
          width: 100px;
          margin-right: 5px;
          margin-bottom: 5px;
        }
      }
    }
    
  }
  .con{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    .coll{
      width: 48%;
      height: 34px;
      background: #1D223C;
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
}
</style>