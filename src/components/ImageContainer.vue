<template>
<div class="container">

      <h1 class="my-4 text-center text-lg-left">Thumbnail Gallery</h1>
        <input type="file" id="files" name="files[]" multiple @change="handleFileSelect" />
        <div class="row text-center text-lg-left" id="list"></div>
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
      reader.onload = (function(theFile) {
        return function(e) {
            
          // Render thumbnail.
          console.log('result', e.target.result);
          
          var div = document.createElement('div');
          div.classList = 'col-lg-3 col-md-4 col-xs-6';
          div.innerHTML = ['<a class="d-block mb-4 h-100"><img class="thumb img-fluid img-thumbnail" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/></a>'].join('');
          document.getElementById('list').insertBefore(div, null);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  //document.getElementById('files').addEventListener('change', handleFileSelect, false);
    
}
}
</script>
<style>

</style>
