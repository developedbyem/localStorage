const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || [];

function addItemToItems(e) {
  e.preventDefault();
  let text = this.querySelector("[name=item]").value;
  const item = {
    text, // = text:text
    done: false,
  };

  items.push(item);

  populateList(items, itemsList); // add items to itemsList
  localStorage.setItem("items", JSON.stringify(items));
  this.reset(); //.reset()
}

function populateList(plate = [], platesList) {
  platesList.innerHTML = plate
    .map((plate, i) => {
      return `<li>
      <input type="checkbox" data-index='${i}' id="item${i}" ${
        plate.done ? "checked" : ""
      }>
        <label for="item${i}">${plate.text}</label>
        </li>`;
    })
    .join("");
}
function toggleDone(e) {
  if (!e.target.matches("input")) return;
  const index = e.target.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}
// ============================
populateList(items, itemsList);
// ============================
addItems.addEventListener("submit", addItemToItems);
itemsList.addEventListener("click", toggleDone);
