let msgs = [
  {
    code: "cde",
    author: "smaldsal",
    message: "cjadslkdasdjlskajdklajsdlknakljncvdkjsnvjndskjn",
  },
];

const dForm = document.querySelector("#form");
const dMsgs = document.querySelector("#missatges");
const btnRemoveMsg = document.querySelector(".btn-remove-msg");

// --- UI ---
const componentMsg = (code, author, msg) => {
  const div = document.createElement("div");
  div.id = code;
  div.innerHTML = `
    <h3>${author}</h3>
    <p>${msg}</p>
    <button class="btn-remove-msg">X</button>
  `;
  return div;
};

const buildMsgs = (msgs) => {
  const divs = msgs.map((m) =>
    componentMsg(msg.code, msgs.author, msgs.message),
  );
};
