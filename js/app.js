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
                        <button id="btn-type-alpha" class="role-btn active" style="font-size:14px; padding:8px;" onclick="switchStudyType('alphabet')">𔤤 29 Chữ Cái</button>
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
    const icon = currentTabType === "alphabet" ? (LETTER_ICONS[lesson.id] || "✏️") : "✍";

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
   BỔ SUNG 1: CẤU HÌNH TẠO BÀI TẬP BẰNG GOOGLE GEMINI API & IN VỞ Ô LY
   ========================================================================== */

// ⚠️ ĐIỀN API KEY GEMINI CỦA BẠN VÀO GIỮA 2 DẤU NGOẶC KÉP
const GEMINI_API_KEY = "AQ.Ab8RN6IlpXp1o7xszYWFJPUJcKuZnwB7QTeIuUB_bnOzq9R4aQ";

// Nối Khung AI Gemini & In Ô ly vào Hàm renderLessonDetail
const originalRenderLessonDetail = renderLessonDetail;
renderLessonDetail = function() {
    originalRenderLessonDetail();

    const detailArea = document.getElementById("lesson-detail-area");
    if (!detailArea) return;

    const dataset = (typeof currentTabType !== "undefined" && currentTabType === "strokes") ? BASIC_STROKES_DATA : ALPHABET_DATA;
    const lesson = dataset.find(item => item.id === selectedItemId) || dataset[0];
    const defaultText = lesson.upper ? `${lesson.upper} ${lesson.lower} ${lesson.lower} ${lesson.lower}` : `${lesson.char} ${lesson.char} ${lesson.char}`;

    const aiPrintContainer = document.createElement("div");
    aiPrintContainer.className = "ai-section";
    aiPrintContainer.innerHTML = `
        <div class="ai-title">
            <span>✨ AI Gemini Tạo Bài Tập Viết Ô Ly Theo Yêu Cầu</span>
        </div>
        <div class="ai-input-group">
            <input type="text" id="ai-prompt-input" placeholder="Ví dụ: Tạo 4 từ ghép chứa chữ ${lesson.name}...">
            <button class="btn-ai-gen" id="btn-call-ai" onclick="generateExerciseWithGemini('${lesson.name}')">🪄 Tạo Bài Tập (Gemini)</button>
        </div>
        <textarea id="ai-exercise-editor" class="ai-editor-textarea" placeholder="Nội dung bài tập sẽ hiển thị tại đây... Bé/Cô có thể tự do sửa lại trước khi in.">${defaultText}</textarea>
        
        <div class="print-action-bar">
            <button class="btn-print" onclick="printOliWorksheet('${lesson.name}')">𖤂 In Bảng Tập Viết Vở Ô Ly (A4)</button>
        </div>
    `;

    detailArea.appendChild(aiPrintContainer);
};

// Hàm sinh bài tập tự động dùng Google Gemini API
async function generateExerciseWithGemini(lessonName) {
    const cleanKey = GEMINI_API_KEY ? GEMINI_API_KEY.trim() : "";
    if (!cleanKey || cleanKey.includes("DienKeyCuaBanVaoDay")) {
        alert("⚠️ Vui lòng điền GEMINI_API_KEY của bạn vào file js/app.js!");
        return;
    }
    
    const userPrompt = document.getElementById("ai-prompt-input").value.trim() || `Tạo 4 từ ngắn hoặc câu luyện viết đơn giản chứa ${lessonName} cho học sinh lớp 1.`;
    const btn = document.getElementById("btn-call-ai");
    const editor = document.getElementById("ai-exercise-editor");

    const fullPrompt = `Bạn là một giáo viên tiểu học dạy tiếng Việt lớp 1.
Yêu cầu: ${userPrompt}.
Chỉ trả về danh sách các từ/câu luyện viết, phân cách nhau bởi khoảng trắng hoặc xuống dòng. Không kèm theo lời chào, giải thích hay ký tự đặc biệt như dấu sao (*).`;

    btn.innerText = "⏳ Đang nhờ AI Gemini tạo...";
    btn.disabled = true;

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${cleanKey}`;
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: fullPrompt }] }]
            })
        });

        const data = await response.json();

        if (response.ok && data.candidates && data.candidates[0] && data.candidates[0].content.parts[0].text) {
            editor.value = data.candidates[0].content.parts[0].text.trim();
        } else {
            const errorMsg = data.error ? data.error.message : "API Key không hợp lệ hoặc không thể sinh nội dung.";
            alert(`⚠️ Lỗi Gemini API: ${errorMsg}`);
            console.error("Chi tiết lỗi Gemini:", data);
        }
    } catch (err) {
        alert("Lỗi kết nối mạng tới Google Gemini API!");
        console.error(err);
    } finally {
        btn.innerText = "🪄 Tạo Bài Tập (Gemini)";
        btn.disabled = false;
    }
}

/* ==========================================================================
   BỔ SUNG 2: GAME ĐỐ VUI RÈN MẮT (ÂM THANH + TẶNG SAO KHEN THƯỞNG)
   ========================================================================== */

let totalStars = parseInt(localStorage.getItem("game_stars") || "0");
let currentGameQuestion = null;

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

function initNewGameTurn() {
    const feedback = document.getElementById("game-feedback-text");
    if (feedback) feedback.innerText = "";

    const allItems = [...ALPHABET_DATA, ...BASIC_STROKES_DATA];
    const targetItem = allItems[Math.floor(Math.random() * allItems.length)];
    
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

function speakText(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'vi-VN';
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
    }
}

function replayGameSound() {
    if (currentGameQuestion) {
        speakText(currentGameQuestion.prompt);
    }
}

function checkGameAnswer(btnElement, selectedId) {
    const feedback = document.getElementById("game-feedback-text");
    const allBtns = document.querySelectorAll(".answer-btn");

    if (selectedId === currentGameQuestion.correctId) {
        btnElement.classList.add("correct");
        allBtns.forEach(b => b.disabled = true);

        totalStars++;
        localStorage.setItem("game_stars", totalStars.toString());
        document.getElementById("star-count-display").innerText = totalStars;

        feedback.style.color = "#16A34A";
        feedback.innerText = "🎉 Chính xác rồi! Bé giỏi quá!";
        speakText("Chính xác rồi! Bé giỏi quá!");

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
