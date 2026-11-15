import { FormEvent, useEffect, useState } from "react";
import logo from "./assets/logo.webp";
import blockImg from "./assets/projects/block.webp";
import interlockImg from "./assets/projects/interlock.webp";
import ductingImg from "./assets/projects/ducting.webp";
import basementImg from "./assets/projects/basement.webp";
import concreteImg from "./assets/projects/concrete.webp";
import gypsumImg from "./assets/projects/gypsum.webp";
import paintingImg from "./assets/projects/painting.webp";
import demolitionImg from "./assets/projects/demolition.webp";
import plumbingImg from "./assets/projects/plumbing.webp";
import weldingImg from "./assets/projects/welding.webp";

type Lang = "ar" | "en";

const icons: Record<string, React.ReactNode> = {
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  building: (
    <>
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
    </>
  ),
  bolt: <path d="m13 2-9 12h7l-1 8 9-12h-7z" />,
  droplet: <path d="M12 22a7 7 0 0 0 7-7c0-5-7-13-7-13S5 10 5 15a7 7 0 0 0 7 7z" />,
  wind: (
    <>
      <path d="M17.7 7.7A2.5 2.5 0 1 0 15.5 4M9.6 4H2M12.6 19.4A2.5 2.5 0 1 0 14.8 16H2M17.5 12H2" />
    </>
  ),
  paint: (
    <>
      <path d="M14.6 3.3a4.6 4.6 0 0 1 6.1 6.1L7.6 22.5l-6.1-6.1Z" />
      <path d="m13.5 4.5 6 6M7.5 16.5l-3-3" />
    </>
  ),
  shield: <path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3z" />,
  cctv: (
    <>
      <path d="m14.7 6.3 1 3-9.2 3.1-1-3zM2 20h20M9 12l1.5 4M17 9l2.5 7M15 20v-4H8v4" />
    </>
  ),
  spark: (
    <>
      <path d="m12 3-1.9 5.1L5 10l5.1 1.9L12 17l1.9-5.1L19 10l-5.1-1.9z" />
      <path d="M5 3v4M3 5h4M19 17v4M17 19h4" />
    </>
  ),
  broom: (
    <>
      <path d="m3 21 8-8M14.5 3.5l6 6-8 8-6-6zM4 15l5 5" />
    </>
  ),
  menu: (
    <>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </>
  ),
  close: (
    <>
      <path d="M18 6 6 18M6 6l12 12" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.3 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
  ),
  arrow: (
    <>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </>
  ),
  check: <path d="m20 6-11 11-5-5" />,
  map: (
    <>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z" />
      <circle cx="12" cy="10" r="2" />
    </>
  ),
  mail: (
    <>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-10 7L2 7" />
    </>
  ),
};

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

