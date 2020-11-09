class ToDoList {
    constructor(id){
        this.list = $(id);
        this.listTemplate       = this.list.find(".card");
        this.addListBtn         = this.list.find("#add-list");
        this.taskTemplate       = this.list.find(".task-item");

        this.loadData();
        this.createEvents();
    }

    loadData(){
        var that = this;
        $.get("api/get-lists.php", function(data) {
            let result = JSON.parse(data);
            $(result).each(element => {
                that.addList(result[element])
            });
        });
    }

    listInput(currentListTemplate){
        let editListBtn        = currentListTemplate.find(".edit-list");
        let deleteListBtn      = currentListTemplate.find(".delete-list");
        let listHeading        = currentListTemplate.find(".card-heading");
        let that = this;
        deleteListBtn.click(this.deleteList.bind(this));
        editListBtn.click(this.editListHeading.bind(currentListTemplate));

        $(listHeading).on('keypress',function(e) {
            if(e.which == 13) {
                that.sendListUpdateRequest(that.getListId(currentListTemplate), listHeading.val(), currentListTemplate);
                listHeading.attr("readonly", true);
            }
        });
    }

    fillList(currentListTemplate, data){
        var that = this;
        let listHeading = currentListTemplate.find(".card-heading");
        listHeading.val(data.name);
        let currentListId = currentListTemplate.find("input[name='list-id']");
        currentListId.val(data.id);
        $.get("api/get-tasks.php?id="+data.id, function(task) {
            let result = JSON.parse(task);
            $(result).each(element => {
                that.addTask(currentListTemplate, result[element])
            })
        });
    }

    createList(currentListTemplate){
        let listName = this.list.find(".add-list-name");
        $.post("api/add-list.php", {name:listName.val()}, function(data) {
            let listHeading = currentListTemplate.find(".card-heading");
            let currentListId = currentListTemplate.find("input[name='list-id']");
            data = JSON.parse(data);
            listHeading.val(data.name);
            currentListId.val(data.id);
        });
    }

    addListEvent(event){
        this.addList();

        let listName = this.list.find(".add-list-name");
        listName.val("");
    }

    addList(data){
        let currentListTemplate = this.listTemplate.clone();
        if (data){
            this.fillList(currentListTemplate, data);
            console.log(true)
        }
        else{
            this.createList(currentListTemplate);
        }
        this.list.append(currentListTemplate);
        this.listInput(currentListTemplate);
        let currentAddBtn = currentListTemplate.find(".add-task");
        currentAddBtn.click(this.addTaskEvent.bind(this));
        currentListTemplate.css("display", "block");
    }

    sendListUpdateRequest(id, name, currentListTemplate){
        $.post("api/edit-list.php?id="+id, {name:name}, function(data) {
            let listHeading = currentListTemplate.find(".card-heading");
            data = JSON.parse(data);
            listHeading.val(data.name);
          });
    }

    editListHeading(event){
        event.preventDefault();
        let listHeading = this.find(".card-heading");
        listHeading.attr("readonly", false);
        listHeading.focus();
    }

    getListId(currentListTemplate){
        let currentListId = currentListTemplate.find("input[name='list-id']");
        return currentListId.val();
    }

    deleteList(event){
        event.preventDefault();
        let currentDelBtn = $(event.currentTarget);
        let currentListId = this.getListId(currentDelBtn.closest(".card"));
        $.get("api/delete-list.php", {id:currentListId}, function() {
            currentDelBtn.closest(".card").remove();
        });
    }

    fillTask(currentCard, currentTaskTemplate, data){
        let taskInputField = currentCard.find(".task-input");
        taskInputField.val(data.name);
        let taskCheckbox = currentTaskTemplate.find(".task-is-done");
        
        let currentTaskId = currentTaskTemplate.find("input[name='task-id']");
        currentTaskId.val(data.id);

        $(taskCheckbox).prop("checked", data.isDone == 1 ? true: false);
    }

    placeTaskInput(currentCard, currentTaskTemplate){
        let taskDescriptionField = currentTaskTemplate.find(".task-description");
        let taskInputField = currentCard.find(".task-input");
        let taskInput = taskInputField.val();
        
        taskDescriptionField.val(taskInput);
        taskInputField.val("");
        return true;    
    }

    getTaskId(currentTaskTemplate){
        let currentTaskId = currentTaskTemplate.find("input[name='task-id']");
        return currentTaskId.val();
    }


    addTask(currentCard, data){
        let currentTaskTemplate = this.taskTemplate.clone();
        let currentTaskList     = currentCard.find(".list-group");
        let taskInputField = currentCard.find(".task-input");
        let currentListId = currentCard.find("input[name='list-id']");
        let that = this;
        let taskCheckbox = currentTaskTemplate.find(".task-is-done");
        
        let taskName = currentTaskTemplate.find(".task-description");
        

        if (data) {
            this.fillTask(currentCard, currentTaskTemplate, data);
        }
        else{
            $.post("api/add-task.php", {name:taskInputField.val(), toDoList_id:currentListId.val()}, function(data) {
                data = JSON.parse(data);
                taskName.val(data.name);
              });
        }

        let editTaskBtn         = currentTaskTemplate.find(".edit-task");
        let deleteTaskBtn       = currentTaskTemplate.find(".delete-task");
        currentTaskList.append(currentTaskTemplate);
        
        if (this.placeTaskInput(currentCard, currentTaskTemplate)) {
            currentTaskTemplate.css("display", "block");

            deleteTaskBtn.click(this.deleteTask.bind(this));
            editTaskBtn.click(this.editTask.bind(currentTaskTemplate));

            $(taskCheckbox).change(function() {
                that.sendTaskUpdateRequest(that.getTaskId(currentTaskTemplate), taskName.val(), taskCheckbox.prop("checked"), currentTaskTemplate);
                taskDescriptionField.attr("readonly", true);
              });
            
            $(currentTaskTemplate).on('keypress',function(e) {
                if(e.which == 13) {
                    that.sendTaskUpdateRequest(that.getTaskId(currentTaskTemplate), taskName.val(), taskCheckbox.prop("checked"), currentTaskTemplate);
                    taskDescriptionField.attr("readonly", true);
                }
            });
        }
    }

    addTaskEvent(event){
        let currentCard = $(event.currentTarget).closest(".card");
        let taskInputField = currentCard.find(".task-input");
        let taskInput = taskInputField.val();

        if ($.trim(taskInput) === ""){
            alert ("Enter the description of task");
            return false;
        }
        console.log('addTaskEvent',currentCard, taskInputField, taskInput);

        this.addTask(currentCard);
    }

    sendTaskUpdateRequest(id, name, isDone, currentTaskTemplate){
        $.post("api/edit-task.php?id="+id, {name:name, isDone:isDone}, function(data) {
            let taskDescriptionField = currentTaskTemplate.find(".task-description");
            data = JSON.parse(data);
            taskDescriptionField.val(data.name);
          });
    }

    editTask(event){
        event.preventDefault();
        let taskDescriptionField = this.find(".task-description");
        taskDescriptionField.attr("readonly", false);
        taskDescriptionField.focus();
    }


    deleteTask(event){
        event.preventDefault();
        let currentDelBtn = $(event.currentTarget);
        let currentTaskId = this.getTaskId(currentDelBtn.closest(".task-item"));
        $.get("api/delete-task.php", {id:currentTaskId}, function() {
            currentDelBtn.closest(".task-item").remove();
        });
    }

    createEvents(){
        this.addListBtn.click(this.addListEvent.bind(this));
    }
}

let todoList = new ToDoList("#todo-list")