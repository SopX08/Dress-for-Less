document.addEventListener("DOMContentLoaded", () => {
  const clothes_container = document.getElementById("wardrobe-slot-top");
  const rows = 3;
  const cols = 3;

  let entries = JSON.parse(localStorage.getItem("entries")) || [];

  let entriesList = entries.map((entry) => [entry.name, entry.clothing_type]);

  console.log(entriesList);

  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      const div = document.createElement("div");
      div.className = "grid-item";
      clothes_container.appendChild(div);
    }
  }
});
