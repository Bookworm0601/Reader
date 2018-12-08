<template>
    <div class="ebook">
        <div class="title-wrapper">
            <div class="left">
                <div class="icon-wrapper">
                    <span class="icon-back icon"></span>
                </div>
            </div>
            <div class="right">
                <div class="icon-wrapper">
                    <span class="icon-cart icon"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-person icon"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-more icon"></span>
                </div>
            </div>
        </div>
        <div class="read-wrapper">
            <div id="read">
                <!-- 翻页浮层 -->
                <div class="mask">
                    <div class="left" @click="prevPage"></div>
                    <div class="center"></div>
                    <div class="right" @click="nextPage"></div>
                </div>
            </div>
        </div>
        <div class="menu-wrapper">
            <div class="icon-wrapper">
                <span class="icon-menu icon"></span>
            </div>
            <div class="icon-wrapper">
                <span class="icon-progress icon"></span>
            </div>
            <div class="icon-wrapper">
                <span class="icon-bright icon"></span>
            </div>
            <div class="icon-wrapper">
                <span class="icon-a icon">A</span>
            </div>
        </div>
    </div>
</template>

<script>
import Epub from 'epubjs'
const DOWNLOAD_URL = '/static/196682.epub'
export default {
    methods: {
        // 电子书的解析和渲染
        showEpub(){
            // 生成Ebook(构造参数传入资源地址)
            this.book = new Epub(DOWNLOAD_URL);
            console.log(this.book)
            // 生成Renditon(通过Book.renderTo的方法)
            // read是挂载的元素的id名
            this.renditon = this.book.renderTo('read',{
                width: window.innerWidth,
                height: window.innerHeight
            })
            // 通过Renditon.display渲染电子书
            this.renditon.display();
        },
        prevPage(){
            // 使用this.rendtion对象中的prev方法
            if(this.renditon){
                this.renditon.prev();
            }
        },
        nextPage(){
            // 使用this.rendtion对象中的next方法
            if(this.renditon){
                this.renditon.next();
            }
        }
    },
    mounted(){
        this.showEpub();
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.ebook{
    position: relative;
    .mask{
        position: absolute;
        top:0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 100;
        display: flex;
        .left{
            flex: px2rem(100);
        }
        .center{
            flex: 1;
            
        }
        .right{
            flex: px2rem(100);
        }
    }
    .title-wrapper{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: px2rem(50);
        background: white;
        z-index: 101;
        display: flex;
        box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15);
        .left{
            flex: 0 0 px2rem(40);
            display: flex;
            .icon-wrapper{
                flex: 0 0 px2rem(40);
                @include center;
            }
        }
        .right{
            flex: 1;
            display: flex;
            justify-content: flex-end;
            .icon-wrapper{
                /*
                flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
                建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值
                flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
                flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
                flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。
                浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
                */
                flex: 0 0 px2rem(40);
                @include center;
                .icon-cart{
                    font-size: px2rem(22);
                }
                .icon-person{
                    font-size: px2rem(22);
                }
                .icon-more{
                    font-size: px2rem(22);
                }
            }
        }
    }
    .menu-wrapper{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: px2rem(50);
        display: flex;
        z-index: 101;
        background: white;
        box-shadow: 0 px2rem(-8) px2rem(8) rgba(0,0,0,.15);
        .icon-wrapper{
            flex: 1;
            @include center;
        }
    }
}
</style>
