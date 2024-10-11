/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/characters',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
