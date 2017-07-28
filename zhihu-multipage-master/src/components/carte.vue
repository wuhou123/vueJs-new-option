<template>
    <div>
        <div class="header">
            <i  v-if="showMenu" class="iconfont icon-ic_menu" @click="showCarte()"></i>
            <i v-else  class="iconfont icon-ic_back" @click="back()"></i>
        </div>

        <!-- 菜单栏列表 -->
        <aside class="aside" :class="{open : open , block : block}" @click="showCarte()">
            <ul>
                <li :class="{ chose: num == 1 }">
                    <a href="/module/index.html">
                        <span>首页</span>
                        <i class="iconfont icon-ic_star" :class="{'iconcolor' : num == 1}"></i>
                    </a>
                </li>
                <li :class="{ chose: num == x.id}" v-for="( x, index ) in carteList">
                    <a :href="'/module/theme.html?id=' + x.id ">
                        <span v-html="x.name"></span>
                        <i class="iconfont icon-ic_star" :class="{'iconcolor' : num == x.id }"></i>
                    </a>
                </li>
            </ul>
            <!-- 遮罩层 -->
            <div class="cover" @touchmove="prevent"></div>
        </aside>
    </div>
</template>

<script>
import api from '../api/index'
export default {
    data () {
        return {
            carteList : [],
            open : false,
            block : false
        }
    },

    props : {

        num : {
            type : String,
            default : 1
        },

        showMenu : {
            type : Boolean,
            default : false
        },


    },

    mounted() {
        let vue = this;
        // 获取左边栏类目数据
        api.getTopics().then(function(data) {
            vue.carteList = data.data.others;
        });

    },

    methods : {
        prevent(event) {
            event.preventDefault();
            event.stopPropagation();
        },

        showCarte () {
            let vue = this;
            if ( !this.open ) {
                this.block = true;
                setTimeout(() => {
                    vue.open = true;
                }, 0);
            } else {
                this.open = false;
                setTimeout(() => {
                    vue.block = false;
                }, 300);
            }
        },

        back() {
            window.history.back();
        }
    }
}
</script>

<style lang="less">
    .header {
        width: 100%;
        height: 4rem;
        z-index: 9;
        padding-left: 5%;
        position: fixed;
        background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.51) 95%);
        .iconfont {
            color: #fff;
            font-size: 2.8rem;
            top: 20%;
            position: relative;
        }
    }

    .aside {
        display: none;
        z-index: 11;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        position: fixed;
        &::-webkit-scrollbar {
            display: none!important;
            width: 0!important;
            height: 0!important;
            -webkit-appearance: none;
            opacity: 0!important;
        }
        ul {
            margin: 0;
            float: left;
            width: 60%;
            height: 100%;
            padding: 4rem 1rem 1rem;
            overflow: auto;
            background: rgba(91, 116, 146, 0.75);
            transform: translate(-100%, 0);
            transition: transform 0.3s ease;
            -webkit-overflow-scrolling: touch;
            &::-webkit-scrollbar {
                display: none!important;
                width: 0!important;
                height: 0!important;
                -webkit-appearance: none;
                opacity: 0!important;
            }
        }
        li {
            cursor: pointer;
            font-size: 1.1rem;
            list-style: none;
            color: #fff;
            margin-top: 20px;
            .iconfont {
                float: right;
                font-size: 2rem;
            }
            &.chose {
                color: #FFD300;
            }
        }
        a {
            color : #fff;
        }
        .chose a {
            display : block;
            color : #FFD300;
        }
        .cover {
            width: 100%;
            height: 100%;
            opacity: 0;
            display: none;
            background: rgba(172, 185, 201, 0.40);
            transition: opacity 0.3s ease;
        }
        &.open {
            display: block;
            ul {
                transform: translate(0);
            }
            .cover {
                opacity: 1;
                display: block;
            }
        }
        &.block {
            display: block;
        }
    }

    .circle {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.80);
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
        right: 5%;
        bottom: 5vw;
        position: fixed;
        z-index: 10;
        i {
            top: 50%;
            left: 50%;
            font-size: 0.6rem;
            color: #ACB9C9;
            transform: translate(-50%, -50%);
            position: absolute;
        }
    }

    @media screen and (min-width: 640px) {
        .app-view {
            width: 640px;
            left: 50%;
            transform: translate(-50%, 0);
        }
        .aside ul {
            width: 350px;
        }
    }
</style>