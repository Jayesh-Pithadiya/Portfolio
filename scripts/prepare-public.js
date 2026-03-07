import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const clientBuildDir = path.join(rootDir, 'client', 'build');
const serverPublicDir = path.join(rootDir, 'server', 'public');

async function prepare() {
    try {
        console.log('🚀 Starting cross-platform public folder preparation...');

        // Check if client build exists
        if (!fs.existsSync(clientBuildDir)) {
            console.error('❌ Error: client/build folder not found! Please run build in client first.');
            process.exit(1);
        }

        // Remove existing server/public
        if (fs.existsSync(serverPublicDir)) {
            console.log('🧹 Cleaning existing server/public folder...');
            await fs.remove(serverPublicDir);
        }

        // Create new server/public
        console.log('📁 Creating server/public folder...');
        await fs.ensureDir(serverPublicDir);

        // Copy build contents
        console.log('📦 Copying build files to server/public...');
        await fs.copy(clientBuildDir, serverPublicDir);

        console.log('✅ Success! Public folder is ready for serving.');
    } catch (err) {
        console.error('❌ Error during preparation:', err);
        process.exit(1);
    }
}

prepare();
