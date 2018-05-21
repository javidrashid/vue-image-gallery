<template>
    <div class="container">
      <h1 class="my-4 text-center text-lg-left">Thumbnail Gallery</h1>
      <p>Select images, they will be stored in your browser and will be displayed even after reload. Selecting big images (&gt; 2MB) can crash your browser.</p>
      <input type="file" id="files" @change="handleFileSelect">
      <p id="state">No images stored in your browser.</p>
      <div id="list">
        
      </div>
      <div class="row text-center text-lg-left">
        <div  class="col-lg-3 col-md-4 col-xs-6" v-for="(img, index) in imagesObject">
          <a href="#" class="d-block mb-4 h-100">
            <img class="img-fluid img-thumbnail"  :src="img" alt="">
             <button class="btn btn-danger btn-small" @click="deleteThisimage(index, $event)">Delete</button>
           </a>
        </div>
        <hr>
   </div>
      <div >
            <h2 class="alert alert-info">Generate a Carousal</h2>
            
        </div>
        <div class="row">
           <lightbox v-for="(img, index) in imagesObject"
             :thumbnail="img"
              :images="imagesObject"
            ></lightbox>
        </div>
        <hr>
     
      <button @click="deleteAllImages" class="btn btn-danger btn-block ">Delete All Images</button>
      <hr>
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
                              console.log('Uplaoded At',   files[0].lastModified);
                              this.imgData = e.target.result,
                              this.imagesObject.push(this.imgData);
                              localStorage.setItem("images", JSON.stringify(this.imagesObject));};
          
          //this.imagesObject.push(imgData)
          //console.log('this imagesObject' , this.imagesObject);
          reader.readAsDataURL(f);
        }
    },
    loadFromLocalStorage(){
      var images = JSON.parse(localStorage.getItem("images"))
    console.log('images', images);
      if(images && images.length > 0){
        this.imagesObject = images;
        //let listofImages = []
       }
      else {
        //let listofImages = [require('../assets/garden-rose1.jpeg'),require('../assets/ultra.jpg'), require('../assets/hiking.jpg') ];
        // var dummyImage; 
        // console.log('Local Storage is empty', this.imagesObject);
        // let dummyImage1 = require('../assets/garden-rose1.jpeg');
        // this.imagesObject.push(dummyImage1);
        // let dummyImage2 = require('../assets/ultra.jpg')
        // this.imagesObject.push(dummyImage2);
        // let dummyImage3 = require('../assets/hiking.jpg')
        // this.imagesObject.push(dummyImage3);
        // let dummyImage4 = require('../assets/melb.jpg')
        // let dummyImage5 = require('../assets/greenpark.jpg')
        // let dummyImage6 = require('../assets/scenery.jpg')
        // let dummyImage7 = require('../assets/tiger.jpeg')
         
         
       
       // this.imagesObject = listofImages;
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
.img-thumbnail {
  border:1px solid red;
  width:400px;
  height: 300px;
}
.lightbox__thumbnail {
  border: 2px solid green;
    display: block;
    width: 50px !important;
    height: 50px !important;
}
</style>
