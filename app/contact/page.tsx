"use client";

import Container from "@/app/components/Container";
import { FaInstagram } from "react-icons/fa";
import Image from "next/image";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#fdf8f3]">
      <Container>
        {/* Hero */}
        <div className="py-20 text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#a0856a] uppercase mb-4">
            ติดต่อเรา
          </p>
          <h1 className="text-5xl font-black text-gray-900 mb-5 leading-tight">
            เราพร้อมรับฟัง
            <br />
            ทุกคำถาม
          </h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            มีข้อสงสัยหรืออยากแนะนำอะไร?
          </p>
        </div>

        <div className="border-t border-[#e8ddd3] mb-16" />

        <div className="max-w-3xl mx-auto mb-24 bg-white rounded-2xl border border-[#e8ddd3] p-10 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">
            ข้อมูลติดต่อ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full mb-10 text-left">
            {[
              {
                icon: "💬",
                label: "LINE ID",
                value: "@149qtixg",
                href: "https://lin.ee/XhvJqLH",
              },
              {
                icon: "📧",
                label: "อีเมล",
                value: "rubythrift_@gmail.com",
                href: "mailto:rubythrift_@gmail.com",
              },
              {
                icon: "📞",
                label: "โทรศัพท์",
                value: "0800067150",
                href: "tel:0800067150",
              },
              { icon: "📍", label: "ที่อยู่", value: "จังหวัดเชียงใหม่" },
            ].map((info) => (
              <div key={info.label} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#fdf8f3] border border-[#e8ddd3] flex items-center justify-center text-xl flex-shrink-0">
                  {info.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-1">
                    {info.label}
                  </p>
                  {info.href ? (
                    <a
                      href={info.href}
                      target={
                        info.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-gray-700 hover:text-[#a0856a] transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-gray-700">
                      {info.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div className="pt-8 border-t border-[#e8ddd3] w-full flex flex-col items-center">
            <p className="text-sm text-gray-500 font-medium mb-4">
              ติดตามเราได้ที่
            </p>
            <div className="flex gap-4">
              <a
                href="https://lin.ee/XhvJqLH"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 px-5 py-2 rounded-full bg-[#fdf8f3] border border-[#e8ddd3] text-sm text-gray-600 font-medium hover:bg-[#00B900] hover:text-white hover:border-[#00B900] transition"
              >
                <Image src="/line.webp" alt="/line-icon" width={25} height={25} />{" "}
                Line
              </a>
              <a
                href="https://instagram.com/rubythrift_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-center px-5 py-2 rounded-full bg-[#fdf8f3] border border-[#e8ddd3] text-sm text-gray-600 font-medium hover:bg-gradient-to-r hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:text-white hover:border-transparent transition"
              >
                <FaInstagram /> Instagram
              </a>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            คำถามที่พบบ่อย
          </h2>
          <div className="max-w-2xl mx-auto flex flex-col gap-4">
            {[
              {
                q: "ระยะเวลาจัดส่งนานแค่ไหน?",
                a: "จัดส่งภายใน 1–3 วันทำการ ขึ้นอยู่กับพื้นที่",
              },
              {
                q: "สามารถเปลี่ยน/คืนสินค้าได้ไหม?",
                a: "รับเปลี่ยนคืนภายใน 7 วัน หากสินค้ายังอยู่ในสภาพดี",
              },
              {
                q: "มีบริการส่งต่างประเทศไหม?",
                a: "ขณะนี้ให้บริการในประเทศไทยเท่านั้น",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="bg-white rounded-xl border border-[#e8ddd3] px-6 py-5"
              >
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  {faq.q}
                </p>
                <p className="text-sm text-gray-500 leading-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;
