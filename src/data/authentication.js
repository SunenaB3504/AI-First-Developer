export default {
  id: "authentication",
  tier: 3,
  name: "Authentication & Authorization",
  description: "Master modern authentication and authorization systems including JWT tokens, OAuth 2.0, session management, and security best practices. Learn to implement secure user authentication, role-based access control, and protect applications from common security vulnerabilities.",
  difficulty: "intermediate",
  estimatedHours: 18,
  prerequisites: ["nodejs", "security"],
  learningObjectives: [
    "Implement JWT token-based authentication with proper signing and verification",
    "Configure OAuth 2.0 and OpenID Connect flows for third-party authentication",
    "Design secure session management strategies with proper expiration and renewal",
    "Apply password hashing techniques using bcrypt and salt generation",
    "Implement multi-factor authentication (MFA) for enhanced security",
    "Create role-based access control (RBAC) systems with permissions",
    "Identify and prevent common authentication vulnerabilities (CSRF, XSS, injection)",
    "Design secure password policies and validation rules",
    "Implement proper logout and token revocation mechanisms",
    "Configure HTTPS and secure cookie settings for production",
    "Handle authentication errors gracefully with proper user feedback",
    "Monitor and audit authentication events for security compliance"
  ],
  sections: [
    {
      title: "JWT Token Implementation",
      content: "JSON Web Tokens (JWT) are a compact, URL-safe means of representing claims to be transferred between two parties. JWTs are commonly used for authentication and information exchange in web applications. A JWT consists of three parts: Header, Payload, and Signature, separated by dots.\n\n**JWT Structure**: The header typically contains the token type and signing algorithm. The payload contains the claims (user information, expiration time, etc.). The signature ensures the token hasn't been tampered with.\n\n**Token Lifecycle**: When a user logs in, the server creates a JWT and sends it to the client. The client stores this token (usually in localStorage or cookies) and includes it in subsequent requests. The server verifies the token on each request.\n\n**Security Considerations**: Always use HTTPS to prevent token interception. Implement proper token expiration (exp claim) and consider token refresh mechanisms. Never store sensitive information in JWT payloads as they are base64 encoded, not encrypted.\n\n**Best Practices**: Use strong signing algorithms like HS256 or RS256. Implement token blacklisting for logout functionality. Validate all claims on the server side. Consider token size limits for HTTP headers.",
      keyTopics: [
        "JWT structure (Header, Payload, Signature)",
        "Token signing and verification algorithms",
        "Token expiration and refresh mechanisms",
        "Secure token storage strategies",
        "Token validation and error handling"
      ],
      practicalExercises: [
        "Create a JWT utility module with sign and verify functions",
        "Implement token-based authentication middleware",
        "Build a token refresh mechanism with sliding expiration",
        "Create a token blacklist for logout functionality",
        "Implement role-based claims in JWT payloads"
      ],
      codeExamples: [
        {
          title: "JWT Authentication Middleware",
          language: "javascript",
          code: `const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database (optional, depending on your needs)
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ error: 'Authentication error' });
  }
};

module.exports = authenticateToken;`
        },
        {
          title: "JWT Token Generation",
          language: "javascript",
          code: `const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class AuthService {
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '24h';
  }

  // Generate JWT token
  generateToken(user) {
    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    };

    return jwt.sign(payload, this.jwtSecret, {
      algorithm: 'HS256',
      expiresIn: this.jwtExpiresIn
    });
  }

  // Verify password
  async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Hash password
  async hashPassword(password) {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }
}

module.exports = new AuthService();`
        }
      ]
    },
    {
      title: "OAuth 2.0 and OpenID Connect",
      content: "OAuth 2.0 is an authorization framework that enables applications to obtain limited access to user accounts on an HTTP service. OpenID Connect (OIDC) is an identity layer built on top of OAuth 2.0 that provides authentication capabilities.\n\n**OAuth 2.0 Flows**: The most common flow is the Authorization Code flow, which is secure for server-side applications. Other flows include Implicit (for SPAs), Client Credentials (for service-to-service), and Resource Owner Password Credentials.\n\n**OpenID Connect**: Extends OAuth 2.0 with an identity token (ID token) that contains user identity information. The ID token is a JWT that contains claims about the user's identity.\n\n**Implementation Steps**: Register your application with the OAuth provider (Google, GitHub, etc.). Redirect users to the provider's authorization endpoint. Handle the authorization code callback. Exchange the code for access and ID tokens.\n\n**Security Considerations**: Always validate the state parameter to prevent CSRF attacks. Verify the ID token signature and claims. Use PKCE (Proof Key for Code Exchange) for public clients. Implement proper token storage and refresh mechanisms.\n\n**Provider Integration**: Popular providers include Google, GitHub, Facebook, and Auth0. Each has specific configuration requirements and scope definitions.",
      keyTopics: [
        "OAuth 2.0 authorization flows",
        "OpenID Connect identity tokens",
        "Provider registration and configuration",
        "State parameter and CSRF protection",
        "PKCE (Proof Key for Code Exchange)"
      ],
      practicalExercises: [
        "Implement Google OAuth 2.0 integration",
        "Create OpenID Connect authentication flow",
        "Build social login buttons for multiple providers",
        "Implement PKCE for enhanced security",
        "Create OAuth provider configuration module"
      ],
      codeExamples: [
        {
          title: "Google OAuth 2.0 Integration",
          language: "javascript",
          code: `const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists
      let user = await User.findOne({ googleId: profile.id });

      if (user) {
        return done(null, user);
      }

      // Create new user
      user = new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        avatar: profile.photos[0].value,
        provider: 'google'
      });

      await user.save();
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
));

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;`
        },
        {
          title: "OpenID Connect Token Validation",
          language: "javascript",
          code: `const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

class OIDCTokenValidator {
  constructor(issuer, jwksUri) {
    this.issuer = issuer;
    this.client = jwksClient({
      jwksUri: jwksUri,
      cache: true,
      rateLimit: true
    });
  }

  // Get signing key
  getKey(header, callback) {
    this.client.getSigningKey(header.kid, (err, key) => {
      if (err) {
        callback(err);
      } else {
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
      }
    });
  }

  // Validate ID token
  async validateIdToken(idToken) {
    try {
      const decoded = jwt.decode(idToken, { complete: true });

      if (!decoded) {
        throw new Error('Invalid ID token');
      }

      // Verify token structure
      if (decoded.payload.iss !== this.issuer) {
        throw new Error('Invalid issuer');
      }

      if (decoded.payload.aud !== process.env.OIDC_CLIENT_ID) {
        throw new Error('Invalid audience');
      }

      // Check expiration
      if (decoded.payload.exp < Math.floor(Date.now() / 1000)) {
        throw new Error('Token expired');
      }

      // Verify signature
      const verified = await new Promise((resolve, reject) => {
        jwt.verify(idToken, this.getKey.bind(this), {
          algorithms: ['RS256']
        }, (err, decoded) => {
          if (err) reject(err);
          else resolve(decoded);
        });
      });

      return verified;
    } catch (error) {
      throw new Error(\`ID token validation failed: \${error.message}\`);
    }
  }
}

module.exports = OIDCTokenValidator;`
        }
      ]
    },
    {
      title: "Session Management and Security",
      content: "Session management is crucial for maintaining user state and security in web applications. Proper session handling prevents common attacks and ensures user data protection.\n\n**Session Storage Options**: Server-side sessions store data on the server with a session ID sent to the client. Client-side sessions (like JWT) store data in the token itself. Hybrid approaches combine both methods.\n\n**Security Best Practices**: Use secure, random session IDs. Implement proper session expiration and renewal. Store sessions securely (encrypted databases, not localStorage for sensitive data). Implement session fixation protection.\n\n**Session Lifecycle**: Create sessions on successful authentication. Include essential user information and metadata. Handle session expiration gracefully. Provide secure logout mechanisms that destroy sessions properly.\n\n**Advanced Features**: Implement sliding expiration where session lifetime extends on activity. Add session concurrency control to limit simultaneous sessions. Include device tracking for security monitoring.\n\n**Common Vulnerabilities**: Session fixation attacks can be prevented by regenerating session IDs after login. Session hijacking can be mitigated with proper cookie settings and HTTPS.",
      keyTopics: [
        "Server-side vs client-side session storage",
        "Session ID generation and security",
        "Session expiration and renewal strategies",
        "Secure cookie configuration",
        "Session fixation and hijacking prevention"
      ],
      practicalExercises: [
        "Implement secure session middleware with Redis",
        "Create session management utility functions",
        "Build session cleanup and maintenance scripts",
        "Implement sliding session expiration",
        "Create session monitoring and analytics"
      ],
      codeExamples: [
        {
          title: "Express Session Configuration",
          language: "javascript",
          code: `const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

const sessionConfig = {
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  name: 'sessionId', // Don't use default session name
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true, // Prevent XSS attacks
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'strict' // CSRF protection
  }
};

// Regenerate session ID after login to prevent session fixation
const regenerateSession = (req) => {
  return new Promise((resolve, reject) => {
    req.session.regenerate((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

// Destroy session on logout
const destroySession = (req) => {
  return new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

module.exports = { sessionConfig, regenerateSession, destroySession };`
        },
        {
          title: "Session Security Middleware",
          language: "javascript",
          code: `const crypto = require('crypto');

class SessionSecurity {
  // Generate secure session ID
  static generateSessionId() {
    return crypto.randomBytes(32).toString('hex');
  }

  // Validate session integrity
  static validateSession(session) {
    if (!session) return false;

    // Check required fields
    if (!session.userId || !session.createdAt) return false;

    // Check session age (max 24 hours)
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    const sessionAge = Date.now() - new Date(session.createdAt).getTime();

    if (sessionAge > maxAge) return false;

    // Check for suspicious activity
    if (session.failedAttempts && session.failedAttempts > 5) {
      return false;
    }

    return true;
  }

  // Track session activity
  static trackActivity(session, action) {
    if (!session.activity) {
      session.activity = [];
    }

    session.activity.push({
      action,
      timestamp: new Date(),
      ip: session.ip,
      userAgent: session.userAgent
    });

    // Keep only last 10 activities
    if (session.activity.length > 10) {
      session.activity = session.activity.slice(-10);
    }

    session.lastActivity = new Date();
  }

  // Check for concurrent sessions
  static async checkConcurrentSessions(userId, currentSessionId, maxSessions = 3) {
    // This would typically query your session store
    const userSessions = await this.getUserSessions(userId);

    const activeSessions = userSessions.filter(session =>
      session.id !== currentSessionId &&
      this.validateSession(session)
    );

    if (activeSessions.length >= maxSessions) {
      // Terminate oldest session
      const oldestSession = activeSessions.sort((a, b) =>
        new Date(a.createdAt) - new Date(b.createdAt)
      )[0];

      await this.terminateSession(oldestSession.id);
    }
  }
}

module.exports = SessionSecurity;`
        }
      ]
    },
    {
      title: "Password Security and Hashing",
      content: "Password security is fundamental to authentication systems. Proper password hashing prevents credential theft and protects user accounts.\n\n**Hashing Algorithms**: Never store plain text passwords. Use strong, adaptive hashing functions like bcrypt, scrypt, or Argon2. These algorithms are designed to be slow and computationally expensive to prevent brute-force attacks.\n\n**Salt Generation**: Always use unique salts for each password. Salts prevent rainbow table attacks and ensure identical passwords hash differently. Generate cryptographically secure random salts.\n\n**Password Policies**: Implement strong password requirements (length, complexity, character sets). Consider passphrases for better security. Provide clear feedback on password strength.\n\n**Additional Security**: Implement account lockout after failed attempts. Use pepper (additional secret) with salts. Regularly force password changes for sensitive accounts. Consider passwordless authentication options.\n\n**Migration Strategies**: When upgrading hashing algorithms, implement gradual migration. Hash new passwords with the new algorithm while verifying old hashes with the legacy algorithm.",
      keyTopics: [
        "Password hashing algorithms (bcrypt, scrypt, Argon2)",
        "Salt generation and usage",
        "Password policy implementation",
        "Account lockout mechanisms",
        "Legacy password migration"
      ],
      practicalExercises: [
        "Create password hashing utility with bcrypt",
        "Implement password strength validation",
        "Build account lockout system",
        "Create password reset functionality",
        "Implement gradual password migration"
      ],
      codeExamples: [
        {
          title: "Password Hashing Service",
          language: "javascript",
          code: `const bcrypt = require('bcryptjs');
const crypto = require('crypto');

class PasswordService {
  constructor() {
    this.saltRounds = 12; // Industry standard
    this.pepper = process.env.PASSWORD_PEPPER; // Additional secret
  }

  // Hash password with salt and pepper
  async hashPassword(password) {
    try {
      // Add pepper to password
      const pepperedPassword = password + this.pepper;

      // Generate salt and hash
      const salt = await bcrypt.genSalt(this.saltRounds);
      const hash = await bcrypt.hash(pepperedPassword, salt);

      return {
        hash,
        salt,
        algorithm: 'bcrypt',
        createdAt: new Date()
      };
    } catch (error) {
      throw new Error(\`Password hashing failed: \${error.message}\`);
    }
  }

  // Verify password
  async verifyPassword(password, storedHash) {
    try {
      const pepperedPassword = password + this.pepper;
      return await bcrypt.compare(pepperedPassword, storedHash);
    } catch (error) {
      throw new Error(\`Password verification failed: \${error.message}\`);
    }
  }

  // Generate secure random password
  static generateSecurePassword(length = 16) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, charset.length);
      password += charset[randomIndex];
    }

    return password;
  }

  // Validate password strength
  static validatePasswordStrength(password) {
    const errors = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors,
      strength: this.calculateStrength(password)
    };
  }

  // Calculate password strength score
  static calculateStrength(password) {
    let score = 0;

    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1;

    return score; // 0-6 scale
  }
}

module.exports = PasswordService;`
        },
        {
          title: "Account Lockout System",
          language: "javascript",
          code: `class AccountLockoutService {
  constructor() {
    this.maxFailedAttempts = 5;
    this.lockoutDuration = 15 * 60 * 1000; // 15 minutes
    this.resetAfter = 24 * 60 * 60 * 1000; // 24 hours
  }

  // Check if account is locked
  isAccountLocked(user) {
    if (!user.lockoutUntil) return false;

    const now = new Date();
    const lockoutUntil = new Date(user.lockoutUntil);

    if (now < lockoutUntil) {
      return true;
    }

    // Lockout period has expired, reset
    this.resetFailedAttempts(user);
    return false;
  }

  // Record failed login attempt
  async recordFailedAttempt(user) {
    try {
      user.failedAttempts = (user.failedAttempts || 0) + 1;
      user.lastFailedAttempt = new Date();

      // Lock account if max attempts reached
      if (user.failedAttempts >= this.maxFailedAttempts) {
        user.lockoutUntil = new Date(Date.now() + this.lockoutDuration);
        user.lockoutReason = 'Too many failed login attempts';
      }

      await user.save();
    } catch (error) {
      throw new Error(\`Failed to record login attempt: \${error.message}\`);
    }
  }

  // Reset failed attempts on successful login
  async resetFailedAttempts(user) {
    try {
      user.failedAttempts = 0;
      user.lastFailedAttempt = null;
      user.lockoutUntil = null;
      user.lockoutReason = null;
      await user.save();
    } catch (error) {
      throw new Error(\`Failed to reset attempts: \${error.message}\`);
    }
  }

  // Get remaining lockout time
  getRemainingLockoutTime(user) {
    if (!user.lockoutUntil) return 0;

    const now = new Date();
    const lockoutUntil = new Date(user.lockoutUntil);
    const remaining = lockoutUntil - now;

    return Math.max(0, remaining);
  }

  // Check if failed attempts should be reset (after reset window)
  shouldResetAttempts(user) {
    if (!user.lastFailedAttempt) return false;

    const now = new Date();
    const lastFailed = new Date(user.lastFailedAttempt);
    const timeSinceLastFailed = now - lastFailed;

    return timeSinceLastFailed > this.resetAfter;
  }

  // Progressive delay for failed attempts
  getProgressiveDelay(attemptNumber) {
    const baseDelay = 1000; // 1 second
    const multiplier = Math.pow(2, attemptNumber - 1);
    return Math.min(baseDelay * multiplier, 30000); // Max 30 seconds
  }
}

module.exports = AccountLockoutService;`
        }
      ]
    },
    {
      title: "Multi-Factor Authentication (MFA)",
      content: "Multi-factor authentication adds an extra layer of security by requiring multiple forms of verification. MFA significantly reduces the risk of unauthorized access even if passwords are compromised.\n\n**MFA Types**: Something you know (password), something you have (phone, hardware token), something you are (biometric). Common implementations include SMS codes, authenticator apps (TOTP), hardware security keys, and biometric authentication.\n\n**TOTP Implementation**: Time-based One-Time Passwords use a shared secret and current time to generate codes. Popular apps like Google Authenticator, Authy, and Microsoft Authenticator support TOTP.\n\n**Security Considerations**: Implement backup codes for account recovery. Allow users to register multiple MFA devices. Handle MFA fatigue attacks where attackers repeatedly request verification codes.\n\n**User Experience**: Make MFA enrollment optional but strongly encouraged. Provide clear instructions for setup. Implement remember device functionality to reduce friction for trusted devices.\n\n**Advanced Features**: Support for FIDO2/WebAuthn for passwordless authentication. Implement risk-based authentication that may skip MFA for low-risk logins. Provide analytics on MFA usage and security events.",
      keyTopics: [
        "MFA types and implementation methods",
        "TOTP (Time-based One-Time Passwords)",
        "Hardware security keys and WebAuthn",
        "Backup codes and recovery options",
        "MFA fatigue attack prevention"
      ],
      practicalExercises: [
        "Implement TOTP-based MFA with authenticator apps",
        "Create MFA enrollment and management system",
        "Build backup code generation and validation",
        "Implement WebAuthn for passwordless authentication",
        "Create MFA analytics and monitoring dashboard"
      ],
      codeExamples: [
        {
          title: "TOTP MFA Implementation",
          language: "javascript",
          code: `const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

class MFAService {
  constructor() {
    this.issuer = 'YourApp';
    this.algorithm = 'sha1';
    this.digits = 6;
    this.step = 30; // 30 seconds
  }

  // Generate MFA secret for user
  generateMFASecret(user) {
    const secret = speakeasy.generateSecret({
      name: \`\${this.issuer}:\${user.email}\`,
      issuer: this.issuer,
      length: 32
    });

    return {
      secret: secret.base32,
      otpauthUrl: secret.otpauth_url
    };
  }

  // Generate QR code for authenticator app
  async generateQRCode(otpauthUrl) {
    try {
      const qrCodeDataURL = await qrcode.toDataURL(otpauthUrl);
      return qrCodeDataURL;
    } catch (error) {
      throw new Error(\`QR code generation failed: \${error.message}\`);
    }
  }

  // Verify TOTP token
  verifyToken(secret, token, window = 1) {
    return speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token,
      window: window, // Allow 1 step tolerance for clock skew
      algorithm: this.algorithm,
      digits: this.digits,
      step: this.step
    });
  }

  // Generate backup codes
  generateBackupCodes(count = 10) {
    const codes = [];
    for (let i = 0; i < count; i++) {
      const code = speakeasy.generateSecret({
        length: 10,
        symbols: false,
        otpauth_url: false
      }).base32;
      codes.push(code);
    }
    return codes;
  }

  // Verify backup code (one-time use)
  async verifyBackupCode(user, code) {
    if (!user.backupCodes || !user.backupCodes.includes(code)) {
      return false;
    }

    // Remove used backup code
    user.backupCodes = user.backupCodes.filter(c => c !== code);
    await user.save();

    return true;
  }
}

module.exports = MFAService;`
        },
        {
          title: "MFA Enrollment Controller",
          language: "javascript",
          code: `const MFAService = require('../services/MFAService');
const User = require('../models/User');

class MFAController {
  // Start MFA enrollment
  async startEnrollment(req, res) {
    try {
      const user = req.user;
      const mfaService = new MFAService();

      // Generate secret and QR code
      const { secret, otpauthUrl } = mfaService.generateMFASecret(user);
      const qrCode = await mfaService.generateQRCode(otpauthUrl);

      // Store temporary secret (don't save to user yet)
      req.session.mfaTempSecret = secret;

      res.json({
        secret: secret,
        qrCode: qrCode,
        message: 'Scan QR code with authenticator app, then verify with code'
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Verify and complete MFA enrollment
  async completeEnrollment(req, res) {
    try {
      const { token } = req.body;
      const user = req.user;
      const mfaService = new MFAService();

      if (!req.session.mfaTempSecret) {
        return res.status(400).json({ error: 'MFA enrollment not started' });
      }

      // Verify the token
      const isValid = mfaService.verifyToken(req.session.mfaTempSecret, token);

      if (!isValid) {
        return res.status(400).json({ error: 'Invalid verification code' });
      }

      // Save MFA settings to user
      user.mfaEnabled = true;
      user.mfaSecret = req.session.mfaTempSecret;
      user.backupCodes = mfaService.generateBackupCodes();

      await user.save();

      // Clear temporary secret
      delete req.session.mfaTempSecret;

      res.json({
        message: 'MFA enabled successfully',
        backupCodes: user.backupCodes
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Disable MFA
  async disableMFA(req, res) {
    try {
      const { password } = req.body;
      const user = req.user;

      // Verify password before disabling MFA
      const isValidPassword = await user.verifyPassword(password);
      if (!isValidPassword) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      user.mfaEnabled = false;
      user.mfaSecret = null;
      user.backupCodes = null;

      await user.save();

      res.json({ message: 'MFA disabled successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Verify MFA token during login
  async verifyMFAToken(req, res) {
    try {
      const { token, backupCode } = req.body;
      const user = req.user;
      const mfaService = new MFAService();

      let isValid = false;

      if (token) {
        // Verify TOTP token
        isValid = mfaService.verifyToken(user.mfaSecret, token);
      } else if (backupCode) {
        // Verify backup code
        isValid = await mfaService.verifyBackupCode(user, backupCode);
      }

      if (!isValid) {
        return res.status(400).json({ error: 'Invalid MFA code' });
      }

      // Generate authentication token
      const authToken = user.generateAuthToken();

      res.json({
        token: authToken,
        message: 'MFA verification successful'
      });
    } catch (error) {
      res.status(500).json({ error: 'MFA verification failed' });
    }
  }
}

module.exports = new MFAController();`
        }
      ]
    },
    {
      title: "Role-Based Access Control (RBAC)",
      content: "Role-Based Access Control (RBAC) is a security model that restricts system access based on user roles and permissions. RBAC simplifies permission management and ensures users only access resources they need.\n\n**Core Components**: Users are assigned roles, roles have permissions, and permissions define what actions can be performed on resources. This creates a clear hierarchy of access control.\n\n**Implementation Strategies**: Define roles clearly (admin, moderator, user, guest). Create permission matrices for different resources. Implement middleware to check permissions on each request.\n\n**Advanced Features**: Support for role hierarchies where higher roles inherit lower role permissions. Implement resource-specific permissions. Add time-based restrictions and IP whitelisting.\n\n**Best Practices**: Use the principle of least privilege. Regularly audit role assignments. Implement approval workflows for sensitive role changes. Provide clear documentation on role responsibilities.\n\n**Common Patterns**: Admin roles with full access, moderator roles with content management permissions, user roles with basic functionality, and guest roles with minimal access.",
      keyTopics: [
        "RBAC model components (users, roles, permissions)",
        "Role hierarchy and inheritance",
        "Permission checking middleware",
        "Resource-specific access control",
        "Role audit and compliance"
      ],
      practicalExercises: [
        "Design and implement RBAC permission system",
        "Create role-based middleware for API endpoints",
        "Build role management interface",
        "Implement permission inheritance hierarchy",
        "Create role audit and reporting system"
      ],
      codeExamples: [
        {
          title: "RBAC Permission System",
          language: "javascript",
          code: `class RBACService {
  constructor() {
    // Define permissions
    this.permissions = {
      // User management
      'users:create': 'Create new users',
      'users:read': 'View user information',
      'users:update': 'Update user information',
      'users:delete': 'Delete users',

      // Content management
      'content:create': 'Create content',
      'content:read': 'View content',
      'content:update': 'Update content',
      'content:delete': 'Delete content',
      'content:publish': 'Publish content',

      // System administration
      'admin:access': 'Access admin panel',
      'admin:config': 'Modify system configuration',
      'admin:logs': 'View system logs'
    };

    // Define roles and their permissions
    this.roles = {
      guest: [
        'content:read'
      ],
      user: [
        'users:read',
        'users:update', // Users can update their own profile
        'content:create',
        'content:read',
        'content:update' // Users can update their own content
      ],
      moderator: [
        'users:read',
        'content:create',
        'content:read',
        'content:update',
        'content:delete',
        'content:publish'
      ],
      admin: [
        'users:create',
        'users:read',
        'users:update',
        'users:delete',
        'content:create',
        'content:read',
        'content:update',
        'content:delete',
        'content:publish',
        'admin:access',
        'admin:config',
        'admin:logs'
      ]
    };
  }

  // Check if user has permission
  hasPermission(user, permission) {
    if (!user || !user.role) return false;

    const userPermissions = this.roles[user.role] || [];
    return userPermissions.includes(permission);
  }

  // Check multiple permissions (user must have ALL)
  hasAllPermissions(user, permissions) {
    return permissions.every(permission => this.hasPermission(user, permission));
  }

  // Check multiple permissions (user must have ANY)
  hasAnyPermission(user, permissions) {
    return permissions.some(permission => this.hasPermission(user, permission));
  }

  // Get all permissions for a role
  getRolePermissions(role) {
    return this.roles[role] || [];
  }

  // Add permission to role
  addPermissionToRole(role, permission) {
    if (!this.roles[role]) {
      this.roles[role] = [];
    }

    if (!this.roles[role].includes(permission)) {
      this.roles[role].push(permission);
    }
  }

  // Remove permission from role
  removePermissionFromRole(role, permission) {
    if (this.roles[role]) {
      this.roles[role] = this.roles[role].filter(p => p !== permission);
    }
  }

  // Create custom role
  createRole(roleName, permissions) {
    this.roles[roleName] = permissions;
  }

  // Get all available roles
  getAllRoles() {
    return Object.keys(this.roles);
  }

  // Validate role exists
  isValidRole(role) {
    return this.roles.hasOwnProperty(role);
  }
}

module.exports = new RBACService();`
        },
        {
          title: "RBAC Middleware",
          language: "javascript",
          code: `const RBACService = require('../services/RBACService');

class RBACMiddleware {
  // Create permission-checking middleware
  static requirePermission(permission) {
    return (req, res, next) => {
      try {
        if (!req.user) {
          return res.status(401).json({ error: 'Authentication required' });
        }

        if (!RBACService.hasPermission(req.user, permission)) {
          return res.status(403).json({
            error: 'Insufficient permissions',
            required: permission,
            userRole: req.user.role
          });
        }

        next();
      } catch (error) {
        res.status(500).json({ error: 'Permission check failed' });
      }
    };
  }

  // Require any of multiple permissions
  static requireAnyPermission(permissions) {
    return (req, res, next) => {
      try {
        if (!req.user) {
          return res.status(401).json({ error: 'Authentication required' });
        }

        if (!RBACService.hasAnyPermission(req.user, permissions)) {
          return res.status(403).json({
            error: 'Insufficient permissions',
            required: permissions,
            userRole: req.user.role
          });
        }

        next();
      } catch (error) {
        res.status(500).json({ error: 'Permission check failed' });
      }
    };
  }

  // Require all of multiple permissions
  static requireAllPermissions(permissions) {
    return (req, res, next) => {
      try {
        if (!req.user) {
          return res.status(401).json({ error: 'Authentication required' });
        }

        if (!RBACService.hasAllPermissions(req.user, permissions)) {
          return res.status(403).json({
            error: 'Insufficient permissions',
            required: permissions,
            userRole: req.user.role
          });
        }

        next();
      } catch (error) {
        res.status(500).json({ error: 'Permission check failed' });
      }
    };
  }

  // Resource ownership check
  static requireOwnership(resourceField = 'userId') {
    return (req, res, next) => {
      try {
        if (!req.user) {
          return res.status(401).json({ error: 'Authentication required' });
        }

        const resourceId = req.params.id || req.body[resourceField];
        const userId = req.user._id || req.user.id;

        if (resourceId !== userId && !RBACService.hasPermission(req.user, 'admin:access')) {
          return res.status(403).json({ error: 'Access denied: not resource owner' });
        }

        next();
      } catch (error) {
        res.status(500).json({ error: 'Ownership check failed' });
      }
    };
  }

  // Role-based middleware
  static requireRole(role) {
    return (req, res, next) => {
      try {
        if (!req.user) {
          return res.status(401).json({ error: 'Authentication required' });
        }

        if (req.user.role !== role && !RBACService.hasPermission(req.user, 'admin:access')) {
          return res.status(403).json({
            error: 'Insufficient role',
            required: role,
            userRole: req.user.role
          });
        }

        next();
      } catch (error) {
        res.status(500).json({ error: 'Role check failed' });
      }
    };
  }

  // Admin-only middleware
  static requireAdmin = this.requireRole('admin');
}

module.exports = RBACMiddleware;`
        }
      ]
    }
  ],
  projects: [
    {
      title: "Secure Authentication System",
      description: "Build a complete authentication system with JWT, OAuth 2.0, MFA, and RBAC",
      difficulty: "advanced",
      estimatedHours: 40,
      technologies: ["Node.js", "Express", "MongoDB", "JWT", "OAuth 2.0"],
      features: [
        "User registration and login with JWT",
        "Google OAuth 2.0 integration",
        "TOTP-based multi-factor authentication",
        "Role-based access control system",
        "Password reset functionality",
        "Session management with Redis",
        "Security audit logging"
      ]
    },
    {
      title: "Authentication Microservice",
      description: "Create a standalone authentication microservice with comprehensive security features",
      difficulty: "advanced",
      estimatedHours: 35,
      technologies: ["Node.js", "Express", "MongoDB", "Redis", "Docker"],
      features: [
        "RESTful API for authentication",
        "Multiple OAuth provider support",
        "JWT token management",
        "Rate limiting and DDoS protection",
        "Comprehensive logging and monitoring",
        "Database migration scripts",
        "API documentation with Swagger"
      ]
    },
    {
      title: "Enterprise Security Dashboard",
      description: "Build an admin dashboard for managing users, roles, and security policies",
      difficulty: "intermediate",
      estimatedHours: 25,
      technologies: ["React", "Node.js", "MongoDB", "Chart.js"],
      features: [
        "User management interface",
        "Role and permission management",
        "Security event monitoring",
        "Login attempt analytics",
        "MFA enrollment management",
        "Audit log viewer",
        "Security policy configuration"
      ]
    }
  ],
  assessments: {
    quiz: [
      {
        question: "What is the primary purpose of JWT tokens in authentication?",
        options: [
          "To store user passwords securely",
          "To transmit authentication claims between parties",
          "To encrypt database connections",
          "To generate random session IDs"
        ],
        correctAnswer: 1,
        explanation: "JWT tokens are used to securely transmit authentication claims and user information between parties in a compact, URL-safe format."
      },
      {
        question: "Which OAuth 2.0 flow is most secure for server-side web applications?",
        options: [
          "Implicit Flow",
          "Authorization Code Flow",
          "Resource Owner Password Credentials Flow",
          "Client Credentials Flow"
        ],
        correctAnswer: 1,
        explanation: "The Authorization Code Flow is the most secure for server-side applications as it doesn't expose tokens in the browser."
      },
      {
        question: "What is the main advantage of using bcrypt for password hashing?",
        options: [
          "It's the fastest hashing algorithm",
          "It uses adaptive complexity that can be increased over time",
          "It produces shorter hash outputs",
          "It doesn't require salt values"
        ],
        correctAnswer: 1,
        explanation: "bcrypt uses adaptive complexity, meaning you can increase the computational cost over time as hardware gets faster."
      },
      {
        question: "What does RBAC stand for in access control systems?",
        options: [
          "Role-Based Access Control",
          "Resource-Based Access Control",
          "Rule-Based Access Control",
          "Rights-Based Access Control"
        ],
        correctAnswer: 0,
        explanation: "RBAC stands for Role-Based Access Control, a security model that restricts access based on user roles."
      },
      {
        question: "Which of the following is NOT a common type of multi-factor authentication?",
        options: [
          "Something you know (password)",
          "Something you have (phone)",
          "Something you are (biometric)",
          "Something you think (opinion)"
        ],
        correctAnswer: 3,
        explanation: "The three main types of MFA factors are: something you know, something you have, and something you are."
      }
    ],
    evaluation: [
      {
        scenario: "You are implementing authentication for a healthcare application that handles sensitive patient data. The application needs to support both traditional username/password login and integration with hospital SSO systems.",
        questions: [
          "What authentication strategies would you recommend and why?",
          "How would you handle the transition from password-based to SSO authentication?",
          "What additional security measures would you implement for this sensitive data context?"
        ]
      },
      {
        scenario: "Your e-commerce platform is experiencing frequent brute-force attacks on user accounts. Users are complaining about the security measures being too cumbersome.",
        questions: [
          "How would you balance security with user experience in this scenario?",
          "What specific anti-brute-force measures would you implement?",
          "How would you communicate security changes to users effectively?"
        ]
      }
    ]
  },
  aiPrompts: [
    "How do I implement JWT authentication in my Node.js application?",
    "What's the difference between OAuth 2.0 and OpenID Connect?",
    "How do I securely store user passwords in a database?",
    "How do I implement multi-factor authentication with TOTP?",
    "How do I create a role-based access control system?",
    "How do I handle password reset functionality securely?",
    "What's the best way to implement session management?",
    "How do I prevent CSRF attacks in my web application?",
    "How do I implement OAuth 2.0 with Google in my app?",
    "How do I create backup codes for MFA recovery?",
    "How do I audit authentication events for security compliance?",
    "What's the difference between authentication and authorization?"
  ],
  resources: [
    {
      title: "JWT.io - JSON Web Tokens",
      type: "documentation",
      url: "https://jwt.io",
      description: "Official JWT website with debugger, libraries, and documentation"
    },
    {
      title: "OAuth 2.0 Authorization Framework",
      type: "specification",
      url: "https://tools.ietf.org/html/rfc6749",
      description: "Official OAuth 2.0 specification document"
    },
    {
      title: "OWASP Authentication Cheat Sheet",
      type: "guide",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html",
      description: "Comprehensive security best practices for authentication"
    },
    {
      title: "bcrypt vs scrypt vs Argon2",
      type: "article",
      url: "https://security.stackexchange.com/questions/26245/is-bcrypt-better-than-scrypt",
      description: "Comparison of password hashing algorithms"
    },
    {
      title: "Google Authenticator",
      type: "tool",
      url: "https://github.com/google/google-authenticator",
      description: "TOTP implementation for multi-factor authentication"
    }
  ],
  toolsRequired: [
    "Node.js (v14+)",
    "npm or yarn package manager",
    "MongoDB database",
    "Redis (optional, for session storage)",
    "JWT library (jsonwebtoken)",
    "bcrypt for password hashing",
    "OAuth client libraries",
    "TOTP library (speakeasy)",
    "Express.js framework",
    "Postman for API testing"
  ],
  bestPractices: [
    "Always use HTTPS in production to protect authentication data",
    "Implement proper password policies with strength requirements",
    "Use secure, random session IDs and JWT secrets",
    "Implement account lockout after failed login attempts",
    "Store passwords using strong hashing algorithms like bcrypt",
    "Use multi-factor authentication for sensitive operations",
    "Implement proper logout mechanisms that invalidate sessions",
    "Regularly rotate JWT secrets and encryption keys",
    "Log authentication events for security monitoring",
    "Use the principle of least privilege in role assignments",
    "Implement rate limiting to prevent brute force attacks",
    "Validate and sanitize all user inputs",
    "Use secure cookie settings (httpOnly, secure, sameSite)",
    "Implement CSRF protection for state-changing operations",
    "Regularly audit user roles and permissions",
    "Provide clear error messages without revealing sensitive information"
  ],
  commonPitfalls: [
    "Storing passwords in plain text or weak encryption",
    "Using short or predictable JWT secrets",
    "Not implementing proper session expiration",
    "Missing HTTPS configuration in production",
    "Inadequate password strength requirements",
    "Not handling token revocation properly",
    "Exposing sensitive information in error messages",
    "Using insecure random number generation",
    "Not implementing rate limiting for authentication endpoints",
    "Storing sensitive data in JWT payloads",
    "Missing input validation and sanitization",
    "Not implementing proper logout functionality",
    "Using weak hashing algorithms for passwords",
    "Not monitoring for suspicious authentication patterns",
    "Implementing insecure password reset mechanisms",
    "Not using secure cookie settings",
    "Missing CSRF protection on authentication forms",
    "Not implementing account lockout policies",
    "Using predictable session IDs",
    "Not auditing authentication and authorization events"
  ],
  careerRelevance: [
    "Security is a top priority for all software development roles",
    "Authentication expertise is required for full-stack and backend positions",
    "Security knowledge significantly increases salary potential",
    "Many companies require security certifications and best practices knowledge",
    "Authentication systems are critical components in enterprise applications",
    "Understanding OAuth and SSO is essential for modern web development",
    "Security vulnerabilities can have severe legal and financial consequences",
    "DevSecOps roles specifically focus on security integration in development",
    "Mobile app development requires secure authentication implementation",
    "Cloud platforms demand knowledge of authentication and authorization",
    "API development requires proper authentication and access control",
    "Security expertise opens doors to specialized security consulting roles",
    "Understanding authentication helps in building compliant applications",
    "Security knowledge is valuable for startup security assessments",
    "Authentication systems are fundamental to user trust and platform success"
  ]
};