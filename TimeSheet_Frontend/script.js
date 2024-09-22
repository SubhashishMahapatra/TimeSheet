const form = document.getElementById("form");
const dateInput = document.getElementById("date");
const activityContainer = document.getElementById("activity-container");
const addActivityButton = document.getElementById("add-activity");

let ActivityIndex = 0; // Keeps track of the activity forms


const SubmitReq = () => {
    const newActivityForm = document.createElement("div");
    newActivityForm.classList.add("activity-form", "row");
    newActivityForm.innerHTML = `
        <div class="col-md-12">
            <h3>Activity ${ActivityIndex + 1}</h3>
        </div>
        <div class="col-md-4">
            <label for="project-name-${ActivityIndex}">Project</label>
            <select id="project-name-${ActivityIndex}" class="form-select">
                <option value="">Select Project</option>
                <option value="Lending">Lending</option>
                <option value="Banking">Banking</option>
            </select>
        </div>
        <div class="col-md-4">
            <label for="sub-project-${ActivityIndex}">Sub-Project</label>
            <select id="sub-project-${ActivityIndex}" class="form-select">
                <option value="">Select SubProject</option>
                <option value="lending-sub">Lending Sub</option>
                <option value="banking-sub">Banking Sub</option>
            </select>
        </div>
        <div class="col-md-4">
            <label for="batch-${ActivityIndex}">Batch</label>
            <select id="batch-${ActivityIndex}" class="form-select">
                <option value="">Select Batch</option>
                <option value="Apro Captive">Apro Captive</option>
                <option value="Apro Payments">Apro Payments</option>
            </select>
        </div>
        <div class="col-md-4 mt-3">
            <label for="hours-needed-${ActivityIndex}">Hours Needed</label>
            <input type="number" id="hours-needed-${ActivityIndex}" class="form-control" placeholder="00"/>
        </div>
        <div class="col-md-8 mt-3">
            <label for="activity-${ActivityIndex}">Activity</label>
            <textarea id="activity-${ActivityIndex}" class="form-control"></textarea>
        </div>
    `;
    activityContainer.appendChild(newActivityForm);
    ActivityIndex++; // Increment the index for the next activity
}

SubmitReq();

addActivityButton.addEventListener("click", () =>{
    SubmitReq();
});

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const date = dateInput.value;
    const onLeave = document.getElementById("on-leave").value === "true";
    
    const activityForms = document.querySelectorAll(".activity-form");
    const activities = Array.from(activityForms).map((form, index) => ({
        ActivityId: 0, 
        Project: form.querySelector(`#project-name-${index}`).value,
        SubProject: form.querySelector(`#sub-project-${index}`).value,
        Batch: form.querySelector(`#batch-${index}`).value,
        HoursRequired: parseInt(form.querySelector(`#hours-needed-${index}`).value, 10),
        ActivityData: form.querySelector(`#activity-${index}`).value
        
    })
);




console.log(activities);

    const data = {
        DateId: 0,
        TodaysDate: date,
        OnLeave: onLeave,
        ActivityList: activities
    };

    try {
        const response = await fetch("http://localhost:5133/api/TimeSheet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData.message || "Something went wrong");
        }

        const result = await response.json();
        console.log("Successfully posted:", result);

    } catch (error) {
        console.log("Error:", error);
    }
});

const getData = async () => {
    try {
        const response = await fetch("http://localhost:5133/api/Timesheet");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Timesheet Data:", data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

getData();
