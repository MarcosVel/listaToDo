//criando Array
let data = [{
    id: 1,
    title: "Estudar HTML"
}, {
    id: 2,
    title: "Estudar CSS"
}, {
    id: 3,
    title: "Estudar JS"
}, {
    id: 4,
    title: "Estudar PHP"
}];

function renderTodo() {  

    //preciso colocar isso para limpar a lista ao adicionar uma nova tarefa, pq se não adiciona tudo dnv
    document.querySelector(".todo").innerHTML = "";

    data.forEach(task => {

        let li = document.createElement("li");

        li.innerHTML = `
            <input type="checkbox" id="task-${task.id}">
            <label for="task-${task.id}">${task.title}</label>
            <button type="button">x</button>
        `;

        //adicionando evento de checked no li
        li.querySelector("input").addEventListener("change", e => {
            //e.target é onde está mirado, no caso, o input
            if (e.target.checked) {
                li.classList.add("complete")
            } else {
                li.classList.remove("complete")
            }
        });

        //adicionando botão para excluir tarefa
        li.querySelector("button").addEventListener("click", e => {

            //pegando id do input
            let button = e.target;
            let li = button.parentNode;
            let input = li.querySelector("input");
            let id = input.id;
            let idArray = id.split("-");
            let todoId = idArray[1];
            let title = li.querySelector("label").innerText //para pegar o title e mostrar quando for excluir   /// innerText pega o que está na label

            //para confirmar se o usuário quer excluir
            if (confirm(`Deseja realmente excluir a tarefa: ${title}?`)) {

                data = data.filter(task => task.id !== parseInt(todoId));
            
                //para atualizar a renderização da tela
                renderTodo();

            }
            

        });

        //adicionando o li no ul que seria 'todo'
        document.querySelector(".todo").append(li);

    });

}

document.querySelector("#new-task").addEventListener("keyup", e => {

    if (e.key === "Enter") {

        data.push({
            id: data.length+1,
            title: e.target.value
        });

        //para ao apertar enter, limpe o input
        e.target.value = "";

        //adicionando o input na lista
        renderTodo();

    }

});

renderTodo();