<template>
    <aside class="menu-expanded">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen"
                 @close="handleClose" @select="handleSelect"
                 unique-opened router v-show="!collapsed">
            <template v-for="(item,index) in availableRoutes">
                <el-submenu :index="index+''" v-if="!item.leaf">
                    <template slot="title">
                        <i :class="item.iconCls"></i> {{item.name}}
                    </template>
                    <el-menu-item v-for="child in item.children"
                                  :index="child.path"
                                  :key="child.path"
                                  v-if="!child.hidden">{{child.name}}
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-if="item.leaf && item.children.length > 0"
                              :index="item.children[0].path">
                    <i :class="item.iconCls"></i>{{item.children[0].name}}
                </el-menu-item>
            </template>
        </el-menu>
    </aside>
</template>
<script>
    export default {
        methods: {
            handleOpen () {
            },
            handleClose () {
            },
            handleSelect: function (a, b) {
            }
        },
        computed: {
            availableRoutes () {
                return this.$router.options.routes.filter(route => !route.hidden)
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '~scss_vars';

    .container {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
        .main {
            display: flex;
            position: absolute;
            top: 60px;
            bottom: 0px;
            overflow: hidden;
            aside {
                flex: 0 0 230px;
                width: 230px;
                .el-menu {
                    height: 100%;
                }
            }
            .menu-expanded {
                flex: 0 0 230px;
                width: 230px;
            }
        }
    }
</style>