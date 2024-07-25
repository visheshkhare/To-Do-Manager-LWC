import { LightningElement } from 'lwc';

export default class tODOMAN extends LightningElement {
    today;
    incompletetask = [];
    completetask = [];
    taskname = "";
    taskdate = null;

    connectedCallback() {
        this.setTodayDate();
    }

    setTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        this.today = `${year}-${month}-${day}`;
    }

    changeHandler(event) {
        const { name, value } = event.target;
        if (name === "taskname") {
            this.taskname = value;
        } else if (name === "taskdate") {
            this.taskdate = value;
        }
        
    }

    resetHandler() {
        this.taskname = "";
        this.taskdate = null;
    }

    addTaskHandler() {
        if (!this.taskdate) {
            this.taskdate = this.today;
        }
        if (this.validation()) {
            this.incompletetask = [
                ...this.incompletetask,
                { taskname: this.taskname, taskdate: this.taskdate }
            ];
            this.resetHandler();
            this.incompletetask = this.sortTasks(this.incompletetask);
        }
    }
    
        validation() {
            let isValid = true;
            const element = this.template.querySelector("lightning-input[data-id='xyz']");
        
            if (!element) {
                console.error("Task name input element not found");
                return false;
            }
        
            const taskName = this.taskname;
            const incompleteTasks = this.incompletetask;
            const completeTasks = this.completetask;

            if (!taskName) {
                isValid = false;
                element.setCustomValidity("Task name is required.");
            } else {
                const duplicateTaskincomplete = incompleteTasks.find(
                    (task) => task.taskname == taskName
                );
                const duplicateTaskComplete = completeTasks.find(
                (task) => task.taskname === taskName
            );
        
                if (duplicateTaskincomplete || duplicateTaskComplete) {
                    isValid = false;
                    element.setCustomValidity("Task is already available.");
                } else {
                    element.setCustomValidity(""); // Clear any previous error messages
                }
            }
            element.reportValidity();
            return isValid;
        }
        
        

    sortTasks(inputArr) {
        return inputArr.sort((a, b) => {
            const dateA = new Date(a.taskdate);
            const dateB = new Date(b.taskdate);
            return dateA - dateB;
        });
    }



    removalhandler(event){
        let index = event.target.name;
        this.incompletetask.splice(index,1);
        let sortedarr = this.sortTasks(this.incompletetask);
        this.incompletetask = [...sortedarr];
        console.log('OUTPUT : ', incompletetask);
    }



    completehandler(event){
        let index = event.target.name;
        let removeditem = this.incompletetask.splice(index,1);
        let sortedarr = this.sortTasks(this.incompletetask);
        this.incompletetask  = [...sortedarr];
        this.completetask = [...this.completetask, removeditem[0]];
    }

}