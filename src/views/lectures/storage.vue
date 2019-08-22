<template>
  <v-container grid-list-md>
    <v-card>
      <v-card-title>
        storage test
      </v-card-title>
      <v-card-text>
        <v-file-input
          v-model="files"
          label="File input"
          prepend-icon="mdi-camera"
        ></v-file-input>
      </v-card-text>
      <v-card-actions>
        <v-spacer>

        </v-spacer>
        <v-btn color="primary" @click="upload" :loading="loading">upload</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      files: [],
      loading: false
    }
  },
  methods: {
    upload () {
      console.log(this.files)
      const storageRef = this.$firebase.storage().ref()
      this.loading = true
      const uploadTask = storageRef.child(this.files.name).put(this.files)

      uploadTask.on(this.$firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case this.$firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused')
              break
            case this.$firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running')
              break
          }
        }, (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
            // User doesn't have permission to access the object
              console.error('storage/unauthorized')
              break

            case 'storage/canceled':
            // User canceled the upload
              console.error('storage/canceled')
              break

            case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
              console.error('storage/unknown')
              break
          }
          this.loading = false
        }, () => {
        // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL)
          })
          this.loading = false
        })
    }
  }
}
</script>
