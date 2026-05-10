export type InterestId =
  | "ml"
  | "nlp"
  | "cv"
  | "ethics"
  | "genai"
  | "robotics"
  | "data"
  | "edge"
  | "rl"
  | "mlops";

export type MemberRole = {
  en: string;
  th: string;
};

export type Member = {
  id: string;
  name: { th: string; en: string };
  nickname: { th: string; en: string };
  role: MemberRole;
  motto: { th: string; en: string };
  bio: { th: string; en: string };
  email: string;
  github: string;
  linkedin: string;
  interests: InterestId[];
  initials: string;
  photoUrl?: string;
};

export const INTEREST_DEFS: Record<
  InterestId,
  { en: string; th: string; tone: string; glyph: string }
> = {
  ml: { en: "Machine Learning", th: "แมชชีนเลิร์นนิง", tone: "orange", glyph: "*" },
  nlp: { en: "Natural Language Processing", th: "การประมวลผลภาษา", tone: "slate", glyph: "\"" },
  cv: { en: "Computer Vision", th: "คอมพิวเตอร์วิชัน", tone: "slate-l", glyph: "o" },
  ethics: { en: "AI Ethics", th: "จริยธรรม AI", tone: "orange-d", glyph: "A" },
  genai: { en: "Generative AI", th: "เจเนอเรทีฟ AI", tone: "slate", glyph: "+" },
  robotics: { en: "Robotics", th: "หุ่นยนต์", tone: "orange", glyph: "#" },
  data: { en: "Data Science", th: "วิทยาการข้อมูล", tone: "slate-l", glyph: "::" },
  edge: { en: "Edge AI", th: "AI บนอุปกรณ์", tone: "orange-d", glyph: "^" },
  rl: { en: "Reinforcement Learning", th: "การเรียนรู้แบบเสริมกำลัง", tone: "slate", glyph: "R" },
  mlops: { en: "MLOps", th: "MLOps", tone: "orange", glyph: "M" },
};

const ROLES = {
  fe: { en: "Frontend Developer", th: "นักพัฒนาส่วนหน้า" },
  be: { en: "Backend Developer", th: "นักพัฒนาส่วนหลัง" },
  fs: { en: "Full-stack Developer", th: "นักพัฒนาฟูลสแตก" },
  ml: { en: "ML Engineer", th: "วิศวกร ML" },
  ds: { en: "Data Scientist", th: "นักวิทยาการข้อมูล" },
  ux: { en: "UX Designer", th: "นักออกแบบ UX" },
  ops: { en: "DevOps Engineer", th: "วิศวกร DevOps" },
  mob: { en: "Mobile Developer", th: "นักพัฒนาแอปมือถือ" },
  res: { en: "AI Researcher", th: "นักวิจัย AI" },
  pm: { en: "Product Manager", th: "ผู้จัดการผลิตภัณฑ์" },
  qa: { en: "QA Engineer", th: "วิศวกรทดสอบ" },
  sec: { en: "Security Engineer", th: "วิศวกรความปลอดภัย" },
  cloud: { en: "Cloud Engineer", th: "วิศวกรคลาวด์" },
  lead: { en: "Tech Lead", th: "หัวหน้าทีมเทคนิค" },
};

function member(
  id: string,
  nameTh: string,
  nameEn: string,
  nickTh: string,
  nickEn: string,
  role: keyof typeof ROLES,
  mottoTh: string,
  mottoEn: string,
  bioTh: string,
  bioEn: string,
  interests: InterestId[],
  initials: string,
): Member {
  const handle = nickEn.toLowerCase().replace(/\s+/g, "");

  return {
    id,
    name: { th: nameTh, en: nameEn },
    nickname: { th: nickTh, en: nickEn },
    role: ROLES[role],
    motto: { th: mottoTh, en: mottoEn },
    bio: { th: bioTh, en: bioEn },
    email: `${handle}@exp.dev`,
    github: `github.com/${handle}`,
    linkedin: `linkedin.com/in/${handle}`,
    interests,
    initials,
  };
}

// Temporary local data. Later this can be replaced by a Google Sheets or database adapter
// that returns the same Member[] shape to the page.
export async function getMembers(): Promise<Member[]> {
  return MEMBERS;
}

