//SLECTORS..........................................
const taskInput = document.querySelector('.task-input');
const submitBtn = document.querySelector('.submit-btn');
const itemListDiv = document.querySelector('.item-list-div');

//ADDING DYNAMIC BACKGROUND.........................
setInterval(() => {
  const date =
    new Date().getHours().toString() +
    new Date().getMinutes() +
    new Date().getSeconds();
  document.body.style.backgroundColor = `#${date}`;
}, 1000);

//RETAINING STATES FROM LOCALSTORAGE................
// console.log(localStorage);
const localData = localStorage.getItem('data');
const parsedData = JSON.parse(localData);
// console.log(parsedData);

//initialising global data for storing the data and thier states
const data = [];

//PUSHING RETRIEVED STATES TO THE UI...............
if (parsedData) {
  parsedData.forEach((item) => {
    data.push(item);

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item-div');

    const itemTextDiv = document.createElement('div');
    itemTextDiv.classList.add('item-text-div');

    const itemText = document.createElement('p');
    itemText.textContent = item[0];
    itemTextDiv.append(itemText);

    const itemBtnDiv = document.createElement('div');
    itemBtnDiv.classList.add('item-btn-div');

    const checkBtn = document.createElement('button');
    checkBtn.textContent = 'check';
    const delBtn = document.createElement('button');
    delBtn.textContent = 'delete';

    itemBtnDiv.append(checkBtn, delBtn);
    itemDiv.append(itemTextDiv, itemBtnDiv);

    if (item[1] == true) {
      itemDiv.classList.add('task-completed');
    }
    itemListDiv.append(itemDiv);
  });
}

//EVENT LISTENERS.................................
submitBtn.addEventListener('click', addItem);
itemListDiv.addEventListener('click', taskIt);

//FUNCTIONS......................................
function taskIt(event) {
  event.preventDefault();
  // console.log(event.target.innerText);
  const el = event.target.parentNode.parentNode.children[0].innerText;

  if (event.target.innerText == 'check') {
    event.target.parentNode.parentNode.classList.toggle('task-completed');

    data.forEach((curr, index) => {
      // console.log(curr[1]);
      if (curr[0] === el) {
        if (data[index][1] == true) {
          data[index][1] = false;
        } else {
          data[index][1] = true;
        }
        return;
      }
    });
  }
  if (event.target.innerText == 'delete') {
    event.target.parentNode.parentNode.remove();
    // console.log(el);
    data.forEach((curr, index) => {
      if (curr[0] === el) {
        data.splice(index, 1);
        return;
      }
    });
  }
}

// data was copied in the beginning from local-storage to global variable data[].
// console.log(data);

//ADD ITEMS TO UI AND DATA[].....................
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

    //updating data to data[];
    data.push([taskInput.value, false]);
    // console.log(data);

    // clearing the input fields.
    taskInput.value = '';
    taskInput.focus();
  } else {
    alert('Please Enter Something !!! ');
  }
}

//SETTING LOCAL_STORAGE TO DATA[] WHEN WINDOW IS ABOUT TO CLOSED................
window.addEventListener('beforeunload', function (e) {
  localStorage.setItem('data', JSON.stringify(data));
});
