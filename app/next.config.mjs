/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/dogs",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
