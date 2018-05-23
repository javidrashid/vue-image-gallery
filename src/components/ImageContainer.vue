<template>
    <div class="container main-body">
      <h1 class="my-4 text-center text-lg-left">Vue Image Gallery with LocalStorage Support</h1>
      <p>Select images, they will be stored in your browser and will be displayed even after reload. Selecting big images (&gt; 10MB) can crash your browser.</p>
      <!-- <input type="file" id="files" @change="handleFileSelect"> -->
       <label class="btn btn-success" @change="handleFileSelect">
            Add Image <input type="file" accept="image/*" hidden />
        </label>
      <div class="row text-center text-lg-left">
        <div  class="col-lg-3 col-md-4 col-xs-6" v-for="(img, index) in imagesObject">
          <a href="javascript:void(0)" class="d-block mb-4 h-100 potrait">
            <img class="img-fluid img-thumbnail" :src="img.imageData" alt="">
               <p class="alert alert-info font-weight-light">Uploaded On <span class="green">{{ img.dateUploaded }}</span></p>
               <button class="btn btn-block btn-sm btn-danger btn-small" @click="deleteThisImage(index, $event)">Delete</button>
             </a>
        </div>
        <hr>
   </div>
      <div class="carousal-area" v-show="imagesObject.length > 0">
        <h4 class="alert alert-info" >Click below to See Zoomed View</h4>
        <div class="row container">
           <lightbox v-for="(img, index) in imagesObject"
              :thumbnail=img.imageData
              :images="[img.imageData]"
            ></lightbox>
        </div>
        <hr>
     <button @click="deleteAllImages" class="btn btn-danger btn-block ">Delete All Images [Clear Local Storage]</button>
    </div>
      <hr>
      <div class="withpagination" v-show="imagesObject.length > 0">
         <h4 class="alert alert-info" >View Images Using Pagination</h4>
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
    </div>    
</template>
<script>
import moment from 'moment';
export default {
  data() {
    return {
      imagesObject: [],
      localStorageHasImages : [],
      galleryImages : [],
      bannerImage : [],
      paginate: ['images']
    };
    
  },
  methods: {
    handleFileSelect(evt) {
      var files = evt.target.files; 
      for (var i = 0, f; (f = files[i]); i++) {
        if (!f.type.match("image.*")) {
          continue;
        }
        var reader = new FileReader();
        reader.onload = e => {
          this.imagesObject.dateUploaded = new Date(e.timeStamp * 1000);
          this.imagesObject.push({'imageData' : e.target.result, 'dateUploaded' : moment().format('LLLL') });
          this.galleryImages.push(e.target.result);
          this.bannerImage.push(e.target.result);
          localStorage.setItem("images", JSON.stringify(this.imagesObject));
           this.$toastr('success', 'Image Added Successfully to Gallery', 'Image Added!!!');
           console.log(this.localStorageHasImages);
          };
       reader.readAsDataURL(f);
      }
    },
    loadFromLocalStorage() {
      var images = JSON.parse(localStorage.getItem("images"));
      if (images && images.length > 0) {
        this.imagesObject = images;
        this.localStorageHasImages = images.length;
        
      } else {
        //Incase we want to load Default Images
      }
    },
    deleteThisImage(index, e) {
      console.log('calling delete on singal file');
      this.imagesObject.splice(index, 1);
      this.bannerImage.splice(index, 1);
      this.$toastr('error', 'Image Deleted Successfully From View', 'Image Deleted!!!');
    },
    deleteAllImages() {
      localStorage.removeItem("images");
      this.imagesObject = [];
      this.bannerImage = [];
       this.$toastr('error', 'All Image have been deleted Successfully From LocalStorage', 'Cleared LocalStorage!!!');
    },
     moment: function (date) {
      return moment(date);
    },
    createImagesForPagination() {
    let pagArr = [];
    console.log(this.imagesObject);
    this.imagesObject.map((elem,index) => this.bannerImage.push(elem.imageData));
     console.log(this.bannerImage);
  },
  },
  
   mounted() {
    this.loadFromLocalStorage();
    this.createImagesForPagination();
  }
};
</script>
<style lang="scss" >
.main-body{
  min-height:500px;
}
.img-thumbnail {
    width: 400px;
    height: 300px;
}

.lightbox__thumbnail {
    display: block;
    width: 30px !important;
    height: 30px !important;
}

.font-weight-light {
    font-size: 12px;
}

a {
    /* border: 2px solid rgba(0, 0, 0, 0.678); */
    cursor: auto;
    text-decoration: none !important;
}
a.potrait {
  cursor: auto;
}

.alert-info span {
    color: red;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

.paginate-list {
    width: 159px;
    margin: 0 auto;
    text-align: left;
    li {
        display: block;
        &:before {
            content: '⚬ ';
            font-weight: bold;
            color: slategray;
        }
    }
}

.paginate-links.items {
    user-select: none;
}

li.active a {
    font-weight: bold;
}

a {
    cursor: pointer;
}

li.next:before {
    content: ' | ';
    margin-right: 13px;
    color: #ddd;
}

li.disabled a {
    color: #ccc;
    cursor: no-drop;
}

a {
    color: #42b983;
}

.withpagination {
    text-align: center;
    h4 {
      text-align:left;
    }
}
</style>
