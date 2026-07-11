# E-Commerce Web Application

เว็บแอปพลิเคชันอีคอมเมิร์ซแบบครบวงจร (Full-stack E-commerce Application) ประสิทธิภาพสูง สร้างขึ้นด้วยสถาปัตยกรรมที่ทันสมัย รองรับการจัดการผู้ใช้งาน, ระบบตะกร้าสินค้า, การชำระเงินออนไลน์อย่างปลอดภัย และมีระบบหลังบ้าน (Admin Dashboard) สำหรับจัดการข้อมูลคลังสินค้าและคำสั่งซื้ออย่างเป็นระบบ

---

## ✨ ฟีเจอร์หลัก (Key Features)

### 🧑‍💻 สำหรับผู้ใช้งานทั่วไป (Customer Features)
- **ระบบสมาชิก (Authentication)**: สมัครสมาชิกและเข้าสู่ระบบได้อย่างปลอดภัย รองรับทั้งการเข้าสู่ระบบด้วย Email/Password และ Google OAuth
- **การเลือกชมสินค้า (Product Browsing)**: ค้นหาและกรองสินค้าตามหมวดหมู่ได้ พร้อมหน้าแสดงรายละเอียดสินค้าอย่างชัดเจน
- **ระบบตะกร้าสินค้า (Shopping Cart)**: เพิ่มสินค้าลงตะกร้า, ปรับเปลี่ยนจำนวน, และลบสินค้าออกจากตะกร้าได้แบบ Real-time
- **ระบบชำระเงิน (Checkout & Payment)**: ชำระเงินออนไลน์อย่างปลอดภัยผ่านระบบ Stripe (รับรองบัตรเครดิต/เดบิต) พร้อมการคำนวณราคาสุทธิ
- **ประวัติการสั่งซื้อ (Order History)**: ค้นหาข้อมูลคำสั่งซื้อของตนเองและติดตามสถานะการจัดส่งได้
- **ระบบรีวิว (Review System)**: ผู้ใช้สามารถให้คะแนนและเขียนรีวิวสินค้าที่เคยสั่งซื้อไปแล้วได้เพื่อเป็นข้อมูลให้ผู้ใช้ท่านอื่น

### ⚙️ สำหรับแอดมิน (Admin Features)
- **ภาพรวมและสถิติ (Admin Dashboard)**: หน้า Dashboard สรุปยอดขายรวม, จำนวนผู้ใช้งาน, จำนวนคำสั่งซื้อ และแสดงกราฟยอดขายรายเดือน (ด้วย Chart.js)
- **จัดการสินค้า (Product Management)**: เพิ่มสินค้าใหม่, อัปโหลดรูปภาพสินค้า (ผ่าน Firebase Storage), แก้ไขรายละเอียดสินค้า, และลบสินค้าในระบบ
- **จัดการคำสั่งซื้อ (Order Management)**: ตรวจสอบรายการคำสั่งซื้อของลูกค้าทั้งหมด และปรับเปลี่ยนสถานะการจัดส่ง (เช่น Dispatch, Delivered) 
- **จัดการผู้ใช้งาน (User Management)**: เรียกดูรายชื่อผู้เข้าใช้งานระบบ และสามารถจัดการสิทธิ์ผู้ใช้

---

## 🛠️ รายละเอียดเทคโนโลยีที่ใช้งาน (Tech Stack & Libraries)

โปรเจกต์นี้ถูกพัฒนาขึ้นมาด้วยเทคโนโลยีที่ทันสมัย (Modern Web Technologies) ผสมผสานเครื่องมือยอดนิยม เพื่อให้แอปพลิเคชันทำงานได้อย่างรวดเร็ว ปลอดภัย และดูแลรักษาได้ง่ายในระยะยาว

