<template>
  <div class="home">
    <div class="chat-box">
      <div class="left-list">
        <div class="header">
          <div class="avatar">
            <img src="../../assets/avatar/user.jpg" alt="user.jpg" />
          </div>
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
              <div class="avatar">
                <img src="../../assets/avatar/user.jpg" alt="user.jpg" />
              </div>
              <!-- <el-avatar :size="50" src="../../assets/avatar/user.jpg" fit="cover" class="avatar"></el-avatar> -->
              <span class="name" style="color: #fefefe">
                {{ items.username }}
                <span style="color: #666; font-size: .9rem">（在线）</span>
              </span>
            </div>
            <div
              class="list"
              v-for="items in outlineUserList"
              @click="connectWebsocketInFace(items)"
            >
              <div class="avatar">
                <img src="../../assets/avatar/user.jpg" alt="user.jpg" />
              </div>
              <span class="name" style="color: #666">
                {{ items.username }}
                <span style="color: #666; font-size: .9rem">（离线）</span>
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
              display: 'flex',
              flexDirection: items.sender !== user.username ? 'row' : 'row-reverse',
            }"
            >
              <div class="avatar" v-if="items.type !== 'withdraw'">
                <img src="../../assets/avatar/user.jpg" alt="user.jpg" />
              </div>
              <el-card shadow="always" class="card" v-if="items.type !== 'withdraw'">
                <el-popover
                  placement="bottom"
                  width="150"
                  trigger="click"
                  v-if="items.sender === user.username"
                  style="padding: 0"
                >
                  <div align="center">
                    <el-button type="text" @click="withdrawContent(items)">撤回信息</el-button>
                  </div>
                  <div slot="reference">
                    <div class="date-time">
                      <span
                        style="margin-right: 1rem"
                        v-if="items.type === 'group'"
                      >{{ items.sender }}</span>
                      {{ $formatDate(items.createtime, true) }}
                    </div>
                    <div>{{items.content}}</div>
                  </div>
                </el-popover>
                <div v-else>
                  <div class="date-time">
                    <span
                      style="margin-right: 1rem"
                      v-if="items.type === 'group'"
                    >{{ items.sender }}</span>
                    {{ $formatDate(items.createtime, true) }}
                  </div>
                  <div>{{items.content}}</div>
                </div>
              </el-card>
              <div class="withdraw-box" v-else>
                <div class="widthraw-content">
                  <div align="center">{{ $formatDate(items.createtime, true) }}</div>
                  <span>"{{ items.sender }}"</span>
                  <span>{{ items.content }}</span>
                </div>
              </div>
            </div>
            <div
              class="list"
              v-for="items in willSendContentList"
              :keys="items._id"
              :style="{
              textAlign: items.sender !== user.username ? 'left' : 'right',
              display: 'flex',
              flexDirection: items.sender !== user.username ? 'row' : 'row-reverse',
            }"
            >
              <div class="avatar" v-if="items.type !== 'withdraw'">
                <img src="../../assets/avatar/user.jpg" alt="user.jpg" />
              </div>
              <el-card shadow="always" class="card" v-if="items.type !== 'withdraw'">
                <el-popover
                  placement="bottom"
                  width="150"
                  trigger="click"
                  v-if="items.sender === user.username"
                  style="padding: 0"
                >
                  <div align="center">
                    <el-button type="text" @click="withdrawContent(items)">撤回信息</el-button>
                  </div>
                  <div slot="reference">
                    <div class="date-time">
                      <span
                        style="margin-right: 1rem"
                        v-if="items.type === 'group'"
                      >{{ items.sender }}</span>
                      {{ $formatDate(items.createtime, true) }}
                    </div>
                    <div>{{items.content}}</div>
                  </div>
                </el-popover>
                <div v-else>
                  <div class="date-time">
                    <span
                      style="margin-right: 1rem"
                      v-if="items.type === 'group'"
                    >{{ items.sender }}</span>
                    {{ $formatDate(items.createtime, true) }}
                  </div>
                  <div>{{items.content}}</div>
                </div>
              </el-card>
              <div class="withdraw-box" v-else>
                <div class="widthraw-content">
                  <div align="center">{{ $formatDate(items.createtime, true) }}</div>
                  <span>"{{ items.sender }}"</span>
                  <span>{{ items.content }}</span>
                </div>
              </div>
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
              @keypress.native="sendContentQuick"
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