// unused clothing popup + overlay
const unused_clothing_popup = document.getElementById("unused_clothing_popup");
const unused_clothing_overlay = document.getElementById(
  "unused_clothing_overlay"
);
const unused_clothing_design = document.getElementById("design_button_popup");
const unused_clothing_donate = document.getElementById("donate_button_popup");

const mail_overlay = document.getElementById("mail_overlay");
const mail = document.getElementById("mail");
const mail_button = document.getElementById("mail_button");

var check_unused_clothing = 0;

function unused_clothing() {
  if (check_unused_clothing == 0) {
    check_unused_clothing = 1;
    unused_clothing_popup.style.display = "block";
    unused_clothing_overlay.style.display = "block";
    unused_clothing_donate.style.display = "block";
    unused_clothing_design.style.display = "block";
  } else {
    check_unused_clothing = 0;
    unused_clothing_popup.style.display = "none";
    unused_clothing_overlay.style.display = "none";
    unused_clothing_donate.style.display = "none";
    unused_clothing_design.style.display = "none";
  }
}

var check_mail = 0;

function mail_popup() {
  if (check_mail == 0) {
    check_mail = 1;
    mail.style.display = "block";
    mail_overlay.style.display = "block";
  } else {
    check_mail = 0;
    mail.style.display = "none";
    mail_overlay.style.display = "none";
  }
}

// waits for all the html doc to be loaded
document.addEventListener("DOMContentLoaded", () => {
  mail_button.addEventListener("click", mail_popup);
  mail_overlay.addEventListener("click", mail_popup);
  unused_clothing_overlay.addEventListener("click", unused_clothing);
  unused_clothing_popup.addEventListener("click", unused_clothing);
  unused_clothing();
});
