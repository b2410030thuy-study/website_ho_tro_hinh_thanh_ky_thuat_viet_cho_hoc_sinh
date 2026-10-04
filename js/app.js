let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let currentRole = "HS";
let authTab = "login";
let currentTabType = "alphabet"; // 'alphabet' hoặc 'strokes'
let selectedItemId = "a";

const LETTER_ICONS = {
    "a": "🍎", "aw": "🍇", "aa": "🍋", "b": "🐮", "c": "🐶", "d": "🐬", "dd": "🐥",
    "e": "🐘", "ee": "🐸", "g": "🐔", "h": "🐯", "i": "🍦", "k": "🍬", "l": "🍃",
    "m": "🐱", "n": "🐝", "o": "🎈", "oo": "☂️", "ow": "🍓", "p": "🐼", "q": "🎁",
    "r": "🤖", "s": "🦁", "t": "🚀", "u": "⛵", "uw": "🦒", "v": "🎻", "x": "🚗", "y": "🍭"
};

window.addEventListener("DOMContentLoaded", () => {
    checkAuthState();
});

function checkAuthState() {
    const authScreen = document.getElementById("auth-screen");
    const appScreen = document.getElementById("app-screen");

    if (currentUser) {
        authScreen.classList.add("hidden");
        appScreen.classList.remove("hidden");
        updateUserInfoUI();
        renderNav();
        renderContent("study");
    } else {
        authScreen.classList.remove("hidden");
        appScreen.classList.add("hidden");
    }
}

function setRole(role) {
    currentRole = role;
    document.getElementById("role-hs").classList.toggle("active", role === "HS");
    document.getElementById("role-gv").classList.toggle("active", role === "GV");
}

function switchAuthTab(tab) {
    authTab = tab;
    document.getElementById("tab-login").classList.toggle("active", tab === "login");
    document.getElementById("tab-register").classList.toggle("active", tab === "register");
    
    const regGroup = document.getElementById("register-fullname-group");
    const btnSubmit = document.getElementById("btn-auth-submit");

    if (tab === "register") {
        regGroup.classList.remove("hidden");
        btnSubmit.innerText = "✨ Đăng Ký Tài Khoản";
    } else {
        regGroup.classList.add("hidden");
        btnSubmit.innerText = "🚀 BẮT ĐẦU VUI HỌC";
    }
}

function handleAuth(event) {
    event.preventDefault();
    const username = document.getElementById("auth-username").value.trim();
    const password = document.getElementById("auth-password").value.trim();
    const fullname = document.getElementById("auth-fullname").value.trim();

    if (!username || !password) return alert("Vui lòng điền đầy đủ thông tin!");

    currentUser = {
        username: username,
        fullname: fullname || username,
        role: currentRole,
        avatar: currentRole === "GV" ? "👩‍🏫" : "🐱"
    };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    checkAuthState();
}

function logout() {
    localStorage.removeItem("currentUser");
    currentUser = null;
    checkAuthState();
}

function updateUserInfoUI() {
    if (!currentUser) return;
    document.getElementById("user-name-display").innerText = currentUser.fullname;
    document.getElementById("user-avatar-display").innerText = currentUser.avatar || "🐱";
    document.getElementById("user-role-tag").innerText = currentUser.role === "GV" ? "👩‍🏫 Giáo viên" : "👶 Học sinh";
}

function renderNav() {
    const navContainer = document.getElementById("main-nav-container");
    if (currentUser.role === "HS") {
        navContainer.innerHTML = `
            <button class="nav-btn active" onclick="switchTab(this, 'study')">📚 Bài Học</button>
            <button class="nav-btn" onclick="switchTab(this, 'homework')">📝 Bài Tập</button>
        `;
    } else {
        navContainer.innerHTML = `
            <button class="nav-btn active" onclick="switchTab(this, 'study')">📚 Bài Học</button>
            <button class="nav-btn" onclick="switchTab(this, 'manage')">👩‍🏫 Quản Lý Bài Tập</button>
        `;
    }
}

function switchTab(btn, tabName) {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderContent(tabName);
}

