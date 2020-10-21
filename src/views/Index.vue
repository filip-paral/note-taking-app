<template>
  <div class="container">
    <div class="search-wrapper">
      <div class="search-box">
        <i class="fas search-icon fa-search"></i>
        <input type="text" v-model="search" placeholder="Search" />
      </div>
    </div>
    <!-- Add Modal -->
    <button type="button" class="add-btn" @click="showModal = true">
      <i class="fas plus-icon fa-3x fa-plus"></i>
    </button>
    <transition name="fade" appear>
      <div
        class="modal-overlay"
        v-if="showModal"
        @click="showModal = false"
      ></div>
    </transition>
    <transition name="pop">
      <div class="modal" v-if="showModal">
        <form @submit.prevent="addNote">
          <div class="field title">
            <input
              class="title-input"
              type="text"
              placeholder="Title"
              name="title"
              v-model="title"
            />
            <p v-if="feedback" class="red-txt">{{ feedback }}</p>
          </div>
          <div class="field add-note-txt">
            <textarea
              v-model="text"
              class="text-input"
              name="text-entry"
              placeholder="Create a note..."
              cols="10"
              rows="10"
            ></textarea>
          </div>
          <div class="field">
            <button class="submit-btn">Save</button>
          </div>
        </form>
      </div>
    </transition>
    <!-- Edit Modal -->
    <transition name="fade" appear>
      <div
        class="modal-overlay"
        v-if="showEdit"
        @click="showEdit = false"
      ></div>
    </transition>
    <transition name="pop">
      <div class="modal" v-if="showEdit">
        <form @submit.prevent="editNote">
          <div class="field title">
            <input
              class="title-input"
              type="text"
              placeholder="Title"
              name="title"
              v-model="note.title"
            />
            <p v-if="feedback" class="red-txt">{{ feedback }}</p>
          </div>
          <div class="field add-note-txt">
            <textarea
              v-model="note.text"
              class="text-input"
              name="text-entry"
              placeholder="Create a note..."
              cols="10"
              rows="10"
            ></textarea>
          </div>
          <div class="field">
            <button class="submit-btn">Save</button>
          </div>
        </form>
      </div>
    </transition>
    <!-- Card section-->
    <div class="card-section">
      <div
        class="note-card"
        v-for="item in filteredList"
        :key="item.id"
        v-bind:style="{ backgroundColor: item.bg }"
      >
        <h2>{{ item.title }}</h2>
        <p class="card-txt" v-if="item.text.length > 300">
          {{ item.text.substring(0, 300) + "..." }}
        </p>
        <p class="card-txt" v-if="item.text.length < 300">{{ item.text }}</p>
        <div class="edit-bar">
          <i
            class="fas fa-1x fa-trash-alt edit-icon"
            @click="deleteNote(item.id)"
          ></i>
          <i
            class="fas fa-1x fa-edit edit-icon"
            @click="grabData(item.title)"
          ></i>
          <div>
            <i
              class="fas fa-1x fa-palette edit-icon color-icon"
              @click="showColorBar()"
            ></i>
          </div>
          <transition name="fade" appear>
            <div
              class="color-picker"
              @mouseleave="showColorBar()"
              v-if="showColors"
            >
              <i
                class="fas fa-2x white-ico fa-circle"
                @click="changeColor('#f8f8f8', item.id)"
              ></i>
              <i
                class="fas fa-2x red-ico fa-circle"
                @click="changeColor('#f28b82', item.id)"
              ></i>
              <i
                class="fas fa-2x yellow-ico fa-circle"
                @click="changeColor('#fff475', item.id)"
              ></i>
              <i
                class="fas fa-2x cyan-ico fa-circle"
                @click="changeColor('#a7ffeb', item.id)"
              ></i>
              <i
                class="fas fa-2x blue-ico fa-circle"
                @click="changeColor('#aecbfa', item.id)"
              ></i>
              <i
                class="fas fa-2x pink-ico fa-circle"
                @click="changeColor('#fdcfe8', item.id)"
              ></i>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
import firebase from "firebase";

