// Load random data
let dataPanel = document.querySelector('#data-panel')
let numberOfData = 20
let data = ""

for (let i = 1; i <= numberOfData; i++) {
  data += `       <tr class="table__row">
          <td class="table__cell table__cell--checkbox">
            <input type="checkbox" />
          </td>
          <td class="table__cell table__cell--id">${i}</td>
          <td class="table__cell table__cell--name">td</td>
          <td class="table__cell table__cell--advertiser">
            <span class="cell__advertiser__line">Advertiser</span>
            <span class="cell__advertiser__line cell__advertiser__line--group">Group</span>
          </td>
          <td class="table__cell table__cell--description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            eget.</td>
          <td class="table__cell table__cell--price">${Math.round(Math.random() * 1000 + 500)}</td>
          <td class="table__cell table__cell--starttime">2020 / 7 / 22</td>
          <td class="table__cell table__cell--endtime">2020 / ${Math.ceil(Math.random() * 4 + 8)} / ${Math.ceil(Math.random() * 30)}</td>
          <td class="table__cell table__cell--action">
            <i class="fas fa-bars cell__action__icon" id="action__input_${i}"></i>
            <!-- menu -->
            <div class="action__menu hidden" role="dialog" aria-modal="true" aria-labelledby=action__input_${i}"
              id="action__menu_${i}">
              <menu class="menu__body">
                <menuitem class="menu__item">
                <i class="far fa-copy menu__item__icon"></i>
                <span>Duplicate</span>
                </menuitem>
                <menuitem class="menu__item">
                <i class="far fa-edit menu__item__icon"></i>
                <span>Edit</span>
                </menuitem>
                <menuitem class="menu__item">
                <i class="far fa-trash-alt menu__item__icon"></i>
                <span>Delete</span>
                </menuitem>
              </menu>
            </div>
          </td>
        </tr>`
}
dataPanel.innerHTML = data

for (let i = 1; i <= numberOfData; i++) {
  // target the input element
  const input = document.getElementById(`action__input_${i}`);
  // click handler
  const toggleMenu = event => {
    // target the menu element
    const menu = document.getElementById(`action__menu_${i}`);
    menu.classList.toggle("hidden");
  };
  // bind the event
  input.addEventListener("click", toggleMenu);
}

// dark mode
// target the switch element
const darkModeToggle = document.getElementById("dark__mode__toggle");
// toggle handler
const darkModeToggleHandler = event => {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
};
// bind the event
darkModeToggle.addEventListener("change", darkModeToggleHandler);
