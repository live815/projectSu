<template>
  <div>
    <el-checkbox
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      @change="handleCheckAllChange"
      >Check all</el-checkbox
    >
    <el-checkbox-group
      v-model="checkedCities"
      @change="handleCheckedCitiesChange"
    >
      <el-checkbox v-for="city in cities" :key="city" :label="city">{{
        city
      }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
