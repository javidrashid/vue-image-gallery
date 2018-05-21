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
        <ul>
          <li v-for="img in imagesObject">{{img}}</li>


        </ul>
        <ul>
          <li v-for="img in imagesObject">
            <img :src="img" alt="">
          </li>
        </ul>
      </div>
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
          reader.onload = (e) => {this.imgData = e.target.result, this.imagesObject.push(this.imgData)};
          
          //this.imagesObject.push(imgData)
          console.log('this imagesObject' , this.imagesObject);
          reader.readAsDataURL(f);
        }
    }
    }
    
}
</script>
<style>

</style>
