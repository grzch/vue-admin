<template>
    <div>
        <el-dialog title="Add" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="Title" prop="name">
                    <el-input v-model="addForm.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="body" prop="body">
                    <el-input type="textarea" v-model="addForm.body"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">Add</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>

</script>
<style lang="scss" scoped>
</style>