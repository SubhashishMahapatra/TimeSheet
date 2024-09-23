// Get References to DOM Elements
const form = document.getElementById("form");
const dateInput = document.getElementById("date");
const onLeaveSelect = document.getElementById("on-leave");
const activityContainer = document.getElementById("activity-container");
const addActivityButton = document.getElementById("add-activity");
const previewButton = document.getElementById("preview-btn");
const cancelButton = document.getElementById("cancel-btn");
const previewModalElement = document.getElementById('previewModal');
const previewModal = new bootstrap.Modal(previewModalElement);

// Initialize Activity Index
let ActivityIndex = 0;

// Function to Add a New Activity Form
const addActivityForm = () => {
  const newActivityForm = document.createElement("div");
  newActivityForm.classList.add("activity-form", "row");
  newActivityForm.innerHTML = `
    <div class="col-md-12">
      <h3>Activity ${ActivityIndex + 1}</h3>
    </div>
    <div class="col-md-4">
      <label for="project-name-${ActivityIndex}" class="form-label">Project</label>
      <select id="project-name-${ActivityIndex}" class="form-select" required>
        <option value="">Select Project</option>
        <option value="Lending">Lending</option>
        <option value="Banking">Banking</option>
      </select>
    </div>
    <div class="col-md-4">
      <label for="sub-project-${ActivityIndex}" class="form-label">Sub-Project</label>
      <select id="sub-project-${ActivityIndex}" class="form-select" required>
        <option value="">Select Sub-Project</option>
        <option value="lending-sub">Lending Sub</option>
        <option value="banking-sub">Banking Sub</option>
      </select>
    </div>
    <div class="col-md-4">
      <label for="batch-${ActivityIndex}" class="form-label">Batch</label>
      <select id="batch-${ActivityIndex}" class="form-select" required>
        <option value="">Select Batch</option>
        <option value="Apro Captive">Apro Captive</option>
        <option value="Apro Payments">Apro Payments</option>
      </select>
    </div>
    <div class="col-md-4 mt-3">
      <label for="hours-needed-${ActivityIndex}" class="form-label">Hours Needed</label>
      <input type="number" id="hours-needed-${ActivityIndex}" class="form-control" placeholder="00" min="0" required />
    </div>
    <div class="col-md-8 mt-3">
      <label for="activity-${ActivityIndex}" class="form-label">Activity</label>
      <textarea id="activity-${ActivityIndex}" class="form-control" rows="3" required></textarea>
    </div>
    <div class="col-md-12 mt-3 text-end">
      <button type="button" class="btn btn-danger remove-activity">Remove Activity</button>
    </div>
  `;
  activityContainer.appendChild(newActivityForm);
  ActivityIndex++;

  // Add Event Listener for Remove Activity Button
  newActivityForm.querySelector('.remove-activity').addEventListener('click', () => {
    newActivityForm.remove();
    updateActivityHeaders();
  });
};

// Function to Update Activity Headers After Removal
const updateActivityHeaders = () => {
  const activityForms = document.querySelectorAll(".activity-form");
  ActivityIndex = 0;
  activityForms.forEach((form) => {
    form.querySelector('h3').innerText = `Activity ${ActivityIndex + 1}`;
    // Update IDs to maintain consistency
    form.querySelectorAll('select, input, textarea').forEach((input) => {
      const parts = input.id.split('-');
      parts[parts.length - 1] = ActivityIndex;
      input.id = parts.join('-');
      // Update labels' 'for' attribute
      const label = form.querySelector(`label[for="${input.id}"]`);
      if (label) {
        label.setAttribute('for', input.id);
      }
    });
    ActivityIndex++;
  });
};

// Initial Activity Form
addActivityForm();

// Event Listener to Add New Activity Form
addActivityButton.addEventListener("click", addActivityForm);

// Function to Collect Form Data for Submission or Preview
const collectFormData = () => {
  const date = dateInput.value;
  const onLeave = onLeaveSelect.value === "true";

  const activityForms = document.querySelectorAll(".activity-form");
  const activities = Array.from(activityForms).map((form, index) => ({
    ActivityId: 0,
    Project: form.querySelector(`#project-name-${index}`).value,
    SubProject: form.querySelector(`#sub-project-${index}`).value,
    Batch: form.querySelector(`#batch-${index}`).value,
    HoursRequired: parseInt(form.querySelector(`#hours-needed-${index}`).value, 10),
    ActivityData: form.querySelector(`#activity-${index}`).value
  }));

  return { date, onLeave, activities };
};