const copy = {
  ar: {
    nav: ["الرئيسية", "خدماتنا", "مشاريعنا", "من نحن", "تواصل معنا"],
    quote: "اطلب عرض سعر",
    eyebrow: "شريكك الموثوق في قطر",
    hero: "نبني بإتقان،\nونخدم بثقة.",
    heroText:
      "حلول متكاملة للمقاولات والصيانة والنظافة وتوفير العمالة الماهرة وغير الماهرة — بجودة نلتزم بها من البداية حتى التسليم.",
    call: "اتصل بنا",
    explore: "استكشف خدماتنا",
    experience: "+15",
    expLabel: "خدمة متخصصة",
    available: "جاهزون لخدمتكم",
    location: "النجمة، قطر",
    serviceEyebrow: "خبرات متكاملة",
    servicesTitle: "كل ما يحتاجه مشروعك، في مكان واحد",
    servicesSub:
      "فرق متخصصة لتنفيذ الأعمال المدنية والفنية وأعمال الصيانة بمهنية عالية ومرونة تناسب حجم مشروعك.",
    projectsEyebrow: "من أرض الواقع",
    projectsTitle: "أعمال نفخر بتنفيذها",
    projectsSub: "لقطات حقيقية من مواقع مشاريعنا في قطر، تعكس تنوع خبراتنا وجودة فرق التنفيذ.",
    allProjects: "جميع الأعمال",
    whyEyebrow: "لماذا مارفيلوس؟",
    whyTitle: "التزام يتجاوز تنفيذ العمل",
    whyText:
      "نضع احتياجات العميل في قلب كل مشروع. من توفير الفريق المناسب إلى متابعة أدق التفاصيل، نعمل كشريك موثوق لتحقيق نتائج تدوم.",
    reasons: [
      "عمالة ماهرة ومختارة بعناية",
      "تنفيذ مرن للمشاريع والعقود الفرعية",
      "التزام بالجودة والسلامة والمواعيد",
      "حلول متكاملة تحت إشراف واحد",
    ],
    owner: "MD Daud Uddin",
    ownerRole: "إدارة مارفيلوس للمقاولات والنظافة والخدمات",
    contactEyebrow: "ابدأ مشروعك اليوم",
    contactTitle: "لديك عمل؟ نحن جاهزون.",
    contactSub: "أخبرنا بما تحتاجه وسيتواصل معك فريقنا لمناقشة التفاصيل وتقديم الحل الأنسب.",
    name: "الاسم",
    phone: "رقم الهاتف",
    service: "الخدمة المطلوبة",
    message: "تفاصيل العمل",
    send: "إرسال عبر واتساب",
    choose: "اختر الخدمة",
    footerText: "حلول موثوقة للمقاولات والصيانة والنظافة وتوفير العمالة في دولة قطر.",
    quick: "روابط سريعة",
    contact: "بيانات التواصل",
    cr: "السجل التجاري",
    rights: "جميع الحقوق محفوظة.",
    whatsapp: "واتساب",
  },
  en: {
    nav: ["Home", "Services", "Projects", "About", "Contact"],
    quote: "Request a quote",
    eyebrow: "Your trusted partner in Qatar",
    hero: "Built with skill.\nDelivered with trust.",
    heroText:
      "Complete contracting, maintenance, cleaning, and skilled or unskilled manpower solutions — with quality from the first step to final handover.",
    call: "Call us",
    explore: "Explore our services",
    experience: "15+",
    expLabel: "Specialized services",
    available: "Ready to serve",
    location: "Najma, Qatar",
    serviceEyebrow: "Complete expertise",
    servicesTitle: "Everything your project needs, in one place",
    servicesSub:
      "Specialized teams delivering civil, technical, and maintenance work professionally, with the flexibility your project requires.",
    projectsEyebrow: "Our work",
    projectsTitle: "Work we are proud to deliver",
    projectsSub:
      "Real moments from our project sites in Qatar, reflecting our broad expertise and quality workmanship.",
    allProjects: "All work",
    whyEyebrow: "Why Marvelous?",
    whyTitle: "Commitment beyond completion",
    whyText:
      "We put the client at the heart of every project. From supplying the right team to managing every detail, we work as a trusted partner to deliver lasting results.",
    reasons: [
      "Carefully selected skilled workforce",
      "Flexible project and subcontract execution",
      "Commitment to quality, safety, and deadlines",
      "Integrated solutions under one supervision",
    ],
    owner: "MD Daud Uddin",
    ownerRole: "Management, Marvelous Contracting & Cleaning & Services",
    contactEyebrow: "Start your project today",
    contactTitle: "Have work? We are ready.",
    contactSub:
      "Tell us what you need and our team will contact you to discuss the details and recommend the right solution.",
    name: "Name",
    phone: "Phone number",
    service: "Required service",
    message: "Work details",
    send: "Send via WhatsApp",
    choose: "Choose a service",
    footerText: "Reliable contracting, maintenance, cleaning, and manpower solutions across Qatar.",
    quick: "Quick links",
    contact: "Contact details",
    cr: "C.R. Number",
    rights: "All rights reserved.",
    whatsapp: "WhatsApp",
  },
};

