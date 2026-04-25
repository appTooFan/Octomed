/* =========================
   1) Data: Adds list
========================= */
let data_List_Settings = [
{
  img:"user",
  h1:"الحساب الشخصي"
},
{
  img:"edit-2",
  h1:"تعديل البيانات"
},
{
  img:"message-circle",
  h1:"تواصل معنا للشكاوي او الأخطاء"
},
{
  img:"help-circle",
  h1:"مساعده"
},
{
  img:"share-2",
  h1:"مشاركة التطبيق"
},
{
  img:"info",
  h1:"لمحه عن المبرمج"
}
];
/* =========================
   2) Render settings screen
========================= */
function renderSettings() {
  // ✅ اجعل الرجوع يرجع للشاشة السابقة (اللي كانت محفوظة قبل الدخول)
  // لو ما كان محفوظ شيء يرجع للـ goBackView
  if (typeof setCurrentView === "function") {
    // لا نغير currentView هنا، لأننا داخل شاشة جديدة
    // الرجوع من adds يتم عبر goBackView الذي سيستدعي الشاشة السابقة المخزنة
    setCurrentView(renderSettings)
  }

  classremove();
  

  change_Page.innerHTML = "";
  hide(".views");

  change_Page.classList.add("settings");
 const hash = window.location.hash;
      const settingsMatch = hash.match(/^#\/settings/);
      if(!settingsMatch)
  {
    history.pushState({page:"settings"},"",`#/settings`)
    
  } 
  // container = change_Page نفسه لأنه يحمل class adds الآن
  const container = change_Page;
container.innerHTML="<h1 class='h1setting'>الاعدادات</h1>"
  data_List_Settings.forEach((item, i) => {
    const card = document.createElement("div");
    card.classList.add("div_Items");

    const badge =
      item.new === true ? "جديد" :
      item.new === "soon" ? "قريباً" :
      "";

    card.innerHTML += `
      <img src="img/settings/black/${item.img}.svg">
      <h1>${item.h1}</h1>
    `;

    // ✅ ربط الضغط حسب رقم العنصر
    card.addEventListener("click", () => {
      if (i === 0) softNavigate(openInfoUser, 300);
      if (i === 2) softNavigate(openInfoFlySection, 300);
      // باقي الأقسام أنت توسعها لاحقاً
    });

    container.appendChild(card);
  });
}







/* =========================
   3) Footer binding (Adds button)
   - footerdiv[3] في كودك القديم
========================= */
(function bindFooterAdds(){
  // حاول نستخدم global footerdiv لو موجود
  let f = window.footerdiv;

  // لو غير موجود، نحاول نلتقطه من DOM
  if (!f || !f.length) {
    f = _qsa(".footer .img");
  }

  // إن لم يوجد Footer اخرج
  if (!f || !f.length) return;

  // زر الإضافات غالباً هو رقم 3 (مثل كودك)
  const settingsBtn = f[3];
  if (!settingsBtn) return;

  settingsBtn.addEventListener("click", function(){
    // ✅ مهم: قبل الدخول لشاشة الإضافات احفظ الصفحة الحالية للرجوع
    setFooterActive(3)
    renderSettings()
  });
})();
/* =========================
   4) Section: infoUser
========================= */
function openInfoUser() {
   // ✅ الرجوع من المعلومة يرجع لقائمة الإضافات
  if (typeof setCurrentView === "function") setCurrentView(renderSettings);
  const hash = window.location.hash;
      const newsMatch = hash.match(/^#\/settings/);
      if(!newsMatch)
  {
    history.pushState({page:"settings"},"",`#/settings`)
    
  } 
  classremove();
  change_Page.innerHTML = "";
  change_Page.classList.add("info_Profile");
  change_Page.innerHTML=` 
  <h1 class="h1_Profile">الحساب الشخصي</h1>
      <div class="info_Profile_Img">
        <img src="img/settings/imgsetting/card.svg">
        <h1>202510101455</h1>
      </div>
      <div class="info_Profile_UserName">
        <div class="first">الاسم :</div>
        <div class="last">علي امير الشهاري</div>
      </div>
      <div class="info_Profile_Created_Date">
      <div class="first">تاريخ الانضمام :</div>
      <div class="last">${localStorage.getItem("createdDate")}</div>  
      </div>
      <div class="Exp_Date">
      <div class="first">تاريخ الانتهاء :</div>
      <div class="last">غير محدود الى الأبد</div>
      </div>
        `;
}