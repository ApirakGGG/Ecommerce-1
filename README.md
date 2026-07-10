E-Commerce

เว็บแอปพลิเคชันอีคอมเมิร์ซที่ครบครัน สร้างด้วย Next.js 14, Prisma, Stripe และ Firebase รองรับการสมัครสมาชิก, ซื้อสินค้า, ชำระเงินออนไลน์ และระบบจัดการหลังบ้านสำหรับ Admin

---

## ✨ ฟีเจอร์หลัก

### 🧑‍💻 สำหรับผู้ใช้งาน
- สมัครสมาชิก / เข้าสู่ระบบด้วย Google OAuth หรือ Email
- ค้นหาและกรองสินค้าตามหมวดหมู่
- เพิ่มสินค้าลงตะกร้า, ปรับจำนวน, ลบสินค้า
- ชำระเงินผ่าน Stripe (บัตรเครดิต/เดบิต)
- ดูประวัติคำสั่งซื้อและสถานะการจัดส่ง
- ให้คะแนนและรีวิวสินค้า

### ⚙️ สำหรับ Admin
- Dashboard สรุปยอดขาย, ผู้ใช้, และคำสั่งซื้อ
- จัดการสินค้า: เพิ่ม, แก้ไข, ลบ
- จัดการคำสั่งซื้อและสถานะการจัดส่ง
- จัดการผู้ใช้ในระบบ
- กราฟแสดงยอดขายรายเดือน

---

## 🛠️ เทคโนโลยีที่ใช้

| เทคโนโลยี | รายละเอียด |
|-----------|-----------|
| [Next.js 14](https://nextjs.org/) | App Router, Server Components |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe codebase |
| [Prisma](https://www.prisma.io/) | ORM สำหรับ MongoDB |
| [MongoDB](https://www.mongodb.com/) | ฐานข้อมูล |
| [NextAuth.js](https://next-auth.js.org/) | Authentication (Google OAuth + Credentials) |
| [Stripe](https://stripe.com/) | ระบบชำระเงิน |
| [Firebase](https://firebase.google.com/) | จัดเก็บรูปภาพสินค้า |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [React Hook Form](https://react-hook-form.com/) | จัดการฟอร์ม |
| [React Hot Toast](https://react-hot-toast.com/) | การแจ้งเตือน |

---

## 🚀 การติดตั้งและรันโปรเจกต์

### ข้อกำหนดเบื้องต้น
- Node.js >= 18
- Yarn หรือ npm
- บัญชี MongoDB Atlas
- บัญชี Stripe (Test Mode)
- บัญชี Firebase
- บัญชี Google Cloud (สำหรับ OAuth)

### 1. Clone โปรเจกต์

```bash
git clone https://github.com/ApirakGGG/Ecommerce-1.git
cd Ecommerce-1
```

### 2. ติดตั้ง dependencies

```bash
yarn install
# หรือ
npm install
```

### 3. ตั้งค่าไฟล์ `.env`

สร้างไฟล์ `.env` ที่ root directory แล้วกรอกค่าต่อไปนี้:

```env
# Database
DATABASE_URL="mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY="..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="..."
NEXT_PUBLIC_FIREBASE_PROJECT_ID="..."
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="..."
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="..."
NEXT_PUBLIC_FIREBASE_APP_ID="..."
```

> ⚠️ **อย่า** commit ไฟล์ `.env` ขึ้น GitHub เด็ดขาด — ตรวจสอบให้แน่ใจว่า `.gitignore` มี `.env` อยู่แล้ว

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. รันโปรเจกต์

```bash
yarn dev
# หรือ
npm run dev
```


---

## 🔗 Stripe Webhook (สำหรับ Local Development)

เพื่อให้ระบบอัปเดตสถานะ order หลังชำระเงินสำเร็จ ต้องรัน Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

จากนั้นนำ `whsec_...` ที่ได้จาก CLI ไปใส่ใน `STRIPE_WEBHOOK_SECRET` ใน `.env`

---

## 📁 โครงสร้างโปรเจกต์

```
├── app/
│   ├── admin/              # หน้า Admin Dashboard
│   │   ├── add-products/   # เพิ่มสินค้า
│   │   ├── manage-orders/  # จัดการคำสั่งซื้อ
│   │   ├── manage-products/# จัดการสินค้า
│   │   └── User-Mange/     # จัดการผู้ใช้
│   ├── api/                # API Routes
│   │   ├── create-payment-intent/
│   │   ├── product/
│   │   ├── order/
│   │   └── register/
│   ├── cart/               # หน้าตะกร้าสินค้า
│   ├── checkout/           # หน้าชำระเงิน
│   ├── order/              # รายละเอียดคำสั่งซื้อ
│   ├── orders/             # ประวัติคำสั่งซื้อ
│   └── product/            # หน้ารายละเอียดสินค้า
├── actions/                # Server Actions
├── hooks/                  # Custom React Hooks
├── libs/                   # Prisma, Firebase config
├── pages/api/              # NextAuth & Stripe Webhook
├── prisma/
│   └── schema.prisma       # Database Schema
├── providers/              # Context Providers
└── untils/                 # Utility functions & constants
```

---

## 👤 บัญชี Admin

หากต้องการเข้าใช้งานหน้า Admin ให้เปลี่ยน `role` ของ user ใน MongoDB เป็น `"ADMIN"` ด้วยตนเอง หรือตั้งค่าในขั้นตอน seed ข้อมูล

---

## 📝 License

โปรเจกต์นี้เป็นโปรเจกต์เพื่อการศึกษา

---
