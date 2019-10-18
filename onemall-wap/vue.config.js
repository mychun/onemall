module.exports = {
    css: {
      loaderOptions: {
        sass: {
            data: `@import "@/utils/hotcss/px2rem.scss";@import "@/assets/style/_var.scss";@import "@/assets/style/_mixin.scss";`
        }
      }
    }
}