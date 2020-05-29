//SLECTORS
const taskInput = document.querySelector('.task-input');
const submitBtn = document.querySelector('.submit-btn');
const itemList = document.querySelector('.item-list');

if (localStorage) {
  console.log(Object.keys(localStorage));
  Object.keys(localStorage).forEach((item) => {
    // console.log(item);
    const itemRoot = document.createElement('li');
    itemRoot.classList.add('item');
    const itemSpan = document.createElement('span');
    itemSpan.textContent = item;
    const checkBtn = document.createElement('button');
    checkBtn.textContent = 'check';
    const delBtn = document.createElement('button');
    delBtn.textContent = 'del';

    itemRoot.append(itemSpan, checkBtn, delBtn);
    itemList.appendChild(itemRoot);
  });
}

//EVENT_LISTENERS
submitBtn.addEventListener('click', addItem);
itemList.addEventListener('click', taskIt);
//FUNCTIONS
function taskIt(event) {
  //   console.log(event.target.innerText);
  if (event.target.innerText == 'check') {
    event.target.parentNode.classList.toggle('task-completed');
  }
  if (event.target.innerText == 'del') {
    event.target.parentNode.remove();
    const el = event.target.parentNode.children[0].innerText;
    localStorage.removeItem(el);
  }
}
const data = [];
function addItem(event) {
  event.preventDefault();
  const itemRoot = document.createElement('li');
  itemRoot.classList.add('item');
  const itemSpan = document.createElement('span');
  itemSpan.textContent = taskInput.value;
  const checkBtn = document.createElement('button');
  checkBtn.textContent = 'check';
  const delBtn = document.createElement('button');
  delBtn.textContent = 'del';

  itemRoot.append(itemSpan, checkBtn, delBtn);
  itemList.appendChild(itemRoot);

  data.push(taskInput.value);
  localStorage.setItem(taskInput.value, JSON.stringify(taskInput.value));

  taskInput.value = '';
  taskInput.focus();

  //   console.log(data);
}
