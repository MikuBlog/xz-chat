<template>
  <div class="login">
    <div class="background" ref="background">
      <div class="mask" ref="mask"></div>
    </div>
    <div class="setting" @click="showSetting" v-show="defaultConfig.loginSetting">
      <i class="el-icon-setting"></i>
    </div>
    <div class="flex-box">
      <div class="left-size">
        <div class="content-box">
          <div class="welcome-header">欢迎来到</div>
          <div class="content">旋仔的多人聊天室</div>
        </div>
      </div>
      <div class="right-size">
        <div class="login-box" ref="loginBox">
          <div class="header" ref="header">用户注册</div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item prop="username" class="form-item">
              <el-input
                v-model="ruleForm.username"
                prefix-icon="el-icon-user-solid"
                placeholder="请输入用户名"
                maxlength="10"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item prop="name" class="form-item">
              <el-input v-model="ruleForm.name" prefix-icon="el-icon-user" placeholder="请输入姓名"></el-input>
            </el-form-item> -->
            <el-form-item prop="password" class="form-item">
              <el-input
                type="password"
                v-model="ruleForm.password"
                prefix-icon="el-icon-lock"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item prop="checkPass" class="form-item">
              <el-input
                type="password"
                v-model="ruleForm.checkPass"
                prefix-icon="el-icon-lock"
                placeholder="请确认密码"
              ></el-input>
            </el-form-item>
            <el-form-item prop="age" class="form-item">
              <el-input
                v-model="ruleForm.age"
                type="number"
                prefix-icon="el-icon-user-solid"
                placeholder="年龄"
              ></el-input>
            </el-form-item>
            <el-form-item prop="phone" class="form-item">
              <el-input v-model="ruleForm.phone" prefix-icon="el-icon-phone" placeholder="请输入电话号码"></el-input>
            </el-form-item>
            <el-form-item prop="email" class="form-item">
              <el-input v-model="ruleForm.email" prefix-icon="el-icon-eleme" placeholder="请输入电子邮箱"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                class="login-button"
                type="primary"
                @click="submitForm('ruleForm')"
                style="width: 100%;"
              >注册</el-button>
            </el-form-item>
            <el-form-item align="right">
              <el-button
                type="text"
                @click="$router.push('/login')"
                size="small"
                style="position: relative; right: 13px; bottom: 10px;"
              >去登录</el-button>
            </el-form-item>
            <el-form-item v-show="defaultConfig.isAutoLogin">
              <el-checkbox v-model="ruleForm.checked" @change="autoLogin">自动登录</el-checkbox>
            </el-form-item>
          </el-form>
          <div v-show="defaultConfig.otherLoginMethods">
            <el-divider></el-divider>
            <div class="tip">使用合作网站账号登陆：</div>
            <div class="button-box">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconQQ" />
              </svg>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconweibo" />
              </svg>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconweixin" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Drawer
      title="界面设置"
      v-model="isShowDrawer"
      width="350px"
      @on-close="closeDrawer"
      style="overflow-x: hidden"
    >
      <el-tabs v-model="activeName" type="card" @tab-click="getTag">
        <el-tab-pane label="背景图" name="0"></el-tab-pane>
        <el-tab-pane label="登录框" name="1"></el-tab-pane>
      </el-tabs>
      <div class="background-setting" v-show="tab[0]">
        <div class="block" style="text-align: right; margin: .5rem 0;">
          <span class="label">背景是否重复：</span>
          <el-switch v-model="repeat"></el-switch>
        </div>
        <el-image style="width: 100%; height: 159px" :src="backgroundUrl" :fit="size" ref="image"></el-image>
        <div class="radio-box">
          <el-radio v-model="size" label="cover">覆盖</el-radio>
          <el-radio v-model="size" label="contain">适应</el-radio>
          <el-radio v-model="size" label="fill">填充</el-radio>
        </div>
        <div class="block" style="margin-top: 2rem">
          <span class="demonstration">透明度：</span>
          <el-slider v-model="opacity" :format-tooltip="formatTooltip" @change="getVal"></el-slider>
        </div>
        <div class="block">
          <span class="demonstration">模糊度：</span>
          <el-slider v-model="blur" :format-tooltip="formatTooltip" @change="getVal"></el-slider>
        </div>
        <div class="block">
          <span class="demonstration">遮罩浓度：</span>
          <el-slider v-model="mask" :format-tooltip="formatTooltip" @change="getVal"></el-slider>
        </div>
        <div class="button" style="margin-top: 2rem">
          <el-button type="primary" style="width: 100%" @click="selectPic">选择图片</el-button>
        </div>
        <div class="button">
          <el-button type="success" style="width: 100%" @click="useBg">应用背景</el-button>
        </div>
      </div>
      <div class="login-box-setting" v-show="tab[1]">
        <div class="block" style="text-align:right">
          <span class="label">登录框颜色:</span>
          <el-color-picker v-model="boxColor" @change="getBoxVal" show-alpha></el-color-picker>
        </div>
        <div class="block" style="text-align:right">
          <span class="label">字体颜色:</span>
          <el-color-picker v-model="fontColor" @change="getBoxVal"></el-color-picker>
        </div>
        <div class="block" style="text-align:right; margin: .5rem 0 1rem 0">
          <span class="label">标题是否斜体:</span>
          <el-switch v-model="isItalic" @change="getBoxVal"></el-switch>
        </div>
        <div class="block">
          <span class="demonstration">高度：</span>
          <el-slider v-model="height" @change="getBoxVal"></el-slider>
        </div>
        <div class="block">
          <span class="demonstration">宽度：</span>
          <el-slider v-model="width" @change="getBoxVal"></el-slider>
        </div>
        <div class="block">
          <span class="demonstration">标题大小：</span>
          <el-slider v-model="fontSize" @change="getBoxVal"></el-slider>
        </div>
        <div class="block">
          <span class="demonstration">图标大小：</span>
          <el-slider v-model="iconSize" @change="getBoxVal"></el-slider>
        </div>
        <div class="button" style="margin-top: 2rem">
          <el-button type="success" style="width: 100%" @click="saveBoxStyle">保存样式</el-button>
        </div>
      </div>
    </Drawer>
  </div>
