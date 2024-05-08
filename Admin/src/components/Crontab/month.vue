<template>
    <el-form size='small'>
        <el-form-item>
            <el-radio v-model='radioValue' :label="1">
                {{ $t('common.mmonthAllowd') }}
            </el-radio>
        </el-form-item>

        <el-form-item>
            <el-radio v-model='radioValue' :label="2">
                {{ $t('common.dateFrom') }}
                <el-input-number v-model='cycle01' :min="1" :max="11" /> -
                <el-input-number v-model='cycle02' :min="cycle01 + 1" :max="12" /> {{ $t('common.month') }}
            </el-radio>
        </el-form-item>

        <el-form-item>
            <el-radio v-model='radioValue' :label="3">
                {{ $t('common.form') }}
                <el-input-number v-model='average01' :min="1" :max="11" /> {{ $t('common.mmonthStartEvery') }}
                <el-input-number v-model='average02' :min="1" :max="12 - average01" /> {{ $t('common.mmonthImplement') }}
            </el-radio>
        </el-form-item>

        <el-form-item>
            <el-radio v-model='radioValue' :label="4">
                指定
                <el-select clearable v-model="checkboxList" placeholder="可多选" multiple :multiple-limit="8">
                    <el-option v-for="item in monthList" :key="item.key" :label="item.value" :value="item.key" />
                </el-select>
            </el-radio>
        </el-form-item>
    </el-form>
</template>

<script setup>
import i18n from "@/i18n";
const emit = defineEmits(['update'])
const props = defineProps({
    cron: {
        type: Object,
        default: {
            second: "*",
            min: "*",
            hour: "*",
            day: "*",
            month: "*",
            week: "?",
            year: "",
        }
    },
    check: {
        type: Function,
        default: () => {
        }
    }
})
const radioValue = ref(1)
const cycle01 = ref(1)
const cycle02 = ref(2)
const average01 = ref(1)
const average02 = ref(1)
const checkboxList = ref([])
const checkCopy = ref([1])
const monthList = ref([
    {key: 1, value: i18n.global.t("common.january")},
    {key: 2, value: i18n.global.t("common.february")},
    {key: 3, value: i18n.global.t("common.march")},
    {key: 4, value: i18n.global.t("common.april")},
    {key: 5, value: i18n.global.t("common.may")},
    {key: 6, value: i18n.global.t("common.june")},
    {key: 7, value: i18n.global.t("common.july")},
    {key: 8, value: i18n.global.t("common.august")},
    {key: 9, value: i18n.global.t("common.september")},
    {key: 10, value: i18n.global.t("common.october")},
    {key: 11, value: i18n.global.t("common.november")},
    {key: 12, value: i18n.global.t("common.december")}
])
const cycleTotal = computed(() => {
    cycle01.value = props.check(cycle01.value, 1, 11)
    cycle02.value = props.check(cycle02.value, cycle01.value + 1, 12)
    return cycle01.value + '-' + cycle02.value
})
const averageTotal = computed(() => {
    average01.value = props.check(average01.value, 1, 11)
    average02.value = props.check(average02.value, 1, 12 - average01.value)
    return average01.value + '/' + average02.value
})
const checkboxString = computed(() => {
    return checkboxList.value.join(',')
})
watch(() => props.cron.month, value => changeRadioValue(value))
watch([radioValue, cycleTotal, averageTotal, checkboxString], () => onRadioChange())
function changeRadioValue(value) {
    if (value === '*') {
        radioValue.value = 1
    } else if (value.indexOf('-') > -1) {
        const indexArr = value.split('-')
        cycle01.value = Number(indexArr[0])
        cycle02.value = Number(indexArr[1])
        radioValue.value = 2
    } else if (value.indexOf('/') > -1) {
        const indexArr = value.split('/')
        average01.value = Number(indexArr[0])
        average02.value = Number(indexArr[1])
        radioValue.value = 3
    } else {
        checkboxList.value = [...new Set(value.split(',').map(item => Number(item)))]
        radioValue.value = 4
    }
}
function onRadioChange() {
    switch (radioValue.value) {
        case 1:
            emit('update', 'month', '*', 'month')
            break
        case 2:
            emit('update', 'month', cycleTotal.value, 'month')
            break
        case 3:
            emit('update', 'month', averageTotal.value, 'month')
            break
        case 4:
            if (checkboxList.value.length === 0) {
                checkboxList.value.push(checkCopy.value[0])
            } else {
                checkCopy.value = checkboxList.value
            }
            emit('update', 'month', checkboxString.value, 'month')
            break
    }
}
</script>

<style lang="scss" scoped>
.el-input-number--small, .el-select, .el-select--small {
    margin: 0 0.2rem;
}
.el-select, .el-select--small {
    width: 18.8rem;
}
</style>