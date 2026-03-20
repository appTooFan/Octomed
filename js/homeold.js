/*****************************************************************************************
 *  home.js  (SINGLE FILE - NO jQuery)
 *
 *  Features:
 *   - Clean navigation: Subjects -> Units -> Lessons -> Lesson View
 *   - GitHub lesson folders (s/u/l):
 *       sound.mp3, book.pdf, review.html
 *       videos/*, books/*, screenshot/*
 *   - Uses GitHub API فقط للعدّ/القوائم، و CDN (jsDelivr) للتحميل
 *   - Smooth transitions using setTimeout (softNavigate)
 *   - Back Manager WITHOUT recursion (fix Maximum call stack exceeded)
 *   - Compatibility vars for your old files: footerdiv, footerimg
 *
 *  Repo:
 *   - owner: appTooFan
 *   - repo : Rafigtalib
 *   - branch: main
 *****************************************************************************************/


/* =======================================================================================
   0) DOM + Compatibility (حتى لا تنهار ملفاتك القديمة مثل adds.js)
======================================================================================= */

// main container
window.change_Page = document.querySelector("#change_Page");

// ✅ Compatibility for old code that expects footerdiv/footerimg
window.footerdiv = document.querySelectorAll(".footer .img");         // used in some old files
window.footerimg = document.querySelectorAll(".footer div div img");  // used in some old files


/* =======================================================================================
   1) Helpers (NO jQuery)
======================================================================================= */

function qs(sel) { return document.querySelector(sel); }
function qsa(sel){ return document.querySelectorAll(sel); }

function show(sel, display="block"){ const el = qs(sel); if(el) el.style.display = display; }
function hide(sel){ const el = qs(sel); if(el) el.style.display = "none"; }

/**
 * Smooth transition wrapper
 */
function softNavigate(fn, delay=300){ setTimeout(fn, delay); }


/* =======================================================================================
   2) classremove (إذا عندك نسخة أخرى، هذه ستكون الافتراضية)
======================================================================================= */

window.classremove = window.classremove || function classremove(){
  if (!window.change_Page) return;
  change_Page.className = "";

  // show profile if exists
  const pro = qs(".proFile");
  if (pro) pro.style.display = "grid";
};


/* =======================================================================================
   3) Back Manager (بدون Loop)
======================================================================================= */

let currentView = null;

/**
 * احفظ دالة تعيد رسم الشاشة السابقة
 */
function setCurrentView(fn){
  currentView = fn;
}

/**
 * رجوع للشاشة السابقة
 */
function goBackView(){
  if(typeof currentView === "function") currentView();
}

/**
 * ✅ حل مشكلة Maximum call stack:
 * لا تعمل setCurrentView(goBackView) أبدًا.
 * بدل ذلك نخزن دالة ترجع لشاشة الدرس الحالية
 */
let lastLessonViewFn = null;


/* =======================================================================================
   4) GitHub Config + API + CDN (jsDelivr)
======================================================================================= */

const GH = {
  owner: "appTooFan",
  repo: "Rafigtalib",
  branch: "main",
  apiBase: "https://api.github.com",

  // ✅ هذا هو CDN الذي طلبته (بدل GitHub raw)
  cdnBase: "https://cdn.jsdelivr.net/gh/appTooFan/Rafigtalib@main"
};

/**
 * ⚠️ لا تضع توكن داخل التطبيق المنشور
 * إن احتجت للتجربة فقط:
 * const GH_TOKEN = "ghp_....";
 */
const GH_TOKEN = null;

function ghHeaders(){
  const h = { "Accept": "application/vnd.github+json" };
  if (GH_TOKEN) h["Authorization"] = "token " + GH_TOKEN;
  return h;
}

/**
 * List directory contents from GitHub
 * @param {string} path e.g "0/0/0/videos"
 */
