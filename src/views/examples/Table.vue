<template>
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="Search phrase"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getPosts">Refresh</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">Add</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--Table-->
        <el-table :data="data" highlight-current-row v-loading="listLoading" @selection-change="selectedChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="id" width="80" sortable></el-table-column>
            <el-table-column prop="title" label="title" sortable></el-table-column>
            <el-table-column prop="body" label="body" :formatter="formatBody" sortable></el-table-column>
            <el-table-column label="options" width="150">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">edit</el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--Pagination-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.selected.length===0">Delete selected
            </el-button>
            <el-pagination layout="prev, pager, next" @current-change="handlePageChange" :page-size="pageSize"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!-- Add dialog -->
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
    </section>
</template>

<script>
    import util from '../../common/js/util'
    import errorHandler from '@/api/errorHandler'

    import axios from 'axios'

    import {getUserListPage, removeUser, batchRemoveUser, editUser, addUser, Post} from '@/api/api';

    export default {
        data () {
            return {
                filters: {
                    name: ''
                },
                data: [],
                total: 0,
                page: 1,
                pageSize: 100,
                listLoading: false,
                selected: [],
                editFormVisible: false,
                editLoading: false,
                editFormRules: {},
                editForm: {},
                addFormVisible: false,
                addLoading: false,
                addFormRules: {},
                addForm: {}

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
                this.getPosts();
            },
            getPosts () {
                let params = {
                    page: this.page,
                    name: this.filters.name
                };
                this.listLoading = true;
                Post.query().then(response => {
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
                        this.getPosts();
                    })
                });
            },
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                };
            },
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.editLoading = true;

                        let objCopy = Object.assign({}, this.editForm);

                        Post.put(objCopy.id, objCopy).then((res) => {
                            this.editLoading = false;
                            //NProgress.done();
                            this.$message({
                                message: 'Item was updated',
                                type: 'success'
                            });
                            this.$refs['editForm'].resetFields();
                            this.editFormVisible = false;
                            this.getPosts();
                        });
                    }
                });
            },
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.addForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            addUser(para).then((res) => {
                                this.addLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getPosts();
                            });
                        });
                    }
                });
            },
            selectedChange: function (selected) {
                this.selected = selected;
            },
            batchRemove: function () {
                var ids = this.selected.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {ids: ids};
                    batchRemoveUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getPosts();
                    });
                }).catch(() => {

                });
            }
        },
        mounted () {
            this.getPosts();
        }
    }

</script>

<style scoped>

</style>