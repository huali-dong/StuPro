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
    scroll.on('pullingUp', async () => {
        await handler()
        scroll.finishPullUp() // 解决拉动刷新
        scroll.refresh() // 重新计算
    })
    scroll.on('scroll', () => {
        onscroll(scroll.y)
    })
    return scroll
}
    

export default scroll