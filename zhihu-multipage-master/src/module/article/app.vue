<template>
<div class="con">
    <load :flag='!data.body'></load>

    <!-- 文章详情 -->
    <div v-if="data.image" class="con-img">
        <img :src="data.image" />
        <div class="con-img-mask"></div>
        <h2 v-html="data.title"></h2>
    </div>
    <div class="con-answer" @click.prevent="pop($event)" v-html="data.body"></div>

    <!-- 评论 -->
    <div class="article-footer" v-if='data.body'>
        <a href="javascript:history.go(-1);" class="iconfont icon-ic_back"></a>
        <a href="javascript:;" class="thumbs-up"><span class="comment-num" v-html="comments.popularity"></span></a>
        <a href="javascript:;" class="comments" @click="showComments()"><span class="comment-num" v-html="comments.comments"></span></a>
    </div>

    <!-- 评论列表 -->
    <div class="comments-box" :class="{'show-comments-box' : commentsList.length>0}">
        <p class="comments-header">
            <a href="javascript:;" @click="emptyComments()" class="iconfont icon-ic_back"></a>
            <span><span v-html="comments.comments"></span>条短评论</span>
        </p>
        <div class="comments-item-box">
            <div class="comments-item" v-for="data in commentsList">
                <div class="head-box">
                    <img :src="data.avatar">
                </div>
                <div class="comments-main">
                    <p class="nick-name" v-html="data.author"></p>
                    <div class="content" v-html="data.content.substr(0, 50)" ></div>
                    <p class="time" v-html="format(data.time)"></p>
                </div>
                <div class="thumbs-up">
                    <span v-html="data.likes" class="likes"></span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import api from '../../api/index'
import commonMthods from '../../lib/common'
import load from '../../components/load'
import carte from '../../components/carte'

export default {

    data() {
        return {
            id : commonMthods.getUrlPram('id'),
            data : [],
            commentsList : [],
            showMenu : false,
            num : '1',
            comments : {}
        }
    },
    mounted : function() {
        let vue = this;

        api.getNewsById(vue.id).then(function(data) {
            vue.data = data.data;
        });

        api.getComments( vue.id ).then(function(data) {
            console.log(data);
            vue.comments = data.data.DES;
        });

        axios.get('/api/4/story/4232852/short-comments').then(function(data) {
            console.log(data);
        });

    },

    methods : {
    // 跳转到对应的url
        pop(e) {
            let href = e.target.href;
            if ( href ) {
                window.open( href );
            }
        },

        showComments() {
            let vue = this;
            api.getCommentsList( vue.id ).then(function(data) {
                console.log(data.data.COMMENTS.comments)
                vue.commentsList = data.data.COMMENTS.comments;
            });
        },

        emptyComments() {
            this.commentsList = [];
        },

        format(time) {
            var date = new Date(time*1000);
            function two(day) {
                if( day<10 ) {
                    return '0' + day;
                }
                return day;
            }
            return  date.getFullYear()+ '-' + two(date.getMonth()+1) + '-' + 
            two(date.getDate()) + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        }
    },

    components : {
        load,
        carte
    }
}
</script>

<style lang="less" scoped>
@import '../../css/common.css';
@red: #FC4482;
@yellow: #FFD300;
@blue: #5B7492;
@gray: #acb9c8;

.icon-ic_back {
    font-size: 2.8rem;
}

.article-footer {
    position: fixed;
    z-index: 100;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    padding-right: 2rem;
    height: 4rem;
    display: flex;
    display: -webkit-flex;
    -webkit-justify-content: space-around;
    -webkit-align-items: center;
    justify-content: space-around;
    .comment-num {
        position: absolute;
        left: 1rem;
        top: -0.5rem;
        padding: .2rem;
        background-color: #3C8DC4;
        align-items: center;
        color: #fff;
        text-align:center; 
        font-size: 1rem;
    }
    .thumbs-up,
    .comments {
        position: relative;
        width: 2rem;
        height: 2rem;
        background: url(../../../static/dianzan.png) no-repeat center / 2rem 2rem;
    }
    .comments {
        background-image: url(../../../static/comments.png);
    }
}

