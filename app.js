function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function register(name, email, password) {
  const users = getUsers();

  if (users.find(u => u.email === email)) {
    alert('User already exists');
    return false;
  }

  users.push({
    name,
    email,
    password,
    purchasedCourses: []
  });

  saveUsers(users);
  localStorage.setItem('currentUser', email);
  return true;
}

function login(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert('Invalid login');
    return false;
  }

  localStorage.setItem('currentUser', email);
  return true;
}

function getCurrentUser() {
  const email = localStorage.getItem('currentUser');
  if (!email) return null;
  return getUsers().find(u => u.email === email) || null;
}

function logout() {
  localStorage.removeItem('currentUser');
  location.href = 'index.html';
}

function purchaseCourse(courseId) {
  const email = localStorage.getItem('currentUser');
  if (!email) {
    location.href = 'auth.html';
    return;
  }

  const users = getUsers();
  const user = users.find(u => u.email === email);

  if (!user.purchasedCourses.includes(courseId)) {
    user.purchasedCourses.push(courseId);
  }

  saveUsers(users);
  location.href = 'success.html';
}

function requireLogin() {
  if (!getCurrentUser()) {
    location.href = 'auth.html';
  }
}

function requirePurchase(courseId) {
  const user = getCurrentUser();

  if (!user) {
    location.href = 'auth.html';
    return;
  }

  if (!user.purchasedCourses.includes(courseId)) {
    alert('Please purchase this course first.');
    location.href = 'course.html';
  }
}