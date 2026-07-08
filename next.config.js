const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. ตั้งค่า Remote Patterns สำหรับรูปภาพเดิมของคุณ
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.firebasestorage.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },

  // 2. ตั้งค่า Webpack เพื่อแก้ไขบั๊ก Prisma Engine บน Vercel
  webpack: (config, { isServer }) => {
    if (isServer) {
      // บังคับไม่ให้ Webpack ยุบรวมแพ็คเกจของ Prisma client เข้าไปในบันเดิลหลัก
      config.externals.push({
        '@prisma/client': 'commonjs @prisma/client',
      });

      // ใช้ copy-webpack-plugin บังคับยัดไฟล์เอนจิน Linux (.node) ไปที่โฟลเดอร์รันไทม์ฝั่งเซิร์ฟเวอร์
      const CopyWebpackPlugin = require('copy-webpack-plugin');
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.join(__dirname, 'node_modules/prisma/libquery_engine-rhel-openssl-3.0.x.so.node'),
              to: path.join(__dirname, '.next/server/chunks'),
              noErrorOnMissing: true,
            },
            {
              from: path.join(__dirname, 'node_modules/prisma/libquery_engine-rhel-openssl-3.0.x.so.node'),
              to: path.join(__dirname, '.next/server'),
              noErrorOnMissing: true,
            }
          ],
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;