async function ghListDir(path){
  const url = `${GH.apiBase}/repos/${GH.owner}/${GH.repo}/contents/${encodeURIComponent(path)}?ref=${GH.branch}`;
  const res = await fetch(url, { headers: ghHeaders() });
  if(!res.ok) throw new Error("GitHub API failed: " + res.status);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

// ✅ أي ملف يتم تشغيله/تحميله من jsDelivr
function cdnUrl(path){
  path = (path || "").replace(/^\/+/,"");
  return `${GH.cdnBase}/${path}`;
}

function byExt(name, exts){
  const n = (name || "").toLowerCase();
  return exts.some(ext => n.endsWith(ext));
}


/* =======================================================================================
   5) Footer UI (بدون jQuery)
======================================================================================= */

(function initFooter(){
  const items = qsa(".footer .img");
  if(!items.length) return;

  // active first default
  const first = qs(".footer .img1");
  if(first){
    first.style.borderTop = "0.8vh solid var(--app-color)";
    const img = first.querySelector("div img");
    if(img) img.src = `img/footer/black/0active.svg`;
  }

  items.forEach((item, ind) => {
    item.onclick = function(){
      items.forEach((ele, idx) => {
        ele.style.borderTop = "0.2vh solid var(--borderFooter-color)";
        const icon = ele.querySelector("img");
        if(icon) icon.src = `img/${idx}.svg`;
      });

      this.style.borderTop = "0.8vh solid var(--app-color)";
      const icon = this.querySelector("img");
      if(icon) icon.src = `img/footer/black/${ind}active.svg`;

      localStorage.setItem("onback", ind);
    };
  });

})();


/* =======================================================================================
   6) Views Slider (الصور والنصوص)
======================================================================================= */

(function initViewsSlider(){
  const photoviews = [
    { img:"18views", text:" الفشل هو مجموعة تجارب تسبق النجاح " },
    { img:"19views", text:" بدل ان تلعن الظلام اوقد شمعة " },
    { img:"20views", text:" الارادة القوية تقصر المسافات" },
    { img:"21views", text:"الوقت من ذهب إن لم تدركه ذهب" },
    { img:"22views", text:"احذر ان تكون أهدافك مجرد أمنيات.. أو رغبات.. فتلك بضاعة الفقراء " },
    { img:"23views", text:"الأسباب الخمسة للنجاح : التركيز، التميز، التنظيم، التطوير، والتصميم " },
    { img:"24views", text:"أربع خطط للإنجاز : خطط، حضر، نفذ، تابع . " },
    { img:"25views", text:" اذا أردت أن تحلم فلتكن أحلامك عظيمة " },
    { img:"26views", text:"غيٌر أفكارك لتتمكن من تغيير العالم" },
    { img:"27views", text:"رحلة الألف ميل تبدأ بخطوة واحدة" },
    { img:"28views", text:"ان من لا يواجه التحديات، لا يعمل شيئا" },
    { img:"29views", text:"النجاح هو القيام بالأعمال العادية بطريقة غير عادية" },
    { img:"30views", text:"إن النجاح لا يحتاج إلى أقدام بل إلى إقدام" },
    { img:"31views", text:" النجاح هو الإنتقال من فشل إلى فشل، دون أن نفقد الأمل" },
    { img:"32views", text:" فن أن تكون مرة شجاعاً ومرة حذراً هو فن النجاح" },
    { img:"33views", text:" النجاح هو القاضي الدنيوي الوحيد للصواب والخطأ" },
    { img:"34views", text:" العلم ما نفع، ليس العلم ما حفظ" },
    { img:"35views", text:" العلم هو دواء لسموم الخرافات" },
    { img:"36views", text:" التعليم ليس أستعداداً للحياة، إنه الحياة ذاتها" },
    { img:"37views", text:"لا تسأل الله ان يخفف حملك، ولكن اسأله ان يقوي ظهرك " },
    { img:"38views", text:"اذا كنت مع الله فانت مع الاغلبيه المطلقه" },
    { img:"39views", text:"اللحظة قد تغير يومك. اليوم قد يغير حياتك. حياتك قد تغير العالم" },
    { img:"40views", text:"المثابرة عامل مهم من عوامل النجاح" },
    { img:"41views", text:"الانسان الناجح هو الانسان الذي يستغل الفرص" },
    { img:"42views", text:"العمل الجاد هو الثمن الذي ندفعه مقابل النجاح" },
    { img:"43views", text:"فكرة واحدة قد تدفعك نحو النجاح" },
    { img:"44views", text:"خلف كل رجل ناجح هناك الكثير من السنوات الفاشلة" },
    { img:"45views", text:"اذا سعيت نحو أهدافك، أهدافك بدورها ستعسى نحوك" },
    { img:"46views", text:"عش في خيالك، ليس في ماضيك" },
    { img:"47views", text:"الدراسة بلا تركيز كالسفر بلا خريطة" },
    { img:"48views", text:"الدراسة بلا فهم كالبناء بلا أساس" },
    { img:"49views", text:"الفشل هو المعلم الأول للنجاح" },
    { img:"50views", text:"الدراسة هي الاستثمار الوحيد الذي لا يفقد قيمته" },
    { img:"51views", text:"الدراسة مفتاح العلم، والعلم مفتاح النجاح" },
    { img:"52views", text:"الدراسة هي الجسر الذي يعبر بك من الحلم إلى الواقع" }
  ];

  const imgEl = qs(".views img");
  const h1El  = qs(".views h1");
  if(!imgEl || !h1El) return;

  imgEl.src = `img/views/17views.svg`;
  h1El.textContent="لا يوجد شيئ أسمه الفشل، بل هو فرصة للتعلم ";
  let idx = -1;
  setInterval(() => {
    idx++;
    if(idx >= photoviews.length) idx = 0;
    imgEl.src = `img/views/${photoviews[idx].img}.svg`;
    h1El.textContent = photoviews[idx].text;
  }, 5000);

})();


/* =======================================================================================
   7) Home HTML (subjects swiper)
======================================================================================= */

const them = "black";
window.homeinnerhtml = `
<swiper-container class="mySwiper" pagination="false">
  <swiper-slide>
    <div><img src="img/subjects/${them}/anatomy.png">
    <h4>الهيكلي العضلي</h4></div>
    <div><img src="img/subjects/${them}/doctor.png">
    <h4>علم الأوبئة</h4></div>
    <div><img src="img/subjects/${them}/abc.png">
    <h4>انجليزي</h4></div>
    <div><img src="img/subjects/${them}/dna.png">
    <h4>علم الأمراض</h4></div>
    <div><img src="img/subjects/${them}/biochemistry.png"><h4>علم الأدوية</h4></div>
    <div><img src="img/subjects/${them}/Biology.png">
    <h4>التغذيه</h4></div>
    <div><img src="img/subjects/${them}/newton.png">
    <h4>مهارات الحاسوب</h4></div>
    <div><img src="img/subjects/${them}/quran.png">
    <h4>القرآن</h4></div>
    <div><img src="img/subjects/${them}/arabic-language.png"><h4>اللغه العربيه</h4></div>
  </swiper-slide>

  <swiper-slide>
    <div><img src="img/subjects/${them}/military.png">
    <h4>الصراع الإسرائيلي</h4></div>
    <div><img src="img/subjects/${them}/newton.png"><h4>مهارات التعلم</h4></div>
  </swiper-slide>
</swiper-container>
`;


/* =======================================================================================
   8) Subjects Database (UI names only)
======================================================================================= */

const schoolSubjects = [
  { subject: "التشريح", units: [
      { unitNumber: "الفصل الدراسي الأول", lessons: ["الكربوهيدرات", "الاحماض"] },
      { unitNumber: "الفصل الدراسي الثاني", lessons: [] },
      { unitNumber: "الفصل الدراسي الصيفي", lessons: [] }
  ]},
  { subject: "الفسلوجيا", units: [
      { unitNumber: "الفصل الدراسي الأول", lessons: [] },
      { unitNumber: "الفصل الدراسي الثاني", lessons: [] },
      { unitNumber: "الفصل الدراسي الصيفي", lessons: [] }
  ]},
  { subject: "الكيمياء الحيويه", units: [
      { unitNumber: "الفصل الدراسي الأول", lessons: [] },
      { unitNumber: "الفصل الدراسي الثاني", lessons: [] },
      { unitNumber: "الفصل الدراسي الصيفي", lessons: [] }
  ]},
  { subject: "علم الاجنه", units: [
      { unitNumber: "الفصل الدراسي الأول", lessons: [] },
      { unitNumber: "الفصل الدراسي الثاني", lessons: [] },
      { unitNumber: "الفصل الدراسي الصيفي", lessons: [] }
  ]},
  { subject: "علم الانسجه", units: [
      { unitNumber: "الفصل الدراسي الأول", lessons: [] },
      { unitNumber: "الفصل الدراسي الثاني", lessons: [] },
      { unitNumber: "الفصل الدراسي الصيفي", lessons: [] }
  ]},
  { subject: "تشريح عملي", units: [
      { unitNumber: "الفصل الدراسي الأول", lessons: [] },
      { unitNumber: "الفصل الدراسي الثاني", lessons: [] },
      { unitNumber: "الفصل الدراسي الصيفي", lessons: [] }
  ]},
  { subject: "الانسجه عملي", units: [
      { unitNumber: "الفصل الدراسي الأول", lessons: [] },
      { unitNumber: "الفصل الدراسي الثاني", lessons: [] },
      { unitNumber: "الفصل الدراسي الصيفي", lessons: [] }
  ]},
  { subject: "كيمياء حيويه عملي", units: [
      { unitNumber: "الفصل الدراسي الأول", lessons: [] },
      { unitNumber: "الفصل الدراسي الثاني", lessons: [] },
      { unitNumber: "الفصل الدراسي الصيفي", lessons: [] }
  ]},
  { subject: "اللغه العربيه", units: [
      { unitNumber: "الفصل الدراسي الأول", lessons: [] },
      { unitNumber: "الفصل الدراسي الثاني", lessons: [] },
      { unitNumber: "الفصل الدراسي الصيفي", lessons: [] }
  ]},
  { subject: "الثقافه الإسلاميه", units: [
      { unitNumber: "الفصل الدراسي الأول", lessons: [] },
      { unitNumber: "الفصل الدراسي الثاني", lessons: [] },
      { unitNumber: "الفصل الدراسي الصيفي", lessons: [] }
  ]},
  { subject: "مهارات التعلم", units: [
      { unitNumber: "الفصل الدراسي الأول", lessons: [] },
      { unitNumber: "الفصل الدراسي الثاني", lessons: [] },
      { unitNumber: "الفصل الدراسي الصيفي", lessons: [] }
  ]}
];

// ✅ تحديث شكل الـ footer (active) يدويًا
function setFooterActive(activeIndex) {
  const items = document.querySelectorAll(".footer .img");
  if (!items || !items.length) return;

  items.forEach((item, idx) => {
    item.style.borderTop = "0.2vw solid var(--borderFooter-color)";
    const icon = item.querySelector("img");
    if (icon) icon.src = `img/${idx}.svg`;
  });

  const activeItem = items[activeIndex];
  if (!activeItem) return;

  activeItem.style.borderTop = "0.8vh solid var(--app-color)";
  const activeIcon = activeItem.querySelector("img");
  if (activeIcon) activeIcon.src = `img/footer/black/${activeIndex}active.svg`;

  localStorage.setItem("onback", activeIndex);
}


/* =======================================================================================
   9) Screens: Home -> Subject Units -> Unit Lessons -> Lesson View
======================================================================================= */

function renderSubjectsHome(){
  setFooterActive(0);
  setCurrentView(renderSubjectsHome);

  classremove();
  change_Page.classList.add("subjects");
  change_Page.innerHTML = window.homeinnerhtml || `<div style="padding:20px;text-align:center">homeinnerhtml غير موجود</div>`;

  show(".views", "block");
  bindSubjectsClicks();
}

// ✅ Home Footer يرجع للمواد دائمًا
(function bindFooterHomeAlways(){
  const items = document.querySelectorAll(".footer .img");
  if (!items || !items.length) return;

  const homeBtn = items[0];
  homeBtn.addEventListener("click", function () {
    setFooterActive(0);
    renderSubjectsHome();
  });
})();

function bindSubjectsClicks(){
  const cards = qsa("#change_Page swiper-container swiper-slide div");
  cards.forEach((div, subjectIndex) => {
    div.addEventListener("click", () => {
      softNavigate(() => openSubject(subjectIndex), 300);
    });
  });
}

function openSubject(subjectIndex){
  localStorage.setItem("subject", subjectIndex);
  setCurrentView(renderSubjectsHome);

  classremove();
  change_Page.innerHTML = "";
  hide(".views");
  change_Page.classList.add("lessons");

  const units = schoolSubjects[subjectIndex]?.units || [];
  units.forEach((unit, i) => {
    const card = document.createElement("div");

    const img = document.createElement("img");
    img.src = `img/numbers/${i+1}.png`;

    const h1 = document.createElement("h1");
    h1.textContent = unit.unitNumber;

    const p = document.createElement("p");
    p.innerHTML = `الوحده <span>${i+1}</span> تحتوي على <strong>${unit.lessons.length}</strong> درس`;

    card.appendChild(img);
    card.appendChild(h1);
    card.appendChild(p);

    card.addEventListener("click", () => softNavigate(() => openUnit(subjectIndex, i), 300));
    change_Page.appendChild(card);
  });
}

function openUnit(subjectIndex, unitIndex){
  localStorage.setItem("unit", unitIndex);
  setCurrentView(() => openSubject(subjectIndex));

  classremove();
  change_Page.innerHTML = "";
  change_Page.classList.add("listlessons");

  const lessons = schoolSubjects[subjectIndex]?.units?.[unitIndex]?.lessons || [];
  lessons.forEach((lessonName, lessonIndex) => {
    const div = document.createElement("div");
    div.classList.add("div_Items");

    const percent = lessonIndex * 0.5;

    div.innerHTML = `
      <img src="img/lessons/lesson${lessonIndex+1}.png">
      <h1>${lessonName}</h1>
      <p>درس <strong>${lessonIndex+1}</strong> في ${schoolSubjects[subjectIndex].units[unitIndex].unitNumber}</p>
      <img src="img/downloadLesson.svg" class="down_Lesson">
      <div class="con_Progress">
        <div class="pro_Level"><div class="pro_Fill" style="width:${percent}%"></div></div>
        <div class="level">${percent}%</div>
      </div>
    `;

    div.addEventListener("click", () => {
      softNavigate(() => openLessonView(subjectIndex, unitIndex, lessonIndex, lessonName), 300);
    });

    change_Page.appendChild(div);
  });
}


/* =======================================================================================
   10) Load Lesson Data from GitHub API (lists) + jsDelivr (assets)
======================================================================================= */

async function loadLessonFromGitHub(s,u,l){
  const base = `${s}/${u}/${l}`;

  // ✅ مصادر ثابتة من CDN
  const audioSrc   = cdnUrl(`${base}/sound.mp3`);
  const doctorPdf  = cdnUrl(`${base}/book.pdf`);
  const reviewHtml = cdnUrl(`${base}/review.html`);

  let videos = [];
  try{
    const items = await ghListDir(`${base}/videos`);
    videos = items
      .filter(x => x.type==="file" && byExt(x.name, [".mp4",".webm"])) // الأفضل للموبايل
      .map(x => ({
  name: x.name,
  url: cdnUrl(`${base}/videos/${encodeURIComponent(x.name)}`)
}));
console.log(videos)
  }catch(e){ videos = []; }

  let books = [];
  try{
    const items = await ghListDir(`${base}/books`);
    books = items
      .filter(x => x.type==="file" && byExt(x.name, [".pdf"]))
      .map(x => ({ name:x.name, title:x.name.replace(/\.pdf$/i,""), url: cdnUrl(`${base}/books/${x.name}`) }));
  }catch(e){ books = []; }

  let shots = [];
  try{
    const items = await ghListDir(`${base}/screenshot`);
    shots = items
      .filter(x => x.type==="file" && byExt(x.name, [".png",".jpg",".jpeg",".webp",".gif"]))
      .map(x => ({ name:x.name, url: cdnUrl(`${base}/screenshot/${x.name}`) }));
  }catch(e){ shots = []; }

  return { base, audioSrc, doctorPdf, reviewHtml, videos, books, shots };
}


/* =========================================
   حفظ بيانات الدرس الحالي للرجوع إليه لاحقًا
========================================= */
function saveCurrentLessonState(subjectIndex, unitIndex, lessonIndex, lessonTitle = "") {
  localStorage.setItem("return_subject_index", String(subjectIndex));
  localStorage.setItem("return_unit_index", String(unitIndex));
  localStorage.setItem("return_lesson_index", String(lessonIndex));
  localStorage.setItem("return_lesson_title", lessonTitle || "");
}

/* =======================================================================================
   11) Lesson View + Tools
======================================================================================= */

function openLessonView(subjectIndex, unitIndex, lessonIndex, lessonTitle){
  localStorage.setItem("lesson", lessonIndex);
  saveCurrentLessonState(subjectIndex, unitIndex, lessonIndex, lessonTitle);
  setCurrentView(() => openUnit(subjectIndex, unitIndex));

  // ✅ مهم: خزّن دالة رجوع لشاشة الدرس الحالية (حل stack overflow)
  lastLessonViewFn = () => openLessonView(subjectIndex, unitIndex, lessonIndex, lessonTitle);

  classremove();
  change_Page.innerHTML = "";
  change_Page.classList.add("view_Data_Lesson");
  hide(".proFile");
  hide(".views");
  change_Page.innerHTML = `
    <div class="view_videos">
      <video poster="img/views/47views.svg" id="videoPlayer" controls preload="metadata" width="100%" height="100%"></video>
      <h2>تكبير الشاشه للمشاهده</h2>

      <div class="footerTools">
        <div class="previousQuiz" id="btnPrevVideo">
          <img src="img/squiz/arrow-right.svg"><span>السابق</span>
        </div>
        <div class="testDelivery" id="videoCounter">0/0</div>
        <div class="nextQuiz" id="btnNextVideo">
          <span>التالي</span><img src="img/squiz/arrow-left.svg">
        </div>
      </div>

      <div id="lessonStatus">
      جارِ تجهيز ملفات الدرس ...
      </div>
    </div>

    <div class="views_items_lessons">
      <div class="recoder"><img src="img/view_lessons /vibrate.png"><h4>تسجيل</h4></div>
      <div class="doctor_summary"><img src="img/lessons/lesson10.png"><h4>ملخص دكتور</h4></div>
      <div class="other_summaries"><img src="img/lessons/lesson6.png"><h4>ملخصات منوعه</h4></div>
      <div class="interactive_quiz"><img src="img/questions.png"><h4>اختبار تفاعلي</h4></div>
      <div class="studio_gallery"><img src="img/view_lessons /images.png"><h4>الاستديو</h4></div>
      <div class="quick_review"><img src="img/review.png"><h4>مراجعه سريعه</h4></div>
    </div>
  `;

  (async () => {
    const status = document.getElementById("lessonStatus");
    try{
      const data = await loadLessonFromGitHub(subjectIndex, unitIndex, lessonIndex);
      if(status) status.textContent ="تم تجهيز جميع الملفات";

      initVideoNavigator(data.videos);
      initLessonButtons(data);

    }catch(err){
      console.log(err);
      if(status) status.textContent = "فشل التحميل ❌ تأكد من مسارات GitHub";
      initVideoNavigator([]);
      initLessonButtons({ videos:[], books:[], shots:[], doctorPdf:"", audioSrc:"", reviewHtml:"" });
    }
  })();
}


/* =========================
   Video navigator
========================= */

function initVideoNavigator(videos){
  const player  = document.getElementById("videoPlayer");
  const btnPrev = document.getElementById("btnPrevVideo");
  const btnNext = document.getElementById("btnNextVideo");
  const counter = document.getElementById("videoCounter");

  let index = 0;

  function render(){
    const total = videos.length;
    if(counter) counter.textContent = total ? `${index+1}/${total}` : "0/0";

    if(!total){
      if(player){ player.removeAttribute("src"); player.load(); }
      if(btnPrev) btnPrev.style.opacity = "0.5";
      if(btnNext) btnNext.style.opacity = "0.5";
      return;
    }

    if(player){ player.src = videos[index].url; player.load(); }
    if(btnPrev) btnPrev.style.opacity = (index===0) ? "0.5" : "1";
    if(btnNext) btnNext.style.opacity = (index===total-1) ? "0.5" : "1";
  }

  if(btnPrev){
    btnPrev.addEventListener("click", () => {
      if(index>0) softNavigate(() => { index--; render(); }, 120);
    });
  }

  if(btnNext){
    btnNext.addEventListener("click", () => {
      if(index<videos.length-1) softNavigate(() => { index++; render(); }, 120);
    });
  }

  render();
}


/* =========================
   Tool buttons
========================= */

function initLessonButtons(data){

  const recoderBtn = qs(".view_Data_Lesson .recoder");
  if(recoderBtn){
    recoderBtn.addEventListener("click", () => {
      softNavigate(() => openAudioView(data.audioSrc), 300);
    });
  }

  const doctorBtn = qs(".view_Data_Lesson .doctor_summary");
  if(doctorBtn){
    doctorBtn.addEventListener("click", () => {
      softNavigate(() => openPdfInViewer(data.doctorPdf), 300);
    });
  }

  const otherBtn = qs(".view_Data_Lesson .other_summaries");
  if(otherBtn){
    otherBtn.addEventListener("click", () => {
      softNavigate(() => openBooksList(data.books || []), 300);
    });
  }

  const studioBtn = qs(".view_Data_Lesson .studio_gallery");
  if(studioBtn){
    studioBtn.addEventListener("click", () => {
      softNavigate(() => openShotsGallery(data.shots || []), 300);
    });
  }

  const reviewBtn = qs(".view_Data_Lesson .quick_review");
  if(reviewBtn){
    reviewBtn.addEventListener("click", () => {
      softNavigate(() => openReviewHtml(data.reviewHtml), 300);
    });
  }
}


/* =======================================================================================
   12) Audio / PDF / Books / Gallery / Review
======================================================================================= */

function openAudioView(url){
  setCurrentView(lastLessonViewFn || goBackView);

  classremove();
  change_Page.innerHTML = "";
  change_Page.classList.add("recoder_view");

  change_Page.innerHTML = `
    <div>
      <h2>تسجيل المحاضرة</h2>
      <audio src="${url || ""}" controls></audio>
    </div>
  `;
}

function openPdfInViewer(pdfUrl){
  if(!pdfUrl){ alert("لا يوجد ملف PDF"); return; }
  localStorage.setItem("doctor_pdf_path", pdfUrl);
  window.location.href = "html/viewer.html";
}

function openBooksList(books){
  setCurrentView(lastLessonViewFn || goBackView);

  classremove();
  change_Page.innerHTML = "";
  change_Page.classList.add("otherSummaries_section");

  if(!books.length){
    change_Page.innerHTML = `<h2 style="text-align:center;padding:20px;">لا توجد ملخصات منوعة لهذا الدرس</h2>`;
    return;
  }

  books.forEach((b,i) => {
    const div = document.createElement("div");
    div.classList.add("div_Items");
    div.innerHTML = `
      <img src="img/lessons/lesson60.png">
      <h1>${b.title}</h1>
      <h3>فتح</h3>
      <p>ملخص <strong>${i+1}</strong></p>
    `;
    div.addEventListener("click", () => softNavigate(() => openPdfInViewer(b.url), 200));
    change_Page.appendChild(div);
  });
}

function openShotsGallery(shots){
  setCurrentView(lastLessonViewFn || goBackView);

  classremove();
  change_Page.innerHTML = "";
  change_Page.classList.add("studio_view");

  const list = shots.map(s => s.url);

  change_Page.innerHTML = `
    <div class="studio_header">
      <div class="studio_title">
        <h1>الاستوديو</h1>
        <p>عدد اللقطات (${list.length})</p>
      </div>
    </div>

    <div class="studio_grid"></div>

    <div class="studio_modal" style="display:none;">
      <div class="studio_modal_top">
        <button class="modal_close">إغلاق</button>
        <div class="modal_zoom">
          <button class="zoom_out">−</button>
          <span class="zoom_level">100%</span>
          <button class="zoom_in">+</button>
          <button class="zoom_reset">إعادة</button>
        </div>
      </div>

      <div class="studio_modal_body">
        <div class="zoom_stage">
          <img class="modal_img" src="" draggable="false">
        </div>
      </div>
    </div>
  `;

  const grid = qs(".studio_grid");
  if(!grid) return;

  if(!list.length){
    grid.innerHTML = `<div class="studio_empty">لا توجد صور.</div>`;
    return;
  }

  list.forEach((src,i) => {
    const card = document.createElement("div");
    card.classList.add("studio_card");
    card.innerHTML = `
      <img src="${src}">
      <div class="studio_badge">لقطة ${i+1}</div>
    `;
    card.addEventListener("click", () => openModal(src));
    grid.appendChild(card);
  });

  const modal = qs(".studio_modal");
  const modalImg = qs(".modal_img");
  const zoomTxt = qs(".zoom_level");
  const closeBtn = qs(".modal_close");
  const zoomInBtn = qs(".zoom_in");
  const zoomOutBtn = qs(".zoom_out");
  const zoomResetBtn = qs(".zoom_reset");
  const stage = qs(".zoom_stage");

  let scale = 1;
  let pos = { x:0, y:0 };
  let isPanning = false;
  let start = { x:0, y:0 };
  const minScale = 1, maxScale = 4;

  function apply(){
    if(!modalImg || !zoomTxt) return;
    modalImg.style.transform = `translate(${pos.x}px,${pos.y}px) scale(${scale})`;
    zoomTxt.textContent = Math.round(scale*100) + "%";
  }

  function reset(){
    scale = 1;
    pos = { x:0, y:0 };
    apply();
  }

  function openModal(src){
    if(!modal || !modalImg) return;
    modalImg.src = src;
    modal.style.display = "flex";
    reset();
  }

  function closeModal(){
    if(!modal || !modalImg) return;
    modal.style.display = "none";
    modalImg.src = "";
  }

  if(closeBtn) closeBtn.addEventListener("click", closeModal);

  if(modal){
    modal.addEventListener("click", (e) => {
      if(e.target.classList.contains("studio_modal")) closeModal();
    });
  }

  if(zoomInBtn) zoomInBtn.addEventListener("click", () => { scale = Math.min(maxScale, scale + 0.25); apply(); });
  if(zoomOutBtn) zoomOutBtn.addEventListener("click", () => { scale = Math.max(minScale, scale - 0.25); apply(); });
  if(zoomResetBtn) zoomResetBtn.addEventListener("click", reset);

  if(stage){
    stage.addEventListener("mousedown", (e) => {
      isPanning = true;
      start.x = e.clientX - pos.x;
      start.y = e.clientY - pos.y;
    });

    window.addEventListener("mousemove", (e) => {
      if(!isPanning) return;
      pos.x = e.clientX - start.x;
      pos.y = e.clientY - start.y;
      apply();
    });

    window.addEventListener("mouseup", () => { isPanning = false; });

    stage.addEventListener("touchstart", (e) => {
      if(!e.touches || e.touches.length !== 1) return;
      isPanning = true;
      start.x = e.touches[0].clientX - pos.x;
      start.y = e.touches[0].clientY - pos.y;
    }, { passive:true });

    stage.addEventListener("touchmove", (e) => {
      if(!isPanning || !e.touches || e.touches.length !== 1) return;
      pos.x = e.touches[0].clientX - start.x;
      pos.y = e.touches[0].clientY - start.y;
      apply();
    }, { passive:true });

    stage.addEventListener("touchend", () => { isPanning = false; });

    stage.addEventListener("wheel", (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.15 : 0.15;
      scale = Math.min(maxScale, Math.max(minScale, scale + delta));
      apply();
    }, { passive:false });
  }
}

function openReviewHtml(url){
  setCurrentView(lastLessonViewFn || goBackView);

  if(!url){ alert("review.html غير موجود"); return; }

  classremove();
  change_Page.innerHTML = "";
  change_Page.classList.add("review_view");

  change_Page.innerHTML = `
    <div style="padding:0;margin:0;height:100vh">
      <iframe src="${url}" style="border:0;width:100%;height:100%"></iframe>
    </div>
  `;
}

/* =========================================
   استرجاع الدرس المحدد بعد الرجوع من صفحة مستقلة
========================================= */
function restoreLessonIfNeeded() {
  setFooterActive(0);
  hide(".proFile");
  hide(".views");
  const shouldReturn = localStorage.getItem("return_to_lesson");

  // إذا لا توجد علامة رجوع للدرس، لا نفعل شيئًا
  if (shouldReturn !== "1") return false;

  const subjectIndex = parseInt(localStorage.getItem("return_subject_index"), 10);
  const unitIndex = parseInt(localStorage.getItem("return_unit_index"), 10);
  const lessonIndex = parseInt(localStorage.getItem("return_lesson_index"), 10);
  let lessonTitle = localStorage.getItem("return_lesson_title") || "";

  // إذا البيانات ناقصة أو غير صحيحة
  if (
    Number.isNaN(subjectIndex) ||
    Number.isNaN(unitIndex) ||
    Number.isNaN(lessonIndex)
  ) {
    localStorage.removeItem("return_to_lesson");
    return false;
  }

  // إذا اسم الدرس غير محفوظ، نستخرجه من قاعدة المواد
  if (!lessonTitle) {
    lessonTitle =
      schoolSubjects?.[subjectIndex]?.units?.[unitIndex]?.lessons?.[lessonIndex] || "";
  }

  // نحذف العلامة حتى لا يتكرر الفتح في كل مرة
  localStorage.removeItem("return_to_lesson");

  // فتح نفس الدرس المحدد مباشرة
  openLessonView(subjectIndex, unitIndex, lessonIndex, lessonTitle);

  return true;
}

/* =======================================================================================
   13) Start App
======================================================================================= */

function startApp(){
  if(!window.change_Page){
    console.log("change_Page not found!");
    return;
  }

  softNavigate(() => {
    // نحاول أولًا استرجاع الدرس المحدد
    const restored = restoreLessonIfNeeded();

    // إذا لا يوجد درس محفوظ نفتح الصفحة الرئيسية
    if (!restored) {
      renderSubjectsHome();
    }
  }, 100);
}

document.addEventListener("DOMContentLoaded", startApp);