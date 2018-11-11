<template>
    <mt-index-list ref="root" id="scroll">
        <mt-index-section 
        v-for="(value,key) in cities"
        :key="key"
        :index="key"
        >
            <mt-cell v-for="item in value"
                :key="item.id"
                :title="item.name"
            ></mt-cell>
        </mt-index-section>
</mt-index-list>
</template>
<script>
import { IndexList, IndexSection, Cell } from "mint-ui";
export default {
  components: {
    [IndexList.name]: IndexList,
    [IndexSection.name]: IndexSection,
    [Cell.name]: Cell
  },
  beforeCreate() {
    this.$http.get("/mz/v4/api/city").then(res => {
      this.city = res.data.data.cities;
    });
  },
  data() {
    return {
      city: []
    };
  },
  mounted() {
      console.log(document.querySelector('#scroll').offsetTop,123)
  },
  computed: {
    cities: function() {
      //定义一个数组，然后将字符串分割，转化为数组
      let arr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      let obj = {};
      //将ABCD放到obj对象的键上面
      arr.forEach(item => {
        obj[item] = [];
      });
      this.city.forEach(item => {
        //根据首字母来判断
        let word = item.pinyin.substr(0, 1);
        obj[word].push(item);
      });
      for (const key in obj) {
        if (!obj[key].length) {
          delete obj[key];
        }
      }
      return obj;
    }
  }
};
</script>
<style lang="scss">
.mint-indexlist {
  margin-top: 0.533333rem;
  .mint-indexlist-content{
      margin-right: 0px !important;
  }
  .mint-indexlist-nav {
    margin-top: 1.9rem;
    border-radius: .133333rem;
    width: 1.066667rem;
    height: 80%;
    background: #7f7f7f;
    opacity: 0.5;
    position: fixed;
    top: 0px;
    right: .4rem;
    z-index: 2;
    overflow: hidden;
    li{
        color: #FFF;
            display: block;
    text-align: center;
    height: 3.7%;
    font-size: .373333rem;
    }
  }
}
</style>
