<template>
  <el-form ref="genInfoForm" :model="info" :rules="rules" label-width="150px">
    <el-row>
      <el-col :span="12">
        <el-form-item prop="tplCategory">
          <template #label>{{ $t("system.tip163") }}</template>
          <el-select v-model="info.tplCategory" @change="tplSelectChange">
            <el-option :label="$t('system.tip164')" value="crud" />
            <el-option :label="$t('system.tip165')" value="tree" />
            <el-option :label="$t('system.tip166')" value="sub" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item prop="packageName">
          <template #label>
            {{ $t("system.tip167") }}
            <el-tooltip :content="$t('system.tip168')" placement="top">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </template>
          <el-input v-model="info.packageName" />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item prop="moduleName">
          <template #label>
            {{ $t("system.tip169") }}
            <el-tooltip :content="$t('system.tip170')" placement="top">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </template>
          <el-input v-model="info.moduleName" />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item prop="businessName">
          <template #label>
            {{ $t("system.tip171") }}
            <el-tooltip :content="$t('system.tip172')" placement="top">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </template>
          <el-input v-model="info.businessName" />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item prop="functionName">
          <template #label>
            {{ $t("system.tip173") }}
            <el-tooltip :content="$t('system.tip174')" placement="top">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </template>
          <el-input v-model="info.functionName" />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item>
          <template #label>
            {{ $t("system.Previousmenu") }}
            <el-tooltip :content="$t('system.tip175')" placement="top">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </template>
          <tree-select
            v-model:value="info.parentMenuId"
            :options="menuOptions"
            :objMap="{
              value: 'menuId',
              label: 'menuName',
              children: 'children',
            }"
            :placeholder="$t('system.tip176')"
          />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item prop="genType">
          <template #label>
            {{ $t("system.tip177") }}
            <el-tooltip :content="$t('system.tip178')" placement="top">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </template>
          <el-radio v-model="info.genType" label="0">
            {{ $t("system.tip179") }}</el-radio
          >
          <el-radio v-model="info.genType" label="1">{{
            $t("system.tip180")
          }}</el-radio>
        </el-form-item>
      </el-col>

      <el-col :span="24" v-if="info.genType == '1'">
        <el-form-item prop="genPath">
          <template #label>
            {{ $t("system.tip180") }}
            <el-tooltip :content="$t('system.tip181')" placement="top">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </template>
          <el-input v-model="info.genPath">
            <template #append>
              <el-dropdown>
                <el-button type="primary">
                  {{ $t("system.tip182") }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="info.genPath = '/'">{{
                      $t("system.tip183")
                    }}</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <template v-if="info.tplCategory == 'tree'">
      <h4 class="form-header">{{ $t("system.otherinformat") }}</h4>
      <el-row v-show="info.tplCategory == 'tree'">
        <el-col :span="12">
          <el-form-item>
            <template #label>
              {{ $t("system.tip184") }}
              <el-tooltip :content="$t('system.tip185')" placement="top">
                <el-icon><question-filled /></el-icon>
              </el-tooltip>
            </template>
            <el-select
              v-model="info.treeCode"
              :placeholder="$t('system.pleaseChoose')"
            >
              <el-option
                v-for="(column, index) in info.columns"
                :key="index"
                :label="column.columnName + '：' + column.columnComment"
                :value="column.columnName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <template #label>
              {{ $t("system.tip187") }}
              <el-tooltip :content="$t('system.tip186')" placement="top">
                <el-icon><question-filled /></el-icon>
              </el-tooltip>
            </template>
            <el-select
              v-model="info.treeParentCode"
              :placeholder="$t('system.pleaseChoose')"
            >
              <el-option
                v-for="(column, index) in info.columns"
                :key="index"
                :label="column.columnName + '：' + column.columnComment"
                :value="column.columnName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <template #label>
              {{ $t("system.tip188") }}
              <el-tooltip :content="$t('system.tip189')" placement="top">
                <el-icon><question-filled /></el-icon>
              </el-tooltip>
            </template>
            <el-select
              v-model="info.treeName"
              :placeholder="$t('system.pleaseChoose')"
            >
              <el-option
                v-for="(column, index) in info.columns"
                :key="index"
                :label="column.columnName + '：' + column.columnComment"
                :value="column.columnName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </template>

    <template v-if="info.tplCategory == 'sub'">
      <h4 class="form-header">{{ $t("system.tip190") }}</h4>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <template #label>
              {{ $t("system.tip191") }}
              <el-tooltip :content="$t('system.tip192')" placement="top">
                <el-icon><question-filled /></el-icon>
              </el-tooltip>
            </template>
            <el-select
              v-model="info.subTableName"
              :placeholder="$t('system.pleaseChoose')"
              @change="subSelectChange"
            >
              <el-option
                v-for="(table, index) in tables"
                :key="index"
                :label="table.tableName + '：' + table.tableComment"
                :value="table.tableName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <template #label>
              {{ $t("system.tip193") }}
              <el-tooltip :content="$t('system.tip194')" placement="top">
                <el-icon><question-filled /></el-icon>
              </el-tooltip>
            </template>
            <el-select
              v-model="info.subTableFkName"
              :placeholder="$t('system.pleaseChoose')"
            >
              <el-option
                v-for="(column, index) in subColumns"
                :key="index"
                :label="column.columnName + '：' + column.columnComment"
                :value="column.columnName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </template>
  </el-form>
</template>

<script setup>
import { listMenu } from "@/api/system/menu";
import i18n from "@/i18n";
const subColumns = ref([]);
const menuOptions = ref([]);
const { proxy } = getCurrentInstance();

const props = defineProps({
  info: {
    type: Object,
    default: null,
  },
  tables: {
    type: Array,
    default: null,
  },
});

// 表单校验
const rules = ref({
  tplCategory: [
    {
      required: true,
      message: i18n.global.t("system.tip195"),
      trigger: "blur",
    },
  ],
  packageName: [
    {
      required: true,
      message: i18n.global.t("system.tip196"),
      trigger: "blur",
    },
  ],
  moduleName: [
    {
      required: true,
      message: i18n.global.t("system.tip197"),
      trigger: "blur",
    },
  ],
  businessName: [
    {
      required: true,
      message: i18n.global.t("system.tip198"),
      trigger: "blur",
    },
  ],
  functionName: [
    {
      required: true,
      message: i18n.global.t("system.tip199"),
      trigger: "blur",
    },
  ],
});
function subSelectChange(value) {
  props.info.subTableFkName = "";
}
function tplSelectChange(value) {
  if (value !== "sub") {
    props.info.subTableName = "";
    props.info.subTableFkName = "";
  }
}
function setSubTableColumns(value) {
  for (var item in props.tables) {
    const name = props.tables[item].tableName;
    if (value === name) {
      subColumns.value = props.tables[item].columns;
      break;
    }
  }
}
/** 查询菜单下拉树结构 */
function getMenuTreeselect() {
  listMenu().then((response) => {
    menuOptions.value = proxy.handleTree(response.data, "menuId");
  });
}

watch(
  () => props.info.subTableName,
  (val) => {
    setSubTableColumns(val);
  }
);

getMenuTreeselect();
</script>
