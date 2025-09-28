console.log("[add_clothes_form.js] loaded");

document.addEventListener("DOMContentLoaded", () => {
  console.log("[add_clothes_form.js] DOM ready");

  // --- CO₂ popup wiring ---
  const co2_popup   = document.getElementById("co2_popup");
  const co2_overlay = document.getElementById("co2_overlay");
  const co2_text    = document.getElementById("co2_e_text");

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

  let co2_open = false;
  function toggleCO2(text) {
    if (!co2_popup || !co2_overlay || !co2_text) return; // guards
    co2_open = !co2_open;
    co2_popup.style.display   = co2_open ? "block" : "none";
    co2_overlay.style.display = co2_open ? "block" : "none";
    co2_text.style.display    = co2_open ? "block" : "none";
    co2_text.innerText        = co2_open ? (text || "") : "";
  }

  // Clicking the overlay hides popup and redirects to Generate Outfit
  if (co2_overlay) {
    co2_overlay.addEventListener("click", () => {
      toggleCO2("");
      const base = (window.APP_ROUTES && window.APP_ROUTES.generateOutfit) || "/generate_outfit";
      const url  = new URL(base, window.location.origin);
      window.location.href = url.toString();
    });
  }

  // --- Form wiring ---
  const form         = document.getElementById("clothing_form");
  const nameInput    = document.getElementById("clothing-name"); // matches your HTML id
  const typeRadios   = document.getElementsByName("type of clothing");
  const fileInput    = document.getElementById("file");
  const imagePreview = document.getElementById("imagePreview");
  if (!form) return;

  // Image preview
  if (fileInput && imagePreview) {
    fileInput.addEventListener("change", () => {
      const file = fileInput.files && fileInput.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreview.src = e.target.result;
          imagePreview.style.display = "block";
        };
        reader.readAsDataURL(file);
      } else {
        imagePreview.src = "";
        imagePreview.style.display = "none";
      }
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Gather values
    const typedName = (nameInput && nameInput.value) ? nameInput.value : "";
    let clothingType = "";
    for (const r of typeRadios) { if (r.checked) { clothingType = r.value; break; } }

    // Persist entry
    const entry   = { name: typedName.trim(), clothing_type: clothingType };
    const entries = JSON.parse(localStorage.getItem("entries") || "[]");
    entries.push(entry);
    localStorage.setItem("entries", JSON.stringify(entries));

    // Unlocks (long skirt / yellow shirt / jorts)
    const lower  = typedName.toLowerCase();
    const norm   = lower.replace(/\s+/g, "").replace(/[^a-z]/g, "");
    const tokens = lower.replace(/[^a-z\s]/g, " ").split(/\s+/).filter(Boolean);
    const KEY    = "unlocked_options";
    const addFlag = (flag) => {
      const curr = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (!curr.includes(flag)) curr.push(flag);
      localStorage.setItem(KEY, JSON.stringify(curr));
    };
    if (norm === "longskirt" || (tokens.includes("long") && tokens.includes("skirt"))) addFlag("long_skirt");
    const hasYellow = tokens.includes("yellow");
    const hasShirt  = tokens.includes("shirt") || tokens.includes("tshirt") || tokens.includes("tee");
    if (norm === "yellowshirt" || (hasYellow && hasShirt)) addFlag("yellow_shirt");
    if (tokens.includes("jorts") || norm === "jorts") addFlag("jorts");

    console.log("[unlocked_options]", localStorage.getItem(KEY));

    // Show CO₂ popup with the selected type’s footprint
    const emissions = carbonFootprint[clothingType] || "";
    toggleCO2(emissions);

    // Reset form visuals (popup stays until overlay click)
    form.reset();
    if (imagePreview) imagePreview.style.display = "none";

    // Safety fallback: if popup elements are missing, redirect immediately
    if (!co2_popup || !co2_overlay || !co2_text) {
      const base = (window.APP_ROUTES && window.APP_ROUTES.generateOutfit) || "/generate_outfit";
      const url  = new URL(base, window.location.origin);
      window.location.href = url.toString();
    }
  });
});
