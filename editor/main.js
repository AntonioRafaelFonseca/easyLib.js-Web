const input = document.getElementById("input");
const output = document.querySelector('.output');

let fontSize = 12;

async function loadLib(){
  try {
    const res = await fetch("easyLibEditor.js");
    var libCode = await res.text();
    return libCode;
  } catch(e) {
    console.error('Failed to load library:', e);
  }
}

async function loadExample(){
  try {
    const res = await fetch("example.js");
    const exampleCode = await res.text();
    input.value = exampleCode;
  } catch(e) {
    console.error('Failed to load example:', e);
  }
}

async function run() {
  var full = '';
  output.innerHTML = '';
  var code = '';

  code = input.value;
  full = code + '\n' + 'onload()' + '\n' + 'start(main)';

  // Executa
  try {
    const func = new Function(full);
    func();
  } catch(e) {
    console.error("Erro ao executar código:", e);
  }
}

window.onload = loadExample;

function zoom(str) {
  if(str == 'in')
  {
    fontSize += 3;
  }
  if(str == 'out')
  {
    fontSize -= 3
  }
  input.style.fontSize = `${fontSize}px`
}

input.addEventListener("keydown", function(e) {
  if (e.key === "Tab") {
    e.preventDefault(); // impede ir para outro elemento

    const start = this.selectionStart;
    const end = this.selectionEnd;

    // insere dois espaços
    this.value =
      this.value.substring(0, start) +
      "  " +
      this.value.substring(end);

    // move o cursor depois dos espaços
    this.selectionStart = this.selectionEnd = start + 2;
  }
});

input.addEventListener('keydown', (e) => {
  if(e.ctrlKey && e.key == "+")
  {
    e.preventDefault()
    zoom('in')
  }
  if(e.ctrlKey && e.key == "-")
  {
    e.preventDefault()
    zoom('out')
  }
});
