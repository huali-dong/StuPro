<template>
     <div class="detail-footer">
            <div class="detail-fixed">
                <ul>
                    <li class="bot-list" id="collect">
                        <i class="icon-small"></i>
                        <span>&nbsp;收藏</span>
                    </li>
                    <li class="bot-list" id="edit">
                        <i class="icon-small"></i>
                        <span>&nbsp; 写影评</span>
                    </li>
                    <li class="bot-list " id="buyticket">选座购票</li>
                </ul>
            </div>
        </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
  .detail-footer {
    .detail-fixed {
      border-top: 1px solid #e6e6e6;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      float: left;
      background-color: #fff;
      z-index: 100;
      .bot-list {
        padding: .266667rem 0px;
        float: left;
        text-align: center;
        font-size: .346667rem;
        color: #fff;
      }
      .icon-small {
        display: inline-block;
        width: .453333rem;
        height: .453333rem;
        background-size: cover;
        background-repeat: no-repeat;
        padding-right: 1px;
      }
      #collect {
        color: #3a3a3a;
        width: 25%;
        i {
          background-image: url("http://movie.miguvideo.com/publish/i_www/resource/lovev/miguMovie/images/icon/star-grey.png");
          position: relative;
          top: .053333rem;
          
        }
      }
      #edit{
          width: 25%;
          color: #3a3a3a;
          i{
                  background-image: url("http://movie.miguvideo.com/publish/i_www/resource/lovev/miguMovie/images/icon/edit1.png");
          position: relative;
          top: .053333rem;
          }
      }
      #buyticket{
              padding: 15px 0px 10px;
    display: list-item;
        background-color: #FEC22C;
        width: 50%;
      }
    }
  }
</style>
