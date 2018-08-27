import * as firebase from "firebase";
//require('firebase/firestore')

firebase.initializeApp({

});

const firestore = firebase.firestore();
const settings = {
  /* your settings... */
  timestampsInSnapshots: true
};
firestore.settings(settings);

const db = firebase.firestore();
const tasks = db.collection("tasks");

// Getting Real time feeds
// tasks.onSnapshot(querySnapshot => {
//   const myTasks = []
//   querySnapshot.forEach(doc => {
//     myTasks.push({
//       id: doc.id,
//       ...doc.data()
//     })
//   })
//   store.commit('watchTasks', myTasks)
// })

export default {
  auth: ({ email, password }) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        return { error };
      });
  },

  createUser: ({ email, password }) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        return { error };
      });
  },

  logout: () => {
    return firebase
      .auth()
      .signOut()
      .catch(function(error) {
        return { error };
      });
  },

  checkAuth: () => {
    return Promise.resolve(firebase.auth().currentUser);
  },

  fetchTasks: () => {
    return tasks.get();
  },

  addTask: entry => {
    return tasks.add(entry);
  },

  updateTask: entry => {
    let inputData = {
      ...entry,
      updated: new Date()
    };
    delete inputData["id"];
    return tasks.doc(entry.id).update(inputData);
  },

  removeTask: id => {
    return tasks.doc(id).delete();
  }
};
