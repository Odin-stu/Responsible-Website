const  headerEl=document.querySelector("header");
const scrollToTop = document.querySelector(".scrollToTop");

window.addEventListener("scroll" , () => {
    let height = headerEl.getBoundingClientRect().height;

    if(window.pageYOffset - height > 600){
        if(!headerEl.classList.contains("sticky")) {
            headerEl.classList.add("sticky");
        } 
    } else {
        headerEl.classList.remove("sticky");
    }

    if(window.pageYOffset > 2000) {
        scrollToTop.style.display = "block";
    } else {
        scrollToTop.style.display = "none";
    }
})

const glide = new Glide(".glide");      //类名为glide作为轮播组件
const captionsEl = document.querySelectorAll(".slide-caption");

//当轮播加载的时候把标题加载出来
glide.on(["mount.after" , "run.after"] , () => {  //mount加载后,run轮播后
    const caption = captionsEl[glide.index]; //获取轮播的实例[获取能看到的轮播的下标]
    anime({
        targets:caption.children,               //对谁进行下面的动画
        opacity:[0 , 1],                            //从零到一
        duration:400,                           //动画执行时间：400ms
        easing:"linear",                          //动画执行函数：线性的
        delay:anime.stagger(400,{strat:300}),  //(start:300，h1在300ms之后播放)当h1出现后，过400ms，出现h3，以此类推...
        translateY:[anime.stagger([40,10]),0]  //h1向下移动距离最大:40,剩下的移动是40-10之间的数字,按钮向下移动:10
    });
});

//轮播之前透明度设置为0,这样每次轮播都会有动画
glide.on("run.before",() => {
    document.querySelectorAll(".slide-caption > * ").forEach(el => {
        el.style.opacity = 0;
    });
});

glide.mount();      //将glide的轮播组件加载好


// about us功能区
const isotope = new Isotope(".cases" , {
    layoutMode:"fitRows",        //行模式布局，将每一行占满再换下一行
    itemSelector:".case-item"   //将case-item按照firRows模式去布局
});



// 成功案例功能区
const filterBtns = document.querySelector(".filter-btns");      //给筛选按钮的容器设置监听事件,每个按钮点击的时候也会被点击到

filterBtns.addEventListener("click", e => {        //监听click鼠标点击事件
    let { target }  = e;                                //获取event target属性,哪一个按钮被点击
    const filterOption = target.getAttribute("data-filter");
    if(filterOption){                               //如果有按钮被点中
        document
            .querySelectorAll(".filter-btn.active")
            .forEach(btn => btn.classList.remove("active")); 
        target.classList.add("active");
        //将其他按钮active的取消，再将我们点中的按钮加上active

        isotope.arrange({filter:filterOption});
    }
});

const staggeringOption = {
    delay:300,
    distance:"50px",
    duration:500,
    easing:"ease-in-out",
    origin:"bottom"
}

ScrollReveal().reveal(".feature" , { ...staggeringOption,interval:350});
ScrollReveal().reveal(".service-item" , { ...staggeringOption,interval:350});


const dataSectionEl = document.querySelector(".data-section");
ScrollReveal().reveal(".data-section" , { 
    beforeReveal: () => {
        anime({
            targets:".data-piece .num",     //对data-piece下面的num进行动画
            innerHTML:el => {
                return[0,el.innerHTML];
            },
            duration:2000,      //持续时间2000毫秒
            round:1,            //逐渐按加1增长
            easing:"easeInExpo" //动画越来越快
        });
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom / 5}px)`;
    }
});


window.addEventListener("scroll" , () => {
    const bottom = dataSectionEl.getBoundingClientRect().bottom;
    const top = dataSectionEl.getBoundingClientRect().top;

    if(bottom >= 0 && top <= window.innerHeight) {      //这里是浏览器的可见范围
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom / 5}px)`;
    }
});

const scroll = new SmoothScroll('nav a[href*="#"],.scrollToTop a[href*="#"]',{
    header:"header",
    offset:80        //当滚动至此时,多余滚动80像素
});

document.addEventListener("scrollStart", () => {
    if(headerEl.classList.contains("open")){
        headerEl.classList.remove("open");
    }
});

const exploreBtnEls = document.querySelectorAll(".explore-btn");

exploreBtnEls.forEach(exploreBtnEl => {
    exploreBtnEl.addEventListener("click" , () => {
        scroll.animateScroll(document.querySelector("#about-us"));
    });
});


//折叠按钮
const bugerEl = document.querySelector(".burger");
bugerEl.addEventListener("click",() => {
    headerEl.classList.toggle("open");
})