<template>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  div {
    box-sizing: border-box;
  }

  .container {
    max-width: 1320px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 20px;
    padding-right: 20px;
  }

  button {
    background: #50aafd;
    border: none;
    width: 200px;
    height: 40px;
    border-radius: 6px;
    color: #fff;
    font-size: 18px;
    transition: 0.3s;

    &:hover {
      cursor: pointer;
      opacity: 0.7;
    }
  }
}
</style>
