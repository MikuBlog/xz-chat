<template>
  <div class="home">
    <div class="chat-box">
      <div class="left-list">
        <div class="header">
          <el-avatar :size="50" :src="src" fit="cover" class="avatar"></el-avatar>
          <div class="profile">
            <div class="name">我</div>
            <span class="name" style="font-size: 1rem; color: #aaa">聊天名称：{{ name }}</span>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="customer-list">
          <el-scrollbar style="height:100%; width: 100%;" class="menu-horizontal-scrollbar">
              <div class="list" v-for="items in customerList">
                <el-avatar :size="50" :src="items.avatar" fit="cover" class="avatar"></el-avatar>
                <span class="name">{{ items.name }}</span>
              </div>
            </el-scrollbar>
        </div>
      </div>
      <div class="right-list">
        <div class="content-list">
          <el-scrollbar style="height:100%; width: 100%;" class="menu-horizontal-scrollbar">
            <div class="list" v-for="items in contentList" :style="{
              textAlign: items.type === 'me' ? 'left' : 'right',
              display: items.type === 'me' ? 'block' : 'flex',
              flexDirection: items.type === 'me' ? 'row' : 'row-reverse',
            }">
              <el-avatar :size="50" :src="src" fit="cover" class="avatar"></el-avatar>
              <el-card shadow="always" class="card">
                {{items.value}}
              </el-card>
            </div>
          </el-scrollbar>
        </div>
        <div class="input-box">
          <div class="submit" align="right">
            <el-button type="success" size="small" style="margin-right: .5rem">发送</el-button>
          </div>
          <div class="input-area">
            <el-input
              class="textarea"
              type="textarea"
              :rows="8"
              placeholder="输入聊天内容"
              v-model="textarea">
            </el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Initial from './mixins/initial'
import Operation from './mixins/operation'
import Property from './mixins/property'
export default {
  mixins: [ Initial, Operation, Property ]
}
</script>

<style lang="scss" scoped src="./style/index.scss"></style>