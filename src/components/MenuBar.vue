<template>
    <div class="menu-bar">
        <transition name="slide-up">
            <div class="menu-wrapper" v-show="ifTitleandMenuShow" 
            :class="{'hide-box-shadow':ifsetfontsize || !ifTitleandMenuShow}">
                <div class="icon-wrapper">
                    <span class="icon-menu icon"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-progress icon"  @click="showsetting(2)"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-bright icon" @click="showsetting(1)"></span>
                </div>
                <div class="icon-wrapper" @click="showsetting(0)">
                    <span class="icon-a icon">A</span>
                </div>
            </div>
        </transition>
        <transition name="slide-up">
            <div class="setting-wrapper" v-show="ifsetfontsize">
                <div class="setting-fontsize" v-if="setTag === 0">
                    <div class="preview" :style="{fontSize:fontSizeList[0].fontSize+'px'}">A</div>
                        <div class="select">
                            <div class="select-wrapper" v-for="(item,index) in fontSizeList
                                " :key="index" @click="setFontSize(item.fontSize)">
                                <div class="line"></div>
                                <div class="point-wrapper">
                                    <div class="point" v-show="defaultFontSize === item.fontSize">
                                        <div class="smallpoint">

                                        </div>
                                    </div>
                                </div>
                                <div class="line"></div>
                            </div>
                        </div>
                    <div class="preview" :style="{fontSize:fontSizeList[fontSizeList.length-1].fontSize+'px'}">A</div>
                </div>
                <div class="setting-themestyle" v-else-if="setTag === 1">
                    <div class="setting-themestyle-item" v-for="(item,index) in themesList" :key="index"
                        @click="setThemeStyle(index)">
                        <div class="preview" :style="{background:item.style.body.background}"
                        :class="{'no-border':item.style.body.background !== '#fff'}"></div>
                        <div class="text" :class="{'select':defaultTheme === index}">{{item.name}}</div>
                    </div>
                </div>
                <div class="setting-progress" v-else-if="setTag === 2">
                    <div class="progress-wrapper">
                        <input type="range" class="progress"
                                            max="100"
                                            min="0"
                                            step="1"
                                            @change="onProgressChange($event.target.value)"
                                            @input="onProgressIput($event.target.value)"
                                            :value="progress"
                                            :disabled="!bookAvailable"
                                            ref="progress">

                    </div>
                    <div class="text-wrapper">
                        <span>{{ bookAvailable ? progress + '%' : '加载中...' }}</span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data(){
        return{
            ifsetfontsize:false,
            // 设置切换的标签标记
            setTag:0,
            progress:0        
        }
    },
    methods:{
        showsetting(index){
            this.ifsetfontsize = true;
            this.setTag = index;
        },
        hidefontsetting(){
            this.ifsetfontsize = false;
        },
        setFontSize(fontSize){
            // 将值传给父组件，由父组件中的theme对象去设置电子书的fontsize
            this.$emit('setFontSize',fontSize);
        },
        setThemeStyle(index){
            this.$emit('setThemeStyle',index);
        },
        onProgressChange(progress){
            this.$emit('onProgressChange',progress);
        },
        onProgressIput(progress){
            this.progress = progress;
            this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`;
        }
    },
    props:{
        ifTitleandMenuShow:{
            default:false,
            type:Boolean
        },
        // 声明父组件的fontsize
        fontSizeList:Array,
        // 默认字体大小
        defaultFontSize: Number,
        themesList:Array,
        defaultTheme:Number,
        bookAvailable:Boolean
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global.scss';
.menu-bar{
    .setting-wrapper{
        position: absolute;
        width: 100%;
        height: px2rem(60);
        left: 0;
        bottom: px2rem(50);
        z-index: 101;
        background: white;
        box-shadow: 0 px2rem(-8) px2rem(8) rgba(0,0,0,.15);
        .setting-fontsize{
            display: flex;
            width: 100%;
            height: 100%;
            .preview{
                flex: 0 0 px2rem(35);
                @include center;
            }
            .select{
                 display: flex;
                 flex: 1;
                .select-wrapper{
                    flex: 1;
                    display: flex;
                    // 竖直居中
                    align-items: center;
                    &:first-child{
                        .line{
                            &:first-child{
                                border-top: none;
                            }
                        }
                    };
                    &:last-child{
                        .line{
                            &:last-child{
                                border-top: none;
                            }
                        }
                    }
                    .line{
                        flex: 1;
                        height: 0;
                        border-top: px2rem(1) solid #ccc; 
                    }
                    .point-wrapper{
                        position: relative;
                        width: 0;
                        height: px2rem(8);
                        border-left: px2rem(1) solid #ccc;
                        .point{
                            position: absolute;
                            width: px2rem(15);
                            height: px2rem(15);
                            left: px2rem(-8.5);
                            top: px2rem(-5.5);
                            background-color:white;
                            border-radius: 50%;
                            border: px2rem(1) solid #ccc;
                             box-shadow: 0 px2rem(4) px2rem(4) rgba(0,0,0,.15);
                            @include center;
                            .smallpoint{
                                position: absolute;
                                width: px2rem(4);
                                height: px2rem(4);
                                background-color:black;  
                                border-radius: 50%;
                            }
                        }
                    }
                }
            }
        }
        .setting-themestyle{
            display: flex;
            height: 100%;
            .setting-themestyle-item{
                flex: 1;
                display: flex;
                flex-direction: column;
                padding: px2rem(5) 0 px2rem(5) 0;
                box-sizing: border-box;
                .preview{
                    flex: 1;
                    border: px2rem(1) solid #ccc;
                    &.no-border{
                        border: none;
                    }
                }
                .text{
                    flex: 0 0 px2rem(20);
                    font-size: px2rem(16);
                    color: #333;
                    text-align: center;
                    &.select{
                        font-size: px2rem(18);
                    }
                }
            }
        }
        .setting-progress{
            width: 100%;
            height: 100%;
            .progress-wrapper{
                width: 100%;
                height: 100%;
                @include center;
                padding: 0 px2rem(30);
                box-sizing: border-box;
                .progress{
                    width: 100%;
                    // 清空默认的样式
                    -webkit-appearance: none;
                    height: px2rem(2);
                    background: -webkit-linear-gradient(#999,#999) no-repeat,#ddd;
                    background-size: 0 100%;
                    &:focus{
                        outline: none;
                    }
                    // 手柄样式
                    &::-webkit-slider-thumb{
                        -webkit-appearance: none;
                        height: px2rem(20);
                        width: px2rem(20);
                        border-radius: 50%;
                        background: white;
                        box-shadow: 0 4px 4px rgba(0,0,0,.15);
                        border: px2rem(1) solid #ddd;
                    }
                }
            }
            .text-wrapper{
                    font-size: px2rem(12);
                    @include center;
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
        &.hide-box-shadow{
            box-shadow: none;
        }
        .icon-wrapper{
            flex: 1;
            @include center;
        }
    }
}

</style>
