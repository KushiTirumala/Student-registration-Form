const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const searchInput = document.getElementById("search");

let students = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const course = document.getElementById("course");

  if (!validate(name, email, phone, course)) return;

  students.push({
    name: name.value,
    email: email.value,
    phone: phone.value,
    course: course.value
  });

  form.reset();
  renderStudents();
});

function validate(name, email, phone, course) {
  let valid = true;
  document.querySelectorAll(".error").forEach(e => e.textContent = "");

  if (name.value.trim() === "") {
    name.nextElementSibling.textContent = "Name required";
    valid = false;
  }

  if (!email.value.includes("@")) {
    email.nextElementSibling.textContent = "Invalid email";
    valid = false;
  }

  if (phone.value.length < 10) {
    phone.nextElementSibling.textContent = "Invalid phone number";
    valid = false;
  }

  if (course.value === "") {
    course.nextElementSibling.textContent = "Select a course";
    valid = false;
  }

  return valid;
}

function renderStudents(filter = "") {
  studentList.innerHTML = "";

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(filter) ||
    s.email.toLowerCase().includes(filter)
  );

  if (filtered.length === 0) {
    studentList.innerHTML = '<p class="empty">No students found</p>';
    return;
  }

  filtered.forEach(s => {
    const div = document.createElement("div");
    div.className = "student";
    div.innerHTML = `
      <strong>${s.name}</strong>
      <div>${s.email}</div>
      <div>${s.phone} | ${s.course}</div>
    `;
    studentList.appendChild(div);
  });
}

searchInput.addEventListener("input", (e) => {
  renderStudents(e.target.value.toLowerCase());
});
