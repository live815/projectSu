<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card class="box-card">
          <template v-slot:header>
            <div class="clearfix">
              <span>{{ $t("system.personalinformat") }}</span>
            </div>
          </template>
          <div>
            <div class="text-center">
              <userAvatar :user="state.user" />
            </div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                <svg-icon icon-class="user" />{{ $t("system.username") }}
                <div class="pull-right">{{ state.user.userName }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="peoples" />{{ $t("system.Role") }}
                <div class="pull-right">{{ state.roleGroup }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="tree" />{{ $t("system.Department") }}
                <div class="pull-right" v-if="state.user.dept">
                  {{ state.user.dept.deptName }}
                </div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="tree" />{{ $t("system.Position") }}
                <div class="pull-right" v-if="state.user.post">
                  {{ state.user.post.postName }}
                </div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="phone" />{{ $t("system.phoneNumber") }}
                <div class="pull-right">{{ state.user.phonenumber }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="email" />{{ $t("system.Useremail") }}
                <div class="pull-right">{{ state.user.email }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="date" />{{ $t("system.creatDate") }}
                <div class="pull-right">{{ state.user.createTime }}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18" :xs="24">
        <el-card>
          <template v-slot:header>
            <div class="clearfix">
              <span>{{ $t("system.basicinformat") }}</span>
            </div>
          </template>
          <el-tabs v-model="activeTab">
            <el-tab-pane :label="$t('system.basicinformat')" name="userinfo">
              <userInfo :user="state.user" />
            </el-tab-pane>
            <el-tab-pane :label="$t('system.changePassword')" name="resetPwd">
              <resetPwd />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="Profile">
import userAvatar from "./userAvatar";
import userInfo from "./userInfo";
import resetPwd from "./resetPwd";
import { getUserProfile } from "@/api/system/user";

const activeTab = ref("userinfo");
const state = reactive({
  user: {},
  roleGroup: {},
  postGroup: {},
});

function getUser() {
  getUserProfile().then((response) => {
    state.user = response.user;
    state.roleGroup = response.roleGroup;
    state.postGroup = response.postGroup;
  });
}

getUser();
</script>
