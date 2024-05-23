var websiteName = document.getElementById("websiteName");
var siteUrl = document.getElementById("siteUrl");
var bookmarksTable = document.getElementById("bookmarksTable");
var submitBtn = document.getElementById("submitBtn");
var disabledBtn = document.getElementById("disabledBtn");
if (localStorage.getItem("list") != null) {
  bookmarksList = JSON.parse(localStorage.getItem("list"));
  display(bookmarksList);
} else {
  bookmarksList = [];
}

submitBtn.onclick = function () {
  addBookmark();
  display(bookmarksList);
};

function addBookmark() {
  var Bookmark = {
    sName: websiteName.value,
    sUrl: siteUrl.value,
  };
  bookmarksList.push(Bookmark);
  localStorage.setItem("list", JSON.stringify(bookmarksList));
}
function deleteBookmark(index) {
  bookmarksList.splice(index, 1);
  localStorage.setItem("list", JSON.stringify(bookmarksList));
  display(bookmarksList);
}
function visitBookmark(index) {
  window.location.href = bookmarksList[index].sUrl;
}
function display(list) {
  var box = "";
  for (var i = 0; i < list.length; i++) {
    box += `
    <tr>
    <td class="col-3 text-center">${i}</td>
    <td class="col-3 text-center">${list[i].sName}</td>
    <td class="col-3 text-center">
      <button class="btn btn-success" data-index="0" onclick="visitBookmark(${i})">
        <i class="fa-solid fa-eye pe-2"></i>Visit
      </button>
    </td>
    <td class="col-3 text-center">
      <button class="btn btn-danger pe-2" data-index="0" onclick="deleteBookmark(${i})">
        <i class="fa-solid fa-trash-can"></i>
        Delete
      </button>
    </td>
  </tr>
    `;
  }
  bookmarksTable.innerHTML = box;
}

function Validation(ele) {
  var Regex = {
    websiteName: /^[a-zA-Z0-9]{3}.{0,}$/,
    siteUrl: /^(http|https)?:\/\/(www.\S+\..{2,})$/,
  };

  if (Regex[ele.id].test(ele.value)) {
    ele.classList.remove("is-invalid");
    ele.classList.add("is-valid");
    disabledBtn.classList.add("d-none");
    submitBtn.classList.remove("d-none");
    submitBtn.classList.remove("disabled");
    return true;
  } else {
    ele.classList.remove("is-valid");
    ele.classList.add("is-invalid");
    disabledBtn.classList.remove("d-none");
    submitBtn.classList.add("d-none");
    submitBtn.classList.add("disabled");
    return false;
  }
}
function submitBtnValidation() {
  if (Validation(siteUrl) && Validation(websiteName)) {
    disabledBtn.classList.add("d-none");
    submitBtn.classList.remove("d-none");
  } else {
    disabledBtn.classList.remove("d-none");
    submitBtn.classList.add("d-none");
  }
}
