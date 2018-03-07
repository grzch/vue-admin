<template>
    <div>
        <el-dialog title="Edit" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="Title" prop="name">
                    <el-input v-model="editForm.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="body" prop="body">
                    <el-input type="textarea" v-model="editForm.body"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">Submit</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data () {
            return {

            }
        },
        methods: {

        }
    }
</script>
<style lang="scss" scoped>
</style>