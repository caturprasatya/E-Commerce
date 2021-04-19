<template>
  <section id="add-banner-page">
      <div class="container-fluid text-landing d-flex justify-content-center">
        <div class="col-lg backlay white-txt">
          <main class="form-signin">
            <form>
              <div>
                <h1 class="h3 mb-3 fw-normal text-center">Upload Image</h1>
                <label for="caption">Caption</label>
                <input v-model="caption" type="url" id="caption" class="form-control" placeholder="Caption..." autofocus>
                <label for="#">Upload Image</label>
                <input type="file" ref="input1"
                @change="previewImage" accept="image/*" autofocus>
                <div v-if="imageData!=null">
                  <img class="preview" height="268" width="356" :src="img_url">
                  <br>
                </div>
                 <div class="d-flex justify-content-center">
                  <div class="card mb-4" style="width: 28rem; color: black">
                    <div class="card-body">
                      <small>
                        <p class="small-text">Image URL:</p>
                        <hr>
                        <p v-if="caption" class="very-small-text">On process...</p>
                        <p v-if="img_url" class="very-small-text my-3">{{ img_url }}</p>
                        <p v-if="img_url" class="very-small-text">*Copy image url to input</p>
                      </small>
                    </div>
                  </div>
                </div>
                <button @click.prevent="create" class="w-100 btn btn-lg btn-outline-light" type="submit">Upload</button>
                <br>
                <br>
                <button class="w-100 btn btn-lg btn-warning btn-outline-light"  @click.prevent="back"><i class="fas fa-sign-out-alt"></i> Back</button>
              </div>
          </form>
        </main>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      caption: '',
      img_url: '',
      imageData: null,
      uploadValue: 0
    }
  },
  methods: {
    create () {
      const post = {
        photo: this.img_url,
        caption: this.caption
      }
      if (!post.photo || !post.caption.length) {
        Swal.fire({
          icon: 'error',
          title: 'fill in all data'
        })
      } else {
        firebase.database().ref('PhotoGallery').push(post)
          .then((response) => {
            console.log(response)
            Swal.fire(
              'Greet!',
              'Success upload data!',
              'success'
            )
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    click1 () {
      this.$refs.input1.click()
    },
    previewImage (event) {
      this.uploadValue = 0
      this.img_url = null
      this.imageData = event.target.files[0]
      this.onUpload()
    },
    onUpload () {
      if (!this.caption.length) {
        Swal.fire({
          icon: 'error',
          title: 'fill in all data'
        })
      } else {
        this.img_url = null
        const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData)
        storageRef.on('state_changed', snapshot => {
          this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        error => { console.log(error.message) },
        () => {
          this.uploadValue = 100
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.img_url = url
            console.log(this.img_url)
          })
        }
        )
      }
    },
    back () {
      this.$router.push('/dashboard')
      this.caption = ''
      this.img_url = ''
    }
  }
}
</script>

<style>

</style>
