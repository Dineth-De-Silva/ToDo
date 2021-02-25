var Lasttodono = 0;
function Reloadtodoos() {
  firebase
    .database()
    .ref("ToDoos")
    .once("value", function (snapshot) {
      snapshot.forEach((childsnapshot) => {
        var ToDoos = document.getElementById("ToDoos");
        var Do = document.createElement("div");
        Do.id = childsnapshot.val().No;
        Do.style =
          "background-color: rgb(241, 241, 241); border-radius: 50px; padding: 10px; margin-bottom: 20px";
        Do.innerHTML = childsnapshot.val().Do;
        var ControlDo = document.createElement("span");
        ControlDo.style = "position: absolute; right: 15px;";
        var NotDone = document.createElement("img");
        NotDone.src = "Assets/Icons/NotDone.svg";
        NotDone.height = 28;
        NotDone.classList.add("DoControls");
        NotDone.style = "padding: 2px; margin-right: 15px";
        NotDone.title = "Remove";
        NotDone.addEventListener("click", function () {
          var RemoveDo = document.getElementById(childsnapshot.val().No);
          ToDoos.removeChild(RemoveDo);
          var RemoveDoF = firebase
            .database()
            .ref("ToDoos/" + childsnapshot.val().No);
          RemoveDoF.remove();
          console.log("ToDo No." + childsnapshot.val().No + " Removed");
          var Foot = document.getElementById("Foot");
          Foot.innerHTML = "";
          var Alert = document.createElement("div");
          Alert.classList.add("alert", "alert-danger");
          Alert.role = "alert";
          Alert.innerHTML = "Bad Boy !";
          Alert.style = "position: absolute; left: 5px; bottom: 0px";
          Foot.appendChild(Alert);
        });
        ControlDo.appendChild(NotDone);
        var Done = document.createElement("img");
        Done.src = "Assets/Icons/Done.svg";
        Done.height = 28;
        Done.classList.add("DoControls");
        Done.title = "Done";
        Done.addEventListener("click", function () {
          var RemoveDo = document.getElementById(childsnapshot.val().No);
          ToDoos.removeChild(RemoveDo);
          var RemoveDoF = firebase
            .database()
            .ref("ToDoos/" + childsnapshot.val().No);
          RemoveDoF.remove();
          console.log("ToDo No." + childsnapshot.val().No + " Done");
          var Foot = document.getElementById("Foot");
          Foot.innerHTML = "";
          var Alert = document.createElement("div");
          Alert.classList.add("alert", "alert-success");
          Alert.role = "alert";
          Alert.innerHTML = "Well Done !";
          Alert.style = "position: absolute; left: 5px; bottom: 0px";
          Foot.appendChild(Alert);
        });
        ControlDo.appendChild(Done);
        Do.appendChild(ControlDo);
        ToDoos.appendChild(Do);
        Lasttodono = childsnapshot.val().No;
      });
    });
}

function Addtodo() {
  var Nexttodono = String(Number(Lasttodono) + 1);
  var Do = window.prompt("What you have to do ?");
  firebase
    .database()
    .ref("ToDoos")
    .child(Nexttodono)
    .set({ No: Nexttodono, Do: Do });
  var Foot = document.getElementById("Foot");
  Foot.innerHTML = "";
  var Alert = document.createElement("div");
  Alert.classList.add("alert", "alert-primary");
  Alert.role = "alert";
  Alert.innerHTML = "ToDo Added !";
  Alert.style = "position: absolute; left: 5px; bottom: 0px";
  Foot.appendChild(Alert);
  console.log("ToDo No." + Nexttodono + " Added")
  var ToDoos = document.getElementById("ToDoos");
  ToDoos.innerHTML = "";
  Reloadtodoos();
}
