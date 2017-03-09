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
  
  // add a tree on page
  addTreeOnPage() {
  	this.des.appendChild(this.buildTreeDom(this.arr));
  }
  
  // build a tree from initial date
  buildTreeDom(initialData) {
  	if ( initialData.length === 0 ) return;
      
  	let ulElem = document.createElement("UL");
      
  	initialData.forEach( 
  		item => {
      	let liElem = createLiElem(item.title);
        
    		let nestedUl = this.buildTreeDom(item.children);
    		if ( nestedUl ) liElem.appendChild(nestedUl);
        
    		ulElem.appendChild(liElem);
  		}
  	);
      
  	return ulElem;
  }
}

//Добавляем дерево обектов в контейнер на странице
var container = document.querySelector("#container");
//if ( localStorage.getItem("htmlConteiner") ) {
//	container.innerHTML = localStorage.getItem("htmlConteiner");
//} else {
	var treeInst = new SuperTreeDom(container, musicTreeObj);
  treeInst.addTreeOnPage();
//}

// Раскрытие-закрытие дерева
var treeUl = container.querySelector("ul");

treeUl.onclick = function(event) {
	var target = event.target;
  if ( target.tagName === 'SPAN' && target.className === "close" ) {
  	target.parentNode.parentNode.removeChild(target.parentNode);
    localStorage.setItem("htmlConteiner", container.innerHTML);

    return;
  } else if ( target.tagName === 'SPAN' && target.className === "add" ) {
  	var nameNewItem = prompt("Enter the name of the new item:", "");
    if (!nameNewItem) return;

    if ( target.parentNode.lastElementChild.tagName === "UL" ) {
    	target.parentNode.lastElementChild.appendChild(createLiElem(nameNewItem));
    } else {
    	var ulElem = document.createElement("UL");
      ulElem.appendChild(createLiElem(nameNewItem));
      target.parentNode.appendChild(ulElem);
    }
    localStorage.setItem("htmlConteiner", container.innerHTML);

    return;
  } else if ( target.tagName === 'SPAN' && target.className === "edit" ) {
  	var oldNameItem = target.parentNode.firstElementChild.innerHTML;
    var newNameItem = prompt("Enter the name of the new item:", oldNameItem);
    if (!newNameItem) return;

    target.parentNode.firstElementChild.innerHTML = newNameItem;
    localStorage.setItem("htmlConteiner", container.innerHTML);
  }
  else if ( target.tagName === 'SPAN' ) {
  	var childrContainer = target.parentNode.querySelector("ul");

    if (!childrContainer) return;

    childrContainer.hidden = !childrContainer.hidden;
    localStorage.setItem("htmlConteiner", container.innerHTML);

    return;
  }

  return;
}

//Добавление корневого узла с кнопкой удаления
var btnGen = document.querySelector(".addBtn");

btnGen.onclick = function(event) {
  var inputGenre = document.querySelector("#inputGenre").value;

	if ( inputGenre === '' ) {
    alert("You must write genre name!");
    return false;
  }

  container.querySelector("ul").appendChild(createLiElem(inputGenre));
  document.querySelector("#inputGenre").value = "";
  localStorage.setItem("htmlConteiner", container.innerHTML);
}

//Функция для создания элемента дерева
function createLiElem(strInLi) {
	var liElem = document.createElement("LI");
  var spanElem = document.createElement("SPAN");
  var textElem = document.createTextNode(strInLi);
  spanElem.appendChild(textElem);
  liElem.appendChild(spanElem);

  spanElem = document.createElement("SPAN");
  spanElem.classList.add("close");
  txtElem = document.createTextNode("\u00D7");
  spanElem.appendChild(txtElem);
  liElem.appendChild(spanElem);

  spanElem = document.createElement("SPAN");
  spanElem.classList.add("add");
  txtElem = document.createTextNode("\u002B");
  spanElem.appendChild(txtElem);
  liElem.appendChild(spanElem);

  spanElem = document.createElement("SPAN");
  spanElem.classList.add("edit");
  txtElem = document.createTextNode("\u002A");
  spanElem.appendChild(txtElem);
  liElem.appendChild(spanElem);
  return liElem;
}
