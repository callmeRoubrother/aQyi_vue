<template>
  <div class="container">
    <router-view name="header"></router-view>
    <section class="content" id="content">
      <router-view name="content"></router-view>
    </section>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
export default {
}
</script>
