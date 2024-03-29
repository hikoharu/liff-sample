window.onload = function (e) {

  var firebaseConfig = {
    apiKey: "AIzaSyBojqefOzqaxQTLvQSjVikDWNGeT_F62nY",
    authDomain: "fleet-line-sample.firebaseapp.com",
    databaseURL: "https://fleet-line-sample.firebaseio.com",
    projectId: "fleet-line-sample",
    storageBucket: "fleet-line-sample.appspot.com",
    messagingSenderId: "169498183895",
    appId: "1:169498183895:web:889550fbd1e2d5eae78892",
    measurementId: "G-Q7WVTE7JE9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();

  liff.init(function (data) {
    fetch();
  });




function fetch(){

    liff.getProfile().then(function (profile) {
      fetchUser(profile)
    }).catch(function (error) {
        window.alert("Error getting profile: " + error);
    });

}

function convertDate(date, format) {

    format = format.replace(/YYYY/, date.getFullYear());
    format = format.replace(/MM/, date.getMonth() + 1);
    format = format.replace(/DD/, date.getDate());
    format = format.replace(/HH/, date.getHours());
    format = format.replace(/SS/, date.getSeconds());

    return format;
}

function fetchUser(profile){

  var userRef = db.collection("Uc642d701c541ce6f105320fcbc0ca12b").orderBy("datetime")

  userRef.get().then((query) => {
    var buff = [];
    query.forEach((doc) => {
      var data = doc.data();
      var drive = document.createElement("div")
      drive.innerHTML = convertDate(data.datetime.toDate(), 'YYYY年MM月DD日 HH:SS') + "    " + data.name
      document.getElementById("driving-record").appendChild(drive)
    });
  })
  .catch((error)=>{
    console.log(`データの取得に失敗しました (${error})`);
  });
}


}
