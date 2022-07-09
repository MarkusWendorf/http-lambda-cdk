# Exit on error
set -e

npx esbuild index.ts --bundle --platform=node --target=node14 --outdir=dist

cp -r ./dist/ $1