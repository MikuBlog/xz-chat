<template>
  <div class="home">
    <div class="chat-box">
      <div class="left-list">
        <div class="header">
          <el-avatar :size="50" :src="src" fit="cover" class="avatar"></el-avatar>
          <div class="profile">
            <div class="name" style="font-size: 1.1rem">
              我
              <span style="color: #fefefe;">（{{ isonline ? '在线' : '离线' }}）</span>
            </div>
            <span
              class="name"
              style="font-size: .8rem; color: #aaa; top: .2rem"
            >聊天名称：{{ user.username }}</span>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="customer-list">
          <el-scrollbar style="height:100%; width: 100%;" class="menu-horizontal-scrollbar">
            <div class="list" @click="connectWebsocketInGroup(1)">
              <el-avatar :size="50" src="https://myinterface.xuanzai.top/getPicture?type=%E5%A4%B4%E5%83%8F&id=12" fit="cover" class="avatar"></el-avatar>
              <span class="name" style="color: #fefefe">
                群聊
              </span>
            </div>
            <div class="list" v-for="items in onlineUserList" @click="connectWebsocketInFace(items)">
              <el-avatar :size="50" :src="src" fit="cover" class="avatar"></el-avatar>
              <span class="name" style="color: #fefefe">
                {{ items.username }}
                <span
                  style="color: #666; font-size: .9rem"
                >（在线）</span>
              </span>
            </div>
            <div class="list" v-for="items in outlineUserList" @click="connectWebsocketInFace(items)">
              <el-avatar :size="50" :src="src" fit="cover" class="avatar"></el-avatar>
              <span class="name" style="color: #666">
                {{ items.username }}
                <span
                  style="color: #666; font-size: .9rem"
                >（离线）</span>
              </span>
            </div>
          </el-scrollbar>
        </div>
      </div>
      <div class="right-list" v-loading="getRecordLoading">
        <div class="header-profile">{{ chatObj.username }}</div>
        <div class="content-list">
          <el-scrollbar style="height:100%; width: 100%;" class="menu-horizontal-scrollbar">
            <div
              class="list"
              v-for="items in ExistingContentList"
              :keys="items._id"
              :style="{
              textAlign: items.sender !== user.username ? 'left' : 'right',
              display: items.sender !== user.username ? 'block' : 'flex',
              flexDirection: items.sender !== user.username ? 'row' : 'row-reverse',
            }"
            >
              <el-avatar :size="50" :src="src" fit="cover" class="avatar"></el-avatar>
              <el-card shadow="always" class="card">
                <div class="date-time"><span style="margin-right: 1rem">{{ items.sender }}</span>{{ $formatDate(items.createtime, true) }}</div>
                <div>{{items.content}}</div>
              </el-card>
            </div>
            <div
              class="list"
              v-for="items in willSendContentList"
              :keys="items._id"
              :style="{
              textAlign: items.sender !== user.username ? 'left' : 'right',
              display: items.sender !== user.username ? 'block' : 'flex',
              flexDirection: items.sender !== user.username ? 'row' : 'row-reverse',
            }"
            >
              <el-avatar :size="50" :src="src" fit="cover" class="avatar"></el-avatar>
              <el-card shadow="always" class="card">
                <div class="date-time">{{ $formatDate(items.createtime, true) }}</div>
                <div>{{items.content}}</div>
              </el-card>
            </div>
          </el-scrollbar>
        </div>
        <div class="input-box">
          <div class="submit" align="right">
            <el-button
              type="success"
              size="small"
              style="margin-right: .5rem"
              @click="sendContent"
              :loading="loading"
            >发送</el-button>
          </div>
          <div class="input-area">
            <el-input
              class="textarea"
              type="textarea"
              :rows="8"
              placeholder="输入聊天内容"
              v-model="textarea"
            ></el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Initial from "./mixins/initial";
import Operation from "./mixins/operation";
import Property from "./mixins/property";
export default {
  mixins: [Initial, Operation, Property]
};
</script>

<style lang="scss" scoped src="./style/index.scss"></style>