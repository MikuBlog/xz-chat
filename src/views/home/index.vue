<template>
  <div class="home">
    <div class="setting" @click="$refs.drawer.drawer = true">
      <i class="el-icon-setting"></i>
    </div>
    <div class="chat-box">
      <div class="left-list">
        <div class="header">
          <el-popover placement="left" :title="user.name" width="200" trigger="hover">
            <div class="customer-profix">
              <div class="detail">账号：{{ user.username }}</div>
              <div class="detail">年龄：{{ user.age }}</div>
              <div class="detail">电话：{{ user.phone }}</div>
              <div class="detail">邮箱：{{ user.email }}</div>
            </div>
            <el-button
              type="primary"
              size="small"
              circle
              icon="el-icon-edit"
              style="float: right"
              @click="showEditUserBox"
            ></el-button>
            <div class="avatar" @click="$refs.editAvatar.dialogVisible = true" slot="reference">
              <img :src="user.avatar" alt="user.jpg" />
            </div>
          </el-popover>
          <div class="profile">
            <div class="name" style="font-size: 1.1rem">
              我
              <span style="color: #fefefe;">（{{ isonline ? '在线' : '离线' }}）</span>
            </div>
            <div
              class="name"
              style="font-size: .9rem; color: #aaa; margin-top: .2rem;"
            >账号：{{ user.username }}</div>
            <div
              class="name"
              style="font-size: .8rem; color: #aaa; margin-top: .2rem"
            >聊天名称：{{ user.name }}</div>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="customer-list">
          <el-scrollbar :style="{ height: `calc(100% - 90px)` }" class="menu-horizontal-scrollbar">
            <div class="list" @click="connectWebsocketInGroup(1)">
              <div class="avatar">
                <img src="../../assets/avatar/group.jpg" alt="group.jpg" />
              </div>
              <span class="name" style="color: #fefefe">群聊</span>
            </div>
            <div
              class="list"
              v-for="items in onlineUserList"
              @click="connectWebsocketInFace(items)"
            >
              <el-popover placement="left" :title="items.name" width="200" trigger="hover">
                <div class="customer-profix">
                  <div class="detail">账号：{{ items.username }}</div>
                  <div class="detail">年龄：{{ items.age }}</div>
                  <div class="detail">电话：{{ items.phone }}</div>
                  <div class="detail">邮箱：{{ items.email }}</div>
                </div>
                <div class="avatar" slot="reference">
                  <img :src="convertHttp(items.avatar)" alt="user.jpg" />
                </div>
              </el-popover>
              <span class="name" style="color: #fefefe">
                {{ items.name }}
                <span style="color: #666; font-size: .9rem">（在线）</span>
              </span>
            </div>
            <div
              class="list"
              v-for="items in outlineUserList"
              :key="items._id"
              @click="connectWebsocketInFace(items)"
            >
              <el-popover placement="left" :title="items.name" width="200" trigger="hover">
                <div class="customer-profix">
                  <div class="detail">账号：{{ items.username }}</div>
                  <div class="detail">年龄：{{ items.age }}</div>
                  <div class="detail">电话：{{ items.phone }}</div>
                  <div class="detail">邮箱：{{ items.email }}</div>
                </div>
                <div class="avatar" slot="reference">
                  <img :src="convertHttp(items.avatar)" alt="user.jpg" />
                </div>
              </el-popover>
              <span class="name" style="color: #666">
                {{ items.name }}
                <span style="color: #666; font-size: .9rem">（离线）</span>
              </span>
            </div>
          </el-scrollbar>
        </div>
      </div>
      <div class="right-list" v-loading="getRecordLoading">
        <div class="header-profile">{{ chatObj.name }}</div>
        <div class="content-list">
          <div class="background-opacity" ref="opacity"></div>
          <div class="background-mask" ref="mask"></div>
          <el-scrollbar style="height:100%; width: 100%;" class="menu-horizontal-scrollbar">
            <div
              class="list"
              v-for="items in ExistingContentList"
              :style="{
              textAlign: items.senderusername !== user.username ? 'left' : 'right',
              display: 'flex',
              flexDirection: items.senderusername !== user.username ? 'row' : 'row-reverse',
            }"
            >
              <div class="avatar" v-if="items.type !== 'withdraw'">
                <img :src="items.avatar" alt="user.jpg" />
              </div>
              <el-card shadow="always" class="card chat-card" v-if="items.type !== 'withdraw'">
                <el-popover
                  placement="bottom"
                  width="150"
                  trigger="click"
                  v-if="items.senderusername === user.username"
                  style="padding: 0"
                >
                  <div align="center">
                    <el-button
                      type="text"
                      @click="withdrawContent(items)"
                      :loading="withdrawLoading"
                    >撤回信息</el-button>
                  </div>
                  <div slot="reference">
                    <div class="date-time">
                      <span style="margin-right: 1rem">{{ items.sendername }}</span>
                      {{ $formatDate(items.createtime, true) }}
                    </div>
                    <div v-html="items.content"></div>
                  </div>
                </el-popover>
                <div v-else>
                  <div class="date-time">
                    <span style="margin-right: 1rem">{{ items.sendername }}</span>
                    {{ $formatDate(items.createtime, true) }}
                  </div>
                  <div v-html="items.content"></div>
                </div>
              </el-card>
              <div class="withdraw-box" v-else>
                <div class="widthraw-content">
                  <div align="center">{{ $formatDate(items.createtime, true) }}</div>
                  <span>"{{ items.sendername }}"</span>
                  <span>{{ items.content }}</span>
                </div>
              </div>
            </div>
            <div
              class="list"
              v-for="items in willSendContentList"
              :style="{
              textAlign: items.senderusername !== user.username ? 'left' : 'right',
              display: 'flex',
              flexDirection: items.senderusername !== user.username ? 'row' : 'row-reverse',
            }"
            >
              <div class="avatar" v-if="items.type !== 'withdraw'">
                <img :src="items.avatar" alt="user.jpg" />
              </div>
              <el-card shadow="always" class="card chat-card" v-if="items.type !== 'withdraw'">
                <el-popover
                  placement="bottom"
                  width="150"
                  trigger="click"
                  v-if="items.senderusername === user.username"
                  style="padding: 0"
                >
                  <div align="center">
                    <el-button
                      type="text"
                      @click="withdrawContent(items)"
                      :loading="withdrawLoading"
                    >撤回信息</el-button>
                  </div>
                  <div slot="reference">
                    <div class="date-time">
                      <span style="margin-right: 1rem">{{ items.sendername }}</span>
                      {{ $formatDate(items.createtime, true) }}
                    </div>
                    <div v-html="items.content"></div>
                  </div>
                </el-popover>
                <div v-else>
                  <div class="date-time">
                    <span style="margin-right: 1rem">{{ items.sendername }}</span>
                    {{ $formatDate(items.createtime, true) }}
                  </div>
                  <div v-html="items.content"></div>
                </div>
              </el-card>
              <div class="withdraw-box" v-else>
                <div class="widthraw-content">
                  <div align="center">{{ $formatDate(items.createtime, true) }}</div>
                  <span>"{{ items.sendername }}"</span>
                  <span>{{ items.content }}</span>
                </div>
              </div>
            </div>
          </el-scrollbar>
        </div>
        <div class="input-box">
          <div class="input-area">
            <div class="editor">
              <div id="div1" class="toolbar">
                <el-button
                  type="success"
                  size="small"
                  style="position: absolute;right: 0; padding: 5px 7px; margin-right: 5px"
                  @click="sendContent"
                  :loading="loading"
                >发送</el-button>
              </div>
              <div id="div2" class="text"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MyDrawer ref="drawer" />
    <EditAvatar ref="editAvatar" />
    <EditUserForm ref="userForm" />
  </div>
</template>

<script>
import Data from "./mixins/data";
import Initial from "./mixins/initial";
import Operation from "./mixins/operation";
import Property from "./mixins/property";
import MyDrawer from "./components/drawer";
import EditAvatar from "./components/edit_avatar";
import EditUserForm from "./components/edit_user_msg";
export default {
  mixins: [ Data, Initial, Operation, Property ],
  components: { MyDrawer, EditAvatar, EditUserForm }
};
</script>

<style lang="scss" scoped src="./style/index.scss"></style>