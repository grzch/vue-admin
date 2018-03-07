<template>
    <div>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters" @submit.prevent="fetchData">
                <el-form-item>
                    <el-input v-model="filters.q" placeholder="Search phrase"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="fetchData">Search</el-button>
                </el-form-item>
                <el-form-item>
                    <router-link :to="{name: 'Add Post'}">
                        <el-button type="primary">Add</el-button>
                    </router-link>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table :data="data" highlight-current-row v-loading="listLoading" @selection-change="selectedChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="id" width="80" sortable></el-table-column>
            <el-table-column prop="title" label="title" sortable></el-table-column>
            <el-table-column prop="body" label="body" :formatter="formatBody" sortable></el-table-column>
            <el-table-column label="options" width="150">
                <template slot-scope="scope">
                    <router-link :to="{name: 'Edit Post', params: {id: scope.row.id}}">
                        <el-button size="small">
                            edit
                        </el-button>
                    </router-link>
                    <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import {Post} from '@/api/api';
    import errorHandler from '@/api/errorHandler'

    export default {
        data () {
            return {
                filters: {},
                data: [],
                total: 0,
                page: 1,
                pageSize: 100,
                listLoading: false,
                selected: []
            }
        },
        methods: {
            formatBody: function (row, column) {
                if (row.body.length > 50) {
                    return row.body.slice(0, 50) + '...'
                } else {
                    return row.body
                }
            },
            handlePageChange (val) {
                this.page = val;
                this.fetchData();
            },
            fetchData () {
                let params = {
                    page: this.page,
                    ...this.filters
                };
                this.listLoading = true;
                Post.fetch({}, {params}).then(response => {
                    this.data = response.data;
                    if (Array.isArray(this.data)) {
                        this.total = this.data.length;
                    }
                    this.listLoading = false;
                }).catch(errorHandler)
            },
            handleDelete: function (index, row) {
                this.$confirm('Are you sure to delete item?', 'Delete', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    Post.delete(row.id).then((res) => {
                        this.listLoading = false;
                        this.$message({
                            message: 'Item was deleted',
                            type: 'success'
                        });
                        this.fetchData();
                    })
                });
            },
//            handleEdit: function (index, row) {
//                this.editFormVisible = true;
//                this.editForm = Object.assign({}, row);
//            },
//            handleAdd: function () {
//                this.addFormVisible = true;
//                this.addForm = {};
//            },
//            editSubmit: function () {
//                this.$refs.editForm.validate((valid) => {
//                    if (valid) {
//                        this.editLoading = true;
//
//                        let data = Object.assign({}, this.editForm);
//
//                        Post.update(data.id, data).then((res) => {
//                            this.editLoading = false;
//                            //NProgress.done();
//                            this.$message({
//                                message: 'Item was updated',
//                                type: 'success'
//                            });
//                            this.$refs['editForm'].resetFields();
//                            this.editFormVisible = false;
//                            this.fetchData();
//                        });
//                    }
//                });
//            },
//            addSubmit: function () {
//                this.$refs.addForm.validate((valid) => {
//                    if (valid) {
//                        this.addLoading = true;
//
//                        let data = Object.assign({}, this.addForm);
//                        Post.save(data).then((res) => {
//                            this.addLoading = false;
//                            this.$message({
//                                message: 'Item was added',
//                                type: 'success'
//                            });
//                            this.$refs['addForm'].resetFields();
//                            this.addFormVisible = false;
//                            this.fetchData();
//                        });
//                    }
//                });
//            },
            selectedChange: function (selected) {
                this.selected = selected;
            }
        },
        mounted () {
            this.fetchData();
        }
    }
</script>
<style lang="scss" scoped>
</style>