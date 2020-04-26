
// Get the modal
// if (typeof modal === 'undefined') {
//   console.log('no modal');
//   const modal = document.getElementById("myModal");  
// } else {
//   console.log('modal again');
//   modal = document.getElementById("myModal");
// }

modal = document.getElementById("myModal"); 

// Get the button that opens the modal
groupBtn = document.getElementById("myGroupBtn");

// Get the <span> element that closes the modal
span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
groupBtn.onclick = function () {
  searchTxt = document.getElementById("searchStr").value;
  modal.style.display = "block";
  console.log(searchTxt);
  fetch("/api/filterPeople/"+searchTxt, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => {
      return response.json()
    })
    .then(result => {
      text = "";
      result.forEach(element => {
        text += element.name + "<br>"
      });
      document.getElementById("peopleList").innerHTML = text;
    })
    .catch(err => console.log(err))
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
//const filterApiUrl = '/admin/filterAPI?filterText=Carter';
// let searchString = document.getElementById('searchStr').value;
//let people = {};
function getPeopleList(filterApiUrl) {
  return fetch(filterApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => resolve(response))
    .catch(err => console.log(err))  
}


// // Example POST method implementation:
// async function postData(url = '', data = {}) {
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrerPolicy: 'no-referrer', // no-referrer, *client
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
//   });
//   return await response.json(); // parses JSON response into native JavaScript objects
// }