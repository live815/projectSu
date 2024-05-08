<template>
  <div class="member-detail-bank-virtual-info">
    <h3 class="h3-title">{{ $t('member.bankcardInformation') }}</h3>
    <el-button type="primary" @click="addBankCard">{{ $t('member.add') }}</el-button>
    <el-table :data="tableDataBank" max-height="300" :empty-text="$t('member.noData')">
      <el-table-column :label="$t('member.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <!-- <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span> -->
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.banknameNoQuote')" prop="bankname" align="center"></el-table-column>
      <el-table-column :label="$t('member.bankcardAccountNoQuote')" prop="cardNo" align="center"></el-table-column>
      <el-table-column :label="$t('member.cardholderNoQuote')" prop="cardholder" align="center"></el-table-column>
      <el-table-column :label="$t('member.accountAddrNoQuote')" prop="accountAddr" align="center">
        <template #default="{row}">
          <span>{{ row.accountAddr || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.cardTypeNoQuote')" prop="cardType" align="center">
        <template #default="{row}">
         <span v-if="row.cardType==='1'">{{$t('member.firstTypeCard')}}</span>
         <span v-else-if="row.cardType==='2'">{{$t('member.secondTypeCard')}}</span>
         <span v-else-if="row.cardType==='3'">{{$t('member.thirdTypeCard')}}</span>
         <span v-else-if="row.cardType==='4'">{{$t('member.rememberCard')}}</span>
         <span v-else-if="row.cardType==='5'">{{$t('member.unknowStatus')}}</span>
         <span v-else-if="row.cardType==='6'">{{$t('member.uncheck')}}</span>
         <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.bindingTime')" prop="createTime" align="center">
        <template #default="{row}">
          <span>{{ row.createTime || "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.status')" prop="status" align="center">
        <template #default="{row}">
          <div v-if="row.status === 0">{{ $t('member.start') }}</div>
          <div v-else>{{ $t('member.disable') }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.handle')" align="center" width="200">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="editBankCard(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="delCard(row)">删除</el-button>
          <el-button
            size="small"
            type="danger"
            v-if="row.status === 0"
            @click="startCard(row)"
            >{{ $t('member.disabled') }}</el-button
          >
          <el-button
            size="small"
            type="success"
            v-else
            @click="startCard(row)"
            >{{ $t('member.started') }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <h3 class="h3-title">{{ $t('member.bindingWalletAddress') }}</h3>
    <el-button type="primary" @click="addWalletAddress">{{ $t('member.add') }}</el-button>
    <el-table :data="tableDataAddress" max-height="300">
      <el-table-column :label="$t('member.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <!-- <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span> -->
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.walletAddress')" prop="addr" align="center">
        <template #default="{row}">
          <span>{{ row.addr?row.addr:"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.walletAlias')" prop="alias" align="center">
        <template #default="{row}">
          <span>{{ row.alias?row.alias:"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.walletProtocol')" prop="protocol" align="center">
        <template #default="{row}">
          <span>{{ row.protocol?row.protocol:"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.bindingTime')" prop="createTime" align="center">
        <template #default="{row}">
          <span>{{ row.createTime?row.createTime:"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.status')" align="center">
        <template #default="{row}">
          <div v-if="row.status === 0">{{ $t('member.start') }}</div>
          <div v-else> {{ $t('member.disable') }} </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.handle')" align="center">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="editWalletAddress" v-if="false">{{ $t('member.edit') }}</el-button>
          <el-button type="danger" size="small" @click="delVirtual(row)">{{ $t('member.delete') }}</el-button>
          <el-button
            size="small"
            type="danger"
            v-if="row.status === 0"
            @click="disableCard(row)"
            >{{ $t('member.disabled') }}</el-button
          >
          <el-button
            size="small"
            type="success"
            v-else
            @click="disableCard(row)"
            >{{ $t('member.started') }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <h3 class="h3-title">绑定EBPAY钱包地址</h3>
    <el-button type="primary" @click="addEBAddress">{{ $t('member.add') }}</el-button>
    <el-table :data="tableDataAddressEB" max-height="300" :empty="$t('member.noData')">
      <el-table-column :label="$t('member.serialNumber')" width="55" type="index" align="center">
        <template #default="scope">
          <!-- <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span> -->
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.EBPAYAddress')" prop="addr" align="center">
        <template #default="{row}">
          <span>{{ row.addr?row.addr:"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.walletAlias')" prop="alias" align="center">
        <template #default="{row}">
          <span>{{ row.alias?row.alias:"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.bindingTime')" prop="createTime" align="center">
        <template #default="{row}">
          <span>{{ row.createTime?row.createTime:"-" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.status')" align="center">
        <template #default="{row}">
          <div v-if="row.status === 0">{{ $t('member.start') }}</div>
          <div v-else> {{ $t('member.disable') }} </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('member.handle')" align="center">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="editWalletAddress" v-if="false">{{ $t('member.edit') }}</el-button>
          <el-button type="danger" size="small" @click="delEB(row)">{{ $t('member.delete') }}</el-button>
          <el-button
            size="small"
            type="danger"
            v-if="row.status === 0"
            @click="disableEB(row)"
            >{{ $t('member.disabled') }}</el-button
          >
          <el-button
            size="small"
            type="success"
            v-else
            @click="disableEB(row)"
            >{{ $t('member.started') }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <AddOrEditCardDia
      v-model:open="openAddEditCardDialog"
      v-if="openAddEditCardDialog"
      :id="cloneIdCard"
      :type="typeCard"
      :userName="userName"
      @onrefresh="getList"
    />
    <AddOrEditVirtualAddr 
    v-model:open="openVirtualDialog" 
    v-if="openVirtualDialog"
    :id="cloneId"
    :type="type"
    :userName="userName"
    @onrefresh="getAddressList" />
    <AddOrEditEBDia 
      v-model:open="openEBDialog"
      v-if="openEBDialog"
      :typeEB="typeEB"
      :userName="userName"
      @onrefresh="getEBAddressList"
      />
    <StartDisable 
    v-model:openDia="openDialog" 
    v-if="openDialog" 
    :cardId="cardId"
    :status="status" 
    @onfreshstatus="getList" />
    <StartDisableVirtual 
    v-model:openDia="openVirtualStartDialog" 
    v-if="openVirtualStartDialog" 
    :cardId="virtualId"
    :status="statusVirtual" 
    @onfreshstatus="getAddressList" />
    <StartDisableEBDialog 
      v-model:openDia="openEBStartDialog"
      v-if="openEBStartDialog"
      :cardId="ebId"
      :status="statusEB" 
      @onfreshstatus="getEBAddressList"   
      />
    <DeleteCurrencyManageDia 
    v-model:openDelete="openDelete"
    v-if="openDelete"
    :delId="delId"
    @onfreshdelete="getAddressList"
    />
    <DeleteEBManageDia 
      v-model:openDelete="openDeleteEB"
      v-if="openDeleteEB"
      :delId="delIdEB"
      @onfreshdelete="getEBAddressList"
      />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import { getBankcardList,updateBankcardStatus,delBankcard, getCryptocyList,getEBCryptocyList,updateCurrencyStatus,delCryptocy } from "@/api/member/bankcard/index";
import AddOrEditCardDia from "@/views/member/bank/components/AddOrEditCardDia.vue";
import AddOrEditVirtualAddr from "@/views/member/currency/components/AddOrEditCardDia.vue";
import StartDisable from "@/views/member/bank/components/StartDisable.vue";
import StartDisableVirtual from "@/views/member/currency/components/StartDisableDialog.vue";
import DeleteCurrencyManageDia from "@/views/member/currency/components/DeleteCurrencyManageDia";
import AddOrEditEBDia from "@/views/member/eb/components/AddOrEditEBDia.vue";
import StartDisableEBDialog from "@/views/member/eb/components/StartDisableEBDialog.vue";
import DeleteEBManageDia from "@/views/member/eb/components/DeleteEBManageDia.vue";

const props = defineProps(["userName", "activeName"]);

const { proxy } = getCurrentInstance();
const queryParams = ref({
  userName: null,
});
const tableDataBank = ref([]);
const openAddEditCardDialog = ref(false); //银行卡弹窗
const openVirtualDialog = ref(false); //虚拟币弹窗
const typeCard = ref(null); //银行卡弹窗类型
const type = ref(null); //虚拟币弹窗类型
const typeEB = ref(null); //EB地址弹窗类型
const cloneIdCard = ref(null); //银行卡ID
const cloneId = ref(null); //虚拟币ID
const tableDataAddress = ref([]); //虚拟币列表
const tableDataAddressEB = ref([]); //EB地址列表
const status = ref(null);
const cardId = ref(null);
const openDialog = ref(false);
const virtualId = ref(null);
const ebId = ref(null);
const statusVirtual = ref(null);
const statusEB = ref(null);
const openVirtualStartDialog = ref(false);
const openEBDialog = ref(false);
const openEBStartDialog = ref(false);

const openDelete = ref(false);
const delId = ref(null);
const openDeleteEB = ref(false);
const delIdEB = ref(null);

function getList() {
  return getBankcardList(queryParams.value).then((res) => {
    console.log(res, 666);
    tableDataBank.value = res.rows || [];
  });
}
function getAddressList() {
  //钱包地址
  return getCryptocyList(queryParams.value).then((res) => {
    tableDataAddress.value = res.rows || [];
  });
}
function getEBAddressList(){
  //EB钱包地址
  return getEBCryptocyList(queryParams.value).then((res) => {
    tableDataAddressEB.value = res.rows || [];
  }); 
}
function addBankCard() {
  typeCard.value = 'add'
  openAddEditCardDialog.value = true
}
function editBankCard(row) {
  typeCard.value = 'edit'
  cloneIdCard.value = row.id
  openAddEditCardDialog.value = true
}
const delCard = (row) => {
  proxy.$modal
    .confirms(i18n.global.t("member.areYouSureToDeleteBankcard"), i18n.global.t("member.tips"))
    .then(() => {
      delBankcard({
        id:row.id
      }).then((res) => {
        proxy.$modal.msgSuccess(i18n.global.t("risk.deleteSuccessfully"));
        getList();
      });
    })
    .catch(() => {
      // row.status = row.status==='0'?'1':'0'
    });
};
function addWalletAddress() {
  type.value = 'add'
  openVirtualDialog.value = true
}
function editWalletAddress(row){
  type.value = 'edit'
  cloneId.value = row.id
  openVirtualDialog.value = true
}
function addEBAddress(){
  typeEB.value = 'add'
  openEBDialog.value = true
}
const delVirtual = (row) => {
  // proxy.$modal
  //   .confirms(i18n.global.t("risk.sureToDelete"), i18n.global.t("risk.tips"))
  //   .then(() => {
  //     delCryptocy([row.id]).then((res) => {
  //       proxy.$modal.msgSuccess(i18n.global.t("risk.deleteSuccessfully"));
  //       getAddressList();
  //     });
  //   })
  //   .catch(() => {
  //     // row.status = row.status==='0'?'1':'0'
  //   });
  delId.value = row.id
  openDelete.value = true
};
const delEB = (row)=>{
  openDeleteEB.value = true
  delIdEB.value = row.id
}
const startCard = (row) => {
  openDialog.value = true;
  status.value = row.status
  cardId.value = row.id
}
const disableCard = (row) => {
  openVirtualStartDialog.value = true;
  statusVirtual.value = row.status
  virtualId.value = row.id
};
const disableEB = (row) => {
  openEBStartDialog.value = true;
  statusEB.value = row.status
  ebId.value = row.id
}

watch([() => props.userName, () => props.activeName], async () => {
  queryParams.value.userName = props.userName;
  if (props.activeName === "7" && props.userName) {
    await getList();
    await getAddressList();
    await getEBAddressList();
  }
});
</script>

<style lang="scss" scoped>
.member-detail-bank-virtual-info {
  .h3-title {
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
