/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	exportPathMap: async (defaultPathMap, {
		dev, dir, outDir, distDir, buildId
	}) => {
		const pathMap = {
			...defaultPathMap,
			'/': { page: '/' }
		}
		delete pathMap['/api'];

		return pathMap
	}
};

export default nextConfig;
