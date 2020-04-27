
let parentSearchData = [];

// Get the modal
const modal = document.getElementById("myModal"); 

// Get the button that opens the modal
const parentBtn = document.getElementById("myParentBtn");
const parentSearchBtn = document.getElementById("parentSearchBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
parentBtn.onclick = () => {
  modal.style.display = "block";
  document.getElementById("searchStr").focus();
}

// Get the input field
document.getElementById("searchStr").addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    searchBtn.click();
  }
});

searchBtn.onclick = () => {
  searchTxt = document.getElementById("searchStr").value;
  fetch("/api/filterPeople/" + searchTxt, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => {
      return response.json()
    })
    .then(result => {
      console.log(result);
      text = "";
      parentSearchData = result;
      result.forEach(element => {
        text += "<div onclick=\"addParent('" + element._id + "')\" class='link__div'>";
        text += element.name + " -- b." + element.birthdateFormatted + "</div>";
      });
      document.getElementById("selectionList").innerHTML = text;
    })
    .catch(err => console.log(err))
}

function addParent(id) {
  parentSearchData.forEach((p) => {
    if (p.id == id) {
      // turn off modal
      modal.style.display = "none";
      // add parent to display
      const l = document.getElementById("prettyParentList");
      const t = document.createTextNode(p.name + " - b." + p.birthdateFormatted);
      l.appendChild(t);
      const b = document.createElement("br");
      l.appendChild(b);
      // add parent to input data
    }
  })
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

