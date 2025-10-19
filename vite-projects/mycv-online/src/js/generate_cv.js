// Eventos de los botones
const btnAddExperience = document.querySelector(".add_experience");
btnAddExperience.addEventListener("click", (e) => {
  e.preventDefault();

  const experience = document.createElement("div");
  experience.innerHTML = `
    <div class="flex flex-col gap-4 p-4 border border-pink-200 rounded-lg bg-pink-50">
      <div>
          <label for="exp-puesto" class="block text-sm font-medium text-gray-700">Puesto</label>
          <input type="text" id="exp-puesto"
              class="cv-exp-puesto mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
              placeholder="Ej: Desarrollador Front-end">
      </div>
      <div class="grid grid-cols-2 gap-4">
          <div>
              <label for="exp-empresa" class="block text-sm font-medium text-gray-700">Empresa</label>
              <input type="text" id="exp-empresa"
                  class="cv-exp-empresa mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Ej: Tech Solutions S.A.">
          </div>
          <div>
              <label for="exp-periodo" class="block text-sm font-medium text-gray-700">Período
                  (Mes/Año -
                  Mes/Año)</label>
              <input type="text" id="exp-periodo"
                  class="cv-exp-periodo mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Ej: Enero 2020 - Presente">
          </div>
      </div>
      <div>
          <label for="exp-descripcion" class="block text-sm font-medium text-gray-700">Descripción de
              Responsabilidades y Logros (Usar viñetas)</label>
          <textarea id="exp-descripcion" rows="3"
              class="cv-exp-descripcion mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
              placeholder="· Lideré el desarrollo del nuevo sitio web..."></textarea>
      </div>
  </div>
  `;

  const container = document.querySelector(".laboral-exp-container");
  container.appendChild(experience);
});

const btnRemoveExperience = document.querySelector(".remove_experience");
btnRemoveExperience.addEventListener("click", (e) => {
  e.preventDefault();
  const container = document.querySelector(".laboral-exp-container");
  if (container.children.length > 1) {
    container.removeChild(container.lastChild);
  }
});

const btnAddEducation = document.querySelector(".add_education");
btnAddEducation.addEventListener("click", (e) => {
  e.preventDefault();
  const boxEducation = document.createElement("div");
  boxEducation.innerHTML = `
    <div class="flex flex-col gap-4 p-4 border border-pink-200 rounded-lg bg-pink-50">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="edu-titulo" class="block text-sm font-medium text-gray-700">Título
            Obtenido</label>
          <input type="text" id="edu-titulo"
            class="cv-edu-titulo mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
            placeholder="Ej: Licenciatura en Informática">
        </div>
        <div>
          <label for="edu-institucion"
            class="block text-sm font-medium text-gray-700">Institución</label>
          <input type="text" id="edu-institucion"
            class="cv-edu-institucion mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
            placeholder="Ej: Universidad Nacional">
        </div>
      </div>
      <div>
        <label for="edu-periodo" class="block text-sm font-medium text-gray-700">Período</label>
        <input type="text" id="edu-periodo"
          class="cv-edu-periodo mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
          placeholder="Ej: 2015 - 2019">
      </div>
    </div>
  `;

  const container = document.querySelector(".education_container");
  container.appendChild(boxEducation);
});

const btnRemoveEducation = document.querySelector(".remove_education");
btnRemoveEducation.addEventListener("click", (e) => {
  e.preventDefault();
  const container = document.querySelector(".education_container");
  if (container.children.length > 1) {
    container.removeChild(container.lastChild);
  }
});

// Obtener datos y generar CV
const formCV = document.querySelector("#cvForm");
const viewCv = document.querySelector(".view_cv");
const btnGenerate = document.querySelector(".btn-generar");

btnGenerate.addEventListener("click", (e) => {
  e.preventDefault();

  viewCv.innerHTML = "";

  const view_cv_container = document.createElement("div");
  view_cv_container.className =
    "w-full max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg";

  const cv_header = createHeader();
  const cv_sec_1 = createSec1();
  const cv_sec_2 = createSec2();
  const cv_sec_3 = createSec3();
  const cv_sec_4 = createSec4();

  view_cv_container.innerHTML += cv_header;
  view_cv_container.innerHTML += cv_sec_1;
  view_cv_container.innerHTML += cv_sec_2;
  view_cv_container.innerHTML += cv_sec_3;
  view_cv_container.innerHTML += cv_sec_4;

  viewCv.appendChild(view_cv_container);
  viewCv.classList.remove("hidden");

  viewCv.scrollIntoView({ behavior: "smooth", block: "start" });
});

