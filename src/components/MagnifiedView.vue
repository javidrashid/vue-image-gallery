<template>
    <div class="carousal-area" v-show="imagesObject.length > 0">
        <h4 class="alert alert-info" >Click below to See Zoomed View</h4>
        <div class="row container">
           <lightbox v-for="(img, index) in imagesObject"
              :thumbnail=img.imageData
              :images="[img.imageData]"
            ></lightbox>
        </div>
        <hr>
     <button @click="deleteAllImagesinParent" class="btn btn-danger btn-block ">Delete All Images [Clear Local Storage]</button>
    </div>
</template>
<script>
export default {
     props : ['imagesObject'],
    data() {
        return {
        }
    },
   methods: {
        deleteAllImagesinParent() {
            this.$emit('deleteAllImages')
        }
    }
}
</script>
<style>

</style>

