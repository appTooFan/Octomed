/*****************************************************************************************
 * home.core.js  (NO jQuery)
 * - Core DOM refs + footer UI + views slider + homeinnerhtml
 * - Must load BEFORE app.github.js
 *****************************************************************************************/

/* =========================
   1) Global main container
========================= */
window.change_Page = document.querySelector("#change_Page");

/* =========================
   2) Utility: remove page classes
   - Reset container classes
   - Show profile area if exists
========================= */
window.classremove = function classremove() {
  if (!window.change_Page) return;
  change_Page.className = "";

  // قد لا تكون موجودة في بعض الصفحات
  const pro = document.querySelector(".proFile");
  if (pro) pro.style.display = "grid";
};

/* =========================
   3) Footer active logic (بدون jQuery)
   - يعتمد على HTML حقك: .footer .img
========================= */
(function initFooter() {
  const footerItems = document.querySelectorAll(".footer .img");
  if (!footerItems || !footerItems.length) return;

  // فعل الأول افتراضيًا
  const first = document.querySelector(".footer .img1");
  if (first) {
    first.style.borderTop = "5px solid var(--app-color)";
    const img = first.querySelector("div img");
    if (img) img.src = `img/footer/black/0active.svg`;
  }

  footerItems.forEach((item, ind) => {
    item.onclick = function () {
      footerItems.forEach((ele, idx) => {
        ele.style.borderTop = "1px solid var(--borderFooter-color)";
        const icon = ele.querySelector("img");
        if (icon) icon.src = `img/${idx}.svg`;
      });

      this.style.borderTop = "5px solid var(--app-color)";
      const icon = this.querySelector("img");
      if (icon) icon.src = `img/footer/black/${ind}active.svg`;

      localStorage.setItem("onback", ind);
    };
  });
})();

