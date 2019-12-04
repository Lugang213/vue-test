<template>
  <div>
    <h1>首页</h1>
    <section class="floor-nav" id="floorNavList">
      <ul class="nav-list">
        <li
          class="nav-list-item"
          v-for="(item, index) in floorNav"
          :key="item.id"
          @click="setFloorNavMountClick(index)"
        >{{ item.name }}</li>
      </ul>
    </section>
    <section class="floor-item" v-for="item in floorList" :key="item.id">
      <div class="floor-item-box">
        <h2>{{ item.name }}</h2>
      </div>
    </section>
  </div>
</template>
<script>
var TIMER = null;
export default {
  name: "home",
  data() {
    return {
      floorNav: [
        { id: 1, name: "F1" },
        { id: 2, name: "F2" },
        { id: 3, name: "F3" },
        { id: 4, name: "F4" },
        { id: 5, name: "F5" },
        { id: 6, name: "F6" }
      ],
      floorList: [
        { id: 1, name: "F1" },
        { id: 2, name: "F2" },
        { id: 3, name: "F3" },
        { id: 4, name: "F4" },
        { id: 5, name: "F5" },
        { id: 6, name: "F6" }
      ],
      floorIndex: 1
    };
  },
  methods: {
    /**
     * 页面初始化
     */
    initPage() {
      var _this = this;
      _this.floorSrcollAddEventListener();
    },
    /**
     * 设置楼层导航事件驱动方法
     * @params Number index  楼层下标
     */
    setFloorNavMountClick(index) {
      var _this = this;
      let floor_item = document.getElementsByClassName("floor-item"),
        floor_offsetTop = floor_item[index].offsetTop - floor_item[0].offsetTop,
        window_scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop,
        timer = {
          step: 50,
          times: 20,
          FLOOR_OFFSETTOP: floor_offsetTop
        };
      console.log({ index, offsetTop: timer.FLOOR_OFFSETTOP });
      if (window_scrollTop > floor_offsetTop) {
        _this.setFloorScrollArrowUp(timer);
      } else if (window_scrollTop == floor_offsetTop) {
        return false;
      } else {
        _this.setFloorScrollArrowDown(timer);
      }
    },
    /**
     * 设置楼层向上滚动
     * @params Object timer 定时器配置
     */
    setFloorScrollArrowUp(timer) {
      var _this = this;
      clearInterval(TIMER);
      TIMER = setInterval(() => {
        let window_scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (window_scrollTop <= timer.FLOOR_OFFSETTOP) {
          document.documentElement.scrollTop = timer.FLOOR_OFFSETTOP;
          document.body.scrollTop = timer.FLOOR_OFFSETTOP;
          clearInterval(TIMER);
        } else {
          document.documentElement.scrollTop = window_scrollTop - timer.step;
          document.body.scrollTop = window_scrollTop - timer.step;
        }
      }, timer.times);
    },
    /**
     * 设置楼层向下滚动
     * @params Object timer 定时器配置
     */
    setFloorScrollArrowDown(timer) {
      var _this = this;
      clearInterval(TIMER);
      TIMER = setInterval(() => {
        let window_scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (window_scrollTop >= timer.FLOOR_OFFSETTOP) {
          document.documentElement.scrollTop = timer.FLOOR_OFFSETTOP;
          document.body.scrollTop = timer.FLOOR_OFFSETTOP;
          clearInterval(TIMER);
        } else {
          document.documentElement.scrollTop = window_scrollTop + timer.step;
          document.body.scrollTop = window_scrollTop - timer.step;
        }
      }, timer.times);
    },
    /**
     * 监听窗口滚动楼层导航动态定位
     */
    floorSrcollAddEventListener() {
      var _this = this;
      let nav_item = document
          .getElementById("floorNavList")
          .getElementsByClassName("nav-list-item"),
        floor_item = document.getElementsByClassName("floor-item");
      nav_item[0].className = "nav-list-item active";
      window.onscroll = function() {
        let window_scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        for (let i = 0, len = floor_item.length; i < len; i++) {
          let floor_offsetTop =
            floor_item[i].offsetTop - floor_item[0].offsetTop;
          if (window_scrollTop >= floor_offsetTop) {
            for (let n = 0, len = nav_item.length; n < len; n++) {
              nav_item[n].className =
                "nav-list-item " + (i === n ? "active" : "");
            }
          }
        }
      };
    }
  },
  mounted() {
    this.initPage();
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}
.setaxios {
  width: 1000px;
  margin: 20px auto;
  text-align: right;
}
.setaxios input[type="button"] {
  text-align: center;
}
.floor-nav {
  position: fixed;
  top: 200px;
  left: 50px;
}
.floor-nav .nav-list {
  width: 48px;
  display: inline-block;
  text-align: center;
  background-color: #f8f8f8;
  padding: 0;
}
.floor-nav .nav-list .nav-list-item {
  display: inline-block;
  width: 100%;
  height: 100%;
  line-height: 48px;
  vertical-align: middle;
  align-self: center;
  border-bottom: 1px solid #fff;
  cursor: pointer;
}
.floor-nav .nav-list .nav-list-item.active,
.floor-nav .nav-list .nav-list-item:hover {
  color: #fff;
  background-color: #404040;
}

.floor-item {
  /* width: 1000px; */
  margin: 60px auto;
  min-height: 485px;
  text-align: center;
  color: #fff;
  background-color: #404040;
}
</style>