function renderContent(tabName) {
    const contentArea = document.getElementById("content-area");

    if (tabName === "study") {
        contentArea.innerHTML = `
            <div class="workspace-grid">
                <aside class="alphabet-sidebar">
                    <div style="display:flex; gap:8px; margin-bottom:15px;">
                        <button id="btn-type-alpha" class="role-btn active" style="font-size:14px; padding:8px;" onclick="switchStudyType('alphabet')">🔤 29 Chữ Cái</button>
                        <button id="btn-type-stroke" class="role-btn" style="font-size:14px; padding:8px;" onclick="switchStudyType('strokes')">✏️ 14 Nét Cơ Bản</button>
                    </div>
                    <div class="alphabet-grid" id="alphabet-grid"></div>
                </aside>
                <section class="lesson-card" id="lesson-detail-area"></section>
            </div>
        `;
        renderSidebarGrid();
        renderLessonDetail();
    } else if (tabName === "homework") {
        contentArea.innerHTML = `
            <div class="lesson-card">
                <h2>📝 Bài Tập Về Nhà Của Bé</h2>
                <p style="margin-top:10px; font-weight:700;">Hãy hoàn thành các bài tập dưới đây nhé!</p>
                <div style="margin-top:15px; background:#FEF3C7; padding:15px; border-radius:15px; border:2px dashed #F59E0B;">
                    📌 <strong>Bài 1:</strong> Xem video và luyện viết 14 nét cơ bản vào vở ô ly.
                </div>
            </div>
        `;
    } else if (tabName === "manage") {
        contentArea.innerHTML = `
            <div class="lesson-card">
                <h2>👩‍🏫 Bảng Quản Lý Dành Cho Giáo Viên</h2>
                <p style="margin-top:10px; font-weight:700;">Cô có thể giao thêm bài tập cho các bé tại đây.</p>
            </div>
        `;
    }
}

function switchStudyType(type) {
    currentTabType = type;
    document.getElementById("btn-type-alpha").classList.toggle("active", type === "alphabet");
    document.getElementById("btn-type-stroke").classList.toggle("active", type === "strokes");
    selectedItemId = type === "alphabet" ? "a" : "sothang";
    renderSidebarGrid();
    renderLessonDetail();
}

function renderSidebarGrid() {
    const grid = document.getElementById("alphabet-grid");
    if (!grid) return;

    const dataset = currentTabType === "alphabet" ? ALPHABET_DATA : BASIC_STROKES_DATA;

    grid.innerHTML = dataset.map(item => {
        const icon = currentTabType === "alphabet" ? (LETTER_ICONS[item.id] || "✏️") : "✍️";
        const displayText = currentTabType === "alphabet" ? `${item.upper} ${item.lower}` : item.char;
        const isActive = item.id === selectedItemId ? "active" : "";
        return `
            <button class="letter-btn ${isActive}" onclick="selectItem('${item.id}')">
                <span class="char">${displayText}</span>
                <span class="sub-icon">${icon}</span>
            </button>
        `;
    }).join("");
}

function selectItem(id) {
    selectedItemId = id;
    renderSidebarGrid();
    renderLessonDetail();
}

function renderLessonDetail() {
    const detailArea = document.getElementById("lesson-detail-area");
    if (!detailArea) return;

    const dataset = currentTabType === "alphabet" ? ALPHABET_DATA : BASIC_STROKES_DATA;
    const lesson = dataset.find(item => item.id === selectedItemId) || dataset[0];
    const icon = currentTabType === "alphabet" ? (LETTER_ICONS[lesson.id] || "✏️") : "✍️";

    detailArea.innerHTML = `
        <h2 style="font-size:26px; color:#FF477E; font-weight:900;">
            ${icon} Bài Học: ${lesson.name} ${lesson.upper ? `(${lesson.upper} -${lesson.lower})` : ''}
        </h2>

        <div class="tv-container">
            <div class="video-frame-container">
                <iframe 
                    src="https://www.youtube-nocookie.com/embed/${lesson.youtubeId}?rel=0" 
                    title="${lesson.name}"
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
        </div>

        <div class="lesson-guide">
            <div class="guide-title">
                <span>✏️</span> Hướng dẫn nét viết:
            </div>
            <div class="guide-text">${lesson.description}</div>
        </div>
    `;
}

