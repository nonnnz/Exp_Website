# Portfolio Website

เว็บไซต์ Portfolio สำหรับโชว์ผลงาน สร้างด้วย Next.js 14 + React + TypeScript + Tailwind CSS

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Frontend:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Font:** Inter (Google Fonts)

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Layout หลัก (Navbar + Footer)
│   ├── globals.css           # Global styles + Tailwind
│   ├── page.tsx              # Home
│   ├── about/page.tsx        # About Us
│   ├── members/page.tsx      # Members
│   ├── gallery/page.tsx      # Gallery
│   ├── recognition/page.tsx  # Recognition
│   ├── clip/page.tsx         # Clip
│   └── other/page.tsx        # Other
└── components/
    ├── Navbar.tsx             # Navigation (responsive)
    └── Footer.tsx             # Footer
```

## 📄 Pages

| หน้า | Path | รายละเอียด |
|------|------|------------|
| Home | `/` | หน้าแรก Hero section + highlights |
| About Us | `/about` | เกี่ยวกับเรา, Mission, Values |
| Members | `/members` | สมาชิกในทีม |
| Gallery | `/gallery` | แกลเลอรีผลงาน/กิจกรรม |
| Recognition | `/recognition` | รางวัลและการยอมรับ |
| Clip | `/clip` | วิดีโอคลิป |
| Other | `/other` | ข้อมูลเพิ่มเติม |

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

เปิด [http://localhost:3000](http://localhost:3000) เพื่อดูผลลัพธ์

## 📝 Notes

- Responsive design รองรับทุกขนาดหน้าจอ
- Sticky navigation bar พร้อม hamburger menu บน mobile
- Static site generation (SSG) ทุกหน้า
- สามารถปรับเปลี่ยนข้อมูลสมาชิก, รางวัล, คลิป ได้ในแต่ละ page file