.comments-box {
    position: fixed;
    z-index: 101;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    transform: translateX(100%);
    transition: transform .3s;
    .comments-item {
        display: flex;
        display: -webkit-flex;
        -webkit-justify-content: space-around;
        -webkit-align-items: center;
        justify-content: space-around;
        align-items: center;
        min-height: 10rem;
        border-bottom: 1px solid #333;
        padding: 0 1.5rem;
    }
    .comments-item:last-child {
        border-bottom: none;
    }
    .comments-item-box {
        padding-top: 15%;
        height: 100%;
        overflow-y: auto;
    }
    .comments-header {
        position: fixed;
        z-index: 102;
        left: 0;
        top: 0;
        width: 100%;
        display: flex;
        display: -webkit-flex;
        -webkit-justify-content: space-between;
        -webkit-align-items: center;
        justify-content: space-between;
        align-items: center;
        height: 8%;
        font-size: 1.4rem;
        padding: 0 1rem;
        background-color: #fff;
        border-bottom: 1px solid #333;
    }
    .head-box {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        overflow: hidden;
    }
    .nick-name {
        font-size: 1.2rem;
    }
    .content {
        margin: .5rem 0;
        font-size: 1rem;
    }
    .comments-main {
        margin: 0 .5rem;
        width: 16rem;
        word-break: break-all;
    }
     .thumbs-up {
        margin-top: -5rem;
        position: relative;
        width: 1.2rem;
        height: 1.2rem;
        background: url(../../../static/dianzan.png) no-repeat center / 1.2rem 1.2rem;
    }
    .likes {
        position: absolute;
        left: 1.6rem;
        top: .2rem;
        font-size: .8rem;
    } 
}

.show-comments-box {
    transform: translateX(0);
}

.con {
    color: #666;
    padding-bottom: 5rem;
    img {
        width: 100%;
    }
    .page-content {
        text-align: center;
    }
    .con-img {
        height: 15rem;
        overflow: hidden;
        position: relative;
        img {
            top: 50%;
            width: 100%;
            position: relative;
            transform: translate(0,-50%);
        }
        h2 {
            width: 60%;
            margin: 0;
            padding: 0;
            right: 5%;
            bottom: 1rem;
            text-align: right;
            font-size: 1.2rem;
            color: rgba(255,255,255,.9);
            position: absolute;
            text-shadow: 0 0 5px rgba(0,0,0,.5);
        }
        &-mask {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(91,116,146,0.50);
            position: absolute;
        }
    }
    .con-answer {
        padding: 5%;
        position: relative;
        font-size: 1rem;
        h2,
        li,
        p {
            text-align: justify!important;
        }
        p {
            margin: .8rem 0;
        }
        h2 {
            color: @blue;
            position: relative;
            z-index: 1;
        }
        a {
            color: @yellow;
            word-break: break-word;
        }
        .headline-title {
            color: @blue;
        }
        .meta {
            text-align: left;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            .avatar {
                vertical-align: middle;
                display: inline-block;
                width: 0.6rem;
                margin-right: 0.1rem;
            }
            span {
                color: #666;
            }
            .author {
                color: @red;
                display: inline-table;
            }
        }
        .content {
            font-size: 1rem;
        }
        .question {
            blockquote {
                text-align: justify;
                position: relative;
                &::before {
                    content: '';
                    left: -.5rem;
                    display: block;
                    height: 100%;
                    border-left: .1rem solid @yellow;
                    position: absolute;
                }
            }
            &:first-child {
                padding-top: 0;
            }
            &:last-child {
                padding-bottom: 0;
                &::before {
                    display: none;
                }
            }
            ul {
                padding-left: 0.3rem;
                li {
                    text-align: left;
                }
            }
        }
        .content-image {
            width:inherit;
            max-width: 100%;
        }
        .view-more {
            text-align: center;
            margin-bottom: .5rem;
            a {
                z-index: 1;
                position: relative;
            }
        }
    }
}
</style>
