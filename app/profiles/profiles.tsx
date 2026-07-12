import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import Avatar from "../components/avatar";
import Link from "next/link";
import moment from "moment";
import { MdEdit, MdSecurity, MdMailOutline, MdBadge, MdAccessTime, MdUpdate } from "react-icons/md";

const Profiles = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <p className="text-[#a0856a] font-medium text-lg">ไม่พบข้อมูลผู้ใช้งาน โปรดเข้าสู่ระบบ</p>
        </div>
      </Container>
    );
  }

  return (
    <div className="bg-[#fdf8f3] min-h-screen py-10">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-[#e8ddd3]/50 overflow-hidden border border-[#e8ddd3]">
            {/* Banner Area */}
            <div className="relative h-48 bg-gradient-to-r from-[#a0856a] via-[#8b6d53] to-[#5c4a3d]">
              
              {/* Avatar overlapping banner */}
              <div className="absolute -bottom-12 left-10 p-1.5 bg-white rounded-full shadow-lg">
                <div className="w-24 h-24 relative overflow-hidden rounded-full bg-gray-100 flex items-center justify-center">
                  <Avatar src={currentUser?.image} />
                </div>
              </div>
            </div>

            {/* Profile Header info */}
            <div className="pt-16 pb-8 px-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold text-[#4a3b2c] tracking-tight">
                  {currentUser?.name || "ผู้ใช้งานไม่ระบุชื่อ"}
                </h1>
                <div className="flex items-center gap-2 mt-2 text-[#a0856a]">
                  <MdMailOutline size={18} />
                  <span className="font-medium text-sm">{currentUser?.email}</span>
                </div>
              </div>
              
              {/* <Link
                href={`/updateUser/${currentUser?.id}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#4a3b2c] text-white rounded-xl font-bold text-sm hover:bg-[#5c4a3d] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <MdEdit size={16} />
                <span>แก้ไขข้อมูลส่วนตัว</span>
              </Link> */}
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#e8ddd3] to-transparent my-2" />

            {/* Details Grid */}
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="flex flex-col gap-2 group">
                <div className="flex items-center gap-2 text-xs font-bold text-[#a0856a] uppercase tracking-wider group-hover:text-[#8b6d53] transition-colors">
                  <MdBadge size={16} /> รหัสผู้ใช้งาน 
                </div>
                <div className="px-4 py-3 bg-[#fdf8f3] border border-[#e8ddd3] rounded-xl text-gray-700 font-mono text-sm break-all shadow-sm group-hover:border-[#c8a882] transition-colors">
                  {currentUser?.id}
                </div>
              </div>

              <div className="flex flex-col gap-2 group">
                <div className="flex items-center gap-2 text-xs font-bold text-[#a0856a] uppercase tracking-wider group-hover:text-[#8b6d53] transition-colors">
                  <MdSecurity size={16} /> รหัสผ่าน และ สถานะ
                </div>
                <div className="px-4 py-3 bg-[#fdf8f3] border border-[#e8ddd3] rounded-xl flex items-center justify-between shadow-sm group-hover:border-[#c8a882] transition-colors">
                  <span className="text-gray-700 font-mono tracking-widest text-lg leading-none mt-1">••••••••••</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
                    currentUser?.role === 'ADMIN' 
                      ? "bg-[#6d4a2f] text-white border border-[#4a3b2c]" 
                      : "bg-[#e8ddd3] text-[#4a3b2c] border border-[#c8a882]"
                  }`}>
                    {currentUser?.role === 'ADMIN' ? 'ผู้ดูแลระบบ' : 'ลูกค้า'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 group">
                <div className="flex items-center gap-2 text-xs font-bold text-[#a0856a] uppercase tracking-wider group-hover:text-[#8b6d53] transition-colors">
                  <MdAccessTime size={16} /> วันที่สมัครสมาชิก
                </div>
                <div className="px-4 py-3 bg-[#fdf8f3] border border-[#e8ddd3] rounded-xl text-gray-700 font-medium text-sm shadow-sm group-hover:border-[#c8a882] transition-colors">
                  {moment(currentUser?.createAt).format("DD MMMM YYYY, HH:mm")}
                </div>
              </div>

              <div className="flex flex-col gap-2 group">
                <div className="flex items-center gap-2 text-xs font-bold text-[#a0856a] uppercase tracking-wider group-hover:text-[#8b6d53] transition-colors">
                  <MdUpdate size={16} /> อัปเดตล่าสุด
                </div>
                <div className="px-4 py-3 bg-[#fdf8f3] border border-[#e8ddd3] rounded-xl text-gray-700 font-medium text-sm shadow-sm group-hover:border-[#c8a882] transition-colors">
                  {moment(currentUser?.updateAT).fromNow()}
                </div>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Profiles;
