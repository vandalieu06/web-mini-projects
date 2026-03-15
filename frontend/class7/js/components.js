export const CartItem = (props) => {
  const { src, alt, title, price } = props;
  return `
    <div class="cart-item py-2 flex items-start space-x-2.5">
      <img
        class="cart-item-img w-[70px] aspect-square object-cover object-center rounded-lg"
        src="${src}"
        alt="${alt}"
      />
      <div>
        <h4 class="cart-item-title font-semibold">${title}</h4>
        <p class="cart-item-price text-sm">${price}€</p>
      </div>
    </div>
  `;
};

export function ProductCard(props) {
  const { id, src, alt, title, price } = props;

  return `
        <article id="${id}" class="producto w-[200px] p-5 flex flex-col items-center space-y-2.5 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl bg-white">
            <img
                src="${src}"
                alt="${alt}"
                class="producto-img w-[150px] aspect-square object-cover object-center rounded-lg"
            />
            <h3 class="producto-title text-lg font-bold text-center">${title}</h3>
            <span class="producto-precio text-base font-medium text-gray-700">${price}€</span>
            <button class="producto-add border-none py-2 px-4 flex items-center space-x-1 rounded-lg cursor-pointer bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200">
                Añadir
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="128"
                    height="128"
                    viewBox="0 0 24 24"
                    class="w-4 h-4 fill-current text-white"
                >
                    <path
                        fill="currentColor"
                        d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"
                    />
                </svg>
            </button>
        </article>
    `;
}
