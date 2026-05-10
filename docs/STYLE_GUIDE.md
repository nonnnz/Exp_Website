# Style Guide

แนวทางการออกแบบและ styling ของโปรเจกต์

## 🎨 Design Principles

- **ทางการ (Formal):** ดีไซน์สะอาด เรียบง่าย เหมาะสำหรับโชว์ผลงาน
- **Responsive:** รองรับ Desktop, Tablet, Mobile
- **Consistent:** ใช้ spacing, typography, color อย่างสม่ำเสมอ
- **Accessible:** ใช้ contrast ratio ที่อ่านง่าย

## 📐 Layout

- **Max Width:** `max-w-7xl` (1280px) สำหรับ content area
- **Padding:** `px-4 sm:px-6 lg:px-8` responsive padding
- **Section Spacing:** `py-16` ถึง `py-20` ระหว่าง sections

## 🔤 Typography

- **Font Family:** Inter (Google Fonts)
- **Headings:**
  - H1: `text-4xl md:text-5xl font-bold` (หน้า header)
  - H2: `text-3xl font-bold` (section titles)
  - H3: `text-xl font-semibold` (card titles)
- **Body:** `text-base` (16px default)
- **Small:** `text-sm` (14px)

## 📦 Components

### Navbar
- Sticky top, z-50
- Background: Primary color
- Logo: Accent color, bold
- Links: White, hover effect
- Mobile: Hamburger menu

### Footer
- Background: Primary color
- 3-column grid layout
- Links hover: Accent color

### Cards
- Background: White
- Border: `border-blue-100`
- Rounded: `rounded-lg`
- Hover: `hover:shadow-lg`
- Transition: `transition-shadow duration-200`

### Buttons
- Primary: `bg-primary text-white hover:bg-primary-dark`
- Accent: `bg-accent text-white hover:bg-accent-dark`
- Outline: `border-2 border-accent text-accent hover:bg-accent hover:text-white`

### Page Headers
- Background: Primary color
- Text: White
- Subtitle: `text-blue-200`
- Padding: `py-20`

## 🖼️ Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `gap-4` | 16px | ปุ่มระหว่างกัน |
| `gap-6` | 24px | Card grid gap |
| `gap-8` | 32px | Section grid gap |
| `mb-4` | 16px | หลัง icon/image |
| `mb-6` | 24px | หลัง heading |
| `mb-12` | 48px | หลัง section title |
