const form = document.getElementById('item-form');
const formInput = document.getElementById('item-input');
const submitBtn = form.querySelector('button[type="submit"]');
submitBtn.addEventListener('click', addItem)

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
        const itemNode = createItem(item)
        document.querySelector('#item-list').appendChild(itemNode);
        formInput.value = '';
    } 
}
