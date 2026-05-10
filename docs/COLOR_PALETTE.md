# Color Palette

เฉดสีหลักของโปรเจกต์

---

## 🎨 Color System

### Primary — น้ำเงินเข้ม (75%)

สีหลักของเว็บไซต์ ใช้มากที่สุด

| Variant | Hex Code | Usage |
|---------|----------|-------|
| **Primary** | `#0B3D91` | Navbar, Footer, Headers, Headings, Primary buttons |
| Primary Dark | `#082D6B` | Hover states, Gradients |
| Primary Light | `#1A5BC4` | Hover backgrounds |

```css
/* Tailwind Usage */
bg-primary        /* พื้นหลัง */
text-primary      /* ตัวอักษร */
bg-primary-dark   /* hover state */
bg-primary-light  /* lighter variant */
bg-primary/10     /* 10% opacity background */
```

---

### Accent — ส้มทอง (18%)

สีรอง ใช้เน้นจุดสำคัญ

| Variant | Hex Code | Usage |
|---------|----------|-------|
| **Accent** | `#FFA630` | Logo, Badges, Category labels, CTA buttons |
| Accent Dark | `#E08A10` | Hover states |
| Accent Light | `#FFBE66` | Lighter variant |

```css
/* Tailwind Usage */
bg-accent         /* พื้นหลัง */
text-accent       /* ตัวอักษร */
bg-accent-dark    /* hover state */
border-accent     /* border */
bg-accent/10      /* 10% opacity background */
```

---

### Surface — ขาว (9%)

สีพื้นหลังเนื้อหา

| Variant | Hex Code | Usage |
|---------|----------|-------|
| **Surface** | `#FEFFFE` | Main content background |
| Surface Muted | `#F5F7FA` | Alternate section background |

```css
/* Tailwind Usage */
bg-surface        /* พื้นหลังหลัก */
bg-surface-muted  /* พื้นหลังสลับ */
```

---

### Supporting Colors

| Color | Usage |
|-------|-------|
| `text-gray-600` | Body text |
| `text-gray-500` | Secondary/muted text |
| `text-blue-200` | Subtitle text on dark backgrounds |
| `border-blue-100` | Card borders |
| `border-blue-800` | Footer divider |
| White `#FFFFFF` | Card backgrounds, text on dark |

---

## 📊 Color Proportion

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        #0B3D91 — Primary (75%)                              │
├──────────────────┬──────────┬─────────┐                                     │
│   #FFA630 (18%)  │#FEFFFE(9)│FFA630(8)│                                     │
└──────────────────┴──────────┴─────────┘─────────────────────────────────────┘
```

| สี | สัดส่วน | ตำแหน่งหลัก |
|----|---------|-------------|
| `#0B3D91` | 75% | Navbar, Footer, Page headers, Headings, Primary buttons |
| `#FFA630` | 18% | Logo, Accent buttons, Badges, Labels, Hover highlights |
| `#FEFFFE` | 9% | Content area backgrounds |
| `#FFA630` | 8% | Small details, icons, "Coming soon" labels |

---

## 🔧 Tailwind Config

```typescript
// tailwind.config.ts
colors: {
  primary: {
    DEFAULT: "#0B3D91",
    dark: "#082d6b",
    light: "#1a5bc4",
  },
  accent: {
    DEFAULT: "#FFA630",
    dark: "#e08a10",
    light: "#ffbe66",
  },
  surface: {
    DEFAULT: "#FEFFFE",
    muted: "#f5f7fa",
  },
}
```

---

## ✅ Contrast Check

| Combination | Ratio | Status |
|-------------|-------|--------|
| White text on Primary (`#0B3D91`) | ~9.5:1 | ✅ AAA |
| Primary text on White | ~9.5:1 | ✅ AAA |
| Accent (`#FFA630`) on White | ~2.3:1 | ⚠️ Large text only |
| White text on Accent | ~2.3:1 | ⚠️ Large text only |
| Accent on Primary | ~4.8:1 | ✅ AA |

> Note: สี Accent (#FFA630) ใช้กับตัวอักษรขนาดใหญ่หรือเป็น decorative element เท่านั้น
> สำหรับ body text ใช้ `text-gray-600` บนพื้นขาวเพื่อ contrast ที่ดี
