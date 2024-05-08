<template>
  <el-dialog v-model="visible" :title="$t('operation.add2')" width="800px" :center="true">
    <el-form :model="queryParams" ref="queryRef" label-width="130px">
      <el-form-item :label="$t('operation.tip111')">
        <el-radio-group v-model="queryParams.type">
          <el-radio :label="1" size="large">{{ $t('operation.text') }}</el-radio>
          <el-radio :label="2" size="large">{{ $t('operation.upImg') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="queryParams.type == 1">
        <el-form-item
          :label="$t('operation.text1')"
          prop="content"
          class="bottom"
          :rules="[{ required: true, message: $t('operation.tip112'), trigger: 'blur' }]">
          <el-input
            v-model="queryParams.content"
            :placeholder="$t('operation.pleaseEnter')"
            style="width: 400px" />
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item
          :label="$t('operation.tip884')"
          prop="appImg"
          class="bottom"
          :rules="[{ required: true, message: $t('operation.tip113'), trigger: 'blur' }]">
          <ImageUpload
            v-model:modelValue="queryParams.appImg"
            :fileType="['png', 'gif', 'bmp', 'jpg', 'jpeg']"
            @update:modelValue="(e) => updateImage('appImg', e)" />
        </el-form-item>
        <el-form-item
          :label="$t('operation.Webpictures2')"
          prop="webImg"
          class="bottom"
          :rules="[{ required: true, message: $t('operation.tip113'), trigger: 'blur' }]">
          <ImageUpload
            v-model:modelValue="queryParams.webImg"
            :fileType="['png', 'gif', 'bmp', 'jpg', 'jpeg']"
            @update:modelValue="(e) => updateImage('webImg', e)" />
        </el-form-item>
      </template>

      <el-form-item class="bottom">
        <div class="left">
          {{ $t('operation.tip114') }}
        </div>
      </el-form-item>
      <el-form-item class="bottom left">
        <el-button type="primary" @click="addGear()">{{ $t('operation.sure1') }}</el-button>
        <el-button @click="visible = false">{{ $t('operation.close') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { getImgURI } from '@/utils'
import cloneDeep from 'lodash/cloneDeep'

const visible = ref(false)
const DEFAULT_VALUE = { content: '', appImg: '', webImg: '', type: 1 }
defineExpose({ show: () => (visible.value = true) })
const emit = defineEmits('renewKey')

const queryParams = ref()
const queryRef = ref()
const props = defineProps({
  gearObj: { type: Object },
  list: { type: Array },
  editIndex: { type: Number }
})

//上传
const updateImage = (img, e) => (queryParams.value[img] = getImgURI(e))

// 确认
const addGear = async () => {
  await queryRef.value.validate((valid, fields) => {
    if (valid) {
      if (props.editIndex < 0) {
        props.list.push(queryParams.value)
      } else {
        props.list[props.editIndex] = queryParams.value
      }
      queryParams.value = cloneDeep(DEFAULT_VALUE)
      visible.value = false
      emit('renewKey')
    } else {
      console.log('error submit!', fields)
    }
  })
}

watchEffect(() => {
  queryParams.value =
    props.gearObj !== undefined ? cloneDeep(props.gearObj) : cloneDeep(DEFAULT_VALUE)
})
</script>

<style lang="scss" scoped>
.rewrite-icon {
  width: 150px;
  height: 150px;
  text-align: center;
  line-height: 100px;
  border: 1px dashed #eee;
}
.avatar {
  width: 150px;
  height: 150px;
}
.bottom {
  margin-bottom: 20px;
}
.left {
  margin-left: 110px;
}
</style>
