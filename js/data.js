/* ===================================================
   DATA SYSTEM: 29 LETTER DATA & STROKES
   =================================================== */

const ALPHABET_DATA = [
    { id: "a", lower: "a", upper: "A", name: "Chữ a", strokes: [{ name: "Nét cong kín", d: "M 350,180 A 40,40 0 1,0 350,260 A 40,40 0 1,0 350,180" }, { name: "Nét móc ngược", d: "M 390,180 L 390,250 Q 390,270 410,270" }] },
    { id: "aw", lower: "ă", upper: "Ă", name: "Chữ ă", strokes: [{ name: "Nét cong kín", d: "M 350,180 A 40,40 0 1,0 350,260 A 40,40 0 1,0 350,180" }, { name: "Nét móc ngược", d: "M 390,180 L 390,250 Q 390,270 410,270" }, { name: "Nét cong dưới (Nón ă)", d: "M 330,140 Q 350,160 370,140" }] },
    { id: "aa", lower: "â", upper: "Â", name: "Chữ â", strokes: [{ name: "Nét cong kín", d: "M 350,180 A 40,40 0 1,0 350,260 A 40,40 0 1,0 350,180" }, { name: "Nét móc ngược", d: "M 390,180 L 390,250 Q 390,270 410,270" }, { name: "Dấu mũ â", d: "M 330,150 L 350,130 L 370,150" }] },
    { id: "b", lower: "b", upper: "B", name: "Chữ b", strokes: [{ name: "Nét khuyết trên + Nét thắt", d: "M 250,270 L 250,120 Q 250,90 270,90 Q 290,90 290,120 L 290,250 Q 290,270 310,250" }] },
    { id: "c", lower: "c", upper: "C", name: "Chữ c", strokes: [{ name: "Nét cong trái", d: "M 380,190 Q 330,180 330,225 Q 330,270 380,260" }] },
    { id: "d", lower: "d", upper: "D", name: "Chữ d", strokes: [{ name: "Nét cong kín", d: "M 350,210 A 30,30 0 1,0 350,270 A 30,30 0 1,0 350,210" }, { name: "Nét móc ngược dài", d: "M 380,120 L 380,250 Q 380,270 400,270" }] },
    { id: "dd", lower: "đ", upper: "Đ", name: "Chữ đ", strokes: [{ name: "Nét cong kín", d: "M 350,210 A 30,30 0 1,0 350,270 A 30,30 0 1,0 350,210" }, { name: "Nét móc ngược dài", d: "M 380,120 L 380,250 Q 380,270 400,270" }, { name: "Nét gạch ngang", d: "M 360,160 L 400,160" }] },
    { id: "e", lower: "e", upper: "E", name: "Chữ e", strokes: [{ name: "Nét cong phải kết hợp cong trái", d: "M 320,240 L 380,230 Q 380,190 340,190 Q 310,220 350,270" }] },
    { id: "ee", lower: "ê", upper: "Ê", name: "Chữ ê", strokes: [{ name: "Thân chữ e", d: "M 320,240 L 380,230 Q 380,190 340,190 Q 310,220 350,270" }, { name: "Dấu mũ ê", d: "M 330,170 L 350,150 L 370,170" }] },
    { id: "g", lower: "g", upper: "G", name: "Chữ g", strokes: [{ name: "Nét cong kín", d: "M 350,180 A 30,30 0 1,0 350,240 A 30,30 0 1,0 350,180" }, { name: "Nét khuyết dưới", d: "M 380,180 L 380,300 Q 380,330 350,330 Q 330,330 330,300 L 410,200" }] },
    { id: "h", lower: "h", upper: "H", name: "Chữ h", strokes: [{ name: "Nét khuyết trên", d: "M 280,270 L 280,120 Q 280,90 300,90 Q 320,100 320,130 L 320,270" }, { name: "Nét móc hai đầu", d: "M 320,210 Q 320,180 350,180 Q 380,180 380,210 L 380,250 Q 380,270 400,270" }] },
    { id: "i", lower: "i", upper: "I", name: "Chữ i", strokes: [{ name: "Nét hất", d: "M 300,220 L 330,180" }, { name: "Nét móc ngược", d: "M 330,180 L 330,250 Q 330,270 350,270" }, { name: "Dấu chấm", d: "M 330,150 A 3,3 0 1,1 330,156" }] },
    { id: "k", lower: "k", upper: "K", name: "Chữ k", strokes: [{ name: "Nét khuyết trên", d: "M 280,270 L 280,120 Q 280,90 300,90 Q 320,100 320,130 L 320,270" }, { name: "Nét thắt giữa", d: "M 320,210 L 360,180 L 335,220 L 370,270" }] },
    { id: "l", lower: "l", upper: "L", name: "Chữ l", strokes: [{ name: "Nét khuyết trên biến thể", d: "M 300,270 L 300,120 Q 300,90 330,90 Q 350,100 350,130 L 350,250 Q 350,270 380,270" }] },
    { id: "m", lower: "m", upper: "M", name: "Chữ m", strokes: [{ name: "Nét móc xuôi ngắn", d: "M 280,210 Q 280,180 300,180 L 300,270" }, { name: "Nét móc xuôi 2", d: "M 300,210 Q 300,180 330,180 L 330,270" }, { name: "Nét móc hai đầu", d: "M 330,210 Q 330,180 360,180 L 360,250 Q 360,270 380,270" }] },
    { id: "n", lower: "n", upper: "N", name: "Chữ n", strokes: [{ name: "Nét móc xuôi", d: "M 300,210 Q 300,180 320,180 L 320,270" }, { name: "Nét móc hai đầu", d: "M 320,210 Q 320,180 350,180 L 350,250 Q 350,270 370,270" }] },
    { id: "o", lower: "o", upper: "O", name: "Chữ o", strokes: [{ name: "Nét cong kín", d: "M 350,180 A 40,45 0 1,0 350,270 A 40,45 0 1,0 350,180" }] },
    { id: "oo", lower: "ô", upper: "Ô", name: "Chữ ô", strokes: [{ name: "Nét cong kín", d: "M 350,180 A 40,45 0 1,0 350,270 A 40,45 0 1,0 350,180" }, { name: "Dấu mũ ô", d: "M 330,160 L 350,140 L 370,160" }] },
    { id: "ow", lower: "ơ", upper: "Ơ", name: "Chữ ơ", strokes: [{ name: "Nét cong kín", d: "M 350,180 A 40,45 0 1,0 350,270 A 40,45 0 1,0 350,180" }, { name: "Nét râu ơ", d: "M 385,185 Q 395,170 390,160" }] },
    { id: "p", lower: "p", upper: "P", name: "Chữ p", strokes: [{ name: "Nét hất", d: "M 300,220 L 330,180" }, { name: "Nét thẳng đứng dài", d: "M 330,180 L 330,320" }, { name: "Nét móc hai đầu", d: "M 330,210 Q 330,180 360,180 L 360,250 Q 360,270 380,270" }] },
    { id: "q", lower: "q", upper: "Q", name: "Chữ q", strokes: [{ name: "Nét cong kín", d: "M 350,180 A 30,30 0 1,0 350,240 A 30,30 0 1,0 350,180" }, { name: "Nét thẳng đứng dài", d: "M 380,180 L 380,320" }] },
    { id: "r", lower: "r", upper: "R", name: "Chữ r", strokes: [{ name: "Nét thắt trên + Cong phải", d: "M 300,270 L 320,180 L 335,175 Q 350,180 350,200 L 350,250 Q 350,270 370,270" }] },
    { id: "s", lower: "s", upper: "S", name: "Chữ s", strokes: [{ name: "Nét thắt trên + Cong trái", d: "M 300,270 L 330,175 Q 340,175 340,190 Q 340,270 300,270" }] },
    { id: "t", lower: "t", upper: "T", name: "Chữ t", strokes: [{ name: "Nét hất", d: "M 300,220 L 330,170" }, { name: "Nét móc ngược", d: "M 330,140 L 330,250 Q 330,270 360,270" }, { name: "Nét gạch ngang", d: "M 310,180 L 350,180" }] },
    { id: "u", lower: "u", upper: "U", name: "Chữ u", strokes: [{ name: "Nét hất", d: "M 290,220 L 320,180" }, { name: "Nét móc ngược rộng", d: "M 320,180 L 320,240 Q 320,270 350,270 L 350,180" }, { name: "Nét móc ngược 2", d: "M 350,180 L 350,250 Q 350,270 370,270" }] },
    { id: "uw", lower: "ư", upper: "Ư", name: "Chữ ư", strokes: [{ name: "Thân chữ u", d: "M 290,220 L 320,180 L 320,240 Q 320,270 350,270 L 350,180 L 350,250 Q 350,270 370,270" }, { name: "Nét râu ư", d: "M 350,180 Q 360,170 358,160" }] },
    { id: "v", lower: "v", upper: "V", name: "Chữ v", strokes: [{ name: "Nét móc hai đầu + Nét thắt", d: "M 290,190 Q 290,180 310,180 L 320,250 Q 340,270 350,240 Q 360,210 370,190" }] },
    { id: "x", lower: "x", upper: "X", name: "Chữ x", strokes: [{ name: "Nét cong trái", d: "M 330,190 Q 300,220 330,260" }, { name: "Nét cong phải", d: "M 330,190 Q 360,220 330,260" }] },
    { id: "y", lower: "y", upper: "Y", name: "Chữ y", strokes: [{ name: "Nét hất", d: "M 280,210 L 310,180" }, { name: "Nét móc hai đầu", d: "M 310,180 L 310,230 Q 310,260 340,260 L 340,180" }, { name: "Nét khuyết dưới", d: "M 340,180 L 340,300 Q 340,330 310,330 Q 290,330 290,300 L 370,200" }] }
];

const DEFAULT_USERS = [
    { id: "GV001", pass: "123456", role: "teacher", name: "Cô Giáo Thảo" },
    { id: "HS001", pass: "123456", role: "student", name: "Nguyễn Văn An", class: "1A", stars: 45, progress: 65 },
    { id: "HS002", pass: "123456", role: "student", name: "Trần Thị Bình", class: "1A", stars: 30, progress: 40 }
];
