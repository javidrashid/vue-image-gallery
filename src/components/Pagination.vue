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
<style lang="scss">
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
    cursor:pointer;
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
