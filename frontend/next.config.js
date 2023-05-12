/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["es"],
    defaultLocale: "es",
  },
  env: {
    NEXT_PUBLIC_APP_CHARSET: "UTF-8",
  },
};

module.exports = nextConfig;
