// Acme Fuctions //
console.log('Javascript Connected');
var page = '';

// Fetching the Data//
let URL ='/acme/js/acme.json';
fetchData(URL);

function fetchData(URL){
  fetch(URL)
  .then(function(response){
    if(response.ok){
      return response.json();
    }
    throw new ERROR ('Network response was not OK.');
  })

  .then(function(data){
    //Check the data object was retrieved
    console.log(data);
    //create and hold array
 // Create an array to hold nav items
 let navItem = [];
 for(let i = 0; i < data.Navigation.navData.length; i++){
     navItem[i] = data.Navigation.navData[i];
 }
 // Call fillNav function
fillNav(navItem);
})
}

function fillNav(navItem){
  let ul = document.getElementById("nav-links");
// Create and fill nav items
for(let i = 0; i < navItem.length; i++){
  //finds place to put stuff
    let li = document.createElement("li");
    //creates text node
    let text = document.createTextNode(navItem[i]);
    //puts text node in li
    li.appendChild(text);
    //makes class on li cordinte with page info
    li.setAttribute("id", "nav" + navItem[i]);
    //puts li in ul to create nav
    ul.appendChild(li);
}
//engage listeners
clickListeners();
}

function clickListeners(){
  //when clicked will call home function
  document.getElementById("navHome").addEventListener("click", clickHome);

  //when clicked will call navClick() function
  let anvils = document.querySelector("#navAnvils");//This selects the css selector 'navAnvils' that we made with JS above
  anvils.addEventListener('click', navClick);
  anvils.myParam = 'Anvils';

   //when clicked will call navClick() function
   let explosives = document.querySelector("#navExplosives");//This selects the css selector 'navExplosives' that we made with JS above
   explosives.addEventListener('click', navClick);
   explosives.myParam = 'Explosives';

   // When Decoys is clicked, call navClick() function
    let decoys = document.querySelector("#navDecoys");
    decoys.addEventListener("click", navClick);
    decoys.myParam = "Decoys";

    // When Traps is clicked, call navClick() function
    let traps = document.querySelector("#navTraps");
    traps.addEventListener("click", navClick);
    traps.myParam = "Traps";
}


function clickHome(){
  //Displays home page
  document.getElementById('mainContent').setAttribute('class', '');
  document.getElementById('item').setAttribute('class', 'hide');
  document.getElementById('pageTitle').innerHTML = 'Home | Acme Products';
}

function navClick(event){
  fetch(URL)
    .then(function(response){
      if(response.ok){
        return response.json();
      }
      throw new Error('Network response was not OK.');
    })
    .then(function(data){
      //hide mainContent and show new
      document.getElementById('mainContent').setAttribute('class', "hide");
      document.getElementById('item').setAttribute('class','');

      //Set t to data.event's parameter passed from click event (Explosives, Traps, etc)
      let o = data[event.target.myParam];
      let q =data
      // console.log('You Clicked '+event.taret.myParam);
//sets classes to item to display other pages
            document.getElementById("itemHeader").innerHTML = o.name;
            document.getElementById("itemPicture").setAttribute("src", o.path);
            document.getElementById("description").innerHTML = o.description;
            document.getElementById("manufacturer").innerHTML = o.manufacturer;
            document.getElementById("stars").innerHTML = o.reviews + "/5 stars";
            document.getElementById("price").innerHTML = "Price: $" + o.price;
            document.getElementById('pageTitle').innerHTML = o.name +' | Acme Products';

    })
  }
