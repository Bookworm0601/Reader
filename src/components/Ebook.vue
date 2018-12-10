<template>
    <div class="ebook">
        <TitleBar :ifTitleandMenuShow="ifTitleandMenuShow"></TitleBar>    
        <div class="read-wrapper">
            <div id="read">
                <!-- 翻页浮层 -->
                <div class="mask">
                    <div class="left" @click="prevPage"></div>
                    <div class="center" @click="toggleTitleAndMenu"></div>
                    <div class="right" @click="nextPage"></div>
                </div>
            </div>
        </div>
        <MenuBar :ifTitleandMenuShow="ifTitleandMenuShow"
                 :fontSizeList="fontSizeList"
                 :defaultFontSize="defaultFontSize"
                 @setFontSize="setFontSize"
                 @setThemeStyle="setThemeStyle"
                 :defaultTheme="defaultTheme"
                 :themesList="themesList"
                 :bookAvailable="bookAvailable"
                 @onProgressChange="onProgressChange"
                 :navigation="navigation"
                 @jumpTo="jumpTo"
                 :bookContentAvailable="bookContentAvailable"
            ref="MenuBar"></MenuBar>
    </div>
</template>

<script>
import Epub from 'epubjs'
import TitleBar from './TitleBar.vue'
import MenuBar from './MenuBar.vue'
const DOWNLOAD_URL = '/static/196682.epub'
export default {
    data() {
        return {
            // 是否显示标题栏和菜单栏flag
            ifTitleandMenuShow: false,
            // 声明字体大小
            fontSizeList:[
                {fontSize : 12},
                {fontSize : 14},
                {fontSize : 16},
                {fontSize : 18},
                {fontSize : 20},
                {fontSize : 22},
                {fontSize : 24}
            ],
            // 默认的字体大小
            defaultFontSize: 16,
            // 声明主题
            themesList:[
                {
                    name: 'default',
                    style: {
                        body:{
                            'color': '#000','background':'#fff'
                        }
                    }
                },
                {
                    name: 'eye',
                    style: {
                        body:{
                            'color': '#000','background':'#ceeaba'
                        }
                    }
                },
                {
                    name: 'night',
                    style: {
                        body:{
                            'color': '#fff','background':'#000'
                        }
                    }
                },
                {
                    name: 'gold',
                    style: {
                        body:{
                            'color': '#000','background':'rgb(241,236,226)'
                        }
                    }
                },
            ],
            // 默认的主题
            defaultTheme: 0,
            bookAvailable: false,
            navigation:{},
            bookContentAvailable: false
        }
    },
    methods: {
        // 目录跳转
        jumpTo(href){
            this.renditon.display(href);
            this.hideTitleAndMenu();
        },
        hideTitleAndMenu(){
            // 隐藏上下边栏
            this.ifTitleandMenuShow = false;
            // 隐藏设置栏
            this.$refs.MenuBar.hidefontsetting();
            // 隐藏目录栏
            this.$refs.MenuBar.hideContent();
            
        },
        // progress 进度条的数值 (0-100)
        onProgressChange(progress){
            const percentage = progress / 100;
            const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
            this.renditon.display(location);
        },
        registerThemeStyle(){
            if(this.themes){
                this.themesList.forEach((item)=>{
                    // 注册主题
                    this.themes.register(item.name,item.style);
                })
            }
        },
        setThemeStyle(index){
            // 设置主题
            this.themes.select(this.themesList[index].name);
            this.defaultTheme = index;
        },
        setFontSize(fontSize){
            // 先修改默认样式
            this.defaultFontSize = fontSize;
            if(this.themes){
                this.themes.fontSize(fontSize+'px');
            }
        },
        // 电子书的解析和渲染
        showEpub(){
            // 生成Ebook(构造参数传入资源地址)
            this.book = new Epub(DOWNLOAD_URL);
            // 生成Renditon(通过Book.renderTo的方法)
            // read是挂载的元素的id名
            this.renditon = this.book.renderTo('read',{
                width: window.innerWidth,
                height: window.innerHeight
            })
            // 通过Renditon.display渲染电子书
            this.renditon.display();

            // 获取theme对象
            this.themes = this.renditon.themes;

            // 设置默认字体
            this.themes.fontSize(this.defaultFontSize + 'px');

            // 注册主题
            this.registerThemeStyle();

            // 选取主题
            // this.themes.select('eye');
            this.themes.select(this.themesList[this.defaultTheme].name);

            // 获取locations对象
            // 通过epubjs的钩子函数来实现
            this.book.ready.then(()=>{
                this.navigation = this.book.navigation;
                if(this.navigation){
                    this.bookContentAvailable = true;
                }
                return this.book.locations.generate();
            }).then(result=>{
                this.locations = this.book.locations;
                this.bookAvailable = true;
            })
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
        },
        toggleTitleAndMenu(){
            this.ifTitleandMenuShow = !this.ifTitleandMenuShow;
            if(!this.ifTitleandMenuShow)
            // $refs直接对dom进行选择操作，起先要在标签中申明
            this.$refs.MenuBar.hidefontsetting();
        }
    },
    components:{
        TitleBar,
        MenuBar
    },
    mounted(){
        this.showEpub();
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global.scss';
.ebook{
    position: relative;
    overflow: hidden;
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
}
</style>
