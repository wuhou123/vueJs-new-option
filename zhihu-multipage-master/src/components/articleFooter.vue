<template>
<div class="article-footer">
    <a href="javascript:;" class="back-btn"></a>
    <a href="javascript:;"><span class="comment-num" v-html="comments.comments"></span></a>
</div>
</template>

<script>
import axios from 'axios'
import api from '../api/index'
import commonMthods from '../lib/common'

export default {
    props : [
        id,
    ],
    data() {
        return {
            comments,
        }
    },
    mounted : function() {
        let vue = this;
        axios.get('https://zhihu-daily.leanapp.cn/api/v1/contents/extra/' + vue.id ).then(function(data) {
            console.log(data);
            vue.commentsNum = data.DES;
        });
    },

    methods : {
    

    }
}
</script>

<style>
@import '../../css/common.css';
.article-footer {
    display: flex;
    display: -webkit-flex;
    -webkit-justify-content: center;
    -webkit-align-items: center;
    justify-content: center;
    align-items: center;
}




</style>
