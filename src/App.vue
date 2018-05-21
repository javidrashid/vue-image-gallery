<template>
  <div id="app">
    <Header msg="Welcome to Your Vue.js App"/>
    <ImageContainer></ImageContainer>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import ImageContainer from './components/ImageContainer.vue'
import Footer from './components/Footer.vue'


export default {
  name: 'app',
  components: {
    Header,
    ImageContainer,
    Footer
  }
}
</script>

<style>
#app {

}
</style>
