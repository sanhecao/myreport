<template>
    <div class="tablecontent" ref="tableWrapper">
    <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            border
            :height="tableHeight"
            :max-height="tableHeight"
            size="mini"
            fit
            :row-style="{height:'10px'}"
            :cell-style="{padding:'0px'}"
            :header-cell-style="{
               'background-color': '#409EFF',
               'color': '#303133',
               'border-bottom': '1px #DCDFE6 solid'}"
            @selection-change="handleSelectionChange"
         >
        <el-table-column
                type="selection"
                width="40">
        </el-table-column>
        <el-table-column v-for=" item in titleList" :key="item.prop"
                :prop="item.prop"
                :label="item.label"
                show-tooltip-when-overflow
                         min-width ="100"
               >
        </el-table-column>
    </el-table>
    <div class="button-wrapper" style="margin-top: 5px; display: inline;float:left;width: 100%">
        <el-button size="mini" type="primary" @click="toggleSelection(true)">全选</el-button>
        <el-button size="mini" type="primary" @click="toggleSelection(false)">取消选择</el-button>
        <span class="text" v-show="tableData.length>0">一共{{this.tableData.length}}条</span>
    </div>
    </div>
</template>

<script>
    export default {
        props:{
            tableData:{
                type:Array
            },
            titleList:{
                type:Array
            }
        },
        data() {
            return {
                multipleSelection: [],
                tableHeight :250
            }
        },
        computed:{
            // tableHeight(){
            //     return this.$refs.tableWrapper.offsetWidth;
            // }
        },
        mounted(){
            setTimeout(()=>{
            this.tableHeight = window.innerHeight - 180; //window.innerHeight:浏览器的可用高度
                 //   console.log(this.tableHeight)
            }
            ,0);
        },
        methods: {
            toggleSelection(isAll) {
                if (isAll) {
                    this.$refs.multipleTable.toggleAllSelection();
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
             //   console.log(window.innerHeight)
            },
            handleSelectionChange(val) {
                this.multipleSelection =val;
                //console.log('子组件',this.multipleSelection);
                this.$emit('multipleSelect', val);
            },
            // 自定义表头列宽
            flexColumnWidth(str) {
                let flexWidth = 0
                for (const char of str) {
                    if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
                        // 如果是英文字符，为字符分配8个单位宽度
                        flexWidth += 8
                    } else if (char >= '\u4e00' && char <= '\u9fa5') {
                        // 如果是中文字符，为字符分配20个单位宽度
                        flexWidth += 20
                    } else {
                        // 其他种类字符，为字符分配5个单位宽度
                        flexWidth += 5
                    }
                }
                if (flexWidth < 50) {
                    // 设置最小宽度
                    flexWidth = 200
                }
                if (flexWidth > 250) {
                    // 设置最大宽度
                    flexWidth = 250
                }
                return flexWidth + 'px'
            },
        }
    }
</script>
<style lang="stylus">
    /*#header*/
    /*  background-color #8492a6*/
/*.tablecontent*/
/*    position relative*/
/*    .button-wrapper*/
/*       position absolute*/
/*       bottom 0*/
/*       left 0*/
.text
    //padding 0
    margin-left 20px
    font-size 12px
</style>
