import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const clientBuildDir = path.join(rootDir, 'client', 'build');
const serverPublicDir = path.join(rootDir, 'server', 'public');

/**
 * Recursively copies a directory.
 */
function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

async function prepare() {
    try {
        console.log('🚀 Starting NO-DEPENDENCY public folder preparation...');

        // Check if client build exists
        if (!fs.existsSync(clientBuildDir)) {
            console.error('❌ Error: client/build folder not found! Please run build in client first.');
            process.exit(1);
        }

        // Remove existing server/public
        if (fs.existsSync(serverPublicDir)) {
            console.log('🧹 Cleaning existing server/public folder...');
            fs.rmSync(serverPublicDir, { recursive: true, force: true });
        }

        // Create new server/public
        console.log(`📁 Creating folder: ${serverPublicDir}`);
        fs.mkdirSync(serverPublicDir, { recursive: true });

        // Copy build contents
        console.log(`📦 Copying from ${clientBuildDir} to ${serverPublicDir}...`);
        copyRecursiveSync(clientBuildDir, serverPublicDir);

        // Verify index.html exists in destination
        const destIndex = path.join(serverPublicDir, 'index.html');
        if (fs.existsSync(destIndex)) {
            console.log(`✅ Verified: index.html is at ${destIndex}`);
        } else {
            console.error(`❌ Error: index.html is MISSING at ${destIndex}`);
            process.exit(1);
        }

        console.log('✅ Success! Public folder is fully populated.');
    } catch (err) {
        console.error('❌ Error during preparation:', err);
        process.exit(1);
    }
}

prepare();