export default {
  name: "Index",
  data() {
    return {
      notes: [],
      altNotes: [],
      updatedNotes: [],
      note: null,
      showColors: false,
      showModal: false,
      showEdit: false,
      title: null,
      text: null,
      feedback: null,
      slug: null,
      search: ""
    };
  },
  methods: {
    showColorBar() {
      if (this.showColors) {
        this.showColors = false;
      } else {
        this.showColors = true;
      }
    },
    changeColor(color, id) {
      db.collection("users")
        .doc(this.$route.params.username)
        .collection("notes")
        .doc(id)
        .update({
          bg: color
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteNote(id) {
      // delete doc from firestore
      db.collection("users")
        .doc(this.$route.params.username)
        .collection("notes")
        .doc(id)
        .delete();
    },
    addNote() {
      // title check
      if (this.title && this.text) {
        this.feedback = null;
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!-:@]/g,
          lower: true
        });
        db.collection("users")
          .doc(this.$route.params.username)
          .collection("notes")
          .add({
            title: this.title,
            text: this.text,
            slug: this.slug,
            bg: "#f8f8f8",
            dateCreated: Date()
          })
          .catch(err => {
            console.log(err);
          });
        this.showModal = false;
        this.title = null;
        this.text = null;
        this.slug = null;
      } else if (this.title && !this.text) {
        this.feedback = "You must enter some text.";
      } else {
        this.feedback = "You must enter a title.";
      }
    },
    grabData(title) {
      let ref = db
        .collection("users")
        .doc(this.$route.params.username)
        .collection("notes")
        .where("title", "==", title);
      ref.get().then(snapshot => {
        snapshot.forEach(doc => {
          this.note = doc.data();
          this.note.id = doc.id;
          this.showEdit = "true";
        });
      });
    },
    editNote() {
      if (this.note.title && this.note.text) {
        this.feedback = null;
        this.note.slug = slugify(this.note.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!-:@]/g,
          lower: true
        });
        db.collection("users")
          .doc(this.$route.params.username)
          .collection("notes")
          .doc(this.note.id)
          .update({
            title: this.note.title,
            text: this.note.text,
            slug: this.note.slug
          })
          .catch(err => {
            console.log(err);
          });
        this.showEdit = false;
      } else if (this.note.title && !this.note.text) {
        this.feedback = "You must enter some text.";
      } else {
        this.feedback = "You must enter a title.";
      }
    }
  },
  computed: {
    filteredList() {
      return this.notes.filter(item => {
        return item.title.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  mounted() {
    console.log(firebase.auth().currentUser);
    db.collection("users")
      .doc(this.$route.params.username)
      .collection("notes")
      .orderBy("dateCreated")
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          let onsnap = doc.data();
          onsnap.id = doc.id;
          this.updatedNotes.push(onsnap);
        });
        this.updatedNotes.reverse();
        this.notes = this.updatedNotes;
        this.updatedNotes = [];
      });
  }
};
</script>

<style scoped lang="scss">
.container {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

// SEARCH BAR
.search-wrapper {
  display: flex;
  position: relative;
  margin: 1rem auto;
  justify-content: center;
  .search-box {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f1f3f4;
    height: 45px;
    border-radius: 20px;
    padding: 12px;
    input {
      border: 1px solid #5f6368;
      width: 33vw;
      font-size: 1.2rem;
      background-color: #f1f3f4;
      border: none;
      @media screen and (max-width: 768px) {
        width: 80%;
      }
    }
    .search-icon {
      margin-right: 20px;
      margin-left: 10px;
      color: #707071;
    }
  }
}

// MODAL
.add-btn {
  border-radius: 100%;
  border: none;
  text-decoration: none;
  background-color: #eb5160;
  width: 70px;
  height: 70px;
  position: fixed;
  z-index: 100;
  right: 30px;
  bottom: 30px;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
  .plus-icon {
    color: #fff;
  }
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.3);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: all 0.3s ease;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

.modal {
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  z-index: 100;
  width: 100%;
  max-width: 500px;
  background: #ffffff;
  border-radius: 10px;
  padding: 16px;
  @media screen and (max-width: 768px) {
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }
}

// CARDS
.card-section {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 12px;
  margin: 2vw 3vw;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (max-width: 450px) {
    grid-template-columns: 1fr;
  }
  .note-card {
    background-color: #f8f8f8;
    padding: 5% 5% 15% 5%;
    border-radius: 6px;
    position: relative;
    border: 2px solid transparent;
    transition: border 0.4s ease;
    &:hover {
      border: 2px solid #747474;
    }
    h2 {
      font-family: "Noto Sans JP", sans-serif;
      font-weight: 500;
      font-size: 1.2rem;
      margin-bottom: 10px;
    }
    p {
      font-family: "Roboto", sans-serif;
      font-size: 1rem;
      font-weight: 300;
    }
    .color-picker {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      background: #fff;
      height: 40px;
      position: absolute;
      bottom: 30px;
      left: 0;
      z-index: 500;
      border-radius: 3px;
      .fa-circle {
        cursor: pointer;
        width: 15%;
      }
      .white-ico {
        color: #f8f8f8;
      }
      .red-ico {
        color: #f28b82;
      }
      .yellow-ico {
        color: #fff475;
      }
      .cyan-ico {
        color: #a7ffeb;
      }
      .blue-ico {
        color: #aecbfa;
      }
      .pink-ico {
        color: #fdcfe8;
      }
    }
  }

  .note-card:hover .edit-bar {
    opacity: 1;
  }

  .edit-bar {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: baseline;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 30px;
    width: 100%;
    padding: 3px 5% 10% 5%;
    opacity: 0;
    transition: opacity 0.4s ease;
    .edit-icon {
      color: #747474;
      cursor: pointer;
      margin-right: 10%;
      transition: color 0.2s ease;
      &:hover {
        color: black;
      }
    }
  }
}

//FORM
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
  font-family: "Helvetica Neue", "Helvetica", sans-serif;
  font-weight: 500;
  position: absolute;
  right: 10px;
  bottom: 10px;
  background: #ffffff;
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
