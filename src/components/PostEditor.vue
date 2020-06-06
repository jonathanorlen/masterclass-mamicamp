<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <textarea
        cols="30" 
        rows="10" 
        class="form-input" 
        @blur="$v.form.text.$touch()"
        v-model="text"></textarea>
    </div>
    <template v-if="$v.form.text.$error">
      <span v-if="!$v.form.text.minLength" class="form-error">The text must be least 40 characters long</span>
    </template>
    <div class="form-actions">
      <button v-if="isUpdate" @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
      <button class="btn-blue">{{isUpdate ? 'Update' : 'Submit Post'}}</button>
    </div>
  </form>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators'
import {mapActions} from 'vuex'
export default {
  props: {
    threadId: {
      required: false
    },
    post: {
      type: Object,
      validator: obj => {
        const keyIsValid = typeof obj['.key'] === 'string'
        const textIsValid = typeof obj.text === 'string'
        const valid = keyIsValid && textIsValid

        if (!textIsValid) {
          console.log('The post prop object must include a text attribute')
        }

        return valid
      }
    }
  },
  data () {
    return {
      text: this.post ? this.post.text : ''
    }
  },
  validations: {
    form: {
      text: {
        minLength: minLength(40)
      }
    }
  },
  computed: {
    isUpdate () {
      return !!this.post
    }
  },
  methods: {
    ...mapActions('posts', ['createPost', 'updatePost']),
    save () {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        this.persist()
        .then(post => {
          this.$emit('save', {post})
        })
      }
    },
    cancel () {
      this.$emit('cancel')
    },
    create () {
      const post = {
        text: this.text,
        threadId: this.threadId
      }

      this.text = ''
      // this.$emit('save', { post })
      return this.createPost(post)
    },
    update () {
      const payload = {
        id: this.post['.key'],
        text: this.text
      }
      return this.updatePost(payload)
    },
    persist () {
      return this.isUpdate ? this.update() : this.create()
    }
  }
}
</script>
