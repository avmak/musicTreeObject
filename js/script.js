// initial data -  js array for building a tree
const musicTreeObj = [
	{ title: "Hard Rock",
  	children: [
  		{ title: "Scorpions",
        children: [
          { title: "Crazy World",
            children: []
          },
          { title: "Blackout",
            children: []
          }
    		]
  		},
      { title: "AC/DC",
      	children: [
        	{ title: "Black in Black",
          	children: []
          },
          { title: "Highway to Hell",
          	children: []
          },
          { title: "High Voltage",
          	children: []
          }
        ]
      }
  	]
	},
  { title: "Thrash Metal",
    children: [
    	{ title: "Metallica",
        children: [
          { title: "Muster of Puppets",
            children: []
          },
          { title: "Metallica",
            children: []
          }
    		]
  		},
      { title: "Megadeth",
        children: [
          { title: "Rust in Peace",
            children: []
          }
    		]
  		}
    ]
  },
  {
  	title: "Nu Metal",
    children: [
    	{ title: "Korn",
        children: [
          { title: "Follow the Leader",
            children: []
          },
          { title: "Issues",
            children: []
          }
    		]
  		},
      { title: "Slipknot",
        children: [
          { title: "Iowa",
            children: []
          }
    		]
  		}
    ]
  }
]

// class for working with initial data
class SuperTreeDom {
	constructor (destination, arrObjects) {
  	this.des = destination;
  	this.arr = arrObjects;
	}
  
  // adding a tree on page
  addTreeOnPage() {
  	this.des.appendChild(this.buildTreeDom(this.arr));
  }
  
  // building a tree from initial data
  buildTreeDom(initialData) {
  	if ( initialData.length !== 0 ) {
    	let ulElem = document.createElement("UL");
      
  		initialData.map( 
  			(item) => {
      		let liElem = this.createLiElem(item.title);
        	let nestedUl = this.buildTreeDom(item.children);
    			
          if ( nestedUl ) {
          	liElem.appendChild(nestedUl);
          }

    			ulElem.appendChild(liElem);
  			}
  		);
      
      return ulElem;
    }
  }
  
  // creating li element
  createLiElem(title) {
    let liElem = document.createElement("LI");
    let spanElem = document.createElement("SPAN");
    let textElem = document.createTextNode(title);
    spanElem.appendChild(textElem);
    liElem.appendChild(spanElem);
    
    spanElem = document.createElement("SPAN");
    spanElem.classList.add("edit");
    textElem = document.createTextNode("\u002A");
    spanElem.appendChild(textElem);
    liElem.appendChild(spanElem);
    
    spanElem = document.createElement("SPAN");
		spanElem.classList.add("add");
    textElem = document.createTextNode("\u002B");
    spanElem.appendChild(textElem);
    liElem.appendChild(spanElem);
    
    spanElem = document.createElement("SPAN");
    spanElem.classList.add("delete");
    textElem = document.createTextNode("\u00D7");
    spanElem.appendChild(textElem);
    liElem.appendChild(spanElem);

    return liElem;
  }
  
  // initialization tree objects
  initialization() {
  	if ( localStorage.getItem("htmlConteiner") ) {
    	this.des.innerHTML = localStorage.getItem("htmlConteiner");
    } else {
    	this.addTreeOnPage();
    }
    
    this.des.addEventListener("click", (event) => {
    	const target = event.target;
        
      // events: closure/disclosure/deleting/editing/creating
      if ( target.tagName === 'SPAN' && target.classList.contains("delete") ) {
        target.closest("ul").removeChild(target.parentNode);
        
        localStorage.setItem("htmlConteiner", this.des.innerHTML);
    		return;
  		} else if ( target.tagName === 'SPAN' && target.classList.contains("add") ) {
  				let nameNewItem = prompt("Enter the name of the new item:", "");
    			if ( strIsEmpty(nameNewItem) ) return;

    			if ( target.parentNode.lastElementChild.tagName === "UL" ) {
    				target.parentNode.lastElementChild.appendChild(this.createLiElem(nameNewItem));
    			} else {
    				let ulElem = document.createElement("UL");
      			ulElem.appendChild(this.createLiElem(nameNewItem));
      			target.parentNode.appendChild(ulElem);
    			}
    			
        	localStorage.setItem("htmlConteiner", this.des.innerHTML);
    			return;
  		} else if ( target.tagName === 'SPAN' && target.classList.contains("edit") ) {
  				let oldNameItem = target.parentNode.firstElementChild.innerHTML;
    			let newNameItem = prompt("Enter the name of the new item:", oldNameItem);
    			if ( strIsEmpty(newNameItem) ) return;
					
          let textElem = document.createTextNode(newNameItem);
          target.parentNode.firstElementChild.replaceChild(textElem, 
          	target.parentNode.firstElementChild.firstChild);
        
    			localStorage.setItem("htmlConteiner", container.innerHTML);
        	return;
  		}	else if ( target.tagName === 'SPAN' ) {
  				let childrContainer = target.parentNode.querySelector("ul");
					if ( !childrContainer ) return;

    			childrContainer.hidden = !childrContainer.hidden;
        
    			localStorage.setItem("htmlConteiner", this.des.innerHTML);
    			return;
  		}
			return;
    });
    
    // checking if a string is blank, null, undefined or contains only white-space
    function strIsEmpty(str) {
    	return ( !str || !str.trim() );
		}
  }
}

// check the working capacity of the class
let container = document.querySelector("#container");
let treeInst = new SuperTreeDom(container, musicTreeObj);
treeInst.initialization();

//adding a root node
let btnGen = document.querySelector(".addBtn");

btnGen.onclick = (event) => {
  let inputGenre = document.querySelector("#inputGenre").value;

	if ( inputGenre === "" ) {
    alert("You must write genre name!");
    return false;
  }

  container.querySelector("ul").appendChild(treeInst.createLiElem(inputGenre));
  document.querySelector("#inputGenre").value = "";
  
  localStorage.setItem("htmlConteiner", container.innerHTML);
}
