// объект js для отслеживания состояния дерева объектов
const musicTreeObj = [
	{ parent: "Hard Rock",
  	children: [
  		{ parent: "Scorpions",
        children: [
          { parent: "Crazy World",
            children: []
          },
          { parent: "Blackout",
            children: []
          }
    		]
  		},
      { parent: "AC/DC",
      	children: [
        	{ parent: "Black in Black",
          	children: []
          },
          { parent: "Highway to Hell",
          	children: []
          },
          { parent: "High Voltage",
          	children: []
          }
        ]
      }
  	]
	},
  { parent: "Thrash Metal",
    children: [
    	{ parent: "Metallica",
        children: [
          { parent: "Muster of Puppets",
            children: []
          },
          { parent: "Metallica",
            children: []
          }
    		]
  		},
      { parent: "Megadeth",
        children: [
          { parent: "Rust in Peace",
            children: []
          }
    		]
  		}
    ]
  },
  {
  	parent: "Nu Metal",
    children: [
    	{ parent: "Korn",
        children: [
          { parent: "Follow the Leader",
            children: []
          },
          { parent: "Issues",
            children: []
          }
    		]
  		},
      { parent: "Slipknot",
        children: [
          { parent: "Iowa",
            children: []
          }
    		]
  		}
    ]
  }
]

// Класс для добавления дерева объектов в контейнер
function SuperTreeDom(destination, arrObjects) {
  this.des = destination;
  this.arr = arrObjects;
}

SuperTreeDom.prototype.addTreeOnPage = function() {
  this.des.appendChild(buildTreeDom(this.arr))

  function buildTreeDom(arr) {
  	if ( arr.length === 0 ) return;

    var ulElem = document.createElement("UL");

    for ( var elId = 0; elId < arr.length; elId++ ) {
    	var liElem = createLiElem(arr[elId].parent);
      
      var nestedUl = buildTreeDom(arr[elId].children);
      if ( nestedUl ) liElem.appendChild(nestedUl);

      ulElem.appendChild(liElem);
    }

  	return ulElem;
  }
}

SuperTreeDom.prototype.addListElInObj = function() {
	var arrTemp = [];
}

//Добавляем дерево обектов в контейнер на странице
var container = document.querySelector("#container");
if ( localStorage.getItem("htmlConteiner") ) {
	container.innerHTML = localStorage.getItem("htmlConteiner");
} else {
	var treeInst = new SuperTreeDom(container, musicTreeObj);
  treeInst.addTreeOnPage();
}

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
  spanElem.className = "close";
  txtElem = document.createTextNode("\u00D7");
  spanElem.appendChild(txtElem);
  liElem.appendChild(spanElem);
  
  spanElem = document.createElement("SPAN");
  spanElem.className = "add";
  txtElem = document.createTextNode("\u002B");
  spanElem.appendChild(txtElem);
  liElem.appendChild(spanElem);
	
  spanElem = document.createElement("SPAN");
  spanElem.className = "edit";
  txtElem = document.createTextNode("p");
  spanElem.appendChild(txtElem);
  liElem.appendChild(spanElem);
  return liElem;
}