/* =========================
   4) Views slider (images + text)
========================= */
(function initViewsSlider() {
  const photoviews = [
    { img: "1views",  text: "التطبيق مجاني بالكامل ولاتدفع ولا حتى ريال" },
    { img: "2views",  text: "التطبيق الوحيد على مستوى الجمهوريه يوفر لك كل شي مجاني وبأفضل كفاءه " },
    { img: "3views",  text: "يوجد في تطبيق الطوفان كل ماتحتاجه " },
    { img: "4views",  text: "معنا لااسهل من الكيمياء" },
    { img: "5views",  text: "معنا لا اسهل من رياضيات مع الطوفان كل شي سهل" },
    { img: "6views",  text: " مع الطوفان تحقق افضل درجات وتحطم كل مراكز" },
    { img: "7views",  text: "مع الطوفان لااسهل من فيزياء ستكون معنا نيوتن" },
    { img: "8views",  text: "معنا كل تطبيقات الموجوده غير تطبيقنا موجوده هنا مثل تطبيق اطلس" },
    { img: "9views",  text: "كل شيء في قمت الوضوح شرح بالفديو اختبارات تمارين" },
    { img: "10views", text: "تطبيق الطوفان شامل كل التطبيقات" },
    { img: "11views", text: "تطبيق الطوفان مدرسه في جيبك" },
    { img: "12views", text: "معنا دراسه بالراحه متى شئت" },
    { img: "13views", text: "مع تطبيق الطوفان الرياضيات كالعبه" },
    { img: "14views", text: "مع تطبيق الطوفان ستحصل على افضل الشهادات" },
    { img: "15views", text: "تطبيق الطوفان مفتاح تسهيل ثالث ثانوي" },
    { img: "16views", text: "لاتقلق وتقول هذه السنه صعبه مع طوفان من ابسط سنين دراستك" },
    { img: "17views", text: "لا يوجد شيئ أسمه الفشل، بل هو فرصة للتعلم " },
    { img: "18views", text: " الفشل هو مجموعة تجارب تسبق النجاح " },
    { img: "19views", text: " بدل ان تلعن الظلام اوقد شمعة " },
    { img: "20views", text: " الارادة القوية تقصر المسافات" },
    { img: "21views", text: "الوقت من ذهب إن لم تدركه ذهب" },
    { img: "22views", text: "احذر ان تكون أهدافك مجرد أمنيات.. أو رغبات.. فتلك بضاعة الفقراء " },
    { img: "23views", text: "الأسباب الخمسة للنجاح : التركيز، التميز، التنظيم، التطوير، والتصميم " },
    { img: "24views", text: "أربع خطط للإنجاز : خطط، حضر، نفذ، تابع . " },
    { img: "25views", text: " اذا أردت أن تحلم فلتكن أحلامك عظيمة " },
    { img: "26views", text: "غيٌر أفكارك لتتمكن من تغيير العالم" },
    { img: "27views", text: "رحلة الألف ميل تبدأ بخطوة واحدة" },
    { img: "28views", text: "ان من لا يواجه التحديات، لا يعمل شيئا" },
    { img: "29views", text: "النجاح هو القيام بالأعمال العادية بطريقة غير عادية" },
    { img: "30views", text: "إن النجاح لا يحتاج إلى أقدام بل إلى إقدام" },
    { img: "31views", text: " النجاح هو الإنتقال من فشل إلى فشل، دون أن نفقد الأمل" },
    { img: "32views", text: " فن أن تكون مرة شجاعاً ومرة حذراً هو فن النجاح" },
    { img: "33views", text: " النجاح هو القاضي الدنيوي الوحيد للصواب والخطأ" },
    { img: "34views", text: " العلم ما نفع، ليس العلم ما حفظ" },
    { img: "35views", text: " العلم هو دواء لسموم الخرافات" },
    { img: "36views", text: " التعليم ليس أستعداداً للحياة، إنه الحياة ذاتها" },
    { img: "37views", text: "لا تسأل الله ان يخفف حملك، ولكن اسأله ان يقوي ظهرك " },
    { img: "38views", text: "اذا كنت مع الله فانت مع الاغلبيه المطلقه" },
    { img: "39views", text: "اللحظة قد تغير يومك. اليوم قد يغير حياتك. حياتك قد تغير العالم" },
    { img: "40views", text: "المثابرة عامل مهم من عوامل النجاح" },
    { img: "41views", text: "الانسان الناجح هو الانسان الذي يستغل الفرص" },
    { img: "42views", text: "العمل الجاد هو الثمن الذي ندفعه مقابل النجاح" },
    { img: "43views", text: "فكرة واحدة قد تدفعك نحو النجاح" },
    { img: "44views", text: "خلف كل رجل ناجح هناك الكثير من السنوات الفاشلة" },
    { img: "45views", text: "اذا سعيت نحو أهدافك، أهدافك بدورها ستعسى نحوك" },
    { img: "46views", text: "عش في خيالك، ليس في ماضيك" },
    { img: "47views", text: "الدراسة بلا تركيز كالسفر بلا خريطة" },
    { img: "48views", text: "الدراسة بلا فهم كالبناء بلا أساس" },
    { img: "49views", text: "الفشل هو المعلم الأول للنجاح" },
    { img: "50views", text: "الدراسة هي الاستثمار الوحيد الذي لا يفقد قيمته" },
    { img: "51views", text: "الدراسة مفتاح العلم، والعلم مفتاح النجاح" },
    { img: "52views", text: "الدراسة هي الجسر الذي يعبر بك من الحلم إلى الواقع" }
  ];

  const viewsImg = document.querySelector(".views img");
  const viewsH1  = document.querySelector(".views h1");
  if (!viewsImg || !viewsH1) return;

  // أول قيمة
  viewsImg.src = `img/views/views.svg`;
  viewsH1.textContent = "كل شي معنا سهل وكل ماتحتاجه هنا";

  let idx = -1;
  setInterval(() => {
    idx++;
    if (idx >= photoviews.length) idx = 0;
    viewsImg.src = `img/views/${photoviews[idx].img}.svg`;
    viewsH1.textContent = photoviews[idx].text;
  }, 5000);
})();

/* =========================
   5) Home HTML (swiper)
========================= */
const them = "black";
window.homeinnerhtml = `
<swiper-container class="mySwiper" pagination="true">
  <swiper-slide>
    <div><img src="img/subjects/${them}/military.png"><h4>الثقافة الوطنية</h4></div>
    <div><img src="img/subjects/${them}/doctor.png"><h4>طب المجتمع</h4></div>
    <div><img src="img/subjects/${them}/abc.png"><h4>الانجليزي الطبي</h4></div>
    <div><img src="img/subjects/${them}/Biology.png"><h4>الاحياء الدقيقة</h4></div>
    <div><img src="img/subjects/${them}/biochemistry.png"><h4>الايض</h4></div>
    <div><img src="img/subjects/${them}/dna.png"><h4>الوراثه</h4></div>
    <div><img src="img/subjects/${them}/newton.png"><h4>سلوكيه والاجتماعيه</h4></div>
    <div><img src="img/subjects/${them}/flask.png"><h4>علم الحاسوب</h4></div>
    <div><img src="img/subjects/${them}/arabic-language.png"><h4>اللغه العربيه</h4></div>
  </swiper-slide>

  <swiper-slide>
    <div><img src="img/subjects/${them}/quran.png"><h4>الثقافه الإسلاميه</h4></div>
    <div><img src="img/subjects/${them}/newton.png"><h4>مهارات التعلم</h4></div>
  </swiper-slide>
</swiper-container>
`;

/* =========================
   6) Start (when DOM ready)
========================= */
document.addEventListener("DOMContentLoaded", function () {
  // لا شيء هنا غير جاهز؟ ممتاز.
  // app.github.js سيبدأ التطبيق.
});