function openEditProfileModal() {
    if (!currentUser) return;
    document.getElementById("edit-name-input").value = currentUser.fullname;
    document.getElementById("edit-avatar-select").value = currentUser.avatar || "🐱";
    document.getElementById("profile-modal").classList.remove("hidden");
}

function closeEditProfileModal() {
    document.getElementById("profile-modal").classList.add("hidden");
}

function saveProfile() {
    const newName = document.getElementById("edit-name-input").value.trim();
    const newAvatar = document.getElementById("edit-avatar-select").value;

    if (newName) {
        currentUser.fullname = newName;
        currentUser.avatar = newAvatar;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        updateUserInfoUI();
        closeEditProfileModal();
    }
}
/* ==========================================================================
   BỔ SUNG 1: CẤU HÌNH OPENAI API KEY & CHỨC NĂNG IN VỞ Ô LY THÔNG MINH (AI)
   ========================================================================== */

// Khung chứa Key API mặc định hoặc nạp từ localStorage
let OPENAI_API_KEY = localStorage.getItem("OPENAI_API_KEY") || "YOUR_API_KEY_HERE";

function openApiKeyModal() {
    document.getElementById("openai-key-input").value = OPENAI_API_KEY.startsWith("sk-") ? OPENAI_API_KEY : "";
    document.getElementById("openai-key-modal").classList.remove("hidden");
}

function closeApiKeyModal() {
    document.getElementById("openai-key-modal").classList.add("hidden");
}

function saveApiKey() {
    const inputKey = document.getElementById("openai-key-input").value.trim();
    if (inputKey) {
        OPENAI_API_KEY = inputKey;
        localStorage.setItem("OPENAI_API_KEY", inputKey);
        alert("🔑 Đã lưu OpenAI API Key thành công!");
        closeApiKeyModal();
    }
}

// Bổ sung khung AI & In vở Ô ly vào Hàm renderLessonDetail mà KHÔNG làm mất code cũ
const originalRenderLessonDetail = renderLessonDetail;
renderLessonDetail = function() {
    // Chạy lại hàm cũ để giữ nguyên 100% giao diện video & hướng dẫn
    originalRenderLessonDetail();

    const detailArea = document.getElementById("lesson-detail-area");
    if (!detailArea) return;

    const dataset = (typeof currentTabType !== "undefined" && currentTabType === "strokes") ? BASIC_STROKES_DATA : ALPHABET_DATA;
    const lesson = dataset.find(item => item.id === selectedItemId) || dataset[0];
    const defaultText = lesson.upper ? `${lesson.upper} ${lesson.lower} ${lesson.lower} ${lesson.lower}` : `${lesson.char} ${lesson.char} ${lesson.char}`;

    // Nối thêm Khung AI + In Ô Ly vào cuối màn hình xem chi tiết
    const aiPrintContainer = document.createElement("div");
    aiPrintContainer.className = "ai-section";
    aiPrintContainer.innerHTML = `
        <div class="ai-title">
            <span>✨ AI Tạo Bài Tập Viết Ô Ly Theo Yêu Cầu</span>
            <button onclick="openApiKeyModal()" style="background:none; border:none; color:#15803D; cursor:pointer; text-decoration:underline; font-size:12px;">⚙️ Cấu hình API Key</button>
        </div>
        <div class="ai-input-group">
            <input type="text" id="ai-prompt-input" placeholder="Ví dụ: Tạo 4 từ ghép chứa chữ ${lesson.name}...">
            <button class="btn-ai-gen" id="btn-call-ai" onclick="generateExerciseWithAI('${lesson.name}')">🪄 Tạo Bài Tập</button>
        </div>
        <textarea id="ai-exercise-editor" class="ai-editor-textarea" placeholder="Nội dung bài tập sẽ hiển thị tại đây... Bé/Cô có thể tự do sửa lại trước khi in.">${defaultText}</textarea>
        
        <div class="print-action-bar">
            <button class="btn-print" onclick="printOliWorksheet('${lesson.name}')">𖤂 In Bảng Tập Viết Vở Ô Ly (A4)</button>
        </div>
    `;

    detailArea.appendChild(aiPrintContainer);
};

