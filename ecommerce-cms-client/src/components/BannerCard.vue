<template>
  <div class="card mb-3 shadow-lg">
    <img :src="banner.banner_url" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title"> Title: <i>{{banner.title}}</i> </h5>
      <p v-if="banner.status" class="card-text">Status: Active </p>
      <p v-else class="card-text">Status: Inactive </p>
      <div class="my-3">
        <a class="btn btn-warning" @click.prevent="editPage(banner)"><small>Edit</small></a> <a class="btn btn-danger" @click.prevent="deleteBanner(banner.id)">Delete</a>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data () {
    return {
    }
  },
  props: ['banner'],
  methods: {
    editPage (banner) {
      this.$store.commit('dataBanner', banner)
      this.$router.push('/formbanner')
    },
    deleteBanner (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You can\'t revert your action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes Delete it!',
        cancelButtonText: 'No, Keep it!',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('deleteBanner', { id })
          Swal.fire('Deleted', 'You successfully deleted this file', 'success')
        } else {
          Swal.fire('Cancelled', 'Your file is still intact', 'info')
        }
      })
    }
  },
  created () {
  }
}
</script>

<style>

</style>