### 1. ฝั่งหน้าบ้าน (Frontend / Client-side)
- **[Next.js 14](https://nextjs.org/)**: React Framework หลักในการพัฒนา ใช้สถาปัตยกรรมล่าสุดอย่าง App Router และ Server Components ทำให้เว็บไซต์โหลดเร็วและดีต่อ SEO
- **[React 18](https://react.dev/)**: ไลบรารีหลักสำหรับการสร้าง UI Components ให้ทำงานอย่างรวดเร็ว
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS Framework สำหรับจัดการความสวยงามและ Layout แบบ Responsive สไตล์โมเดิร์น เขียนแต่ง CSS ได้อย่างรวดเร็ว
- **[Material UI (MUI)](https://mui.com/)**: ใช้ในการพัฒนาในบางส่วนของหน้า Admin Dashboard เช่น `@mui/x-data-grid` สำหรับจัดการการแสดงตารางข้อมูลที่ซับซ้อน รองรับการกรอง (Sorting) หรือแบ่งหน้า (Pagination)
- **[React Hook Form](https://react-hook-form.com/)**: ไลบรารีสำหรับจัดการฟอร์มกรอกข้อมูลต่างๆ ในโปรเจกต์ เช่น หน้าล็อกอิน หรือเพิิ่มสินค้า ช่วยอัปเดตสเตทแบบมีประสิทธิภาพ แบกรับตัว Validation ที่ทรงพลัง
- **[React Hot Toast](https://react-hot-toast.com/)**: จัดการการแจ้งเตือน (Notifications / Alerts) บนหน้าจอให้ผู้ใช้รับทราบสถานะการทำงานต่างๆ เช่น โชว์คำว่า "เพิ่มสินค้าสำเร็จ" 
- **[Chart.js](https://www.chartjs.org/) & [react-chartjs-2](https://react-chartjs-2.js.org/)**: ซอฟต์แวร์พลอตกราฟ Data Visualization บนแผงหน้าแอดมิน โชว์สถิติยอดขายได้อย่างสวยงาม

### 2. ฝั่งหลังบ้าน (Backend / Server-side)
- **Next.js API Routes / Server Actions**: ใช้สำหรับการสร้างฝั่ง Backend และการจัดการ Request อย่างปลอดภัย เพื่อเชื่อมต่อระหว่างหน้าบ้านกับฐานข้อมูล
- **[Prisma](https://www.prisma.io/)**: ORM (Object-Relational Mapping) ที่ยอดเยี่ยมและมี Type-safe ขั้นสุดสำหรับการติดต่อกับฐานข้อมูล ช่วยลดเวลางมบั๊กจาก Code completion และความปลอดภัยระดับ Database
- **[MongoDB](https://www.mongodb.com/)**: ฐานข้อมูลประเภท NoSQL ใช้สำหรับเก็บข้อมูลทั้งหมดในโปรเจกต์อย่างรวดเร็วและยืดหยุ่น (ใช้ผ่าน Prisma)
- **[NextAuth.js](https://next-auth.js.org/)**: จัดการระบบการยืนยันตัวตน (Authentication) แบบสำเร็จรูปและทรงพลัง รองรับทั้งการเข้าด้วยอีเมล/รหัสผ่านปกติ (Credentials) และแบบ Google OAuth
- **[Stripe](https://stripe.com/)**: แพลตฟอร์มรับชำระเงินระดับโลก เชื่อมต่อ API เพื่อตัดบัตรเครดิตลูกค้า และใช้ฟีเจอร์ Webhook เพื่อคอยรับข้อมูลและอัพเดทสถานะการชำระเงินกับฐานข้อมูลแบบ Real-time
- **[Firebase Storage](https://firebase.google.com/)**: พื้นที่รับฝากไฟล์บนคลาวด์ จัดการอัปโหลดไฟล์รูปภาพของสินค้าเพื่อนำมาแสดงบนหน้าเว็บ
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)**: ใช้สำหรับเข้ารหัส (Hashing) รหัสผ่านของผู้ใช้งานก่อนบันทึกลงฐานข้อมูล เพื่อความปลอดภัยขั้นสูงสุด

### 3. เครื่องมือเสริมและไลบรารีอื่นๆ (Tools & Utilities)
- **TypeScript**: โปรเจกต์นี้เปิดใช้งาน TypeScript อย่างเต็มรูปแบบ เพื่อลดจุดบกพร่องของโค้ดให้เหลือน้อยที่สุด (Type safety) ควบคุมประเภทของตัวแปรต่างๆ อย่างแน่นอน สร้างคุณภาพในโค้ดระยะยาว
- **Moment.js**: ไลบรารีช่วยสำหรับทำการจัดรูปแบบ (Date formatting) สิ่งต่างๆ ที่เกี่ยวกับวันที่และเวลา ให้อ่านง่าย เช่น '2 hours ago'
- **React Dropzone**: ตัวช่วยสำหรับการทำกล่อง Drag-and-drop ในการอัปโหลดไฟล์ หรือเลือกรูปภาพในขั้นตอนการเพิ่มสินค้า
- **Resend / Nodemailer**: ระบบสำหรับส่งอีเมล (เช่น แจ้งเตือนผู้ใช้งานเมื่อลืมรหัส)

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
