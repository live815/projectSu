<template>
  <div class="app-container home">
    <h1>
      {{ $t('system.tip206', { name: user.name }) }}
    </h1>
  </div>
</template>

<script setup name="Index">
import useUserStore from '@/store/modules/user'
const user = useUserStore()
</script>

<style scoped lang="scss">
.home {
  h1 {
    text-align: center;
    margin: 0 auto;
    margin-top: 300px;
    font-size: 40px;
  }
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: 'open sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
h1 {
  margin: 50px auto;
  font-size: 54px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  color: transparent;
  background: linear-gradient(
    45deg,
    #ffeb3b,
    #009688,
    yellowgreen,
    pink,
    #03a9f4,
    #9c27b0,
    #8bc34a
  );
  background-size: cover;
  background-position: center center;
  background-clip: text;
  animation: huerotate 3s infinite;
}

@keyframes huerotate {
  100% {
    filter: hue-rotate(360deg);
  }
}
</style>
