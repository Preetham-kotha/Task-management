//Parent element to store 
const taskContainer = document.querySelector(".task_container");

//Global store
let globalStore = [];

const newCard = ({ imageUrl, taskDescription, taskTitle, taskType, id }) =>
  `<div class="col-md-4 col-sd-6" id=${id}>
        <div class="card">
            <div class="card-header d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-outline-success">
                    <i class="fas fa-pencil-alt"></i></button>
                <button type="button" class="btn btn-outline-danger" onclick="deleteCard.apply(this,arguments)" id=${id}><i class="fas fa-trash-alt" onclick="deleteCard.apply(this,arguments)" id=${id}></i></button>
            </div>
            <img src=${imageUrl} alt="image" class="card-img-top"/>
            <div class="card-body">
                <h5 class="card-title">${taskTitle}</h5>
                <p class="card-text">${taskDescription}</p>
                <span class="badge bg-primary">${taskType}</span>
            </div>
            <div class="card-footer text-muted">
                <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
            </div>
        </div>
    </div>`;

const loadInitialTaskCards = () => {
    const getInitialData = localStorage.tasky;

    if (!getInitialData) return;
    
    const { cards } = JSON.parse(getInitialData);
    cards.map((cardObject) => {
        const createNewCard = newCard(cardObject);
        taskContainer.insertAdjacentHTML("beforeend", createNewCard);
        globalStore.push(cardObject);
    });

}

const updateLocalStorage = () =>
  localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));

const saveChanges = () => {
    const taskData = {
      id: `${Date.now()}`,
      imageUrl: document.getElementById("imageurl").value,
      taskTitle: document.getElementById("tasktitle").value,
      taskType: document.getElementById("tasktype").value,
      taskDescription: document.getElementById("textdescription").value,
    };   
    const createNewCard = newCard(taskData);

    taskContainer.insertAdjacentHTML("beforeend", createNewCard);

    globalStore.push(taskData);
    updateLocalStorage();
}

const deleteCard = (event) => {
    
    event = window.event;
    const targetId = event.target.id;
    const tagname = event.target.tagname;
    globalStore = globalStore.filter(
        (cardObject) => cardObject.id !== targetId
    );
   
    updateLocalStorage();
   //access dom to remove
    if (tagname === "BUTTON") {
        return taskContainer.removeChild(
            event.target.parentNode.parentNode.parentNode
        );
    }
    return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode
    );

}