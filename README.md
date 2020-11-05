####  特性
本身其实是单页面 但是为了共用同一套架构 ，便于多人协同开发，而互相不影响，便于统一风格；便于管理

#### has done
基于    webpack 4   babel 8+  本身工具就是高版本的；有利于构建和打包加速
架包： 在原版本的基础上 去除了 无用的，已经没有维护的，我们用不到或者是 极个别用到没有通用性的架包；文件等等。。。留下了一个轻量的纯净的
开发阶段：视图自动刷新到ui页面上（热跟新）   自动打开浏览器； 配置代理解决跨域（因为目前是后端做的跨域，开发联调的时候要修改代码配置 很不好） 有可能报socket 连接失败（没有影响，win10下出现这个问题，后面解决）
编译： es6 ==> es5 按需把高版本语法转为低版本语法（减少 无用的语法）
图片： base64（图片内联；减少请求；加快浏览器显示）  sprites  png
js： cdn   dll加速构建减小vender包   Scope Hoisting(作用域提升)    去除console  gzip压缩（如何需要的话） 压缩空格  生产去掉注释  
框架：vue + vue-router  + vuex + axios  通用的都会用到的包   路由懒加载  组件懒加载
ui： vant + flixelb + vw  rem 布局  （最多2个ui库；最好是风格统一；一个ui库就够；特别的大）
css： sass  压缩
良好的编码习惯 编码风格   

#### 公共部分
除非是每个项目都要用到；否则用请下载静态资源 单独引入 而不会影响其他项目
当你开发公共组件 或者方法的时候； 请保持功能纯净单一；留有可扩展性；不要把业务代码写到公共组件否则后期难以维护；越来越庞大；有极大的可复用性

### 启动
npm run dev app1,app2