// Hàm gọi API OpenAI (gpt-4o-mini hoặc gpt-3.5-turbo)
async function generateExerciseWithAI(lessonName) {
    if (!OPENAI_API_KEY || OPENAI_API_KEY === "YOUR_API_KEY_HERE") {
        alert("Vui lòng bấm '⚙️ Cấu hình API Key' để nhập OpenAI API Key trước khi sử dụng tính năng này!");
        openApiKeyModal();
        return;
    }

    const promptInput = document.getElementById("ai-prompt-input").value.trim() || `Tạo 4 từ ngắn hoặc câu luyện viết đơn giản chứa ${lessonName} cho học sinh lớp 1.`;
    const btn = document.getElementById("btn-call-ai");
    const editor = document.getElementById("ai-exercise-editor");

    btn.innerText = "⏳ Đang tạo...";
    btn.disabled = true;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "Bạn là giáo viên tiểu học. Hãy trả về CHỈ danh sách các từ/câu luyện viết lớp 1, cách nhau bởi dấu cách hoặc xuống dòng. KHÔNG kèm lời chào hay giải thích." },
                    { role: "user", content: promptInput }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();
        if (data.choices && data.choices[0]) {
            editor.value = data.choices[0].message.content.trim();
        } else {
            alert("Lỗi khi kết nối OpenAI: " + (data.error?.message || "Không thể tạo bài tập"));
        }
    } catch (err) {
        alert("Lỗi mạng hoặc API Key không hợp lệ!");
        console.error(err);
    } finally {
        btn.innerText = "🪄 Tạo Bài Tập";
        btn.disabled = false;
    }
}

// Hàm xuất bản in A4 Chuẩn Ô Ly
function printOliWorksheet(titleName) {
    const rawContent = document.getElementById("ai-exercise-editor").value.trim();
    if (!rawContent) return alert("Vui lòng nhập nội dung tập viết trước khi in!");

    const printArea = document.getElementById("print-area");
    const userName = (currentUser && currentUser.fullname) ? currentUser.fullname : "........................................";

    // Chuyển đổi chuỗi văn bản thành danh sách ô ly mờ
    const characters = rawContent.replace(/\s+/g, ' ').split('');
    let gridCellsHTML = characters.map(char => {
        if (char === ' ') return `<div class="oli-cell"></div>`;
        return `<div class="oli-cell"><span class="oli-char-trace">${char}</span></div>`;
    }).join('');

    // Nhân bản thêm ô trống nếu dòng chưa đủ
    for (let i = 0; i < 40; i++) {
        gridCellsHTML += `<div class="oli-cell"></div>`;
    }

    printArea.innerHTML = `
        <div class="oli-page-container">
            <div class="oli-header">
                <div>
                    <h2 style="font-size: 20px; color: #000; margin-bottom: 5px;">BÀI TẬP LƯYỆN VIẾT VỞ Ô LY: ${titleName.toUpperCase()}</h2>
                    <p style="font-size: 14px;">Họ và tên học sinh: <strong>${userName}</strong> - Lớp: 1....</p>
                </div>
                <div style="font-size: 12px; font-style: italic;">Ngày in: ${new Date().toLocaleDateString('vi-VN')}</div>
            </div>
            <div class="oli-line-row">
                <div class="oli-grid-container">
                    ${gridCellsHTML}
                </div>
            </div>
        </div>
    `;

    printArea.classList.remove("hidden");
    window.print();
    printArea.classList.add("hidden");
}


/* ==========================================================================
   BỔ SUNG 2: GAME ĐỐ VUI RÈN MẮT (ÂM THANH + TẶNG SAO KHEN THƯỞNG)
   ========================================================================== */

let totalStars = parseInt(localStorage.getItem("game_stars") || "0");
let currentGameQuestion = null;

// Bổ sung nút bấm Tab Game vào Header/Nav mà không đè mất Nav cũ
const originalRenderNav = renderNav;
renderNav = function() {
    originalRenderNav();
    const navContainer = document.getElementById("main-nav-container");
    if (navContainer) {
        const gameNavBtn = document.createElement("button");
        gameNavBtn.className = "nav-btn";
        gameNavBtn.innerText = "🎮 Đố Vui Rèn Mắt";
        gameNavBtn.onclick = function() { switchTab(this, 'game'); };
        navContainer.appendChild(gameNavBtn);
    }
};

