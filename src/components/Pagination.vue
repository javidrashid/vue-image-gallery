<template>
    <div class="withpagination" v-show="imagesObject.length > 0">
         <h4 class="alert alert-info" >View Images With Pagination</h4>
          <paginate
          name="images"
          :list="bannerImage"
          :per="1"
          >
            <li v-for="img in paginated('images')">
              <img :src="img" alt="">
            </li>
        </paginate>
         <paginate-links for="images" :limit="2" :show-step-links="true"></paginate-links>
      </div>
</template>

<script>
export default {
    props : ['bannerImage','imagesObject'],
    data() {
        return {
             paginate: ['images']
        }
    }
}
</script>
<style>

</style>
