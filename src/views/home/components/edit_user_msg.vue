<template>
  <el-dialog :visible.sync="dialog" title="修改用户信息" width="570px">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="padding: 20px;"
    >
      <el-form-item label="聊天昵称" prop="name">
        <el-input placeholder="请输入聊天昵称" v-model="ruleForm.name" maxlength="10"></el-input>
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
      <el-form-item label="新密码" prop="password">
        <el-input type="password" placeholder="请输入新密码" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" placeholder="请输入确认密码" v-model="ruleForm.checkPass"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" size="small" @click="hideBox">取消</el-button>
      <el-button type="primary" size="small" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
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
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialog: false,
      userId: "",
      level: "",
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
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        phone: [{ required: true, trigger: "blur", validator: validPhone }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    const explorer = navigator.userAgent;
    if (explorer.indexOf("Chrome") >= 0) {
      this.style = "width: 184px";
    } else {
      this.style = "width: 172px";
    }
  },
  methods: {
    // 判断电话是否有效
    isvalidPhone(str) {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      return reg.test(str);
    },
    // 隐藏窗口
    hideBox() {
      this.dialog = false;
    },
    // 提交数据
    doSubmit() {
      this.$refs.ruleForm.validate(valid => {
        this.ruleForm.username = this.$parent.user.username;
        if (valid) {
          this.$.ajax({
            url: `${requestUrl}/api/user/editusermsg`,
            type: "post",
            data: this.ruleForm
          }).then(result => {
            if (result.status === "ok") {
              this.$successMsg(result.msg);
              this.$parent.initialProfile(result.data);
              this.$parent.socketInRoom.send(
                JSON.stringify({
                  type: "update",
                  ...result.data
                })
              );
            } else {
              this.$errorMsg(result.msg);
            }
            this.dialog = false
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>