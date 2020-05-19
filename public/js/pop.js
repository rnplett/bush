
let searchData = [];

// Get the modal
const modal = document.getElementById("myModal"); 

// Get the button that opens the modal


// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// Add Parent functions
document.getElementById("myParentBtn").onclick = () => {
  modal.style.display = "block";
  document.getElementById("addType").value = "addParent";
  document.getElementById("searchStr").focus();
}

function addParent(id,fid) {
  searchData.forEach((p) => {
    if (p.id == id) {
      // turn off modal
      modal.style.display = "none";
      // add parent to display
      if (!fid) { fid = 'p01' };
      let f = document.getElementById("parentFamily" + fid);
      if (!f) {
        const l = document.getElementById("prettyParentList");
        f = document.createElement('div');
        f.id = 'parentFamily' + fid;
        l.appendChild(f);
      }
      addPersonCard(f, p);
      const n = document.getElementById("hiddenInputs");
      addInputField(n, "parent", p, fid);
      document.getElementById("searchStr").value = "";
      document.getElementById("selectionList").innerHTML = "";
    }
  })
}

// Add Parent functions
document.getElementById("myFamilyBtn").onclick = () => {
  modal.style.display = "block";
  document.getElementById("addType").value = "addFamily";
  document.getElementById("searchStr").focus();
}

function addFamily(id) {
  searchData.forEach((p) => {
    if (p.id == id) {
      // turn off modal
      modal.style.display = "none";
      // add parent to display
      const l = document.getElementById("prettyParentList");
      addPersonCard(l, p);
      const n = document.getElementById("hiddenInputs");
      addInputField(n, "parent", p);
      document.getElementById("searchStr").value = "";
      document.getElementById("selectionList").innerHTML = "";
    }
  })
}

// Add Spouse functions
document.getElementById("mySpouseBtn").onclick = () => {
  modal.style.display = "block";
  document.getElementById("addType").value = "addSpouse";
  document.getElementById("searchStr").focus();
}

function addSpouse(id, fid) {
  searchData.forEach((p) => {
    if (p.id == id) {
      // turn off modal
      modal.style.display = "none";
      // add parent to display
      if (!fid) { fid = 'f01' };
      const l = document.getElementById("prettySpouse");
      addPersonCard(l, p);
      const n = document.getElementById("hiddenInputs");
      addInputField(n, "spouse", p, fid);
      document.getElementById("searchStr").value = "";
      document.getElementById("selectionList").innerHTML = "";
    }
  })
}

// Add Kids functions
document.getElementById("myKidsBtn").onclick = () => {
  modal.style.display = "block";
  document.getElementById("addType").value = "addKid";
  document.getElementById("searchStr").focus();
}

function addKid(id, fid) {
  searchData.forEach((p) => {
    if (p.id == id) {
      // turn off modal
      modal.style.display = "none";
      // add parent to display
      if (!fid) { fid = f01 };
      const l = document.getElementById("prettyKidsList");
      addPersonCard(l, p);
      const n = document.getElementById("hiddenInputs");
      addInputField(n, "kid", p, fid);
      document.getElementById("searchStr").value = "";
      document.getElementById("selectionList").innerHTML = "";
    }
  })
}

// Get the input field
document.getElementById("searchStr").addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    searchBtn.click();
  }
});

searchBtn.onclick = () => {
  searchTxt = document.getElementById("searchStr").value;
  t = document.getElementById("addType").value;
  fetch("/api/filterPeople/" + searchTxt, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => {
      return response.json()
    })
    .then(result => {
      text = "";
      searchData = result;
      result.forEach(element => {
        if (!(element.families) | (element.families.length == 0)) {
          text += "<div onclick=\""+ t +"('" + element._id + "')\" class='link__div'>";
          text += element.name + " -- b." + element.birthdateFormatted + "</div>";
        } else {
          element.families.forEach(family => {
            text += "<div onclick=\"" + t + "('" + element._id + "','"+ family._id +"')\" class='link__div'>";
            text += element.name + " -- b." + element.birthdateFormatted + "</div>";
          })          
        }
      });
      document.getElementById("selectionList").innerHTML = text;
    })
    .catch(err => console.log(err))
}

function addInputField(parentNode, group, person, familyId) {
  const i = document.createElement("input");
  i.setAttribute("type", "hidden");
  i.value = person._id;
  i.name = 'new' + group + '-' + person._id + '-' + familyId;
  parentNode.appendChild(i);
}

function addPersonCard(parentNode, person) {
  const d = document.createElement("div");
  d.setAttribute("class","card");
  const h = " "
    +"<div class='card__image'>"
    +"  <img src='" + person.imageUrl + "' alt='" + person.title + "'>"
    +"</div>"
    +"<div class='card__name'>"
    +   person.name + "<br>"
    +"  <div class='card__group'>"
    +"    <div id='bdate' class='card__date'>"
    +"      b. " + person.birthdateFormatted
    +"    </div>"
    +"    <div id='ddate' class='card__date'>"
    +"      d. " + person.deathdateFormatted
    +"    </div>"
    +"  </div>"
    +"</div>"
  d.innerHTML = h;
  parentNode.appendChild(d);
}

// When the user clicks on <span> (x), close the modal
span.onclick = () => {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

