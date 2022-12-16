<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <!-- 查询区 -->
    <div class="bg-white padding-tb-m">
      <el-form :model="tableData.form" label-width="120px" :inline="true">
        <el-form-item label="卡密类型">
          <el-select v-model="tableData.form.type" placeholder="请选择类型">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getCodeList">查询</el-button>
          <el-button type="primary" @click="createCodeList">创建卡密</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格区 -->
    <el-table :data="tableData.list" style="width: 100%">
      <el-table-column prop="code" label="卡密" width="180" />
      <el-table-column prop="date" label="创建日期" width="180" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="num" label="数量" />
      <el-table-column prop="isUsed" label="是否使用" />
    </el-table>

    <!-- 创建卡密 -->
    <el-dialog v-model="tableData.dialogVisible" title="创建卡密" width="40%">
      <div>
        <el-form :model="tableData.codeForm" label-width="120px">
          <el-form-item label="卡密类型">
            <el-radio-group v-model="tableData.codeForm.type">
              <el-radio-button :label="1">时间卡</el-radio-button>
              <el-radio-button :label="2">积分卡</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="时间卡类型" v-if="tableData.codeForm.type === 1">
            <el-radio-group v-model="tableData.codeForm.timeType">
              <el-radio-button :label="o.id" :key="o.id" v-for="o in tableData.timeCardList">
                {{ o.name }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="积分" v-if="tableData.codeForm.type === 2">
            <el-input-number v-model="tableData.codeForm.number" />
          </el-form-item>
          <el-form-item label="生成数量(个)">
            <el-input-number v-model="tableData.codeForm.num" :min="1" :max="50" />
          </el-form-item>
          <el-form-item label="确认信息">
            <span style="color: red;">{{ currentCreateText }}</span>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="tableData.dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="tableData.dialogVisible = false">
            生成
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, computed } from "vue";

const tableData = reactive({
  list: [],
  form: {
    type: 1
  },
  codeForm: {
    type: 1,
    timeType: 3,
    number: 50,
    num: 10,
    price: 0
  },
  timeCardList: [
    {
      id: 1,
      name: "天卡"
    },
    {
      id: 2,
      name: "周卡"
    },
    {
      id: 3,
      name: "月卡"
    },
    {
      id: 4,
      name: "年卡"
    },
    {
      id: 5,
      name: "终身卡"
    }
  ],
  dialogVisible: false
});

const currentCreateText = computed(() => {
  if (tableData.codeForm.type === 1) {
    const timeType = tableData.timeCardList.find(
      o => o.id === tableData.codeForm.timeType
    ).name;
    return `将生成 ${tableData.codeForm.num} 张 ${timeType} 预计花费 ${tableData.codeForm.price} 元`;
  }
  return `将生成 ${tableData.codeForm.num} 张积分卡（每张卡有${tableData.codeForm.number}积分）预计花费 ${tableData.codeForm.price} 元`;
});

// 获取卡密列表
const getCodeList = () => { };

// 生产卡密列表
const createCodeList = () => {
  tableData.dialogVisible = true;
};
</script>
