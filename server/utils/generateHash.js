import bcrypt from 'bcrypt';

/**
 * Utility to generate bcrypt hash for admin password
 * Run: npm run generate-hash
 */

const password = process.argv[2] || 'jayesh001';
const saltRounds = 12; // Higher = more secure but slower

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error('Error generating hash:', err);
        process.exit(1);
    }
    
    console.log('\n✅ Password Hash Generated Successfully!\n');
    console.log('Password:', password);
    console.log('Hash:', hash);
    console.log('\n📝 Add this to your .env file:');
    console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
});
