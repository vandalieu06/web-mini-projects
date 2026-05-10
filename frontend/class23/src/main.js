const containerEmociones = document.querySelector(".container-emociones");
const formEmociones = document.querySelector("#enviar-emocion");
let estadosDB = [];

let countSelect = 0;
let lastId = null;
const dataEmociones = [
  {
    title: "Cansado",
    src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=1000",
  },
  {
    title: "Tranquilo",
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000",
  },
  {
    title: "Feliz",
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1000",
  },
  {
    title: "Motivado",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000",
  },
  {
    title: "Estresado",
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000", // Alternativa optimizada para carga rápida
  },
];

const ComponenteEmociones = (index, { title, src }) => {
  return `
  <div id="box-${index}" data-id="${index}" class="box">
    <img src="${src}" class="box-img"/>
    <h3 class="box--text">${title}</h3>
  </div>
  `;
};

const renderEmociones = (data) => {
  const boxs = data.map((d, index) => ComponenteEmociones(index, d));
  containerEmociones.innerHTML = boxs.join(" ");
};

renderEmociones(dataEmociones);

containerEmociones.addEventListener("click", (e) => {
  if (!e.target.closest(".box")) return;
  const actualE = e.target.closest(".box");

  if (countSelect == 1) {
    const tmpdiv = document.querySelector(`#box-${lastId}`);
    tmpdiv.classList.toggle("active");
    countSelect = 0;
  }

  actualE.classList.toggle("active");
  const id = actualE.dataset.id;
  lastId = id;
  console.log(`Se ha puslado en una emocion (id=${id}) !!!!`);
  countSelect++;
});

formEmociones.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newData = dataEmociones[lastId]?.title?.toLocaleLowerCase();

  const res = await fetch("/server/add-estat.php", {
    method: "POST",
    body: JSON.stringify({ estat: newData }),
  });
  console.log(await res.json());
});
