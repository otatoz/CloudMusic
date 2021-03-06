import {post,get} from '../../http/axios'
import {setToken,clearToken} from '../../utils/index'
export default {
  namespaced:true,
  state: {
    avatarUrl:{},
    catList:[],
    playListDetail:[],
    musicUrl:'',
    singerSongList:[]
  },
  getters:{
    
  }, 
  mutations: {
    refreshAvatar(state,avatarUrl){
        state.avatarUrl = avatarUrl;
    },
    refreshCatList(state,catList){
      state.catList = catList;
    },
    refreshPlayListDetail(state,playListDetail){
      state.playListDetail = playListDetail;
    },
    refreshUrl(state,musicUrl){
      state.musicUrl = musicUrl;
    },
    refreshSingerSongList(state,singerSongList){
      state.singerSongList = singerSongList
    }
  },
  actions: {
    // 搜索
    async searchHandler(context,params){
      let res = await post('/search',params)
      context.commit('refreshSingerSongList',res.data.result)
      return res
    },


    // 歌单分类
    async catListHandler(context){
      let res = await post('/top/playlist?limit=8&order=new')
      context.commit('refreshCatList',res.data.playlists)
      // console.log(res.data.playlists)
    },

    // 歌单详情
    async playListDetailHandler(context,params){
      let res = await post('/playlist/detail',params)
      context.commit('refreshPlayListDetail',res.data.playlist)
    },

    // 歌曲详情 ---  通过歌曲id获取播放地址url
    async musicUrlHandler(context,params){
      let res = await post('/song/url',params)
      context.commit('refreshUrl',res.data.data[0].url)
    },

    // 邮箱登录
    async emailHandler(context,params){
      let res = await post('/login',params)
      let id = res.data.account.id
      context.dispatch('detail',id)
      setToken(id)
    },
    // 验证验证码
    async checkMessage(context,params){
      let res = await post('/captcha/verify',params)
    },
    // 发送验证码
    async sendMessage(context,params){
      let res = await post('/captcha/sent',params)
    },
    // 手机号登录
    async login(context,params){
      let res = await post('/login/cellphone',params)
      let id = res.data.account.id
      context.dispatch('detail',id)
      setToken(id)
    },
    // 获取用户详情
    async detail(context,uid){
      let res = await post('/user/detail',{uid})
      context.commit('refreshAvatar',res.data.profile.avatarUrl)
    },
    // 退出登录
    async layout(context){
      let res = await post('/logout')
      clearToken()
    }
  }
}
