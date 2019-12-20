<template>
  <div class="search">
    <div class="container">
      <!-- 头部导航 -->
      <el-menu
        :default-active="activeIndex2"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item><img src="../assets/logo.png" @click="toHome"></el-menu-item>
        <el-menu-item index="1">发现音乐</el-menu-item>
        <el-menu-item index="2">我的音乐</el-menu-item>
        <el-menu-item index="3">朋友</el-menu-item>
        <el-menu-item index="4">商城</el-menu-item>
        <el-menu-item index="5">音乐人</el-menu-item>
        <el-menu-item index="6">下载客户端</el-menu-item>
        <input type="text" class="searchInput" placeholder="音乐/视频/电台" v-model="searchData.keywords" @keyup.enter="toSearch">
        <input type="text" placeholder="创作者中心" disabled class="createHome">
        <el-menu-item><img class="userImg" :src="avatarUrl" @click="layoutHandler" title="退出登录"></el-menu-item>
      </el-menu>
    </div>
    
    <!-- 热门推荐 -->
    <div class="recommended">
      <div class="recommended-content">
        <div class="padding-content">
            <div>
                <el-input></el-input>
            </div>
            <div>搜索{{this.$route.query.keywords}},找到{{singerSongList.songCount}}首歌曲</div>
            <template>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="单曲" name="first">
                        <template>
                            <el-table
                            :data="singerSongList.songs"
                            style="width: 100%">
                            <el-table-column
                                prop="name">
                            </el-table-column>
                            <el-table-column
                                prop="artists[0].name">
                            </el-table-column>
                            <el-table-column
                                prop="album.name">
                            </el-table-column>
                            </el-table>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="歌手" name="second">{{}}</el-tab-pane>
                    <el-tab-pane label="专辑" name="third">角色管理</el-tab-pane>
                    <el-tab-pane label="视频" name="fourth">定时任务补偿</el-tab-pane>
                </el-tabs>
            </template>
        </div>
      </div>
    </div>

    <!-- 页面底部 -->
    <div class="footer">
      <div class="footer-content">
        <div class="copyright">
          <ul class="copyright-ul">
            <li>服务条款</li>
            <li>隐私政策</li>
            <li>儿童隐私政策</li>
            <li>版权投诉指引</li>
            <li>意见反馈</li>
          </ul>
          <div style="color:#666;font-size:12px;"> 网易公司版权所有©1997-2019 杭州乐读科技有限公司运营：浙网文[2018]3506-263号 </div>
          <div style="color:#666;font-size:12px;margin-top:20px;"> 违法和不良信息举报电话：0571-89853516 举报邮箱：ncm5990@163.com </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
    data(){
        return{
            activeName: 'first',
            searchData:{},
            activeIndex: '1',
            activeIndex2: '1',
        }
    },
    computed:{
        ...mapState('home',['singerSongList','avatarUrl'])
    },
    created(){
        let obj = {
            keywords:this.$route.query.keywords,
            limit:40
        }
        this.searchHandler(obj)
    },
    methods:{
        ...mapActions('home',['searchHandler','layout']),

        handleClick(tab) {
            if(tab._props.label == '单曲'){
                let obj = {
                    type:1,
                    keywords:this.$route.query.keywords,
                    limit:40
                }
                this.searchHandler(obj)
            }
            if(tab._props.label == '歌手'){
                let zz = {
                    type:100,
                    keywords:this.$route.query.keywords,
                    limit:10
                }
                this.searchHandler(zz).then((res)=>{
                    console.log(res)
                })
            }
            
        },




        // 退出登录
        layoutHandler(){
            this.layout().then((res)=>{
                this.$router.push({
                path:'/'
                })
            })
        },
        // 回到首页
        toHome(){
            this.$router.push({
                path:'/about'
            })
        },
        toSearch(){}
    }
}
</script>

<style scoped>
  .padding-content{
    margin: 20px 20px;
  }
  .recommended-content{
    width: 980px;
    margin: 0 auto;
    border: 1px solid #ccc;
  }
  /* 用户头像 */
  .userImg{
    height: 30px;
    border-radius: 100%;
    margin-left: -10px;
  }
  /* 页面底部 */
  .copyright-ul{
    list-style: none;
    margin-bottom: 20px;
  }
  .copyright-ul li{
    display: inline-block;
    border-right: 1px solid #999;
    margin-right: 20px;
    padding-right: 20px;
    font-size: 12px;
    color: #999;
  }
  .footer{
    background-color: #f2f2f2;
  }
  .footer-content{
    width: 980px;
    padding: 30px 0;
    height: 200px;
    margin: 0 auto;
  }
  /* 头部导航栏 */
  .container{
    width: 100%;
    background-color: #242424 !important;
  }
  .el-menu--horizontal{
    width: 1100px;
    margin: 0 auto;
  }
  .home .el-menu{
    padding:0 50px !important;
    overflow: hidden;
    position: relative;
  }
  .el-menu,.el-menu-item{
    height: 70px !important;
    background-color: #242424 !important;
    padding:0 18px !important;
  }
  .el-menu-item{
    line-height: 70px !important;
  }
  .el-menu-item:first-child{
    height: 
  }
  .el-menu-item:last-child{
    position: absolute;
    right: 5%;
    top: 0%;
    color: white;
  }
  .el-menu-item:hover{
    color: rgb(255, 208, 75) !important;
  }
  .el-menu .createHome{
    width:80px;
    margin-top: 20px;
    margin-left: 20px;
    border-radius: 20px;
    height: 26px;
    background-color: #333 !important;
    border: 1px solid #ccc;
    color: #ccc;
    text-align: center;
  }
  .el-menu .createHome:hover{
    border: 1px solid white;
    cursor: pointer;
    color: white;
  }
  .searchInput{
    width:140px;
    border: none;
    margin-top: 20px;
    margin-left: 40px;
    text-align: center;
    border-radius: 20px;
    height: 32px;
  }
</style>