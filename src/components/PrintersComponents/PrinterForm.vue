<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="150px" status-icon size="default">
    <el-form-item label="Printer Mark" prop="mark">
      <el-input v-model="ruleForm.mark" placeholder="Enter printer mark" />
    </el-form-item>

    <el-form-item label="Articule" prop="articule">
      <el-input v-model="ruleForm.articule" placeholder="Enter articule" />
    </el-form-item>

    <el-form-item label="Printing Speed (mm/s)" prop="printingSpeed">
      <el-input-number v-model="ruleForm.printingSpeed" :min="1" placeholder="Set speed" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">Create</el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { printerRep } from '@/repositories/PrinterRep'; //
import { ElNotification, type FormInstance, type FormRules } from 'element-plus';


const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  mark: '',
  articule: '',
  printingSpeed: 0,
});

const rules = reactive<FormRules>({
  mark: [
    { required: true, message: 'Please input printer mark', trigger: 'blur' },
  ],
  articule: [
    { required: true, message: 'Please input articule', trigger: 'blur' },
  ],
  printingSpeed: [
    { required: true, message: 'Please input printing speed', trigger: 'blur' },
    { type: 'number', message: 'Printing speed must be a number', trigger: 'blur' },
    { validator: (rule, value) => value > 0, message: 'Speed must be > 0', trigger: 'blur' },
  ],
});

// Методы формы
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  
  await formEl.validate(async (valid) => { 
    if (valid) {
      try {
        const { data, error } = await printerRep.post(ruleForm); 
        
        if (error) {
          ElNotification({
            title: 'Error',
            message: `Error type: ${error}`,
            type: 'error',
          });
        }
        
        if (data) {
          ElNotification({
            title: 'Success',
            message: 'Data submitted successfully',
            type: 'success',
          });
          resetForm(formEl);
        }
      } catch (err) {
        ElNotification({
          title: 'Error',
          message: `Unexpected error: ${err}`,
          type: 'error',
        });
      }
    } else {
      ElNotification({
        title: 'Error',
        message: `Validation failed`,
        type: 'error',
      });
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

</script>