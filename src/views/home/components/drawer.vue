<template>
  <el-drawer title :visible.sync="drawer" :direction="direction" :show-close="false" size="350px">
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
      <el-tab-pane label="用户设置" name="用户设置">
        <el-form
          label-position="top"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          style="padding: 20px;"
        >
          <el-form-item label="昵称" prop="name">
            <el-input placeholder="请输入聊天昵称" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input placeholder="请输入年龄" type="number" v-model="ruleForm.age"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input placeholder="请输入电话" type="number" v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input placeholder="请输入邮箱" v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="原密码" prop="password">
            <el-input placeholder="请输入原密码" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input placeholder="请输入确认密码" v-model="ruleForm.checkPass"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-drawer>
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
      drawer: false,
      direction: "rtl",
      activeName: "界面设置",
      backgroundUrl: "",
      ruleForm: {
        name: "",
        age: "",
        phone: "",
        email: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "请输入原密码", trigger: "blur" }
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        phone: [{ required: true, trigger: "blur", validator: validPhone }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ]
      }
    };
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
      const ele = document.querySelector('.content-list')
      this.$setStyle(ele, 'background-image', `url(${this.backgroundUrl})`)
      this.$setStyle(ele, 'background-position', 'center')
      this.$setStyle(ele, 'background-repeat', 'no-repeat')
      this.$setStyle(ele, 'background-size', 'cover')
    },
  }
};
</script>

<style lang="scss" scoped>
.button-box {
  position: relative;
  padding: 0 10px;
}
.button {
  position: relative;
  margin: 0.5rem 0;
}
</style>