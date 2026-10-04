// QUẢN LÝ TRẠNG THÁI ỨNG DỤNG
let currentRole = 'HS'; // 'HS' hoặc 'GV'
let currentAuthTab = 'login'; // 'login' hoặc 'register'
let currentUser = null;
let currentTab = 'home';
let currentLetter = 'a';
let userStars = 3; // Sao thưởng của học sinh

document.addEventListener('DOMContentLoaded', () => {
    // Tải dữ liệu người dùng từ LocalStorage nếu có
    const savedUser = localStorage.getItem('app_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showApp();
    }
});

// XỬ LÝ ĐĂNG NHẬP / ĐĂNG KÝ
function setRole(role) {
    currentRole = role;
    document.getElementById('role-hs').classList.toggle('active', role === 'HS');
    document.getElementById('role-gv').classList.toggle('active', role === 'GV');
}

function switchAuthTab(tab) {
    currentAuthTab = tab;
    document.getElementById('tab-login').classList.toggle('active', tab === 'login');
    document.getElementById('tab-register').classList.toggle('active', tab === 'register');
    document.getElementById('register-fullname-group').classList.toggle('hidden', tab === 'login');
    document.getElementById('btn-auth-submit').innerText = tab === 'login' ? '🚀 Vào Học Ngay' : '📝 Đăng Ký Tài Khoản';
}

function handleAuth(e) {
    e.preventDefault();
    const username = document.getElementById('auth-username').value.trim();
    const fullname = document.getElementById('auth-fullname').value.trim();

    if (!username) return;

    currentUser = {
        username: username,
        name: currentAuthTab === 'register' && fullname ? fullname : (currentRole === 'HS' ? "Bé " + username : "Giáo viên " + username),
        role: currentRole,
        avatar: currentRole === 'HS' ? "✏️" : "👩‍‍🏫"
    };

    localStorage.setItem('app_user', JSON.stringify(currentUser));
    showApp();
}

function logout() {
    localStorage.removeItem('app_user');
    currentUser = null;
    document.getElementById('app-screen').classList.add('hidden');
    document.getElementById('auth-screen').classList.remove('hidden');
}

// HIỂN THỊ MÀN HÌNH CHÍNH
function showApp() {
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('app-screen').classList.remove('hidden');

    document.getElementById('user-name-display').innerText = currentUser.name;
    document.getElementById('user-avatar-display').innerText = currentUser.avatar;
    document.getElementById('user-role-tag').innerText = currentUser.role === 'HS' ? 'Học sinh' : 'Giáo viên';

    renderNavigation();
    switchTab(currentUser.role === 'HS' ? 'home' : 'gv-lessons');
}

// ĐIỀU HƯỚNG MENU TỰ ĐỘNG THEO VAI TRÒ
function renderNavigation() {
    const navContainer = document.getElementById('main-nav-container');
    if (currentUser.role === 'HS') {
        navContainer.innerHTML = `
            <button class="nav-btn" id="nav-home" onclick="switchTab('home')">🏠 Trang Chủ</button>
            <button class="nav-btn" id="nav-lesson" onclick="switchTab('lesson')">📖 Bài Học</button>
            <button class="nav-btn" id="nav-exercise" onclick="switchTab('exercise')">🎮 Trò Chơi & Bài Tập</button>
            <button class="nav-btn" id="nav-profile" onclick="switchTab('profile')">👤 Tôi</button>
        `;
    } else {
        navContainer.innerHTML = `
            <button class="nav-btn" id="nav-gv-lessons" onclick="switchTab('gv-lessons')">🎬 Bài Giảng Youtube</button>
            <button class="nav-btn" id="nav-gv-ai" onclick="switchTab('gv-ai')">🤖 AI Tạo Phiếu Tập</button>
            <button class="nav-btn" id="nav-gv-games" onclick="switchTab('gv-games')">🎲 Kho Trò Chơi</button>
        `;
    }
}

