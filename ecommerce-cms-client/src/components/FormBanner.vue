<template>
  <section id="add-banner-page">
      <div class="container-fluid text-landing d-flex justify-content-center">
        <div class="col-lg backlay white-txt">
          <main class="form-signin">
            <form>
              <h1 class="h3 mb-3 fw-normal text-center">Add Banner</h1>
              <label for="bannerUrl">Banner Url</label>
              <input v-model="banner_url" type="url" id="bannerUrl" class="form-control" placeholder="Banner Url" autofocus>
              <label for="title">Title</label>
              <input v-model="title" type="text" id="title-banner" class="form-control" placeholder="title">
              <p for="status">Status</p>
              <div class="form-check">
                <input v-model="status" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="true">
                <label class="form-check-label" for="flexRadioDefault1">
                  Active
                </label>
              </div>
              <div class="form-check">
                <input v-model="status" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="false">
                <label class="form-check-label" for="flexRadioDefault2">
                  Inactive
                </label>
              </div>
            <div class="mb-3"></div>
            <button v-if="onEdit" @click.prevent="editBanner" class="w-100 btn btn-lg btn-outline-light" type="submit">Edit Banner</button>
            <button v-else @click.prevent="addBanner" class="w-100 btn btn-lg btn-outline-light" type="submit">Add Banner</button>
            <br>
            <br>
            <button class="w-100 btn btn-lg btn-warning btn-outline-light"  @click.prevent="back"><i class="fas fa-sign-out-alt"></i> Back</button>
          </form>
        </main>
      </div>
    </div>
  </section>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      id: 0,
      banner_url: '',
      title: '',
      status: '',
      onEdit: false
    }
  },
  methods: {
    addBanner () {
      const data = {
        banner_url: this.banner_url,
        title: this.title,
        status: this.status
      }
      Swal.fire(
        'Greet!',
        'Success add new product!'
      )
      this.clearForm()
      this.$store.dispatch('addBanner', data)
      this.$store.commit('dataBanner', {})
    },
    editBanner () {
      const banner = {
        banner_url: this.banner_url,
        title: this.title,
        status: this.status
      }
      const id = this.id
      this.clearForm()
      this.$store.dispatch('editBanner', { banner, id })
      this.$store.commit('dataBanner', {})
    },
    clearForm () {
      this.id = ''
      this.title = ''
      this.banner_url = ''
      this.status = ''
      this.onEdit = false
    },
    back () {
      this.$store.commit('dataBanner', {})
    }
  },
  created () {
  },
  beforeUpdate () {
  },
  mounted () {
    const data = this.$store.state.banner
    this.id = data.id
    this.title = data.title
    this.banner_url = data.banner_url
    this.status = data.status
    if (data.title) {
      this.onEdit = true
    }
  }
}
</script>

<style>
</style>
