<template>
  <div class="container">
    <router-link :to="{ name: 'AddNote' }">
      <button class="add-btn"><i class="fas plus-icon fa-3x fa-plus"></i></button>
    </router-link>
    <div class="wrapper">
      <div class="note-card" v-for="note in notes" :key="note.id">
        <h2>{{ note.title }}</h2>
        <p class="card-txt">{{ note.text }}</p>
        <div class="edit-bar">
          <i
              class="fas fa-1x fa-trash-alt edit-icon"
              @click="deleteNote(note.id)"
          ></i>
          <router-link :to="{ name: 'EditNote', params: {note_slug: note.slug} }">
            <i class="fas fa-1x fa-edit edit-icon"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "Index",
  data() {
    return {
      notes: [],
    };
  },
  methods: {
    deleteNote(id) {
      // delete doc from firestore
      db.collection('notes').doc(id).delete()
          .then(() => {
            this.notes = this.notes.filter(note => {
              return note.id != id
            })
          })
    },
  },
  created() {
    // fetch data from firestore
    db.collection("notes")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let note = doc.data()
            note.id = doc.id
            this.notes.push(note)
          });
        });
  },
};

</script>

<style scoped lang="scss">
.add-btn {
  border-radius: 100%;
  border: none;
  text-decoration: none;
  background-color: #f1b005;
  width: 70px;
  height: 70px;
  position: absolute;
  right: 30px;
  bottom: 30px;
  cursor: pointer;
  .plus-icon {
    color: #fff;
  }
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 20px;
  .note-card {
    background-color: #e8eaed;
    padding: 2% 5%;
    border-radius: 6px;
    h2 {
      font-family: "Poppins", sans-serif;
      font-weight: 500;
      font-size: 1.2rem;
    }
    p {
      font-family: "Roboto", sans-serif;
      font-weight: 200;
    }
    .edit-bar {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: baseline;
      .edit-icon {
        color: #747474;
        cursor: pointer;
        margin-right: 5%;
        &:hover {
          color: black;
        }
      }
    }
  }
}
</style>
