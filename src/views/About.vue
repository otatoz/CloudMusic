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
        <el-menu-item><img src="../assets/logo.png" alt=""></el-menu-item>
        <el-menu-item index="1">发现音乐</el-menu-item>
        <el-menu-item index="2">我的音乐</el-menu-item>
        <el-menu-item index="3">朋友</el-menu-item>
        <el-menu-item index="4">商城</el-menu-item>
        <el-menu-item index="5">音乐人</el-menu-item>
        <el-menu-item index="6">下载客户端</el-menu-item>
        <el-input placeholder="音乐/视频/电台"></el-input>
        <input type="text" placeholder="创作者中心" disabled>
        <el-menu-item><img class="userImg" :src="avatarUrl" @click="layoutHandler"></el-menu-item>
      </el-menu>
    </div>
    {{catList.sub[0]}}
    <!-- 轮播图 -->
    <div class="imgContent">
      <template>
        <el-carousel :interval="5000" arrow="always" type='card'>
          <el-carousel-item v-for="item in imgSrc" :key="item.id">
            <img :src="item.src" alt="">
          </el-carousel-item>
        </el-carousel>
      </template>
    </div>

    <!-- 热门推荐 -->
    <div class="recommended">
      <div class="recommended-content">
        <div class="padding-content">
          <!-- 导航 -->
          <ul class="content-nav">
            <li>新歌推荐</li>
            <li>华语</li>
            <li>流行</li>
            <li>摇滚</li>
            <li>民谣</li>
            <li>电子</li>
          </ul>
          <!-- 新歌推荐 -->
          <div class="content-card">
            <el-row>
              <el-col :span="8" v-for="(item, index) in recommendImg" :key="index">
                <el-card :body-style="{ padding: '10px 40px' }">
                  <img :src="item.src" class="image">
                  <div style="padding: 14px 0;">
                    <div class="bottom clearfix">
                      <time class="time">最新华语音乐推荐</time>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>

          <ul class="content-nav">
            <li>榜单</li>
          </ul>
          <!-- 榜单 -->
          <div class="sourceList">
            <div class="sourceList-content" v-for="item in sourceList" :key="item.id">
              <ul class="sourceList-ul">
                <li>
                  <img :src="item.src" alt="">
                  <div v-for="i in xpf" :key="i.id">{{i.name}}</div>
                </li>
              </ul>
            </div>
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
      loginData:{},
      dialogFormVisible:false,
      dialogVisible: false,
      xpf:[{
        id:1,
        name:'xpf'
      },{
        id:2,
        name:'111'
      }],
      sourceList:[{
        id:1,
        src:'http://p3.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=100y100'
      },{
        id:2,
        src:'http://p3.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=100y100'
      },{
        id:3,
        src:'http://p4.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=100y100'
      }],
      currentDate: new Date(),
      activeIndex: '1',
      activeIndex2: '1',
      recommendImg:[{
        id:1,
        src:'http://p2.music.126.net/ssO1XbmwRdj_VKkf800MZA==/109951164554007381.jpg?param=140y140'
      },{
        id:2,
        src:'http://p2.music.126.net/5FjM_OwIt4niobbXNz4Euw==/109951164455659379.jpg?param=140y140'
      },{
        id:3,
        src:'http://p2.music.126.net/2MsstS-M9w5-li0aRy3sUQ==/1380986606815861.jpg?param=140y140'
      },{
        id:4,
        src:'http://p2.music.126.net/ssO1XbmwRdj_VKkf800MZA==/109951164554007381.jpg?param=140y140'
      }],
      imgSrc:[{
        id:1,
        src:'http://p1.music.126.net/NUf73hqWIOSrtuk4OFXg0Q==/109951164552865106.jpg?imageView&quality=89'
      },{
        id:2,
        src:'http://p1.music.126.net/AMrgPAOCgaprpCx1k1Of2Q==/109951164551422222.jpg?imageView&quality=89'
      },{
        id:3,
        src:'http://p1.music.126.net/Lzx7nu1mE7WU0X86iuhFxA==/109951164552630162.jpg?imageView&quality=89'
      },{
        id:4,
        src:'http://p1.music.126.net/ummKlZYiCFZ0dajwydnfBA==/109951164551583875.jpg?imageView&quality=89'
      }],
    }
  },
  computed:{
    ...mapState('home',['avatarUrl','catList'])
  },
  created(){
    // 歌单分类
    this.catListHandler()
  },
  methods:{
    ...mapActions('home',['login','layout','catListHandler']),
   




    // 退出登录
    layoutHandler(){
      this.layout().then((res)=>{
        this.$router.push({
          path:'/'
        })
      })
    },
    
    // 登录模态框切换
    backToLogin(){
      this.dialogVisible = true;
      this.dialogFormVisible = false;
    },
    phoneLoginHandler(){
      this.dialogFormVisible = true;
      this.dialogVisible = false;
    },
    showLoginModal(){
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.dialogVisible = false;
    }
  }
}
</script>

<style scoped>
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
  /* 榜单 */
  .sourceList-content{
    padding:10px 20px;
    box-sizing: border-box;
    width: 310px;
    display: inline-block;
  }
  .sourceList-ul{
    list-style: none;
  }
  .sourceList{
    border: 1px solid #ccc;
    margin-top: 20px;
  }

  /* 推荐 */
  .content-card{
    margin-bottom: 40px;
  }
  .el-col{
    width:220px;
    margin-left: 8px;
    margin-right: 5px;
  }
  .content-nav{
    height: 30px;
    line-height: 20px;
    width: 940px;
    border-bottom: 2px solid red;
  }
  .content-nav li {
    float: left;
    list-style: none;
    font-size: 14px;
    height: 20px;
    border-right: 1px solid #333;
    padding:0 30px;
  }
  .content-nav li:last-child{
    border: none;
  }
  .content-nav li:first-child{
    font-size: 22px;
    border: none;
  }
  .padding-content{
    margin: 20px 20px;
  }
  .recommended-content{
    width: 980px;
    margin: 0 auto;
    border: 1px solid #ccc;
  }
  /* 轮播图 */
  .imgContent{
    background-color:rgba(0,0,0,0.5);
  }
  .el-carousel{
    width: 982px;
    margin: 0 auto;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
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
