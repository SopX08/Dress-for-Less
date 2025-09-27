//js for managing leaves counter and log outfit popup
var leaves = localStorage.getItem('leaves') || 0;
localStorage.setItem('leaves', leaves);
updateLeaves();
const confirm_button = document.getElementById('confirm-button');
confirm_button.addEventListener("click", () => {
    localStorage.setItem('leaves', Number(localStorage.getItem('leaves'))+5);
    updateLeaves();
    token_modal.style.display = 'flex';
    token_modal.style.justifyContent = 'center';
    token_modal.style.alignItems = 'center';
});

function updateLeaves() {
    document.getElementById('leaves').innerHTML = localStorage.getItem('leaves');
}

const token_modal = document.getElementById('token-modal');
window.onclick = function(event) {
    if (event.target ==  token_modal) {
        token_modal.style.display = 'none';
    }
}