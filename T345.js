const T345_CONTENT_GENERATION_PROMPT = {
  id: "T345-Rest",
  name: "T345-Rest: Comprehensive Content Generation for Tiers 3, 4, and 5",
  version: "1.0",
  description: "Systematic content generation prompt for advanced technologies across Tiers 3, 4, and 5 with complete documentation adherence, validation, and integration requirements.",

  executionRequirements: {
    adherence: [
      "Complete adherence to existing documentation standards",
      "Follow established JSON schema for content modules",
      "Maintain consistency with Tier 1 and Tier 2 content structure",
      "Include all required fields: id, tier, name, description, difficulty, estimatedHours, prerequisites, learningObjectives, sections, projects, assessments, aiPrompts, resources, toolsRequired, bestPractices, commonPitfalls, careerRelevance"
    ],
    postExecution: [
      "Update DEVELOPMENT_PLAN.md checklist after each technology completion",
      "Mark all columns as completed: Learning Objectives, Sections & Content, Code Examples, AI Prompts, Resources, Tools Required, Best Practices, Common Pitfalls, Career Relevance",
      "Update lessons.js with proper imports and module registration",
      "Run comprehensive validation checks for integration",
      "Execute DOMPurify validation on all generated content",
      "Perform final document adherence verification"
    ],
    validation: [
      "File structure validation",
      "Module integration verification",
      "Content completeness checks",
      "Security validation with DOMPurify",
      "Cross-reference validation with existing technologies"
    ]
  },

  tierDefinitions: {
    tier3: {
      name: "Tier 3: Advanced Framework & Database Technologies",
      technologies: [
        {
          id: "react",
          name: "React",
          description: "Component-based UI library for building interactive user interfaces",
          prerequisites: ["javascript", "html5", "css3"],
          focus: "Modern React patterns, hooks, state management, performance optimization"
        },
        {
          id: "firebase",
          name: "Firebase",
          description: "Backend-as-a-Service platform for web and mobile applications",
          prerequisites: ["javascript", "authentication"],
          focus: "Firestore, Authentication, Storage, Hosting, Cloud Functions"
        },
        {
          id: "mongodb",
          name: "MongoDB",
          description: "NoSQL document database for modern applications",
          prerequisites: ["nodejs", "json"],
          focus: "Document modeling, aggregation, indexing, performance optimization"
        },
        {
          id: "authentication",
          name: "Authentication",
          description: "User authentication and authorization systems",
          prerequisites: ["nodejs", "security"],
          focus: "JWT, OAuth, session management, security best practices"
        },
        {
          id: "testing",
          name: "Testing",
          description: "Comprehensive testing strategies for web applications",
          prerequisites: ["javascript", "nodejs"],
          focus: "Unit testing, integration testing, E2E testing, test-driven development"
        }
      ]
    },

    tier4: {
      name: "Tier 4: Enterprise & DevOps Technologies",
      technologies: [
        {
          id: "typescript",
          name: "TypeScript",
          description: "Typed superset of JavaScript for scalable applications",
          prerequisites: ["javascript", "nodejs"],
          focus: "Type system, interfaces, generics, advanced patterns, tooling"
        },
        {
          id: "docker",
          name: "Docker",
          description: "Containerization platform for application deployment",
          prerequisites: ["nodejs", "linux"],
          focus: "Containerization, Docker Compose, multi-stage builds, orchestration"
        },
        {
          id: "cloud-services",
          name: "Cloud Services",
          description: "Cloud computing platforms and services",
          prerequisites: ["docker", "monitoring"],
          focus: "AWS, Azure, GCP services, serverless, microservices architecture"
        },
        {
          id: "ci-cd",
          name: "CI/CD",
          description: "Continuous Integration and Continuous Deployment",
          prerequisites: ["git", "docker", "testing"],
          focus: "GitHub Actions, Jenkins, pipelines, automated testing, deployment strategies"
        },
        {
          id: "monitoring",
          name: "Monitoring",
          description: "Application monitoring and observability",
          prerequisites: ["nodejs", "cloud-services"],
          focus: "Logging, metrics, alerting, performance monitoring, APM tools"
        }
      ]
    },

    tier5: {
      name: "Tier 5: Mobile & Cross-Platform Development",
      technologies: [
        {
          id: "react-native",
          name: "React Native",
          description: "Framework for building native mobile apps with React",
          prerequisites: ["react", "javascript", "mobile-development"],
          focus: "Native components, navigation, platform APIs, app store deployment"
        },
        {
          id: "flutter",
          name: "Flutter",
          description: "UI toolkit for building natively compiled applications",
          prerequisites: ["dart", "mobile-development"],
          focus: "Widget system, state management, platform channels, app deployment"
        },
        {
          id: "swift",
          name: "Swift",
          description: "Programming language for iOS and macOS development",
          prerequisites: ["ios-development", "objective-c"],
          focus: "Swift syntax, iOS frameworks, memory management, app architecture"
        },
        {
          id: "kotlin",
          name: "Kotlin",
          description: "Modern programming language for Android development",
          prerequisites: ["java", "android-development"],
          focus: "Kotlin syntax, Android frameworks, coroutines, app architecture"
        }
      ]
    }
  },

  contentStructure: {
    requiredFields: [
      "id", "tier", "name", "description", "difficulty", "estimatedHours",
      "prerequisites", "learningObjectives", "sections", "projects",
      "assessments", "aiPrompts", "resources", "toolsRequired",
      "bestPractices", "commonPitfalls", "careerRelevance"
    ],

    sectionRequirements: {
      minimumSections: 4,
      maximumSections: 8,
      requiredElements: [
        "title", "content", "keyTopics", "practicalExercises", "codeExamples"
      ]
    },

    codeExamples: {
      minimumPerSection: 2,
      types: ["basic", "intermediate", "advanced", "real-world"],
      requirements: ["working code", "comments", "error handling", "best practices"]
    },

    assessments: {
      types: ["quiz", "evaluation"],
      quizRequirements: "minimum 5 questions with correct answers",
      evaluationRequirements: "scenario-based questions for practical application"
    }
  },

  executionWorkflow: {
    phase1: {
      name: "Content Generation",
      steps: [
        "Select target technology from specified tier",
        "Review prerequisites and dependencies",
        "Generate comprehensive content module following JSON schema",
        "Include 4-8 detailed sections with practical examples",
        "Add assessments, AI prompts, and resources",
        "Ensure content adheres to documentation standards"
      ]
    },

    phase2: {
      name: "Integration",
      steps: [
        "Create content file in src/data/ directory",
        "Update src/data/lessons.js with import statement",
        "Add module to modules array",
        "Verify file structure and naming conventions"
      ]
    },

    phase3: {
      name: "Validation & Documentation",
      steps: [
        "Update DEVELOPMENT_PLAN.md checklist for completed technology",
        "Mark all columns as completed ([x])",
        "Run DOMPurify validation on generated content",
        "Execute comprehensive integration tests",
        "Perform final document adherence verification"
      ]
    },

    phase4: {
      name: "Quality Assurance",
      steps: [
        "Cross-reference with existing technologies",
        "Validate learning path dependencies",
        "Check content completeness and accuracy",
        "Verify code examples functionality",
        "Test module loading and navigation"
      ]
    }
  },

  validationChecklist: {
    contentValidation: [
      "JSON schema compliance",
      "All required fields present",
      "Content depth and accuracy",
      "Code examples functionality",
      "Assessment quality and coverage",
      "Resource relevance and currency"
    ],

    integrationValidation: [
      "File creation in correct directory",
      "Import statement in lessons.js",
      "Module registration in modules array",
      "File naming convention adherence",
      "No syntax or import errors"
    ],

    documentationValidation: [
      "DEVELOPMENT_PLAN.md updated correctly",
      "All checklist columns marked completed",
      "Consistent formatting maintained",
      "Progress tracking accuracy"
    ],

    securityValidation: [
      "DOMPurify validation passed",
      "No XSS vulnerabilities in content",
      "Safe code examples",
      "Proper input sanitization"
    ]
  },

  successCriteria: {
    contentQuality: [
      "Comprehensive coverage of technology fundamentals",
      "Practical, real-world examples",
      "Progressive difficulty from basic to advanced",
      "Clear learning objectives and outcomes",
      "Industry-standard best practices"
    ],

    technicalAccuracy: [
      "Current technology versions and features",
      "Correct syntax and implementation patterns",
      "Proper error handling and edge cases",
      "Performance optimization considerations",
      "Security best practices integration"
    ],

    integrationSuccess: [
      "Seamless integration with existing platform",
      "Proper navigation and module loading",
      "Consistent user experience",
      "No breaking changes to existing functionality",
      "Validated through comprehensive testing"
    ]
  },

  errorHandling: {
    contentGeneration: [
      "Validate prerequisites before generation",
      "Check for existing content conflicts",
      "Ensure technology version compatibility",
      "Verify resource availability and accuracy"
    ],

    integrationIssues: [
      "Check file permissions and access",
      "Validate import syntax and paths",
      "Test module loading functionality",
      "Verify navigation integration"
    ],

    validationFailures: [
      "Review DOMPurify error messages",
      "Check content for security vulnerabilities",
      "Validate JSON schema compliance",
      "Test cross-browser compatibility"
    ]
  },

  performanceRequirements: {
    contentSize: "50,000+ characters per technology module",
    codeExamples: "15+ working code examples per technology",
    sections: "4-8 comprehensive sections per technology",
    loadTime: "Module should load within 2 seconds",
    validationTime: "All validations should complete within 30 seconds"
  },

  maintenanceGuidelines: {
    updates: [
      "Regular content updates for technology changes",
      "Version compatibility monitoring",
      "Security vulnerability assessments",
      "Performance optimization reviews"
    ],

    monitoring: [
      "User engagement metrics tracking",
      "Content effectiveness analysis",
      "Technical accuracy verification",
      "Platform integration monitoring"
    ]
  }
};

export default T345_CONTENT_GENERATION_PROMPT;