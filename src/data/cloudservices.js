export default {
  id: "cloudservices",
  tier: 4,
  name: "Cloud Services",
  description: "Master cloud computing platforms and serverless architecture for scalable, cost-effective application deployment. Learn AWS, GCP, and Azure core services, Infrastructure as Code, microservices design, and cloud optimization strategies.",
  difficulty: "advanced",
  estimatedHours: 25,
  prerequisites: ["docker", "monitoring"],
  learningObjectives: [
    "Understand core services across major cloud platforms (AWS, GCP, Azure)",
    "Implement serverless computing with Lambda, Cloud Functions, and Azure Functions",
    "Design scalable cloud storage and database solutions",
    "Configure CDN and edge computing for global performance",
    "Architect microservices applications for cloud deployment",
    "Implement Infrastructure as Code using Terraform and CloudFormation",
    "Optimize cloud costs through monitoring and resource management",
    "Deploy applications using cloud-native deployment strategies",
    "Implement cloud security best practices and compliance",
    "Monitor and troubleshoot cloud applications",
    "Design multi-region and multi-cloud architectures",
    "Automate cloud infrastructure and deployments"
  ],
  sections: [
    {
      title: "Cloud Platform Fundamentals",
      content: "Cloud computing provides on-demand access to computing resources, storage, and services over the internet. Major cloud providers (AWS, Google Cloud Platform, and Microsoft Azure) offer comprehensive suites of services for building, deploying, and managing applications at scale.\n\n**Cloud Service Models**:\n- **IaaS (Infrastructure as a Service)**: Virtual machines, storage, networking\n- **PaaS (Platform as a Service)**: Application development and deployment platforms\n- **SaaS (Software as a Service)**: Ready-to-use applications\n- **FaaS (Functions as a Service)**: Serverless computing\n\n**Cloud Deployment Models**:\n- **Public Cloud**: Services offered by third-party providers\n- **Private Cloud**: Dedicated infrastructure for single organization\n- **Hybrid Cloud**: Combination of public and private clouds\n- **Multi-Cloud**: Using multiple cloud providers simultaneously\n\n**Core Cloud Concepts**: Scalability, elasticity, high availability, fault tolerance, and pay-as-you-go pricing models.\n\n**Getting Started**: Choose a cloud provider based on your needs, create an account, set up billing alerts, and configure security settings.\n\n**Cloud Console**: Each provider offers web-based consoles for managing resources, monitoring usage, and accessing services.",
      keyTopics: [
        "Cloud service and deployment models",
        "Major cloud providers comparison",
        "Cloud economics and pricing models",
        "Cloud security fundamentals",
        "Getting started with cloud platforms"
      ],
      practicalExercises: [
        "Create accounts on AWS, GCP, and Azure with proper security setup",
        "Configure billing alerts and cost monitoring",
        "Explore cloud console interfaces and navigation",
        "Set up multi-factor authentication and access controls",
        "Create and manage basic cloud resources (VMs, storage)"
      ],
      codeExamples: [
        {
          title: "AWS CLI Setup and Basic Commands",
          language: "bash",
          code: `# Install AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configure AWS CLI
aws configure
# Enter: Access Key ID, Secret Access Key, Default region, Default output format

# Basic AWS commands
aws ec2 describe-instances
aws s3 ls
aws iam list-users
aws cloudformation list-stacks

# Create S3 bucket
aws s3 mb s3://my-unique-bucket-name

# Upload file to S3
aws s3 cp myfile.txt s3://my-bucket/

# List EC2 instances with tags
aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId,State.Name,Tags[?Key==\`Name\`].Value|[0]]' --output table

# Get account information
aws sts get-caller-identity

# List all regions
aws ec2 describe-regions --output table`
        },
        {
          title: "Google Cloud SDK Setup",
          language: "bash",
          code: `# Install Google Cloud SDK
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Initialize gcloud
gcloud init

# Set project
gcloud config set project my-project-id

# Authenticate
gcloud auth login
gcloud auth application-default login

# Basic gcloud commands
gcloud compute instances list
gcloud storage buckets list
gcloud projects list
gcloud services list --available

# Create storage bucket
gsutil mb gs://my-unique-bucket-name

# Upload file to GCS
gsutil cp myfile.txt gs://my-bucket/

# List compute instances
gcloud compute instances list --format="table(name,status,zone,machine_type)"

# Get project information
gcloud config list

# Enable APIs
gcloud services enable compute.googleapis.com
gcloud services enable storage-api.googleapis.com`
        },
        {
          title: "Azure CLI Setup and Commands",
          language: "bash",
          code: `# Install Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Login to Azure
az login

# Set subscription
az account set --subscription "My Subscription"

# List available subscriptions
az account list --output table

# Basic Azure commands
az vm list
az storage account list
az group list
az webapp list

# Create resource group
az group create --name myResourceGroup --location eastus

# Create storage account
az storage account create --name mystorageaccount --resource-group myResourceGroup --location eastus --sku Standard_LRS

# Upload blob to storage
az storage blob upload --account-name mystorageaccount --container-name mycontainer --name myblob --file myfile.txt

# List virtual machines
az vm list --output table

# Get account information
az account show

# List available locations
az account list-locations --output table`
        }
      ]
    },
    {
      title: "Serverless Computing and Functions",
      content: "Serverless computing allows you to run code without managing servers. Functions as a Service (FaaS) platforms automatically scale, handle infrastructure, and charge only for actual execution time.\n\n**Serverless Benefits**:\n- **No Server Management**: Focus on code, not infrastructure\n- **Automatic Scaling**: Handle any load automatically\n- **Cost Efficiency**: Pay only for execution time\n- **Built-in High Availability**: Fault tolerance and redundancy\n- **Event-Driven**: Respond to events from various sources\n\n**Function Platforms**:\n- **AWS Lambda**: Supports multiple languages, integrates with all AWS services\n- **Google Cloud Functions**: Built on Google infrastructure, supports HTTP and event triggers\n- **Azure Functions**: Supports multiple languages, integrates with Azure ecosystem\n\n**Function Triggers**: HTTP requests, database changes, file uploads, scheduled events, message queues, and custom events.\n\n**Cold Starts**: Initial execution delay when a function hasn't been used recently. Mitigate with provisioned concurrency and optimized packages.\n\n**Best Practices**: Keep functions small and focused, use appropriate memory allocation, implement proper error handling, and monitor performance.\n\n**Limitations**: Execution time limits, cold start latency, vendor lock-in considerations, and debugging challenges.",
      keyTopics: [
        "Serverless computing concepts and benefits",
        "Function platforms and capabilities",
        "Event-driven architecture patterns",
        "Cold start optimization strategies",
        "Serverless security considerations"
      ],
      practicalExercises: [
        "Create and deploy serverless functions on AWS Lambda, Google Cloud Functions, and Azure Functions",
        "Implement HTTP API endpoints with serverless functions",
        "Set up event triggers for file uploads and database changes",
        "Configure scheduled functions for automated tasks",
        "Optimize function performance and reduce cold starts",
        "Implement proper error handling and logging"
      ],
      codeExamples: [
        {
          title: "AWS Lambda Function (Node.js)",
          language: "javascript",
          code: `// index.js
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  console.log('Event:', JSON.stringify(event, null, 2));

  try {
    // Handle different HTTP methods
    switch (event.httpMethod) {
      case 'GET':
        return await getItems();
      case 'POST':
        return await createItem(event.body);
      case 'PUT':
        return await updateItem(event.pathParameters.id, event.body);
      case 'DELETE':
        return await deleteItem(event.pathParameters.id);
      default:
        return {
          statusCode: 405,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
          },
          body: JSON.stringify({ message: 'Method not allowed' })
        };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
};

async function getItems() {
  const params = {
    TableName: process.env.TABLE_NAME
  };

  const result = await dynamoDb.scan(params).promise();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(result.Items)
  };
}

async function createItem(body) {
  const data = JSON.parse(body);
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString()
    }
  };

  await dynamoDb.put(params).promise();

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(params.Item)
  };
}

async function updateItem(id, body) {
  const data = JSON.parse(body);
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set #name = :name, updatedAt = :updatedAt',
    ExpressionAttributeNames: {
      '#name': 'name'
    },
    ExpressionAttributeValues: {
      ':name': data.name,
      ':updatedAt': new Date().toISOString()
    },
    ReturnValues: 'ALL_NEW'
  };

  const result = await dynamoDb.update(params).promise();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(result.Attributes)
  };
}

async function deleteItem(id) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id }
  };

  await dynamoDb.delete(params).promise();

  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ message: 'Item deleted successfully' })
  };
}`
        },
        {
          title: "Google Cloud Function (Python)",
          language: "python",
          code: `# main.py
import functions_framework
from google.cloud import firestore
import json
from datetime import datetime

db = firestore.Client()

@functions_framework.http
def api_handler(request):
    """HTTP Cloud Function for CRUD operations."""

    if request.method == 'OPTIONS':
        # Handle CORS preflight request
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)

    try:
        if request.method == 'GET':
            return get_items(request)
        elif request.method == 'POST':
            return create_item(request)
        elif request.method == 'PUT':
            return update_item(request)
        elif request.method == 'DELETE':
            return delete_item(request)
        else:
            return (json.dumps({'error': 'Method not allowed'}), 405,
                   {'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'})

    except Exception as e:
        print(f'Error: {str(e)}')
        return (json.dumps({'error': 'Internal server error'}), 500,
               {'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'})

def get_items(request):
    """Get all items from Firestore."""
    items_ref = db.collection('items')
    docs = items_ref.stream()

    items = []
    for doc in docs:
        item = doc.to_dict()
        item['id'] = doc.id
        items.append(item)

    return (json.dumps(items), 200,
           {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'})

def create_item(request):
    """Create a new item in Firestore."""
    data = request.get_json()

    if not data or 'name' not in data:
        return (json.dumps({'error': 'Name is required'}), 400,
               {'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'})

    item_data = {
        'name': data['name'],
        'description': data.get('description', ''),
        'created_at': datetime.utcnow(),
        'updated_at': datetime.utcnow()
    }

    doc_ref = db.collection('items').document()
    doc_ref.set(item_data)

    item_data['id'] = doc_ref.id

    return (json.dumps(item_data), 201,
           {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'})

def update_item(request):
    """Update an existing item in Firestore."""
    item_id = request.args.get('id')
    if not item_id:
        return (json.dumps({'error': 'Item ID is required'}), 400,
               {'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'})

    data = request.get_json()
    if not data:
        return (json.dumps({'error': 'Request body is required'}), 400,
               {'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'})

    doc_ref = db.collection('items').document(item_id)
    doc = doc_ref.get()

    if not doc.exists:
        return (json.dumps({'error': 'Item not found'}), 404,
               {'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'})

    update_data = {
        'updated_at': datetime.utcnow()
    }

    if 'name' in data:
        update_data['name'] = data['name']
    if 'description' in data:
        update_data['description'] = data['description']

    doc_ref.update(update_data)

    updated_doc = doc_ref.get()
    item = updated_doc.to_dict()
    item['id'] = updated_doc.id

    return (json.dumps(item), 200,
           {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'})

def delete_item(request):
    """Delete an item from Firestore."""
    item_id = request.args.get('id')
    if not item_id:
        return (json.dumps({'error': 'Item ID is required'}), 400,
               {'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'})

    doc_ref = db.collection('items').document(item_id)
    doc = doc_ref.get()

    if not doc.exists:
        return (json.dumps({'error': 'Item not found'}), 404,
               {'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'})

    doc_ref.delete()

    return (json.dumps({'message': 'Item deleted successfully'}), 204,
           {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'})`
        },
        {
          title: "Azure Function (C#)",
          language: "csharp",
          code: `// Function1.cs
using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using Microsoft.Azure.Cosmos;

public static class Function1
{
    private static readonly string EndpointUri = Environment.GetEnvironmentVariable("CosmosDBEndpoint");
    private static readonly string PrimaryKey = Environment.GetEnvironmentVariable("CosmosDBKey");
    private static readonly string DatabaseId = Environment.GetEnvironmentVariable("CosmosDBDatabase");
    private static readonly string ContainerId = Environment.GetEnvironmentVariable("CosmosDBContainer");

    private static CosmosClient cosmosClient = new CosmosClient(EndpointUri, PrimaryKey);
    private static Database database;
    private static Container container;

    static Function1()
    {
        database = cosmosClient.GetDatabase(DatabaseId);
        container = database.GetContainer(ContainerId);
    }

    [FunctionName("ItemsAPI")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", "post", "put", "delete", Route = "items/{id?}")] HttpRequest req,
        string id,
        ILogger log)
    {
        log.LogInformation("C# HTTP trigger function processed a request.");

        try
        {
            switch (req.Method.ToUpper())
            {
                case "GET":
                    return await GetItems(req, id);
                case "POST":
                    return await CreateItem(req);
                case "PUT":
                    return await UpdateItem(req, id);
                case "DELETE":
                    return await DeleteItem(id);
                default:
                    return new BadRequestObjectResult("Method not supported");
            }
        }
        catch (Exception ex)
        {
            log.LogError($"Error processing request: {ex.Message}");
            return new StatusCodeResult(500);
        }
    }

    private static async Task<IActionResult> GetItems(HttpRequest req, string id)
    {
        if (!string.IsNullOrEmpty(id))
        {
            // Get single item
            try
            {
                ItemResponse<Item> response = await container.ReadItemAsync<Item>(id, new PartitionKey(id));
                return new OkObjectResult(response.Resource);
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return new NotFoundResult();
            }
        }
        else
        {
            // Get all items
            var query = new QueryDefinition("SELECT * FROM c");
            var results = new List<Item>();

            using (FeedIterator<Item> resultSet = container.GetItemQueryIterator<Item>(query))
            {
                while (resultSet.HasMoreResults)
                {
                    FeedResponse<Item> response = await resultSet.ReadNextAsync();
                    results.AddRange(response);
                }
            }

            return new OkObjectResult(results);
        }
    }

    private static async Task<IActionResult> CreateItem(HttpRequest req)
    {
        string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
        var data = JsonConvert.DeserializeObject<Item>(requestBody);

        if (data == null || string.IsNullOrEmpty(data.Name))
        {
            return new BadRequestObjectResult("Name is required");
        }

        data.Id = Guid.NewGuid().ToString();
        data.CreatedAt = DateTime.UtcNow;
        data.UpdatedAt = DateTime.UtcNow;

        ItemResponse<Item> response = await container.CreateItemAsync(data, new PartitionKey(data.Id));

        return new CreatedResult($"/api/items/{data.Id}", response.Resource);
    }

    private static async Task<IActionResult> UpdateItem(HttpRequest req, string id)
    {
        if (string.IsNullOrEmpty(id))
        {
            return new BadRequestObjectResult("ID is required");
        }

        string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
        var data = JsonConvert.DeserializeObject<Item>(requestBody);

        if (data == null)
        {
            return new BadRequestObjectResult("Request body is required");
        }

        try
        {
            ItemResponse<Item> readResponse = await container.ReadItemAsync<Item>(id, new PartitionKey(id));
            var existingItem = readResponse.Resource;

            // Update fields
            if (!string.IsNullOrEmpty(data.Name))
                existingItem.Name = data.Name;
            if (!string.IsNullOrEmpty(data.Description))
                existingItem.Description = data.Description;
            existingItem.UpdatedAt = DateTime.UtcNow;

            ItemResponse<Item> updateResponse = await container.ReplaceItemAsync(existingItem, id, new PartitionKey(id));

            return new OkObjectResult(updateResponse.Resource);
        }
        catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return new NotFoundResult();
        }
    }

    private static async Task<IActionResult> DeleteItem(string id)
    {
        if (string.IsNullOrEmpty(id))
        {
            return new BadRequestObjectResult("ID is required");
        }

        try
        {
            ItemResponse<Item> response = await container.DeleteItemAsync<Item>(id, new PartitionKey(id));
            return new NoContentResult();
        }
        catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return new NotFoundResult();
        }
    }
}

public class Item
{
    [JsonProperty("id")]
    public string Id { get; set; }

    [JsonProperty("name")]
    public string Name { get; set; }

    [JsonProperty("description")]
    public string Description { get; set; }

    [JsonProperty("createdAt")]
    public DateTime CreatedAt { get; set; }

    [JsonProperty("updatedAt")]
    public DateTime UpdatedAt { get; set; }
}`
        }
      ]
    },
    {
      title: "Cloud Storage and Databases",
      content: "Cloud storage and database services provide scalable, durable, and highly available data storage solutions. These services eliminate the need to manage physical storage infrastructure and offer automatic scaling, backup, and disaster recovery.\n\n**Cloud Storage Services**:\n- **AWS S3**: Object storage with high durability and availability\n- **Google Cloud Storage**: Unified object storage with strong consistency\n- **Azure Blob Storage**: Scalable object storage with multiple access tiers\n\n**Cloud Database Services**:\n- **Relational**: AWS RDS, Google Cloud SQL, Azure Database\n- **NoSQL**: AWS DynamoDB, Google Firestore, Azure Cosmos DB\n- **Data Warehousing**: AWS Redshift, Google BigQuery, Azure Synapse\n\n**Storage Classes and Tiers**: Different storage classes for different access patterns and cost optimization (Standard, Infrequent Access, Archive, Cold).\n\n**Data Consistency Models**: Strong consistency, eventual consistency, and read-after-write consistency patterns.\n\n**Backup and Disaster Recovery**: Automated backups, cross-region replication, and point-in-time recovery capabilities.\n\n**Security Features**: Encryption at rest and in transit, access control policies, audit logging, and compliance certifications.\n\n**Performance Optimization**: Database indexing, query optimization, connection pooling, and caching strategies.",
      keyTopics: [
        "Cloud storage services and features",
        "Cloud database types and use cases",
        "Data consistency and replication",
        "Backup and disaster recovery strategies",
        "Storage security and compliance"
      ],
      practicalExercises: [
        "Set up cloud storage buckets with proper access controls",
        "Configure cloud databases with high availability",
        "Implement automated backup and recovery procedures",
        "Set up cross-region replication for disaster recovery",
        "Optimize storage costs with lifecycle policies",
        "Implement database indexing and query optimization"
      ],
      codeExamples: [
        {
          title: "AWS S3 Operations with SDK",
          language: "javascript",
          code: `const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// Configure AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION || 'us-east-1'
});

const s3 = new AWS.S3();

// Upload file to S3
async function uploadFile(filePath, bucketName, key) {
  try {
    const fileContent = fs.readFileSync(filePath);

    const params = {
      Bucket: bucketName,
      Key: key,
      Body: fileContent,
      ContentType: getContentType(filePath),
      // Enable server-side encryption
      ServerSideEncryption: 'AES256',
      // Set ACL for public read (use carefully)
      ACL: 'private'
    };

    const result = await s3.upload(params).promise();
    console.log('File uploaded successfully:', result.Location);
    return result;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

// Download file from S3
async function downloadFile(bucketName, key, downloadPath) {
  try {
    const params = {
      Bucket: bucketName,
      Key: key
    };

    const result = await s3.getObject(params).promise();

    fs.writeFileSync(downloadPath, result.Body);
    console.log('File downloaded successfully');
    return result;
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
}

// List objects in bucket
async function listObjects(bucketName, prefix = '') {
  try {
    const params = {
      Bucket: bucketName,
      Prefix: prefix,
      MaxKeys: 100
    };

    const result = await s3.listObjectsV2(params).promise();

    console.log('Objects in bucket:');
    result.Contents.forEach(obj => {
      console.log(\` - \${obj.Key} (\${obj.Size} bytes)\`);
    });

    return result.Contents;
  } catch (error) {
    console.error('Error listing objects:', error);
    throw error;
  }
}

// Generate presigned URL for temporary access
async function generatePresignedUrl(bucketName, key, expiresIn = 3600) {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
      Expires: expiresIn
    };

    const url = s3.getSignedUrl('getObject', params);
    console.log('Presigned URL generated:', url);
    return url;
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    throw error;
  }
}

// Delete object from S3
async function deleteObject(bucketName, key) {
  try {
    const params = {
      Bucket: bucketName,
      Key: key
    };

    await s3.deleteObject(params).promise();
    console.log('Object deleted successfully');
  } catch (error) {
    console.error('Error deleting object:', error);
    throw error;
  }
}

// Set up lifecycle policy for cost optimization
async function setLifecyclePolicy(bucketName) {
  try {
    const params = {
      Bucket: bucketName,
      LifecycleConfiguration: {
        Rules: [
          {
            ID: 'Move to IA after 30 days',
            Status: 'Enabled',
            Prefix: '',
            Transitions: [
              {
                Days: 30,
                StorageClass: 'STANDARD_IA'
              },
              {
                Days: 90,
                StorageClass: 'GLACIER'
              }
            ]
          },
          {
            ID: 'Delete old versions after 7 days',
            Status: 'Enabled',
            Prefix: '',
            NoncurrentVersionExpiration: {
              NoncurrentDays: 7
            }
          }
        ]
      }
    };

    await s3.putBucketLifecycleConfiguration(params).promise();
    console.log('Lifecycle policy set successfully');
  } catch (error) {
    console.error('Error setting lifecycle policy:', error);
    throw error;
  }
}

// Helper function to get content type
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.pdf': 'application/pdf',
    '.txt': 'text/plain',
    '.json': 'application/json',
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript'
  };

  return contentTypes[ext] || 'application/octet-stream';
}

module.exports = {
  uploadFile,
  downloadFile,
  listObjects,
  generatePresignedUrl,
  deleteObject,
  setLifecyclePolicy
};`
        },
        {
          title: "Google Cloud Storage Operations",
          language: "python",
          code: `from google.cloud import storage
from google.oauth2 import service_account
import os
from datetime import datetime, timedelta

class CloudStorageManager:
    def __init__(self, project_id, credentials_path=None):
        if credentials_path:
            credentials = service_account.Credentials.from_service_account_file(credentials_path)
            self.client = storage.Client(project=project_id, credentials=credentials)
        else:
            self.client = storage.Client(project=project_id)

    def create_bucket(self, bucket_name, location='US'):
        """Create a new bucket"""
        try:
            bucket = self.client.bucket(bucket_name)
            bucket.location = location
            bucket.storage_class = 'STANDARD'

            # Set lifecycle rules
            bucket.lifecycle_rules = [
                {
                    'action': {'type': 'SetStorageClass', 'storageClass': 'NEARLINE'},
                    'condition': {'age': 30}
                },
                {
                    'action': {'type': 'SetStorageClass', 'storageClass': 'COLDLINE'},
                    'condition': {'age': 90}
                },
                {
                    'action': {'type': 'Delete'},
                    'condition': {'age': 365}
                }
            ]

            bucket.create()
            print(f'Bucket {bucket_name} created successfully')
            return bucket
        except Exception as e:
            print(f'Error creating bucket: {e}')
            raise

    def upload_file(self, bucket_name, source_file_path, destination_blob_name):
        """Upload a file to the bucket"""
        try:
            bucket = self.client.bucket(bucket_name)
            blob = bucket.blob(destination_blob_name)

            # Set metadata
            blob.metadata = {
                'uploaded_at': datetime.utcnow().isoformat(),
                'source': 'cloud-storage-manager'
            }

            blob.upload_from_filename(source_file_path)

            # Make the blob publicly accessible (use with caution)
            # blob.make_public()

            print(f'File {source_file_path} uploaded to {destination_blob_name}')
            return blob
        except Exception as e:
            print(f'Error uploading file: {e}')
            raise

    def download_file(self, bucket_name, source_blob_name, destination_file_path):
        """Download a file from the bucket"""
        try:
            bucket = self.client.bucket(bucket_name)
            blob = bucket.blob(source_blob_name)

            blob.download_to_filename(destination_file_path)
            print(f'File {source_blob_name} downloaded to {destination_file_path}')
        except Exception as e:
            print(f'Error downloading file: {e}')
            raise

    def list_files(self, bucket_name, prefix=None):
        """List all files in the bucket"""
        try:
            bucket = self.client.bucket(bucket_name)
            blobs = bucket.list_blobs(prefix=prefix)

            files = []
            for blob in blobs:
                files.append({
                    'name': blob.name,
                    'size': blob.size,
                    'created': blob.time_created,
                    'updated': blob.updated,
                    'content_type': blob.content_type
                })

            return files
        except Exception as e:
            print(f'Error listing files: {e}')
            raise

    def generate_signed_url(self, bucket_name, blob_name, expiration_minutes=60):
        """Generate a signed URL for temporary access"""
        try:
            bucket = self.client.bucket(bucket_name)
            blob = bucket.blob(blob_name)

            expiration = datetime.utcnow() + timedelta(minutes=expiration_minutes)
            url = blob.generate_signed_url(expiration=expiration)

            print(f'Signed URL generated for {blob_name}')
            return url
        except Exception as e:
            print(f'Error generating signed URL: {e}')
            raise

    def delete_file(self, bucket_name, blob_name):
        """Delete a file from the bucket"""
        try:
            bucket = self.client.bucket(bucket_name)
            blob = bucket.blob(blob_name)

            blob.delete()
            print(f'File {blob_name} deleted successfully')
        except Exception as e:
            print(f'Error deleting file: {e}')
            raise

    def set_cors_policy(self, bucket_name):
        """Set CORS policy for the bucket"""
        try:
            bucket = self.client.bucket(bucket_name)

            cors = [
                {
                    'origin': ['*'],
                    'method': ['GET', 'POST', 'PUT', 'DELETE'],
                    'responseHeader': ['Content-Type'],
                    'maxAgeSeconds': 3600
                }
            ]

            bucket.cors = cors
            bucket.update()

            print(f'CORS policy set for bucket {bucket_name}')
        except Exception as e:
            print(f'Error setting CORS policy: {e}')
            raise

    def enable_versioning(self, bucket_name):
        """Enable versioning for the bucket"""
        try:
            bucket = self.client.bucket(bucket_name)
            bucket.versioning_enabled = True
            bucket.update()

            print(f'Versioning enabled for bucket {bucket_name}')
        except Exception as e:
            print(f'Error enabling versioning: {e}')
            raise

# Usage example
if __name__ == '__main__':
    # Initialize the manager
    manager = CloudStorageManager('your-project-id', 'credentials.json')

    # Create a bucket
    bucket = manager.create_bucket('my-unique-bucket-name')

    # Upload a file
    manager.upload_file('my-unique-bucket-name', 'local-file.txt', 'remote-file.txt')

    # List files
    files = manager.list_files('my-unique-bucket-name')
    for file in files:
        print(file)

    # Generate signed URL
    signed_url = manager.generate_signed_url('my-unique-bucket-name', 'remote-file.txt')
    print(f'Signed URL: {signed_url}')`
        },
        {
          title: "Azure Blob Storage Operations",
          language: "csharp",
          code: `using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Sas;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace CloudStorageManager
{
    public class BlobStorageManager
    {
        private readonly BlobServiceClient _blobServiceClient;

        public BlobStorageManager(string connectionString)
        {
            _blobServiceClient = new BlobServiceClient(connectionString);
        }

        public async Task CreateContainerAsync(string containerName)
        {
            try
            {
                var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);

                await containerClient.CreateIfNotExistsAsync(PublicAccessType.None);

                // Set metadata
                var metadata = new Dictionary<string, string>
                {
                    { "created", DateTime.UtcNow.ToString("o") },
                    { "purpose", "data-storage" }
                };

                await containerClient.SetMetadataAsync(metadata);

                Console.WriteLine($"Container '{containerName}' created successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating container: {ex.Message}");
                throw;
            }
        }

        public async Task UploadBlobAsync(string containerName, string localFilePath, string blobName)
        {
            try
            {
                var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
                var blobClient = containerClient.GetBlobClient(blobName);

                // Set blob properties
                var blobHttpHeaders = new BlobHttpHeaders
                {
                    ContentType = GetContentType(localFilePath)
                };

                // Set metadata
                var metadata = new Dictionary<string, string>
                {
                    { "uploaded_at", DateTime.UtcNow.ToString("o") },
                    { "original_filename", Path.GetFileName(localFilePath) }
                };

                using (var fileStream = File.OpenRead(localFilePath))
                {
                    await blobClient.UploadAsync(fileStream, new BlobUploadOptions
                    {
                        HttpHeaders = blobHttpHeaders,
                        Metadata = metadata,
                        AccessTier = AccessTier.Hot
                    });
                }

                Console.WriteLine($"File '{localFilePath}' uploaded as '{blobName}'");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error uploading blob: {ex.Message}");
                throw;
            }
        }

        public async Task DownloadBlobAsync(string containerName, string blobName, string downloadPath)
        {
            try
            {
                var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
                var blobClient = containerClient.GetBlobClient(blobName);

                using (var downloadStream = File.OpenWrite(downloadPath))
                {
                    var response = await blobClient.DownloadToAsync(downloadStream);
                    Console.WriteLine($"Blob '{blobName}' downloaded to '{downloadPath}'");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error downloading blob: {ex.Message}");
                throw;
            }
        }

        public async Task<List<BlobItem>> ListBlobsAsync(string containerName, string prefix = null)
        {
            try
            {
                var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
                var blobs = new List<BlobItem>();

                await foreach (var blobItem in containerClient.GetBlobsAsync(prefix: prefix))
                {
                    blobs.Add(blobItem);
                    Console.WriteLine($"Blob: {blobItem.Name}, Size: {blobItem.Properties.ContentLength}");
                }

                return blobs;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error listing blobs: {ex.Message}");
                throw;
            }
        }

        public async Task<string> GenerateSasUriAsync(string containerName, string blobName, int expirationMinutes = 60)
        {
            try
            {
                var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
                var blobClient = containerClient.GetBlobClient(blobName);

                var sasBuilder = new BlobSasBuilder
                {
                    BlobContainerName = containerName,
                    BlobName = blobName,
                    Resource = "b",
                    StartsOn = DateTimeOffset.UtcNow,
                    ExpiresOn = DateTimeOffset.UtcNow.AddMinutes(expirationMinutes)
                };

                sasBuilder.SetPermissions(BlobSasPermissions.Read);

                var sasToken = sasBuilder.ToSasQueryParameters(
                    new Azure.Storage.StorageSharedKeyCredential(
                        _blobServiceClient.AccountName,
                        Environment.GetEnvironmentVariable("AZURE_STORAGE_KEY"))).ToString();

                var sasUri = $"{blobClient.Uri}?{sasToken}";

                Console.WriteLine($"SAS URI generated for '{blobName}'");
                return sasUri;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error generating SAS URI: {ex.Message}");
                throw;
            }
        }

        public async Task DeleteBlobAsync(string containerName, string blobName)
        {
            try
            {
                var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
                var blobClient = containerClient.GetBlobClient(blobName);

                await blobClient.DeleteIfExistsAsync();
                Console.WriteLine($"Blob '{blobName}' deleted successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting blob: {ex.Message}");
                throw;
            }
        }

        public async Task SetBlobLifecycleAsync(string containerName)
        {
            try
            {
                var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);

                var lifecycleRules = new List<BlobLifecycleRule>
                {
                    new BlobLifecycleRule
                    {
                        Name = "MoveToCool",
                        Enabled = true,
                        Definition = new BlobLifecycleRuleDefinition
                        {
                            Filters = new BlobLifecycleRuleFilter
                            {
                                PrefixMatch = new List<string> { "" }
                            },
                            Actions = new BlobLifecycleRuleActions
                            {
                                BaseBlob = new BlobLifecycleRuleBaseBlob
                                {
                                    TierToCool = new DateAfterModification
                                    {
                                        DaysAfterModificationGreaterThan = 30
                                    },
                                    TierToArchive = new DateAfterModification
                                    {
                                        DaysAfterModificationGreaterThan = 90
                                    },
                                    Delete = new DateAfterModification
                                    {
                                        DaysAfterModificationGreaterThan = 365
                                    }
                                }
                            }
                        }
                    }
                };

                // Note: Azure SDK doesn't directly support lifecycle management via API
                // This would typically be done via Azure Resource Manager or CLI
                Console.WriteLine("Lifecycle rules should be configured via Azure Portal or CLI");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error setting lifecycle: {ex.Message}");
                throw;
            }
        }

        private string GetContentType(string filePath)
        {
            var extension = Path.GetExtension(filePath).ToLowerCase();
            return extension switch
            {
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".gif" => "image/gif",
                ".pdf" => "application/pdf",
                ".txt" => "text/plain",
                ".json" => "application/json",
                ".html" => "text/html",
                ".css" => "text/css",
                ".js" => "application/javascript",
                _ => "application/octet-stream"
            };
        }
    }
}`
        }
      ]
    },
    {
      title: "Infrastructure as Code and Deployment",
      content: "Infrastructure as Code (IaC) enables you to manage and provision cloud infrastructure using declarative configuration files. This approach provides version control, repeatability, and automated deployment capabilities.\n\n**IaC Tools**:\n- **Terraform**: Multi-cloud infrastructure provisioning\n- **AWS CloudFormation**: AWS-specific infrastructure management\n- **Azure Resource Manager**: Azure infrastructure templates\n- **Google Cloud Deployment Manager**: GCP infrastructure management\n\n**Benefits of IaC**:\n- **Version Control**: Track infrastructure changes like code\n- **Consistency**: Ensure identical environments across stages\n- **Scalability**: Easily replicate and scale infrastructure\n- **Collaboration**: Team members can work on infrastructure changes\n- **Automation**: Integrate with CI/CD pipelines\n\n**Deployment Strategies**:\n- **Blue-Green**: Maintain two identical environments\n- **Canary**: Gradually roll out changes to subset of users\n- **Rolling**: Update instances incrementally\n- **Immutable**: Replace entire infrastructure instead of modifying\n\n**Configuration Management**: Use tools like Ansible, Puppet, or Chef for software configuration on provisioned infrastructure.\n\n**State Management**: Track infrastructure state to detect drift and ensure consistency between desired and actual configurations.\n\n**Security in IaC**: Implement least privilege, encrypt sensitive data, and use secure credential management.",
      keyTopics: [
        "Infrastructure as Code principles",
        "IaC tools and frameworks",
        "Deployment strategies and patterns",
        "Configuration management",
        "State management and drift detection"
      ],
      practicalExercises: [
        "Create infrastructure templates with Terraform for multi-cloud deployments",
        "Implement automated deployment pipelines with CI/CD integration",
        "Set up blue-green deployment strategy for zero-downtime updates",
        "Configure monitoring and alerting for infrastructure changes",
        "Implement security best practices in IaC templates",
        "Manage infrastructure state and handle configuration drift"
      ],
      codeExamples: [
        {
          title: "Terraform Multi-Cloud Infrastructure",
          language: "hcl",
          code: `# main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }

  backend "s3" {
    bucket = "my-terraform-state"
    key    = "infrastructure/terraform.tfstate"
    region = "us-east-1"
  }
}

# AWS Provider
provider "aws" {
  region = var.aws_region
}

# Google Cloud Provider
provider "google" {
  project = var.gcp_project
  region  = var.gcp_region
}

# Azure Provider
provider "azurerm" {
  features {}
}

# Variables
variable "aws_region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "gcp_project" {
  description = "GCP project ID"
  type        = string
}

variable "gcp_region" {
  description = "GCP region"
  default     = "us-central1"
}

variable "environment" {
  description = "Environment name"
  default     = "dev"
}

# AWS Resources
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "\${var.environment}-vpc"
    Environment = var.environment
  }
}

resource "aws_subnet" "public" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.\${count.index + 1}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name        = "\${var.environment}-public-subnet-\${count.index + 1}"
    Environment = var.environment
  }
}

resource "aws_security_group" "web" {
  name_prefix = "\${var.environment}-web-sg"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "\${var.environment}-web-sg"
    Environment = var.environment
  }
}

resource "aws_instance" "web" {
  count         = 2
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
  subnet_id     = aws_subnet.public[count.index].id
  vpc_security_group_ids = [aws_security_group.web.id]

  user_data = <<-EOF
              #!/bin/bash
              apt-get update
              apt-get install -y nginx
              systemctl start nginx
              systemctl enable nginx
              EOF

  tags = {
    Name        = "\${var.environment}-web-server-\${count.index + 1}"
    Environment = var.environment
  }
}

# Google Cloud Resources
resource "google_compute_network" "vpc" {
  name                    = "\${var.environment}-vpc"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "subnet" {
  name          = "\${var.environment}-subnet"
  ip_cidr_range = "10.1.0.0/24"
  region        = var.gcp_region
  network       = google_compute_network.vpc.id
}

resource "google_compute_instance" "web" {
  count        = 2
  name         = "\${var.environment}-web-\${count.index + 1}"
  machine_type = "e2-micro"
  zone         = "\${var.gcp_region}-a"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    subnetwork = google_compute_subnetwork.subnet.id

    access_config {
      // Ephemeral public IP
    }
  }

  metadata_startup_script = <<-EOF
                            #!/bin/bash
                            apt-get update
                            apt-get install -y nginx
                            systemctl start nginx
                            systemctl enable nginx
                            EOF

  tags = ["web-server"]
}

# Azure Resources
resource "azurerm_resource_group" "main" {
  name     = "\${var.environment}-rg"
  location = "East US"
}

resource "azurerm_virtual_network" "main" {
  name                = "\${var.environment}-vnet"
  address_space       = ["10.2.0.0/16"]
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
}

resource "azurerm_subnet" "internal" {
  name                 = "internal"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.2.1.0/24"]
}

resource "azurerm_linux_virtual_machine" "web" {
  count               = 2
  name                = "\${var.environment}-web-\${count.index + 1}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  size                = "Standard_B1s"
  admin_username      = "adminuser"

  network_interface_ids = [
    azurerm_network_interface.main[count.index].id,
  ]

  admin_ssh_key {
    username   = "adminuser"
    public_key = file("~/.ssh/id_rsa.pub")
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "18.04-LTS"
    version   = "latest"
  }

  custom_data = base64encode(<<-EOF
                #!/bin/bash
                apt-get update
                apt-get install -y nginx
                systemctl start nginx
                systemctl enable nginx
                EOF
  )
}

# Data sources
data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

# Outputs
output "aws_web_server_ips" {
  description = "Public IPs of AWS web servers"
  value       = aws_instance.web[*].public_ip
}

output "gcp_web_server_ips" {
  description = "Public IPs of GCP web servers"
  value       = google_compute_instance.web[*].network_interface[0].access_config[0].nat_ip
}

output "azure_web_server_ids" {
  description = "IDs of Azure web servers"
  value       = azurerm_linux_virtual_machine.web[*].id
}`
        },
        {
          title: "AWS CloudFormation Template",
          language: "yaml",
          code: `AWSTemplateFormatVersion: '2010-09-09'
Description: 'Multi-tier web application infrastructure'

Parameters:
  EnvironmentName:
    Type: String
    Default: dev
    AllowedValues:
      - dev
      - staging
      - prod
    Description: Environment name

  InstanceType:
    Type: String
    Default: t3.micro
    AllowedValues:
      - t3.micro
      - t3.small
      - t3.medium
    Description: EC2 instance type

  KeyName:
    Type: AWS::EC2::KeyPair::KeyName
    Description: Name of an existing EC2 KeyPair

Resources:
  # VPC and Networking
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsHostnames: true
      EnableDnsSupport: true
      Tags:
        - Key: Name
          Value: !Sub \${EnvironmentName}-vpc
        - Key: Environment
          Value: !Ref EnvironmentName

  InternetGateway:
    Type: AWS::EC2::InternetGateway
    Properties:
      Tags:
        - Key: Name
          Value: !Sub \${EnvironmentName}-igw

  VPCGatewayAttachment:
    Type: AWS::EC2::VPCGatewayAttachment
    Properties:
      VpcId: !Ref VPC
      InternetGatewayId: !Ref InternetGateway

  PublicSubnet:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.1.0/24
      AvailabilityZone: !Select [0, !GetAZs '']
      MapPublicIpOnLaunch: true
      Tags:
        - Key: Name
          Value: !Sub \${EnvironmentName}-public-subnet

  PublicRouteTable:
    Type: AWS::EC2::RouteTable
    Properties:
      VpcId: !Ref VPC
      Tags:
        - Key: Name
          Value: !Sub \${EnvironmentName}-public-rt

  PublicRoute:
    Type: AWS::EC2::Route
    Properties:
      RouteTableId: !Ref PublicRouteTable
      DestinationCidrBlock: 0.0.0.0/0
      GatewayId: !Ref InternetGateway

  PublicSubnetRouteTableAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref PublicSubnet
      RouteTableId: !Ref PublicRouteTable

  # Security Groups
  WebSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable HTTP and SSH access
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0
        - IpProtocol: tcp
          FromPort: 443
          ToPort: 443
          CidrIp: 0.0.0.0/0
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: 0.0.0.0/0
      Tags:
        - Key: Name
          Value: !Sub \${EnvironmentName}-web-sg

  # EC2 Instance
  WebInstance:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: !Ref InstanceType
      KeyName: !Ref KeyName
      ImageId: ami-0c55b159cbfafe1d0  # Amazon Linux 2
      NetworkInterfaces:
        - DeviceIndex: 0
          SubnetId: !Ref PublicSubnet
          GroupSet:
            - !Ref WebSecurityGroup
          AssociatePublicIpAddress: true
      UserData:
        Fn::Base64: |
          #!/bin/bash
          yum update -y
          yum install -y httpd
          systemctl start httpd
          systemctl enable httpd
          echo "<h1>Hello from \${EnvironmentName} environment</h1>" > /var/www/html/index.html
      Tags:
        - Key: Name
          Value: !Sub \${EnvironmentName}-web-server

  # S3 Bucket
  S3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub \${EnvironmentName}-my-app-bucket-\${AWS::AccountId}
      VersioningConfiguration:
        Status: Enabled
      PublicAccessBlockConfiguration:
        BlockPublicAcls: true
        BlockPublicPolicy: true
        IgnorePublicAcls: true
        RestrictPublicBuckets: true
      LifecycleConfiguration:
        Rules:
          - Id: MoveToIA
            Status: Enabled
            Transitions:
              - StorageClass: STANDARD_IA
                TransitionInDays: 30
              - StorageClass: GLACIER
                TransitionInDays: 90
            ExpirationInDays: 365

  # RDS Database
  DBSubnetGroup:
    Type: AWS::RDS::DBSubnetGroup
    Properties:
      DBSubnetGroupDescription: Subnet group for RDS
      SubnetIds:
        - !Ref PublicSubnet
      Tags:
        - Key: Name
          Value: !Sub \${EnvironmentName}-db-subnet-group

  DBInstance:
    Type: AWS::RDS::DBInstance
    Properties:
      DBInstanceClass: db.t3.micro
      Engine: mysql
      EngineVersion: '8.0'
      MasterUsername: admin
      MasterUserPassword: !Ref DBPassword
      AllocatedStorage: '20'
      DBSubnetGroupName: !Ref DBSubnetGroup
      VPCSecurityGroups:
        - !Ref WebSecurityGroup
      PubliclyAccessible: true
      BackupRetentionPeriod: 7
      MultiAZ: false
      Tags:
        - Key: Name
          Value: !Sub \${EnvironmentName}-database

  # CloudWatch Alarms
  HighCPUAlarm:
    Type: AWS::CloudWatch::Alarm
    Properties:
      AlarmName: !Sub \${EnvironmentName}-high-cpu
      AlarmDescription: CPU utilization is high
      MetricName: CPUUtilization
      Namespace: AWS/EC2
      Statistic: Average
      Period: 300
      EvaluationPeriods: 2
      Threshold: 80
      ComparisonOperator: GreaterThanThreshold
      Dimensions:
        - Name: InstanceId
          Value: !Ref WebInstance

Outputs:
  WebsiteURL:
    Description: URL of the website
    Value: !Sub http://\${WebInstance.PublicIp}
    Export:
      Name: !Sub \${EnvironmentName}-website-url

  S3BucketName:
    Description: Name of the S3 bucket
    Value: !Ref S3Bucket
    Export:
      Name: !Sub \${EnvironmentName}-s3-bucket

  DatabaseEndpoint:
    Description: Database endpoint
    Value: !GetAtt DBInstance.Endpoint.Address
    Export:
      Name: !Sub \${EnvironmentName}-db-endpoint`
        },
        {
          title: "CI/CD Pipeline with Cloud Deployment",
          language: "yaml",
          code: `# .github/workflows/deploy.yml
name: Deploy to Cloud

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

env:
  AWS_REGION: us-east-1
  GCP_PROJECT: my-gcp-project
  AZURE_LOCATION: eastus

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build application
        run: npm run build

  deploy-aws:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: \${{ env.AWS_REGION }}

      - name: Deploy to AWS
        run: |
          # Update CloudFormation stack
          aws cloudformation deploy \\
            --template-file infrastructure/aws-template.yml \\
            --stack-name my-app-stack \\
            --parameter-overrides EnvironmentName=prod \\
            --capabilities CAPABILITY_IAM

  deploy-gcp:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3

      - name: Authenticate to Google Cloud
        uses: google-github-actions/auth@v1
        with:
          credentials_json: \${{ secrets.GCP_SA_KEY }}

      - name: Set up Cloud SDK
        uses: google-github-actions/setup-gcloud@v1

      - name: Deploy to GCP
        run: |
          # Deploy using gcloud
          gcloud app deploy app.yaml --quiet

  deploy-azure:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3

      - name: Login to Azure
        uses: azure/login@v1
        with:
          creds: \${{ secrets.AZURE_CREDENTIALS }}

      - name: Deploy to Azure
        uses: azure/arm-deploy@v1
        with:
          subscriptionId: \${{ secrets.AZURE_SUBSCRIPTION }}
          resourceGroupName: my-resource-group
          template: infrastructure/azure-template.json
          parameters: environment=prod`
        }
      ]
    },
    {
      title: "Cost Optimization and Monitoring",
      content: "Cloud cost optimization involves monitoring usage, implementing cost controls, and using resources efficiently. Effective monitoring ensures application performance and helps identify cost-saving opportunities.\n\n**Cost Optimization Strategies**:\n- **Right-sizing**: Match instance types to actual workload requirements\n- **Reserved Instances**: Commit to longer terms for significant discounts\n- **Spot Instances**: Use spare capacity for non-critical workloads\n- **Auto Scaling**: Automatically adjust capacity based on demand\n- **Storage Optimization**: Use appropriate storage classes and lifecycle policies\n\n**Monitoring and Observability**:\n- **Metrics**: CPU, memory, disk, network utilization\n- **Logs**: Application and system logs for troubleshooting\n- **Traces**: Request tracing for performance analysis\n- **Alerts**: Automated notifications for issues and anomalies\n\n**Cost Monitoring Tools**:\n- **AWS Cost Explorer**: Analyze and forecast costs\n- **Google Cloud Billing**: Cost monitoring and budgeting\n- **Azure Cost Management**: Cost analysis and optimization\n\n**Performance Optimization**:\n- **Caching**: Use CDN, in-memory caches, and database query optimization\n- **Load Balancing**: Distribute traffic efficiently\n- **Database Optimization**: Indexing, query optimization, and connection pooling\n- **Resource Optimization**: Use serverless when appropriate\n\n**Budgeting and Governance**: Set budgets, implement cost controls, and establish governance policies for cloud spending.",
      keyTopics: [
        "Cloud cost optimization strategies",
        "Resource monitoring and alerting",
        "Performance optimization techniques",
        "Budgeting and cost governance",
        "Cloud financial management"
      ],
      practicalExercises: [
        "Set up comprehensive monitoring and alerting for cloud applications",
        "Implement auto-scaling policies for cost and performance optimization",
        "Configure budget alerts and cost anomaly detection",
        "Optimize storage costs with lifecycle policies and data tiering",
        "Analyze and forecast cloud costs using native tools",
        "Implement resource tagging and cost allocation strategies"
      ],
      codeExamples: [
        {
          title: "AWS Cost Optimization with Lambda",
          language: "javascript",
          code: `const AWS = require('aws-sdk');

// Initialize AWS services
const ec2 = new AWS.EC2();
const cloudwatch = new AWS.CloudWatch();
const costExplorer = new AWS.CostExplorer();

class CloudCostOptimizer {
  constructor() {
    this.costExplorer = new AWS.CostExplorer();
    this.cloudwatch = new AWS.CloudWatch();
  }

  // Get cost and usage data
  async getCostAndUsage(startDate, endDate, granularity = 'DAILY') {
    try {
      const params = {
        TimePeriod: {
          Start: startDate,
          End: endDate
        },
        Granularity: granularity,
        Metrics: ['BlendedCost', 'UsageQuantity'],
        GroupBy: [
          {
            Type: 'DIMENSION',
            Key: 'SERVICE'
          }
        ]
      };

      const result = await this.costExplorer.getCostAndUsage(params).promise();

      console.log('Cost and Usage Data:');
      result.ResultsByTime.forEach(period => {
        console.log(\`Period: \${period.TimePeriod.Start} to \${period.TimePeriod.End}\`);
        period.Groups.forEach(group => {
          const service = group.Keys[0];
          const cost = group.Metrics.BlendedCost.Amount;
          const unit = group.Metrics.BlendedCost.Unit;
          console.log(\`  \${service}: \$\${cost} \${unit}\`);
        });
      });

      return result;
    } catch (error) {
      console.error('Error getting cost data:', error);
      throw error;
    }
  }

  // Identify underutilized EC2 instances
  async findUnderutilizedInstances() {
    try {
      // Get all running instances
      const instances = await ec2.describeInstances({
        Filters: [
          {
            Name: 'instance-state-name',
            Values: ['running']
          }
        ]
      }).promise();

      const underutilized = [];

      for (const reservation of instances.Reservations) {
        for (const instance of reservation.Instances) {
          const instanceId = instance.InstanceId;

          // Check CPU utilization for the last 7 days
          const cpuParams = {
            Namespace: 'AWS/EC2',
            MetricName: 'CPUUtilization',
            Dimensions: [
              {
                Name: 'InstanceId',
                Value: instanceId
              }
            ],
            StartTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            EndTime: new Date(),
            Statistics: ['Average'],
            Period: 3600 // 1 hour
          };

          const cpuData = await cloudwatch.getMetricStatistics(cpuParams).promise();

          if (cpuData.Datapoints.length > 0) {
            const avgCpu = cpuData.Datapoints.reduce((sum, point) => sum + point.Average, 0) / cpuData.Datapoints.length;

            if (avgCpu < 20) { // Less than 20% average CPU
              underutilized.push({
                instanceId,
                instanceType: instance.InstanceType,
                averageCpu: avgCpu.toFixed(2),
                launchTime: instance.LaunchTime
              });
            }
          }
        }
      }

      console.log('Underutilized Instances:');
      underutilized.forEach(instance => {
        console.log(\`Instance \${instance.instanceId} (\${instance.instanceType}): \${instance.averageCpu}% avg CPU\`);
      });

      return underutilized;
    } catch (error) {
      console.error('Error finding underutilized instances:', error);
      throw error;
    }
  }

  // Set up cost allocation tags
  async setupCostAllocationTags() {
    try {
      const tags = [
        {
          Key: 'Environment',
          Values: ['dev', 'staging', 'prod']
        },
        {
          Key: 'Project',
          Values: ['web-app', 'api', 'database']
        },
        {
          Key: 'Owner',
          Values: ['team-a', 'team-b', 'team-c']
        }
      ];

      // Note: Cost allocation tags are typically set via AWS Console or CLI
      // This is a conceptual example
      console.log('Cost allocation tags should be configured via AWS Console or CLI');
      console.log('Recommended tags:', JSON.stringify(tags, null, 2));

      return tags;
    } catch (error) {
      console.error('Error setting up cost allocation tags:', error);
      throw error;
    }
  }

  // Create budget and alerts
  async createBudget(budgetName, budgetAmount, emailNotifications) {
    try {
      const budgets = new AWS.Budgets();

      const params = {
        Budget: {
          BudgetName: budgetName,
          BudgetLimit: {
            Amount: budgetAmount.toString(),
            Unit: 'USD'
          },
          TimeUnit: 'MONTHLY',
          BudgetType: 'COST'
        },
        NotificationsWithSubscribers: [
          {
            Notification: {
              NotificationType: 'ACTUAL',
              ComparisonOperator: 'GREATER_THAN',
              Threshold: 80,
              ThresholdType: 'PERCENTAGE'
            },
            Subscribers: emailNotifications.map(email => ({
              SubscriptionType: 'EMAIL',
              Address: email
            }))
          }
        ]
      };

      await budgets.createBudget(params).promise();
      console.log(\`Budget '\${budgetName}' created with limit of $\${budgetAmount}\`);

      return params;
    } catch (error) {
      console.error('Error creating budget:', error);
      throw error;
    }
  }

  // Generate cost optimization recommendations
  async generateOptimizationRecommendations() {
    try {
      const recommendations = [];

      // Check for underutilized instances
      const underutilized = await this.findUnderutilizedInstances();
      if (underutilized.length > 0) {
        recommendations.push({
          type: 'UNDERUTILIZED_INSTANCES',
          description: 'Consider downsizing or stopping underutilized EC2 instances',
          instances: underutilized,
          potentialSavings: 'Up to 50% cost reduction'
        });
      }

      // Check for unattached EBS volumes
      const ebsParams = {
        Filters: [
          {
            Name: 'status',
            Values: ['available']
          }
        ]
      };

      const ebsVolumes = await new AWS.EC2().describeVolumes(ebsParams).promise();
      if (ebsVolumes.Volumes.length > 0) {
        recommendations.push({
          type: 'UNATTACHED_VOLUMES',
          description: 'Delete or attach unused EBS volumes',
          volumes: ebsVolumes.Volumes.map(v => v.VolumeId),
          potentialSavings: 'EBS storage costs'
        });
      }

      // Check for unused load balancers
      const elbParams = {
        LoadBalancerArns: []
      };

      const elbs = await new AWS.ELBv2().describeLoadBalancers(elbParams).promise();
      // Additional logic would be needed to check if ELBs are actually in use

      console.log('Optimization Recommendations:');
      recommendations.forEach((rec, index) => {
        console.log(\`\${index + 1}. \${rec.type}: \${rec.description}\`);
        console.log(\`   Potential Savings: \${rec.potentialSavings}\`);
      });

      return recommendations;
    } catch (error) {
      console.error('Error generating recommendations:', error);
      throw error;
    }
  }
}

// Usage example
async function main() {
  const optimizer = new CloudCostOptimizer();

  try {
    // Get cost data for last 30 days
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);

    await optimizer.getCostAndUsage(
      startDate.toISOString().split('T')[0],
      endDate.toISOString().split('T')[0]
    );

    // Find underutilized instances
    await optimizer.findUnderutilizedInstances();

    // Generate optimization recommendations
    await optimizer.generateOptimizationRecommendations();

    // Create a budget
    await optimizer.createBudget('monthly-budget', 1000, ['admin@example.com']);

  } catch (error) {
    console.error('Optimization process failed:', error);
  }
}

module.exports = CloudCostOptimizer;

// Uncomment to run directly
// main();`
        },
        {
          title: "Google Cloud Cost Monitoring",
          language: "python",
          code: `from google.cloud import billing_v1, monitoring_v3
from google.oauth2 import service_account
import datetime
import json

class GoogleCloudCostOptimizer:
    def __init__(self, project_id, credentials_path=None):
        if credentials_path:
            self.credentials = service_account.Credentials.from_service_account_file(credentials_path)
        else:
            self.credentials = None

        self.project_id = project_id
        self.billing_client = billing_v1.CloudBillingClient(credentials=self.credentials)
        self.monitoring_client = monitoring_v3.MetricServiceClient(credentials=self.credentials)

    def get_cost_data(self, start_date, end_date):
        """Get cost data for the specified period"""
        try:
            # Note: This is a simplified example
            # Actual cost data retrieval would require BigQuery integration
            print(f"Retrieving cost data from {start_date} to {end_date}")

            # In a real implementation, you would query BigQuery billing export
            # SELECT * FROM \`project.billing_dataset.gcp_billing_export\` WHERE date BETWEEN start_date AND end_date

            cost_data = {
                'total_cost': 1250.50,
                'services': {
                    'Compute Engine': 450.25,
                    'Cloud Storage': 125.75,
                    'BigQuery': 89.30,
                    'Cloud Functions': 45.20
                },
                'period': f"{start_date} to {end_date}"
            }

            print(f"Total cost: \${cost_data['total_cost']}")
            print("Cost by service:")
            for service, cost in cost_data['services'].items():
                print(f"  {service}: \${cost}")

            return cost_data

        except Exception as e:
            print(f"Error retrieving cost data: {e}")
            raise

    def monitor_resource_utilization(self, days=7):
        """Monitor resource utilization for optimization opportunities"""
        try:
            end_time = datetime.datetime.utcnow()
            start_time = end_time - datetime.timedelta(days=days)

            # CPU utilization query
            cpu_query = f"""
            fetch gce_instance
            | metric 'compute.googleapis.com/instance/cpu/utilization'
            | filter (resource.project_id == '{self.project_id}')
            | group_by 1d, [value_utilization_mean: mean(value.utilization)]
            | every 1d
            | group_by [resource.instance_name],
                [value_utilization_mean_aggregate: aggregate(value_utilization_mean)]
            """

            # Memory utilization query
            memory_query = f"""
            fetch gce_instance
            | metric 'compute.googleapis.com/instance/memory/balloon/ram_used'
            | filter (resource.project_id == '{self.project_id}')
            | group_by 1d, [value_ram_used_mean: mean(value.ram_used)]
            | every 1d
            | group_by [resource.instance_name],
                [value_ram_used_mean_aggregate: aggregate(value_ram_used_mean)]
            """

            print(f"Analyzing resource utilization for the last {days} days...")

            # In a real implementation, you would execute these queries
            # and analyze the results for optimization opportunities

            optimization_opportunities = [
                {
                    'resource': 'instance-1',
                    'type': 'UNDERUTILIZED',
                    'avg_cpu': 15.2,
                    'avg_memory': 25.8,
                    'recommendation': 'Consider downsizing to e2-micro'
                },
                {
                    'resource': 'instance-2',
                    'type': 'OVERPROVISIONED',
                    'avg_cpu': 85.5,
                    'avg_memory': 92.1,
                    'recommendation': 'Consider upgrading instance type'
                }
            ]

            print("Optimization Opportunities:")
            for opp in optimization_opportunities:
                print(f"  {opp['resource']}: {opp['recommendation']}")
                print(f"    CPU: {opp['avg_cpu']}%, Memory: {opp['avg_memory']}%")

            return optimization_opportunities

        except Exception as e:
            print(f"Error monitoring resources: {e}")
            raise

    def setup_budget_alerts(self, budget_amount, alert_thresholds=[50, 75, 90]):
        """Set up budget alerts"""
        try:
            print(f"Setting up budget alerts for \${budget_amount}")

            # In a real implementation, you would use the Cloud Billing API
            # to create budget alerts programmatically

            alerts = []
            for threshold in alert_thresholds:
                alert = {
                    'threshold': threshold,
                    'amount': budget_amount * threshold / 100,
                    'notification_channels': ['email', 'slack']
                }
                alerts.append(alert)
                print(f"  Alert at {threshold}%: \${alert['amount']}")

            return alerts

        except Exception as e:
            print(f"Error setting up budget alerts: {e}")
            raise

    def optimize_storage_costs(self):
        """Analyze and optimize storage costs"""
        try:
            print("Analyzing storage costs and optimization opportunities...")

            # In a real implementation, you would query storage usage
            # and analyze access patterns

            storage_analysis = {
                'total_storage': '500 GB',
                'monthly_cost': 45.50,
                'recommendations': [
                    {
                        'bucket': 'old-data-bucket',
                        'size': '200 GB',
                        'last_accessed': '6 months ago',
                        'recommendation': 'Move to Coldline storage',
                        'potential_savings': '$15/month'
                    },
                    {
                        'bucket': 'temp-files-bucket',
                        'size': '50 GB',
                        'recommendation': 'Implement lifecycle policy',
                        'potential_savings': '$8/month'
                    }
                ]
            }

            print(f"Total storage: \{storage_analysis['total_storage']}")
            print(f"Monthly cost: \${storage_analysis['monthly_cost']}")
            print("Optimization recommendations:")
            for rec in storage_analysis['recommendations']:
                print(f"  \{rec['bucket']}: \{rec['recommendation']}")
                print(f"    Potential savings: \{rec['potential_savings']}")

            return storage_analysis

        except Exception as e:
            print(f"Error optimizing storage costs: {e}")
            raise

    def create_cost_allocation_tags(self):
        """Set up cost allocation tags"""
        try:
            recommended_tags = {
                'environment': ['development', 'staging', 'production'],
                'team': ['frontend', 'backend', 'devops'],
                'project': ['web-app', 'mobile-app', 'api'],
                'cost-center': ['engineering', 'marketing', 'sales']
            }

            print("Recommended cost allocation tags:")
            for tag_key, tag_values in recommended_tags.items():
                print(f"  {tag_key}: {', '.join(tag_values)}")

            # In a real implementation, you would apply these tags
            # to resources using the Resource Manager API

            return recommended_tags

        except Exception as e:
            print(f"Error creating cost allocation tags: {e}")
            raise

# Usage example
def main():
    optimizer = GoogleCloudCostOptimizer('my-gcp-project', 'credentials.json')

    try:
        # Get cost data
        cost_data = optimizer.get_cost_data('2024-01-01', '2024-01-31')

        # Monitor resource utilization
        optimization_opps = optimizer.monitor_resource_utilization(days=7)

        # Set up budget alerts
        alerts = optimizer.setup_budget_alerts(1000)

        # Optimize storage costs
        storage_analysis = optimizer.optimize_storage_costs()

        # Create cost allocation tags
        tags = optimizer.create_cost_allocation_tags()

    except Exception as e:
        print(f"Cost optimization process failed: {e}")

if __name__ == '__main__':
    main()`
        },
        {
          title: "Azure Cost Management",
          language: "powershell",
          code: `# Azure Cost Optimization Script
param(
    [string]$SubscriptionId,
    [string]$ResourceGroupName = "cost-optimization-rg",
    [int]$BudgetAmount = 1000,
    [array]$AlertThresholds = @(50, 75, 90)
)

# Connect to Azure
Connect-AzAccount
Set-AzContext -SubscriptionId $SubscriptionId

class AzureCostOptimizer {
    [string]$SubscriptionId
    [string]$ResourceGroupName

    AzureCostOptimizer([string]$subId, [string]$rgName) {
        $this.SubscriptionId = $subId
        $this.ResourceGroupName = $rgName
    }

    [object] GetCostData([DateTime]$startDate, [DateTime]$endDate) {
        try {
            Write-Host "Retrieving cost data from $($startDate.ToString('yyyy-MM-dd')) to $($endDate.ToString('yyyy-MM-dd'))"

            $costData = Get-AzConsumptionUsageDetail -StartDate $startDate -EndDate $endDate

            $totalCost = ($costData | Measure-Object -Property PretaxCost -Sum).Sum

            $costByService = $costData | Group-Object -Property ConsumedService | ForEach-Object {
                [PSCustomObject]@{
                    Service = $_.Name
                    Cost = ($_.Group | Measure-Object -Property PretaxCost -Sum).Sum
                }
            } | Sort-Object -Property Cost -Descending

            $result = [PSCustomObject]@{
                TotalCost = $totalCost
                CostByService = $costByService
                Period = "$($startDate.ToString('yyyy-MM-dd')) to $($endDate.ToString('yyyy-MM-dd'))"
            }

            Write-Host "Total cost: $($result.TotalCost.ToString('C2'))"
            Write-Host "Cost by service:"
            $result.CostByService | ForEach-Object {
                Write-Host "  $($_.Service): $($_.Cost.ToString('C2'))"
            }

            return $result
        }
        catch {
            Write-Error "Error retrieving cost data: $($_.Exception.Message)"
            throw
        }
    }

    [array] FindUnderutilizedVMs() {
        try {
            Write-Host "Finding underutilized virtual machines..."

            $vms = Get-AzVM
            $underutilizedVMs = @()

            foreach ($vm in $vms) {
                $vmName = $vm.Name
                $resourceGroup = $vm.ResourceGroupName

                # Get CPU metrics for the last 7 days
                $cpuMetrics = Get-AzMetric -ResourceId $vm.Id -MetricName "Percentage CPU" -TimeGrain 01:00:00 -StartTime (Get-Date).AddDays(-7)

                if ($cpuMetrics.Data.Count -gt 0) {
                    $avgCpu = ($cpuMetrics.Data | Measure-Object -Property Average -Average).Average

                    if ($avgCpu -lt 20) {
                        $underutilizedVM = [PSCustomObject]@{
                            VMName = $vmName
                            ResourceGroup = $resourceGroup
                            VMSize = $vm.HardwareProfile.VmSize
                            AverageCPU = [math]::Round($avgCpu, 2)
                            Recommendation = "Consider downsizing or deallocating"
                        }
                        $underutilizedVMs += $underutilizedVM
                    }
                }
            }

            Write-Host "Underutilized VMs found: $($underutilizedVMs.Count)"
            $underutilizedVMs | ForEach-Object {
                Write-Host "  $($_.VMName) ($($_.VMSize)): $($_.AverageCPU)% avg CPU"
            }

            return $underutilizedVMs
        }
        catch {
            Write-Error "Error finding underutilized VMs: $($_.Exception.Message)"
            throw
        }
    }

    [void] CreateBudget([int]$budgetAmount, [array]$alertThresholds) {
        try {
            Write-Host "Creating budget of $($budgetAmount.ToString('C0'))"

            $budgetParams = @{
                Name = "monthly-budget"
                Amount = $budgetAmount
                Category = "Cost"
                TimeGrain = "Monthly"
                StartDate = Get-Date
                EndDate = (Get-Date).AddMonths(12)
            }

            $budget = New-AzConsumptionBudget @budgetParams

            # Create alerts
            foreach ($threshold in $alertThresholds) {
                $alertAmount = $budgetAmount * $threshold / 100

                $alertParams = @{
                    BudgetObject = $budget
                    Name = "budget-alert-$threshold-percent"
                    Threshold = $threshold
                    Operator = "GreaterThan"
                    NotificationEmail = "admin@example.com"
                    ContactGroup = "/subscriptions/$($this.SubscriptionId)/resourceGroups/$($this.ResourceGroupName)/providers/microsoft.insights/actionGroups/cost-alerts"
                }

                New-AzConsumptionBudgetAlert @alertParams
                Write-Host "  Alert created at $($threshold)% threshold: $($alertAmount.ToString('C0'))"
            }

            Write-Host "Budget and alerts created successfully"
        }
        catch {
            Write-Error "Error creating budget: $($_.Exception.Message)"
            throw
        }
    }

    [array] GenerateOptimizationRecommendations() {
        try {
            $recommendations = @()

            # Check for underutilized VMs
            $underutilizedVMs = $this.FindUnderutilizedVMs()
            if ($underutilizedVMs.Count -gt 0) {
                $recommendations += [PSCustomObject]@{
                    Type = "UNDERUTILIZED_VMS"
                    Description = "Consider downsizing or stopping underutilized VMs"
                    Resources = $underutilizedVMs
                    PotentialSavings = "Up to 50% cost reduction"
                }
            }

            # Check for unattached disks
            $unattachedDisks = Get-AzDisk | Where-Object { $_.DiskState -eq "Unattached" }
            if ($unattachedDisks.Count -gt 0) {
                $recommendations += [PSCustomObject]@{
                    Type = "UNATTACHED_DISKS"
                    Description = "Delete or attach unused managed disks"
                    Resources = $unattachedDisks.Name
                    PotentialSavings = "Disk storage costs"
                }
            }

            # Check for unused public IPs
            $unusedPublicIPs = Get-AzPublicIpAddress | Where-Object { $null -eq $_.IpConfiguration }
            if ($unusedPublicIPs.Count -gt 0) {
                $recommendations += [PSCustomObject]@{
                    Type = "UNUSED_PUBLIC_IPS"
                    Description = "Delete unused public IP addresses"
                    Resources = $unusedPublicIPs.Name
                    PotentialSavings = "Public IP costs"
                }
            }

            Write-Host "Optimization Recommendations:"
            for ($i = 0; $i -lt $recommendations.Count; $i++) {
                $rec = $recommendations[$i]
                Write-Host "$($i + 1). $($rec.Type): $($rec.Description)"
                Write-Host "   Potential Savings: $($rec.PotentialSavings)"
            }

            return $recommendations
        }
        catch {
            Write-Error "Error generating recommendations: $($_.Exception.Message)"
            throw
        }
    }

    [void] SetupCostTags() {
        try {
            $tags = @{
                "Environment" = @("Development", "Staging", "Production")
                "Team" = @("Frontend", "Backend", "DevOps")
                "Project" = @("WebApp", "MobileApp", "API")
                "CostCenter" = @("Engineering", "Marketing", "Sales")
            }

            Write-Host "Recommended cost allocation tags:"
            foreach ($tagKey in $tags.Keys) {
            Write-Host "  $tagKey\`: $($tags[$tagKey] -join ', ')"
            }

            Write-Host "Apply these tags to resources using Azure Policy or manually"
        }
        catch {
            Write-Error "Error setting up cost tags: $($_.Exception.Message)"
            throw
        }
    }
}

# Main execution
try {
    $optimizer = [AzureCostOptimizer]::new($SubscriptionId, $ResourceGroupName)

    # Get cost data for last 30 days
    $endDate = Get-Date
    $startDate = $endDate.AddDays(-30)

    $costData = $optimizer.GetCostData($startDate, $endDate)

    # Generate optimization recommendations
    $recommendations = $optimizer.GenerateOptimizationRecommendations()

    # Create budget and alerts
    $optimizer.CreateBudget($BudgetAmount, $AlertThresholds)

    # Setup cost tags
    $optimizer.SetupCostTags()

    Write-Host "Azure cost optimization completed successfully"
}
catch {
    Write-Error "Azure cost optimization failed: $($_.Exception.Message)"
    exit 1
}`
        }
      ]
    }
  ],
  projects: [
    {
      title: "Multi-Cloud Web Application",
      description: "Build a scalable web application deployed across AWS, GCP, and Azure with automated deployment and monitoring",
      technologies: ["AWS", "Google Cloud", "Azure", "Terraform", "Docker", "Kubernetes"],
      difficulty: "Advanced",
      estimatedHours: 60,
      deliverables: [
        "Infrastructure as Code for all three clouds",
        "Multi-cloud deployment pipeline",
        "Load balancing and auto-scaling setup",
        "Monitoring and alerting configuration",
        "Cost optimization and budget management",
        "Disaster recovery and backup strategy"
      ]
    },
    {
      title: "Serverless Microservices Platform",
      description: "Create a serverless microservices architecture using cloud functions, API Gateway, and managed databases",
      technologies: ["AWS Lambda", "Google Cloud Functions", "Azure Functions", "API Gateway", "DynamoDB", "Cloud SQL"],
      difficulty: "Advanced",
      estimatedHours: 45,
      deliverables: [
        "Serverless function implementations",
        "API Gateway configuration",
        "Database integration and optimization",
        "Authentication and authorization",
        "Monitoring and performance optimization",
        "Cost analysis and optimization"
      ]
    },
    {
      title: "Cloud-Native CI/CD Pipeline",
      description: "Implement a complete CI/CD pipeline using cloud-native services with automated testing and deployment",
      technologies: ["GitHub Actions", "AWS CodePipeline", "Google Cloud Build", "Azure DevOps", "Docker", "Kubernetes"],
      difficulty: "Intermediate",
      estimatedHours: 35,
      deliverables: [
        "Automated build and test pipeline",
        "Multi-environment deployment strategy",
        "Security scanning integration",
        "Performance testing and monitoring",
        "Rollback and recovery procedures",
        "Cost monitoring and optimization"
      ]
    },
    {
      title: "Cloud Cost Optimization Dashboard",
      description: "Build a comprehensive dashboard for monitoring and optimizing cloud costs across multiple providers",
      technologies: ["React", "Node.js", "AWS Cost Explorer", "Google Cloud Billing", "Azure Cost Management", "Chart.js"],
      difficulty: "Intermediate",
      estimatedHours: 30,
      deliverables: [
        "Multi-cloud cost visualization",
        "Budget tracking and alerts",
        "Resource utilization analysis",
        "Cost optimization recommendations",
        "Historical cost analysis",
        "Automated report generation"
      ]
    },
    {
      title: "Global Content Delivery Network",
      description: "Implement a global CDN solution with edge computing for improved performance and reduced latency",
      technologies: ["AWS CloudFront", "Google Cloud CDN", "Azure CDN", "Cloudflare", "Edge Functions", "Performance Monitoring"],
      difficulty: "Advanced",
      estimatedHours: 40,
      deliverables: [
        "CDN configuration and optimization",
        "Edge computing implementation",
        "Performance monitoring setup",
        "Global traffic analysis",
        "Security and DDoS protection",
        "Cost-benefit analysis"
      ]
    }
  ],
  assessments: {
    quiz: [
      {
        question: "Which cloud service model provides the most control over infrastructure?",
        options: [
          "Software as a Service (SaaS)",
          "Platform as a Service (PaaS)",
          "Infrastructure as a Service (IaaS)",
          "Functions as a Service (FaaS)"
        ],
        correctAnswer: 2,
        explanation: "Infrastructure as a Service (IaaS) provides the most control over infrastructure, allowing users to manage virtual machines, storage, and networking resources."
      },
      {
        question: "What is the primary benefit of serverless computing?",
        options: [
          "Complete control over server configuration",
          "Automatic scaling and pay-per-use pricing",
          "Physical server maintenance",
          "Long-term resource commitments"
        ],
        correctAnswer: 1,
        explanation: "Serverless computing automatically scales based on demand and charges only for actual execution time, eliminating the need to manage servers."
      },
      {
        question: "Which tool is commonly used for Infrastructure as Code across multiple cloud providers?",
        options: [
          "Docker Compose",
          "Terraform",
          "Kubernetes",
          "Jenkins"
        ],
        correctAnswer: 1,
        explanation: "Terraform is a popular Infrastructure as Code tool that supports multiple cloud providers and enables declarative infrastructure management."
      },
      {
        question: "What is the main purpose of a Content Delivery Network (CDN)?",
        options: [
          "Store large amounts of data",
          "Process complex computations",
          "Distribute content globally with low latency",
          "Manage user authentication"
        ],
        correctAnswer: 2,
        explanation: "CDNs distribute content across multiple geographic locations to reduce latency and improve performance for end users."
      },
      {
        question: "Which storage class is typically used for frequently accessed data with the lowest latency?",
        options: [
          "Archive storage",
          "Cold storage",
          "Standard storage",
          "Deep archive"
        ],
        correctAnswer: 2,
        explanation: "Standard storage provides the lowest latency and highest availability for frequently accessed data."
      }
    ],
    evaluation: [
      {
        question: "Design a cost-optimized, highly available web application architecture using cloud services. Include considerations for scalability, security, and disaster recovery.",
        rubric: [
          "Appropriate service selection for cost optimization",
          "High availability and fault tolerance implementation",
          "Security best practices and compliance",
          "Scalability and performance considerations",
          "Disaster recovery and backup strategy",
          "Monitoring and cost management"
        ]
      },
      {
        question: "Compare serverless functions across AWS Lambda, Google Cloud Functions, and Azure Functions. Discuss use cases, limitations, and cost implications for each platform.",
        rubric: [
          "Accurate comparison of features and capabilities",
          "Appropriate use case identification",
          "Limitation analysis and workarounds",
          "Cost structure understanding",
          "Performance and scaling considerations",
          "Vendor lock-in assessment"
        ]
      }
    ]
  },
  aiPrompts: [
    "How do I choose between AWS, GCP, and Azure for my project?",
    "What's the best way to optimize cloud costs?",
    "How can I implement multi-cloud architecture?",
    "What's the difference between serverless and containers?",
    "How do I set up monitoring and alerting in the cloud?",
    "What's Infrastructure as Code and why is it important?",
    "How can I implement disaster recovery in the cloud?",
    "What's the best storage solution for my use case?",
    "How do I secure my cloud applications?",
    "What's the difference between CDN and edge computing?",
    "How can I implement auto-scaling in the cloud?",
    "What's the best way to manage cloud resources?"
  ],
  resources: [
    {
      title: "AWS Documentation",
      type: "Official Documentation",
      url: "https://docs.aws.amazon.com/",
      description: "Comprehensive AWS service documentation and guides"
    },
    {
      title: "Google Cloud Documentation",
      type: "Official Documentation",
      url: "https://cloud.google.com/docs",
      description: "Google Cloud Platform documentation and tutorials"
    },
    {
      title: "Microsoft Azure Documentation",
      type: "Official Documentation",
      url: "https://docs.microsoft.com/en-us/azure/",
      description: "Azure cloud services documentation"
    },
    {
      title: "Terraform Documentation",
      type: "Official Documentation",
      url: "https://www.terraform.io/docs/",
      description: "Infrastructure as Code with Terraform"
    },
    {
      title: "Cloud Cost Optimization Guide",
      type: "Guide",
      url: "https://cloud.google.com/docs/cost-optimization",
      description: "Best practices for optimizing cloud costs"
    }
  ],
  toolsRequired: [
    {
      name: "AWS CLI",
      description: "Command-line interface for AWS services",
      installation: "Download from aws.amazon.com/cli",
      purpose: "Manage AWS resources from command line"
    },
    {
      name: "Google Cloud SDK",
      description: "Command-line tools for Google Cloud Platform",
      installation: "Install from cloud.google.com/sdk",
      purpose: "Manage GCP resources and deployments"
    },
    {
      name: "Azure CLI",
      description: "Command-line interface for Azure services",
      installation: "Install from docs.microsoft.com/en-us/cli/azure/",
      purpose: "Manage Azure resources from command line"
    },
    {
      name: "Terraform",
      description: "Infrastructure as Code tool for multi-cloud deployments",
      installation: "Download from terraform.io/downloads",
      purpose: "Provision and manage cloud infrastructure"
    },
    {
      name: "Cloud Cost Management Tools",
      description: "Tools for monitoring and optimizing cloud costs",
      installation: "Use native cloud provider tools or third-party solutions",
      purpose: "Track and optimize cloud spending"
    }
  ],
  bestPractices: [
    "Use Infrastructure as Code for consistent deployments",
    "Implement proper security groups and network segmentation",
    "Enable monitoring and alerting for all critical resources",
    "Use managed services to reduce operational overhead",
    "Implement backup and disaster recovery strategies",
    "Tag resources for cost allocation and management",
    "Use auto-scaling to match capacity with demand",
    "Implement least privilege access controls",
    "Regularly review and optimize resource utilization",
    "Use CDN for global content distribution",
    "Implement proper logging and audit trails",
    "Regularly update and patch systems and applications"
  ],
  commonPitfalls: [
    "Not monitoring costs leading to unexpected bills",
    "Using single cloud provider causing vendor lock-in",
    "Not implementing proper backup and recovery",
    "Over-provisioning resources leading to wasted costs",
    "Not securing cloud resources properly",
    "Not tagging resources for cost tracking",
    "Ignoring serverless cold start performance",
    "Not implementing proper logging and monitoring",
    "Using development configurations in production",
    "Not planning for data transfer costs",
    "Ignoring compliance and regulatory requirements",
    "Not implementing proper access controls"
  ],
  careerRelevance: [
    "Cloud expertise is essential for modern software development roles",
    "Multi-cloud skills are highly valued by employers",
    "Cloud architecture knowledge supports senior developer positions",
    "Cost optimization skills are valuable for technical leadership roles",
    "Infrastructure as Code proficiency supports DevOps career paths",
    "Serverless expertise enables modern application development",
    "Cloud security knowledge is critical for enterprise environments",
    "Monitoring and observability skills support SRE roles",
    "Global infrastructure design supports international companies",
    "Cloud migration expertise is in high demand",
    "Cost management skills support business-focused technical roles",
    "Multi-cloud orchestration supports complex enterprise architectures"
  ]
};