// Event Listener for Form Submission
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const { date, onLeave, activities } = collectFormData();

  // Basic Validation
  if (!date) {
    alert("Please select a date.");
    return;
  }

  if (activities.length === 0) {
    alert("Please add at least one activity.");
    return;
  }

  // Additional Validation for Activities
  for (let i = 0; i < activities.length; i++) {
    const activity = activities[i];
    if (
      !activity.Project ||
      !activity.SubProject ||
      !activity.Batch ||
      isNaN(activity.HoursRequired) ||
      !activity.ActivityData
    ) {
      alert(`Please complete all fields for Activity ${i + 1}.`);
      return;
    }
  }

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
    alert("Timesheet submitted successfully!");

    // Reset Form
    form.reset();
    activityContainer.innerHTML = "";
    ActivityIndex = 0;
    addActivityForm();
  } catch (error) {
    console.log("Error:", error);
    alert(`Error: ${error.message}`);
  }
});

// Function to Collect Form Data for Preview
const collectFormDataForPreview = () => {
  const date = dateInput.value;
  const onLeave = onLeaveSelect.value === "true";

  const activityForms = document.querySelectorAll(".activity-form");
  const activities = Array.from(activityForms).map((form, index) => ({
    ActivityNumber: index + 1,
    Project: form.querySelector(`#project-name-${index}`).value,
    SubProject: form.querySelector(`#sub-project-${index}`).value,
    Batch: form.querySelector(`#batch-${index}`).value,
    HoursRequired: form.querySelector(`#hours-needed-${index}`).value,
    ActivityData: form.querySelector(`#activity-${index}`).value
  }));

  return { date, onLeave, activities };
};

// Event Listener for Preview Button
previewButton.addEventListener("click", () => {
  const { date, onLeave, activities } = collectFormDataForPreview();

  // Validate Form Before Preview
  if (!date) {
    alert("Please select a date before previewing.");
    return;
  }

  if (activities.length === 0) {
    alert("Please add at least one activity before previewing.");
    return;
  }

  // Additional Validation for Activities
  for (let i = 0; i < activities.length; i++) {
    const activity = activities[i];
    if (
      !activity.Project ||
      !activity.SubProject ||
      !activity.Batch ||
      !activity.HoursRequired ||
      !activity.ActivityData
    ) {
      alert(`Please complete all fields for Activity ${i + 1} before previewing.`);
      return;
    }
  }

  // Create Preview HTML
  let previewHTML = `
    <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
    <p><strong>On Leave:</strong> ${onLeave ? "Yes" : "No"}</p>
    <hr/>
    <h5>Activities:</h5>
    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Project</th>
            <th>Sub-Project</th>
            <th>Batch</th>
            <th>Hours Needed</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
  `;

  activities.forEach((activity) => {
    previewHTML += `
      <tr>
        <td>${activity.ActivityNumber}</td>
        <td>${activity.Project}</td>
        <td>${activity.SubProject}</td>
        <td>${activity.Batch}</td>
        <td>${activity.HoursRequired}</td>
        <td>${activity.ActivityData}</td>
      </tr>
    `;
  });

  previewHTML += `
        </tbody>
      </table>
    </div>
  `;

  // Inject Preview HTML into Modal
  document.getElementById("preview-content").innerHTML = previewHTML;

  // Show the Modal
  previewModal.show();
});

// Event Listener for Cancel Button
cancelButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to cancel and reset the form?")) {
    form.reset();
    activityContainer.innerHTML = "";
    ActivityIndex = 0;
    addActivityForm();
  }
});

// Optional: Fetch Existing Timesheet Data (if needed)
const getData = async () => {
  try {
    const response = await fetch("http://localhost:5133/api/Timesheet");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Timesheet Data:", data);
    // Optionally, you can display this data on the page
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Uncomment the line below if you want to fetch existing data on page load
// getData();
