const co2_popup = document.getElementById("co2_popup");
const co2_overlay = document.getElementById("co2_overlay");
const co2_text = document.getElementById("co2_e_text");

const carbonFootprint = {
  tshirt: "2 to 6 kg CO₂e",
  shirt: "5 to 10 kg CO₂e",
  longskirt: "6 to 12 kg CO₂e",
  shortskirt: "4 to 8 kg CO₂e",
  sweater: "10 to 15 kg CO₂e",
  longsweater: "12 to 20 kg CO₂e",
  pants: "7 to 15 kg CO₂e",
  widepants: "8 to 18 kg CO₂e",
  shorts: "3 to 7 kg CO₂e",
  dress: "8 to 20 kg CO₂e",
  dresssleeves: "9 to 22 kg CO₂e",
};

var co2_check = 0;
var emissions = 0;
function co2() {
  if (co2_check == 0) {
    co2_check = 1;
    co2_popup.style.display = "block";
    co2_overlay.style.display = "block";
    co2_text.style.display = "block";
    co2_text.innerText = emissions;
  } else {
    co2_check = 0;
    co2_popup.style.display = "none";
    co2_overlay.style.display = "none";
    co2_text.style.display = "none";
    co2_text.innerText = "";
  }
}

// Store form data in local storage
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("clothing_form");
  const nameInput = document.getElementById("name");
  const clothing_typeInput = document.getElementsByName("type of clothing");
  const fileInput = document.getElementById("file");

  co2_overlay.addEventListener("click", co2);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name_value = nameInput.value;

    let clothingType = "";
    for (let radio of clothing_typeInput) {
      if (radio.checked) {
        clothingType = radio.value;
        break;
      }
    }

    emissions = carbonFootprint[clothingType];
    console.log(clothingType, emissions);

    const entry = {
      name: name_value,
      clothing_type: clothingType,
    };
    // Retrieve existing entries from localStorage, or initialize an empty array
    let entries = JSON.parse(localStorage.getItem("entries")) || [];

    console.log(entries);

    // Add the new entry to the list
    entries.push(entry);

    // Save the updated list back to localStorage
    localStorage.setItem("entries", JSON.stringify(entries));

    co2();

    form.reset();
    imagePreview.style.display = "none";
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];

    // Check if the file is an image
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      // Set up a callback once the file is read
      reader.onload = function (e) {
        imagePreview.src = e.target.result; // Set the image src to the file's data URL
        imagePreview.style.display = "block"; // Show the image preview
      };

      reader.readAsDataURL(file); // Read the file as a Data URL
    } else {
      // Hide the preview if the selected file is not an image
      imagePreview.src = "";
      imagePreview.style.display = "none";
    }
  });
});
