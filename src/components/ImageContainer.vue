<template>
    <div class="container">
      <h1 class="my-4 text-center text-lg-left">Thumbnail Gallery</h1>
      <p>Select images, they will be stored in your browser and will be displayed even after reload. Selecting big images (&gt; 2MB) can crash your browser.</p>
      <!-- <input type="file" id="files" @change="handleFileSelect"> -->
       <label class="btn btn-success" @change="handleFileSelect">
            Add Image <input type="file" accept="image/*" hidden />
        </label>
      <div class="row text-center text-lg-left">
        <div  class="col-lg-3 col-md-4 col-xs-6" v-for="(img, index) in imagesObject">
          <a href="#" class="d-block mb-4 h-100">
            <img class="img-fluid img-thumbnail" :src="img.imageData" alt="">
               <p class="alert alert-info font-weight-light">Uploaded On <span class="green">{{ img.dateUploaded }}</span></p>
               <button class="btn btn-block btn-sm btn-danger btn-small" @click="deleteThisimage(index, $event)">Delete</button>
             </a>
        </div>
        <hr>
   </div>
      <div class="carousal-area" v-hide="this.localStorageHasImages.length === 0">
        <h2 class="alert alert-info">Generate a Carousal</h2>
        <div class="row">
           <lightbox v-for="(img, index) in imagesObject"
              :thumbnail=img.imageData
              :images="[img.imageData]"
            ></lightbox>
        </div>
        <hr>
     <button @click="deleteAllImages" class="btn btn-danger btn-block ">Delete All Images [Clear Local Storage]</button>
    </div>
      <hr>
     

    </div>    
</template>
<script>
import moment from 'moment';

export default {
  data() {
    return {
      imagesObject: [
        
      ],
      langs: ['JavaScript', 'PHP', 'HTML', 'CSS', 'Ruby', 'Python', 'Erlang'],
       paginate: ['languages'],
     localStorageHasImages : [],
     galleryImages : []
    };
  },
  components: {},
  methods: {
    showHideBanner() {
      console.log(this.localStorageHasImages.length);
    },
    handleFileSelect(evt) {
      var files = evt.target.files; // FileList object
      // Loop through the FileList and render image files as thumbnails.
      for (var i = 0, f; (f = files[i]); i++) {
        // Only process image files.
        if (!f.type.match("image.*")) {
          continue;
        }
        var reader = new FileReader();
        // Closure to capture the file information.
        reader.onload = e => {
          console.log("ImageData", e.target.result);
          console.log("Uplaoded At", new Date(e.timeStamp * 1000));
          this.imagesObject.dateUploaded = new Date(e.timeStamp * 1000);
          this.imagesObject.push({'imageData' : e.target.result, 'dateUploaded' : moment().format('LLLL') });
          this.galleryImages.push(e.target.result)
          localStorage.setItem("images", JSON.stringify(this.imagesObject));
          //localStorage.setItem("DU", JSON.stringify(moment().format('LLLL')));
        
        };

        console.log(this.dateField);
        //this.imagesObject.push(imgData)
        //console.log('this imagesObject' , this.imagesObject);
        reader.readAsDataURL(f);

        // reader.onloadend = () => {
        //   let d = new Date();
        //   this.dateField =
        //     d.getDate() +
        //     "-" +
        //     (d.getMonth() + 1) +
        //     "-" +
        //     d.getFullYear() +
        //     " " +
        //     d.getHours() +
        //     ":" +
        //     d.getMinutes();
        //   //  localStorage.setItem("dateField", JSON.stringify(this.dateField));
        // };
      }
    },
    loadFromLocalStorage() {
      var images = JSON.parse(localStorage.getItem("images"));
      console.log("images", images);
      if (images && images.length > 0) {
        this.imagesObject = images;
        console.log('images available in localstorage are', images.length);
        this.localStorageHasImages = images.length;
        
      } else {
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
      console.log("images are", this.imagesObject);
      localStorage.removeItem("images");
      this.imagesObject.splice(index, 1);
    },
    deleteAllImages() {
      localStorage.removeItem("images");
      this.imagesObject = [];
    },
     moment: function (date) {
      return moment(date);
    },
  },

  mounted() {
    console.log("I got mounted");
    this.loadFromLocalStorage();
    this.showHideBanner();
  }
};
</script>
<style>
.img-thumbnail {
  
  width: 400px;
  height: 300px;
}
.lightbox__thumbnail {
  border: 2px solid green;
  display: block;
  width: 50px !important;
  height: 50px !important;
}
.font-weight-light {
  font-size:12px;
 
  
}
a {
  /* border: 2px solid rgba(0, 0, 0, 0.678); */
   cursor: auto;
   text-decoration: none !important;
}
.alert-info span {
  color : red;
}
</style>