const createHeader = () => {
  const cv_name = document.querySelector(".cv-nombre").value || "[Tu Nombre]";
  const cv_title =
    document.querySelector(".cv-titulo").value || "[Tu Título Profesional]";
  const cv_email =
    document.querySelector(".cv-email").value || "[email@ejemplo.com]";
  const cv_telefono =
    document.querySelector(".cv-telefono").value || "[Teléfono]";
  const cv_linkedin =
    document.querySelector(".cv-linkedin").value || "[LinkedIn/Portafolio]";

  return `
    <header class="text-center pb-6 mb-8 border-b border-pink-300">
      <h1 class="text-4xl font-extrabold text-pink-800 cv-display-nombre uppercase">
        ${cv_name}
      </h1>
      <p class="text-xl font-light text-gray-600 cv-display-titulo mt-1">
        ${cv_title}
      </p>
      <div class="text-sm text-gray-500 mt-3 flex justify-center flex-wrap gap-x-4">
        <span class="cv-display-email">${cv_email}</span>
        <span class="cv-display-telefono">${cv_telefono}</span>
        <a href="${cv_linkedin}" class="text-pink-600 hover:text-pink-800 hover:underline cv-display-linkedin" target="_blank">
          ${cv_linkedin}
        </a>
      </div>
    </header>
  `;
};

const createSec1 = () => {
  const resume =
    document.querySelector(".cv-resumen").value ||
    "[Escribe un breve resumen profesional]";

  return `
    <section class="mb-8">
      <h3 class="text-xl font-semibold text-pink-600 border-b-2 border-pink-300 pb-1 mb-3 tracking-wider">
        PERFIL PROFESIONAL
      </h3>
      <p class="text-gray-700 leading-relaxed cv-display-resumen">
        ${resume}
      </p>
    </section>
  `;
};

const createSec2 = () => {
  const experiences = document.querySelectorAll(".laboral-exp-container > div");
  let experiencesHTML = "";

  experiences.forEach((exp) => {
    const puesto = exp.querySelector(".cv-exp-puesto").value || "[Puesto]";
    const empresa = exp.querySelector(".cv-exp-empresa").value || "[Empresa]";
    const periodo = exp.querySelector(".cv-exp-periodo").value || "[Período]";
    const descripcion =
      exp.querySelector(".cv-exp-descripcion").value ||
      "[Descripción de responsabilidades]";

    const descripcionLines = descripcion.split("\n");

    const descripcionList = descripcionLines
      .map((line) => {
        const cleanLine = line.trim().replace(/^[·•-]\s*/, "");
        return `<li>${cleanLine}</li>`;
      })
      .join("");

    experiencesHTML += `
      <div class="mb-5 border-l-4 border-pink-300 pl-4">
        <h4 class="text-lg font-bold text-gray-800 cv-display-exp-puesto">
          ${puesto}
        </h4>
        <p class="text-sm font-medium text-gray-600 mb-1">
          <span class="cv-display-exp-empresa">${empresa}</span> |
          <span class="cv-display-exp-periodo">${periodo}</span>
        </p>
        <ul class="list-disc ml-5 text-gray-700 text-sm leading-snug cv-display-exp-descripcion">
          ${descripcionList || "<li>[Descripción de responsabilidades]</li>"}
        </ul>
      </div>
    `;
  });

  return `
    <section class="mb-8">
      <h3 class="text-xl font-semibold text-pink-600 border-b-2 border-pink-300 pb-1 mb-3 tracking-wider">
        EXPERIENCIA LABORAL
      </h3>
      ${experiencesHTML}
    </section>
  `;
};

const createSec3 = () => {
  const educations = document.querySelectorAll(".education_container > div");
  let educationsHTML = "";

  educations.forEach((edu) => {
    const titulo =
      edu.querySelector(".cv-edu-titulo").value || "[Título Obtenido]";
    const institucion =
      edu.querySelector(".cv-edu-institucion").value || "[Institución]";
    const periodo = edu.querySelector(".cv-edu-periodo").value || "[Período]";

    educationsHTML += `
      <div class="mb-4">
        <h4 class="text-lg font-bold text-gray-800 cv-display-edu-titulo">
          ${titulo}
        </h4>
        <p class="text-sm font-medium text-gray-600">
          <span class="cv-display-edu-institucion">${institucion}</span> |
          <span class="cv-display-edu-periodo">${periodo}</span>
        </p>
      </div>
    `;
  });

  return `
    <section class="mb-8">
      <h3 class="text-xl font-semibold text-pink-600 border-b-2 border-pink-300 pb-1 mb-3 tracking-wider">
        EDUCACIÓN
      </h3>
      ${educationsHTML}
    </section>
  `;
};

const createSec4 = () => {
  const habilidades =
    document.querySelector(".cv-habilidades").value || "[Habilidades clave]";

  return `
    <section>
      <h3 class="text-xl font-semibold text-pink-600 border-b-2 border-pink-300 pb-1 mb-3 tracking-wider">
        HABILIDADES
      </h3>
      <p class="text-gray-700 cv-display-habilidades">
        ${habilidades}
      </p>
    </section>
  `;
};
