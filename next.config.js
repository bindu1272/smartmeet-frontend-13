/** @type {import('next').NextConfig} */
const nextConfig = {
    publicRuntimeConfig: {
        // Will be available on both server and client
        backendUrl: process.env.NEXT_PUBLIC_API_URL,
        blogUrl: process.env.NEXT_APP_BLOG_API,
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleSecret: process.env.GOOGLE_SECRET,
        facebookClientId: process.env.FACEBOOK_CLIENT_ID,
        facebookSecret: process.env.FACEBOOK_SECRET
        
      },
      experimental: {
        serverActions: true,
      },
      images: {
        domains: ['d3nn873nee648n.cloudfront.net','smartmeet-data.s3.ap-south-1.amazonaws.com'],
      },
     
}

module.exports = nextConfig
