// DOM Elements
const sidebar = document.getElementById('sidebar');
const toggleSidebarBtn = document.getElementById('toggle-sidebar');
const mobileMenuBtn = document.getElementById('mobile-menu');
const userAvatar = document.getElementById('user-avatar');
const coursesContainer = document.getElementById('courses-container');
const attendanceLog = document.getElementById('attendance-log');
const gradesTable = document.getElementById('grades-table');

// Sample data
const coursesData = [
  {
    id: 1,
    title: 'Introduction to Web Development',
    code: 'CS-301',
    instructor: 'Dr. Jane Smith',
    schedule: 'Mon, Wed',
    time: '10:00 - 11:30 AM',
    progress: 65,
    status: 'active',
    students: 42
  },
  {
    id: 2,
    title: 'Database Management Systems',
    code: 'CS-405',
    instructor: 'Prof. Robert Johnson',
    schedule: 'Tue, Thu',
    time: '1:00 - 2:30 PM',
    progress: 48,
    status: 'active',
    students: 38
  },
  {
    id: 3,
    title: 'Data Structures & Algorithms',
    code: 'CS-201',
    instructor: 'Dr. Michael Chen',
    schedule: 'Mon, Fri',
    time: '3:00 - 4:30 PM',
    progress: 72,
    status: 'active',
    students: 45
  },
  {
    id: 4,
    title: 'Ethics in Computer Science',
    code: 'CS-310',
    instructor: 'Dr. Sarah Williams',
    schedule: 'Wed',
    time: '2:00 - 4:00 PM',
    progress: 55,
    status: 'active',
    students: 30
  }
];

const attendanceData = {
  present: 85,
  absent: 5,
  excused: 10,
  totalClasses: 100,
  recentDates: [
    { date: '2025-04-10', status: 'present' },
    { date: '2025-04-09', status: 'present' },
    { date: '2025-04-08', status: 'absent' },
    { date: '2025-04-07', status: 'present' },
    { date: '2025-04-06', status: 'present' }
  ]
};

const gradesData = {
  currentGPA: '3.75',
  termGrades: [
    { course: 'Web Development', grade: 'A', credits: 3 },
    { course: 'Data Structures', grade: 'A-', credits: 4 },
    { course: 'Database Systems', grade: 'B+', credits: 3 },
    { course: 'Ethics in IT', grade: 'A', credits: 2 }
  ]
};

// Sidebar toggle
toggleSidebarBtn.addEventListener('click', function() {
  sidebar.classList.toggle('collapsed');
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', function() {
  sidebar.classList.toggle('show');
});

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Get status icon
function getStatusIcon(status) {
  switch(status) {
    case 'present':
      return '<i class="fas fa-check-circle"></i>';
    case 'absent':
      return '<i class="fas fa-times-circle"></i>';
    case 'excused':
      return '<i class="fas fa-exclamation-circle"></i>';
    default:
      return '';
  }
}

// Get grade color class
function getGradeClass(grade) {
  if (grade.startsWith('A')) return 'a';
  if (grade.startsWith('B')) return 'b';
  if (grade.startsWith('C')) return 'c';
  if (grade.startsWith('D')) return 'd';
  return 'f';
}

// Render courses
function renderCourses() {
  coursesContainer.innerHTML = coursesData.map(course => `
    <div class="course-card">
      <span class="course-badge">${course.status}</span>
      <h3 class="course-title">${course.title}</h3>
      <p class="course-code">${course.code}</p>
      <div class="course-info">
        <i class="fas fa-user"></i>
        <span>${course.instructor}</span>
      </div>
      <div class="course-info">
        <i class="fas fa-calendar"></i>
        <span>${course.schedule}</span>
      </div>
      <div class="course-info">
        <i class="fas fa-clock"></i>
        <span>${course.time}</span>
      </div>
      <div class="course-progress">
        <div class="progress-label">
          <span>Progress</span>
          <span>${course.progress}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress" style="width: ${course.progress}%"></div>
        </div>
      </div>
      <div class="course-footer">
        <i class="fas fa-users"></i>
        <span>${course.students} students enrolled</span>
      </div>
    </div>
  `).join('');
}

// Render attendance log
function renderAttendanceLog() {
  attendanceLog.innerHTML = attendanceData.recentDates.map(item => `
    <div class="attendance-item">
      <div class="attendance-date">
        <div class="status-icon ${item.status}">
          ${getStatusIcon(item.status)}
        </div>
        <span>${formatDate(item.date)}</span>
      </div>
      <div class="attendance-status">${item.status}</div>
    </div>
  `).join('');
}

// Render grades table
function renderGradesTable() {
  gradesTable.innerHTML = gradesData.termGrades.map(item => `
    <div class="grade-item">
      <div>
        <div class="course-name">${item.course}</div>
        <div class="course-credits">${item.credits} credits</div>
      </div>
      <div class="grade ${getGradeClass(item.grade)}">${item.grade}</div>
    </div>
  `).join('');
}

// Initialize the dashboard
function initializeDashboard() {
  renderCourses();
  renderAttendanceLog();
  renderGradesTable();

  // Handle navigation
  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelectorAll('.sidebar-nav li').forEach(item => {
        item.classList.remove('active');
      });
      this.parentElement.classList.add('active');
      
      // In a real application, you would change the content based on the selected menu item
      // For now, we'll just log the selected item
      console.log('Selected menu: ' + this.getAttribute('href').substring(1));
    });
  });
}

// When DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeDashboard);
