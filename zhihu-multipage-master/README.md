知乎日报 
====
这是一个webpack + vue-cli 写的组件化 多页面项目。
本项目中所用的api来自知乎( 知乎Zhihu )， 项目中所有内容的一切权利属于知乎，本项目所有内容及代码仅供私下学习参考，不得作为其他用途。

主要实现功能
-------  
1.日报首页<br/>
2.日报主题列表<br/>
3.日报主题页<br/>
4.日报详情页<br/>
5.日报详情评论列表<br/>

展示界面
-------  
![image](https://github.com/lvpangpang/zhihu/blob/master/static/a%20(1).png)
![image](https://github.com/lvpangpang/zhihu/blob/master/static/a%20(2).png)
![image](https://github.com/lvpangpang/zhihu/blob/master/static/a%20(3).png)
![image](https://github.com/lvpangpang/zhihu/blob/master/static/a%20(4).png)
![image](https://github.com/lvpangpang/zhihu/blob/master/static/a%20(5).png)

技术难点
-------  
网上很多都是用webpack写SPA，本胖之前也用webpack写过一个单页面的知乎日报，这次就想用多页面形式来写。<br/>
发现用组件来写多页面的，貌似比单页面的简单很多（毕竟不用在一张画布上面写所有的东西），但是痛点在于vue-cli默认是单页面的，所有需要我们自己给他转化成多页面。详细请参考webpack.base.conf.js , webpack.dev.conf.js 以及webpack.prod.conf.js

运行
-------
1.下载代码<br/>
2.cd 到当前文件夹<br/>
3.npm install<br/>
4.npm run dev<br/>
5.打开http://localhost:8081/module/index.html 即可访问<br/>






