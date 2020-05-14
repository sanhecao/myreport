<template>
    <div>
        <el-container style="height: 100%">
            <el-header  style="height: 50px; padding: 5px; border-bottom: 1px solid #eee">
                <div style="display: inline-block;">
                    <span class="text">城市</span>
                    <el-select class="selectCity" v-model="city" filterable
                               placeholder="请选择城市" size="mini" clearable
                                @change="changeCity">
                        <el-option
                                v-for="item in CityList"
                                :key="item.CODE"
                                :label="item.City"
                                :value="item.CODE">
                            <span style="float: left">{{ item.City }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.CODE }}</span>
                        </el-option>
                    </el-select>
                    <span class="text">线路</span>
                    <el-select class="selectCity" v-model="route" filterable
                               placeholder="请选择线路" size="mini" clearable>
                        <el-option
                                v-for="item in routeList"
                                :key="item.RouteOrganizeID"
                                :label="item.RouteOrganizeAlias"
                                :value="item.RouteOrganizeID">
                            <span style="float: left">{{ item.RouteOrganizeAlias }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.RouteOrganizeID }}</span>
                        </el-option>
                    </el-select>
                    <span class="text">项目名称</span>
                    <el-input class="building" size="mini" placeholder="请输入项目名称" v-model="buildingname"
                            clearable>
                    </el-input>
                    <el-button class="seach" type="primary" icon="el-icon-search" size="mini"
                             @click="seachInfo">
                        查询
                    </el-button>
                    <download-excel
                            class="downloadexcel"
                            :data = "SelectFramList"
                            :fields = "ExportTitle"
                            name = "filename.xls">
                        <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
                         <el-button type="primary" size="mini" @click="handleExport">导出EXCEL</el-button>
                    </download-excel>
                </div>
            </el-header>
            <el-main style="padding:5px;height: 100%">
                <el-row style="height: 100%" >
                    <el-col :span="6">
                        <mytable :table-data="buildingList" :title-list="buildingTitle"
                        @multipleSelect="buildingSelection"></mytable>
                    </el-col>
                    <el-col :span="1">
                        <div><el-button class="mybutton"  type="primary" size="mini" @click="LoadFramedia">>></el-button></div>
                    </el-col>
                    <el-col :span="9">
                        <mytable :table-data="framediaList" :title-list="framediaTitle"
                                 @multipleSelect="HandFramSelection"></mytable>
                    </el-col>
                    <el-col :span="1" >
                        <div><el-button class="mybutton" size="mini"  type="primary" >>></el-button></div>
                        <div><el-button class="mybutton" size="mini" type="primary"
                                       >
                            清空</el-button></div>
                    </el-col>
                    <el-col :span="7">
                        <mytable :table-data="SelectFramList" :title-list="selectFramTitle"></mytable>
                    </el-col>
                </el-row>
                <div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import mytable from '../components/common/Mytable';
    export default {
        name: "PrintLable",
        components:{
            mytable
        },
        data(){
            return{
                CityList:[],
                routeList:[],
                city:'',
                route:'',
                buildingname:'',
                buildingList:[],
                buildingSelectList:[],
                framediaList:[],
                SelectFramList:[],
                buildingTitle:[{
                     label :'项目名称',
                     prop :'BuildingchsName'
                },{
                    label :'框架3.0数',
                    prop :'BigBoxCount'
                },{
                    label :'框架1.0数',
                    prop :'SmallBoxCount'
                }
                ],
                framediaTitle:[{
                    label :'项目名称',
                    prop :'BuildingChsName'
                },{
                    label :'点位名称',
                    prop :'FramediaName'
                },{
                    label :'尺寸',
                    prop :'type'
                },{
                    label :'点位id',
                    prop :'locationid'
                },{
                    label :'类型',
                    prop :'FViewDisplay'
                }],
                selectFramTitle:[{
                label :'项目名称',
                prop :'BuildingChsName'
            },{
                label :'点位名称',
                prop :'FramediaName'
            },{
                    label :'点位id',
                    prop :'locationid'
                }],
             ExportTitle:{
                 "项目名称":'BuildingChsName',
                 "点位名称":'FramediaName',
                 "点位ID":'locationid'
             }

        }
        },
        mounted() {
            this.$nextTick(() => {
                let param='http://xxxx/printtag/getCityList?UserId=E0025344&CityName=';
               this.getApiData(param,'城市',1);
            });
        },
        methods: {
            seachInfo(){
                console.log(this.city,this.route,this.buildingname);
                let param='http://xxxx/printtag/getProject?CityCode='
                    + this.city+ '&ProjectName=' +this.buildingname
                    + '&RouteOrganizeID='+this.route;
                this.getApiData(param,'项目',3);
                this.framediaList=[];

            },
            changeCity(val){
               // console.log(val)
                if(val === '') {
                    this.routeList=[];
                    return;}
                let param='http://xxxx/printtag/getRouteOrganize?CityCode=' + val;
                this.getApiData(param,'线路',2);
            },
            getApiData(url,msg,type){
                this.$axios.post(url)
                    .then(res=>{
                        let mesg='';
                        if(res.status=== 200){
                            if(res.data.success && res.data.code === "200"){
                                if(type ===1){
                                   this.CityList =res.data.data;
                                } else if (type === 2){
                                   this.routeList = res.data.data;
                                } else if(type === 3){
                                    this.buildingList = res.data.data;
                                    console.log(this.buildingList);
                                }else if(type === 4){
                                    this.framediaList = res.data.data;
                                    console.log('framediaList',this.framediaList);
                                }
                            } else{
                                mesg=msg + '数据:' + res.data.message;
                            }
                        } else{
                            mesg='加载' + msg + '数据失败'
                        }
                        if(mesg !== ''){
                            this.$alert(mesg, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `action: ${ action }`
                                    });
                                }
                            });
                        }
                    });
            },
            buildingSelection(val){
               // console.log(val);
                this.buildingSelectList =val;
            },
            HandFramSelection(val){
               // console.log(val);
                this.SelectFramList =val;
            },
            LoadFramedia(){
                if(this.buildingSelectList.length === 0){
                    this.$alert('请先选择项目!', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `请先选择项目!: ${ action }`
                            });
                        }
                    });
                    return;
                }
                this.framediaList=[];
               // console.log(this.buildingSelectList);
                let buildingLsit = this.buildingSelectList.map((obj)=>{
                    return obj.BuildingNo
                }).join(',');
              //  console.log(buildingLsit);
                let param='http://xxxx/printtag/getFramedia'
                    + '?BuildingNos='+ buildingLsit
                    + '&FramediaNos=&Warning=1&Present=1&iFview=0';
                this.getApiData(param,'点位',4);
            },
            handleExport(){
                if(this.SelectFramList.length <1){
                    alert("请先查询数据")
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
 .text
     font-size 14px
     margin-left 20px
 .selectCity
    margin-left 10px
 .building
     margin-left 10px
     width 150px
 .seach
     margin-left 10px
 .el-col
    height 100%
 .mybutton
     padding 5px
     width 40px
     margin 10px
 .downloadexcel
     display inline-block
     padding 5px
     margin-left 10px
     width 40px
</style>
