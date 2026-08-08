"use client";

import { createContext, useContext } from "react";

export type Lang = "en" | "ar";

const LangContext = createContext<Lang>("en");

export function LangProvider({
  value,
  children,
}: {
  value: Lang;
  children: React.ReactNode;
}) {
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

type Dict = Record<string, { en: string; ar: string }>;

export const t: Dict = {
  navAbout: { en: "About", ar: "نبذة" },
  navSkills: { en: "Skills", ar: "المهارات" },
  navProjects: { en: "Projects", ar: "المشاريع" },
  navLeadership: { en: "Leadership", ar: "القيادة" },
  navCredentials: { en: "Honors", ar: "التكريمات" },
  navResume: { en: "Résumé", ar: "السيرة" },
  navContact: { en: "Contact", ar: "تواصل" },

  heroEyebrow: { en: "jeddah, saudi arabia — information systems", ar: "جدة، السعودية — نظم المعلومات" },
  heroName: { en: "Remass Ashmawi", ar: "ريماس عشماوي" },
  heroHeadline1: { en: "Building at the intersection", ar: "أبني عند تقاطع" },
  heroHeadline2: { en: "of code, strategy, and research.", ar: "الكود، الاستراتيجية، والبحث." },
  heroBody: {
    en: "Information Systems student at KAU running a startup through the INJAZ competition, contributing to genomics research at KAUST, and building frontend features for the Oracle Student Club.",
    ar: "طالبة نظم معلومات في جامعة الملك عبدالعزيز، أدير شركة ناشئة ضمن مسابقة إنجاز، وأساهم في بحث جيني في جامعة كاوست، وأطوّر واجهات أمامية لنادي أوراكل الطلابي.",
  },
  heroCtaProjects: { en: "View projects", ar: "المشاريع" },
  heroCtaContact: { en: "Get in touch", ar: "تواصل معي" },

  aboutEyebrow: { en: "About", ar: "نبذة عني" },
  aboutLede: {
    en: "I'm an Information Systems student at King Abdulaziz University — an Honor Student with a 4.69/5.00 GPA — who splits time between leading a startup, contributing to genomics research, and shipping frontend code.",
    ar: "أنا طالبة نظم معلومات في جامعة الملك عبدالعزيز — طالبة متفوقة بمعدل 4.69/5.00 — أوزّع وقتي بين قيادة شركة ناشئة، والمساهمة في بحث جيني، وتطوير واجهات أمامية.",
  },
  aboutBody: {
    en: "As CEO of GreenLedger I'm running venture strategy through the INJAZ Entrepreneurship Competition. At KAUST, I contributed to an RNA-Seq analysis of a TDP-43 knockout model — genuinely different work from anything web-related, and a reminder that the same analytical habits transfer across domains. And on the Oracle Student Club's frontend team, I get to keep building interfaces — in the same stack this site runs on. I care about doing the unglamorous parts of leadership and research properly, not just the parts that photograph well.",
    ar: "بصفتي الرئيسة التنفيذية لشركة GreenLedger، أدير استراتيجية المشروع ضمن مسابقة إنجاز لريادة الأعمال. في كاوست، ساهمت في تحليل RNA-Seq لنموذج معطّل الجين TDP-43 — عمل مختلف تمامًا عن أي شيء متعلق بالويب، وتذكير بأن نفس العادات التحليلية تنتقل بين المجالات. وفي فريق الواجهات الأمامية لنادي أوراكل الطلابي، أواصل بناء الواجهات — بنفس التقنيات التي يعمل بها هذا الموقع. أهتم بإتقان الجوانب غير البرّاقة من القيادة والبحث، لا فقط ما يبدو جميلًا في الصور.",
  },
  statLocation: { en: "Location", ar: "الموقع" },
  statUniversity: { en: "University", ar: "الجامعة" },
  statGPA: { en: "GPA", ar: "المعدل" },
  statGrad: { en: "Expected Graduation", ar: "التخرج المتوقع" },
  statLanguages: { en: "Languages", ar: "اللغات" },
  valLocation: { en: "Jeddah, Saudi Arabia", ar: "جدة، السعودية" },
  valUniversity: { en: "King Abdulaziz University", ar: "جامعة الملك عبدالعزيز" },
  valLanguages: { en: "Arabic · English", ar: "العربية · الإنجليزية" },

  skillsEyebrow: { en: "Skills", ar: "المهارات" },
  skillsSubtitle: { en: "Grouped by where each one actually gets used.", ar: "مصنّفة حسب مكان استخدامها الفعلي." },

  projectsEyebrow: { en: "Projects", ar: "المشاريع" },
  projectsSubtitle: { en: "Open one like you'd open a file.", ar: "افتح أحدها كما تفتح ملفًا." },

  leadershipEyebrow: { en: "Leadership & Growth", ar: "القيادة والنمو" },
  leadershipSubtitle: { en: "What each chapter actually taught me.", ar: "ما تعلمته فعليًا من كل مرحلة." },

  credentialsEyebrow: { en: "Honors & Certifications", ar: "التكريمات والشهادات" },
  credentialsSubtitle: { en: "4.69/5.00 GPA, Honor Student — and the credentials behind it.", ar: "معدل 4.69/5.00، طالبة متفوقة — وهذه الشهادات التي تقف خلف ذلك." },
  kindHonor: { en: "Honor", ar: "تكريم" },
  kindCertification: { en: "Certification", ar: "شهادة" },
  kindEducation: { en: "Education", ar: "تعليم" },

  extrasTitle: { en: "Languages", ar: "اللغات" },
  extrasSubtitle: { en: "What I can work and communicate in.", ar: "اللغات التي أعمل وأتواصل بها." },

  resumeEyebrow: { en: "Résumé", ar: "السيرة الذاتية" },
  resumeSubtitle: { en: "The full picture, in one PDF.", ar: "الصورة الكاملة، في ملف PDF واحد." },
  resumeBlurb: {
    en: "Everything on this site — education, projects, leadership, and honors — in a single, up-to-date document you can keep, print, or forward.",
    ar: "كل ما في هذا الموقع — التعليم والمشاريع والقيادة والتكريمات — في مستند واحد محدّث يمكنك حفظه أو طباعته أو إرساله.",
  },
  resumeDownload: { en: "Download résumé (PDF)", ar: "تحميل السيرة الذاتية (PDF)" },
  resumeOpen: { en: "Open in new tab", ar: "فتح في تبويب جديد" },

  contactEyebrow: { en: "Contact", ar: "تواصل" },
  contactSubtitle: { en: "Building something worth talking about? Reach out directly, or send a note below — I read every message myself.", ar: "هل تعمل على شيء يستحق الحديث عنه؟ تواصل معي مباشرة، أو أرسل رسالة أدناه — أقرأ كل رسالة بنفسي." },
  contactChannels: { en: "Prefer a direct channel? Reach out through any of these.", ar: "تفضّل التواصل المباشر؟ استخدم أيًا من هذه القنوات." },
  formName: { en: "Name", ar: "الاسم" },
  formEmail: { en: "Email", ar: "البريد الإلكتروني" },
  formMessage: { en: "Message", ar: "الرسالة" },
  formSend: { en: "Send message", ar: "إرسال الرسالة" },
  formSent: { en: "Sent — thank you", ar: "تم الإرسال — شكرًا لك" },

  footer: { en: "built by remass — press ⌘K to explore", ar: "صُمم بواسطة ريماس — اضغط ⌘K للاستكشاف" },

  cmdSearch: { en: "Search", ar: "بحث" },
  cmdPlaceholder: { en: "Jump to a section, project, or action…", ar: "انتقل إلى قسم أو مشروع أو إجراء…" },
  cmdNoResults: { en: "No results found.", ar: "لا توجد نتائج." },
  cmdNavigate: { en: "Navigate", ar: "تنقّل" },
  cmdProjectsGroup: { en: "Projects", ar: "المشاريع" },
  cmdActions: { en: "Actions", ar: "إجراءات" },
  cmdToggleLight: { en: "Toggle light mode", ar: "التبديل إلى الوضع الفاتح" },
  cmdToggleDark: { en: "Toggle dark mode", ar: "التبديل إلى الوضع الداكن" },
  cmdDownloadResume: { en: "Download résumé", ar: "تحميل السيرة الذاتية" },
  cmdOpenGitHub: { en: "Open GitHub", ar: "فتح GitHub" },
  cmdOpenLinkedIn: { en: "Open LinkedIn", ar: "فتح LinkedIn" },
  cmdOpenX: { en: "Open X", ar: "فتح X" },
  navHome: { en: "Home", ar: "الرئيسية" },

  lblLearned: { en: "Learned", ar: "ما تعلمته" },
  lblResponsibilities: { en: "Responsibilities", ar: "المسؤوليات" },
  lblAchievement: { en: "Achievement", ar: "الإنجاز" },
  lblActive: { en: "active", ar: "نشط" },

  lblProblem: { en: "Problem", ar: "المشكلة" },
  lblSolution: { en: "Solution", ar: "الحل" },
  lblChallenges: { en: "Challenges", ar: "التحديات" },
  lblOutcome: { en: "Outcome", ar: "النتيجة" },
  lblImpact: { en: "Impact", ar: "الأثر" },
  lblCode: { en: "Code", ar: "الكود" },
  lblLiveDemo: { en: "Live demo", ar: "عرض مباشر" },

  groupLanguages: { en: "Languages", ar: "اللغات" },
  groupFrontendWeb: { en: "Frontend & Web", ar: "الواجهات الأمامية والويب" },
  groupTools: { en: "Tools & Platforms", ar: "الأدوات والمنصات" },
  groupProfessional: { en: "Professional & Leadership", ar: "المهارات المهنية والقيادية" },
  lblConfidenceOf5: { en: "confidence", ar: "مستوى الإتقان" },

  tipEmail: { en: "Email", ar: "البريد الإلكتروني" },
  tipGitHub: { en: "GitHub", ar: "GitHub" },
  tipLinkedIn: { en: "LinkedIn", ar: "LinkedIn" },
  tipX: { en: "X", ar: "X" },
  tipResume: { en: "Download résumé", ar: "تحميل السيرة الذاتية" },

  arabicDesc: { en: "Mother tongue — everyday, written, and spoken.", ar: "اللغة الأم — في الحديث والكتابة اليومية." },
  englishDesc: { en: "Fluent — academic, professional, and technical work.", ar: "بطلاقة — للعمل الأكاديمي والمهني والتقني." },
};

export function tr(key: keyof typeof t, lang: Lang) {
  return t[key][lang];
}

export function categoryLabel(category: string, lang: Lang) {
  if (category === "Language") return tr("groupLanguages", lang);
  if (category === "Frontend" || category === "Web") return tr("groupFrontendWeb", lang);
  if (category === "Tools") return tr("groupTools", lang);
  if (category === "Professional") return tr("groupProfessional", lang);
  return category;
}
