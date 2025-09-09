export default {
  id: "monitoring",
  tier: 4,
  name: "Monitoring & Observability",
  description: "Master application and infrastructure monitoring with comprehensive observability practices. Learn metrics collection, logging strategies, alerting systems, and modern monitoring tools for building reliable, production-ready applications.",
  difficulty: "intermediate",
  estimatedHours: 25,
  prerequisites: ["nodejs", "docker", "cloudservices"],
  learningObjectives: [
    "Understand the fundamentals of application and infrastructure monitoring",
    "Implement comprehensive logging strategies with structured logging",
    "Set up metrics collection using Prometheus and monitoring best practices",
    "Configure alerting systems for proactive issue detection",
    "Build dashboards with Grafana for data visualization",
    "Implement distributed tracing for microservices observability",
    "Use monitoring tools like ELK stack, Jaeger, and OpenTelemetry",
    "Design monitoring architectures for scalability and reliability",
    "Implement health checks and service discovery",
    "Create custom metrics and monitoring solutions",
    "Handle log aggregation and analysis at scale",
    "Set up monitoring for cloud-native applications",
    "Implement security monitoring and anomaly detection",
    "Use APM (Application Performance Monitoring) tools effectively",
    "Design monitoring strategies for different deployment environments",
    "Implement cost-effective monitoring solutions"
  ],
  sections: [
    {
      title: "Monitoring Fundamentals",
      content: "Monitoring is the practice of observing and tracking the performance, health, and behavior of applications and infrastructure. It involves collecting metrics, logs, and traces to gain insights into system behavior and detect issues before they impact users.\n\n**Key Concepts**: Monitoring focuses on understanding system state through data collection and analysis. Observability extends this by providing the ability to ask arbitrary questions about system behavior.\n\n**Monitoring Types**: Infrastructure monitoring tracks servers, networks, and system resources. Application monitoring focuses on application performance, errors, and user experience. Business monitoring tracks KPIs and user behavior.\n\n**Metrics vs Logs vs Traces**: Metrics are numerical measurements collected over time. Logs are timestamped records of events. Traces track requests across distributed systems.\n\n**Monitoring Goals**: Detect issues early, understand system behavior, optimize performance, ensure reliability, and support debugging and troubleshooting.\n\n**Best Practices**: Monitor everything that matters, collect the right data, set appropriate thresholds, automate responses, and continuously improve monitoring strategies.",
      keyTopics: [
        "Monitoring vs Observability concepts",
        "Types of monitoring (infrastructure, application, business)",
        "Key monitoring metrics and KPIs",
        "Monitoring data types (metrics, logs, traces)",
        "Monitoring best practices and principles"
      ],
      practicalExercises: [
        "Set up basic system monitoring on a Linux server",
        "Configure monitoring for a simple web application",
        "Create custom metrics for application performance",
        "Implement health check endpoints",
        "Set up log collection and basic analysis",
        "Configure basic alerting for critical metrics"
      ],
      codeExamples: [
        {
          title: "Basic System Monitoring Script",
          language: "bash",
          code: `#!/bin/bash

# System monitoring script
echo "=== System Monitoring Report ==="
echo "Timestamp: $(date)"

# CPU Usage
echo "CPU Usage:"
top -bn1 | grep "Cpu(s)" | sed "s/.*, *\\([0-9.]*\\)%* id.*/\\1/" | awk '{print 100 - $1"%"}'

# Memory Usage
echo -e "\nMemory Usage:"
free -h | grep "^Mem:" | awk '{print "Total: "$2", Used: "$3", Free: "$4", Usage: "int($3/$2*100)"%"}'

# Disk Usage
echo -e "\nDisk Usage:"
df -h | grep "^/dev/" | awk '{print $1": "$5" used ("$3"/"$2")"}'

# Network Statistics
echo -e "\nNetwork Statistics:"
echo "Active connections: $(netstat -tun | grep ESTABLISHED | wc -l)"
echo "Listening ports: $(netstat -tln | grep LISTEN | wc -l)"

# Process Monitoring
echo -e "\nTop 5 Memory-consuming processes:"
ps aux --sort=-%mem | head -6 | awk '{print $1,$2,$4,$11}'

echo -e "\nTop 5 CPU-consuming processes:"
ps aux --sort=-%cpu | head -6 | awk '{print $1,$2,$3,$11}'

echo "=== End Report ==="`
        },
        {
          title: "Node.js Application Health Check",
          language: "javascript",
          code: `const express = require('express');
const os = require('os');
const app = express();

// Health check endpoint
app.get('/health', (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    services: {
      database: 'connected', // Check actual DB connection
      cache: 'connected',    // Check cache connection
      external_api: 'available' // Check external services
    }
  };

  // Check if all services are healthy
  const allHealthy = Object.values(healthCheck.services).every(
    status => status === 'connected' || status === 'available'
  );

  if (!allHealthy) {
    healthCheck.message = 'Degraded';
    return res.status(503).json(healthCheck);
  }

  res.status(200).json(healthCheck);
});

// Detailed health check
app.get('/health/detailed', (req, res) => {
  const detailedHealth = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    version: process.version,
    environment: process.env.NODE_ENV || 'development',
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      external: Math.round(process.memoryUsage().external / 1024 / 1024),
      rss: Math.round(process.memoryUsage().rss / 1024 / 1024)
    },
    system: {
      platform: os.platform(),
      arch: os.arch(),
      cpus: os.cpus().length,
      totalMemory: Math.round(os.totalmem() / 1024 / 1024),
      freeMemory: Math.round(os.freemem() / 1024 / 1024),
      loadAverage: os.loadavg()
    },
    services: {
      database: {
        status: 'connected',
        responseTime: 45, // ms
        connectionPool: {
          used: 3,
          available: 7,
          pending: 0
        }
      },
      redis: {
        status: 'connected',
        responseTime: 12,
        memoryUsage: '45%'
      },
      externalAPI: {
        status: 'available',
        responseTime: 234,
        lastCheck: Date.now() - 30000 // 30 seconds ago
      }
    }
  };

  // Determine overall health status
  const serviceStatuses = Object.values(detailedHealth.services).map(s => s.status);
  const allHealthy = serviceStatuses.every(status =>
    status === 'connected' || status === 'available'
  );

  detailedHealth.status = allHealthy ? 'healthy' : 'degraded';

  const statusCode = allHealthy ? 200 : 503;
  res.status(statusCode).json(detailedHealth);
});

// Readiness check (for Kubernetes)
app.get('/ready', (req, res) => {
  // Check if application is ready to serve traffic
  // This might include database connections, cache warmup, etc.

  const isReady = true; // Implement actual readiness logic

  if (isReady) {
    res.status(200).json({ status: 'ready', timestamp: Date.now() });
  } else {
    res.status(503).json({ status: 'not ready', timestamp: Date.now() });
  }
});

// Liveness check (for Kubernetes)
app.get('/live', (req, res) => {
  // Simple liveness check - if server is responding, it's alive
  res.status(200).json({ status: 'alive', timestamp: Date.now() });
});

// Metrics endpoint (for Prometheus)
app.get('/metrics', (req, res) => {
  const metrics = \`# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
http_requests_total{method="GET",endpoint="/health"} 1256
http_requests_total{method="GET",endpoint="/health/detailed"} 89
http_requests_total{method="GET",endpoint="/ready"} 2341
http_requests_total{method="GET",endpoint="/live"} 5678

# HELP http_request_duration_seconds HTTP request duration in seconds
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds_bucket{le="0.1"} 2345
http_request_duration_seconds_bucket{le="0.5"} 3456
http_request_duration_seconds_bucket{le="1.0"} 4567
http_request_duration_seconds_bucket{le="+Inf"} 5678
http_request_duration_seconds_sum 1234.56
http_request_duration_seconds_count 5678

# HELP memory_usage_bytes Current memory usage in bytes
# TYPE memory_usage_bytes gauge
memory_usage_bytes \${process.memoryUsage().heapUsed}

# HELP uptime_seconds Application uptime in seconds
# TYPE uptime_seconds counter
uptime_seconds_total \${process.uptime()}
\`;

  res.set('Content-Type', 'text/plain; charset=utf-8');
  res.send(metrics);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Health check server running on port \${PORT}\`);
});`
        }
      ]
    },
    {
      title: "Logging Strategies",
      content: "Effective logging is crucial for monitoring, debugging, and maintaining applications. Structured logging provides consistent, machine-readable log data that can be easily searched, filtered, and analyzed.\n\n**Log Levels**: DEBUG (detailed information), INFO (general information), WARN (warning messages), ERROR (error conditions), FATAL (severe errors).\n\n**Structured Logging**: Use consistent formats with key-value pairs instead of plain text messages. Include context like user ID, request ID, and timestamps.\n\n**Log Aggregation**: Collect logs from multiple sources into a central system for analysis. Tools like ELK stack (Elasticsearch, Logstash, Kibana) provide powerful log aggregation capabilities.\n\n**Log Rotation**: Implement log rotation to prevent log files from consuming too much disk space. Configure appropriate retention policies.\n\n**Security Considerations**: Avoid logging sensitive information like passwords, API keys, or personal data. Implement log sanitization.\n\n**Performance Impact**: Logging can impact application performance. Use asynchronous logging and appropriate log levels in production.",
      keyTopics: [
        "Log levels and their appropriate usage",
        "Structured logging formats and best practices",
        "Log aggregation and centralization",
        "Log analysis and search capabilities",
        "Security considerations in logging",
        "Performance implications of logging"
      ],
      practicalExercises: [
        "Implement structured logging in a Node.js application",
        "Set up ELK stack for log aggregation",
        "Create custom log parsers and filters",
        "Implement log rotation and retention policies",
        "Build log analysis dashboards",
        "Set up log alerting and notifications"
      ],
      codeExamples: [
        {
          title: "Structured Logging with Winston",
          language: "javascript",
          code: `const winston = require('winston');
const path = require('path');

// Custom log format
const customFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;
    return JSON.stringify({
      timestamp,
      level: level.toUpperCase(),
      message,
      service: 'user-service',
      version: '1.0.0',
      ...meta
    });
  })
);

// Create logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: customFormat,
  defaultMeta: { service: 'user-service' },
  transports: [
    // Console transport for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),

    // File transport for all logs
    new winston.transports.File({
      filename: path.join(__dirname, 'logs', 'app.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      tailable: true
    }),

    // Separate file for errors
    new winston.transports.File({
      filename: path.join(__dirname, 'logs', 'error.log'),
      level: 'error',
      maxsize: 5242880,
      maxFiles: 5,
      tailable: true
    })
  ]
});

// Add request ID to all logs in this context
const addRequestId = winston.format((info, opts) => {
  if (opts.requestId) {
    info.requestId = opts.requestId;
  }
  return info;
});

// Create child logger with request context
function createRequestLogger(requestId) {
  return logger.child({
    format: winston.format.combine(
      addRequestId({ requestId }),
      customFormat
    )
  });
}

// Usage examples
logger.info('Application started', {
  port: 3000,
  environment: process.env.NODE_ENV
});

logger.warn('High memory usage detected', {
  memoryUsage: '85%',
  threshold: '80%'
});

logger.error('Database connection failed', {
  error: 'Connection timeout',
  database: 'postgresql',
  host: 'localhost:5432',
  retryCount: 3
});

// HTTP request logging middleware
function requestLogger(req, res, next) {
  const start = Date.now();
  const requestId = req.headers['x-request-id'] || generateRequestId();

  // Add request ID to response header
  res.setHeader('x-request-id', requestId);

  const reqLogger = createRequestLogger(requestId);

  reqLogger.info('Request started', {
    method: req.method,
    url: req.url,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
    headers: sanitizeHeaders(req.headers)
  });

  // Log response
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logLevel = res.statusCode >= 400 ? 'warn' : 'info';

    reqLogger.log(logLevel, 'Request completed', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: \`\${duration}ms\`,
      contentLength: res.get('Content-Length')
    });
  });

  next();
}

// Error logging middleware
function errorLogger(err, req, res, next) {
  const requestId = req.headers['x-request-id'] || 'unknown';
  const errLogger = createRequestLogger(requestId);

  errLogger.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    userAgent: req.get('User-Agent'),
    ip: req.ip
  });

  next(err);
}

// Sanitize sensitive headers
function sanitizeHeaders(headers) {
  const sensitiveHeaders = ['authorization', 'cookie', 'x-api-key'];
  const sanitized = { ...headers };

  sensitiveHeaders.forEach(header => {
    if (sanitized[header]) {
      sanitized[header] = '[REDACTED]';
    }
  });

  return sanitized;
}

// Generate unique request ID
function generateRequestId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

module.exports = {
  logger,
  createRequestLogger,
  requestLogger,
  errorLogger
};`
        },
        {
          title: "ELK Stack Configuration",
          language: "yaml",
          code: `# docker-compose.yml for ELK Stack
version: '3.8'

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.5.0
    container_name: elasticsearch
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
      - xpack.security.enabled=false
      - xpack.monitoring.enabled=false
    ports:
      - "9200:9200"
      - "9300:9300"
    volumes:
      - elasticsearch-data:/usr/share/elasticsearch/data
    networks:
      - elk

  logstash:
    image: docker.elastic.co/logstash/logstash:8.5.0
    container_name: logstash
    ports:
      - "5044:5044"
      - "5000:5000"
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    depends_on:
      - elasticsearch
    networks:
      - elk

  kibana:
    image: docker.elastic.co/kibana/kibana:8.5.0
    container_name: kibana
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    depends_on:
      - elasticsearch
    networks:
      - elk

volumes:
  elasticsearch-data:

networks:
  elk:
    driver: bridge

# logstash.conf
input {
  tcp {
    port => 5000
    codec => json
  }

  beats {
    port => 5044
  }
}

filter {
  # Parse JSON logs
  json {
    source => "message"
  }

  # Add geoip information
  geoip {
    source => "client_ip"
    target => "geoip"
  }

  # Parse timestamps
  date {
    match => ["timestamp", "ISO8601", "YYYY-MM-DD HH:mm:ss"]
    target => "@timestamp"
  }

  # Add custom fields
  mutate {
    add_field => {
      "service" => "%{[@metadata][beat]}"
      "environment" => "production"
    }
  }

  # Filter out unwanted logs
  if [level] == "DEBUG" {
    drop {}
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "logs-%{+YYYY.MM.dd}"
    document_type => "_doc"
  }

  stdout {
    codec => rubydebug
  }
}`
        }
      ]
    },
    {
      title: "Metrics and Monitoring with Prometheus",
      content: "Prometheus is a powerful monitoring and alerting toolkit that collects metrics from configured targets at specified intervals. It provides a multidimensional data model and a powerful query language for analyzing metrics.\n\n**Metrics Types**: Counter (monotonically increasing), Gauge (can go up and down), Histogram (samples observations and counts them in buckets), Summary (similar to histogram but calculates quantiles).\n\n**Exporters**: Prometheus uses exporters to collect metrics from various systems. Node.js applications can use the prom-client library to expose metrics.\n\n**PromQL**: Prometheus Query Language allows complex queries and aggregations of metrics data.\n\n**Alerting**: Prometheus Alertmanager handles alerts from Prometheus and routes them to various notification channels.\n\n**Service Discovery**: Automatically discover targets to monitor using service discovery mechanisms.\n\n**Storage**: Time-series database optimized for metrics with efficient compression and querying.",
      keyTopics: [
        "Prometheus architecture and components",
        "Metrics types and collection strategies",
        "PromQL query language and functions",
        "Alerting rules and Alertmanager configuration",
        "Service discovery and target configuration",
        "Prometheus storage and retention policies"
      ],
      practicalExercises: [
        "Set up Prometheus monitoring for a Node.js application",
        "Create custom metrics and exporters",
        "Write PromQL queries for monitoring dashboards",
        "Configure alerting rules and notifications",
        "Implement service discovery for dynamic environments",
        "Set up Prometheus federation for multi-region monitoring"
      ],
      codeExamples: [
        {
          title: "Prometheus Metrics in Node.js",
          language: "javascript",
          code: `const express = require('express');
const promClient = require('prom-client');
const app = express();

// Create a Registry which registers the metrics
const register = new promClient.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'my-app',
  environment: 'production'
});

// Enable the collection of default metrics
promClient.collectDefaultMetrics({ register });

// Create custom metrics
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5, 10]
});

const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const activeConnections = new promClient.Gauge({
  name: 'active_connections',
  help: 'Number of active connections'
});

const userRegistrations = new promClient.Counter({
  name: 'user_registrations_total',
  help: 'Total number of user registrations',
  labelNames: ['source', 'plan']
});

// Register custom metrics
register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestsTotal);
register.registerMetric(activeConnections);
register.registerMetric(userRegistrations);

// Middleware to track HTTP metrics
app.use((req, res, next) => {
  const start = Date.now();

  // Increment active connections
  activeConnections.inc();

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;

    // Record request duration
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode.toString())
      .observe(duration);

    // Increment request counter
    httpRequestsTotal
      .labels(req.method, req.route?.path || req.path, res.statusCode.toString())
      .inc();

    // Decrement active connections
    activeConnections.dec();
  });

  next();
});

// Metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});

// Example routes with custom metrics
app.post('/users/register', (req, res) => {
  const { source = 'web', plan = 'free' } = req.body;

  // Simulate user registration
  setTimeout(() => {
    // Increment user registration counter
    userRegistrations.labels(source, plan).inc();

    res.json({
      message: 'User registered successfully',
      userId: Math.random().toString(36).substr(2, 9)
    });
  }, Math.random() * 1000);
});

// Business logic metrics
class OrderService {
  constructor() {
    this.orderProcessingTime = new promClient.Histogram({
      name: 'order_processing_duration_seconds',
      help: 'Time taken to process orders',
      labelNames: ['order_type', 'payment_method'],
      buckets: [1, 5, 10, 30, 60, 300]
    });

    this.ordersTotal = new promClient.Counter({
      name: 'orders_total',
      help: 'Total number of orders processed',
      labelNames: ['status', 'order_type']
    });

    this.activeOrders = new promClient.Gauge({
      name: 'active_orders',
      help: 'Number of currently active orders'
    });

    register.registerMetric(this.orderProcessingTime);
    register.registerMetric(this.ordersTotal);
    register.registerMetric(this.activeOrders);
  }

  async processOrder(orderData) {
    const start = Date.now();
    this.activeOrders.inc();

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, Math.random() * 5000));

      const duration = (Date.now() - start) / 1000;

      // Record processing time
      this.orderProcessingTime
        .labels(orderData.type, orderData.paymentMethod)
        .observe(duration);

      // Increment successful orders
      this.ordersTotal.labels('completed', orderData.type).inc();

      return { success: true, orderId: Math.random().toString(36).substr(2, 9) };
    } catch (error) {
      // Increment failed orders
      this.ordersTotal.labels('failed', orderData.type).inc();
      throw error;
    } finally {
      this.activeOrders.dec();
    }
  }
}

const orderService = new OrderService();

app.post('/orders', async (req, res) => {
  try {
    const result = await orderService.processOrder(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Order processing failed' });
  }
});

// Health check with metrics
app.get('/health', (req, res) => {
  // Simulate health check
  const isHealthy = Math.random() > 0.1; // 90% healthy

  if (isHealthy) {
    res.json({
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: Date.now()
    });
  } else {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: Date.now()
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
  console.log(\`Metrics available at http://localhost:\${PORT}/metrics\`);
});`
        },
        {
          title: "Prometheus Configuration",
          language: "yaml",
          code: `# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-app'
    static_configs:
      - targets: ['app:3000']
    scrape_interval: 5s
    metrics_path: '/metrics'

  - job_name: 'database'
    static_configs:
      - targets: ['postgres:9187']
    scrape_interval: 30s

  - job_name: 'nginx'
    static_configs:
      - targets: ['nginx:9113']

  - job_name: 'docker'
    static_configs:
      - targets: ['docker:9323']

  # Service discovery for Kubernetes
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)
      - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
        action: replace
        regex: ([^:]+)(?::\\d+)?;(\\d+)
        replacement: $1:$2
        target_label: __address__
      - action: labelmap
        regex: __meta_kubernetes_pod_label_(.+)
      - source_labels: [__meta_kubernetes_namespace]
        action: replace
        target_label: kubernetes_namespace
      - source_labels: [__meta_kubernetes_pod_name]
        action: replace
        target_label: kubernetes_pod_name

# alert_rules.yml
groups:
  - name: example
    rules:
      - alert: HighRequestLatency
        expr: http_request_duration_seconds{quantile="0.5"} > 0.5
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "High request latency detected"
          description: "Request latency is {{ $value }}s for {{ $labels.route }}"

      - alert: HighErrorRate
        expr: rate(http_requests_total{status_code=~"5.."}[5m]) / rate(http_requests_total[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value | humanizePercentage }}"

      - alert: LowMemory
        expr: (1 - system_memory_usage / system_memory_total) < 0.1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Low memory warning"
          description: "Memory usage is above 90%"

      - alert: ServiceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Service is down"
          description: "{{ $labels.job }} service is down"`

        }
      ]
    },
    {
      title: "Distributed Tracing with Jaeger",
      content: "Distributed tracing tracks requests as they flow through distributed systems, providing visibility into the performance and behavior of complex microservices architectures.\n\n**Trace Context**: Each trace represents a single request and contains multiple spans. Spans represent individual operations within the request.\n\n**OpenTelemetry**: Open standard for observability that provides APIs for tracing, metrics, and logging.\n\n**Jaeger**: Open-source distributed tracing system that can receive traces from multiple sources and provide visualization and analysis.\n\n**Sampling**: Strategy for deciding which traces to collect to balance observability with performance impact.\n\n**Context Propagation**: Mechanism for passing trace context between services in a distributed system.\n\n**Span Tags and Logs**: Additional metadata attached to spans for better analysis and debugging.",
      keyTopics: [
        "Distributed tracing concepts and architecture",
        "OpenTelemetry standards and implementation",
        "Jaeger setup and configuration",
        "Sampling strategies and configuration",
        "Context propagation in microservices",
        "Trace analysis and debugging techniques"
      ],
      practicalExercises: [
        "Implement distributed tracing in a microservices application",
        "Set up Jaeger for trace collection and visualization",
        "Configure OpenTelemetry instrumentation",
        "Implement custom spans and tags",
        "Set up trace sampling strategies",
        "Analyze traces for performance bottlenecks"
      ],
      codeExamples: [
        {
          title: "OpenTelemetry Tracing in Node.js",
          language: "javascript",
          code: `const express = require('express');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const opentelemetry = require('@opentelemetry/api');

// Initialize tracer provider
const tracerProvider = new NodeTracerProvider();

// Configure Jaeger exporter
const jaegerExporter = new JaegerExporter({
  endpoint: 'http://jaeger:14268/api/traces',
  serviceName: 'user-service'
});

// Add span processor
tracerProvider.addSpanProcessor(new SimpleSpanProcessor(jaegerExporter));

// Register the tracer provider
tracerProvider.register();

// Register instrumentations
registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation()
  ]
});

// Get tracer
const tracer = opentelemetry.trace.getTracer('user-service', '1.0.0');

const app = express();
app.use(express.json());

// Middleware to extract trace context from headers
app.use((req, res, next) => {
  // Extract trace context from incoming headers
  const spanContext = opentelemetry.propagation.extract(
    opentelemetry.context.active(),
    req.headers
  );

  // Create child span for this request
  const span = tracer.startSpan('http_request', {
    kind: opentelemetry.SpanKind.SERVER,
    attributes: {
      'http.method': req.method,
      'http.url': req.url,
      'http.user_agent': req.get('User-Agent'),
      'net.peer.ip': req.ip
    }
  }, spanContext);

  // Set span on context
  const ctx = opentelemetry.trace.setSpan(opentelemetry.context.active(), span);

  // Add span to request object for use in route handlers
  req.span = span;

  // End span when response finishes
  res.on('finish', () => {
    span.setAttributes({
      'http.status_code': res.statusCode,
      'http.response_length': res.get('Content-Length')
    });

    if (res.statusCode >= 400) {
      span.setStatus({
        code: opentelemetry.SpanStatusCode.ERROR,
        message: res.statusMessage
      });
    }

    span.end();
  });

  // Continue with next middleware
  opentelemetry.context.with(ctx, next);
});

// Database operation with tracing
async function getUserFromDatabase(userId) {
  const span = tracer.startSpan('get_user_from_db', {
    kind: opentelemetry.SpanKind.INTERNAL,
    attributes: {
      'db.system': 'postgresql',
      'db.operation': 'select',
      'db.table': 'users',
      'user.id': userId
    }
  });

  try {
    // Simulate database operation
    span.addEvent('Starting database query');
    await new Promise(resolve => setTimeout(resolve, Math.random() * 100));

    // Simulate successful query
    const user = {
      id: userId,
      name: 'John Doe',
      email: 'john@example.com'
    };

    span.addEvent('Database query completed', {
      'db.rows_returned': 1
    });

    span.setAttributes({
      'db.rows_affected': 1
    });

    return user;
  } catch (error) {
    span.recordException(error);
    span.setStatus({
      code: opentelemetry.SpanStatusCode.ERROR,
      message: error.message
    });
    throw error;
  } finally {
    span.end();
  }
}

// External API call with tracing
async function callExternalAPI(userId) {
  const span = tracer.startSpan('call_external_api', {
    kind: opentelemetry.SpanKind.CLIENT,
    attributes: {
      'http.method': 'GET',
      'http.url': 'https://api.example.com/users/' + userId,
      'peer.service': 'user-api'
    }
  });

  try {
    span.addEvent('Making HTTP request');

    // Simulate HTTP request
    const response = await new Promise(resolve => {
      setTimeout(() => resolve({
        status: 200,
        data: { id: userId, profile: 'User profile data' }
      }), Math.random() * 500);
    });

    span.setAttributes({
      'http.status_code': response.status,
      'http.response_length': JSON.stringify(response.data).length
    });

    span.addEvent('HTTP request completed');

    return response.data;
  } catch (error) {
    span.recordException(error);
    span.setStatus({
      code: opentelemetry.SpanStatusCode.ERROR,
      message: error.message
    });
    throw error;
  } finally {
    span.end();
  }
}

// Route handler with custom spans
app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const span = req.span;

  try {
    span.addEvent('Processing user request', {
      'user.id': userId
    });

    // Get user from database
    const user = await getUserFromDatabase(userId);

    // Call external API
    const profile = await callExternalAPI(userId);

    // Combine data
    const result = {
      ...user,
      profile
    };

    span.addEvent('User data retrieved successfully', {
      'user.found': true
    });

    res.json(result);
  } catch (error) {
    span.recordException(error);
    span.setStatus({
      code: opentelemetry.SpanStatusCode.ERROR,
      message: error.message
    });

    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route with custom attributes and events
app.post('/users', async (req, res) => {
  const span = req.span;
  const { name, email } = req.body;

  span.setAttributes({
    'user.name': name,
    'user.email': email,
    'operation.type': 'create'
  });

  span.addEvent('Validating user data');

  // Simulate validation
  if (!name || !email) {
    span.addEvent('Validation failed', {
      'validation.errors': ['name and email are required']
    });

    span.setStatus({
      code: opentelemetry.SpanStatusCode.ERROR,
      message: 'Validation failed'
    });

    return res.status(400).json({ error: 'Name and email are required' });
  }

  span.addEvent('Creating user in database');

  try {
    // Simulate user creation
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      createdAt: new Date().toISOString()
    };

    span.setAttributes({
      'user.id': newUser.id,
      'db.rows_affected': 1
    });

    span.addEvent('User created successfully');

    res.status(201).json(newUser);
  } catch (error) {
    span.recordException(error);
    span.setStatus({
      code: opentelemetry.SpanStatusCode.ERROR,
      message: error.message
    });

    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  tracerProvider.shutdown().then(() => {
    console.log('Tracing provider shut down');
    process.exit(0);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`User service running on port \${PORT}\`);
  console.log('Tracing enabled with Jaeger exporter');
});`
        },
        {
          title: "Jaeger Configuration",
          language: "yaml",
          code: `# docker-compose.yml for Jaeger
version: '3.8'

services:
  jaeger:
    image: jaegertracing/all-in-one:latest
    container_name: jaeger
    ports:
      - "16686:16686"  # Jaeger UI
      - "14268:14268"  # Accept jaeger.thrift over HTTP
      - "14250:14250"  # Accept jaeger.thrift over gRPC
    environment:
      - COLLECTOR_OTLP_ENABLED=true
      - COLLECTOR_ZIPKIN_HOST_PORT=:9411
    networks:
      - tracing

  # Optional: Elasticsearch for persistent storage
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.17.0
    container_name: jaeger-elasticsearch
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch-data:/usr/share/elasticsearch/data
    networks:
      - tracing

  # Optional: Cassandra for persistent storage
  cassandra:
    image: cassandra:3.11
    container_name: jaeger-cassandra
    ports:
      - "9042:9042"
    volumes:
      - cassandra-data:/var/lib/cassandra
    networks:
      - tracing

volumes:
  elasticsearch-data:
  cassandra-data:

networks:
  tracing:
    driver: bridge

# Jaeger configuration with sampling
# jaeger-config.yml
service:
  name: jaeger
  version: 1.0.0

sampling:
  strategies:
    # Default sampling strategy
    default_strategy:
      type: probabilistic
      param: 0.1  # Sample 10% of traces

    # Service-specific sampling
    service_strategies:
      - service: "user-service"
        type: probabilistic
        param: 0.5  # Sample 50% of user-service traces

      - service: "payment-service"
        type: rateLimiting
        param: 100  # Sample 100 traces per second

      - service: "notification-service"
        type: probabilistic
        param: 0.01  # Sample 1% of notification traces

# OpenTelemetry Collector configuration
# otel-collector-config.yml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

  jaeger:
    protocols:
      grpc:
        endpoint: 0.0.0.0:14250
      thrift_http:
        endpoint: 0.0.0.0:14268

processors:
  batch:
    timeout: 1s
    send_batch_size: 1024

  # Add service name and version
  resource:
    attributes:
      - key: service.name
        value: "unknown_service"
        action: insert
      - key: service.version
        value: "1.0.0"
        action: insert

exporters:
  jaeger:
    endpoint: "jaeger:14268"
    tls:
      insecure: true

  logging:
    loglevel: debug

service:
  pipelines:
    traces:
      receivers: [otlp, jaeger]
      processors: [resource, batch]
      exporters: [jaeger, logging]`
        }
      ]
    }
  ],
  projects: [
    {
      title: "Full-Stack Monitoring Solution",
      description: "Build a comprehensive monitoring solution for a microservices application using Prometheus, Grafana, ELK stack, and Jaeger",
      difficulty: "advanced",
      estimatedHours: 50,
      technologies: ["Prometheus", "Grafana", "Elasticsearch", "Logstash", "Kibana", "Jaeger", "Node.js", "Docker"],
      features: [
        "Complete metrics collection with Prometheus",
        "Custom dashboards in Grafana",
        "Centralized logging with ELK stack",
        "Distributed tracing with Jaeger",
        "Alerting and notification system",
        "Health checks and service discovery",
        "Performance monitoring and analysis",
        "Log aggregation and analysis",
        "Custom exporters and instrumentation",
        "Monitoring for multiple environments"
      ]
    },
    {
      title: "Cloud-Native Observability Platform",
      description: "Create an observability platform for cloud-native applications with Kubernetes integration and multi-region support",
      difficulty: "advanced",
      estimatedHours: 45,
      technologies: ["Kubernetes", "Prometheus", "Grafana", "Jaeger", "OpenTelemetry", "Helm"],
      features: [
        "Kubernetes-native monitoring setup",
        "Service mesh integration",
        "Multi-region observability",
        "Auto-scaling monitoring",
        "Cost optimization for monitoring",
        "Security monitoring and compliance",
        "Custom metrics for business KPIs",
        "Real-time alerting and incident response",
        "Performance profiling and optimization",
        "Integration with cloud provider monitoring"
      ]
    },
    {
      title: "Real-Time Analytics Dashboard",
      description: "Build a real-time analytics dashboard with streaming data processing and interactive visualizations",
      difficulty: "intermediate",
      estimatedHours: 35,
      technologies: ["Node.js", "WebSocket", "D3.js", "Redis", "Kafka", "InfluxDB"],
      features: [
        "Real-time data streaming",
        "Interactive data visualizations",
        "Custom metrics and KPIs",
        "Real-time alerting system",
        "Data aggregation and processing",
        "Historical data analysis",
        "Custom dashboard builder",
        "Multi-tenant support",
        "API for third-party integrations",
        "Performance optimization for large datasets"
      ]
    }
  ],
  assessments: {
    quiz: [
      {
        question: "What is the primary difference between monitoring and observability?",
        options: [
          "Monitoring is reactive, observability is proactive",
          "Monitoring collects data, observability provides insights",
          "Monitoring is for infrastructure, observability is for applications",
          "Monitoring uses logs, observability uses metrics"
        ],
        correctAnswer: 1,
        explanation: "Monitoring focuses on collecting data about system state, while observability provides the ability to understand and explain system behavior through that data."
      },
      {
        question: "Which Prometheus metric type is used for values that can increase and decrease?",
        options: [
          "Counter",
          "Gauge",
          "Histogram",
          "Summary"
        ],
        correctAnswer: 1,
        explanation: "Gauge metrics are used for values that can go up and down, such as memory usage, CPU utilization, or queue length."
      },
      {
        question: "What is the purpose of distributed tracing in microservices?",
        options: [
          "To track individual service performance",
          "To monitor network traffic between services",
          "To trace requests across multiple services",
          "To debug database queries"
        ],
        correctAnswer: 2,
        explanation: "Distributed tracing tracks requests as they flow through multiple services in a microservices architecture, providing visibility into the entire request path."
      },
      {
        question: "Which log level should be used for non-critical information that helps with debugging?",
        options: [
          "ERROR",
          "WARN",
          "INFO",
          "DEBUG"
        ],
        correctAnswer: 3,
        explanation: "DEBUG level is used for detailed information that helps with debugging and troubleshooting, typically not shown in production."
      },
      {
        question: "What is the main purpose of service discovery in monitoring?",
        options: [
          "To find available services in a dynamic environment",
          "To discover security vulnerabilities",
          "To monitor service dependencies",
          "To track service versions"
        ],
        correctAnswer: 0,
        explanation: "Service discovery automatically finds and monitors services in dynamic environments where services can be created, destroyed, or moved."
      }
    ],
    evaluation: [
      {
        scenario: "Your team is responsible for monitoring a critical e-commerce application that processes thousands of transactions per minute. The application consists of multiple microservices running on Kubernetes.",
        questions: [
          "What monitoring strategy would you implement for this application?",
          "How would you handle monitoring in a high-traffic environment?",
          "What alerting strategy would you use for different types of incidents?",
          "How would you ensure monitoring doesn't impact application performance?"
        ]
      },
      {
        scenario: "You're tasked with improving the observability of a legacy monolithic application that's being migrated to microservices. The application currently has minimal monitoring in place.",
        questions: [
          "What steps would you take to implement comprehensive monitoring?",
          "How would you approach the migration from minimal to full observability?",
          "What tools and technologies would you recommend for this scenario?",
          "How would you measure the success of your monitoring implementation?"
        ]
      }
    ]
  },
  aiPrompts: [
    "How do I set up Prometheus monitoring for a Node.js application?",
    "What's the difference between logs, metrics, and traces?",
    "How do I create custom Grafana dashboards?",
    "How do I implement distributed tracing in microservices?",
    "What's the best way to handle log aggregation at scale?",
    "How do I set up alerting in Prometheus?",
    "How do I monitor Kubernetes applications?",
    "What's the difference between white-box and black-box monitoring?",
    "How do I implement custom metrics in my application?",
    "How do I optimize monitoring costs in the cloud?",
    "How do I set up monitoring for serverless applications?",
    "What's the best practice for log retention and rotation?",
    "How do I monitor database performance?",
    "How do I implement health checks for microservices?",
    "What's the role of service mesh in observability?"
  ],
  resources: [
    {
      title: "Prometheus Documentation",
      type: "documentation",
      url: "https://prometheus.io/docs/",
      description: "Official Prometheus documentation with guides and best practices"
    },
    {
      title: "Grafana Documentation",
      type: "documentation",
      url: "https://grafana.com/docs/",
      description: "Complete Grafana documentation for dashboard creation and configuration"
    },
    {
      title: "OpenTelemetry Documentation",
      type: "documentation",
      url: "https://opentelemetry.io/docs/",
      description: "OpenTelemetry standards and implementation guides"
    },
    {
      title: "ELK Stack Guide",
      type: "guide",
      url: "https://www.elastic.co/guide/index.html",
      description: "Comprehensive guide for Elasticsearch, Logstash, and Kibana"
    },
    {
      title: "Jaeger Tracing",
      type: "documentation",
      url: "https://www.jaegertracing.io/docs/",
      description: "Jaeger documentation for distributed tracing setup"
    },
    {
      title: "Monitoring Best Practices",
      type: "article",
      url: "https://landing.google.com/sre/sre-book/chapters/monitoring-distributed-systems/",
      description: "Google SRE book chapter on monitoring distributed systems"
    }
  ],
  toolsRequired: [
    "Prometheus - Metrics collection and alerting",
    "Grafana - Dashboard and visualization",
    "Elasticsearch - Log storage and search",
    "Logstash - Log processing and aggregation",
    "Kibana - Log visualization and analysis",
    "Jaeger - Distributed tracing",
    "OpenTelemetry - Observability standards",
    "Node.js prom-client - Prometheus metrics client",
    "Winston - Structured logging for Node.js",
    "Docker - Container monitoring",
    "Kubernetes - Orchestration monitoring",
    "Alertmanager - Alert routing and notification",
    "cAdvisor - Container metrics",
    "Fluentd - Log collection and forwarding",
    "Zipkin - Alternative distributed tracing",
    "InfluxDB - Time-series database",
    "VictoriaMetrics - Prometheus long-term storage",
    "Thanos - Prometheus high availability",
    "Loki - Log aggregation system",
    "Tempo - Distributed tracing backend"
  ],
  bestPractices: [
    "Monitor everything that matters, not everything possible",
    "Use structured logging with consistent formats",
    "Implement proper health checks for all services",
    "Set up appropriate alerting with clear escalation paths",
    "Use distributed tracing for microservices debugging",
    "Implement proper log levels and filtering",
    "Use service discovery for dynamic environments",
    "Implement proper metrics naming conventions",
    "Set up monitoring before deploying to production",
    "Use sampling for high-volume tracing",
    "Implement proper retention policies for logs and metrics",
    "Use correlation IDs for request tracing",
    "Monitor business metrics, not just technical metrics",
    "Implement proper error tracking and analysis",
    "Use monitoring to drive performance optimizations",
    "Implement proper backup and disaster recovery monitoring",
    "Use monitoring for capacity planning",
    "Implement proper security monitoring",
    "Use monitoring for compliance and audit requirements",
    "Regularly review and update monitoring configurations",
    "Implement proper alerting fatigue prevention",
    "Use monitoring for incident response and postmortems",
    "Implement proper cost monitoring for cloud resources",
    "Use monitoring for user experience tracking",
    "Implement proper data privacy in monitoring",
    "Use monitoring for A/B testing and feature validation",
    "Implement proper monitoring for third-party services",
    "Use monitoring for performance regression detection",
    "Implement proper monitoring documentation",
    "Use monitoring for service level objective (SLO) tracking"
  ],
  commonPitfalls: [
    "Monitoring too many metrics leading to alert fatigue",
    "Not implementing proper log levels and filtering",
    "Ignoring monitoring in development environments",
    "Not setting up proper alerting thresholds",
    "Using inconsistent metric naming conventions",
    "Not implementing proper health checks",
    "Ignoring security considerations in monitoring",
    "Not setting up proper log retention policies",
    "Using monitoring tools without proper training",
    "Not correlating logs, metrics, and traces",
    "Implementing monitoring as an afterthought",
    "Not monitoring business-critical user journeys",
    "Using default monitoring configurations without tuning",
    "Not implementing proper backup monitoring",
    "Ignoring monitoring costs in cloud environments",
    "Not implementing proper access controls for monitoring",
    "Using outdated monitoring tools and versions",
    "Not implementing proper monitoring for databases",
    "Ignoring monitoring for third-party dependencies",
    "Not implementing proper monitoring documentation",
    "Using monitoring for debugging instead of proper tools",
    "Not implementing proper monitoring for CI/CD pipelines",
    "Ignoring monitoring for serverless functions",
    "Not implementing proper monitoring for mobile applications",
    "Using monitoring without proper alerting channels",
    "Not implementing proper monitoring for APIs",
    "Ignoring monitoring for legacy systems",
    "Not implementing proper monitoring for containers",
    "Using monitoring without proper data visualization",
    "Not implementing proper monitoring for micro-frontends"
  ],
  careerRelevance: [
    "Monitoring skills are essential for DevOps and SRE roles",
    "Observability expertise is highly valued in cloud-native development",
    "Distributed tracing knowledge is crucial for microservices architecture",
    "Prometheus and Grafana are industry-standard monitoring tools",
    "ELK stack skills are in high demand for log analysis",
    "OpenTelemetry knowledge is becoming essential for modern applications",
    "Monitoring expertise helps with incident response and reliability",
    "Observability skills are critical for large-scale system design",
    "Cloud monitoring knowledge is essential for cloud-native careers",
    "Performance monitoring skills help optimize application efficiency",
    "Security monitoring expertise is crucial for cybersecurity roles",
    "Business monitoring skills help align technical metrics with business goals",
    "Monitoring automation skills are valuable for infrastructure as code",
    "Real-time analytics knowledge is essential for data-driven decisions",
    "Cost monitoring expertise helps optimize cloud spending",
    "Compliance monitoring skills are important for regulated industries",
    "User experience monitoring helps improve product quality",
    "Synthetic monitoring knowledge helps ensure service availability",
    "Log analysis skills are crucial for debugging and troubleshooting",
    "Metrics collection expertise enables data-driven development",
    "Alerting system knowledge helps with proactive issue resolution",
    "Dashboard creation skills help communicate system health",
    "Monitoring strategy design helps build reliable systems",
    "Observability culture promotion helps improve team collaboration",
    "Monitoring tool integration skills help build comprehensive solutions",
    "Performance profiling expertise helps optimize application speed",
    "Anomaly detection knowledge helps identify unusual system behavior",
    "Capacity planning skills help ensure system scalability",
    "Incident response monitoring helps minimize downtime impact",
    "Post-mortem analysis skills help prevent future incidents",
    "Monitoring best practices knowledge helps maintain system reliability"
  ]
};