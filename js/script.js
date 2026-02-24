
// JOB DATA

var jobsData = [
  {
    id: 1,
    company: "Mobile First Corp",
    position: "React Native Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
    status: "not-applied"
  },
  {
    id: 2,
    company: "WebFlow Agency",
    position: "Web Designer & Developer",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$80,000 - $120,000",
    description: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.",
    status: "not-applied"
  },
  {
    id: 3,
    company: "DataViz Solutions",
    position: "Data Visualization Specialist",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125,000 - $165,000",
    description: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.",
    status: "not-applied"
  },
  {
    id: 4,
    company: "CloudFirst Inc",
    position: "Backend Developer",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140,000 - $190,000",
    description: "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.",
    status: "not-applied"
  },
  {
    id: 5,
    company: "TechStart Labs",
    position: "Full Stack Developer",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$150,000 - $200,000",
    description: "Join our fast-growing startup to build end-to-end web applications using React, Node.js, and PostgreSQL.",
    status: "not-applied"
  },
  {
    id: 6,
    company: "AI Innovations Co.",
    position: "Machine Learning Engineer",
    location: "New York, NY",
    type: "Full-time",
    salary: "$160,000 - $220,000",
    description: "Develop and deploy ML models at scale. Experience with TensorFlow, PyTorch, and distributed computing systems required.",
    status: "not-applied"
  },
  {
    id: 7,
    company: "DevOps Pro Inc.",
    position: "DevOps Engineer",
    location: "Austin, TX",
    type: "Remote",
    salary: "$135,000 - $175,000",
    description: "Manage CI/CD pipelines, container orchestration with Kubernetes, and cloud infrastructure on AWS and GCP.",
    status: "not-applied"
  },
  {
    id: 8,
    company: "CyberSafe Technologies",
    position: "Frontend Developer",
    location: "Chicago, IL",
    type: "Contract",
    salary: "$90,000 - $130,000",
    description: "Build responsive, accessible web interfaces using React and TypeScript. Strong CSS and Figma-to-code skills required.",
    status: "not-applied"
  }
];

// Active tab
var currentTab = "all";


function getFilteredJobs() {
  if (currentTab === "all") return jobsData;
  return jobsData.filter(function (job) {
    return job.status === currentTab;
  });
}


function getCardClasses(status) {
  var base = "bg-white border border-gray-200 rounded-xl p-5 mb-3 transition-all duration-200 hover:shadow-md";
  if (status === "interview") return base + " border-l-4 border-l-green-500 shadow-sm";
  if (status === "rejected")  return base + " border-l-4 border-l-red-500 shadow-sm";
  return base;
}


function renderEmptyState() {
  var wrap = document.createElement("div");
  wrap.className = "flex flex-col items-center justify-center py-16 text-center";

  wrap.innerHTML =
    '<img src="./assets/jobs.png" alt="No jobs" width="100" height="100" class="opacity-90" />' +
    '<h3 class="text-xl font-bold text-gray-800 mt-5">No jobs available</h3>' +
    '<p class="text-sm text-gray-400 mt-2">Check back soon for new job opportunities</p>';

  return wrap;
}

