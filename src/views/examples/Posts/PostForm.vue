<template>
    <div>
        <el-form ref="form" :model="form"
                 v-loading.fullscreen.lock="loading"
                 label-width="100px" @submit.prevent="onSubmit"
                 style="margin:20px;width:60%;min-width:600px;">
            <el-form-item label="Title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="Body">
                <el-input type="textarea" v-model="form.body"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">Submit</el-button>
                <el-button @click.native.prevent>Cancel</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>
<script>
    import {Post} from '@/api/api';

    export default {
        data () {
            return {
                loading: false,
                form: {}
            }
        },
        mounted () {
            this.fetchData()
        },
        methods: {
            fetchData () {
                if (this.$route.params.id) {
                    Post.get(this.$route.params.id).then(response => {
                        this.form = response.data
                    })
                }
            },
            onSubmit () {
                this.loading = true;
                Post.save(this.form).then(response => {
                    this.loading = false;
                    this.$message({
                        message: 'Item was added',
                        type: 'success'
                    });
                })
                console.log('submit!');
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>