<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormRules } from 'element-plus';
import { plasticRep } from '@/repositories/PlasticRep';
import { ElNotification } from 'element-plus';
import type { PlasticProps } from '@/models/dataProps';

// Инициализация формы
const form = reactive({
  material: '',
  color: '',
  threadLength: 0,
});

// Список цветов
const allowedColors = ['red', 'blue', 'green', 'yellow', 'black'];

const rules = reactive<FormRules<PlasticProps>>({
  material: [
    { required: true, message: 'Please input coil material', trigger: 'blur' },
  ],
  color: [
    { required: true, message: 'Please select coil color', trigger: 'change' },
  ],
  threadLength: [
    { required: true, message: 'Please input thread length', trigger: 'blur' },
    { type: 'number', message: 'Thread length must be a number', trigger: 'blur' },
  ],
});

const formRef = ref();

const submitForm = async () => {
  if (!formRef.value) return;

  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const { error } = await plasticRep.post(form);
      if (!error) {
        ElNotification({
          message: 'Plastic coil added succesfully!',
          type: 'success',
          customClass: 'message-success',
          duration: 2000,
          position: 'bottom-right',
          showClose: false
        })
        Object.assign(form, { material: '', color: '', threadLength: 0 });
      } else {
        ElNotification({
          message: 'failed to add plastic coil!',
          type: 'error',
          customClass: 'message-error',
          duration: 2000,
          position: 'bottom-right',
          showClose: false
        })
      }
    } else {
      ElNotification({
        message: 'failed to validate!',
        type: 'error',
        customClass: 'message-error',
        duration: 2000,
        position: 'bottom-right',
        showClose: false
      })
    }
  });
};
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="Material" prop="material">
      <el-input v-model="form.material" placeholder="Enter coil material" />
    </el-form-item>

    <el-form-item label="Color" prop="color">
      <el-select v-model="form.color" placeholder="Select a color">
        <el-option v-for="color in allowedColors" :key="color" :label="color" :value="color" />
      </el-select>
    </el-form-item>

    <el-form-item label="Thread Length" prop="threadLength">
      <el-input-number v-model="form.threadLength" placeholder="Enter thread length" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">Add Coil</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.el-form {
  max-width: 380px;
  margin: auto;
}
</style>