import { LightningElement } from 'lwc';

export default class TODOMANAGER extends LightningElement {
    
    today;
    incompletetask = [];

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
        console.log('test');
        if (this.validation()) {
            this.incompletetask = [
                ...this.incompletetask,
                { taskname: this.taskname, taskdate: this.taskdate }
            ];
            this.resetHandler();
            this.incompletetask = this.sortTasks(this.incompletetask);
            console.log("this.incompletetask", this.incompletetask);
        }
    }

    /*validation() {
        let isValid = true;
        const element = this.template.querySelector("lightning-input[name='taskname']");

        if (!this.taskname) {
            isValid = false;
            element.setCustomValidity("Task name is required.");
        } else {
            const task = this.incompletetask.find(
                (currItem) => currItem.taskname === this.taskname && currItem.taskdate === this.taskdate
            );
            if (task) {
                isValid = false;
                element.setCustomValidity("Task is already available.");
            }
        }

        if (isValid) {
            element.setCustomValidity("");
        }
        element.reportValidity();
        return isValid;
    }*/
    
        validation() {
            let isValid = true;
            const element = this.template.querySelector("lightning-input[data-id='xyz']");
            console.log('element =>',element);
        
            if (!element) {
                console.error("Task name input element not found");
                return false;
            }
        
            const taskName = this.taskname;
            const taskDate = this.taskdate;
            const incompleteTasks = this.incompletetask;

            console.log('taskName =>',taskName);
            console.log('taskDate =>',taskDate);
            console.log('incompleteTasks =>',incompleteTasks);
        
            if (!taskName) {
                isValid = false;
                element.setCustomValidity("Task name is required.");
            } else {
                const duplicateTask = incompleteTasks.find(
                    (task) => task.taskname == taskName && task.taskdate == taskDate
                );
        
                if (duplicateTask) {
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
}