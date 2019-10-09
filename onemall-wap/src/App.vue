<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <router-view name="tab"></router-view>
  </div>
</template>
<style lang="css" src="./assets/font/iconfont.css" />
<style lang="scss" src="./assets/style/global.scss" />