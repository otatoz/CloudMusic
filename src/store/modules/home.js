import {post,get} from '../../http/axios'
import {setToken,clearToken} from '../../utils/index'
export default {
  namespaced:true,
  state: {
    avatarUrl:{}
  },
  getters:{
    
  }, 
  mutations: {
    refreshAvatar(state,avatarUrl){
        state.avatarUrl = avatarUrl;
    }
  },
  actions: {
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
