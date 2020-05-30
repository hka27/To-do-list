//SLECTORS
const taskInput = document.querySelector('.task-input');
const submitBtn = document.querySelector('.submit-btn');
const itemListDiv = document.querySelector('.item-list-div');

if (localStorage) {
  console.log(localStorage);
  Object.keys(localStorage).forEach((item) => {
    // console.log(item);
    console.log(item, localStorage.getItem(item));
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item-div');
    const itemTextDiv = document.createElement('div');
    itemTextDiv.classList.add('item-text-div');

    const itemText = document.createElement('p');
    itemText.textContent = item;
    itemTextDiv.append(itemText);

    const itemBtnDiv = document.createElement('div');
    itemBtnDiv.classList.add('item-btn-div');

    const checkBtn = document.createElement('button');
    checkBtn.textContent = 'check';
    const delBtn = document.createElement('button');
    delBtn.textContent = 'delete';
    itemBtnDiv.append(checkBtn, delBtn);
    itemDiv.append(itemTextDiv, itemBtnDiv);
    if (localStorage.getItem(item) == 'true') {
      itemDiv.classList.add('task-completed');
      // console.log(item);
    }
    itemListDiv.append(itemDiv);
  });
}

//EVENT_LISTENERS
submitBtn.addEventListener('click', addItem);
itemListDiv.addEventListener('click', taskIt);
//FUNCTIONS
function taskIt(event) {
  // console.log(event.target.innerText);
  const el = event.target.parentNode.parentNode.children[0].innerText;
  if (event.target.innerText == 'check') {
    event.target.parentNode.parentNode.classList.toggle('task-completed');

    localStorage.removeItem(el);
    localStorage.setItem(el, true);
  }
  if (event.target.innerText == 'delete') {
    // console.log(event.target.parentNode.parentNode.remove());

    event.target.parentNode.parentNode.remove();
    // console.log(el);
    localStorage.removeItem(el);
  }
}
const data = [];
function addItem(event) {
  event.preventDefault();
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('item-div');
  const itemTextDiv = document.createElement('div');
  itemTextDiv.classList.add('item-text-div');

  const itemText = document.createElement('p');

  if (taskInput.value != '') {
    itemText.textContent = taskInput.value;
    itemTextDiv.append(itemText);

    const itemBtnDiv = document.createElement('div');
    itemBtnDiv.classList.add('item-btn-div');

    const checkBtn = document.createElement('button');
    checkBtn.textContent = 'check';
    const delBtn = document.createElement('button');
    delBtn.textContent = 'delete';
    itemBtnDiv.append(checkBtn, delBtn);
    itemDiv.append(itemTextDiv, itemBtnDiv);
    itemListDiv.append(itemDiv);

    data.push(taskInput.value);
    localStorage.setItem(taskInput.value, false);

    taskInput.value = '';
    taskInput.focus();
  } else {
    alert('Please Enter Something !!! ');
  }

  //   console.log(data);
}
