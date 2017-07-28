<template>
<div>
    <load :flag="flag"></load>

    <carte v-if="!flag" :showMenu="showMenu" :num="num"></carte >

    <div class="theme" v-if="!flag">
        <img :src="list.image" />
        <div></div>
        <h3>
            <p v-html="list.description"></p>
            <P v-html="list.name"></P>
        </h3>
    </div>

    <div class="list" v-if="!flag">
        <a :href="'/module/article.html?id='+ y.id" class="list-con"   v-for="y in list.stories">
            <img v-if="y.images" :src="y.images[0]" class="list-img"/>
            <p v-html="y.title" class="list-title"></p>
        </a>
    </div>

</div>
</template>

<script>
import api from '../../api/index'
import commonMthods from '../../lib/common'
import load from '../../components/load'
import carte from '../../components/carte'

export default {

    data () {
        return {
            flag : true,//loading flag
            list : '',
            showMenu : true,
            num : commonMthods.getUrlPram('id')
        }
    },

    mounted() {
        this.getList();
    },

    methods : {

        getList() {
            let vue = this;
            this.list = '';
            api.getTopicsById(vue.num).then(function(data) {
                vue.list = data.data;
                console.log(vue.list);
                vue.flag = false;

            });
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

@yellow: #FFD300;
@blue: #5B7492;
@gray: #acb9c8;
.theme {
    height: 15rem;
    position: relative;
    overflow: hidden;
    div {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.4;
        position: absolute;
        background-color: @blue;
    }
    img {
        max-width: 100%;
        height: 100%;
    }
    h3,p{
        margin: 0;
    }
    h3 {
        width: 70%;
        color: #fff;
        font-size: 1.2rem;
        line-height: 2rem;
        right: 5%;
        bottom: 1.5rem;
        text-align: right;
        position: absolute;
        text-shadow: 1px 1px 10px rgba(0, 0, 0, .5);
        p:first-child {
            position: relative;
            margin-bottom: 1rem;
            &:before {
                content: "";
                width: 8rem;
                bottom: -.3rem;
                right: 0;
                display: block;
                position: absolute;
                border: 2px solid @yellow;
            }
        }

    }
}
.list {
    margin-top: -.5rem;
    padding-bottom: 1rem;
}

.list-con {
    width:90%;
    margin: 0 auto;
    min-height: 8rem;
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
    font-size: 1.2rem;
    text-align: justify;
    word-break: break-all;
}
</style>


