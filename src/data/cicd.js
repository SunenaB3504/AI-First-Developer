export default {
  id: "cicd",
  tier: 4,
  name: "CI/CD",
  description: "Continuous Integration and Continuous Deployment (CI/CD) is a methodology that automates the process of integrating code changes, running tests, and deploying applications to production environments. CI/CD pipelines ensure code quality, reduce manual errors, and enable rapid, reliable software delivery through automated workflows that integrate development, testing, and deployment processes.",
  difficulty: "advanced",
  estimatedHours: 25,
  prerequisites: ["git", "docker", "testing"],
  learningObjectives: [
    "Design and implement comprehensive CI/CD pipelines using GitHub Actions and GitLab CI",
    "Configure automated testing integration within CI/CD workflows",
    "Implement various deployment strategies including blue-green and canary deployments",
    "Set up multi-environment deployment pipelines (development, staging, production)",
    "Integrate security scanning and vulnerability assessments into CI/CD pipelines",
    "Manage artifacts, versioning, and release management in CI/CD processes",
    "Monitor and troubleshoot CI/CD pipeline failures and performance issues",
    "Implement infrastructure as code deployment using CI/CD tools",
    "Configure automated rollback procedures and failure recovery mechanisms",
    "Optimize CI/CD pipeline performance and reduce build times",
    "Integrate third-party tools and services into CI/CD workflows",
    "Implement compliance and audit trails in CI/CD processes"
  ],
  sections: [
    {
      title: "CI/CD Fundamentals and Pipeline Design",
      content: "Continuous Integration and Continuous Deployment (CI/CD) represents a fundamental shift in software development practices, moving from manual, error-prone deployment processes to automated, reliable delivery pipelines. CI/CD pipelines automate the entire software delivery lifecycle, from code integration through testing, building, and deployment to production environments.\n\n**Core CI/CD Concepts**:\n- **Continuous Integration (CI)**: Automatically building and testing code changes as they are committed\n- **Continuous Deployment (CD)**: Automatically deploying tested code to production environments\n- **Continuous Delivery**: Ensuring code is always in a deployable state with manual approval gates\n- **Pipeline Orchestration**: Coordinating complex workflows across multiple stages and environments\n\n**Pipeline Architecture**:\nModern CI/CD pipelines follow a structured approach with distinct stages that ensure quality and reliability. Each stage serves a specific purpose in the delivery process, from initial code validation through final production deployment. The pipeline acts as a quality gate, preventing problematic code from progressing to later stages.\n\n**Key Pipeline Components**:\n- **Triggers**: Events that initiate pipeline execution (push, pull request, schedule)\n- **Stages**: Logical groupings of related jobs (build, test, deploy)\n- **Jobs**: Individual units of work within a stage\n- **Steps**: Specific actions within a job (run command, use action, deploy)\n- **Artifacts**: Build outputs that can be passed between jobs or stored\n- **Environments**: Target deployment locations with specific configurations\n\n**Pipeline Design Principles**:\nEffective CI/CD pipelines follow several key design principles that ensure reliability, maintainability, and scalability. These principles guide the creation of robust automation workflows that can handle complex deployment scenarios while maintaining code quality and system stability.",
      keyTopics: [
        "CI/CD pipeline architecture and components",
        "Continuous Integration vs Continuous Deployment",
        "Pipeline triggers and event-driven automation",
        "Stage-based workflow design",
        "Artifact management and versioning"
      ],
      practicalExercises: [
        "Design a basic CI/CD pipeline for a Node.js application with build and test stages",
        "Create a multi-stage pipeline with separate environments for development and production",
        "Implement automated triggers for different types of code changes (feature branches, main branch)",
        "Configure artifact storage and retrieval between pipeline stages",
        "Set up pipeline notifications and status reporting"
      ],
      codeExamples: [
        {
          title: "Basic GitHub Actions Pipeline",
          language: "yaml",
          code: `name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run tests
        run: npm test -- --coverage

      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-files
          path: dist/
          retention-days: 30`
        },
        {
          title: "GitLab CI Pipeline Configuration",
          language: "yaml",
          code: `stages:
  - test
  - build
  - deploy

variables:
  DOCKER_IMAGE: $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG

cache:
  paths:
    - node_modules/
    - .npm/

test:
  stage: test
  image: node:18-alpine
  before_script:
    - npm ci --cache .npm --prefer-offline
  script:
    - npm run lint
    - npm test -- --coverage
  coverage: '/All files[^|]*\\|([^|]*)\\|[^|]*\\|[^|]*$/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
    expire_in: 1 week

build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker build -t $DOCKER_IMAGE .
    - docker push $DOCKER_IMAGE
  only:
    - main
    - develop

deploy_staging:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
    - ssh-keyscan -H $STAGING_HOST >> ~/.ssh/known_hosts
  script:
    - ssh $STAGING_USER@$STAGING_HOST "docker pull $DOCKER_IMAGE"
    - ssh $STAGING_USER@$STAGING_HOST "docker-compose up -d"
  environment:
    name: staging
    url: https://staging.example.com
  only:
    - develop

deploy_production:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
    - ssh-keyscan -H $PRODUCTION_HOST >> ~/.ssh/known_hosts
  script:
    - ssh $PRODUCTION_USER@$PRODUCTION_HOST "docker pull $DOCKER_IMAGE"
    - ssh $PRODUCTION_USER@$PRODUCTION_HOST "docker-compose up -d"
  environment:
    name: production
    url: https://example.com
  when: manual
  only:
    - main`
        }
      ]
    },
    {
      title: "Automated Testing Integration",
      content: "Automated testing is the cornerstone of effective CI/CD pipelines, ensuring that code changes don't introduce regressions or break existing functionality. CI/CD platforms provide seamless integration with various testing frameworks and tools, enabling comprehensive test automation across different levels.\n\n**Testing Pyramid in CI/CD**:\nThe testing pyramid represents different levels of testing that should be integrated into CI/CD pipelines. Each level serves a specific purpose in ensuring code quality and preventing issues from reaching production.\n\n**Unit Testing Integration**:\nUnit tests are the foundation of the testing pyramid, providing fast feedback on individual code components. CI/CD pipelines can run unit tests on every commit, ensuring that basic functionality remains intact.\n\n**Integration Testing**:\nIntegration tests verify that different components work together correctly. These tests are crucial for microservices architectures and complex applications with multiple interacting parts.\n\n**End-to-End Testing**:\nE2E tests simulate real user scenarios, testing the entire application from the user's perspective. While slower to execute, they provide confidence that the application works as expected in production-like environments.\n\n**Test Automation Best Practices**:\n- **Parallel Execution**: Run tests in parallel to reduce pipeline execution time\n- **Test Selection**: Run only relevant tests based on code changes\n- **Flaky Test Management**: Identify and fix unreliable tests\n- **Test Data Management**: Use appropriate test data for different environments\n- **Test Reporting**: Generate comprehensive test reports and coverage metrics\n\n**Performance Testing Integration**:\nPerformance tests ensure that applications meet performance requirements under various load conditions. CI/CD pipelines can include automated performance testing to catch performance regressions early.\n\n**Security Testing Integration**:\nSecurity testing should be integrated into CI/CD pipelines to identify vulnerabilities early in the development process. Automated security scans can check for common vulnerabilities and ensure compliance with security standards.",
      keyTopics: [
        "Testing pyramid and test automation strategies",
        "Unit testing integration in CI/CD pipelines",
        "Integration and end-to-end testing automation",
        "Test parallelization and optimization",
        "Performance and security testing in CI/CD"
      ],
      practicalExercises: [
        "Integrate Jest unit tests into a GitHub Actions pipeline with coverage reporting",
        "Set up Cypress end-to-end tests in a CI/CD pipeline with video recording",
        "Configure parallel test execution to reduce pipeline run time",
        "Implement test result reporting and notifications in CI/CD",
        "Set up automated performance testing using Lighthouse CI"
      ],
      codeExamples: [
        {
          title: "Jest Testing with GitHub Actions",
          language: "yaml",
          code: `name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm test -- --coverage --watchAll=false

      - name: Run integration tests
        run: npm run test:integration

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
          flags: unittests
          name: codecov-umbrella
          fail_ci_if_error: false

  e2e:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Run E2E tests
        uses: cypress-io/github-action@v5
        with:
          build: npm run build
          start: npm start
          wait-on: 'http://localhost:3000'
          record: true
        env:
          CYPRESS_RECORD_KEY: \${{ secrets.CYPRESS_RECORD_KEY }}

      - name: Upload E2E screenshots
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: cypress-screenshots
          path: cypress/screenshots/
          retention-days: 7`
        },
        {
          title: "Performance Testing with Lighthouse",
          language: "yaml",
          code: `name: Performance Test

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  lighthouse:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Start application
        run: npm start &
        env:
          PORT: 3000

      - name: Wait for app to be ready
        run: |
          timeout 60 bash -c 'until curl -f http://localhost:3000 > /dev/null 2>&1; do sleep 1; done'

      - name: Run Lighthouse audit
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: http://localhost:3000
          configPath: .lighthouserc.json
          uploadArtifacts: true
          temporaryPublicStorage: true

      - name: Stop application
        run: pkill -f "npm start"

  load-test:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Start application
        run: npm start &
        env:
          PORT: 3000

      - name: Wait for app to be ready
        run: |
          timeout 60 bash -c 'until curl -f http://localhost:3000 > /dev/null 2>&1; do sleep 1; done'

      - name: Run load test
        uses: artilleryio/action-cli@v1
        with:
          command: run --output report.json artillery-config.yml

      - name: Upload load test results
        uses: actions/upload-artifact@v3
        with:
          name: load-test-report
          path: report.json
          retention-days: 30

      - name: Stop application
        run: pkill -f "npm start"`
        }
      ]
    },
    {
      title: "Deployment Strategies and Environments",
      content: "Deployment strategies determine how new versions of applications are rolled out to production environments while minimizing risk and ensuring high availability. CI/CD pipelines support various deployment patterns that can be automated and orchestrated to meet different business requirements.\n\n**Blue-Green Deployment**:\nBlue-green deployment involves maintaining two identical production environments. One environment (blue) serves live traffic while the other (green) is updated with the new version. Once testing is complete, traffic is switched from blue to green, providing zero-downtime deployments.\n\n**Canary Deployment**:\nCanary deployments gradually roll out new versions to a small subset of users before full deployment. This approach allows for testing in production with real traffic while minimizing the impact of potential issues.\n\n**Rolling Deployment**:\nRolling deployments update instances incrementally, replacing old versions with new ones in small batches. This strategy provides a balance between speed and safety, allowing for gradual rollout with the ability to rollback if issues are detected.\n\n**Feature Flags**:\nFeature flags (or feature toggles) allow enabling or disabling features without deploying new code. This approach enables dark launches, A/B testing, and gradual feature rollouts independent of deployment schedules.\n\n**Environment Management**:\nMulti-environment setups are crucial for maintaining code quality throughout the development lifecycle. Each environment serves a specific purpose and has different configurations and access controls.\n\n**Database Deployment Strategies**:\nDatabase changes require special consideration in deployment strategies. Techniques like database migrations, schema versioning, and backward compatibility ensure safe database updates.\n\n**Rollback Procedures**:\nAutomated rollback procedures are essential for quickly recovering from failed deployments. CI/CD pipelines should include rollback strategies that can be triggered automatically or manually when issues are detected.",
      keyTopics: [
        "Blue-green and canary deployment strategies",
        "Rolling deployments and feature flags",
        "Multi-environment management",
        "Database deployment and migration strategies",
        "Automated rollback procedures"
      ],
      practicalExercises: [
        "Implement blue-green deployment using Kubernetes and CI/CD",
        "Set up canary deployment with traffic splitting using service mesh",
        "Configure rolling deployment strategy with health checks",
        "Implement feature flags for gradual feature rollouts",
        "Create automated rollback procedures for failed deployments"
      ],
      codeExamples: [
        {
          title: "Blue-Green Deployment with Kubernetes",
          language: "yaml",
          code: `# Blue-Green Deployment Pipeline
name: Blue-Green Deployment

on:
  push:
    branches: [ main ]

env:
  BLUE_ENV: production-blue
  GREEN_ENV: production-green

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup kubectl
        uses: azure/setup-kubectl@v3
        with:
          version: 'v1.28.0'

      - name: Configure kubectl
        run: |
          echo "\${{ secrets.KUBE_CONFIG }}" | base64 -d > kubeconfig
          export KUBECONFIG=kubeconfig

      - name: Determine target environment
        id: target
        run: |
          # Check which environment is currently active
          BLUE_STATUS=$(kubectl get deployment myapp-blue -n default -o jsonpath='{.status.availableReplicas}' 2>/dev/null || echo "0")
          GREEN_STATUS=$(kubectl get deployment myapp-green -n default -o jsonpath='{.status.availableReplicas}' 2>/dev/null || echo "0")

          if [ "$BLUE_STATUS" -gt 0 ] && [ "$GREEN_STATUS" -eq 0 ]; then
            echo "target=green" >> $GITHUB_OUTPUT
            echo "source=blue" >> $GITHUB_OUTPUT
          elif [ "$GREEN_STATUS" -gt 0 ] && [ "$BLUE_STATUS" -eq 0 ]; then
            echo "target=blue" >> $GITHUB_OUTPUT
            echo "source=green" >> $GITHUB_OUTPUT
          else
            echo "target=blue" >> $GITHUB_OUTPUT
            echo "source=green" >> $GITHUB_OUTPUT
          fi

      - name: Deploy to target environment
        run: |
          TARGET_ENV=\${{ steps.target.outputs.target }}
          SOURCE_ENV=\${{ steps.target.outputs.source }}

          echo "Deploying to $TARGET_ENV environment"

          # Update deployment with new image
          kubectl set image deployment/myapp-$TARGET_ENV app=myapp:\${{ github.sha }} -n default

          # Wait for deployment to be ready
          kubectl rollout status deployment/myapp-$TARGET_ENV -n default --timeout=300s

      - name: Run smoke tests
        run: |
          TARGET_ENV=\${{ steps.target.outputs.target }}
          echo "Running smoke tests on $TARGET_ENV environment"

          # Wait for service to be ready
          kubectl wait --for=condition=available --timeout=300s deployment/myapp-$TARGET_ENV -n default

          # Get service URL
          SERVICE_IP=$(kubectl get svc myapp -n default -o jsonpath='{.status.loadBalancer.ingress[0].ip}')

          # Run smoke tests
          curl -f http://$SERVICE_IP/health || exit 1

      - name: Switch traffic (manual approval)
        if: success()
        run: |
          TARGET_ENV=\${{ steps.target.outputs.target }}
          SOURCE_ENV=\${{ steps.target.outputs.source }}

          echo "Switching traffic to $TARGET_ENV environment"

          # Update service selector to point to new deployment
          kubectl patch svc myapp -n default -p "{\\"spec\\": {\\"selector\\": {\\"app\\": \\"myapp\\", \\"version\\": \\"$TARGET_ENV\\"}}}"
        environment:
          name: production
          url: https://myapp.example.com

      - name: Cleanup old deployment
        if: success()
        run: |
          SOURCE_ENV=\${{ steps.target.outputs.source }}
          echo "Cleaning up $SOURCE_ENV environment"

          # Scale down old deployment
          kubectl scale deployment myapp-$SOURCE_ENV --replicas=0 -n default`
        },
        {
          title: "Canary Deployment with Istio",
          language: "yaml",
          code: `# Canary Deployment with Istio
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: myapp-canary
spec:
  http:
  - route:
    - destination:
        host: myapp
        subset: v1
      weight: 90
    - destination:
        host: myapp
        subset: v2
      weight: 10
---
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: myapp-canary
spec:
  host: myapp
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2
---
# GitHub Actions Pipeline for Canary Deployment
name: Canary Deployment

on:
  push:
    branches: [ main ]

jobs:
  canary-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup kubectl
        uses: azure/setup-kubectl@v3
        with:
          version: 'v1.28.0'

      - name: Configure kubectl
        run: |
          echo "\${{ secrets.KUBE_CONFIG }}" | base64 -d > kubeconfig
          export KUBECONFIG=kubeconfig

      - name: Deploy canary version
        run: |
          # Deploy new version with canary label
          kubectl apply -f k8s/canary-deployment.yml

          # Update image
          kubectl set image deployment/myapp-canary app=myapp:\${{ github.sha }} -n default

          # Wait for deployment
          kubectl rollout status deployment/myapp-canary -n default --timeout=300s

      - name: Update Istio VirtualService
        run: |
          # Gradually increase traffic to canary (10% -> 25% -> 50% -> 100%)
          kubectl apply -f k8s/virtualservice-25.yml
          sleep 300  # Wait 5 minutes for monitoring

          kubectl apply -f k8s/virtualservice-50.yml
          sleep 300  # Wait 5 minutes for monitoring

          kubectl apply -f k8s/virtualservice-100.yml

      - name: Monitor canary deployment
        run: |
          # Check error rates, latency, etc.
          # This would integrate with monitoring tools
          echo "Monitoring canary deployment..."

          # If metrics are good, proceed
          # If issues detected, rollback automatically

      - name: Promote or rollback
        run: |
          # Based on monitoring results, either:
          # 1. Promote canary to stable (update stable deployment)
          # 2. Rollback canary (scale down and redirect traffic)

          if [ "\${{ steps.monitor.outputs.status }}" = "healthy" ]; then
            echo "Promoting canary to stable"
            kubectl set image deployment/myapp-stable app=myapp:\${{ github.sha }} -n default
            kubectl scale deployment/myapp-canary --replicas=0 -n default
          else
            echo "Rolling back canary deployment"
            kubectl scale deployment/myapp-canary --replicas=0 -n default
            kubectl apply -f k8s/virtualservice-stable.yml
          fi`
        }
      ]
    },
    {
      title: "Security Scanning and Compliance",
      content: "Security scanning and compliance integration in CI/CD pipelines is essential for maintaining secure software delivery practices. Automated security checks help identify vulnerabilities early in the development process, reducing the risk of security incidents in production.\n\n**Static Application Security Testing (SAST)**:\nSAST analyzes source code to identify security vulnerabilities without executing the code. It can detect issues like SQL injection, cross-site scripting (XSS), and other common security flaws.\n\n**Dynamic Application Security Testing (DAST)**:\nDAST tests running applications by simulating attacks and analyzing responses. It identifies runtime vulnerabilities that SAST might miss, such as authentication bypasses and session management issues.\n\n**Software Composition Analysis (SCA)**:\nSCA scans third-party dependencies for known vulnerabilities. With the proliferation of open-source components, SCA is crucial for maintaining secure software supply chains.\n\n**Container Security Scanning**:\nContainer images should be scanned for vulnerabilities before deployment. This includes checking base images, installed packages, and application dependencies for known security issues.\n\n**Infrastructure as Code Security**:\nIaC templates and configurations should be scanned for security misconfigurations. Tools like Checkov and Terrascan can identify insecure configurations in Terraform, CloudFormation, and Kubernetes manifests.\n\n**Secrets Management**:\nAutomated detection of hardcoded secrets, API keys, and other sensitive information prevents accidental exposure of credentials in source code.\n\n**Compliance Automation**:\nCI/CD pipelines can automate compliance checks for industry standards like PCI-DSS, HIPAA, and SOC 2. Automated compliance testing ensures that deployments meet regulatory requirements.\n\n**Security Gate Implementation**:\nSecurity gates prevent insecure code from progressing through the pipeline. Failed security checks can block deployments or require manual approval for exceptions.",
      keyTopics: [
        "SAST, DAST, and SCA integration in CI/CD",
        "Container and IaC security scanning",
        "Secrets detection and management",
        "Compliance automation and security gates",
        "Vulnerability management workflows"
      ],
      practicalExercises: [
        "Integrate SAST scanning using SonarQube in CI/CD pipeline",
        "Set up dependency vulnerability scanning with OWASP Dependency-Check",
        "Configure container image scanning with Trivy or Clair",
        "Implement secrets detection using GitLeaks",
        "Create security gates that block deployments on high-severity findings"
      ],
      codeExamples: [
        {
          title: "Security Scanning Pipeline",
          language: "yaml",
          code: `name: Security Scan

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  security-scan:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'

      - name: Upload Trivy scan results to GitHub Security tab
        uses: github/codeql-action/upload-sarif@v2
        if: always()
        with:
          sarif_file: 'trivy-results.sarif'

      - name: Run OWASP Dependency Check
        uses: dependency-check/Dependency-Check_Action@main
        with:
          project: 'MyApp'
          path: '.'
          format: 'ALL'
          args: >
            --enableRetired
            --enableExperimental
            --nvdValidForHours 24

      - name: Upload Dependency Check results
        uses: actions/upload-artifact@v3
        with:
          name: dependency-check-report
          path: reports/

      - name: Run GitLeaks secrets scan
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          GITLEAKS_CONFIG: .gitleaks.toml

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        continue-on-error: true
        env:
          SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high

      - name: Run CodeQL Analysis
        uses: github/codeql-action/init@v2
        with:
          languages: javascript

      - name: Autobuild
        uses: github/codeql-action/autobuild@v2

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v2

  container-scan:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Build Docker image
        run: docker build -t myapp:\${{ github.sha }} .

      - name: Scan Docker image
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'image'
          scan-ref: 'myapp:\${{ github.sha }}'
          format: 'sarif'
          output: 'trivy-image-results.sarif'

      - name: Upload image scan results
        uses: github/codeql-action/upload-sarif@v2
        if: always()
        with:
          sarif_file: 'trivy-image-results.sarif'

      - name: Check for critical vulnerabilities
        run: |
          CRITICAL_VULNS=$(cat trivy-image-results.sarif | jq '.runs[0].results | length')
          if [ "$CRITICAL_VULNS" -gt 0 ]; then
            echo "Critical vulnerabilities found! Failing build."
            exit 1
          fi

  compliance-check:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Run Open Policy Agent (OPA) checks
        uses: open-policy-agent/setup-opa@v2
        with:
          version: latest

      - name: Check Kubernetes manifests
        run: |
          opa eval --data policy.rego --input k8s/ --format pretty data

      - name: Run license compliance check
        uses: licensee/licensee-action@v2
        with:
          path: '.'
          threshold: 80`
        },
        {
          title: "Infrastructure Security Scanning",
          language: "yaml",
          code: `# Infrastructure Security with Checkov
name: Infrastructure Security

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  terraform-security:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v2
        with:
          terraform_version: '1.5.0'

      - name: Terraform Format
        run: terraform fmt -check
        continue-on-error: true

      - name: Terraform Validate
        run: terraform validate

      - name: Checkov Security Scan
        uses: bridgecrewio/checkov-action@v12
        with:
          directory: infrastructure/
          framework: terraform
          output_format: cli
          output_file_path: checkov-results.txt

      - name: Upload Checkov results
        uses: actions/upload-artifact@v3
        with:
          name: checkov-results
          path: checkov-results.txt
          retention-days: 30

      - name: Fail on high severity issues
        run: |
          if grep -q "FAILED" checkov-results.txt; then
            echo "Security issues found in infrastructure code"
            cat checkov-results.txt
            exit 1
          fi

  kubernetes-security:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup kubectl
        uses: hashicorp/setup-terraform@v2
        with:
          terraform_version: '1.5.0'

      - name: KubeSec Security Scan
        uses: controlplaneio/kubesec-action@v1.1.0
        with:
          path: k8s/
          format: text
          exit-zero: false

      - name: Trivy Kubernetes Scan
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'config'
          scan-ref: 'k8s/'
          format: 'sarif'
          output: 'trivy-k8s-results.sarif'

      - name: Upload K8s security results
        uses: github/codeql-action/upload-sarif@v2
        if: always()
        with:
          sarif_file: 'trivy-k8s-results.sarif'

  secrets-detection:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Run GitLeaks
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}

      - name: Run TruffleHog
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: main
          head: HEAD
          extra_args: --debug --only-verified

      - name: Check for exposed secrets
        run: |
          if [ -f gitleaks-report.json ]; then
            SECRET_COUNT=$(jq '.[] | length' gitleaks-report.json 2>/dev/null || echo "0")
            if [ "$SECRET_COUNT" -gt 0 ]; then
              echo "Secrets detected in code! Failing build."
              cat gitleaks-report.json
              exit 1
            fi
          fi`
        }
      ]
    },
    {
      title: "Artifact Management and Release Automation",
      content: "Artifact management and release automation are critical components of mature CI/CD pipelines. Effective artifact management ensures that build outputs are properly versioned, stored, and distributed across different environments.\n\n**Artifact Types and Management**:\nArtifacts are the outputs of build processes that need to be preserved and distributed. This includes compiled binaries, Docker images, documentation, and test reports.\n\n**Semantic Versioning**:\nSemantic versioning (semver) provides a standardized way to version software releases. Following semver conventions helps users understand the nature of changes in each release.\n\n**Release Automation**:\nAutomated release processes ensure consistent and reliable software releases. This includes creating release branches, tagging commits, generating release notes, and publishing artifacts.\n\n**Package Registries**:\nPackage registries provide centralized storage for artifacts and dependencies. Popular registries include npm, PyPI, Docker Hub, and Artifactory.\n\n**Release Channels**:\nRelease channels allow different versions of software to be distributed to different user groups. Common channels include stable, beta, alpha, and nightly builds.\n\n**Automated Changelog Generation**:\nAutomated changelog generation creates release notes from commit messages and pull request descriptions. Tools like conventional-changelog automate this process.\n\n**Release Promotion**:\nRelease promotion moves artifacts through different environments automatically. This ensures that tested and approved versions progress from development to production.\n\n**Artifact Signing and Verification**:\nDigital signatures ensure the authenticity and integrity of released artifacts. This prevents tampering and provides trust in distributed software.",
      keyTopics: [
        "Artifact versioning and semantic versioning",
        "Package registries and artifact storage",
        "Automated release processes and changelogs",
        "Release channels and promotion strategies",
        "Artifact signing and verification"
      ],
      practicalExercises: [
        "Set up automated semantic versioning using git tags and GitHub releases",
        "Configure artifact publishing to package registries (npm, Docker Hub)",
        "Implement automated changelog generation from conventional commits",
        "Create release promotion workflows between environments",
        "Set up artifact signing and verification for secure releases"
      ],
      codeExamples: [
        {
          title: "Automated Release Pipeline",
          language: "yaml",
          code: `name: Release

on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build application
        run: npm run build

      - name: Generate changelog
        id: changelog
        run: |
          # Get the latest tag
          LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0")
          echo "latest_tag=$LATEST_TAG" >> $GITHUB_OUTPUT

          # Generate changelog using conventional-changelog
          npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0
          echo "changelog<<EOF" >> $GITHUB_OUTPUT
          cat CHANGELOG.md >> $GITHUB_OUTPUT
          echo "EOF" >> $GITHUB_OUTPUT

      - name: Create GitHub release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: \${{ github.ref_name }}
          release_name: Release \${{ github.ref_name }}
          body: \${{ steps.changelog.outputs.changelog }}
          draft: false
          prerelease: false

      - name: Build and push Docker image
        run: |
          # Build Docker image
          docker build -t myapp:\${{ github.ref_name }} .
          docker tag myapp:\${{ github.ref_name }} myapp:latest

          # Login to Docker Hub
          echo "\${{ secrets.DOCKER_PASSWORD }}" | docker login -u "\${{ secrets.DOCKER_USERNAME }}" --password-stdin

          # Push images
          docker push myapp:\${{ github.ref_name }}
          docker push myapp:latest

      - name: Publish to npm
        run: |
          # Update package version
          npm version \${{ github.ref_name }} --no-git-tag-version

          # Publish to npm
          npm publish
        env:
          NODE_AUTH_TOKEN: \${{ secrets.NPM_TOKEN }}

      - name: Deploy to production
        run: |
          # Deploy to production environment
          echo "Deploying \${{ github.ref_name }} to production"

          # Add deployment commands here
          # kubectl set image deployment/myapp app=myapp:\${{ github.ref_name }}

      - name: Notify stakeholders
        uses: 8398a7/action-slack@v3
        with:
          status: success
          text: "New release \${{ github.ref_name }} has been deployed to production!"
        env:
          SLACK_WEBHOOK_URL: \${{ secrets.SLACK_WEBHOOK_URL }}
        if: success()`
        },
        {
          title: "Semantic Versioning Automation",
          language: "yaml",
          code: `# Semantic Versioning with GitHub Actions
name: Semantic Release

on:
  push:
    branches: [ main ]

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: \${{ secrets.GITHUB_TOKEN }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build application
        run: npm run build

      - name: Semantic Release
        uses: cycjimmy/semantic-release-action@v3
        with:
          semantic_version: 19.0.5
          extra_plugins: |
            @semantic-release/changelog
            @semantic-release/git
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: \${{ secrets.NPM_TOKEN }}

  publish-artifacts:
    needs: release
    runs-on: ubuntu-latest
    if: needs.release.outputs.new_release_published == 'true'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Download release assets
        uses: actions/download-artifact@v3
        with:
          name: release-assets

      - name: Publish to Artifactory
        run: |
          # Publish artifacts to Artifactory or other repository
          echo "Publishing artifacts to Artifactory"

      - name: Update documentation
        run: |
          # Update version in documentation
          sed -i "s/version:.*/version: \${{ needs.release.outputs.new_release_version }}/g" docs/config.yml

          # Commit documentation changes
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add docs/
          git commit -m "docs: update version to \${{ needs.release.outputs.new_release_version }}" || true
          git push

      - name: Create deployment manifest
        run: |
          # Create deployment manifest for CD systems
          cat > deployment.yml << EOF
          apiVersion: apps/v1
          kind: Deployment
          metadata:
            name: myapp
            labels:
              app: myapp
              version: \${{ needs.release.outputs.new_release_version }}
          spec:
            replicas: 3
            selector:
              matchLabels:
                app: myapp
            template:
              metadata:
                labels:
                  app: myapp
                  version: \${{ needs.release.outputs.new_release_version }}
              spec:
                containers:
                - name: myapp
                  image: myapp:\${{ needs.release.outputs.new_release_version }}
                  ports:
                  - containerPort: 3000
          EOF

      - name: Upload deployment manifest
        uses: actions/upload-artifact@v3
        with:
          name: deployment-manifest
          path: deployment.yml
          retention-days: 30`
        }
      ]
    }
  ],
  projects: [
    {
      title: "Complete CI/CD Pipeline for Microservices",
      description: "Build a comprehensive CI/CD pipeline for a microservices architecture with automated testing, security scanning, and multi-environment deployment",
      technologies: ["GitHub Actions", "Docker", "Kubernetes", "Jenkins", "ArgoCD", "Prometheus"],
      difficulty: "advanced",
      estimatedHours: 50,
      deliverables: [
        "Multi-stage CI/CD pipeline with automated testing",
        "Security scanning integration (SAST, DAST, SCA)",
        "Container orchestration with Kubernetes",
        "GitOps deployment with ArgoCD",
        "Monitoring and alerting setup",
        "Rollback and disaster recovery procedures",
        "Documentation and runbooks"
      ]
    },
    {
      title: "Automated Release Management System",
      description: "Create an automated release management system with semantic versioning, changelog generation, and multi-channel distribution",
      technologies: ["GitHub Actions", "Semantic Release", "Docker", "Artifactory", "Conventional Commits"],
      difficulty: "intermediate",
      estimatedHours: 35,
      deliverables: [
        "Automated semantic versioning system",
        "Conventional commit integration",
        "Automated changelog generation",
        "Multi-channel release distribution",
        "Artifact management and storage",
        "Release promotion workflows",
        "Integration with package registries"
      ]
    },
    {
      title: "Security-First CI/CD Pipeline",
      description: "Implement a security-focused CI/CD pipeline with comprehensive scanning, compliance checks, and automated remediation",
      technologies: ["GitHub Actions", "SonarQube", "OWASP ZAP", "Trivy", "Checkov", "GitLeaks"],
      difficulty: "advanced",
      estimatedHours: 40,
      deliverables: [
        "Complete security scanning suite integration",
        "Automated vulnerability management",
        "Compliance automation and reporting",
        "Security gates and approval workflows",
        "Secrets detection and management",
        "Security monitoring and alerting",
        "Remediation automation and workflows"
      ]
    },
    {
      title: "Multi-Cloud Deployment Pipeline",
      description: "Build a CI/CD pipeline that deploys applications across multiple cloud providers with automated failover and cost optimization",
      technologies: ["GitHub Actions", "Terraform", "AWS", "Google Cloud", "Azure", "Kubernetes"],
      difficulty: "advanced",
      estimatedHours: 45,
      deliverables: [
        "Multi-cloud infrastructure provisioning",
        "Automated deployment across cloud providers",
        "Load balancing and traffic management",
        "Automated failover and disaster recovery",
        "Cost monitoring and optimization",
        "Multi-region deployment strategy",
        "Cloud-agnostic application architecture"
      ]
    },
    {
      title: "CI/CD Pipeline Optimization Framework",
      description: "Create a framework for optimizing CI/CD pipeline performance, reliability, and developer experience",
      technologies: ["GitHub Actions", "Docker", "Kubernetes", "Prometheus", "Grafana", "Elasticsearch"],
      difficulty: "intermediate",
      estimatedHours: 30,
      deliverables: [
        "Pipeline performance monitoring and analytics",
        "Automated pipeline optimization recommendations",
        "Caching strategies and artifact management",
        "Parallel execution optimization",
        "Pipeline reliability and error handling",
        "Developer experience improvements",
        "Cost optimization for CI/CD resources"
      ]
    }
  ],
  assessments: {
    quiz: [
      {
        question: "What is the primary purpose of Continuous Integration (CI) in a CI/CD pipeline?",
        options: [
          "To deploy applications to production servers",
          "To automatically build and test code changes",
          "To monitor application performance in production",
          "To manage infrastructure as code"
        ],
        correctAnswer: 1,
        explanation: "Continuous Integration focuses on automatically building and testing code changes as they are committed, ensuring that integration issues are caught early."
      },
      {
        question: "Which deployment strategy involves maintaining two identical production environments?",
        options: [
          "Rolling deployment",
          "Canary deployment",
          "Blue-green deployment",
          "Feature flag deployment"
        ],
        correctAnswer: 2,
        explanation: "Blue-green deployment maintains two identical production environments, allowing zero-downtime deployments by switching traffic between them."
      },
      {
        question: "What type of security testing analyzes source code without executing it?",
        options: [
          "Dynamic Application Security Testing (DAST)",
          "Software Composition Analysis (SCA)",
          "Static Application Security Testing (SAST)",
          "Interactive Application Security Testing (IAST)"
        ],
        correctAnswer: 2,
        explanation: "Static Application Security Testing (SAST) analyzes source code to identify security vulnerabilities without executing the code."
      },
      {
        question: "What is the main benefit of using semantic versioning in CI/CD?",
        options: [
          "It reduces the size of Docker images",
          "It provides a standardized way to communicate version changes",
          "It automatically generates documentation",
          "It improves application performance"
        ],
        correctAnswer: 1,
        explanation: "Semantic versioning provides a standardized way to communicate the nature and impact of version changes to users and automated systems."
      },
      {
        question: "Which tool is commonly used for Infrastructure as Code security scanning?",
        options: [
          "SonarQube",
          "Checkov",
          "OWASP ZAP",
          "GitLeaks"
        ],
        correctAnswer: 1,
        explanation: "Checkov is a popular tool for scanning Infrastructure as Code (IaC) files for security and compliance issues."
      }
    ],
    evaluation: [
      {
        question: "Design a comprehensive CI/CD pipeline for a Node.js web application that includes automated testing, security scanning, and deployment to multiple environments. Include specific tools, stages, and rollback procedures.",
        rubric: [
          "Complete pipeline architecture with all necessary stages",
          "Appropriate tool selection for each pipeline component",
          "Comprehensive testing strategy including unit, integration, and E2E tests",
          "Security scanning integration (SAST, DAST, SCA)",
          "Multi-environment deployment strategy",
          "Automated rollback and failure recovery procedures",
          "Monitoring and alerting integration",
          "Artifact management and versioning strategy"
        ]
      },
      {
        question: "Compare GitHub Actions and GitLab CI/CD for implementing a CI/CD pipeline. Discuss their features, limitations, use cases, and integration capabilities.",
        rubric: [
          "Accurate comparison of core features and capabilities",
          "Analysis of platform-specific advantages and limitations",
          "Appropriate use case identification for each platform",
          "Integration capabilities with third-party tools and services",
          "Scalability and performance considerations",
          "Cost and licensing model comparison",
          "Migration strategies and considerations"
        ]
      }
    ]
  },
  aiPrompts: [
    "How do I set up a basic CI/CD pipeline?",
    "What's the difference between CI and CD?",
    "How can I implement automated testing in CI/CD?",
    "What are the best practices for CI/CD security?",
    "How do I handle database migrations in CI/CD?",
    "What's the best way to manage secrets in CI/CD pipelines?",
    "How can I optimize CI/CD pipeline performance?",
    "What are deployment strategies and when to use them?",
    "How do I implement blue-green deployment?",
    "What's the role of containers in CI/CD?",
    "How can I monitor CI/CD pipeline health?",
    "What's the difference between GitOps and traditional CI/CD?"
  ],
  resources: [
    {
      title: "GitHub Actions Documentation",
      type: "Official Documentation",
      url: "https://docs.github.com/en/actions",
      description: "Comprehensive guide to GitHub Actions for CI/CD automation"
    },
    {
      title: "GitLab CI/CD Documentation",
      type: "Official Documentation",
      url: "https://docs.gitlab.com/ee/ci/",
      description: "Complete documentation for GitLab CI/CD pipelines"
    },
    {
      title: "Jenkins Documentation",
      type: "Official Documentation",
      url: "https://www.jenkins.io/doc/",
      description: "Jenkins CI/CD server documentation and guides"
    },
    {
      title: "CircleCI Documentation",
      type: "Official Documentation",
      url: "https://circleci.com/docs/",
      description: "CircleCI platform documentation and best practices"
    },
    {
      title: "CI/CD Best Practices Guide",
      type: "Guide",
      url: "https://cloud.google.com/architecture/devops/devops-tech-continuous-integration",
      description: "Google Cloud's comprehensive CI/CD best practices"
    }
  ],
  toolsRequired: [
    {
      name: "GitHub Actions",
      description: "GitHub's built-in CI/CD platform for automation",
      installation: "Built into GitHub repositories",
      purpose: "Automate workflows, testing, and deployments"
    },
    {
      name: "GitLab CI/CD",
      description: "GitLab's integrated CI/CD solution",
      installation: "Available in GitLab SaaS or self-hosted",
      purpose: "Complete DevOps platform with CI/CD capabilities"
    },
    {
      name: "Jenkins",
      description: "Open-source automation server for CI/CD",
      installation: "Download from jenkins.io or use Docker",
      purpose: "Highly customizable CI/CD server with extensive plugins"
    },
    {
      name: "Docker",
      description: "Container platform for consistent deployments",
      installation: "Download from docker.com",
      purpose: "Containerize applications for consistent CI/CD deployments"
    },
    {
      name: "Kubernetes",
      description: "Container orchestration platform",
      installation: "Install via cloud providers or k3s for local development",
      purpose: "Orchestrate container deployments in CI/CD pipelines"
    }
  ],
  bestPractices: [
    "Use declarative pipeline configurations for better maintainability",
    "Implement comprehensive automated testing at every stage",
    "Use semantic versioning for consistent release management",
    "Implement security scanning in every pipeline run",
    "Use infrastructure as code for environment consistency",
    "Implement proper artifact management and versioning",
    "Set up monitoring and alerting for pipeline health",
    "Use feature flags for gradual feature rollouts",
    "Implement automated rollback procedures",
    "Regularly review and optimize pipeline performance",
    "Use secrets management for secure credential handling",
    "Document pipeline processes and runbooks"
  ],
  commonPitfalls: [
    "Not implementing proper testing in CI/CD pipelines",
    "Using hardcoded secrets in pipeline configurations",
    "Not having automated rollback procedures",
    "Ignoring security scanning in CI/CD processes",
    "Not monitoring pipeline performance and reliability",
    "Using single environment for all testing and deployment",
    "Not versioning artifacts properly",
    "Ignoring pipeline security and access controls",
    "Not documenting pipeline processes and procedures",
    "Using outdated or unmaintained CI/CD tools",
    "Not implementing proper error handling and notifications",
    "Ignoring compliance and regulatory requirements in CI/CD"
  ],
  careerRelevance: [
    "CI/CD expertise is essential for modern DevOps roles",
    "Pipeline automation skills are highly valued by employers",
    "Cloud-native CI/CD knowledge supports platform engineering careers",
    "Security integration in CI/CD supports DevSecOps positions",
    "Multi-cloud deployment skills enable cloud architect roles",
    "GitOps and infrastructure as code support SRE careers",
    "Performance optimization skills support site reliability engineering",
    "Release management expertise supports technical leadership roles",
    "Compliance automation supports regulated industry careers",
    "Container orchestration skills support Kubernetes and cloud-native roles",
    "Monitoring and observability support full-stack DevOps positions",
    "Toolchain integration supports automation engineering careers"
  ]
};