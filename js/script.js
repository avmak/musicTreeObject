// initial data -  js array for building a tree
const musicTreeObj = [
	{ title: 'Hard Rock',
  	children: [
  		{ title: 'Scorpions',
        children: [
          { title: 'Crazy World',
            children: []
          },
          { title: 'Blackout',
            children: []
          }
    		]
  		},
      { title: 'AC/DC',
      	children: [
        	{ title: 'Black in Black',
          	children: []
          },
          { title: 'Highway to Hell',
          	children: []
          },
          { title: 'High Voltage',
          	children: []
          }
        ]
      }
  	]
	},
  { title: 'Thrash Metal',
    children: [
    	{ title: 'Metallica',
        children: [
          { title: 'Muster of Puppets',
            children: []
          },
          { title: 'Metallica',
            children: []
          }
    		]
  		},
      { title: 'Megadeth',
        children: [
          { title: 'Rust in Peace',
            children: []
          }
    		]
  		}
    ]
  },
  {
  	title: 'Melodic Death Metal',
    children: [
    	{ title: 'In Flames',
        children: [
          { title: 'A Sense of Purpose',
            children: []
          },
          { title: 'Clayman',
            children: []
          },
          { title: 'Reroute to Remain',
            children: []
          }
    		]
  		},
      { title: 'Insomnium',
        children: [
          { title: 'Above the Weeping World',
            children: []
          }
    		]
  		}
    ]
  },
  {
  	title: 'Nu Metal',
    children: [
    	{ title: 'Korn',
        children: [
          { title: 'Follow the Leader',
            children: []
          },
          { title: 'Issues',
            children: []
          }
    		]
  		},
      { title: 'Slipknot',
        children: [
          { title: 'Iowa',
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
  _addTreeOnPage() {
    this.des.innerHTML = this._buildTreeDom(this.arr);
  }
  
  // building a tree from initial data
  _buildTreeDom(initialData) {
    if ( initialData.length ) {
  		let str = '<ul>';

  		initialData.map(
    		(item) => {
      		const nestedUl = this._buildTreeDom(item.children);
      		str += '<li>' + this.createLiElem(item.title);

      		if ( nestedUl ) {
        		str += nestedUl;
      		}

      		str += '</li>'
    		}
  		);
  		return str += '</ul>';
		}
  }
  
  // creating li element
  createLiElem(title) { 
    return `<span>${title}</span>
    				<span class="edit">\u002A</span>
            <span class="add">\u002B</span>
            <span class="delete">\u00D7</span>`;
  }
  
  // initialization tree objects
  initialization() {
  	if ( localStorage.getItem('htmlConteiner') ) {
    	this.des.innerHTML = localStorage.getItem('htmlConteiner');
    } else {
    	this._addTreeOnPage();
    }
    
    // events: closure/disclosure/deleting/editing/creating
    this.des.addEventListener('click', (event) => {
    	const { target } = event;
        
      if ( target.tagName === 'SPAN' && target.classList.contains('delete') ) {
        target.closest('ul').removeChild(target.parentNode);
        
        this.saveChange(this.des.innerHTML);
    		return;
  		} else if ( target.tagName === 'SPAN' && target.classList.contains('add') ) {
  				const nameNewItem = prompt('Enter the name of the new item:', '');
    			if ( this.isStrEmpty(nameNewItem) ) return;
					
          let liElem = document.createElement('LI'),
          		ulElem;
              
    			if ( target.parentNode.lastElementChild.tagName === 'UL' ) {
          	liElem.innerHTML = this.createLiElem(nameNewItem);
    				target.parentNode.lastElementChild.appendChild(liElem);
    			} else {
    				const ulElem = document.createElement('UL');
            liElem.innerHTML = this.createLiElem(nameNewItem);
      			ulElem.appendChild(liElem);
      			target.parentNode.appendChild(ulElem);
    			}
    			
          this.saveChange(this.des.innerHTML);
    			return;
  		} else if ( target.tagName === 'SPAN' && target.classList.contains('edit') ) {
  				const oldNameItem = target.parentNode.firstElementChild.innerHTML,
    					newNameItem = prompt('Enter the name of the new item:', oldNameItem);
    			
          if ( this.isStrEmpty(newNameItem) ) return;
					
          const textElem = document.createTextNode(newNameItem);
          target.parentNode.firstElementChild.replaceChild(textElem, 
          	target.parentNode.firstElementChild.firstChild);
        	
          this.saveChange(this.des.innerHTML);
        	return;
  		}	else if ( target.tagName === 'SPAN' ) {
  				const childrContainer = target.parentNode.querySelector('ul');
					if ( !childrContainer ) return;

    			childrContainer.hidden = !childrContainer.hidden;
        	
          this.saveChange(this.des.innerHTML);
    			return;
  		}
    });
  }
  
  // checking if a string is blank, null, undefined or contains only white-space
  isStrEmpty(str) {
    return ( !str || !str.trim() );
	}
  
  saveChange(payload) {
  	localStorage.setItem('htmlConteiner', payload);
  }
}

// check the working capacity of the class
let container = document.querySelector('#container'),
		treeInst = new SuperTreeDom(container, musicTreeObj);

treeInst.initialization();

//adding a root node
let btnGen = document.querySelector('.addBtn');

btnGen.onclick = () => {
  let inputGenre = document.querySelector('#inputGenre').value,
  		liElem;
      
	if ( treeInst.isStrEmpty(inputGenre) ) {
    alert('You must write genre name!');
    return false;
  }
	
  liElem = document.createElement('LI');
  liElem.innerHTML = treeInst.createLiElem(inputGenre);
  container.querySelector('ul').appendChild(liElem);
  document.querySelector('#inputGenre').value = '';
  
  treeInst.saveChange(container.innerHTML);
  return;
}
