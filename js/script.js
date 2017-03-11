// array of Objects for building a tree
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

/** Class to display the object tree. */
class SuperTreeDom {
	/**
   * Initial data.
   * @param {HTMLElement} destination - Destination element to the HTML DOM.
   * @param {Array.<Object>} arrObjects - Array of Objects for building a tree.
   */
	constructor (destination, arrObjects) {
  	this.des = destination;
  	this.arr = arrObjects;
	}
  
  /**
   * Add a objects tree to the HTML DOM.
   */ 
  _addTreeOnPage() {
    this.des.innerHTML = this._buildTreeDom(this.arr);
  }

  /**
   * Build a objects tree from initial data.
   * @param {Array.<Object>} initialData - Array of Objects for building a tree.
   * @return {string} The content of the destination element.
   */
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

      		str += '</li>';
    		}
  		);
  		return str += '</ul>';
		}
  }

  /**
   * Generate a string with the contents of the LI element.
   * @param {string} The content LI element.
   */
  createLiElem(title) { 
    return `<span>${title}</span>
    				<span class="edit">\u002A</span>
            <span class="add">\u002B</span>
            <span class="delete">\u00D7</span>`;
  }
  
  /**
   * Initializes the data source to display the object tree.
   * Hangs an events to process user actions.
   * Events: closure/disclosure/deleting/editing/creating
   */
  initialization() {
  	if ( localStorage.getItem('htmlConteiner') ) {
    	this.des.innerHTML = localStorage.getItem('htmlConteiner');
    } else {
    	this._addTreeOnPage();
    }
    
    this.des.addEventListener('click', (event) => {
    	const { target } = event;
        
      if ( target.tagName === 'SPAN' && target.classList.contains('delete') ) {
        target.closest('ul').removeChild(target.parentNode);
        
        helpers.saveChange(this.des.innerHTML);
    		return;
  		} else if ( target.tagName === 'SPAN' && target.classList.contains('add') ) {
  				const nameNewItem = prompt('Enter the name of the new item:', '');
    			if ( helpers.isStringEmpty(nameNewItem) ) return;
					
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
    			
          helpers.saveChange(this.des.innerHTML);
    			return;
  		} else if ( target.tagName === 'SPAN' && target.classList.contains('edit') ) {
  				const oldNameItem = target.parentNode.firstElementChild.innerHTML,
    					newNameItem = prompt('Enter the name of the new item:', oldNameItem);
    			
          if ( helpers.isStringEmpty(newNameItem) ) return;
					
          const textElem = document.createTextNode(newNameItem);
          target.parentNode.firstElementChild.replaceChild(textElem, 
          	target.parentNode.firstElementChild.firstChild);
        	
          helpers.saveChange(this.des.innerHTML);
        	return;
  		}	else if ( target.tagName === 'SPAN' ) {
  				const childrContainer = target.parentNode.querySelector('ul');
					if ( !childrContainer ) return;

    			childrContainer.hidden = !childrContainer.hidden;
        	
          helpers.saveChange(this.des.innerHTML);
    			return;
  		}
    });
  }
}

// additional utilities
// saveChange: saving changes in local storage
// isStringEmpty: checking a string is blank, null, undefined or contains only white-space
const helpers = {
  saveChange: (payload) => localStorage.setItem('htmlConteiner', payload),
  isStringEmpty: (string) => !string || !string.trim()
};

// checking the working capacity of the class
let container = document.querySelector('#container'),
		treeInst = new SuperTreeDom(container, musicTreeObj);

treeInst.initialization();

// adding a root node
let btnGen = document.querySelector('.addBtn');

btnGen.onclick = () => {
  let inputGenre = document.querySelector('#inputGenre').value;
      
	if ( helpers.isStringEmpty(inputGenre) ) {
    alert('You must write genre name!');
    return false;
  }
	
  let liElem = document.createElement('LI');
  liElem.innerHTML = treeInst.createLiElem(inputGenre);
  container.querySelector('ul').appendChild(liElem);
  document.querySelector('#inputGenre').value = '';
  
  helpers.saveChange(container.innerHTML);
  return;
}