// Cập nhật RenderContent để xử lý Tab 'game'
const originalRenderContent = renderContent;
renderContent = function(tabName) {
    if (tabName === "game") {
        const contentArea = document.getElementById("content-area");
        contentArea.innerHTML = `
            <div class="game-card">
                <div class="game-header-bar">
                    <h2 style="color:#FF477E; margin:0;">🎮 Đố Vui Rèn Mắt</h2>
                    <div class="star-counter">⭐ <span id="star-count-display">${totalStars}</span> Sao</div>
                </div>
                <div class="question-box">
                    <div class="question-text" id="game-question-text">Đang tải câu hỏi...</div>
                    <button class="btn-replay-sound" onclick="replayGameSound()">🔊 Nghe Lại Câu Hỏi</button>
                </div>
                <div class="answers-grid" id="game-answers-grid"></div>
                <div class="game-feedback" id="game-feedback-text"></div>
            </div>
        `;
        initNewGameTurn();
    } else {
        originalRenderContent(tabName);
    }
};

// Khởi tạo câu hỏi ngẫu nhiên từ Chữ cái & Nét cơ bản
function initNewGameTurn() {
    const feedback = document.getElementById("game-feedback-text");
    if (feedback) feedback.innerText = "";

    const allItems = [...ALPHABET_DATA, ...BASIC_STROKES_DATA];
    const targetItem = allItems[Math.floor(Math.random() * allItems.length)];
    
    // Lấy 3 đáp án sai ngẫu nhiên
    const wrongItems = allItems.filter(i => i.id !== targetItem.id).sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [targetItem, ...wrongItems].sort(() => 0.5 - Math.random());

    const isStroke = !!targetItem.char;
    const questionPrompt = isStroke ? `Bé hãy tìm: ${targetItem.name}` : `Bé hãy tìm chữ: ${targetItem.name}`;

    currentGameQuestion = {
        prompt: questionPrompt,
        correctId: targetItem.id
    };

    document.getElementById("game-question-text").innerText = questionPrompt;
    speakText(questionPrompt);

    const grid = document.getElementById("game-answers-grid");
    grid.innerHTML = options.map(item => `
        <button class="answer-btn" onclick="checkGameAnswer(this, '${item.id}')">
            ${item.upper ? `${item.upper}${item.lower}` : (item.char || item.symbol)}
        </button>
    `).join('');
}

// Phát âm thanh tiếng Việt bằng Web Speech API
function speakText(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Dừng câu nói trước nếu có
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'vi-VN';
        utterance.rate = 0.85; // Tốc độ thong thả cho bé dễ nghe
        window.speechSynthesis.speak(utterance);
    }
}

function replayGameSound() {
    if (currentGameQuestion) {
        speakText(currentGameQuestion.prompt);
    }
}

// Kiểm tra kết quả & Thưởng sao
function checkGameAnswer(btnElement, selectedId) {
    const feedback = document.getElementById("game-feedback-text");
    const allBtns = document.querySelectorAll(".answer-btn");

    if (selectedId === currentGameQuestion.correctId) {
        btnElement.classList.add("correct");
        allBtns.forEach(b => b.disabled = true);

        // Cộng Sao & Lưu
        totalStars++;
        localStorage.setItem("game_stars", totalStars.toString());
        document.getElementById("star-count-display").innerText = totalStars;

        feedback.style.color = "#16A34A";
        feedback.innerText = "🎉 Chính xác rồi! Bé giỏi quá!";
        speakText("Chính xác rồi! Bé giỏi quá!");

        // Tự động qua câu mới sau 2.5 giây
        setTimeout(() => {
            initNewGameTurn();
        }, 2500);
    } else {
        btnElement.classList.add("wrong");
        feedback.style.color = "#DC2626";
        feedback.innerText = "💡 Chưa đúng rồi! Bé thử lại nhé!";
        speakText("Chưa đúng rồi! Bé thử lại nhé!");
    }
}
