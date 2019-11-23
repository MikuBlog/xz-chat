<template>
  <el-drawer title :visible.sync="drawer" :direction="direction" :show-close="false" size="350px">
    <div style="padding: 0 10px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="界面设置" name="界面设置">
          <div style="color: #777; margin: .5rem 0">聊天背景：</div>
          <el-image style="width: 100%; height: 159px" :src="backgroundUrl" fit="cover" ref="image"></el-image>
          <div style="color: #777; margin: .5rem 0">透明度：</div>
          <el-slider style="margin: 0 .7rem" v-model="opacity" :format-tooltip="formatTooltip" @change="getVal"></el-slider>
          <div style="color: #777; margin: .5rem 0">遮罩浓度：</div>
          <el-slider style="margin: 0 .7rem" v-model="mask" :format-tooltip="formatTooltip" @change="getVal"></el-slider>
          <div class="button-box">
            <div class="button" style="margin-top: 2rem">
              <el-button type="primary" style="width: 100%" @click="selectPic">选择图片</el-button>
            </div>
            <div class="button">
              <el-button type="success" style="width: 100%" @click="useBg">应用背景</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      direction: "rtl",
      activeName: "界面设置",
      backgroundUrl: this.$getMemoryPmt("chatBackground") || "",
      opacity: this.$getMemoryPmt("chatBackgroundOpacity") || 100,
      mask: this.$getMemoryPmt("chatBackgroundMask") || 0,
    };
  },
  mounted() {
    this.initialStyle();
  },
  methods: {
    // 值格式化
    formatTooltip(val) {
      return val / 100;
    },
    getVal() {
      const child = document.querySelector(".el-image__inner")
      this.backgroundUrl && (this.$setStyle(child, "opacity", `${this.opacity / 100}`))
    },
    // 选择背景图
    selectPic() {
      this.$getImgFile(3)
        .then(({ raw, url }) => {
          this.backgroundUrl = url;
        })
        .catch(e => {
          this.$warnMsg(e);
        });
    },
    useBg() {
      const 
        ele = document.querySelector(".content-list"),
        opacity = this.$parent.$refs.opacity,
        mask = this.$parent.$refs.mask;
      this.$setStyle(ele, "background-image", `url(${this.backgroundUrl})`);
      this.$setStyle(opacity, "opacity", `${ 1 - this.opacity / 100}`);
      this.$setStyle(mask, "background", `rgba(0, 0, 0, ${this.mask / 100})`);
      this.$setMemoryPmt("chatBackground", this.backgroundUrl);
      this.$setMemoryPmt("chatBackgroundOpacity", this.opacity);
      this.$setMemoryPmt("chatBackgroundMask", this.mask);
      this.$successMsg("聊天背景应用成功");
    },
    initialStyle() {
      const 
        ele = document.querySelector(".content-list"),
        opacity = this.$parent.$refs.opacity,
        mask = this.$parent.$refs.mask;
      this.$setStyle(ele, "background-image", `url(${this.backgroundUrl})`);
      this.$setStyle(opacity, "opacity", `${ 1 - this.opacity / 100}`);
      this.$setStyle(mask, "background", `rgba(0, 0, 0, ${this.mask / 100})`);
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  margin: 0.5rem 0;
}
.el-dialog__wrapper {
  ::v-deep {
    .el-drawer {
      overflow: auto;
    }
  }
}
</style>