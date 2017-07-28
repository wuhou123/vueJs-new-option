<template>
<div>
    <load :flag="flag"></load>

    <carte v-if="!flag" :showMenu="showMenu" :num="num"></carte >

    <swiper v-if="!flag" swipeId="swipe" :swiperList="swiperList" :autoplay="3000"></swiper>

    <div class="theme-list-box" v-for="x in artList" >
        <p class="list-time">{{x.date.substring(0,4)+"/"+x.date.substring(4,6)+"/"+x.date.substring(6,8)}}</p>
        <a :href="'/module/article.html?id='+ y.id" class="list-con"  v-for="y in x.stories">
            <img :src="y.images[0]" class="list-img" />
            <p class="list-title" v-html="y.title"></p>
        </a>
    </div>

    <loader-more :loading="loading" :cb="getList" :isAjax="isAjax"></loader-more>

</div>
</template>

<script>
import api from '../../api/index'
import common from '../../lib/common'
import swiper from '../../components/swiper'
import loaderMore from '../../components/loaderMore'
import load from '../../components/load'
import carte from '../../components/carte'
import axios from 'axios'

export default {

    data () {
        return {
            flag : true,//loading flag
            artList : [],//文字列表
            swiperList : [],//顶部轮播列表
            count : 1,//请求参数
            loading: false,
            showMenu : true,
            num : '1',
            isAjax : true,
        }
    },

    mounted() {
        this.getList(1);

    },

    methods : {

        // 获取顶部轮播数据以及文章列表数据
        getList(type) {
            var vue = this;
            if ( type ) {
                api.getNews().then(function(data) {
                    vue.swiperList = data.data.top_stories;
                    vue.artList.push(data.data);
                    vue.flag = false;
                    vue.loading = true;
                    console.log( vue.loading );
                });
             } else {
                this.isAjax = false;
                this.count--;
                api.getNewsByDate( vue.getDate(vue.count) ).then(function(data) {
                    vue.artList.push(data.data);
                    vue.loading = true;
                    vue.isAjax = true;
                });
            }
        },

        // 转化时间格式
        getDate(Count) {
            var dd = new Date();
            dd.setDate(dd.getDate() + Count); //获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1; //获取当前月份的日期
            m = m > 10 ? m : "0" + m
            var d = dd.getDate();
            d = d >= 10 ? d : "0" + d;
            return y + "" + m + "" + d;
        }
    },

    components : {
        swiper,
        loaderMore,
        load,
        carte
    }
}
</script>

<style>
@import '../../css/common.css';
.theme-list-box {
    width: 90%;
    z-index: 1;
    position: relative;
    padding-top: 1rem;
    margin: 0 auto;
}
.list-time {
    width: 40%;
    color: #fff;
    padding: 0 2rem;
    font-size: 1.3rem;
    line-height: 2.2rem;
    letter-spacing: 0.1rem;
    border-radius: 1rem;
    text-align: center;
    background-color: #FFD300;
    box-shadow: 0 3px 10px 0 rgba(91,115,146,0.15);
}
.list-con {
    cursor: pointer;
    display: flex;
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 5px;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 3px 10px 0 rgba(91,115,146,0.15);
}
.list-img {
    width: 6rem;
    margin-right: 0.4rem;
}
.list-title {
    width: 16rem;
    font-size: 1.1rem;
    text-align: justify;
    word-break: break-all;
    overflow: hidden;
}
</style>