// CHUYỂN ĐỔI TAB NỘI DUNG
function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const activeNav = document.getElementById(`nav-${tab}`);
    if (activeNav) activeNav.classList.add('active');

    const content = document.getElementById('content-area');

    // HỌC SINH TABS
    if (tab === 'home') renderHomeTab(content);
    else if (tab === 'lesson') renderLessonTab(content);
    else if (tab === 'exercise') renderExerciseTab(content);
    else if (tab === 'profile') renderProfileTab(content);

    // GIÁO VIÊN TABS
    else if (tab === 'gv-lessons') renderGvLessonsTab(content);
    else if (tab === 'gv-ai') renderGvAiTab(content);
    else if (tab === 'gv-games') renderGvGamesTab(content);
}

/* ===================================================
   GIAO DIỆN HỌC SINH
   =================================================== */

function renderHomeTab(container) {
    container.innerHTML = `
        <div class="welcome-banner">
            <div class="banner-text">
                <h2>Chào mừng ${currentUser.name} đến với lớp học! 🎉</h2>
                <p>Hôm nay bé muốn luyện tập nét viết chữ cái nào?</p>
            </div>
        </div>
        <div class="quick-menu-grid">
            <div class="menu-card card-blue" onclick="switchTab('lesson')">
                <div class="card-icon">📖</div>
                <h3>Bài Học Chữ Cái</h3>
                <p>Xem video hướng dẫn 29 chữ cái Tiếng Việt</p>
                <button class="btn-card">Học Ngay</button>
            </div>
            <div class="menu-card card-orange" onclick="switchTab('exercise')">
                <div class="card-icon">🎮</div>
                <h3>Trò Chơi & Bài Tập</h3>
                <p>Ôn luyện chữ cái và nhận sao thưởng ⭐</p>
                <button class="btn-card">Chơi Ngay</button>
            </div>
        </div>
    `;
}

function renderLessonTab(container) {
    container.innerHTML = `
        <div class="workspace-grid">
            <aside class="alphabet-sidebar">
                <div class="sidebar-header">
                    <h3>Bảng 29 Chữ Cái</h3>
                </div>
                <div class="alphabet-grid" id="alphabet-grid"></div>
            </aside>

            <section class="lesson-card">
                <div class="lesson-header">
                    <div class="title-group">
                        <span class="badge-icon">🎬</span>
                        <h2 id="current-letter-title">Bài học chữ A</h2>
                    </div>
                </div>
                <div class="video-frame-container">
                    <iframe id="youtube-player" src="" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
                <div class="lesson-guide">
                    <div class="guide-title">💡 Hướng dẫn nét viết:</div>
                    <p id="letter-description">Đang tải hướng dẫn...</p>
                </div>
            </section>
        </div>
    `;

    // Render danh sách chữ cái
    const grid = document.getElementById('alphabet-grid');
    ALPHABET_DATA.forEach(item => {
        const btn = document.createElement('button');
        btn.className = `letter-btn ${item.letter === currentLetter ? 'active' : ''}`;
        btn.id = `btn-letter-${item.letter}`;
        btn.innerText = item.letter;
        btn.onclick = () => selectLetter(item.letter);
        grid.appendChild(btn);
    });

    selectLetter(currentLetter);
}

