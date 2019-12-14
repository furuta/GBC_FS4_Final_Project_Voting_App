import firebase from "../fbConfig";
const db = firebase.firestore();

export default function saveStore({
  candidate,
  birthday,
  happiness,
  province,
  temperature
}) {
  // candidate
  addVotes("candidates", candidate);
  addDoc("birthDates", birthday);
  addVotes("happiness", happiness);
  addVotes("resideProvince", province);
  addVotes("temperature", temperature);
}

function addVotes(collectionName, target) {
  target = target.toString();
  let data = {
    votes: 1
  };
  db.collection(collectionName)
    .doc(target)
    .get()
    .then(doc => {
      if (doc.exists) {
        data.votes += doc.data().votes;
      }
      db.collection(collectionName)
        .doc(target)
        .set(data);
    })
    .catch(err => {
      console.log("Error getting document", err);
    });
}

function addDoc(collectionName, target) {
  db.collection(collectionName)
    .add({
      date: target
    })
    .then(ref => {
      console.log("Added document with ID: ", ref.id);
    });
}
