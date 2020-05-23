var config = {
  apiKey: "AIzaSyCXM3eVPdinynCUbU1RkGVq2V5LNzv6DpY",
  authDomain: "mainserver-c1560.firebaseapp.com",
  databaseURL: "https://mainserver-c1560.firebaseio.com",
  projectId: "mainserver-c1560",
  storageBucket: "mainserver-c1560.appspot.com",
  messagingSenderId: "107380399049",
  appId: "1:107380399049:web:0e2f8086f44986b940a618",
  measurementId: "G-SRTPSCM310",
};

if (!firebase.apps.length) {
  var app = firebase.initializeApp(config);
}
var db = firebase.firestore();

async function getMarkers() {
  const snapshot = await db.collection("internship").get();
  var dataFromFirestore = snapshot.docs.map((doc) => doc.data());
  for (i = 0; i < dataFromFirestore.length; i++) {
    var temp = dataFromFirestore[i];
    var name = temp.name;
    var contact = temp.contact;
    var info = temp.info;
    var position = temp.position;
    var role = temp.role;
    addElementToHTML(name, contact, info, position, role);
  }
}

function addElementToHTML(name, contact, info, position, role) {
  //TODO: add element into html
  var but = '<button class="collapsible">' + name + "</button>";
  var table =
    '<table><tr><td colspan="2">' +
    info +
    "</td><tr><td>" +
    role +
    "</td><td>" +
    contact +
    "</td></tr></table>";
  var sub = '<div class="content"><p>' + table + "</p></div>";
  var ele = but + sub;
  $(".newHTML").after(ele);
}

getMarkers().then(() => {
  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      console.log("Hi");
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
});
