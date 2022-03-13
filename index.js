let banco = [];

const getBanco = () => JSON.parse(localStorage.getItem("todoList")) ?? [];
const setBanco = (banco) =>
  localStorage.setItem("todoList", JSON.stringify(banco));

const criarItem = (tarefa, status, indice) => {
  const item = document.createElement("label");
  item.classList.add("todo__item");
  item.innerHTML = `
    <input type="checkbox" ${status} data-id=${indice} >
    <div>${tarefa}</div>
    <input type="button" value="x" data-id=${indice}>
    `;

  document.getElementById("todoList").appendChild(item);
};

const limparTarefas = () => {
  document.getElementById("todoList");
  while (todoList.firstChild) {
    todoList.removeChild(todoList.lastChild);
  }
};

const atualizartela = () => {
  limparTarefas();
  const banco = getBanco();
  banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
};

function geradorDeId() {
  let timestamp = new Date();

  let id =
    timestamp.getHours() +
    timestamp.getMinutes() +
    timestamp.getSeconds() +
    timestamp.getMilliseconds();

  return id;
}

const adicionarItem = (e) => {
  const tecla = e.key;

  if (tecla === "Enter" && e.target.value !== "") {
    const banco = getBanco();
    banco.push({
      id: geradorDeId(),
      tarefa: e.target.value,
      status: "",
    });
    setBanco(banco);
    e.target.value = "";
    atualizartela();
  }
};

const removerItem = (indice) => {
  const banco = getBanco();
  banco.splice(indice, 1);
  setBanco(banco);
  atualizartela();
};

const atualizarItem = (indice) => {
  const banco = getBanco();
  banco[indice].status = banco[indice].status === "" ? "checked" : "";
  setBanco(banco);
  atualizartela();
};

const clickItem = (e) => {
  const elemento = e.target;
  if (elemento.type === "button") {
    removerItem(elemento.dataset.id);
  } else if (elemento.type === "checkbox") {
    atualizarItem(elemento.dataset.id);
  }
};

document.getElementById("newItem").addEventListener("keypress", adicionarItem);
document.getElementById("todoList").addEventListener("click", clickItem);

atualizartela();