export const MEMBERS: Member[] = [
  member("EXP-001", "ปกรณ์ วงศ์ศิริ", "Pakorn Wongsiri", "ตาร์", "Tar", "lead", "เขียนโค้ดทุกบรรทัดให้คนอื่นอ่านง่ายกว่าตัวเอง", "Write every line so it reads easier for someone else than for you.", "หัวหน้าทีมเทคนิค EXP รุ่นก่อตั้ง สนใจสถาปัตยกรรมระบบและการสอนรุ่นน้อง", "Founding tech lead at EXP. Cares about clean architecture and mentoring juniors.", ["ml", "mlops", "ethics"], "ปว"),
  member("EXP-002", "นิรมล สุขสันต์", "Niramon Sooksan", "มล", "Mol", "ds", "ข้อมูลไม่ได้โกหก คนอ่านต่างหากที่ต้องระวัง", "Data doesn't lie. The people reading it should be careful, though.", "ทำงานวิเคราะห์ข้อมูลและ visualization สำหรับโครงการชุมชน", "Analyst and visualization lead for community-impact projects.", ["data", "ml", "ethics"], "นส"),
  member("EXP-003", "ธนภัทร แก้วใจ", "Tanapat Kaewjai", "บอส", "Boss", "be", "Latency คือศัตรูตัวจริงของผู้ใช้", "Latency is the real enemy of every user.", "ดูแลบริการหลังบ้าน Go + Postgres ชอบเรื่อง observability", "Backend in Go + Postgres. Big into observability.", ["data", "mlops"], "ธก"),
  member("EXP-004", "ชนิสรา พิมพ์ทอง", "Chanitsara Pimthong", "เอิร์น", "Earn", "ux", "การออกแบบที่ดีคือสิ่งที่คนใช้ไม่รู้สึกว่ามันมีอยู่", "Good design is what users never notice.", "นักออกแบบประสบการณ์ผู้ใช้ เน้น accessibility และการเล่าเรื่อง", "UX designer focused on accessibility and storytelling.", ["genai", "ethics"], "ชพ"),
  member("EXP-005", "กิตติภพ ใจดี", "Kittipop Jaidee", "ต้น", "Ton", "fe", "Pixel ทุกตัวมีหน้าที่ของมัน", "Every pixel has a job to do.", "นักพัฒนาส่วนหน้า React/Next.js ชอบ animation และ design system", "Frontend on React/Next.js. Loves motion and design systems.", ["genai", "cv"], "กจ"),
  member("EXP-006", "อลิษา รัตนพล", "Alisa Ratanaphol", "ลิซ่า", "Lisa", "res", "งานวิจัยที่ดีต้องตอบคำถามใหม่ ไม่ใช่ตอบคำถามเดิมให้สวยขึ้น", "Good research opens new questions, not just polishes old answers.", "นักวิจัย AI สนใจ multimodal models และ low-resource languages", "AI researcher into multimodal models and low-resource languages.", ["nlp", "genai", "rl"], "อร"),
  member("EXP-007", "สรวิชญ์ มณีวัฒน์", "Sorawit Maneewat", "วิน", "Win", "ml", "โมเดลที่ deploy ไม่ได้คือกระดาษเปล่า", "A model you cannot deploy is just a piece of paper.", "ML Engineer ดูแล pipeline จาก notebook ถึง production", "ML engineer running the pipeline from notebook to production.", ["ml", "mlops", "edge"], "สม"),
  member("EXP-008", "ภัทราวดี เจริญสุข", "Pattarawadee Charoensook", "เป้", "Pae", "pm", "อย่าแก้ปัญหาที่ไม่มีใครมี", "Do not solve problems no one actually has.", "Product Manager ดูแล roadmap และความสัมพันธ์กับลูกค้า", "Product manager, owns the roadmap and customer conversations.", ["data", "ethics"], "ภจ"),
  member("EXP-009", "ณัฐวุฒิ พุ่มไพศาล", "Nattawut Phumpaisarn", "ณัฐ", "Nat", "ops", "Infrastructure ที่ดีคือสิ่งที่คนลืมว่ามันอยู่ตรงนั้น", "Good infra is the kind people forget exists.", "DevOps ดูแล Kubernetes และระบบ CI/CD ทั่วองค์กร", "DevOps, running the Kubernetes fleet and org-wide CI/CD.", ["mlops", "edge"], "ณพ"),
  member("EXP-010", "พิชญ์สินี อุดมสุข", "Pichsinee Udomsook", "พิม", "Pim", "fe", "อะไรที่กดได้ ต้องดูเหมือนกดได้", "Anything that can be tapped should look tappable.", "Frontend สาย design-engineer สนใจ generative UI", "Frontend and design-engineer exploring generative UI.", ["genai", "cv"], "พอ"),
  member("EXP-011", "รวิชญ์ จิรพัฒน์", "Rawit Jirapat", "วิช", "Vit", "mob", "อย่าให้ผู้ใช้เลื่อนถ้าไม่จำเป็น", "Do not make the user scroll if they do not have to.", "Mobile developer สาย Flutter ดูแลแอปสำหรับ field ops", "Mobile developer in Flutter, building field-ops apps.", ["edge", "cv"], "รจ"),
  member("EXP-012", "กัญญาวีร์ ศรีสมุทร", "Kanyaweer Srisamut", "มายด์", "Mind", "ds", "ตัวเลขสวยกว่าที่ตา หาเรื่องน่าจะมีอะไรผิด", "Numbers prettier than they should be? Probably wrong.", "Data scientist สนใจ causal inference และการประเมินนโยบาย", "Data scientist into causal inference and policy evaluation.", ["data", "ml"], "กศ"),
  member("EXP-013", "ธีรเทพ บุญชัย", "Teeratep Boonchai", "ท็อป", "Top", "sec", "ระบบที่ปลอดภัยคือระบบที่ใช้แล้วยังไม่อยากเลิก", "A secure system is one people still want to use after using it.", "Security engineer ดูแล threat modeling และ incident response", "Security engineer, threat modeling and incident response.", ["ethics", "mlops"], "ธบ"),
  member("EXP-014", "ณิชาภัทร โพธิ์ทอง", "Nichaphat Pothong", "แนน", "Nan", "fs", "Stack ดีที่สุดคือ stack ที่ทีมรู้จักดี", "The best stack is the one your team knows best.", "Full-stack สาย TypeScript ทุก layer ทำงานข้าม timezone", "Full-stack TypeScript across the layers, working across timezones.", ["genai", "mlops"], "ณพ"),
  member("EXP-015", "ภานุวัฒน์ คงคา", "Phanuwat Khongkha", "พงศ์", "Phong", "cloud", "ค่า cloud bill คือ feedback loop ที่ตรงไปตรงมาที่สุด", "The cloud bill is the most honest feedback loop you will ever get.", "Cloud engineer ดูแล multi-region deployment บน AWS+GCP", "Cloud engineer running multi-region deployments on AWS and GCP.", ["mlops", "data"], "ภค"),
  member("EXP-016", "ปุณยวีร์ สุวรรณ", "Punyaweer Suwan", "ปัน", "Punn", "qa", "Bug ที่หายากคือ bug ที่ลูกค้าจะหาเจอก่อนเรา", "The bug you cannot find is the one your user will.", "QA engineer เน้น automation และ chaos testing", "QA, automation and chaos testing.", ["mlops"], "ปส"),
  member("EXP-017", "กฤตภาส อินทรา", "Krittaphat Intra", "กิต", "Kit", "ml", "Train เสียเวลา 80% Tune เสียเวลา 20% และเสียใจ 100%", "Training: 80% of time. Tuning: 20%. Regret: 100%.", "ML engineer สนใจ recommender systems", "ML engineer focused on recommender systems.", ["ml", "rl", "data"], "กอ"),
  member("EXP-018", "มนัสนันท์ ทองสุก", "Manatsanan Thongsuk", "นันท์", "Nun", "res", "ความรู้ที่ไม่ถูกตั้งคำถาม ก็แค่ความเชื่อ", "Knowledge that is not questioned is just belief.", "นักวิจัย NLP สนใจภาษาไทยและภาษาในภูมิภาค", "NLP researcher, Thai and other regional languages.", ["nlp", "ethics"], "มท"),
  member("EXP-019", "วรากร วิเชียร", "Worakorn Wichian", "เวฟ", "Wave", "fe", "Animation 200ms คือเวลาที่คนตัดสินว่าใช้งานได้หรือไม่", "200ms is when users decide whether your UI works.", "Frontend สาย motion ทำ data-viz เชิง interactive", "Frontend and motion. Builds interactive data-viz.", ["genai", "data"], "วว"),
  member("EXP-020", "ศุภณัฐ พงศ์ภัค", "Suphanat Pongphak", "เกม", "Game", "be", "ฐานข้อมูลที่ดีคือฐานข้อมูลที่อธิบาย business ได้", "A good database describes the business.", "Backend engineer ดูแล search infra และ event sourcing", "Backend, search infra and event sourcing.", ["data", "mlops"], "ศพ"),
  member("EXP-021", "พรนภัส เรืองรอง", "Pornnaphat Ruangrong", "แพรว", "Praew", "ux", "ฟอนต์ผิดทำลายเหตุผลที่ดีได้ทุกข้อ", "The wrong typeface can wreck every good argument.", "UX/UI designer สาย typography และ cross-cultural design", "UX/UI, typography and cross-cultural design.", ["genai", "ethics"], "พร"),
  member("EXP-022", "ภคพร อินทร์ทอง", "Phakaphon Inthong", "แบม", "Bam", "mob", "Battery คือ UX ที่มองไม่เห็น", "Battery is the UX you do not see.", "Mobile dev สาย Swift/Kotlin ทำงาน on-device ML", "Mobile dev with Swift/Kotlin shipping on-device ML.", ["edge", "cv", "ml"], "ภอ"),
  member("EXP-023", "ธัญชนก ขุนทอง", "Tanyachanok Khunthong", "ออม", "Aom", "pm", "Roadmap ที่ใครๆ ก็แก้ได้คือ roadmap ที่ใช้งานจริง", "A roadmap anyone can edit is the roadmap that actually works.", "Product manager สนใจ growth และ international expansion", "Product manager, growth and international expansion.", ["data", "ethics"], "ธข"),
  member("EXP-024", "กันต์ฤทัย จันทร์เพ็ญ", "Kanruethai Janpen", "ฝ้าย", "Fai", "ds", "Visualization ที่ดีต้องเปลี่ยนใจคน ไม่ใช่ยืนยันใจคน", "Good visualization changes minds. It does not just confirm them.", "Data scientist เน้น communication และ storytelling", "Data scientist, communication and storytelling first.", ["data", "genai"], "กจ"),
  member("EXP-025", "ณัฐภัทร สิงห์โต", "Nattaphat Singto", "โอม", "Ohm", "ops", "ถ้า deploy แล้วต้องอยู่ดึก ก็ deploy ผิดเวลา", "If deploy means staying up late, you are deploying at the wrong time.", "DevOps ดูแล observability stack และ on-call rotation", "DevOps, observability stack and on-call rotation.", ["mlops"], "ณส"),
  member("EXP-026", "ธิดารัตน์ ภู่ทอง", "Tidarat Phuthong", "จูน", "June", "fs", "Code review คือของขวัญที่ใช้เวลาห่อ", "A code review is a gift. It just takes time to wrap.", "Full-stack developer และ tech writer ภายในทีม", "Full-stack developer doubling as the team's tech writer.", ["genai", "nlp"], "ธภ"),
  member("EXP-027", "อภิสิทธิ์ ศรีสุข", "Apisit Srisuk", "เบสท์", "Best", "res", "งานที่สำคัญที่สุดของวิจัยคือถามให้ถูก", "The most important job of research is asking the right question.", "AI researcher สนใจ alignment และ interpretability", "AI researcher into alignment and interpretability.", ["ethics", "ml", "rl"], "อศ"),
  member("EXP-028", "นพรุจ ปานเทศ", "Noppharot Pannate", "นิค", "Nick", "sec", "Trust ไม่มี default value", "Trust has no default value.", "Security engineer ทำ red team และ secure-by-design review", "Security engineer running red team and secure-by-design reviews.", ["ethics"], "นป"),
  member("EXP-029", "กชกร เกตุแก้ว", "Kotchakorn Ketkaew", "แคท", "Kat", "fe", "UI ที่เข้าใจตัวเองคือ UI ที่ผู้ใช้เข้าใจ", "A UI that understands itself is one users understand.", "Frontend developer ดูแล design system ขององค์กร", "Frontend developer maintaining the org-wide design system.", ["genai", "cv"], "กก"),
  member("EXP-030", "ชยุตม์ ทรงเดช", "Chayut Songdet", "ยู", "Yu", "ml", "ทุกโมเดลผิด มีบางตัวที่มีประโยชน์", "All models are wrong. Some are useful.", "ML engineer ดูแล forecasting และ time-series", "ML engineer on forecasting and time-series.", ["ml", "data", "rl"], "ชท"),
];
