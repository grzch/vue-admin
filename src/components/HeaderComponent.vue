<template>
    <el-col :span="24" class="header">
        <el-col :span="10" class="logo">
            {{ sysName }}
        </el-col>
        <el-col :span="10">
            <div class="tools"></div>
        </el-col>
        <el-col :span="4" class="userinfo">
            <el-dropdown trigger="hover">
                <span class="el-dropdown-link userinfo-inner">
                    {{ sysUserName }}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>Example link</el-dropdown-item>
                    <el-dropdown-item divided @click.native="logout">Logout</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-col>
</template>
<script>
    export default {
        data () {
            return {
                sysName: 'ADMIN',
                sysUserName: '',
                sysUserAvatar: ''
            }
        },
        methods: {
            logout: function () {
                this.$confirm('Are you sure?', 'Logout', {
                    //type: 'warning'
                }).then(() => {
                    sessionStorage.removeItem('user');
                    this.$router.push('/login');
                }).catch(() => {

                });
            }
        },
        mounted () {
            let user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                this.sysUserName = user.name || 'User';
                this.sysUserAvatar = user.avatar || '';
            }

        }
    }

</script>
<style lang="scss" scoped>
    @import '~scss_vars';

    .container {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
        .header {
            height: 60px;
            line-height: 60px;
            background: $color-primary;
            color: #fff;
            .userinfo {
                text-align: right;
                padding-right: 35px;
                float: right;
                .userinfo-inner {
                    cursor: pointer;
                    color: #fff;
                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 20px;
                        margin: 10px 0px 10px 10px;
                        float: right;
                    }
                }
            }
            .logo {
                height: 60px;
                font-size: 22px;
                padding-left: 20px;
                padding-right: 20px;
                border-color: rgba(238, 241, 146, 0.3);
                border-right-width: 1px;
                border-right-style: solid;
                img {
                    width: 40px;
                    float: left;
                    margin: 10px 10px 10px 18px;
                }
                .txt {
                    color: #fff;
                }
            }
            .logo-width {
                width: 230px;
            }
            .logo-collapse-width {
                width: 60px
            }
            .tools {
                padding: 0px 23px;
                width: 14px;
                height: 60px;
                line-height: 60px;
                cursor: pointer;
            }
        }
    }
</style>