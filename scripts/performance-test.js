#!/usr/bin/env node

/**
 * Performance Testing Script
 * Runs various performance checks on the AI Learning Platform
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Performance Tests...\n');

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

function runCommand(command, description) {
  try {
    log(`📊 ${description}...`, 'blue');
    const result = execSync(command, { encoding: 'utf8' });
    log(`✅ ${description} completed`, 'green');
    return result;
  } catch (error) {
    log(`❌ ${description} failed: ${error.message}`, 'red');
    return null;
  }
}

// 1. Build the application
log('🏗️ Building application for analysis...', 'magenta');
runCommand('npm run build', 'Building application');

// 2. Analyze bundle size
log('📦 Analyzing bundle size...', 'magenta');
try {
  const stats = fs.statSync('dist/assets/index-*.js');
  const bundleSizeKB = (stats.size / 1024).toFixed(2);
  log(`📊 Bundle size: ${bundleSizeKB} KB`, 'cyan');

  if (bundleSizeKB > 500) {
    log('⚠️  Bundle size is large (>500KB). Consider code splitting.', 'yellow');
  } else if (bundleSizeKB > 200) {
    log('✅ Bundle size is reasonable.', 'green');
  } else {
    log('🎉 Bundle size is excellent!', 'green');
  }
} catch (error) {
  log('❌ Could not analyze bundle size', 'red');
}

// 3. Check for performance issues in code
log('🔍 Checking for performance anti-patterns...', 'magenta');
const perfIssues = [];

// Check for console.log statements (should be removed in production)
try {
  const files = execSync('find src -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx"', { encoding: 'utf8' });
  const fileList = files.trim().split('\n');

  let consoleLogCount = 0;
  fileList.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      const consoleLogs = (content.match(/console\.(log|warn|error)/g) || []).length;
      consoleLogCount += consoleLogs;
    }
  });

  if (consoleLogCount > 0) {
    perfIssues.push(`${consoleLogCount} console statements found (should be removed in production)`);
  }
} catch (error) {
  log('⚠️ Could not check for console statements', 'yellow');
}

// 4. Run Lighthouse audit (if server is running)
log('🏮 Running Lighthouse performance audit...', 'magenta');
const lighthouseResult = runCommand('npm run lighthouse:mobile', 'Lighthouse mobile audit');

if (lighthouseResult) {
  try {
    const results = JSON.parse(fs.readFileSync('./lighthouse-results/mobile.json', 'utf8'));
    const perfScore = results.categories.performance.score * 100;
    const accessibilityScore = results.categories.accessibility.score * 100;
    const bestPracticesScore = results.categories['best-practices'].score * 100;
    const seoScore = results.categories.seo.score * 100;

    log(`📊 Performance Score: ${perfScore}/100`, perfScore >= 80 ? 'green' : 'yellow');
    log(`♿ Accessibility Score: ${accessibilityScore}/100`, accessibilityScore >= 90 ? 'green' : 'yellow');
    log(`✨ Best Practices Score: ${bestPracticesScore}/100`, bestPracticesScore >= 90 ? 'green' : 'yellow');
    log(`🔍 SEO Score: ${seoScore}/100`, seoScore >= 90 ? 'green' : 'yellow');

  } catch (error) {
    log('⚠️ Could not parse Lighthouse results', 'yellow');
  }
}

// 5. Summary
log('\n📋 Performance Test Summary:', 'magenta');

if (perfIssues.length > 0) {
  log('⚠️ Issues found:', 'yellow');
  perfIssues.forEach(issue => log(`  - ${issue}`, 'yellow'));
} else {
  log('✅ No major performance issues detected', 'green');
}

log('\n🎯 Recommendations:', 'cyan');
log('  - Run Lighthouse audits regularly during development', 'reset');
log('  - Monitor bundle size and implement code splitting if needed', 'reset');
log('  - Use React DevTools Profiler to identify performance bottlenecks', 'reset');
log('  - Consider implementing service worker for caching', 'reset');

log('\n✨ Performance testing completed!', 'green');