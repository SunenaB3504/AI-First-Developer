# Data Architecture & Content Schema

---

This document defines the data architecture for the **Technology Prompts Library App**. It specifies the structure of the database, the format of the content, and how data is stored and synchronized.

## 1. Data Storage Strategy

- **Primary Database**: **Firestore** (NoSQL Document Database). Chosen for its scalability, real-time capabilities, and seamless integration with Firebase services.
- **Local Storage**: The client application (web and mobile) will use local storage (e.g., `localStorage` on web, `AsyncStorage` on React Native) to cache user progress and preferences.
- **Synchronization**: User data will be persisted locally for offline access and fast load times. It will be synchronized with Firestore whenever a network connection is available to ensure consistency across devices.

---

## 2. Firestore Database Collections

The following top-level collections will be used in Firestore:

| Collection | Description |
| :--- | :--- |
| `users` | Stores user profile information, preferences, and authentication details. Each document ID is the user's `uid` from Firebase Auth. |
| `userProgress` | Tracks the learning progress for each user. Contains sub-collections for completed chapters, earned badges, and project submissions. |
| `content` | Holds all the learning modules for the 25 technologies. Each document represents a single technology. |
| `aiPrompts` | A structured library of AI prompts, categorized by difficulty and technology. |

---

## 3. Core Data Models

### User Model (`/users/{userId}`)
```json
{
  "uid": "string",
  "email": "string",
  "displayName": "string",
  "photoURL": "string",
  "createdAt": "timestamp",
  "preferences": {
    "theme": "dark|light",
    "ttsEnabled": "boolean"
  }
}
```

### User Progress Model (`/userProgress/{userId}`)
```json
{
  "completedChapters": ["chapterId1", "chapterId2"],
  "earnedBadges": ["badgeId1", "badgeId2"],
  "learningStreaks": {
    "current": "number",
    "longest": "number",
    "lastActivity": "timestamp"
  },
  "portfolio": [
    {
      "projectId": "string",
      "projectURL": "string",
      "submittedAt": "timestamp"
    }
  ]
}
```

---

## 4. Technology Content Schema

All learning content will be structured in JSON format following the schema below. This ensures consistency and makes it easy for the application to parse and display modules.

### Module Structure (`/content/{technologyId}`)
```json
{
  "id": "technology-name",
  "tier": "number (1-5)",
  "name": "Display Name",
  "description": "Brief technology description",
  "difficulty": "beginner|intermediate|advanced",
  "estimatedHours": "string",
  "prerequisites": ["array of technology-ids"],
  "learningObjectives": ["array of strings"],
  "sections": [
    {
      "title": "Section Name",
      "content": "Learning content in Markdown format",
      "keyTopics": ["array of strings"],
      "practicalExercises": ["array of exercise descriptions"],
      "codeExamples": [
        {
          "language": "string (e.g., javascript)",
          "code": "string"
        }
      ]
    }
  ],
  "projects": [
    {
      "title": "Project Name",
      "description": "Project requirements and goals"
    }
  ],
  "assessments": [
    {
      "type": "quiz|evaluation",
      "questions": [
        {
          "question": "string",
          "options": ["array of strings"],
          "correctAnswer": "string"
        }
      ]
    }
  ],
  "aiPrompts": ["array of prompt-ids"],
  "resources": [
    {
      "name": "Resource Name",
      "url": "string"
    }
  ],
  "toolsRequired": ["array of strings"],
  "bestPractices": ["array of strings"],
  "commonPitfalls": ["array of strings"],
  "careerRelevance": "string"
}
```
