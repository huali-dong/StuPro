import BScroll from "better-scroll"

const scroll=({el,handler,onscroll})=>{
    let scroll= new BScroll(el,{
        probeType: 2,
        scrollY:true,
        pullUpLoad: { //配置上拉加载
            threshold: 50 // 距离底部多少距离
        },
        click: true
    })
    scroll.on('pullingUp',  () => {
         handler()
        scroll.finishPullUp() // 解决拉动刷新
    })
    scroll.on('scroll', () => {
        onscroll(scroll.y)
    })
    return scroll
}
    

export default scroll