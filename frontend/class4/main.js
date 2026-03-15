const gallery = document.querySelector(".gallery");
const btn = document.querySelector(".btn-submit");

const num_img = document.querySelector(".num-img");
const width_img = document.querySelector(".width-img");
const height_img = document.querySelector(".height-img");
const src_img = document.querySelector(".src-img");
const grid_img = document.querySelector(".grid-img");

btn.addEventListener('click', (e) => {
  e.preventDefault();
  
  const num_grid = grid_img.value ? grid_img.value : 2;
  gallery.style.gridTemplateColumns = "repeat(" + num_grid + ", 1fr)";

  if (!num_img.value && num_img.value > 4 && num_img.value < 0) {
    alert("Introduce un numero valido!")
  }  
  
  const img_select = document.querySelector(".img-" + num_img.value);
  
  if (width_img.value){
    img_select.style.width = width_img.value + "px";
  }
  
  if (height_img.value){
    img_select.style.height = height_img.value + "px";
  }
  
  if (src_img.value){
    img_select.src = src_img.value;
  }

})