document.querySelector(".main_menu").addEventListener("click", (e) => {
  const checked = e.target.checked;
  if (checked) {
    document.querySelector(".background_black").style.display = "block";
  } else {
    document.querySelector(".background_black").style.display = "none";
  }
});
