document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector(".body");
  const form = document.getElementById("form");
  const title = document.querySelector(".title");
  const description = document.querySelector(".description");
  const image = document.querySelector(".image");

  const configMap = [
    // Web
    { id: "option-bg-color", target: body, property: "backgroundColor" },

    // Título
    { id: "option-title-color", target: title, property: "color" },
    { id: "option-title-font", target: title, property: "fontFamily" },
    { id: "option-title-align", target: title, property: "textAlign" },
    {
      id: "option-title-size",
      target: title,
      property: "fontSize",
      unit: "px",
    },

    // Texto
    { id: "option-text-color", target: description, property: "color" },
    { id: "option-text-font", target: description, property: "fontFamily" },
    {
      id: "option-text-size",
      target: description,
      property: "fontSize",
      unit: "px",
    },

    // Imagen
    { id: "option-image-width", target: image, property: "width", unit: "px" },
    {
      id: "option-image-height",
      target: image,
      property: "height",
      unit: "px",
    },
  ];

  function applyStyleAndSave(element, property, value, unit = "", storageKey) {
    if (value) {
      element.style[property] = `${value}${unit}`;
      localStorage.setItem(storageKey, value);
    }
  }

  function loadAndApplySettings() {
    configMap.forEach((config) => {
      const savedValue = localStorage.getItem(config.id);
      const inputElement = document.getElementById(config.id);

      if (savedValue && inputElement) {
        applyStyleAndSave(
          config.target,
          config.property,
          savedValue,
          config.unit,
          config.id,
        );

        inputElement.value = savedValue;
      }
    });
  }

  function handleOptionChange(e) {
    const changedElement = e.target;
    const config = configMap.find((config) => config.id === changedElement.id);

    if (config) {
      const value = changedElement.value;

      applyStyleAndSave(
        config.target,
        config.property,
        value,
        config.unit,
        config.id,
      );
    }
  }

  loadAndApplySettings();

  form.addEventListener("input", handleOptionChange);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Configuración guardada (en localStorage).");
    alert("Configuración guardada (en localStorage).");
  });
});