function selectLetter(letter) {
    currentLetter = letter;
    document.querySelectorAll('.letter-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById(`btn-letter-${letter}`);
    if (btn) btn.classList.add('active');

    const data = ALPHABET_DATA.find(i => i.letter === letter);
    if (!data) return;

    document.getElementById('current-letter-title').innerText = `Bài học chữ ${data.upper} (${data.lower})`;
    document.getElementById('letter-description').innerText = data.description;
    document.getElementById('youtube-player').src = `https://www.youtube.com/embed/${data.youtubeId}?autoplay=1&rel=0`;
}

function renderExerciseTab(container) {
    container.innerHTML = `
        <div class="exercise-container">
            <!-- BẢNG THÀNH TÍCH SAO -->
            <div style="background:#fff; padding:20px; border-radius:25px; border:4px solid #000; box-shadow:0 8px 0 #000; margin-bottom:20px; text-align:center;">
                <h3 style="margin:0 0 10px 0; font-size:22px; color:#ff3366;">⭐ Bảng Thành Tích Khuyến Khích</h3>
                <p style="font-weight:800; font-size:18px;">Bé đã tích lũy được: <span style="font-size:26px; color:#f1c40f;">${userStars} ⭐</span></p>
                <button class="btn-submit" style="width:auto; padding:8px 20px; font-size:16px;" onclick="addRewardStar()">Phụ Huynh Thưởng 1 ⭐</button>
            </div>

            <!-- TRÒ CHƠI ÔN LUYỆN -->
            <div class="exercise-card">
                <div class="quiz-header">
                    <h2>🎮 Trò Chơi: Chọn Nét Viết Đúng</h2>
                    <span class="quiz-badge">Chữ A</span>
                </div>
                <div class="question-title">Chữ "a" thường gồm những nét nào?</div>
                <div class="options-grid">
                    <button class="quiz-opt-btn" onclick="checkQuiz(true)">Nét cong khép kín & Nét móc ngược</button>
                    <button class="quiz-opt-btn" onclick="checkQuiz(false)">Nét khuyết trên & Nét móc dưới</button>
                </div>
                <div id="quiz-feedback" class="quiz-feedback hidden"></div>
            </div>

            <!-- BÀI TẬP VỀ NHÀ TỪ GIÁO VIÊN -->
            <div style="background:#fff; padding:25px; border-radius:25px; border:4px solid #000; box-shadow:0 8px 0 #000; margin-top:20px;">
                <h3 style="margin:0 0 15px 0; font-size:22px; color:#0984e3;">📚 Bài Tập Về Nhà Giáo Viên Giao</h3>
                <ul style="padding-left:20px; font-weight:800; font-size:16px; line-height:1.8;">
                    ${INITIAL_HOMEWORK.map(item => `<li><strong>${item.title}:</strong>${item.desc}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

function checkQuiz(isCorrect) {
    const feedback = document.getElementById('quiz-feedback');
    feedback.classList.remove('hidden', 'success', 'error');
    if (isCorrect) {
        feedback.classList.add('success');
        feedback.innerText = "🎉 Chính xác rồi! Bé giỏi quá! (+1 ⭐)";
        userStars++;
    } else {
        feedback.classList.add('error');
        feedback.innerText = "❌ Chưa đúng rồi, bé hãy xem lại video bài học nhé!";
    }
}

function addRewardStar() {
    userStars++;
    switchTab('exercise');
}

function renderProfileTab(container) {
    container.innerHTML = `
        <div style="max-width:500px; margin:0 auto; background:#fff; padding:30px; border-radius:30px; border:4px solid #000; box-shadow:0 10px 0 #000; text-align:center;">
            <div style="font-size:80px; background:#fffa65; width:120px; height:120px; line-height:120px; margin:0 auto 15px; border-radius:50%; border:4px solid #000;">${currentUser.avatar}</div>
            <h2 style="margin:0 0 10px 0; font-size:28px;">${currentUser.name}</h2>
            <p style="font-weight:800; color:#636e72;">Tài khoản: ${currentUser.username}</p>
            <button class="btn-submit" onclick="openEditProfileModal()">✏️ Đổi Tên & Biểu Tượng</button>
        </div>
    `;
}

/* ===================================================
   GIAO DIỆN GIÁO VIÊN
   =================================================== */

function renderGvLessonsTab(container) {
    container.innerHTML = `
        <div style="background:#fff; padding:25px; border-radius:30px; border:4px solid #000; box-shadow:0 10px 0 #000;">
            <h2 style="margin:0 0 20px 0; color:#ff3366;">🎬 Quản Lý Video Bài Giảng 29 Chữ Cái</h2>
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:15px;">
                ${ALPHABET_DATA.slice(0, 6).map(item => `
                    <div style="border:3px solid #000; padding:15px; border-radius:20px; background:#ffeaa7;">
                        <h3 style="margin:0 0 8px 0;">Chữ ${item.upper} (${item.lower})</h3>
                        <p style="margin:0 0 10px 0; font-size:14px; font-weight:800;">Link ID: ${item.youtubeId}</p>
                        <button class="btn-edit-inline" style="width:100%; padding:8px;" onclick="alert('Tính năng chỉnh sửa Link Youtube đang được cập nhật!')">✏️ Đổi Link Youtube</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderGvAiTab(container) {
    container.innerHTML = `
        <div style="background:#fff; padding:25px; border-radius:30px; border:4px solid #000; box-shadow:0 10px 0 #000;">
            <h2 style="margin:0 0 15px 0; color:#0984e3;">🤖 AI Trợ Lý Tạo Phiếu Bài Tập Viết</h2>
            <div class="input-group">
                <label>Nhập các chữ cái cần tạo phiếu (Ví dụ: a, ă, â, b, c):</label>
                <input type="text" id="ai-letters-input" value="a, b, c">
            </div>
            <button class="btn-submit" style="width:auto; padding:10px 25px; margin-bottom:20px;" onclick="generateWorksheet()">✨ AI Sinh Phiếu Bài Tập</button>

            <!-- KHU VỰC CHỈNH SỬA VÀ IN PHIẾU -->
            <div id="worksheet-preview" style="border:3px dashed #000; padding:20px; border-radius:20px; background:#fff9db;">
                <h3 contenteditable="true" style="text-align:center; margin-top:0;">PHIẾU BÀI TẬP TẬP VIẾT CHỮ CÁI</h3>
                <p contenteditable="true">Họ và tên học sinh: ..............................................................</p>
                <div id="worksheet-content" contenteditable="true" style="font-size:20px; font-weight:800; line-height:2;">
                    - Tập viết chữ a: a a a a a a a a a<br>
                    - Tập viết chữ b: b b b b b b b b b<br>
                    - Tập viết chữ c: c c c c c c c c c
                </div>
            </div>
            <button class="btn-submit" style="background:#00b894; margin-top:15px;" onclick="window.print()">🖨️ In Phiếu Bài Tập Tùy Chỉnh</button>
        </div>
    `;
}

function generateWorksheet() {
    const letters = document.getElementById('ai-letters-input').value.split(',').map(s => s.trim());
    const content = document.getElementById('worksheet-content');
    content.innerHTML = letters.map(l => `- Tập viết chữ ${l}: ${l} ${l} ${l} ${l} ${l} ${l} ${l} ${l}`).join('<br>');
}

function renderGvGamesTab(container) {
    container.innerHTML = `
        <div style="background:#fff; padding:25px; border-radius:30px; border:4px solid #000; box-shadow:0 10px 0 #000;">
            <h2 style="margin:0 0 15px 0; color:#e17055;">🎲 Kho Trò Chơi Sinh Động Nhớ Nét Chữ</h2>
            <p style="font-weight:800;">Hệ thống cung cấp sẵn các mẫu trò chơi học tập dành cho 29 chữ cái Tiếng Việt.</p>
            <ul>
                <li><strong>Trò chơi 1:</strong> Tìm nét chữ giấu mặt (Ghép nét tạo thành chữ).</li>
                <li><strong>Trò chơi 2:</strong> Vòng quay may mắn chọn chữ cái đọc âm.</li>
            </ul>
        </div>
    `;
}

// XỬ LÝ MODAL CẬP NHẬT TÀI KHOẢN
function openEditProfileModal() {
    document.getElementById('edit-name-input').value = currentUser.name;
    document.getElementById('profile-modal').classList.remove('hidden');
}

function closeEditProfileModal() {
    document.getElementById('profile-modal').classList.add('hidden');
}

function saveProfile() {
    const newName = document.getElementById('edit-name-input').value.trim();
    const newAvatar = document.getElementById('edit-avatar-select').value;

    if (newName) currentUser.name = newName;
    currentUser.avatar = newAvatar;

    localStorage.setItem('app_user', JSON.stringify(currentUser));
    closeEditProfileModal();
    showApp();
}
