<template>
    <transition name="slide-right">
        <div class="content">
            <div class="content-wrapper" v-if="bookContentAvailable">
                <div class="content-item" v-for="(item,index) in navigation.toc"
                    :key="index" @click="jumpTo(item.href)">
                    <span class="text">{{item.label}}</span>
                </div>
            </div>
            <div class="empty" v-else>加载中...</div>
        </div>
    </transition>
</template>

<script>
export default {
    methods:{
        jumpTo(href){
            this.$emit('jumpTo',href);
        }
    },
    props:{
        navigation:Object,
        bookContentAvailable:{
            type:Boolean,
            default:false
        },
        ifshowContent:{
            type:Boolean,
            default:false
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global.scss';
.content{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: px2rem(500);
    background: skyblue;
    z-index: 102;
    overflow: auto;
    //   max-height: 450px;
      overflow-y: scroll;
      &::-webkit-scrollbar{
        width:10px;
        height:10px;
      }
      &::-webkit-scrollbar-thumb{
        border-radius: 10px;
         -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.25);
      }
      &::-webkit-scrollbar-button{
        display: none;
      }
      &::-webkit-scrollbar-track{
        display: none;
      }
    .content-wrapper{
        .content-item{
            font-size: px2rem(12);
            padding: px2rem(10) 0 0 px2rem(5);
        }
    }
    .empty{
        font-size: px2rem(12);
        @include center;
    }
}
</style>
