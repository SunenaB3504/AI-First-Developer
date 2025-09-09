#!/usr/bin/env node

/**
 * Security Audit Script
 * Performs security checks on the AI Learning Platform
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔒 Starting Security Audit...\n');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFileForIssues(filePath, issues) {
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf8');

  // Check for dangerous patterns
  if (content.includes('dangerouslySetInnerHTML')) {
    issues.push(`${filePath}: Uses dangerouslySetInnerHTML without sanitization`);
  }

  if (content.includes('innerHTML') && !content.includes('DOMPurify')) {
    issues.push(`${filePath}: Uses innerHTML without DOMPurify sanitization`);
  }

  if (content.includes('eval(')) {
    issues.push(`${filePath}: Uses eval() which is a security risk`);
  }

  if (content.includes('document.write')) {
    issues.push(`${filePath}: Uses document.write which can lead to XSS`);
  }

  // Check for missing input validation
  if ((content.includes('<input') || content.includes('<textarea')) && !content.includes('validation')) {
    issues.push(`${filePath}: Form inputs detected without apparent validation`);
  }
}

function auditDependencies() {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

    const securityDeps = [];
    const missingDeps = [];

    if (dependencies.dompurify) {
      securityDeps.push(`✅ DOMPurify ${dependencies.dompurify} installed`);
    } else {
      missingDeps.push('❌ DOMPurify not installed - needed for HTML sanitization');
    }

    if (dependencies.firebase) {
      securityDeps.push(`✅ Firebase ${dependencies.firebase} - ensure proper security rules`);
    }

    return { securityDeps, missingDeps };
  } catch (error) {
    return { securityDeps: [], missingDeps: ['❌ Could not read package.json'] };
  }
}

// Main audit process
const securityIssues = [];
const warnings = [];
const recommendations = [];

log('🔍 Scanning codebase for security issues...', 'blue');

// 1. Check dependencies
log('📦 Checking dependencies...', 'magenta');
const { securityDeps, missingDeps } = auditDependencies();

securityDeps.forEach(dep => log(dep, 'green'));
missingDeps.forEach(dep => {
  log(dep, 'red');
  securityIssues.push(dep);
});

// 2. Scan source files
log('🔎 Scanning source files...', 'magenta');
const srcDir = 'src';

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      scanDirectory(filePath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
      checkFileForIssues(filePath, securityIssues);
    }
  });
}

scanDirectory(srcDir);

// 3. Check for HTML content that needs sanitization
log('🧹 Checking for HTML content that needs sanitization...', 'magenta');
try {
  const aiService = fs.readFileSync('src/services/aiService.js', 'utf8');
  if (aiService.includes('<strong>') || aiService.includes('<em>')) {
    warnings.push('AI service returns HTML content - ensure proper sanitization before rendering');
  }
} catch (error) {
  // File might not exist
}

// 4. Check Firebase security
log('🔥 Checking Firebase security configuration...', 'magenta');
try {
  const firebaseConfig = fs.readFileSync('src/firebase/config.js', 'utf8');
  if (firebaseConfig.includes('process.env')) {
    log('✅ Firebase config uses environment variables', 'green');
  } else {
    warnings.push('Firebase config may expose sensitive information');
  }
} catch (error) {
  warnings.push('Could not check Firebase configuration');
}

// 5. Generate recommendations
recommendations.push('Install and use DOMPurify for all HTML content rendering');
recommendations.push('Implement input validation for all user inputs');
recommendations.push('Use Content Security Policy (CSP) headers');
recommendations.push('Regularly update dependencies for security patches');
recommendations.push('Implement proper Firebase security rules');
recommendations.push('Use HTTPS in production');
recommendations.push('Implement rate limiting for API calls');

// 6. Summary
log('\n📋 Security Audit Summary:', 'magenta');

if (securityIssues.length > 0) {
  log('🚨 Critical Security Issues:', 'red');
  securityIssues.forEach(issue => log(`  - ${issue}`, 'red'));
} else {
  log('✅ No critical security issues found', 'green');
}

if (warnings.length > 0) {
  log('⚠️ Warnings:', 'yellow');
  warnings.forEach(warning => log(`  - ${warning}`, 'yellow'));
}

log('\n💡 Security Recommendations:', 'cyan');
recommendations.forEach(rec => log(`  - ${rec}`, 'reset'));

log('\n🔒 Security audit completed!', 'green');