</template>

<script>
export default {
  data() {
    // 验证电话号码
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入电话号码"));
      } else if (!this.isvalidPhone(value)) {
        callback(new Error("请输入正确的11位手机号码"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      var reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\W_!@#$%^&*`~()-+=]{6,21}$/;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (!reg.test(value)) {
        callback(
          new Error(
            "密码必须由数字、大写字母、小写字母、特殊符至少三种组成且长度在6~21位之间!"
          )
        );
      } else {
        callback();
      }
      this.power = this.checkPwd(value)
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      power: 0,
      labelPosition: "left",
      isShowDrawer: false,
      activeName: "0",
      tab: [1, 0],
      backgroundUrl: this.$getMemoryPmt("backgroundUrl") || "",
      opacity: 100,
      mask: 0,
      blur: 0,
      height: 10,
      width: 10,
      fontSize: 30,
      iconSize: 30,
      size: "cover",
      repeat: false,
      boxColor: "#ffffff",
      fontColor: "#a0a4af",
      isItalic: true,
      unLock: false,
      depts: [],
      jobs: [],
      ruleForm: {
        username: "",
        password: "",
        age: "",
        phone: "",
        email: ""
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "change" },
          { min: 2, max: 21, message: "账号长度在2到20个字符", trigger: "change" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "change" }],
        checkPass: [{ validator: validatePass2, trigger: "change" }],
        age: [{ required: true, message: "年龄不能为空", trigger: "change" }],
        phone: [{ required: true, trigger: "blur", validator: validPhone }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "change" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "change" }
        ]
      }
    };
  },
  created() {
    document.title = "注册";
  },
  mounted() {
    this.useBg();
    setTimeout(() => {
      // 插入元素
      this.insertEle();
    });
  },
  methods: {
    // 验证密码强度
    checkPwd(msg) {
      //判断含有数字字母特殊符号
      var lvl = 0;
      if (msg.match(/[0-9]/)) {
        lvl++;
      }
      if (msg.match(/[a-zA-Z]/)) {
        lvl++;
      }
      if (msg.match(/[^0-9a-zA-Z]/)) {
        lvl++;
      }
      if (msg.length < 6) {
        lvl--;
      }
      return lvl;
    },
    // 判断电话是否有效
    isvalidPhone(str) {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      return reg.test(str);
    },
    // // 获取学院信息
    // getCollegeList() {
    //   this.$http_json({
    //     url: "/api/dept/get",
    //     method: "get"
    //   }).then(result => {
    //     this.depts = result.data.content;
    //   });
    // },
    // initialProfessionList(list, id) {
    //   this.jobs.splice(0);
    //   list.forEach(value => {
    //     this.jobs.push(value);
    //   });
    //   this.ruleForm.job.id = id;
    // },
    // // 获取专业信息
    // getProfessionalList(id, jobId) {
    //   this.$http_json({
    //     url: `/api/job/page?page=0&size=9999&deptId=${id}`,
    //     method: "get"
    //   }).then(result => {
    //     this.initialProfessionList(result.data.content, jobId);
    //   });
    // },
    // selectDept(node, instanceId) {
    //   this.getProfessionalList(node.id);
    // },
    // // 清空岗位
    // jobSelect() {
    //   this.ruleForm.job.id = null;
    // },
    // 插入元素
    insertEle() {
      const image =
          document.querySelector(".el-image__inner") ||
          document.querySelector(".el-image__error"),
        mask = document.createElement("div");
      mask.className = "small-mask";
      try {
        this.$insertAfter(mask, image);
        this.getVal();
      } catch (e) {}
    },
    // 判断是否自动登录
    isAutoLogin() {
      this.$getMemoryPmt("isAutoLogin") &&
        this.$getMemoryPmt("token") &&
        this.$router.push({ path: "/home/welcome" });
    },
    autoLogin(val) {
      this.$setMemoryPmt("isAutoLogin", val);
    },
    // 关闭抽屉样式恢复
    closeDrawer() {
      const loginBox = this.$refs.loginBox,
        header = this.$refs.header,
        background = this.$refs.background,
        svg = document.querySelectorAll("svg"),
        checkBox = document.querySelector(".el-checkbox"),
        tip = document.querySelector(".tip");
      this.$setStyle(
        loginBox,
        "height",
        `${(this.height =
          this.$getMemoryPmt("height") ||
          (this.defaultConfig.otherLoginMethods ? 80 : 38)) / 2}rem`
      );
      this.$setStyle(
        loginBox,
        "width",
        `${(this.width = this.$getMemoryPmt("width") || 50) / 2}rem`
      );
      this.$setStyle(
        loginBox,
        "background",
        `${(this.boxColor =
          this.$getMemoryPmt("boxColor") || "rgba(0, 0, 0, .35)")}`
      );
      this.$setStyle(
        header,
        "font-size",
        `${(this.fontSize = this.$getMemoryPmt("fontSize") || 30) / 20}rem`
      );
      this.$setStyle(
        header,
        "color",
        `${(this.fontColor = this.$getMemoryPmt("fontColor") || "#fefefe")}`
      );
      this.$setStyle(
        checkBox,
        "color",
        `${this.$getMemoryPmt("fontColor") || "#fefefe"}`
      );
      this.$setStyle(
        tip,
        "color",
        `${this.$getMemoryPmt("fontColor") || "#fefefe"}`
      );
      svg.forEach(value => {
        this.$setStyle(
          value,
          "width",
          `${(this.iconSize = this.$getMemoryPmt("iconSize") || 30) / 10}rem`
        );
        this.$setStyle(
          value,
          "height",
          `${(this.$getMemoryPmt("iconSize") || 30) / 10}rem`
        );
      });
    },
    // 登录框样式预览
    getBoxVal() {
      const loginBox = this.$refs.loginBox,
        header = this.$refs.header,
        svg = document.querySelectorAll("svg"),
        checkBox = document.querySelector(".el-checkbox"),
        tip = document.querySelector(".tip");
      this.$setStyle(loginBox, "height", `${this.height / 2}rem`);
      this.$setStyle(loginBox, "width", `${this.width / 2}rem`);
      this.$setStyle(loginBox, "background", `${this.boxColor}`);
      this.$setStyle(header, "font-size", `${this.fontSize / 20}rem`);
      this.$setStyle(header, "color", `${this.fontColor}`);
      this.$setStyle(
        header,
        "font-style",
        `${this.isItalic ? "italic" : "normal"}`
      );
      this.$setStyle(checkBox, "color", `${this.fontColor}`);
      this.$setStyle(tip, "color", `${this.fontColor}`);
      svg.forEach(value => {
        this.$setStyle(value, "width", `${this.iconSize / 10}rem`);
        this.$setStyle(value, "height", `${this.iconSize / 10}rem`);
      });
    },
    // 图片预览
    getVal() {
      const child = document.querySelector(".el-image__inner"),
        mask = document.querySelector(".small-mask");
      this.backgroundUrl &&
        (this.$setStyle(child, "opacity", `${this.opacity / 100}`),
        this.$setStyle(child, "filter", `blur(${this.blur}px)`));
      mask.style.cssText = `
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                background: rgba(0, 0, 0, ${this.mask / 100});
            `;
    },
    // 值格式化
    formatTooltip(val) {
      return val / 100;
    },
    // 初始化样式
    initialStyle() {
      const ele = document.querySelector(".ivu-drawer-body");
      this.$setStyle(ele, "overflow-x", "hidden");
      this.opacity = +this.$getMemoryPmt("opacity") || this.opacity;
      this.blur = +this.$getMemoryPmt("blur") || this.blur;
      this.mask = +this.$getMemoryPmt("mask") || this.mask;
      this.fontSize = +this.$getMemoryPmt("fontSize") || this.fontSize;
      this.isItalic =
        this.$getMemoryPmt("isItalic") !== ""
          ? Boolean(this.$getMemoryPmt("isItalic"))
          : this.isItalic;
      this.iconSize = +this.$getMemoryPmt("iconSize") || this.iconSize;
      this.size = this.$getMemoryPmt("size") || this.size;
      this.repeat = this.$getMemoryPmt("repeat") || this.repeat;
      this.boxColor = this.$getMemoryPmt("boxColor") || this.boxColor;
      this.fontColor = this.$getMemoryPmt("fontColor") || this.fontColor;
      this.ruleForm.checked =
        this.$getMemoryPmt("isAutoLogin") || this.ruleForm.checked;
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
    // 应用图片
    useBg() {
      const ele = this.$refs.background,
        mask = this.$refs.mask;
      this.backgroundUrl &&
        (this.$setStyle(ele, "background-image", `url(${this.backgroundUrl})`),
        this.$setStyle(ele, "opacity", `${this.opacity / 100}`),
        this.$setStyle(ele, "filter", `blur(${this.blur}px)`),
        this.$setStyle(
          ele,
          "background-size",
          `${this.size == "fill" ? "100% 100%" : this.size}`
        ),
        this.$setStyle(
          mask,
          "background",
          `rgba(0, 0, 0, ${this.mask / 100})`
        ));
      this.repeat
        ? this.$setStyle(ele, "background-repeat", "no-repeat")
        : this.$setStyle(ele, "background-repeat", "repeat");
      this.saveBgStyle();
    },
    // 保存背景样式
    saveBgStyle() {
      this.$setMemoryPmt("backgroundUrl", this.backgroundUrl);
      this.$setMemoryPmt("opacity", this.opacity);
      this.$setMemoryPmt("blur", this.blur);
      this.$setMemoryPmt("mask", this.mask);
      this.$setMemoryPmt("size", this.size);
      this.$setMemoryPmt("repeat", this.repeat);
      if (this.unLock) {
        this.$successMsg("应用背景成功");
      }
      this.unLock = true;
    },
    // 保存登录框样式
    saveBoxStyle() {
      this.$setMemoryPmt("height", this.height);
      this.$setMemoryPmt("width", this.width);
      this.$setMemoryPmt("fontSize", this.fontSize);
      this.$setMemoryPmt("iconSize", this.iconSize);
      this.$setMemoryPmt("boxColor", this.boxColor);
      this.$setMemoryPmt("fontColor", this.fontColor);
      this.$setMemoryPmt("isItalic", this.isItalic);
      this.$successMsg("保存成功");
    },
    // 显示对应的tab页
    getTag(tab, event) {
      this.tab = this.tab.map((val, ind) => {
        if (tab.name == ind) {
          return 1;
        } else {
          return 0;
        }
      });
    },
    // 展开抽屉
    showSetting() {
      this.isShowDrawer = true;
    },
    // 回车登陆
    pressEnter(e) {
      e.keyCode === 13 && this.submitForm("ruleForm");
    },
    // 登录
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const 
            form = this.ruleForm,
            _this = this
          this.ruleForm.name = this.username
          this.$.ajax({
            url: `${requestUrl}/api/user/register`,
            method: "post",
            data: this.ruleForm,
            success(data) {
              if(data.status === 'ok') {
                _this.$successMsg("注册成功，请登录")
                _this.$router.push({ path: '/login' })
              }else {
                _this.$errorMsg(`${data.msg}`)
              }
            },error() {
              _this.$errorMsg("服务器出错")
            }
          })
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.flex-box {
  position: relative;
  display: flex;
  height: 100%;
}
.left-size,
.right-size {
  position: relative;
  flex: 1;
}
.left-size {
  background: rgba(0, 0, 0, 0.15);
  color: #fefefe;
}
.content-box {
  position: relative;
  transform: translateY(-50%);
  top: 50%;
  text-align: center;
}
.welcome-header {
  font-size: 1.2rem;
  padding-bottom: 1rem;
}
.content {
  font-size: 1.5rem;
}
.login-box {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 28rem;
  width: 35rem;
  margin: auto;
  background: #ffffff;
  transition: 0.5s;
  border-radius: 5px;
}
.login-box:hover {
  transform: translateY(-0.5%);
  box-shadow: 0 0 5px 1px rgb(78, 78, 78);
}
.login {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  animation: show 1s ease;
}
@keyframes show {
  0% {
    opacity: 0.5;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.background {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-image: url(../../assets/login/u15.png);
  background-position: center;
  background-size: cover;
  z-index: -1;
}
.mask {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
}
.setting {
  position: relative;
  top: 1rem;
  left: 1rem;
  width: 3rem;
  height: 3rem;
  text-align: center;
  border-radius: 50%;
  background: #f7f7f7;
  cursor: pointer;
  transition: 0.5s;
}
.el-icon-setting {
  font-size: 1.5rem;
  line-height: 3rem;
}
.setting:hover {
  transform: rotate(360deg) scale(1.1);
  color: #fefefe;
  background: rgb(19, 180, 255);
}
.header {
  position: relative;
  text-align: center;
  font-size: 1.5rem;
  line-height: 5rem;
  color: #a0a4af;
  font-style: italic;
}
.el-form {
  position: relative;
  margin: 1rem;
}
.el-checkbox {
  color: #fefefe;
}
.tip {
  position: relative;
  margin-top: 1rem;
  padding-left: 1rem;
  color: #fefefe;
}
.button-box {
  position: relative;
  margin: 1.7rem 0;
  display: flex;
  justify-content: space-around;
}
.radio-box {
  position: relative;
  margin: 1rem 0;
  text-align: center;
}
svg {
  width: 3rem;
  height: 3rem;
  transition: 0.5s;
}
svg:first-of-type {
  margin-left: 1rem;
}
svg:last-of-type {
  margin-right: 1rem;
}
svg:hover {
  transform: scale(1.3);
}
.setting-header {
  position: relative;
  margin: 1rem 0;
  font-size: 1.1rem;
}
.button {
  position: relative;
  margin: 0.5rem 0;
}
.block {
  position: relative;
}
.label {
  position: absolute;
  left: 0;
  top: 40%;
  transform: translateY(-50%);
}
.form-item {
  position: relative;
  margin: 1rem;
  display: inline-block;
  width: 230px;
  vertical-align: top;
}
// .tree-select {
//   /deep/ {
//     .vue-treeselect__control {
//       width: 230px;
//     }
//   }
// }
.login-button {
  position: relative;
  transform: translateX(-50%);
  margin-top: 1.5rem;
  left: 50%;
  width: 94% !important;
}
</style>
