<template>
  <div>
    <div v-for="item in 2" :key="item" class="skeleton-box">
      <div class="top"></div>
      <div style="display: flex; padding: 15px">
        <div class="left">
          <div class="title"></div>
          <div class="left-item" v-for="item in 2" :key="item"></div>
        </div>
        <div class="right">
          <div class="right-item" v-for="item in 4" :key="item"></div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-left"></div>
        <div class="bottom-right"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.skeleton-box {
  width: 100%;
  height: 208px;
  margin: auto;
  border: 1px solid #eee;
  border-radius: 10px;
  margin-bottom: 10px;
  .top {
    height: 40px;
    border-radius: 10px 10px 0px 0px;
    background: linear-gradient(180deg, #fdfdfe 0%, #e8ecf2 100%);
  }
  .left {
    width: 50%;
    .title {
      width: 80px;
      height: 15px;
      background: var(--gray-gray-1, #f3f3f3);
      border-radius: 10px;
      margin-bottom: 15px;
    }
    .left-item {
      width: 120px;
      height: 24px;
      background: var(--gray-gray-1, #f3f3f3);
      margin: 0 20px 20px 0;
    }
  }
  .right {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 15px;
    .right-item {
      width: 80px;
      height: 41px;
      background: var(--gray-gray-1, #f3f3f3);
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    padding: 0 15px 0 15px;
    div {
      width: 80px;
      height: 15px;
      background: var(--gray-gray-1, #f3f3f3);
      border-radius: 10px;
    }
    .bottom-left {
      align-self: flex-start;
    }
    .bottom-right {
      align-self: flex-end;
    }
  }
}
</style>