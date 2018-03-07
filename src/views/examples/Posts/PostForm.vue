<template>
    <div>
        <el-form ref="form" :model="form"
                 label-width="100px" @submit.prevent.native="onSubmit"
                 style="margin:20px;width:60%;min-width:600px;">
            <el-form-item label="Title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="Body">
                <el-input type="textarea" v-model="form.body"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSubmit" type="primary" :loading="loading">
                    Submit
                </el-button>
                <router-link :to="listRoute">
                    <el-button>Cancel</el-button>
                </router-link>
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
                listRoute: {name: 'Posts List'},
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
                const id = this.$route.params.id
                const service = id ? Post.update(id, this.form) : Post.save(this.form)
                service.then(response => {
                    this.loading = false;
                    this.$message({
                        message: 'Item was added',
                        type: 'success'
                    });
                    this.$router.push(this.listRoute)
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>