function createJobCard(job) {

  var card = document.createElement("div");
  card.className = getCardClasses(job.status);
  card.setAttribute("data-id", job.id);

  var header = document.createElement("div");
  header.className = "flex justify-between items-start mb-1";

  var info = document.createElement("div");
  info.className = "flex-1 pr-3";
  info.innerHTML =
    '<p class="text-[17px] font-bold text-[#1e3a5f] leading-snug">' + job.company + '</p>' +
    '<p class="text-sm text-gray-500 mt-0.5">' + job.position + '</p>';


  var deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-ghost btn-xs btn-square text-gray-400 hover:text-red-500 shrink-0";
  deleteBtn.setAttribute("data-action", "delete");
  deleteBtn.title = "Delete this job";
  deleteBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events:none">' +
      '<polyline points="3 6 5 6 21 6"></polyline>' +
      '<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>' +
    '</svg>';

  header.appendChild(info);
  header.appendChild(deleteBtn);

  var meta = document.createElement("p");
  meta.className = "text-sm text-gray-400 mt-1 mb-3";
  meta.textContent = job.location + " \u2022 " + job.type + " \u2022 " + job.salary;


  var badge = null;
  if (job.status === "interview") {
    badge = document.createElement("span");

    badge.className = "badge badge-success gap-1 uppercase tracking-wider font-semibold text-xs";
    badge.textContent = "INTERVIEW";
  } else if (job.status === "rejected") {
    badge = document.createElement("span");
    badge.className = "badge badge-error gap-1 uppercase tracking-wider font-semibold text-xs";
    badge.textContent = "REJECTED";
  }

  var desc = document.createElement("p");
  desc.className = "text-sm text-gray-600 my-3 leading-relaxed";
  desc.textContent = job.description;

  var actions = document.createElement("div");
  actions.className = "flex gap-3 mt-1";

  var interviewBtn = document.createElement("button");
  interviewBtn.setAttribute("data-action", "interview");
  interviewBtn.className = job.status === "interview"
    ? "btn btn-success btn-sm uppercase tracking-widest text-[11px]"
    : "btn btn-outline btn-success btn-sm uppercase tracking-widest text-[11px]";
  interviewBtn.textContent = "INTERVIEW";

  var rejectedBtn = document.createElement("button");
  rejectedBtn.setAttribute("data-action", "rejected");
  rejectedBtn.className = job.status === "rejected"
    ? "btn btn-error btn-sm uppercase tracking-widest text-[11px]"
    : "btn btn-outline btn-error btn-sm uppercase tracking-widest text-[11px]";
  rejectedBtn.textContent = "REJECTED";

  actions.appendChild(interviewBtn);
  actions.appendChild(rejectedBtn);

  card.appendChild(header);
  card.appendChild(meta);
  if (badge) card.appendChild(badge);
  card.appendChild(desc);
  card.appendChild(actions);

  return card;
}


function renderJobs() {
  var container = document.getElementById("jobs-container"); // getElementById
  container.innerHTML = "";

  var filtered = getFilteredJobs();

  if (filtered.length === 0) {
    container.appendChild(renderEmptyState());
    return;
  }

  filtered.forEach(function (job) {
    container.appendChild(createJobCard(job));
  });
}


function updateDashboard() {
  var total          = jobsData.length;
  var interviewCount = jobsData.filter(function (j) { return j.status === "interview"; }).length;
  var rejectedCount  = jobsData.filter(function (j) { return j.status === "rejected"; }).length;

  document.getElementById("total-count").textContent     = total;
  document.getElementById("interview-count").textContent = interviewCount;
  document.getElementById("rejected-count").textContent  = rejectedCount;

  var filtered = getFilteredJobs();
  document.getElementById("jobs-count-label").textContent =
    filtered.length + " of " + total + (total === 1 ? " job" : " jobs");
}

function setJobStatus(id, newStatus) {
  var job = null;
  for (var i = 0; i < jobsData.length; i++) {
    if (jobsData[i].id === id) { job = jobsData[i]; break; }
  }
  if (!job) return;

  job.status = (job.status === newStatus) ? "not-applied" : newStatus;

  renderJobs();
  updateDashboard();
}


function deleteJob(id) {
  for (var i = 0; i < jobsData.length; i++) {
    if (jobsData[i].id === id) {
      jobsData.splice(i, 1);
      break;
    }
  }
  renderJobs();
  updateDashboard();
}


function setActiveTab(tab) {
  currentTab = tab;

  document.querySelectorAll("[data-tab]").forEach(function (btn) {
    if (btn.getAttribute("data-tab") === tab) {
      btn.className = "px-4 py-1.5 rounded-md text-sm font-medium bg-blue-600 text-white border-0 cursor-pointer transition-colors duration-150";
    } else {
      btn.className = "px-4 py-1.5 rounded-md text-sm font-medium text-gray-600 bg-transparent border-0 cursor-pointer hover:bg-gray-100 transition-colors duration-150";
    }
  });

  renderJobs();
  updateDashboard();
}


document.addEventListener("DOMContentLoaded", function () {


  document.getElementById("tab-all").addEventListener("click", function () { setActiveTab("all"); });
  document.getElementById("tab-interview").addEventListener("click", function () { setActiveTab("interview"); });
  document.getElementById("tab-rejected").addEventListener("click", function () { setActiveTab("rejected"); });

  document.getElementById("jobs-container").addEventListener("click", function (e) {
    var card = e.target.closest("[data-id]");
    if (!card) return;

    var id     = parseInt(card.getAttribute("data-id"), 10);
    var action = e.target.closest("[data-action]");
    if (!action) return;

    var type = action.getAttribute("data-action");

    if (type === "delete")    deleteJob(id);
    if (type === "interview") setJobStatus(id, "interview");
    if (type === "rejected")  setJobStatus(id, "rejected");
  });

  renderJobs();
  updateDashboard();
});
