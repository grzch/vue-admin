<template>
    <el-form ref="form" :model="form"
             label-width="100px" @submit.prevent.native="onSubmit"
             style="margin:20px;width:60%;min-width:600px;">
        <el-form-item label="Name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Region">
            <el-select filterable v-model="form.region" placeholder="Select your region">
                <el-option label="EU" value="eu"></el-option>
                <el-option label="US" value="US"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="Dates">
            <el-col :span="11">
                <el-date-picker type="date" placeholder="Date from" v-model="form.date1"
                                style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="Date to" v-model="form.date2"
                                style="width: 100%;"></el-time-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="Confirmation">
            <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="Type of something">
            <el-checkbox-group v-model="form.type">
                <el-checkbox label="Type A"></el-checkbox>
                <el-checkbox label="Type B"></el-checkbox>
                <el-checkbox label="Type C"></el-checkbox>
                <el-checkbox label="Type D"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Radio">
            <el-radio-group v-model="form.resource">
                <el-radio label="Good"></el-radio>
                <el-radio label="Bad"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="Description">
            <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="onSubmit" type="primary" :loading="loading">
                Submit
            </el-button>
            <el-button>Cancel</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        data () {
            return {
                loading: false,
                form: {
                    type: []
                }
            }
        },
        methods: {
            onSubmit () {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    console.log('submit!');
                }, 1000)
            }
        }
    }

</script>