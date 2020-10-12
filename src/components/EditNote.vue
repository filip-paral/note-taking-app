<template>
  <div v-if="note" class="wrapper">
    <div class="edit-note container">
      <form @submit.prevent="EditNote">
        <div class="field title">
          <input class="title-input" type="text" placeholder="Title" name="title" v-model="note.title">
          <p v-if="feedback" class="red-txt">{{ feedback }}</p>
        </div>
        <div class="field add-note-txt">
          <textarea v-model="note.text" class="text-input" name="text-entry" placeholder="Create a note..." id="text-entry" cols="10" rows="10"></textarea>
        </div>
        <div class="field">
          <button class="submit-btn">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from "slugify";

export default {
  name: 'EditNote',
  data() {
    return {
      note: null,
      feedback: null
    }
  },
  methods: {
    EditNote() {
      if (this.note.title) {
        this.feedback = null
        this.note.slug = slugify(this.note.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!-:@]/g,
          lower: true
        })
        db.collection('notes').doc(this.note.id).update({
          title: this.note.title,
          text: this.note.text,
          slug: this.note.slug
        }).then(() => {
          this.$router.push({ name: 'Index' })
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.feedback = 'You must enter a title!'
      }
      console.log(this.note.title, this.note.text)
      console.log(this.note)
    }
  },
  created() {
    let ref = db.collection('notes').where('slug', '==', this.$route.params.note_slug)
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.data())
        this.note = doc.data()
        this.note.id = doc.id
      })
    })
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  margin: 1rem;
  .edit-note {
    width: 35vw;
    font-family: "Roboto", sans-serif;
    padding: 1%;
    border-radius: 8px;
    border-color: #e0e0e0;
    box-shadow: 0 0 8px rgba(0,0,0,0.20);
  }
}

input {
  width: 100%;
  border: none;
  &:focus {
    outline: none;
  }
}

.title-input {
  font-size: 1rem;
  padding-bottom: 10px;
  font-weight: 600;
}

.text-input {
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  line-height: 1.2rem;
  width: 100%;
  resize: none;
  border: none;
  margin-bottom: 2.5rem;
  &:focus {
    outline: none;
  }
}

.submit-btn {
  cursor: pointer;
  border: none;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  background-color: transparent;
  position: absolute;
  right: 10px;
  bottom: 10px;
}

.red-txt {
  color: red;
  font-size: 0.8rem;
  font-family: "Roboto", sans-serif;
}

.field {
  position: relative;
}
</style>