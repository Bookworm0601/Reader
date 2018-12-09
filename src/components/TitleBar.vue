<template>
    <!--  transition 的name是动画前缀-->
    <transition name="slide-down">
        <div class="title-wrapper" v-show="ifTitleandMenuShow">
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
    </transition>    
</template>

<script>
export default {
        props:{
        ifTitleandMenuShow:{
            default:false,
            type:Boolean
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global.scss';
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
</style>
