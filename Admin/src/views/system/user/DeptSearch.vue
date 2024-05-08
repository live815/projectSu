<template>
  <div>
    <div class="head-container">
      <el-input
        v-model="deptName"
        :placeholder="$t('system.tip11')"
        clearable
        prefix-icon="Search"
        style="margin-bottom: 20px"
      />
    </div>
    <div class="head-container">
      <el-tree
        :data="deptOptions"
        :props="{ label: 'label', children: 'children' }"
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        ref="deptTreeRef"
        node-key="id"
        highlight-current
        default-expand-all
        @node-click="handleNodeClick"
      />
    </div>
  </div>
</template>

<script setup>
const { proxy } = getCurrentInstance();
const deptName = ref("");
defineProps({
  deptOptions: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["handleTreeClick"]);
/** 根据名称筛选部门树 */
watch(deptName, (val) => {
  proxy.$refs["deptTreeRef"].filter(val);
});

/** 通过条件过滤节点  */
const filterNode = (value, data) => {
  if (!value) return true;
  return data.label.indexOf(value) !== -1;
};

/** 节点单击事件 */
function handleNodeClick(data) {
  emit("handleTreeClick", data.id);
}
</script>

<style lang="scss" scoped></style>
