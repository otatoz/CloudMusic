<template>
  <div class="home">
    <div class="container">
      <!-- 头部导航 -->
      <el-menu
        :default-active="activeIndex2"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item><img src="../../assets/logo.png" @click="toHome"></el-menu-item>
        <el-menu-item index="1">发现音乐</el-menu-item>
        <el-menu-item index="2">我的音乐</el-menu-item>
        <el-menu-item index="3">朋友</el-menu-item>
        <el-menu-item index="4">商城</el-menu-item>
        <el-menu-item index="5">音乐人</el-menu-item>
        <el-menu-item index="6">下载客户端</el-menu-item>
        <el-input placeholder="音乐/视频/电台"></el-input>
        <input type="text" placeholder="创作者中心" disabled>
        <el-menu-item><img class="userImg" :src="avatarUrl" @click="layoutHandler" title="退出登录"></el-menu-item>
      </el-menu>
    </div>
    
    <!-- 歌单详情 -->
    <div class="recommended">
      <div class="recommended-content">
        <div class="padding-content">
            <div class="listDetails">
                <div class="listDetails_img">
                    <img :src="playListDetail.coverImgUrl" alt="">
                </div>
                <div class="listDetails_right">
                    <div class="listDetails_desc">
                        {{xpf.description}}
                    </div>
                    <div class="listDetails_content">
                      <div class="listDetails_avaUrl">
                          <img :src="xpf.avatarUrl" alt="">
                      </div>
                      <div class="listDetails_nickName">
                          {{xpf.nickname}}
                      </div>
                      <div class="listDetails_createTime">
                          {{playListDetail.createTime}}
                      </div>
                    </div>
                    <div class="listDetails_tag">
                      标签:
                      <el-tag v-for="item in playListDetail.tags" :key="item.id">{{item}}</el-tag>
                    </div>
                </div>
            </div>
            <video id="xpf" class="video-js" :src="urlArr[0]" autoplay controls preload="auto" width="60px" height="70px" type='video/mp4'></video>

            <div class="listSong">
                <template>
                  <el-table
                    :data="playListDetail.tracks"
                    style="width: 100%">
                    <el-table-column
                      prop="name"
                      label="歌曲标题">
                    </el-table-column>
                    
                    <el-table-column
                      prop="ar[0].name"
                      label="歌手">
                    </el-table-column>
                    <el-table-column
                      prop="al.name"
                      label="专辑">
                    </el-table-column>
                    <el-table-column
                      fixed="right"
                      label="操作"
                      width="100">
                      <template slot-scope="scope">
                        <el-button @click="playMusic(scope.row.id)" type="text" size="small">播放</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
            </div>
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
    return {
      xpf:[],
      urlArr:[],
      activeIndex: '1',
      activeIndex2: '1',
    }
  },
  computed:{
    ...mapState('home',['avatarUrl','playListDetail','musicUrl'])
  },
  created(){
      let obj = {
          id:this.$route.query.id
      }
      this.playListDetailHandler(obj).then((res)=>{
          this.xpf = this.playListDetail.creator
      })
  },

  methods:{
    ...mapActions('home',['login','layout','playListDetailHandler','musicUrlHandler']),


    // 播放音乐
    playMusic(item){
      let obj = {
        id:item
      }
      this.musicUrlHandler(obj).then((res)=>{
        this.urlArr = [];
        this.urlArr.push(this.musicUrl)
      })
    },

    // 回到首页
    toHome(){
        this.$router.push({
            path:'/about'
        })
    },
    // 退出登录
    layoutHandler(){
      this.layout().then((res)=>{
        this.$router.push({
          path:'/'
        })
      })
    },
  }
}
</script>

<style scoped>
  .el-tag{
    margin-left: 10px;
    cursor: pointer;
  }
  .el-tag:hover{
    color: #333;
  }
  .listDetails_tag{
    margin-top: 10px;
  }
  .listDetails_desc{
    margin-bottom: 10px;
    display: block;
  }
  .listDetails_avaUrl img{
      height: 40px;
  }
  .listDetails_content{
    height: 40px;
  }
  .listDetails_content div{
    float: left;
  }
  
  .listDetails_createTime{
    margin-top: 10px;
    margin-left: 10px;
  }
  .listDetails_nickName{
    color: blue;
    margin-top: 8px;
    margin-left: 10px;
  }
  .listDetails_right{
      margin-left: 20px;
      position: absolute;
      top:0;
  }
  .listDetails_img,.listDetails_right{
      display: inline-block;
  }
  .listDetails{
    position: relative;
  }
  .listDetails_img img{
      height: 208px;
      width: 208px;
  }
  .padding-content{
    margin: 40px 30px;
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
  .el-menu input{
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
  .el-menu input:hover{
    border: 1px solid white;
    cursor: pointer;
    color: white;
  }
  .el-input{
    width:150px;
    margin-top: 20px;
    margin-left: 50px;
  }
  .el-input >>> .el-input__inner{
    border-radius: 20px !important;
    height: 32px;
  }
</style>