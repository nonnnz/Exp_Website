export type InterestId = string;

export type MemberRole = {
  en: string;
  th: string;
};

export type Member = {
  id: string;
  timestamp?: string;
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
  cvUrl?: string;
  videoUrl?: string;
};

export const INTEREST_DEFS: Record<
  string,
  { en: string; th: string; tone: string; glyph: string }
> = {
  "machine learning": { en: "Machine Learning", th: "แมชชีนเลิร์นนิง", tone: "orange", glyph: "ML" },
  ml: { en: "Machine Learning", th: "แมชชีนเลิร์นนิง", tone: "orange", glyph: "ML" },
  nlp: { en: "NLP", th: "การประมวลผลภาษา", tone: "slate", glyph: "NLP" },
  "natural language processing": { en: "Natural Language Processing", th: "การประมวลผลภาษา", tone: "slate", glyph: "NLP" },
  cv: { en: "Computer Vision", th: "คอมพิวเตอร์วิชัน", tone: "slate-l", glyph: "CV" },
  "computer vision": { en: "Computer Vision", th: "คอมพิวเตอร์วิชัน", tone: "slate-l", glyph: "CV" },
  "generative ai": { en: "Generative AI", th: "เจเนอเรทีฟ AI", tone: "slate", glyph: "GEN" },
  rag: { en: "RAG", th: "RAG", tone: "orange-d", glyph: "RAG" },
  llm: { en: "LLM", th: "LLM", tone: "orange", glyph: "LLM" },
  "deep learning": { en: "Deep Learning", th: "ดีปเลิร์นนิง", tone: "slate", glyph: "DL" },
  dl: { en: "Deep Learning", th: "ดีปเลิร์นนิง", tone: "slate", glyph: "DL" },
  mlops: { en: "MLOps", th: "MLOps", tone: "orange", glyph: "OPS" },
  robotics: { en: "Robotics", th: "หุ่นยนต์", tone: "orange", glyph: "ROB" },
  "data science": { en: "Data Science", th: "วิทยาการข้อมูล", tone: "slate-l", glyph: "DATA" },
  "ai agents": { en: "AI Agents", th: "AI Agents", tone: "orange-d", glyph: "AG" },
};

const SHEET_ID = "1OTDJzXn-x7Zj3XdIeyiM3iDefNhpXMv1S_XaOCQlbYA";
const SHEET_GID = "1842186075";
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

const HEADERS = {
  timestamp: "ประทับเวลา",
  id: "รหัสประจำตัวโครงการ",
  nameTh: "ชื่อ นามสกุล (ไม่ต้องใส่คำนำหน้า)",
  nameEn: "ชื่อ นามสกุล (ภาษาอังกฤษ) ไม่ต้องใส่คำนำหน้า",
  nicknameTh: "ชื่อเล่น",
  nicknameEn: "ชื่อเล่น (ภาษาอังกฤษ)",
  motto: "คติประจำตัว",
  interests: "ความสนใจด้าน AI ให้ตอบและเว้นวรรคด้วยเครื่องหมายลูกน้ำ (,) เช่น RAG, NLP",
  cvUrl: "CV (ตั้งชื่อไฟล์เป็นรหัสประจำตัวโครงการ Super AI)",
  videoUrl: "link คลิปวิดีโอที่ส่งตอนสมัครโครงการ Super AI",
};

function parseCsv(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = "";
  let inQuotes = false;

  for (let index = 0; index < csv.length; index += 1) {
    const char = csv[index];
    const next = csv[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      value += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(value);
      value = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(value);
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      value = "";
      continue;
    }

    value += char;
  }

  row.push(value);
  if (row.some((cell) => cell.trim())) rows.push(row);

  return rows;
}

function getCell(row: Record<string, string>, header: string) {
  return (row[header] ?? "").trim();
}

function splitInterests(value: string): string[] {
  return value
    .split(",")
    .map((interest) => interest.trim())
    .filter(Boolean);
}

function makeInitials(nameTh: string, nameEn: string, fallback: string) {
  const thaiParts = nameTh.trim().split(/\s+/).filter(Boolean);
  if (thaiParts.length >= 2) return `${thaiParts[0][0] ?? ""}${thaiParts[1][0] ?? ""}`;

  const englishParts = nameEn.trim().split(/\s+/).filter(Boolean);
  if (englishParts.length >= 2) return `${englishParts[0][0] ?? ""}${englishParts[1][0] ?? ""}`.toUpperCase();

  return fallback.slice(-2);
}

function rowToMember(row: Record<string, string>, index: number): Member | null {
  const id = getCell(row, HEADERS.id);
  const nameTh = getCell(row, HEADERS.nameTh);
  const nameEn = getCell(row, HEADERS.nameEn);

  if (!id || (!nameTh && !nameEn)) return null;

  const nicknameTh = getCell(row, HEADERS.nicknameTh);
  const nicknameEn = getCell(row, HEADERS.nicknameEn);
  const motto = getCell(row, HEADERS.motto);
  const interests = splitInterests(getCell(row, HEADERS.interests));
  const displayId = id || `MEMBER-${String(index + 1).padStart(3, "0")}`;

  return {
    id: displayId,
    timestamp: getCell(row, HEADERS.timestamp),
    name: {
      th: nameTh || nameEn,
      en: nameEn || nameTh,
    },
    nickname: {
      th: nicknameTh || nicknameEn || "-",
      en: nicknameEn || nicknameTh || "-",
    },
    role: {
      th: "สมาชิกโครงการ Super AI",
      en: "Super AI Member",
    },
    motto: {
      th: motto || "กำลังอัปเดตข้อมูล",
      en: motto || "Profile details are being updated.",
    },
    bio: {
      th: "ข้อมูลสมาชิกถูกดึงจาก Google Sheet ของทีม",
      en: "Member profile loaded from the team Google Sheet.",
    },
    email: "",
    github: "",
    linkedin: "",
    interests,
    initials: makeInitials(nameTh, nameEn, displayId),
    cvUrl: getCell(row, HEADERS.cvUrl),
    videoUrl: getCell(row, HEADERS.videoUrl),
  };
}

export async function getMembers(): Promise<Member[]> {
  try {
    const response = await fetch(SHEET_CSV_URL, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`Google Sheets request failed: ${response.status}`);
    }

    const csv = await response.text();
    const [headerRow, ...dataRows] = parseCsv(csv);
    const headers = headerRow.map((header) => header.trim());

    return dataRows
      .map((cells, index) => {
        const row = Object.fromEntries(headers.map((header, cellIndex) => [header, cells[cellIndex] ?? ""]));
        return rowToMember(row, index);
      })
      .filter((member): member is Member => member !== null);
  } catch (error) {
    console.error(error);
    return [];
  }
}
