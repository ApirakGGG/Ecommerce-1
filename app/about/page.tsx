import Container from "@/app/components/Container";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#fdf8f3]">
      <Container>
        {/* Hero */}
        <div className="py-20 text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#a0856a] uppercase mb-4">
            Ruby Thrift
          </p>
          <h1 className="text-5xl font-black text-gray-900 mb-6 leading-tight">
            ร้านขายของมือสอง<br />
            คุณภาพดี ราคาน่ารัก
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            คัดสรรสินค้ามือสองสภาพดี ใช้งานได้จริง<br className="hidden sm:block" /> และพร้อมส่งต่อให้เจ้าของคนใหม่ในราคาที่คุ้มค่า
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-[#e8ddd3] mb-20" />

        {/* Story section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24 items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#a0856a] uppercase mb-3">เรื่องราวของเรา</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-5 leading-snug">
              ร่วมส่งต่อคุณค่า<br />ของสิ่งของ
            </h2>
            <p className="text-gray-500 leading-8 mb-4">
              เพราะเราเชื่อว่าของทุกชิ้นยังมีคุณค่าและสามารถสร้างประโยชน์ได้อีกครั้ง
            </p>
            <p className="text-gray-500 leading-8 mb-8">
              แวะมาเลือกของที่ถูกใจ แล้วร่วมส่งต่อคุณค่าของสิ่งของไปพร้อมกับเรา
            </p>
            <div className="border-l-4 border-[#a0856a] pl-5 py-2">
              <p className="text-[#a0856a] font-medium text-xl italic">
                &quot;เพราะของดีไม่จำเป็นต้อง<br className="hidden sm:block" />เป็นของใหม่เสมอ&quot;
              </p>
            </div>
          </div>

          {/* Visual placeholder */}
          <div className="rounded-2xl bg-gradient-to-br from-[#ede0cd] to-[#d6c4b0] aspect-[4/3] flex items-center justify-center">
              <Image src="/logo.png" alt="/logo" width={500} height={500} />{" "}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;
