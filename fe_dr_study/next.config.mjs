/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'mz-stop.s3.ap-northeast-2.amazonaws.com',
            'via.placeholder.com',
            'example.com',
            's3.ap-northeast-2.amazonaws.com',
        ],
    },
};

export default nextConfig;
