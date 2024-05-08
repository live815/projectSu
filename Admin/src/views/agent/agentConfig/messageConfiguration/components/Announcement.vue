<template>
  <div>
    <el-form :model="queryParams" :inline="true" label-width="auto">
      <el-form-item label="标题名称 :">
        <el-input v-model="queryParams.noticeTitle" placeholder="请输入标题名称" />
      </el-form-item>
      <el-form-item label="状态 :">
        <el-select v-model="queryParams.status" clearable placeholder="请选择状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建人 :">
        <el-input v-model="queryParams.createBy" placeholder="请输入创建人" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">查询</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
        <el-button type="warning" icon="Plus" @click="showAnnouncementPopup()">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="操作" width="260" align="center">
        <template #default="{ row }">
          <el-button type="primary" @click="editMain(row)" :disabled="row.status == 1"
            >编辑</el-button
          >
          <el-button type="danger" @click="delBtn(row.noticeId)">删除</el-button>
          <el-button @click="handleSend(row)" type="primary" :disabled="row.status == 1"
            >发送</el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="noticeTitle" label="标题" width="180" />
      <el-table-column prop="noticeContent" label="内容" width="180">
        <template #default="{ row }">
          <span type="primary" style="color: #1890ff; cursor: pointer" @click="toShowPreview(row)"
            >查看</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="isAllAgent" label="指定代理账号" width="180">
        <template #default="{ row }">
          <span type="primary" v-if="row.isAllAgent == 0">全部代理</span>
          <span type="primary" v-if="row.isAllAgent == 1">指定代理</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template #default="{ row }">
          <span type="primary" style="color: #e01425" v-if="row.status == 0">待发送</span>
          <span type="primary" style="color: #0869fa" v-if="row.status == 1">已发送</span>
        </template>
      </el-table-column>
      <el-table-column prop="createBy" label="创建人" width="180" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="updateBy" label="最后操作人" width="180">
        <template #default="{ row }">
          <span>{{ row.updateBy || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="最后操作时间" width="260">
        <template #default="{ row }">
          <span>{{ row.updateTime || '-' }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
      style="height: 40px"
    />

    <el-dialog
      v-model="getAnnouncementPopup"
      :title="materialLine ? $t('agent.NewAnnounce') : $t('agent.ModificatNotice')"
      width="800px"
      @close="handleClose"
      :center="true"
    >
      <AddedAnnouncementPopup
        v-if="getAnnouncementPopup"
        :opRow="opRowitem"
        @submitBtn="submitBtn"
        :type="1"
      ></AddedAnnouncementPopup>
    </el-dialog>
    <el-dialog
      v-model="contentDetails"
      title="内容详情"
      width="800px"
      @close="handleClose"
      :center="true"
    >
      <ContentDetailsPopup :previewContent="previewContent"></ContentDetailsPopup>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AddedAnnouncementPopup from './AddedAnnouncementPopup.vue'
import ContentDetailsPopup from './ContentDetailsPopup.vue'
import {
  queryAgentAnnouncementListApi,
  deleteAgentAnnouncementApi,
  announcementSentApi
} from '@/api/agent/helpConfig.js'
import { ElMessageBox, ElMessage } from 'element-plus'
import i18n from '@/i18n'

const queryParams = ref({
  noticeType: 1,
  noticeTitle: '',
  status: '',
  createBy: '',
  pageNum: 1,
  pageSize: 10
})
const total = ref(0)
const opRowitem = ref({})
const loading = ref(false)
const statusList = [
  {
    value: '',
    label: '全部'
  },
  {
    value: 0,
    label: '待发送'
  },
  {
    value: 1,
    label: '已发送'
  }
]
//查询
function handleQuery() {
  announcementList()
}
//重置
function resetQuery() {
  queryParams.value.noticeTitle = ''
  queryParams.value.status = ''
  queryParams.value.createBy = ''
}

// 新增编辑弹窗
const materialLine = ref(false)
const getAnnouncementPopup = ref(false)
const showAnnouncementPopup = () => {
  getAnnouncementPopup.value = !getAnnouncementPopup.value
  opRowitem.value = {}
}

onMounted(() => {
  announcementList()
})
// 新增编辑弹窗确认
const submitBtn = () => {
  getAnnouncementPopup.value = false
  // materialLine.value = false;
  announcementList()
}
// 编辑传参
const editMain = (row) => {
  opRowitem.value = row
  getAnnouncementPopup.value = true
}
//关闭弹窗清空数据
const handleClose = () => {
  getAnnouncementPopup.value = false
}
//查看内容详情
const contentDetails = ref(false)
const previewContent = ref()
const toShowPreview = (row) => {
  previewContent.value = row
  contentDetails.value = !contentDetails.value
}
// 删除
const delBtn = (id) => {
  ElMessageBox.confirm(i18n.global.t('agent.isDeleteData'))
    .then(() => {
      deleteAgentAnnouncementApi(id).then(() => {
        ElMessage({
          type: 'success',
          message: i18n.global.t('agent.deleteSuccessfully')
        })
        announcementList()
      })
    })
    .catch(() => {})
}

// 发送功能
const handleSend = (row) => {
  ElMessageBox.confirm(i18n.global.t('agent.whetherToSendThisData'))
    .then(() => {
      announcementSentApi(row.noticeId).then(() => {
        ElMessage({
          type: 'success',
          message: i18n.global.t('agent.sentSuccessfully')
        })
        announcementList()
      })
    })
    .catch(() => {})
}

const tableData = ref([])
// 列表
const announcementList = async () => {
  try {
    let res = await queryAgentAnnouncementListApi(queryParams.value)
    tableData.value = res.rows
    tableData.value.forEach((item) => {
      item.noticeId = BigInt(item.noticeId).toString()
    })
    total.value = res.total
  } catch (e) {
    console.log(e)
  }
}
// 分页
function getList() {
  loading.value = true
  queryAgentAnnouncementListApi(queryParams.value)
    .then((res) => {
      loading.value = false
      tableData.value = res.rows || []
      total.value = res.total
    })
    .catch((err) => {
      loading.value = false
    })
}
</script>

<style lang="scss" scoped></style>
