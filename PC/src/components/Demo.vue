<template>
  <el-button text @click="demo"> Click to open the Dialog </el-button>

  <el-dialog v-model="centerDialogVisible" title="Warning" width="30%" align-center z-index="9999">
    <span>Open the dialog from the center from the screen</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="centerDialogVisible = false"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from 'vue'
function demo() {
  centerDialogVisible.value = true
}
const centerDialogVisible = ref(false)
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
