<template>
  <el-drawer title :visible.sync="drawer" :direction="direction" :show-close="false" size="350px">
    <div style="padding: 0 10px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="界面设置" name="界面设置">
          <div style="color: #777; margin: .5rem">聊天背景：</div>
          <el-image style="width: 100%; height: 159px" :src="backgroundUrl" fit="cover" ref="image"></el-image>
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
      backgroundUrl: ""
    };
  },
  mounted() {
    this.initialStyle();
  },
  methods: {
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
      const ele = document.querySelector(".content-list");
      this.$setStyle(ele, "background-image", `url(${this.backgroundUrl})`);
      this.$setMemoryPmt("chatBackground", this.backgroundUrl);
      this.$successMsg("聊天背景应用成功");
    },
    initialStyle() {
      const ele = document.querySelector(".content-list");
      this.$getMemoryPmt("chatBackground") &&
        this.$setStyle(
          ele,
          "background-image",
          `url(${this.$getMemoryPmt("chatBackground")})`
        );
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