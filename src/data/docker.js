export default {
  id: "docker",
  tier: 4,
  name: "Docker",
  description: "Master containerization with Docker for consistent application deployment across environments. Learn container fundamentals, Dockerfile optimization, multi-container orchestration with Docker Compose, and security best practices for production deployments.",
  difficulty: "intermediate",
  estimatedHours: 20,
  prerequisites: ["nodejs", "linux"],
  learningObjectives: [
    "Understand Docker architecture and containerization concepts",
    "Create optimized Dockerfiles for different application types",
    "Implement multi-container applications with Docker Compose",
    "Manage persistent data with Docker volumes and bind mounts",
    "Configure container networking and service discovery",
    "Optimize Docker images using multi-stage builds",
    "Implement Docker security best practices",
    "Deploy containerized applications to production",
    "Debug and troubleshoot containerized applications",
    "Use Docker registries for image management",
    "Implement container orchestration patterns",
    "Monitor and log containerized applications"
  ],
  sections: [
    {
      title: "Docker Fundamentals and Architecture",
      content: "Docker is a platform for developing, shipping, and running applications in containers. Containers are lightweight, portable, and self-sufficient units that package application code along with all its dependencies, ensuring consistent execution across different environments.\n\n**Containerization Benefits**: Containers solve the 'works on my machine' problem by packaging applications with their runtime environment. This ensures consistency from development to production and simplifies deployment processes.\n\n**Docker Architecture**: Docker uses a client-server architecture with the Docker daemon managing containers, images, networks, and volumes. The Docker client communicates with the daemon via REST API.\n\n**Core Components**:\n- **Images**: Read-only templates containing application code and dependencies\n- **Containers**: Running instances of Docker images\n- **Dockerfile**: Instructions for building Docker images\n- **Registry**: Repository for storing and distributing Docker images\n\n**Installation**: Install Docker Desktop for Windows/macOS or Docker Engine for Linux. Verify installation with `docker --version` and `docker run hello-world`.\n\n**Basic Commands**: Learn essential Docker commands like `docker build`, `docker run`, `docker ps`, `docker images`, and `docker logs` for container management.",
      keyTopics: [
        "Containerization concepts and benefits",
        "Docker architecture and components",
        "Installation and setup procedures",
        "Basic Docker commands and operations",
        "Image vs container differences"
      ],
      practicalExercises: [
        "Install Docker and verify installation with hello-world container",
        "Explore Docker Hub and pull popular images (nginx, redis, postgres)",
        "Create and manage basic containers with different run options",
        "Inspect container processes and resource usage",
        "Clean up unused Docker resources (containers, images, volumes)"
      ],
      codeExamples: [
        {
          title: "Basic Docker Commands",
          language: "bash",
          code: `# Check Docker version and status
docker --version
docker info

# Pull an image from Docker Hub
docker pull nginx:latest

# List all images
docker images

# Run a container in detached mode
docker run -d --name my-nginx -p 8080:80 nginx

# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# View container logs
docker logs my-nginx

# Execute commands in running container
docker exec -it my-nginx /bin/bash

# Stop and remove containers
docker stop my-nginx
docker rm my-nginx

# Remove unused images
docker image prune -a`
        },
        {
          title: "Docker Container Lifecycle",
          language: "bash",
          code: `# Create and start a container
docker run --name my-app -d -p 3000:3000 node-app

# Pause and unpause container
docker pause my-app
docker unpause my-app

# Restart container
docker restart my-app

# View container resource usage
docker stats my-app

# Inspect container configuration
docker inspect my-app

# Copy files to/from container
docker cp my-app:/app/logs/app.log ./logs/

# Create container without starting it
docker create --name my-redis redis:alpine

# Start existing container
docker start my-redis

# Stop all running containers
docker stop $(docker ps -q)`
        }
      ]
    },
    {
      title: "Dockerfile Creation and Optimization",
      content: "A Dockerfile is a text file containing instructions for building Docker images. It defines the environment, dependencies, and commands needed to run your application in a container.\n\n**Dockerfile Structure**: Dockerfiles follow a specific format with instructions like FROM, COPY, RUN, CMD, etc. Each instruction creates a new layer in the image.\n\n**Best Practices**:\n- Use specific base image versions (avoid 'latest')\n- Minimize the number of layers by combining RUN commands\n- Use .dockerignore to exclude unnecessary files\n- Leverage build cache for faster builds\n- Use multi-stage builds for smaller production images\n\n**Common Instructions**:\n- **FROM**: Specifies the base image\n- **COPY/ADD**: Copies files from host to container\n- **RUN**: Executes commands during build\n- **CMD/ENTRYPOINT**: Defines container startup command\n- **EXPOSE**: Documents container ports\n- **ENV**: Sets environment variables\n\n**Image Optimization**: Reduce image size by using smaller base images (alpine variants), removing unnecessary packages, and implementing multi-stage builds.\n\n**Build Context**: The build context is the set of files sent to the Docker daemon for building. Use .dockerignore to exclude unnecessary files and reduce build time.",
      keyTopics: [
        "Dockerfile syntax and instructions",
        "Layer optimization strategies",
        "Multi-stage build patterns",
        "Base image selection criteria",
        "Build context management"
      ],
      practicalExercises: [
        "Create Dockerfile for a Node.js application with proper layer optimization",
        "Implement multi-stage build to reduce final image size",
        "Configure .dockerignore file to exclude unnecessary files",
        "Build and compare different base image options (ubuntu vs alpine)",
        "Debug Dockerfile build failures and optimize build time"
      ],
      codeExamples: [
        {
          title: "Basic Node.js Dockerfile",
          language: "dockerfile",
          code: `# Use specific Node.js version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership of app directory
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["npm", "start"]`
        },
        {
          title: "Multi-Stage Dockerfile",
          language: "dockerfile",
          code: `# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app directory
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]`
        },
        {
          title: "Python Flask Dockerfile",
          language: "dockerfile",
          code: `# Use Python slim image for smaller size
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        gcc \
        libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user
RUN useradd --create-home --shell /bin/bash app \
    && chown -R app:app /app

# Switch to non-root user
USER app

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

# Start application
CMD ["python", "app.py"]`
        }
      ]
    },
    {
      title: "Docker Compose for Multi-Container Applications",
      content: "Docker Compose is a tool for defining and running multi-container Docker applications. It uses YAML files to configure application services, networks, and volumes, making it easy to manage complex applications.\n\n**Compose File Structure**: The docker-compose.yml file defines services, networks, and volumes. Each service can specify its own Dockerfile, image, environment variables, and dependencies.\n\n**Service Dependencies**: Use the `depends_on` directive to control service startup order. Compose will wait for dependencies to be healthy before starting dependent services.\n\n**Networking**: Compose automatically creates a default network for services to communicate. Services can reach each other using their service names as hostnames.\n\n**Environment Management**: Use .env files and environment variables to manage configuration across different environments (development, staging, production).\n\n**Scaling**: Scale services horizontally using `docker-compose up --scale` or by specifying replica counts in the compose file.\n\n**Development Workflow**: Use Compose for local development with features like hot reloading, volume mounting, and service orchestration.\n\n**Production Deployment**: Compose can be used in production with Docker Swarm or Kubernetes, though it's more commonly used for development and testing.",
      keyTopics: [
        "Docker Compose YAML syntax",
        "Service configuration and dependencies",
        "Multi-container networking",
        "Environment variable management",
        "Volume and data persistence"
      ],
      practicalExercises: [
        "Create docker-compose.yml for full-stack application (frontend, backend, database)",
        "Configure environment-specific compose files for dev/staging/production",
        "Implement health checks and dependency management",
        "Set up development workflow with hot reloading and debugging",
        "Deploy multi-container application to production environment"
      ],
      codeExamples: [
        {
          title: "Full-Stack Application Compose",
          language: "yaml",
          code: `version: '3.8'

services:
  # Frontend React application
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:8000
    volumes:
      - ./frontend:/app
      - /app/node_modules
    depends_on:
      - backend
    networks:
      - app-network

  # Backend API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/app_db
      - REDIS_URL=redis://redis:6379
    volumes:
      - ./backend:/app
      - /app/__pycache__
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - app-network

  # PostgreSQL database
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=app_db
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d app_db"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network

  # Redis cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - app-network

  # Nginx reverse proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
    depends_on:
      - frontend
      - backend
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  postgres_data:
  redis_data:`
        },
        {
          title: "Development Environment Compose",
          language: "yaml",
          code: `version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - CHOKIDAR_USEPOLLING=true
    command: npm run dev

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=dev_db
      - POSTGRES_USER=dev_user
      - POSTGRES_PASSWORD=dev_password
    volumes:
      - dev_db_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - dev_redis_data:/data

  # Database management tool
  adminer:
    image: adminer
    ports:
      - "8080:8080"
    depends_on:
      - db

volumes:
  dev_db_data:
  dev_redis_data:`
        },
        {
          title: "Production Environment Compose",
          language: "yaml",
          code: `version: '3.8'

services:
  web:
    image: myapp:latest
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    deploy:
      replicas: 3
      restart_policy:
        condition: on-failure
      resources:
        limits:
          cpus: '0.50'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
    depends_on:
      - api
      - db

  api:
    image: myapi:latest
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/prod_db
    deploy:
      replicas: 2
      restart_policy:
        condition: on-failure
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=prod_db
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=\${DB_PASSWORD}
    volumes:
      - prod_db_data:/var/lib/postgresql/data
    deploy:
      placement:
        constraints:
          - node.role == manager

volumes:
  prod_db_data:
    driver: local`
        }
      ]
    },
    {
      title: "Volume Management and Data Persistence",
      content: "Docker volumes provide persistent data storage for containers. Unlike container filesystems that are ephemeral, volumes persist data across container restarts and can be shared between containers.\n\n**Volume Types**:\n- **Named Volumes**: Managed by Docker, stored in Docker's storage area\n- **Bind Mounts**: Mount host directories into containers\n- **tmpfs Mounts**: In-memory storage for temporary data\n\n**Data Persistence**: Use volumes for databases, configuration files, and application data that needs to survive container restarts.\n\n**Volume Management**: Create, list, inspect, and remove volumes using Docker CLI commands. Use `docker volume prune` to clean up unused volumes.\n\n**Backup and Restore**: Implement backup strategies for volume data using `docker run` with volume mounts or third-party backup tools.\n\n**Performance Considerations**: Named volumes generally perform better than bind mounts. Consider storage driver and filesystem type for optimal performance.\n\n**Security**: Be cautious with bind mounts as they give containers access to host filesystem. Use read-only mounts when possible.\n\n**Volume Plugins**: Extend Docker's volume capabilities with plugins for cloud storage, network storage, or specialized storage systems.",
      keyTopics: [
        "Docker volume types and use cases",
        "Data persistence strategies",
        "Volume backup and recovery",
        "Performance optimization",
        "Security considerations"
      ],
      practicalExercises: [
        "Create and manage named volumes for database persistence",
        "Implement bind mounts for development file sharing",
        "Set up automated backup strategy for volume data",
        "Configure volume permissions and ownership",
        "Migrate data between different volume types"
      ],
      codeExamples: [
        {
          title: "Volume Management Commands",
          language: "bash",
          code: `# Create a named volume
docker volume create my-volume

# List all volumes
docker volume ls

# Inspect volume details
docker volume inspect my-volume

# Remove a volume
docker volume rm my-volume

# Remove all unused volumes
docker volume prune

# Use volume with container
docker run -d --name my-app -v my-volume:/app/data nginx

# Use bind mount
docker run -d --name dev-app -v /host/path:/container/path nginx

# Create volume with specific driver
docker volume create --driver local --opt type=tmpfs --opt device=tmpfs my-tmpfs-volume

# Backup volume data
docker run --rm -v my-volume:/source -v /host/backup:/backup alpine tar czf /backup/volume-backup.tar.gz -C /source .

# Restore volume data
docker run --rm -v my-volume:/dest -v /host/backup:/backup alpine tar xzf /backup/volume-backup.tar.gz -C /dest`
        },
        {
          title: "Database with Persistent Volume",
          language: "yaml",
          code: `version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      # Named volume for data persistence
      - postgres_data:/var/lib/postgresql/data
      # Bind mount for initialization scripts
      - ./db/init:/docker-entrypoint-initdb.d
      # Bind mount for custom configuration
      - ./db/postgresql.conf:/etc/postgresql/postgresql.conf
    ports:
      - "5432:5432"
    command: postgres -c config_file=/etc/postgresql/postgresql.conf
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Backup service
  backup:
    image: postgres:15-alpine
    depends_on:
      - postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data:ro
      - ./backups:/backups
    command: >
      bash -c "
        while true; do
          pg_dump -h postgres -U user myapp > /backups/backup_$(date +%Y%m%d_%H%M%S).sql
          sleep 86400
        done
      "
    profiles:
      - backup

volumes:
  postgres_data:
    driver: local`
        },
        {
          title: "Development Volume Configuration",
          language: "yaml",
          code: `version: '3.8'

services:
  app:
    build: .
    volumes:
      # Bind mount for hot reloading
      - .:/app:cached
      # Anonymous volume for node_modules
      - /app/node_modules
      # Named volume for logs
      - app_logs:/app/logs
    environment:
      - NODE_ENV=development

  # File watcher for development
  file-watcher:
    image: alpine
    volumes:
      - .:/watch:ro
    command: sh -c "while inotifywait -r -e modify /watch; do echo 'Files changed'; done"
    profiles:
      - dev

  # Log aggregation
  log-collector:
    image: fluent/fluent-bit
    volumes:
      - app_logs:/var/log/app:ro
      - ./fluent-bit.conf:/fluent-bit/etc/fluent-bit.conf:ro
    ports:
      - "24224:24224"

volumes:
  app_logs:`
        }
      ]
    },
    {
      title: "Networking and Service Discovery",
      content: "Docker networking enables communication between containers and external networks. Understanding Docker's networking model is crucial for building distributed applications.\n\n**Network Types**:\n- **Bridge**: Default network for single-host container communication\n- **Host**: Container uses host's network stack (no isolation)\n- **Overlay**: Multi-host networking for Swarm clusters\n- **Macvlan**: Containers get MAC addresses for direct network access\n- **None**: Isolated containers with no network access\n\n**Service Discovery**: Containers can communicate using service names as hostnames in user-defined networks. Docker's embedded DNS server resolves service names to container IPs.\n\n**Port Mapping**: Map container ports to host ports using `-p` flag or EXPOSE instruction in Dockerfile.\n\n**Network Security**: Implement network segmentation, use internal networks for sensitive services, and configure firewall rules.\n\n**Load Balancing**: Use Docker's built-in load balancing for services in Swarm mode or external load balancers like NGINX or HAProxy.\n\n**DNS Configuration**: Customize DNS settings for containers using `--dns` flag or configuring Docker daemon DNS options.\n\n**Network Troubleshooting**: Use `docker network inspect`, `docker exec` with network tools, and container logs for debugging network issues.",
      keyTopics: [
        "Docker network types and drivers",
        "Service discovery mechanisms",
        "Port mapping and exposure",
        "Network security practices",
        "Load balancing strategies"
      ],
      practicalExercises: [
        "Create custom bridge networks for application isolation",
        "Implement service discovery between microservices",
        "Configure load balancing with NGINX reverse proxy",
        "Set up secure inter-container communication",
        "Debug network connectivity issues between containers"
      ],
      codeExamples: [
        {
          title: "Docker Network Management",
          language: "bash",
          code: `# List all networks
docker network ls

# Create a custom bridge network
docker network create --driver bridge my-network

# Inspect network configuration
docker network inspect my-network

# Connect container to network
docker network connect my-network my-container

# Disconnect container from network
docker network disconnect my-network my-container

# Create network with custom subnet
docker network create --driver bridge --subnet 172.20.0.0/16 my-custom-network

# Remove network
docker network rm my-network

# Remove all unused networks
docker network prune

# Run container on specific network
docker run -d --name web --network my-network -p 8080:80 nginx

# Connect running container to network
docker network connect my-network web

# Test connectivity between containers
docker exec web ping db`
        },
        {
          title: "Microservices Network Configuration",
          language: "yaml",
          code: `version: '3.8'

services:
  # API Gateway
  gateway:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - auth-service
      - user-service
      - product-service
    networks:
      - frontend
      - backend

  # Authentication Service
  auth-service:
    build: ./auth-service
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/auth_db
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    networks:
      - backend
      - database

  # User Management Service
  user-service:
    build: ./user-service
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/user_db
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    networks:
      - backend
      - database

  # Product Service
  product-service:
    build: ./product-service
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/product_db
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    networks:
      - backend
      - database

  # Shared Database
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=shared_db
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - db_data:/var/lib/postgresql/data
    networks:
      - database

  # Redis Cache
  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    networks:
      - backend

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true
  database:
    driver: bridge
    internal: true

volumes:
  db_data:
  redis_data:`
        },
        {
          title: "Load Balancing with Docker",
          language: "yaml",
          code: `version: '3.8'

services:
  # Load Balancer
  loadbalancer:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx-loadbalancer.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - web1
      - web2
      - web3
    networks:
      - web

  # Web Application Instances
  web1:
    image: mywebapp:latest
    environment:
      - INSTANCE_ID=1
    networks:
      - web

  web2:
    image: mywebapp:latest
    environment:
      - INSTANCE_ID=2
    networks:
      - web

  web3:
    image: mywebapp:latest
    environment:
      - INSTANCE_ID=3
    networks:
      - web

  # Monitoring
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus_data:/prometheus
    networks:
      - monitoring

  # Metrics Exporter
  node-exporter:
    image: prom/node-exporter
    ports:
      - "9100:9100"
    networks:
      - monitoring
    deploy:
      mode: global

networks:
  web:
    driver: bridge
  monitoring:
    driver: bridge

volumes:
  prometheus_data:`
        }
      ]
    },
    {
      title: "Docker Security Best Practices",
      content: "Container security is crucial for production deployments. Docker provides several security features and best practices to protect containerized applications.\n\n**Image Security**:\n- Use trusted base images from verified publishers\n- Scan images for vulnerabilities using tools like Docker Scan or Trivy\n- Keep images up-to-date with security patches\n- Use minimal base images (distroless, scratch) when possible\n\n**Container Security**:\n- Run containers as non-root users\n- Use read-only filesystems where possible\n- Limit container capabilities with --cap-drop and --cap-add\n- Implement resource limits (CPU, memory, disk)\n- Use secrets management for sensitive data\n\n**Network Security**:\n- Use internal networks for sensitive services\n- Implement proper firewall rules\n- Use TLS/SSL for inter-service communication\n- Avoid exposing unnecessary ports\n\n**Runtime Security**:\n- Enable Docker Content Trust for image verification\n- Use AppArmor or SELinux for additional security\n- Implement logging and monitoring\n- Regular security audits and vulnerability assessments\n\n**Secret Management**: Never store secrets in Docker images. Use Docker secrets, environment variables, or external secret management systems.\n\n**Compliance**: Implement security policies, regular updates, and audit logging to meet compliance requirements.",
      keyTopics: [
        "Container image security",
        "Runtime security configurations",
        "Network security practices",
        "Secret management strategies",
        "Compliance and auditing"
      ],
      practicalExercises: [
        "Scan Docker images for security vulnerabilities",
        "Implement non-root container execution",
        "Configure resource limits and constraints",
        "Set up secure inter-container communication",
        "Implement secrets management for sensitive data"
      ],
      codeExamples: [
        {
          title: "Security Best Practices Dockerfile",
          language: "dockerfile",
          code: `# Use specific, trusted base image
FROM node:18-alpine3.17

# Add security updates
RUN apk update && apk upgrade && \
    apk add --no-cache dumb-init curl && \
    rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g 1001 -S appuser && \
    adduser -S -D -H -u 1001 -h /app -s /sbin/nologin -G appuser -g appuser appuser

# Set working directory with proper permissions
WORKDIR /app
RUN chown -R appuser:appuser /app

# Copy package files first
COPY --chown=appuser:appuser package*.json ./

# Install dependencies as non-root user
USER appuser
RUN npm ci --only=production && npm cache clean --force

# Copy application code
COPY --chown=appuser:appuser . .

# Switch back to root for final setup
USER root

# Remove unnecessary packages and create minimal environment
RUN apk del curl && \
    rm -rf /usr/local/share/.cache /tmp/*

# Create necessary directories with proper permissions
RUN mkdir -p /app/logs && \
    chown -R appuser:appuser /app/logs

# Switch to non-root user
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]`
        },
        {
          title: "Secure Docker Compose Configuration",
          language: "yaml",
          code: `version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile.secure
    ports:
      - "443:443"
    environment:
      - NODE_ENV=production
    # Security constraints
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
    read_only: true
    tmpfs:
      - /tmp:noexec,nosuid,size=100m
    # Resource limits
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
    # Health checks
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    # Logging
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    # Secrets
    secrets:
      - db_password
      - api_key
    networks:
      - secure_network

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=prod_db
      - POSTGRES_USER=app_user
    # Database security
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    read_only: true
    tmpfs:
      - /tmp:noexec,nosuid,size=100m
    volumes:
      - db_data:/var/lib/postgresql/data
    networks:
      - db_network

  # Reverse proxy with SSL termination
  proxy:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - web
    networks:
      - secure_network
      - public_network

networks:
  secure_network:
    internal: true
  db_network:
    internal: true
  public_network:
    driver: bridge

volumes:
  db_data:

secrets:
  db_password:
    file: ./secrets/db_password.txt
  api_key:
    file: ./secrets/api_key.txt`
        },
        {
          title: "Docker Security Scanning",
          language: "bash",
          code: `# Scan image for vulnerabilities
docker scan myapp:latest

# Use Trivy for comprehensive scanning
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy:latest image myapp:latest

# Scan running containers
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy:latest container my-container

# Generate SBOM (Software Bill of Materials)
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy:latest image --format spdx-json --output sbom.json myapp:latest

# Scan with Clair
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  -p 6060:6060 clair-scanner --ip 127.0.0.1 myapp:latest

# Check for outdated packages
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  wagoodman/dive:latest myapp:latest

# Security audit with Docker Bench
docker run --rm --net host --pid host --userns host --cap-add audit_control \
  -e DOCKER_CONTENT_TRUST=$DOCKER_CONTENT_TRUST \
  -v /var/lib:/var/lib \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /usr/lib/systemd:/usr/lib/systemd \
  -v /etc:/etc --label docker_bench_security \
  docker/docker-bench-security

# Enable Docker Content Trust
export DOCKER_CONTENT_TRUST=1

# Sign and push trusted image
docker trust sign myapp:latest
docker push myapp:latest`
        }
      ]
    }
  ],
  projects: [
    {
      title: "Containerized Microservices Application",
      description: "Build a complete microservices application with Docker, including API gateway, multiple services, database, and monitoring",
      technologies: ["Docker", "Docker Compose", "Node.js", "PostgreSQL", "Redis", "NGINX"],
      difficulty: "Advanced",
      estimatedHours: 40,
      deliverables: [
        "Multi-service Docker Compose configuration",
        "Optimized Dockerfiles for each service",
        "Service discovery and load balancing setup",
        "Database persistence with volumes",
        "Monitoring and logging configuration",
        "Security hardening implementation"
      ]
    },
    {
      title: "CI/CD Pipeline with Docker",
      description: "Create a complete CI/CD pipeline using Docker for building, testing, and deploying applications",
      technologies: ["Docker", "GitHub Actions", "Node.js", "Jest", "SonarQube", "Kubernetes"],
      difficulty: "Advanced",
      estimatedHours: 35,
      deliverables: [
        "Docker-based build environment",
        "Automated testing in containers",
        "Multi-stage Docker builds for optimization",
        "Container registry integration",
        "Deployment automation scripts",
        "Security scanning integration"
      ]
    },
    {
      title: "Docker-based Development Environment",
      description: "Set up a complete development environment using Docker for a full-stack application",
      technologies: ["Docker", "Docker Compose", "Node.js", "React", "PostgreSQL", "Redis"],
      difficulty: "Intermediate",
      estimatedHours: 25,
      deliverables: [
        "Development Docker Compose setup",
        "Hot reloading configuration",
        "Database seeding and migration",
        "Development tools integration",
        "Testing environment setup",
        "Documentation and setup scripts"
      ]
    },
    {
      title: "Production-Ready Container Deployment",
      description: "Deploy a containerized application to production with security, monitoring, and scalability",
      technologies: ["Docker", "Docker Swarm", "Traefik", "Prometheus", "Grafana", "ELK Stack"],
      difficulty: "Advanced",
      estimatedHours: 45,
      deliverables: [
        "Production Docker Compose configuration",
        "Load balancing and service discovery",
        "Monitoring and alerting setup",
        "Security hardening and secrets management",
        "Backup and disaster recovery",
        "Performance optimization and scaling"
      ]
    },
    {
      title: "Docker Image Optimization Challenge",
      description: "Optimize Docker images for size, security, and performance across different application types",
      technologies: ["Docker", "Dockerfile", "Multi-stage builds", "Security scanning", "Performance testing"],
      difficulty: "Intermediate",
      estimatedHours: 20,
      deliverables: [
        "Before/after image size comparison",
        "Security vulnerability assessment",
        "Build time optimization",
        "Runtime performance analysis",
        "Best practices documentation",
        "Automated optimization scripts"
      ]
    }
  ],
  assessments: {
    quiz: [
      {
        question: "What is the primary benefit of using Docker containers?",
        options: [
          "Faster application startup times",
          "Consistent deployment across environments",
          "Automatic code generation",
          "Built-in database management"
        ],
        correctAnswer: 1,
        explanation: "Docker containers ensure consistent deployment by packaging applications with all their dependencies, solving the 'works on my machine' problem."
      },
      {
        question: "Which Dockerfile instruction creates a new layer in the image?",
        options: [
          "FROM",
          "EXPOSE",
          "RUN",
          "USER"
        ],
        correctAnswer: 2,
        explanation: "The RUN instruction executes commands and creates a new layer in the Docker image, while FROM, EXPOSE, and USER do not create layers."
      },
      {
        question: "What is the purpose of Docker Compose?",
        options: [
          "To build individual Docker images",
          "To define and run multi-container applications",
          "To scan images for security vulnerabilities",
          "To manage Docker volumes only"
        ],
        correctAnswer: 1,
        explanation: "Docker Compose is used to define and run multi-container Docker applications using YAML configuration files."
      },
      {
        question: "Which volume type provides the best performance for Docker containers?",
        options: [
          "Bind mounts",
          "Named volumes",
          "tmpfs mounts",
          "Anonymous volumes"
        ],
        correctAnswer: 1,
        explanation: "Named volumes generally provide better performance than bind mounts because Docker manages them directly in its storage area."
      },
      {
        question: "What is the most secure way to handle secrets in Docker containers?",
        options: [
          "Store them in environment variables",
          "Hardcode them in the Dockerfile",
          "Use Docker secrets or external secret management",
          "Pass them as command-line arguments"
        ],
        correctAnswer: 2,
        explanation: "Docker secrets or external secret management systems provide the most secure way to handle sensitive data in containers."
      }
    ],
    evaluation: [
      {
        question: "Design a secure, production-ready Docker setup for a Node.js web application that includes a PostgreSQL database and Redis cache. Include considerations for security, monitoring, and scalability.",
        rubric: [
          "Comprehensive security implementation (non-root users, minimal base images, secrets management)",
          "Proper networking configuration with service isolation",
          "Monitoring and logging setup",
          "Scalability considerations and resource limits",
          "Backup and disaster recovery planning"
        ]
      },
      {
        question: "Compare and contrast different Docker networking modes and explain when to use each type for various application architectures.",
        rubric: [
          "Accurate explanation of bridge, host, overlay, macvlan, and none networks",
          "Appropriate use cases for each network type",
          "Security implications of different networking modes",
          "Performance considerations",
          "Real-world application examples"
        ]
      }
    ]
  },
  aiPrompts: [
    "How do I optimize my Docker image size for a Node.js application?",
    "What's the best way to handle database migrations in Docker containers?",
    "How can I debug a container that's not starting properly?",
    "What's the difference between Docker Compose and Docker Swarm?",
    "How do I implement zero-downtime deployments with Docker?",
    "What's the best practice for logging in containerized applications?",
    "How can I secure my Docker containers for production deployment?",
    "What's the difference between bind mounts and volumes in Docker?",
    "How do I set up monitoring for Docker containers?",
    "What's the best way to handle environment-specific configurations in Docker?",
    "How can I implement health checks for my Docker containers?",
    "What's the difference between CMD and ENTRYPOINT in Dockerfiles?"
  ],
  resources: [
    {
      title: "Docker Documentation",
      type: "Official Documentation",
      url: "https://docs.docker.com/",
      description: "Comprehensive official documentation for Docker"
    },
    {
      title: "Docker Best Practices Guide",
      type: "Guide",
      url: "https://docs.docker.com/develop/dev-best-practices/",
      description: "Official Docker development best practices"
    },
    {
      title: "Docker Compose Documentation",
      type: "Official Documentation",
      url: "https://docs.docker.com/compose/",
      description: "Complete guide to Docker Compose"
    },
    {
      title: "Docker Security Best Practices",
      type: "Guide",
      url: "https://docs.docker.com/engine/security/",
      description: "Docker security guidelines and best practices"
    },
    {
      title: "Awesome Docker",
      type: "Resource Collection",
      url: "https://github.com/veggiemonk/awesome-docker",
      description: "Curated list of Docker resources and tools"
    }
  ],
  toolsRequired: [
    {
      name: "Docker Desktop",
      description: "Docker development environment for Windows, macOS, and Linux",
      installation: "Download from docker.com and follow platform-specific installation instructions",
      purpose: "Container runtime and development tools"
    },
    {
      name: "Docker Compose",
      description: "Tool for defining and running multi-container Docker applications",
      installation: "Included with Docker Desktop or install separately on Linux",
      purpose: "Multi-container application orchestration"
    },
    {
      name: "Docker Hub",
      description: "Cloud-based registry for Docker images",
      installation: "Create account at hub.docker.com",
      purpose: "Image storage and distribution"
    },
    {
      name: "Docker Scout",
      description: "Security scanning tool for Docker images",
      installation: "docker scout enable",
      purpose: "Image vulnerability scanning"
    },
    {
      name: "Portainer",
      description: "Web-based Docker management interface",
      installation: "docker run -d -p 9000:9000 portainer/portainer",
      purpose: "Container management and monitoring"
    }
  ],
  bestPractices: [
    "Use specific image versions instead of 'latest' tags",
    "Run containers as non-root users for security",
    "Implement multi-stage builds to reduce image size",
    "Use .dockerignore files to exclude unnecessary files",
    "Implement health checks for container monitoring",
    "Use named volumes for persistent data storage",
    "Scan images regularly for security vulnerabilities",
    "Limit container resources to prevent resource exhaustion",
    "Use environment variables for configuration management",
    "Implement proper logging and monitoring strategies",
    "Keep base images updated with security patches",
    "Use Docker Content Trust for image verification"
  ],
  commonPitfalls: [
    "Using 'latest' tags leading to unpredictable deployments",
    "Running containers as root user creating security risks",
    "Not using .dockerignore causing large image sizes",
    "Storing secrets in Docker images instead of using secrets management",
    "Not implementing resource limits leading to resource exhaustion",
    "Using bind mounts in production instead of named volumes",
    "Not scanning images for security vulnerabilities",
    "Hardcoding configuration values instead of using environment variables",
    "Not implementing health checks for container monitoring",
    "Using single-stage builds for applications with build dependencies",
    "Not cleaning up unused Docker resources (images, containers, volumes)",
    "Ignoring Docker security best practices in production deployments"
  ],
  careerRelevance: [
    "Docker skills are essential for modern DevOps and cloud-native development roles",
    "Containerization expertise is highly valued in microservices architecture positions",
    "Docker proficiency is required for Kubernetes and cloud platform certifications",
    "Container orchestration skills are critical for site reliability engineering (SRE) roles",
    "Docker knowledge is fundamental for CI/CD pipeline development and management",
    "Container security expertise is increasingly important for application security roles",
    "Docker skills enhance employability in full-stack and backend development positions",
    "Containerization knowledge is valuable for cloud migration and modernization projects",
    "Docker expertise supports career advancement in platform engineering and infrastructure roles",
    "Container orchestration skills are essential for managing scalable, distributed systems",
    "Docker knowledge is beneficial for freelance and consulting opportunities in modern development",
    "Containerization proficiency supports career transitions to DevOps and cloud engineering roles"
  ]
};