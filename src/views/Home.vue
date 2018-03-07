<template>
    <el-row class="container">
        <HeaderComponent></HeaderComponent>
        <el-col :span="24" class="main">
            <SidebarComponent></SidebarComponent>
            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="breadcrumb-container">
                        <strong class="title">{{ $route.name }}</strong>
                        <el-breadcrumb separator="/" class="breadcrumb-inner">
                            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                                {{ item.name }}
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </section>
        </el-col>
    </el-row>
</template>

<script>
    import HeaderComponent from '@/components/HeaderComponent'
    import SidebarComponent from '@/components/SidebarComponent'

    export default {
        data () {
            return {
                collapsed: false
            }
        },
        mounted () {
            console.log(this.$route.matched, 'matched')
        },
        methods: {
        },
        components: {
            HeaderComponent,
            SidebarComponent
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
            .content-container {
                flex: 1;
                overflow-y: scroll;
                padding: 20px;
                .breadcrumb-container {
                    .title {
                        width: 200px;
                        float: left;
                        color: #475669;
                    }
                    .breadcrumb-inner {
                        float: right;
                    }
                }
                .content-wrapper {
                    background-color: #fff;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>