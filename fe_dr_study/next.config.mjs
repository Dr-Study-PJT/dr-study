/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'mz-stop.s3.ap-northeast-2.amazonaws.com',
            's3.ap-northeast-2.amazonaws.com',
            'plus.unsplash.com',
        ],
    },
};

export default nextConfig;