const services = [
  {
    icon: "users",
    ar: "توفير العمالة",
    en: "Manpower Supply",
    arDesc: "عمالة ماهرة وغير ماهرة لمختلف المشاريع والتخصصات.",
    enDesc: "Skilled and unskilled workforce for projects of every scale.",
  },
  {
    icon: "building",
    ar: "الأعمال المدنية",
    en: "Civil Works",
    arDesc: "بلوك، لياسة، خرسانة، حديد، هدم، جرانيت وكربستون.",
    enDesc: "Block, plaster, concrete, steel, demolition, granite & kerbstone.",
  },
  {
    icon: "paint",
    ar: "التشطيبات الداخلية",
    en: "Interior Finishing",
    arDesc: "بلاط، جبس، دهان، فوم وأعمال الديكور والتشطيب.",
    enDesc: "Tiles, gypsum, painting, foam, décor and finishing works.",
  },
  {
    icon: "bolt",
    ar: "الكهرباء و MEP",
    en: "Electrical & MEP",
    arDesc: "مقاولات كهربائية، سحب الكابلات وخدمات MEP المتكاملة.",
    enDesc: "Electrical contracting, cable pulling and complete MEP services.",
  },
  {
    icon: "wind",
    ar: "تكييف ومجاري الهواء",
    en: "AC Ducting",
    arDesc: "تركيب وصيانة مجاري هواء التكييف باحترافية.",
    enDesc: "Professional installation and maintenance of AC duct systems.",
  },
  {
    icon: "droplet",
    ar: "السباكة والعزل",
    en: "Plumbing & Waterproofing",
    arDesc: "أعمال السباكة والصرف والعزل المائي المتكامل.",
    enDesc: "Plumbing, drainage and complete waterproofing solutions.",
  },
  {
    icon: "shield",
    ar: "أنظمة الحريق والتحكم",
    en: "Fire & Control Systems",
    arDesc: "مكافحة وإنذار الحريق، BMS وأنظمة التحكم والإنذار.",
    enDesc: "Fire fighting, fire alarm, BMS, control and warning systems.",
  },
  {
    icon: "cctv",
    ar: "أنظمة الأمن",
    en: "Security Systems",
    arDesc: "تركيب وصيانة أنظمة كاميرات CCTV وأمن الشبكات IP.",
    enDesc: "CCTV and IP security system installation and maintenance.",
  },
  {
    icon: "spark",
    ar: "اللحام والتصنيع",
    en: "Welding Works",
    arDesc: "لحام وتصنيع وتركيب الهياكل والأعمال المعدنية.",
    enDesc: "Welding, fabrication, structural and custom metal works.",
  },
  {
    icon: "broom",
    ar: "التنظيف والصيانة",
    en: "Cleaning & Maintenance",
    arDesc: "تنظيف وصيانة مبانٍ وعقود فرعية لجميع أنواع الأعمال.",
    enDesc: "Cleaning, building maintenance and all types of subcontract work.",
  },
];

const projects = [
  { image: blockImg, ar: "أعمال البلوك واللياسة", en: "Block & plastering works" },
  { image: interlockImg, ar: "تركيب الإنترلوك", en: "Interlock installation" },
  { image: ductingImg, ar: "مجاري هواء التكييف", en: "AC ducting works" },
  { image: basementImg, ar: "أعمال القواعد والبدروم", en: "Basement & foundation" },
  { image: concreteImg, ar: "الحديد والخرسانة", en: "Steel & concrete works" },
  { image: gypsumImg, ar: "الجبس والتشطيبات", en: "Gypsum & finishing" },
  { image: paintingImg, ar: "الدهان والديكور", en: "Painting & decoration" },
  { image: demolitionImg, ar: "أعمال الهدم", en: "Demolition works" },
  { image: plumbingImg, ar: "السباكة والصرف", en: "Plumbing & drainage" },
  { image: weldingImg, ar: "اللحام والمعادن", en: "Welding & metal works" },
];

