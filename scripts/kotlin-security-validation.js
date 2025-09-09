const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

// Create a DOM window for DOMPurify
const window = new JSDOM('').window;
const DOMPurifyInstance = DOMPurify(window);

// Validation function for content security
function validateContentSecurity(content, contentType = 'text') {
  const results = {
    isValid: true,
    issues: [],
    sanitizedContent: '',
    validationSummary: {}
  };

  try {
    if (contentType === 'html') {
      // For HTML content, use DOMPurify to sanitize
      const sanitized = DOMPurifyInstance.sanitize(content, {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'code', 'pre', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        ALLOWED_ATTR: [],
        ALLOW_DATA_ATTR: false
      });

      results.sanitizedContent = sanitized;

      // Check for potential XSS patterns
      const xssPatterns = [
        /<script[^>]*>.*?<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
        /<iframe[^>]*>/gi,
        /<object[^>]*>/gi,
        /<embed[^>]*>/gi,
        /<form[^>]*>/gi,
        /<input[^>]*>/gi,
        /<meta[^>]*>/gi,
        /<link[^>]*>/gi
      ];

      xssPatterns.forEach((pattern, index) => {
        const matches = content.match(pattern);
        if (matches) {
          results.issues.push({
            type: 'XSS_PATTERN',
            pattern: pattern.toString(),
            matches: matches.length,
            severity: 'HIGH'
          });
          results.isValid = false;
        }
      });

      // Check if content was modified during sanitization
      if (sanitized !== content) {
        results.issues.push({
          type: 'CONTENT_MODIFIED',
          description: 'Content was modified during sanitization',
          severity: 'MEDIUM'
        });
      }

    } else if (contentType === 'text') {
      // For text content, check for markdown and code patterns
      results.sanitizedContent = content;

      // Check for potentially dangerous markdown patterns
      const dangerousMarkdown = [
        /\[.*\]\(javascript:[^\)]*\)/gi,  // JavaScript links
        /<script[^>]*>.*?<\/script>/gi,   // Script tags
        /<iframe[^>]*>/gi,                // Iframes
        /<object[^>]*>/gi,                // Objects
        /<embed[^>]*>/gi                  // Embeds
      ];

      dangerousMarkdown.forEach((pattern, index) => {
        const matches = content.match(pattern);
        if (matches) {
          results.issues.push({
            type: 'DANGEROUS_MARKDOWN',
            pattern: pattern.toString(),
            matches: matches.length,
            severity: 'HIGH'
          });
          results.isValid = false;
        }
      });
    }

    // Validate code examples for injection vulnerabilities
    if (contentType === 'code') {
      results.sanitizedContent = content;

      // Check for template literal injection patterns
      const injectionPatterns = [
        /\$\{.*?\}/g,  // Template literals that might contain user input
        /eval\s*\(/gi, // Direct eval usage
        /Function\s*\(/gi, // Function constructor
        /setTimeout\s*\(\s*['"`]/gi, // setTimeout with string code
        /setInterval\s*\(\s*['"`]/gi  // setInterval with string code
      ];

      injectionPatterns.forEach((pattern) => {
        const matches = content.match(pattern);
        if (matches) {
          results.issues.push({
            type: 'CODE_INJECTION',
            pattern: pattern.toString(),
            matches: matches.length,
            severity: 'MEDIUM'
          });
          // Code injection is flagged but doesn't make content invalid
        }
      });
    }

    // Generate validation summary
    results.validationSummary = {
      totalIssues: results.issues.length,
      highSeverity: results.issues.filter(i => i.severity === 'HIGH').length,
      mediumSeverity: results.issues.filter(i => i.severity === 'MEDIUM').length,
      lowSeverity: results.issues.filter(i => i.severity === 'LOW').length,
      contentLength: content.length,
      contentType: contentType
    };

  } catch (error) {
    results.isValid = false;
    results.issues.push({
      type: 'VALIDATION_ERROR',
      description: `Validation failed: ${error.message}`,
      severity: 'HIGH'
    });
  }

  return results;
}

// Function to validate the entire Kotlin module
function validateKotlinModule(kotlinData) {
  const validationResults = {
    overallValid: true,
    sectionResults: [],
    summary: {
      totalSections: 0,
      validSections: 0,
      totalIssues: 0,
      highSeverityIssues: 0,
      contentTypesValidated: new Set()
    }
  };

  try {
    // Validate basic structure
    if (!kotlinData.sections || !Array.isArray(kotlinData.sections)) {
      throw new Error('Invalid module structure: missing or invalid sections array');
    }

    validationResults.summary.totalSections = kotlinData.sections.length;

    // Validate each section
    kotlinData.sections.forEach((section, index) => {
      const sectionResult = {
        sectionIndex: index,
        sectionTitle: section.title || 'Untitled',
        isValid: true,
        contentValidation: null,
        codeExamplesValidation: []
      };

      // Validate section content
      if (section.content) {
        const contentValidation = validateContentSecurity(section.content, 'text');
        sectionResult.contentValidation = contentValidation;
        sectionResult.isValid = sectionResult.isValid && contentValidation.isValid;

        validationResults.summary.contentTypesValidated.add('text');
      }

      // Validate code examples
      if (section.codeExamples && Array.isArray(section.codeExamples)) {
        section.codeExamples.forEach((example, exIndex) => {
          if (example.code) {
            const codeValidation = validateContentSecurity(example.code, 'code');
            sectionResult.codeExamplesValidation.push({
              exampleIndex: exIndex,
              title: example.title || 'Untitled',
              language: example.language || 'unknown',
              validation: codeValidation
            });

            sectionResult.isValid = sectionResult.isValid && codeValidation.isValid;
            validationResults.summary.contentTypesValidated.add('code');
          }
        });
      }

      // Update overall validation
      if (sectionResult.isValid) {
        validationResults.summary.validSections++;
      } else {
        validationResults.overallValid = false;
      }

      validationResults.sectionResults.push(sectionResult);
    });

    // Calculate summary statistics
    validationResults.sectionResults.forEach(section => {
      if (section.contentValidation) {
        validationResults.summary.totalIssues += section.contentValidation.issues.length;
        validationResults.summary.highSeverityIssues +=
          section.contentValidation.issues.filter(i => i.severity === 'HIGH').length;
      }

      section.codeExamplesValidation.forEach(example => {
        validationResults.summary.totalIssues += example.validation.issues.length;
        validationResults.summary.highSeverityIssues +=
          example.validation.issues.filter(i => i.severity === 'HIGH').length;
      });
    });

    validationResults.summary.contentTypesValidated = Array.from(validationResults.summary.contentTypesValidated);

  } catch (error) {
    validationResults.overallValid = false;
    validationResults.error = error.message;
  }

  return validationResults;
}

// Export functions for use
module.exports = {
  validateContentSecurity,
  validateKotlinModule
};