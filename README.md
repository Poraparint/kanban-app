# 📌 โครงการ Kanban Board

โปรเจคนี้เป็นการทำข้อสอบ (Take-home assignment) โดยพัฒนาโปรแกรมระบบ **Kanban Board** พื้นฐาน

---

## 🛠 Tech Stack
- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [TailwindCSS](https://tailwindcss.com/) (UI)

---

## 🚀 วิธีการติดตั้งและใช้งาน

### 1. โคลนโปรเจค
```bash
git clone <repo-url>
cd <project-folder>
2. ติดตั้ง Dependencies
bash
คัดลอก
แก้ไข
npm install
# หรือ
yarn install
3. ตั้งค่า Environment Variables
สร้างไฟล์ .env ที่ root ของโปรเจค โดยดูตัวอย่างจาก .env.example

ค่าที่จำเป็น:

env
คัดลอก
แก้ไข
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
NEXTAUTH_SECRET="your-random-secret"
สามารถสร้างค่า NEXTAUTH_SECRET ได้ด้วยคำสั่ง

bash
คัดลอก
แก้ไข
openssl rand -base64 32
4. ตั้งค่า Prisma
bash
คัดลอก
แก้ไข
npx prisma migrate dev
npx prisma generate
5. รันโปรเจค
bash
คัดลอก
แก้ไข
npm run dev
จากนั้นเปิดในเบราว์เซอร์: http://localhost:3000

✅ ฟีเจอร์ที่ทำเสร็จแล้ว
Authentication

Login / Register

Board

สร้าง / แสดง

Column

สร้าง / แสดง

Task

สร้าง / แสดง

เพิ่มผู้รับผิดชอบ (Assignee)

Members

Invite Member เข้าร่วมบอร์ด

⏳ ฟีเจอร์ที่ยังไม่เสร็จ
เนื่องจากเวลาจำกัด (อยู่ในช่วงการเรียน จึงจัดสรรเวลามาทำได้ไม่เต็มที่) ทำให้ฟีเจอร์ด้านล่างยังไม่สมบูรณ์:

Board / Column / Task

Update

Delete

สิทธิการเข้าถึง (Authorization)

การกำหนดสิทธิ CRUD ของสมาชิกที่ถูกเชิญ

Task

ปรับตำแหน่ง (Drag & Drop)

Optional Topics

ทั้งหมด

📝 หมายเหตุ
งานนี้ ยังไม่เสร็จสมบูรณ์ทุกหัวข้อ ตามที่โจทย์กำหนด

อย่างไรก็ตามได้พัฒนาฟีเจอร์หลักที่จำเป็น ได้แก่:

ระบบล็อกอิน / สมัครสมาชิก

การสร้างบอร์ด / คอลัมน์ / งาน

การเชิญสมาชิกเข้าสู่บอร์ด

การกำหนดผู้รับผิดชอบงาน (Task Assignee)

