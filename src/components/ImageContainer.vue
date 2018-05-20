<template>
<div class="container">

      <h1 class="my-4 text-center text-lg-left">Thumbnail Gallery</h1>

      <div class="row text-center text-lg-left">

        <div class="col-lg-3 col-md-4 col-xs-6" v-for="img in images">
          <a href="#" class="d-block mb-4 h-100">
            <img class="img-fluid img-thumbnail" :src=img.icon alt="">
          </a>
        </div>
     
      </div>

    </div>    
</template>
<script>
export default {
    data() {
        return {
            images : [
                {'icon' : 'http://placehold.it/400x300'},
                {'icon' : 'http://placehold.it/400x300'},
                {'icon' : 'http://placehold.it/400x300'},
                {'icon' : 'http://placehold.it/400x300'},
                 {'icon' : 'http://placehold.it/400x300'},
                  {'icon' : 'http://placehold.it/400x300'}
            ]
        }
    },
    methods : {
        
    }
}
</script>
<style>

</style>