function App() {
  const [lang, setLang] = useState<Lang>("ar");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const t = copy[lang];
  const isAr = lang === "ar";
  const anchors = ["home", "services", "projects", "about", "contact"];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    document.title = isAr
      ? "مارفيلوس للمقاولات والنظافة والخدمات"
      : "Marvelous Contracting & Cleaning & Services";
  }, [lang, isAr]);

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = isAr
      ? `مرحباً، أود طلب عرض سعر.\nالاسم: ${data.get("name")}\nالهاتف: ${data.get("phone")}\nالخدمة: ${data.get("service")}\nالتفاصيل: ${data.get("message")}`
      : `Hello, I would like a quotation.\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nService: ${data.get("service")}\nDetails: ${data.get("message")}`;
    window.open(
      `https://wa.me/97431264646?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Marvelous home">
          <img src={logo} alt="Marvelous Contracting logo" />
          <span>
            <b>MARVELOUS</b>
            <small>
              {isAr ? "للمقاولات والنظافة والخدمات" : "Contracting · Cleaning · Services"}
            </small>
          </span>
        </a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Main navigation">
          {t.nav.map((item, i) => (
            <a key={item} href={`#${anchors[i]}`} onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="lang-button"
            onClick={() => setLang(isAr ? "en" : "ar")}
            aria-label="Switch language"
          >
            {isAr ? "EN" : "عربي"}
          </button>
          <a className="button button-small" href="#contact">
            {t.quote}
          </a>
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <img className="hero-image" src={concreteImg} alt="" />
          <div className="hero-shade" />
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="eyebrow light">
                <i />
                {t.eyebrow}
              </span>
              <h1>
                {t.hero.split("\n").map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h1>
              <p>{t.heroText}</p>
              <div className="hero-actions">
                <a className="button" href="tel:+97455196139">
                  <Icon name="phone" size={19} />
                  {t.call}
                </a>
                <a className="text-link" href="#services">
                  {t.explore}
                  <Icon name="arrow" size={19} />
                </a>
              </div>
            </div>
            <div className="hero-notes">
              <div>
                <strong>{t.experience}</strong>
                <span>{t.expLabel}</span>
              </div>
              <div>
                <span className="pulse" />
                <strong>{t.available}</strong>
                <span>{t.location}</span>
              </div>
            </div>
          </div>
          <div className="scroll-mark">
            <span />
            <small>SCROLL</small>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <i />
                {t.serviceEyebrow}
              </span>
              <h2>{t.servicesTitle}</h2>
            </div>
            <p>{t.servicesSub}</p>
          </div>
          <div className="services-grid">
            {services.map((service, i) => (
              <article className="service-card" key={service.en}>
                <div className="service-top">
                  <span className="service-icon">
                    <Icon name={service.icon} />
                  </span>
                  <small>{String(i + 1).padStart(2, "0")}</small>
                </div>
                <h3>{service[lang]}</h3>
                <p>{isAr ? service.arDesc : service.enDesc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="projects-section" id="projects">
          <div className="section section-heading dark-heading">
            <div>
              <span className="eyebrow light">
                <i />
                {t.projectsEyebrow}
              </span>
              <h2>{t.projectsTitle}</h2>
            </div>
            <p>{t.projectsSub}</p>
          </div>
          <div className="project-grid">
            {projects.map((project, i) => (
              <button
                className={`project-card project-${i + 1}`}
                key={project.en}
                onClick={() => setActiveImage(i)}
                aria-label={project[lang]}
              >
                <img src={project.image} alt={project[lang]} loading="lazy" />
                <span className="project-overlay">
                  <small>{String(i + 1).padStart(2, "0")}</small>
                  <b>{project[lang]}</b>
                  <i>
                    <Icon name="arrow" />
                  </i>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="section why-section" id="about">
          <div className="why-visual">
            <img
              src={gypsumImg}
              alt={isAr ? "فريق مارفيلوس في موقع العمل" : "Marvelous team at work"}
              loading="lazy"
            />
            <div className="blue-card">
              <strong>100%</strong>
              <span>{isAr ? "اهتمام بالتفاصيل" : "Attention to detail"}</span>
            </div>
          </div>
          <div className="why-copy">
            <span className="eyebrow">
              <i />
              {t.whyEyebrow}
            </span>
            <h2>{t.whyTitle}</h2>
            <p>{t.whyText}</p>
            <ul>
              {t.reasons.map((reason) => (
                <li key={reason}>
                  <span>
                    <Icon name="check" size={16} />
                  </span>
                  {reason}
                </li>
              ))}
            </ul>
            <div className="owner">
              <span>MD</span>
              <div>
                <strong>{t.owner}</strong>
                <small>{t.ownerRole}</small>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-info">
            <span className="eyebrow light">
              <i />
              {t.contactEyebrow}
            </span>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactSub}</p>
            <div className="contact-list">
              <a href="https://wa.me/97431264646" target="_blank" rel="noreferrer">
                <span>
                  <Icon name="phone" />
                </span>
                <div>
                  <small>{t.whatsapp}</small>
                  <b dir="ltr">+974 3126 4646</b>
                </div>
              </a>
              <a href="tel:+97455196139">
                <span>
                  <Icon name="phone" />
                </span>
                <div>
                  <small>{isAr ? "الجوال" : "Mobile"}</small>
                  <b dir="ltr">+974 5519 6139</b>
                </div>
              </a>
              <a href="mailto:daududdin123@gmail.com">
                <span>
                  <Icon name="mail" />
                </span>
                <div>
                  <small>{isAr ? "البريد الإلكتروني" : "Email"}</small>
                  <b>daududdin123@gmail.com</b>
                </div>
              </a>
              <div>
                <span>
                  <Icon name="map" />
                </span>
                <div>
                  <small>{isAr ? "المكتب" : "Office"}</small>
                  <b>{t.location}</b>
                </div>
              </div>
            </div>
          </div>
          <form className="quote-form" onSubmit={submitQuote}>
            <div className="form-row">
              <label>
                {t.name}
                <input name="name" required />
              </label>
              <label>
                {t.phone}
                <input name="phone" type="tel" required />
              </label>
            </div>
            <label>
              {t.service}
              <select name="service" required defaultValue="">
                <option value="" disabled>
                  {t.choose}
                </option>
                {services.map((s) => (
                  <option key={s.en}>{s[lang]}</option>
                ))}
              </select>
            </label>
            <label>
              {t.message}
              <textarea name="message" rows={4} required />
            </label>
            <button className="button form-button" type="submit">
              {t.send}
              <Icon name="arrow" size={19} />
            </button>
          </form>
        </section>
      </main>

      <footer>
        <div className="footer-main">
          <div className="footer-brand">
            <img src={logo} alt="" />
            <h3>MARVELOUS</h3>
            <p>{t.footerText}</p>
          </div>
          <div>
            <h4>{t.quick}</h4>
            {t.nav.map((item, i) => (
              <a key={item} href={`#${anchors[i]}`}>
                {item}
              </a>
            ))}
          </div>
          <div>
            <h4>{t.contact}</h4>
            <a href="tel:+97455196139" dir="ltr">
              +974 5519 6139
            </a>
            <a href="https://wa.me/97431264646" dir="ltr">
              +974 3126 4646
            </a>
            <a href="mailto:daududdin123@gmail.com">daududdin123@gmail.com</a>
            <span>{t.location}</span>
            <span>{t.cr}: 107808</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Marvelous Contracting & Cleaning & Services. {t.rights}
          </span>
          <span>{t.cr}: 107808</span>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href="https://wa.me/97431264646"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
      >
        <Icon name="phone" />
      </a>
      {activeImage !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveImage(null)}
        >
          <button aria-label="Close">
            <Icon name="close" />
          </button>
          <img src={projects[activeImage].image} alt={projects[activeImage][lang]} />
          <strong>{projects[activeImage][lang]}</strong>
        </div>
      )}
    </div>
  );
}

export default App;
