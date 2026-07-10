import Container from "@/app/components/Container";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#fdf8f3]">
      <Container>
        {/* Hero */}
        <div className="py-20 text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#a0856a] uppercase mb-4">
            เกี่ยวกับเรา
          </p>
          <h1 className="text-5xl font-black text-gray-900 mb-6 leading-tight">
            แบรนด์ที่ใส่ใจ<br />
            ทุกรายละเอียด
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            เราเชื่อว่าเสื้อผ้าที่ดีไม่ใช่แค่การแต่งตัว — แต่คือการแสดงออกถึงตัวตนของคุณ
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-[#e8ddd3] mb-20" />

        {/* Story section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24 items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#a0856a] uppercase mb-3">เรื่องราวของเรา</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-5 leading-snug">
              เริ่มต้นจากความรัก<br />ในงานดีไซน์
            </h2>
            <p className="text-gray-500 leading-8 mb-4">
              แบรนด์ของเราก่อตั้งขึ้นด้วยความตั้งใจที่จะนำเสนอเสื้อผ้าคุณภาพสูง
              ที่ออกแบบมาให้เข้าถึงได้ในราคาที่เป็นธรรม
            </p>
            <p className="text-gray-500 leading-8">
              ทุกชิ้นผ่านการคัดสรรวัสดุที่ดีที่สุด ใส่ใจในทุกรอยตะเข็บ
              เพื่อให้คุณรู้สึกมั่นใจทุกวัน
            </p>
          </div>

          {/* Visual placeholder */}
          <div className="rounded-2xl bg-gradient-to-br from-[#ede0cd] to-[#d6c4b0] aspect-[4/3] flex items-center justify-center">
            <span className="text-6xl">🧵</span>
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <p className="text-xs font-semibold tracking-widest text-[#a0856a] uppercase mb-2 text-center">
            ค่านิยมของเรา
          </p>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">สิ่งที่เราให้ความสำคัญ</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "✨", title: "คุณภาพ", desc: "วัสดุคัดพิเศษ ทนทาน สวมใส่สบายตลอดวัน" },
              { icon: "🌿", title: "ยั่งยืน", desc: "ใส่ใจสิ่งแวดล้อมในทุกขั้นตอนการผลิต" },
              { icon: "💛", title: "ลูกค้าเป็นหลัก", desc: "ความพึงพอใจของคุณคือสิ่งที่เราให้ความสำคัญสูงสุด" },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-[#e8ddd3] p-8 text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl border border-[#e8ddd3] p-12 mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "0", label: "ปีที่ดำเนินกิจการ" },
              { num: "0+", label: "ลูกค้าที่ไว้วางใจ" },
              { num: "0", label: "รุ่นสินค้า" },
              { num: "4.9★", label: "คะแนนเฉลี่ย" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-4xl font-black text-gray-900 mb-1">{s.num}</div>
                <div className="text-sm text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pb-24">
          <p className="text-gray-500 mb-6">พร้อมแล้วหรือยัง?</p>
          <a
            href="/"
            className="inline-block px-8 py-3.5 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors"
          >
            ดูสินค้าทั้งหมด →
          </a>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;
