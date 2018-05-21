<template>
    <div class="container">
      <h1 class="my-4 text-center text-lg-left">Thumbnail Gallery</h1>
      <p>Select images, they will be stored in your browser and will be displayed even after reload. Selecting big images (&gt; 2MB) can crash your browser.</p>
      <input type="file" id="files" @change="handleFileSelect">
      <p id="state">No images stored in your browser.</p>
      <div id="list">
        
      </div>
      <!-- <a href="#" id="deleteImgs" @click="deleteImages">Delete Images</a> -->
      
      <div class="row text-center text-lg-left">
        <div  class="col-lg-3 col-md-4 col-xs-6" v-for="(img, index) in imagesObject">
          <a href="#" class="d-block mb-4 h-100">
            <!-- <img class="img-fluid img-thumbnail"  :src="img" alt=""> -->
            <lightbox
             :thumbnail="img"
              :images="imagesObject"
            ></lightbox>
          </a>
        </div>
      </div>
      <button @click="deleteAllImages">Delete All Images</button>
    </div>    
</template>
<script>

export default {
    data() {
        return {
            imagesObject : [ ],
            imgData : ''
            
        }
    },
    components : {
      
    },
    methods : {

     handleFileSelect(evt) {
        var files = evt.target.files; // FileList object
       
        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

          // Only process image files.
          if (!f.type.match('image.*')) {
            continue;
          }
          var reader = new FileReader();
        
          // Closure to capture the file information.
          reader.onload = (e) => {
                              console.log(e);
                              this.imgData = e.target.result,
                              this.imagesObject.push(this.imgData);
                              localStorage.setItem("images", JSON.stringify(this.imagesObject));};
          
          //this.imagesObject.push(imgData)
          console.log('this imagesObject' , this.imagesObject);
          reader.readAsDataURL(f);
        }
    },
    loadFromLocalStorage(){
      var images = JSON.parse(localStorage.getItem("images"))

      if(images && images.length > 0){
        this.imagesObject = images;
        //images.forEach(displayImgData);
      }
    },
    deleteThisimage(index, e) {
      console.log('images are', this.imagesObject);
      localStorage.removeItem('images');
      this.imagesObject.splice(index, 1)
    },
    deleteAllImages() {
      localStorage.removeItem('images');
      this.imagesObject = [];
    }
    },
    mounted() {
      console.log('I got mounted');
      this.loadFromLocalStorage();
    }
    
}
</script>
<style>

</style>
