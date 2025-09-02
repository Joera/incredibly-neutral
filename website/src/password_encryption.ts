import * as crypto from 'crypto';

export class PasswordEncryption {
  private static readonly ALGORITHM = 'aes-256-gcm';
  private static readonly KEY_LENGTH = 32;
  private static readonly IV_LENGTH = 16;
  private static readonly SALT_LENGTH = 32;
  private static readonly TAG_LENGTH = 16;
  private static readonly ITERATIONS = 100000;

  static encrypt(plaintext: string, password: string): string {
    // Generate random salt and IV
    const salt = crypto.randomBytes(this.SALT_LENGTH);
    const iv = crypto.randomBytes(this.IV_LENGTH);
    
    // Derive key from password using PBKDF2
    const key = crypto.pbkdf2Sync(password, salt, this.ITERATIONS, this.KEY_LENGTH, 'sha256');
    
    // Create cipher with IV
    const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);
    
    // Encrypt
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    // Get authentication tag
    const tag = cipher.getAuthTag();
    
    // Combine salt + iv + tag + encrypted data
    const result = Buffer.concat([
      salt,
      iv, 
      tag,
      Buffer.from(encrypted, 'hex')
    ]);
    
    return result.toString('base64');
  }

  static decrypt(encryptedData: string, password: string): string {
    const data = Buffer.from(encryptedData, 'base64');
    
    // Extract components
    const salt = data.subarray(0, this.SALT_LENGTH);
    const iv = data.subarray(this.SALT_LENGTH, this.SALT_LENGTH + this.IV_LENGTH);
    const tag = data.subarray(this.SALT_LENGTH + this.IV_LENGTH, this.SALT_LENGTH + this.IV_LENGTH + this.TAG_LENGTH);
    const encrypted = data.subarray(this.SALT_LENGTH + this.IV_LENGTH + this.TAG_LENGTH);
    
    // Derive the same key
    const key = crypto.pbkdf2Sync(password, salt, this.ITERATIONS, this.KEY_LENGTH, 'sha256');
    
    // Create decipher with IV
    const decipher = crypto.createDecipheriv(this.ALGORITHM, key, iv);
    decipher.setAuthTag(tag);
    
    // Decrypt
    let decrypted = decipher.update(encrypted, undefined, 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}