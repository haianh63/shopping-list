const form = document.getElementById('item-form');
const formInput = document.getElementById('item-input');
const submitBtn = form.querySelector('button[type="submit"]');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const filter = document.querySelector('#filter');
let editItem;


function createItem(item) {
    const li = document.createElement('li');
    const text = document.createTextNode(item);
    const btn = createButton("remove-item btn-link text-red");
    li.appendChild(text);
    li.appendChild(btn);
    return li;
}

function createButton(classes) {
    const btn = document.createElement('button');
    btn.className = classes;
    const icon = createIcon("fa-solid fa-xmark");
    btn.appendChild(icon);
    return btn;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function addItem(e) {
    e.preventDefault();
    const item = formInput.value;
    if (item === '') {
        alert('Please add an item');
    } else {
        if (e.target.innerText === 'Add Item' ) {
            if (checkDuplicate(item)) {
                alert(`The item "${item}" already exists!`);
            } else {
                addItemToDOM(item);
                formInput.value = '';
                addItemToStorage(item);
                checkUI();
            }
        } else if (e.target.innerText === 'Update item') {
            updateItem(editItem, item);
        }
    } 
}

function onClickItem(e) {
    const target = e.target;
    if (target.tagName === 'I' && confirm("Are you sure?")) {
        this.removeChild(target.parentElement.parentElement);
        checkUI();
        removeItemFromStorage(target.parentElement.parentElement.innerText);
    } else if (target.tagName === 'LI') {
        Array.from(itemList.querySelectorAll('li')).forEach(item => item.style.color = "#333333");
        editItem = target;
        formInput.value = target.innerText;
        submitBtn.style.backgroundColor = "rgb(34, 139, 34)";
        submitBtn.childNodes[2].textContent = "Update item";
        submitBtn.childNodes[1].className = "fa-solid fa-pen";
        submitBtn.style.color = "white";
        target.style.color = "#CCCCCC";
    }
}

function deleteAll() {
    itemList.innerHTML = '';
    checkUI();
    localStorage.clear();
}


function checkUI() {
    if (itemList.querySelectorAll('li').length === 0) {
        clearBtn.style.display = 'none';
        filter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        filter.style.display = 'block';
    }
}

function filterItem() {
    const filterValue = filter.value.toLowerCase();
    console.log(filterValue);
    const items = itemList.querySelectorAll('li');
    for (let item of items) {
        if (item.innerText.toLowerCase().indexOf(filterValue) === -1) {
            item.style.display = "none"
        } else {
            item.style.display = "flex"
        }
    }
}

function updateItem(updateItem, value) {
    updateItem.childNodes[0].textContent = value;
    const updatedItemList = Array.from(itemList.querySelectorAll('li')).map(item => item.innerText);
    localStorage.setItem('items', JSON.stringify(updatedItemList));

    formInput.value = '';
    submitBtn.style.backgroundColor = "#333333";
    submitBtn.childNodes[2].textContent = "Add Item";
    submitBtn.childNodes[1].className = "fa-solid fa-plus";
    submitBtn.style.color = "white";
    updateItem.style.color = "#333333";
}

function addItemToDOM(item) {
    const itemNode = createItem(item)
    document.querySelector('#item-list').appendChild(itemNode);
}

function addItemToStorage(item) {
    let itemsFromStorage = localStorage.getItem('items');
    if (itemsFromStorage === null) {
        itemsFromStorage = []
    } else {
        itemsFromStorage = JSON.parse(itemsFromStorage);
    }
    itemsFromStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function removeItemFromStorage(item) {
    let itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    itemsFromStorage = itemsFromStorage.filter(itemFromStorage => itemFromStorage !== item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function checkDuplicate(checkItem) {
    let isDuplicate = false;
    Array.from(itemList.querySelectorAll('li')).forEach(item => {
        if (item.innerText === checkItem) {
            isDuplicate =  true;
        }
    })
    return isDuplicate;
}

function initializeUI() {
    let items = localStorage.getItem('items');
    if (items) {
        items = JSON.parse(items);
        for (const item of items) {
            itemList.appendChild(createItem(item));
        }
    }
}

initializeUI();
checkUI();

// Event Listener
submitBtn.addEventListener('click', addItem);
itemList.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', deleteAll);
filter.addEventListener('input', filterItem);
