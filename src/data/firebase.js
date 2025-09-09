const firebaseContent = {
  id: "firebase",
  tier: 3,
  name: "Firebase",
  description: "Firebase is a comprehensive Backend-as-a-Service (BaaS) platform developed by Google that provides developers with a suite of tools and services to build, deploy, and scale web and mobile applications. It offers real-time database capabilities, authentication, cloud storage, serverless functions, and hosting services, enabling developers to focus on building great user experiences without managing backend infrastructure.",
  difficulty: "intermediate",
  estimatedHours: 18,
  prerequisites: ["javascript", "authentication"],
  learningObjectives: [
    "Set up and configure Firebase projects with proper security settings",
    "Implement Firestore database operations including CRUD operations and real-time listeners",
    "Integrate Firebase Authentication with multiple providers (email, social logins, anonymous)",
    "Manage file uploads and downloads using Firebase Cloud Storage",
    "Deploy serverless functions using Firebase Cloud Functions",
    "Configure and deploy applications using Firebase Hosting",
    "Implement security rules for Firestore and Cloud Storage",
    "Handle offline data synchronization and conflict resolution",
    "Monitor application performance using Firebase Analytics and Performance Monitoring",
    "Implement proper error handling and data validation strategies",
    "Use Firebase Admin SDK for server-side operations",
    "Optimize Firebase usage for cost and performance"
  ],
  sections: [
    {
      id: "firebase-setup-configuration",
      title: "Firebase Setup and Project Configuration",
      content: "Firebase setup is the foundation of any Firebase-powered application. The Firebase Console provides a web-based interface for managing all Firebase services, while the Firebase SDK enables seamless integration with web and mobile applications. Proper configuration ensures security, performance, and scalability from the start.\n\n**Firebase Console Overview**:\n- **Project Creation**: Setting up new Firebase projects with unique identifiers\n- **Service Integration**: Enabling and configuring individual Firebase services\n- **Environment Management**: Managing development, staging, and production environments\n- **Billing and Usage**: Monitoring resource consumption and managing costs\n\n**SDK Integration**:\n- **Web SDK**: JavaScript/TypeScript integration for web applications\n- **Mobile SDKs**: Native platform integration for iOS and Android\n- **Admin SDK**: Server-side operations and management\n- **Configuration**: Environment-specific configuration management\n\n**Security First Approach**:\n- **API Keys**: Proper management of Firebase configuration\n- **Environment Variables**: Secure storage of sensitive configuration\n- **Access Control**: Implementing proper authentication and authorization\n- **Data Validation**: Input sanitization and validation strategies\n\n**Best Practices**:\n- Use separate Firebase projects for development, staging, and production\n- Implement proper error handling for Firebase operations\n- Monitor Firebase usage and costs regularly\n- Keep Firebase SDKs updated to latest versions\n- Use Firebase Security Rules to protect data\n- Implement proper logging and monitoring",
      keyTopics: [
        "Firebase Console navigation and project setup",
        "SDK integration and configuration",
        "Environment management strategies",
        "Security configuration and API key management"
      ],
      practicalExercises: [
        "Create a new Firebase project and configure authentication",
        "Set up Firebase SDK in a web application with proper configuration",
        "Configure separate environments for development and production",
        "Implement proper error handling for Firebase initialization"
      ],
      codeExamples: [
        {
          title: "Firebase Project Setup and Configuration",
          code: `import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

// Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

export default app;`
        },
        {
          title: "Environment-Specific Configuration",
          code: `// .env.local (Development)
REACT_APP_FIREBASE_API_KEY=your_dev_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-dev.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-dev
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-dev.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef123456
REACT_APP_FIREBASE_MEASUREMENT_ID=G-ABCDEFGHIJ

// .env.production (Production)
REACT_APP_FIREBASE_API_KEY=your_prod_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=987654321
REACT_APP_FIREBASE_APP_ID=1:987654321:web:zyxwvut987654
REACT_APP_FIREBASE_MEASUREMENT_ID=G-ZYXWVUTSRQ

// config/firebase.js
const getFirebaseConfig = () => {
  const config = {
    development: {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      // ... other config
    },
    production: {
      apiKey: process.env.REACT_APP_FIREBASE_PROD_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_PROD_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROD_PROJECT_ID,
      // ... other config
    }
  };

  const environment = process.env.NODE_ENV || 'development';
  return config[environment];
};

export default getFirebaseConfig;`
        }
      ]
    },
    {
      id: "firebase-firestore-database",
      title: "Firestore Database Operations and Real-Time Data",
      content: "Firestore is Firebase's NoSQL cloud database that provides real-time data synchronization across all connected clients. It offers flexible data modeling, powerful querying capabilities, and automatic scaling. Understanding Firestore's document-based structure and real-time capabilities is crucial for building responsive applications.\n\n**Firestore Data Model**:\n- **Collections**: Groups of documents with similar structure\n- **Documents**: Individual records containing fields and data\n- **Fields**: Key-value pairs within documents\n- **Subcollections**: Nested collections within documents\n- **References**: Pointers to other documents or collections\n\n**CRUD Operations**:\n- **Create**: Adding new documents to collections\n- **Read**: Querying and retrieving document data\n- **Update**: Modifying existing document fields\n- **Delete**: Removing documents from collections\n\n**Real-Time Updates**:\n- **Listeners**: Real-time data synchronization\n- **Snapshots**: Current state of queried data\n- **Change Types**: Added, modified, removed events\n- **Offline Support**: Local data persistence and sync\n\n**Query Capabilities**:\n- **Simple Queries**: Basic field comparisons\n- **Compound Queries**: Multiple field conditions\n- **Range Queries**: Ordering and limiting results\n- **Collection Group Queries**: Querying across subcollections\n\n**Performance Optimization**:\n- **Indexing**: Automatic and manual index management\n- **Pagination**: Efficiently loading large datasets\n- **Caching**: Client-side data caching strategies\n- **Batch Operations**: Multiple operations in single request\n\n**Best Practices**:\n- Design data structure based on query patterns\n- Use appropriate data types for fields\n- Implement proper error handling for all operations\n- Monitor query performance and optimize slow queries\n- Use transactions for atomic operations\n- Implement data validation at application level",
      keyTopics: [
        "Firestore data modeling and document structure",
        "CRUD operations with Firestore",
        "Real-time listeners and data synchronization",
        "Query optimization and performance"
      ],
      practicalExercises: [
        "Design a Firestore data structure for a social media application",
        "Implement CRUD operations for user profiles and posts",
        "Set up real-time listeners for live chat functionality",
        "Create complex queries with multiple conditions and ordering"
      ],
      codeExamples: [
        {
          title: "Firestore CRUD Operations",
          code: `import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  onSnapshot
} from 'firebase/firestore';
import { db } from './firebase';

// Create a new document
export const createUser = async (userData) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};

// Read a single document
export const getUser = async (userId) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error getting document: ', error);
    throw error;
  }
};

// Update a document
export const updateUser = async (userId, updateData) => {
  try {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date()
    });
    console.log('Document updated successfully');
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
};

// Delete a document
export const deleteUser = async (userId) => {
  try {
    await deleteDoc(doc(db, 'users', userId));
    console.log('Document deleted successfully');
  } catch (error) {
    console.error('Error deleting document: ', error);
    throw error;
  }
};

// Query documents
export const getUsersByRole = async (role) => {
  try {
    const q = query(
      collection(db, 'users'),
      where('role', '==', role),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    return users;
  } catch (error) {
    console.error('Error querying documents: ', error);
    throw error;
  }
};`
        },
        {
          title: "Real-Time Data Synchronization",
          code: `import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from './firebase';

// Real-time listener for user posts
export const subscribeToUserPosts = (userId, callback) => {
  const q = query(
    collection(db, 'posts'),
    where('authorId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      });
    });

    callback(posts);
  }, (error) => {
    console.error('Error listening to posts: ', error);
  });

  return unsubscribe;
};

// Real-time chat messages listener
export const subscribeToChatMessages = (chatId, callback) => {
  const q = query(
    collection(db, 'chats', chatId, 'messages'),
    orderBy('timestamp', 'asc')
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const changes = querySnapshot.docChanges();
    const newMessages = [];

    changes.forEach((change) => {
      if (change.type === 'added') {
        newMessages.push({
          id: change.doc.id,
          ...change.doc.data(),
          timestamp: change.doc.data().timestamp?.toDate()
        });
      }
    });

    if (newMessages.length > 0) {
      callback(newMessages);
    }
  }, (error) => {
    console.error('Error listening to chat messages: ', error);
  });

  return unsubscribe;
};

// Real-time user presence tracking
export const trackUserPresence = (userId) => {
  const userStatusRef = doc(db, 'status', userId);

  // Set user as online
  const setOnline = async () => {
    try {
      await updateDoc(userStatusRef, {
        state: 'online',
        lastChanged: new Date()
      });
    } catch (error) {
      console.error('Error setting online status: ', error);
    }
  };

  // Set user as offline
  const setOffline = async () => {
    try {
      await updateDoc(userStatusRef, {
        state: 'offline',
        lastChanged: new Date()
      });
    } catch (error) {
      console.error('Error setting offline status: ', error);
    }
  };

  // Listen for connection state changes
  const unsubscribe = onSnapshot(doc(db, '.info/connected'), async (snapshot) => {
    if (snapshot.data()?.connected) {
      await setOnline();
    } else {
      await setOffline();
    }
  });

  // Set offline when page unloads
  window.addEventListener('beforeunload', setOffline);

  return () => {
    unsubscribe();
    window.removeEventListener('beforeunload', setOffline);
    setOffline();
  };
};

// Usage in React component
import { useEffect, useState } from 'react';

function UserPosts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToUserPosts(userId, (newPosts) => {
      setPosts(newPosts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  if (loading) return <div>Loading posts...</div>;

  return (
    <div>
      <h2>User Posts</h2>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small>{post.createdAt?.toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default UserPosts;`
        },
        {
          title: "Firestore Security Rules",
          code: `// firestore.rules

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    function isAdmin() {
      return isAuthenticated() &&
             exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }

    function hasPermission(permission) {
      return isAuthenticated() &&
             get(/databases/$(database)/documents/user_permissions/$(request.auth.uid)).data[permission] == true;
    }

    // Users collection rules
    match /users/{userId} {
      // Allow read for authenticated users
      allow read: if isAuthenticated();

      // Allow create for anyone (during registration)
      allow create: if request.auth != null &&
                       request.auth.uid == userId &&
                       request.resource.data.keys().hasAll(['email', 'displayName']) &&
                       request.resource.data.email == request.auth.token.email;

      // Allow update for owner or admin
      allow update: if isOwner(userId) || isAdmin();

      // Allow delete for admin only
      allow delete: if isAdmin();
    }

    // Posts collection rules
    match /posts/{postId} {
      // Allow read for all authenticated users
      allow read: if isAuthenticated();

      // Allow create for authenticated users
      allow create: if isAuthenticated() &&
                       request.auth.uid == request.resource.data.authorId &&
                       request.resource.data.keys().hasAll(['title', 'content', 'authorId']);

      // Allow update for author or admin
      allow update: if isOwner(resource.data.authorId) || isAdmin();

      // Allow delete for author or admin
      allow delete: if isOwner(resource.data.authorId) || isAdmin();
    }

    // Comments subcollection rules
    match /posts/{postId}/comments/{commentId} {
      // Allow read for authenticated users
      allow read: if isAuthenticated();

      // Allow create for authenticated users
      allow create: if isAuthenticated() &&
                       request.auth.uid == request.resource.data.authorId;

      // Allow update for author only
      allow update: if isOwner(resource.data.authorId);

      // Allow delete for author or post author or admin
      allow delete: if isOwner(resource.data.authorId) ||
                       isOwner(get(/databases/$(database)/documents/posts/$(postId)).data.authorId) ||
                       isAdmin();
    }

    // Private messages collection
    match /messages/{messageId} {
      // Allow read/write only for participants
      allow read, write: if isAuthenticated() &&
                            (request.auth.uid == resource.data.senderId ||
                             request.auth.uid == resource.data.receiverId);
    }

    // Admin-only collections
    match /admin/{document=**} {
      allow read, write: if isAdmin();
    }

    // Public content (read-only for all)
    match /public/{document=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}

// Validate data structure
function validatePostData() {
  return request.resource.data.keys().hasAll(['title', 'content', 'authorId']) &&
         request.resource.data.title.size() > 0 &&
         request.resource.data.title.size() <= 200 &&
         request.resource.data.content.size() > 0 &&
         request.resource.data.content.size() <= 10000;
}

function validateCommentData() {
  return request.resource.data.keys().hasAll(['content', 'authorId', 'postId']) &&
         request.resource.data.content.size() > 0 &&
         request.resource.data.content.size() <= 1000;
}`
        }
      ]
    },
    {
      id: "firebase-authentication",
      title: "Firebase Authentication and User Management",
      content: "Firebase Authentication provides a comprehensive solution for user authentication and management. It supports multiple authentication methods including email/password, social logins, phone authentication, and anonymous authentication. The service handles user sessions, password resets, email verification, and provides secure token-based authentication.\n\n**Authentication Methods**:\n- **Email/Password**: Traditional username and password authentication\n- **Social Providers**: Google, Facebook, Twitter, GitHub integration\n- **Phone Authentication**: SMS-based verification\n- **Anonymous Authentication**: Temporary user sessions\n- **Custom Authentication**: Integration with existing authentication systems\n\n**User Management**:\n- **User Profiles**: Storing additional user information\n- **Email Verification**: Confirming user email addresses\n- **Password Reset**: Secure password recovery flow\n- **Account Linking**: Connecting multiple authentication providers\n- **User Sessions**: Managing login state and session persistence\n\n**Security Features**:\n- **Token Management**: JWT tokens for secure API access\n- **Session Handling**: Automatic token refresh and session management\n- **Security Rules**: Integration with Firestore and Storage security\n- **Audit Logging**: Tracking authentication events\n\n**Advanced Features**:\n- **Multi-Factor Authentication**: Additional security layer\n- **Account Recovery**: Secure account recovery options\n- **User Migration**: Importing users from other systems\n- **Custom Claims**: Adding custom data to authentication tokens\n\n**Best Practices**:\n- Always verify email addresses for important accounts\n- Implement proper password policies\n- Use secure token storage mechanisms\n- Handle authentication errors gracefully\n- Monitor authentication events for security\n- Implement proper logout functionality\n- Use Firebase Security Rules to protect user data",
      keyTopics: [
        "Multiple authentication providers and methods",
        "User session management and persistence",
        "Security best practices for authentication",
        "Custom authentication flows and user management"
      ],
      practicalExercises: [
        "Implement email/password authentication with email verification",
        "Set up social login with Google and Facebook providers",
        "Create a user profile management system",
        "Implement password reset and account recovery flows"
      ],
      codeExamples: [
        {
          title: "Firebase Authentication Setup and Email/Password Auth",
          code: `import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from './firebase';

// Sign up with email and password
export const signUp = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, {
      displayName: displayName
    });

    // Send email verification
    await sendEmailVerification(user);

    console.log('User signed up successfully:', user.uid);
    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Sign in with email and password
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check if email is verified
    if (!user.emailVerified) {
      throw new Error('Please verify your email before signing in.');
    }

    console.log('User signed in successfully:', user.uid);
    return user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

// Sign out
export const logout = async () => {
  try {
    await signOut(auth);
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Send password reset email
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

// Resend email verification
export const resendVerificationEmail = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      await sendEmailVerification(user);
      console.log('Verification email sent successfully');
    } else {
      throw new Error('No user is currently signed in');
    }
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

// Auth state listener
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is signed in:', user.uid);
      callback(user);
    } else {
      console.log('User is signed out');
      callback(null);
    }
  });
};`
        },
        {
          title: "Social Authentication Providers",
          code: `import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  linkWithPopup,
  unlink
} from 'firebase/auth';
import { auth } from './firebase';

// Google Authentication
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();

    // Add additional scopes if needed
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    provider.setCustomParameters({
      prompt: 'select_account'
    });

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log('Google sign in successful:', user.uid);
    return user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

// Facebook Authentication
export const signInWithFacebook = async () => {
  try {
    const provider = new FacebookAuthProvider();

    // Add permissions
    provider.addScope('email');
    provider.addScope('public_profile');

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log('Facebook sign in successful:', user.uid);
    return user;
  } catch (error) {
    console.error('Error signing in with Facebook:', error);
    throw error;
  }
};

// GitHub Authentication
export const signInWithGithub = async () => {
  try {
    const provider = new GithubAuthProvider();

    // Add scopes
    provider.addScope('repo');
    provider.addScope('user');

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log('GitHub sign in successful:', user.uid);
    return user;
  } catch (error) {
    console.error('Error signing in with GitHub:', error);
    throw error;
  }
};

// Handle redirect result (for mobile or when popup is blocked)
export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);

    if (result) {
      const user = result.user;
      console.log('Redirect sign in successful:', user.uid);
      return user;
    }

    return null;
  } catch (error) {
    console.error('Error handling redirect result:', error);
    throw error;
  }
};

// Link multiple authentication providers
export const linkGoogleAccount = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await linkWithPopup(auth.currentUser, provider);

    console.log('Account linked successfully');
    return result.user;
  } catch (error) {
    console.error('Error linking account:', error);
    throw error;
  }
};

// Unlink authentication provider
export const unlinkProvider = async (providerId) => {
  try {
    await unlink(auth.currentUser, providerId);
    console.log('Provider unlinked successfully');
  } catch (error) {
    console.error('Error unlinking provider:', error);
    throw error;
  }
};

// Get available authentication providers
export const getProviderData = () => {
  const user = auth.currentUser;
  if (!user) return [];

  return user.providerData.map(provider => ({
    providerId: provider.providerId,
    displayName: provider.displayName,
    email: provider.email,
    photoURL: provider.photoURL
  }));
};

// Usage in React component
import { useEffect, useState } from 'react';
import { onAuthStateChange, signInWithGoogle, logout } from './auth';

function AuthComponent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign in failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.displayName}!</h2>
          <p>Email: {user.email}</p>
          <p>Email verified: {user.emailVerified ? 'Yes' : 'No'}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Please sign in</h2>
          <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>
      )}
    </div>
  );
}

export default AuthComponent;`
        },
        {
          title: "User Profile Management and Custom Claims",
          code: `import {
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

// Update user profile
export const updateUserProfile = async (updates) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is currently signed in');

    // Update Firebase Auth profile
    await updateProfile(user, {
      displayName: updates.displayName,
      photoURL: updates.photoURL
    });

    // Update Firestore user document
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: new Date()
    });

    console.log('Profile updated successfully');
    return user;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Update user email (requires reauthentication)
export const updateUserEmail = async (newEmail, currentPassword) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is currently signed in');

    // Reauthenticate user
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);

    // Update email
    await updateEmail(user, newEmail);

    // Send verification email
    await sendEmailVerification(user);

    // Update Firestore
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      email: newEmail,
      emailVerified: false,
      updatedAt: new Date()
    });

    console.log('Email updated successfully. Please verify your new email.');
  } catch (error) {
    console.error('Error updating email:', error);
    throw error;
  }
};

// Update user password
export const updateUserPassword = async (currentPassword, newPassword) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is currently signed in');

    // Reauthenticate user
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);

    // Update password
    await updatePassword(user, newPassword);

    console.log('Password updated successfully');
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};

// Get extended user profile from Firestore
export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    } else {
      throw new Error('User profile not found');
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

// Create initial user profile
export const createUserProfile = async (user, additionalData = {}) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      provider: user.providerData[0]?.providerId || 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...additionalData
    };

    await setDoc(userRef, userData);
    console.log('User profile created successfully');
    return userData;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

// Delete user account and profile
export const deleteUserAccount = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is currently signed in');

    // Delete Firestore user document
    const userRef = doc(db, 'users', user.uid);
    await deleteDoc(userRef);

    // Delete Firebase Auth user
    await user.delete();

    console.log('User account deleted successfully');
  } catch (error) {
    console.error('Error deleting user account:', error);
    throw error;
  }
};

// Usage in React component
import { useEffect, useState } from 'react';
import { onAuthStateChange, getUserProfile, createUserProfile } from './auth';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (authUser) => {
      setUser(authUser);

      if (authUser) {
        try {
          let userProfile = await getUserProfile(authUser.uid);
          setProfile(userProfile);
        } catch (error) {
          // Profile doesn't exist, create it
          const newProfile = await createUserProfile(authUser, {
            bio: '',
            location: '',
            website: ''
          });
          setProfile(newProfile);
        }
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in to view your profile</div>;

  return (
    <div>
      <h2>{profile?.displayName || user.displayName}</h2>
      <p>Email: {user.email}</p>
      <p>Bio: {profile?.bio || 'No bio yet'}</p>
      <p>Location: {profile?.location || 'Not specified'}</p>
      <p>Member since: {profile?.createdAt?.toDate().toLocaleDateString()}</p>
    </div>
  );
}

export default UserProfile;`
        }
      ]
    },
    {
      id: "firebase-cloud-storage",
      title: "Firebase Cloud Storage for File Management",
      content: "Firebase Cloud Storage provides secure, scalable file storage and serving capabilities. It integrates seamlessly with Firebase Authentication and Firestore, offering features like file uploads, downloads, metadata management, and access control. Cloud Storage is ideal for storing user-generated content, images, videos, and other media files.\n\n**Storage Architecture**:\n- **Buckets**: Top-level containers for files\n- **Folders/Paths**: Hierarchical organization of files\n- **Files**: Individual stored objects with metadata\n- **References**: Pointers to files for upload/download operations\n\n**File Operations**:\n- **Upload**: Transferring files to Cloud Storage\n- **Download**: Retrieving files from storage\n- **Delete**: Removing files from storage\n- **Metadata**: Managing file information and properties\n- **Progress Tracking**: Monitoring upload/download progress\n\n**Security and Access Control**:\n- **Storage Security Rules**: Firebase rules for access control\n- **Authentication Integration**: User-based access permissions\n- **Public/Private Files**: Controlling file visibility\n- **Signed URLs**: Temporary access to private files\n\n**Performance Optimization**:\n- **Compression**: Reducing file sizes for faster transfers\n- **Caching**: Client-side and CDN caching strategies\n- **Resumable Uploads**: Handling interrupted uploads\n- **Thumbnail Generation**: Automatic image processing\n\n**Best Practices**:\n- Implement proper file validation before upload\n- Use appropriate file naming conventions\n- Monitor storage usage and costs\n- Implement proper error handling for all operations\n- Use compression for large files\n- Implement proper cleanup of unused files\n- Use Firebase Storage security rules effectively",
      keyTopics: [
        "File upload and download operations",
        "Storage security rules and access control",
        "File metadata management and optimization",
        "Integration with Firestore for file references"
      ],
      practicalExercises: [
        "Implement image upload with progress tracking and validation",
        "Create a file management system with CRUD operations",
        "Set up proper storage security rules for user files",
        "Implement file compression and optimization strategies"
      ],
      codeExamples: [
        {
          title: "File Upload and Download Operations",
          code: `import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  getMetadata,
  updateMetadata
} from 'firebase/storage';
import { storage } from './firebase';

// Upload file to Firebase Storage
export const uploadFile = async (file, path, metadata = {}) => {
  try {
    const storageRef = ref(storage, path);
    const uploadResult = await uploadBytes(storageRef, file, {
      contentType: file.type,
      customMetadata: metadata
    });

    console.log('File uploaded successfully:', uploadResult.ref.fullPath);
    return uploadResult.ref;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Upload with progress tracking
export const uploadFileWithProgress = (file, path, onProgress, metadata = {}) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: file.type,
      customMetadata: metadata
    });

    // Monitor upload progress
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress);
      },
      (error) => {
        console.error('Upload error:', error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            ref: uploadTask.snapshot.ref,
            downloadURL,
            metadata: uploadTask.snapshot.metadata
          });
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

// Download file
export const downloadFile = async (path) => {
  try {
    const storageRef = ref(storage, path);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error getting download URL:', error);
    throw error;
  }
};

// Delete file
export const deleteFile = async (path) => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    console.log('File deleted successfully');
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

// List files in directory
export const listFiles = async (path) => {
  try {
    const storageRef = ref(storage, path);
    const result = await listAll(storageRef);

    const files = result.items.map(item => ({
      name: item.name,
      fullPath: item.fullPath,
      bucket: item.bucket
    }));

    return files;
  } catch (error) {
    console.error('Error listing files:', error);
    throw error;
  }
};

// Get file metadata
export const getFileMetadata = async (path) => {
  try {
    const storageRef = ref(storage, path);
    const metadata = await getMetadata(storageRef);
    return metadata;
  } catch (error) {
    console.error('Error getting metadata:', error);
    throw error;
  }
};

// Update file metadata
export const updateFileMetadata = async (path, newMetadata) => {
  try {
    const storageRef = ref(storage, path);
    const updatedMetadata = await updateMetadata(storageRef, {
      customMetadata: newMetadata
    });
    return updatedMetadata;
  } catch (error) {
    console.error('Error updating metadata:', error);
    throw error;
  }
};`
        },
        {
          title: "Image Upload with Compression and Validation",
          code: `import { uploadFileWithProgress, getDownloadURL } from './storage';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

// Compress image before upload
export const compressImage = (file, maxWidth = 1920, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(resolve, 'image/jpeg', quality);
    };

    img.src = URL.createObjectURL(file);
  });
};

// Validate file before upload
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 10 * 1024 * 1024, // 10MB
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif'],
    allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']
  } = options;

  // Check file size
  if (file.size > maxSize) {
    throw new Error(\`File size must be less than \${maxSize / (1024 * 1024)}MB\`);
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    throw new Error(\`File type \${file.type} is not allowed. Allowed types: \${allowedTypes.join(', ')}\`);
  }

  // Check file extension
  const fileName = file.name.toLowerCase();
  const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
  if (!hasValidExtension) {
    throw new Error(\`File extension is not allowed. Allowed extensions: \${allowedExtensions.join(', ')}\`);
  }

  return true;
};

// Upload profile image
export const uploadProfileImage = async (userId, file, onProgress) => {
  try {
    // Validate file
    validateFile(file, {
      maxSize: 5 * 1024 * 1024, // 5MB
      allowedTypes: ['image/jpeg', 'image/png'],
      allowedExtensions: ['.jpg', '.jpeg', '.png']
    });

    // Compress image
    const compressedFile = await compressImage(file);

    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const fileName = \`profile_\${userId}_\${timestamp}.\${extension}\`;
    const path = \`users/\${userId}/profile/\${fileName}\`;

    // Upload with progress
    const result = await uploadFileWithProgress(
      compressedFile,
      path,
      onProgress,
      {
        userId,
        uploadedAt: new Date().toISOString(),
        originalName: file.name,
        compressed: 'true'
      }
    );

    // Update user profile with new image URL
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      photoURL: result.downloadURL,
      profileImagePath: result.ref.fullPath,
      updatedAt: new Date()
    });

    return result;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
};

// Upload multiple files
export const uploadMultipleFiles = async (userId, files, onProgress) => {
  const uploadPromises = files.map(async (file, index) => {
    try {
      validateFile(file);

      const timestamp = Date.now();
      const extension = file.name.split('.').pop();
      const fileName = \`file_\${userId}_\${timestamp}_\${index}.\${extension}\`;
      const path = \`users/\${userId}/files/\${fileName}\`;

      const result = await uploadFileWithProgress(
        file,
        path,
        (progress) => onProgress(file.name, progress),
        {
          userId,
          uploadedAt: new Date().toISOString(),
          originalName: file.name
        }
      );

      return {
        file: file.name,
        success: true,
        downloadURL: result.downloadURL,
        path: result.ref.fullPath
      };
    } catch (error) {
      return {
        file: file.name,
        success: false,
        error: error.message
      };
    }
  });

  const results = await Promise.allSettled(uploadPromises);
  return results.map(result => result.value || result.reason);
};

// Generate thumbnail for image
export const generateThumbnail = (file, maxSize = 200) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      const { width, height } = img;

      // Calculate thumbnail dimensions
      let thumbWidth, thumbHeight;
      if (width > height) {
        thumbWidth = maxSize;
        thumbHeight = (height * maxSize) / width;
      } else {
        thumbHeight = maxSize;
        thumbWidth = (width * maxSize) / height;
      }

      canvas.width = thumbWidth;
      canvas.height = thumbHeight;

      ctx.drawImage(img, 0, 0, thumbWidth, thumbHeight);
      canvas.toBlob(resolve, 'image/jpeg', 0.8);
    };

    img.src = URL.createObjectURL(file);
  });
};

// Usage in React component
import { useState } from 'react';
import { uploadProfileImage, uploadMultipleFiles } from './storage';

function FileUploadComponent({ userId }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);

  const handleProfileImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);

    try {
      const result = await uploadProfileImage(
        userId,
        file,
        (progress) => setProgress(progress)
      );

      console.log('Profile image uploaded:', result.downloadURL);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleMultipleFilesUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setUploading(true);
    setResults([]);

    try {
      const uploadResults = await uploadMultipleFiles(
        userId,
        files,
        (fileName, progress) => {
          console.log(\`\${fileName}: \${progress.toFixed(1)}%\`);
        }
      );

      setResults(uploadResults);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div>
        <h3>Profile Image</h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfileImageUpload}
          disabled={uploading}
        />
        {uploading && <progress value={progress} max="100" />}
      </div>

      <div>
        <h3>Multiple Files</h3>
        <input
          type="file"
          multiple
          onChange={handleMultipleFilesUpload}
          disabled={uploading}
        />
        {uploading && <div>Uploading files...</div>}
      </div>

      {results.length > 0 && (
        <div>
          <h4>Upload Results:</h4>
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                {result.file}: {result.success ? '✅ Success' : \`❌ \${result.error}\`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FileUploadComponent;`
        },
        {
          title: "Firebase Storage Security Rules",
          code: `// storage.rules

rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    function isAdmin() {
      return isAuthenticated() &&
             firestore.exists(/databases/(default)/documents/admins/$(request.auth.uid));
    }

    function isValidImage() {
      return request.resource.contentType.matches('image/.*') &&
             request.resource.size < 10 * 1024 * 1024 && // 10MB
             request.resource.size > 0;
    }

    function isValidDocument() {
      return request.resource.contentType.matches('application/(pdf|msword|vnd.openxmlformats-officedocument.wordprocessingml.document)') &&
             request.resource.size < 25 * 1024 * 1024; // 25MB
    }

    // Public files (read-only for all users)
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if false;
      allow delete: if false;
    }

    // User profile images
    match /users/{userId}/profile/{fileName} {
      // Allow read for all authenticated users
      allow read: if isAuthenticated();

      // Allow write for the user or admin
      allow write: if isOwner(userId) || isAdmin();

      // Allow delete for the user or admin
      allow delete: if isOwner(userId) || isAdmin();

      // Validate file type and size
      allow write: if isValidImage() &&
                      fileName.matches('profile_' + userId + '_\\d+\\.(jpg|jpeg|png|gif)$');

      // Validate metadata
      allow write: if request.resource.metadata['userId'] == userId;
    }

    // User uploaded files
    match /users/{userId}/files/{fileName} {
      // Allow read for the user or admin
      allow read: if isOwner(userId) || isAdmin();

      // Allow write for the user
      allow write: if isOwner(userId) && (
        isValidImage() ||
        isValidDocument() ||
        request.resource.contentType.matches('text/.*') ||
        request.resource.contentType.matches('application/json')
      );

      // Allow delete for the user or admin
      allow delete: if isOwner(userId) || isAdmin();

      // Validate metadata
      allow write: if request.resource.metadata['userId'] == userId;
    }

    // Group or project files
    match /groups/{groupId}/{allPaths=**} {
      // Check if user is member of the group
      function isGroupMember() {
        return isAuthenticated() &&
               firestore.exists(/databases/(default)/documents/groups/$(groupId)/members/$(request.auth.uid));
      }

      // Check if user is group admin
      function isGroupAdmin() {
        return isAuthenticated() &&
               firestore.get(/databases/(default)/documents/groups/$(groupId)/members/$(request.auth.uid)).data.role == 'admin';
      }

      allow read: if isGroupMember() || isGroupAdmin();
      allow write: if isGroupMember();
      allow delete: if isGroupAdmin() || (
        isGroupMember() &&
        request.auth.uid == resource.metadata['uploadedBy']
      );
    }

    // Temporary files (auto-delete after certain time)
    match /temp/{userId}/{fileName} {
      allow read, write: if isOwner(userId);
      allow delete: if isOwner(userId) || isAdmin();

      // Files in temp folder should be automatically cleaned up
      // This would be handled by Cloud Functions
    }

    // Admin-only files
    match /admin/{allPaths=**} {
      allow read, write, delete: if isAdmin();
    }

    // Backup files (read-only)
    match /backups/{allPaths=**} {
      allow read: if isAdmin();
      allow write, delete: if false;
    }

    // Thumbnails (auto-generated)
    match /thumbnails/{allPaths=**} {
      allow read: if true;  // Public read access for thumbnails
      allow write: if false; // Only Cloud Functions can write thumbnails
      allow delete: if false;
    }
  }
}

// Additional validation rules
function validateFileName(fileName) {
  // Prevent directory traversal attacks
  return !fileName.contains('..') &&
         !fileName.contains('/') &&
         !fileName.contains('\\') &&
         fileName.size() > 0 &&
         fileName.size() < 255;
}

function validateMetadata() {
  return request.resource.metadata.keys().hasAll(['userId', 'uploadedAt']) &&
         request.resource.metadata['userId'] == request.auth.uid;
}

// Rate limiting helper (requires Cloud Functions)
function checkRateLimit(userId, operation) {
  // This would check against a Firestore document tracking user operations
  // Implementation would be in Cloud Functions
  return true; // Placeholder
}`
        }
      ]
    },
    {
      id: "firebase-cloud-functions",
      title: "Firebase Cloud Functions for Serverless Computing",
      content: "Firebase Cloud Functions enable serverless computing by running backend code in response to events triggered by Firebase features and HTTPS requests. Functions can be written in Node.js and automatically scale with your application needs. They integrate seamlessly with other Firebase services and can be triggered by various events.\n\n**Function Types**:\n- **HTTP Functions**: Respond to HTTP requests and webhooks\n- **Callable Functions**: Called directly from client applications\n- **Background Functions**: Triggered by Firebase events\n- **Scheduled Functions**: Run on a schedule using Cloud Scheduler\n\n**Event Triggers**:\n- **Firestore Events**: Document creation, updates, deletions\n- **Authentication Events**: User creation, deletion\n- **Storage Events**: File upload, deletion, metadata changes\n- **Analytics Events**: Conversion events and custom events\n- **Pub/Sub**: Custom event-driven triggers\n\n**Function Lifecycle**:\n- **Cold Start**: Initial function execution (can be slow)\n- **Warm Execution**: Subsequent executions (faster)\n- **Scaling**: Automatic scaling based on load\n- **Timeout**: Maximum execution time (9 minutes for HTTP, 540 seconds for background)\n\n**Best Practices**:\n- Keep functions small and focused on single responsibilities\n- Use appropriate memory allocation for function needs\n- Implement proper error handling and logging\n- Use environment variables for configuration\n- Monitor function performance and costs\n- Implement proper authentication for sensitive operations\n- Use connection pooling for database connections\n- Implement retry logic for transient failures\n\n**Security Considerations**:\n- Validate input data thoroughly\n- Use Firebase Admin SDK for server-side operations\n- Implement proper authentication checks\n- Avoid exposing sensitive information in function responses\n- Use Firebase Security Rules in conjunction with function logic",
      keyTopics: [
        "HTTP and callable function implementation",
        "Event-driven background functions",
        "Function deployment and monitoring",
        "Integration with other Firebase services"
      ],
      practicalExercises: [
        "Create HTTP functions for API endpoints",
        "Implement Firestore-triggered background functions",
        "Set up authentication event handlers",
        "Create scheduled functions for maintenance tasks"
      ],
      codeExamples: [
        {
          title: "HTTP and Callable Cloud Functions",
          code: `const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();

// HTTP Function - API Endpoint
exports.getUserProfile = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  cors(req, res, async () => {
    try {
      // Only allow GET requests
      if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
      }

      // Get user ID from query parameters
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      // Get user data from Firestore
      const userDoc = await admin.firestore()
        .collection('users')
        .doc(userId)
        .get();

      if (!userDoc.exists) {
        return res.status(404).json({ error: 'User not found' });
      }

      const userData = userDoc.data();

      // Return user profile (exclude sensitive data)
      const profile = {
        uid: userData.uid,
        displayName: userData.displayName,
        email: userData.email,
        photoURL: userData.photoURL,
        bio: userData.bio,
        createdAt: userData.createdAt
      };

      res.json({ profile });
    } catch (error) {
      console.error('Error getting user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Callable Function - Client-side function call
exports.createPost = functions.https.onCall(async (data, context) => {
  // Check if user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated to create posts'
    );
  }

  const { title, content, tags = [] } = data;

  // Validate input
  if (!title || !content) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Title and content are required'
    );
  }

  if (title.length > 200 || content.length > 10000) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Title or content too long'
    );
  }

  try {
    const userId = context.auth.uid;
    const postData = {
      title: title.trim(),
      content: content.trim(),
      tags,
      authorId: userId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      likesCount: 0,
      commentsCount: 0
    };

    // Create post document
    const postRef = await admin.firestore()
      .collection('posts')
      .add(postData);

    // Update user's post count
    const userRef = admin.firestore().collection('users').doc(userId);
    await userRef.update({
      postsCount: admin.firestore.FieldValue.increment(1),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return {
      postId: postRef.id,
      message: 'Post created successfully'
    };
  } catch (error) {
    console.error('Error creating post:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to create post'
    );
  }
});

// HTTP Function with Authentication
exports.updateUserProfile = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      // Only allow POST requests
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }

      // Verify Firebase Auth token
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const idToken = authHeader.split('Bearer ')[1];
      let decodedToken;

      try {
        decodedToken = await admin.auth().verifyIdToken(idToken);
      } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const userId = decodedToken.uid;
      const { displayName, bio, website } = req.body;

      // Validate input
      if (displayName && displayName.length > 50) {
        return res.status(400).json({ error: 'Display name too long' });
      }

      if (bio && bio.length > 500) {
        return res.status(400).json({ error: 'Bio too long' });
      }

      // Update user profile
      const updateData = {};
      if (displayName !== undefined) updateData.displayName = displayName;
      if (bio !== undefined) updateData.bio = bio;
      if (website !== undefined) updateData.website = website;
      updateData.updatedAt = admin.firestore.FieldValue.serverTimestamp();

      await admin.firestore()
        .collection('users')
        .doc(userId)
        .update(updateData);

      res.json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});`
        },
        {
          title: "Background Functions and Event Triggers",
          code: `const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Firestore Trigger - New user created
exports.onUserCreated = functions.firestore
  .document('users/{userId}')
  .onCreate(async (snap, context) => {
    const userData = snap.data();
    const userId = context.params.userId;

    console.log('New user created:', userId);

    try {
      // Create user stats document
      await admin.firestore()
        .collection('userStats')
        .doc(userId)
        .set({
          userId,
          postsCount: 0,
          likesCount: 0,
          followersCount: 0,
          followingCount: 0,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

      // Create user preferences
      await admin.firestore()
        .collection('userPreferences')
        .doc(userId)
        .set({
          userId,
          theme: 'light',
          notifications: {
            email: true,
            push: true,
            likes: true,
            comments: true,
            follows: true
          },
          privacy: {
            profileVisible: true,
            showOnlineStatus: true,
            allowMessages: true
          },
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

      // Send welcome email (using a service like SendGrid)
      await sendWelcomeEmail(userData.email, userData.displayName);

      console.log('User initialization completed for:', userId);
    } catch (error) {
      console.error('Error initializing user:', error);
    }
  });

// Firestore Trigger - Post created
exports.onPostCreated = functions.firestore
  .document('posts/{postId}')
  .onCreate(async (snap, context) => {
    const postData = snap.data();
    const postId = context.params.postId;

    console.log('New post created:', postId);

    try {
      // Update post count in tags
      if (postData.tags && postData.tags.length > 0) {
        const tagUpdates = postData.tags.map(tag =>
          admin.firestore()
            .collection('tags')
            .doc(tag)
            .set({
              name: tag,
              postsCount: admin.firestore.FieldValue.increment(1),
              updatedAt: admin.firestore.FieldValue.serverTimestamp()
            }, { merge: true })
        );

        await Promise.all(tagUpdates);
      }

      // Create post analytics
      await admin.firestore()
        .collection('postAnalytics')
        .doc(postId)
        .set({
          postId,
          viewsCount: 0,
          likesCount: 0,
          commentsCount: 0,
          sharesCount: 0,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

      // Notify followers (if this was a real app)
      // This would involve querying followers and sending notifications

      console.log('Post processing completed for:', postId);
    } catch (error) {
      console.error('Error processing post:', error);
    }
  });

// Authentication Trigger - User deleted
exports.onUserDeleted = functions.auth
  .user()
  .onDelete(async (user) => {
    const userId = user.uid;

    console.log('User deleted:', userId);

    try {
      // Delete user data from Firestore
      const batch = admin.firestore().batch();

      // Delete user document
      batch.delete(admin.firestore().collection('users').doc(userId));

      // Delete user stats
      batch.delete(admin.firestore().collection('userStats').doc(userId));

      // Delete user preferences
      batch.delete(admin.firestore().collection('userPreferences').doc(userId));

      // Delete user's posts
      const postsQuery = admin.firestore()
        .collection('posts')
        .where('authorId', '==', userId);

      const postsSnapshot = await postsQuery.get();
      postsSnapshot.forEach(doc => {
        batch.delete(doc.ref);
      });

      // Delete user's likes
      const likesQuery = admin.firestore()
        .collection('likes')
        .where('userId', '==', userId);

      const likesSnapshot = await likesQuery.get();
      likesSnapshot.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();

      // Delete user's files from Storage
      const bucket = admin.storage().bucket();
      const [files] = await bucket.getFiles({ prefix: \`users/\${userId}/\` });

      const deletePromises = files.map(file => file.delete());
      await Promise.all(deletePromises);

      console.log('User cleanup completed for:', userId);
    } catch (error) {
      console.error('Error cleaning up user data:', error);
    }
  });

// Storage Trigger - File uploaded
exports.onFileUploaded = functions.storage
  .object()
  .onFinalize(async (object) => {
    const filePath = object.name;
    const bucket = admin.storage().bucket();

    console.log('File uploaded:', filePath);

    try {
      // Generate thumbnail for images
      if (object.contentType.startsWith('image/') &&
          !filePath.includes('thumbnails/')) {

        const thumbnailPath = \`thumbnails/\${filePath}\`;
        const file = bucket.file(filePath);
        const thumbnailFile = bucket.file(thumbnailPath);

        // Download file
        const [fileBuffer] = await file.download();

        // Generate thumbnail (simplified - you'd use a library like sharp)
        const thumbnailBuffer = await generateThumbnail(fileBuffer);

        // Upload thumbnail
        await thumbnailFile.save(thumbnailBuffer, {
          metadata: {
            contentType: object.contentType,
            metadata: {
              originalFile: filePath,
              generatedAt: new Date().toISOString()
            }
          }
        });

        console.log('Thumbnail generated for:', filePath);
      }

      // Update file metadata in Firestore
      const fileDoc = {
        path: filePath,
        size: object.size,
        contentType: object.contentType,
        uploadedAt: admin.firestore.FieldValue.serverTimestamp(),
        userId: extractUserIdFromPath(filePath) // Custom function
      };

      await admin.firestore()
        .collection('files')
        .doc(generateFileId(filePath))
        .set(fileDoc);

    } catch (error) {
      console.error('Error processing uploaded file:', error);
    }
  });

// Scheduled Function - Daily cleanup
exports.dailyCleanup = functions.pubsub
  .schedule('0 2 * * *') // Run daily at 2 AM
  .timeZone('America/New_York')
  .onRun(async (context) => {
    console.log('Running daily cleanup...');

    try {
      // Delete old temporary files
      const bucket = admin.storage().bucket();
      const [files] = await bucket.getFiles({
        prefix: 'temp/',
      });

      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);

      const deletePromises = files
        .filter(file => {
          const createdTime = new Date(file.metadata.timeCreated);
          return createdTime < oneDayAgo;
        })
        .map(file => file.delete());

      await Promise.all(deletePromises);

      // Clean up old analytics data
      const analyticsQuery = admin.firestore()
        .collection('analytics')
        .where('createdAt', '<', oneDayAgo);

      const snapshot = await analyticsQuery.get();
      const batch = admin.firestore().batch();

      snapshot.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();

      console.log('Daily cleanup completed');
    } catch (error) {
      console.error('Error during daily cleanup:', error);
    }
  });

// Helper functions
async function sendWelcomeEmail(email, displayName) {
  // Implementation would use a service like SendGrid or Mailgun
  console.log(\`Welcome email sent to \${email} for user \${displayName}\`);
}

function extractUserIdFromPath(filePath) {
  // Extract user ID from file path like 'users/userId/filename'
  const parts = filePath.split('/');
  return parts.length >= 2 ? parts[1] : null;
}

function generateFileId(filePath) {
  // Generate a unique ID for the file document
  return filePath.replace(/\//g, '_').replace(/\./g, '_');
}

async function generateThumbnail(buffer) {
  // Simplified thumbnail generation
  // In a real app, you'd use a library like sharp
  return buffer; // Placeholder
}`
        },
        {
          title: "Advanced Function Patterns and Error Handling",
          code: `const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { PubSub } = require('@google-cloud/pubsub');

admin.initializeApp();
const pubsub = new PubSub();

// Advanced error handling and retry logic
exports.processPayment = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Authentication required');
  }

  const { amount, currency, paymentMethodId } = data;

  // Validate input
  if (!amount || amount <= 0) {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid amount');
  }

  if (!currency || !['USD', 'EUR', 'GBP'].includes(currency)) {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid currency');
  }

  try {
    // Process payment with retry logic
    const paymentResult = await processPaymentWithRetry({
      amount,
      currency,
      paymentMethodId,
      userId: context.auth.uid
    });

    // Log successful payment
    await logPaymentEvent(context.auth.uid, 'success', paymentResult);

    return {
      success: true,
      paymentId: paymentResult.id,
      amount: paymentResult.amount,
      currency: paymentResult.currency
    };

  } catch (error) {
    // Log failed payment
    await logPaymentEvent(context.auth.uid, 'failed', { error: error.message });

    // Throw appropriate error based on error type
    if (error.type === 'card_declined') {
      throw new functions.https.HttpsError('failed-precondition', 'Card was declined');
    } else if (error.type === 'insufficient_funds') {
      throw new functions.https.HttpsError('failed-precondition', 'Insufficient funds');
    } else {
      throw new functions.https.HttpsError('internal', 'Payment processing failed');
    }
  }
});

// Function with timeout and memory optimization
exports.generateReport = functions
  .runWith({
    timeoutSeconds: 540, // 9 minutes
    memory: '1GB'
  })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'Authentication required');
    }

    const { reportType, dateRange } = data;

    try {
      // Start report generation
      const reportId = await startReportGeneration(context.auth.uid, reportType, dateRange);

      // Publish message to Pub/Sub for async processing
      const topicName = 'report-generation';
      const messageData = {
        reportId,
        userId: context.auth.uid,
        reportType,
        dateRange
      };

      await pubsub.topic(topicName).publish(Buffer.from(JSON.stringify(messageData)));

      return {
        reportId,
        status: 'processing',
        message: 'Report generation started. You will be notified when complete.'
      };

    } catch (error) {
      console.error('Error starting report generation:', error);
      throw new functions.https.HttpsError('internal', 'Failed to start report generation');
    }
  });

// Pub/Sub triggered function for async report processing
exports.processReportGeneration = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB'
  })
  .pubsub.topic('report-generation')
  .onPublish(async (message) => {
    const { reportId, userId, reportType, dateRange } = message.json;

    console.log(\`Processing report \${reportId} for user \${userId}\`);

    try {
      // Update report status
      await updateReportStatus(reportId, 'processing');

      // Generate report data (this could take a long time)
      const reportData = await generateReportData(reportType, dateRange, userId);

      // Store report in Cloud Storage
      const bucket = admin.storage().bucket();
      const fileName = \`reports/\${userId}/\${reportId}.json\`;
      const file = bucket.file(fileName);

      await file.save(JSON.stringify(reportData), {
        metadata: {
          contentType: 'application/json',
          metadata: {
            reportId,
            userId,
            reportType,
            generatedAt: new Date().toISOString()
          }
        }
      });

      // Update report status and add download URL
      const [downloadURL] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      await updateReportStatus(reportId, 'completed', downloadURL);

      // Send notification to user
      await sendNotification(userId, 'report_ready', {
        reportId,
        downloadURL,
        reportType
      });

      console.log(\`Report \${reportId} completed successfully\`);

    } catch (error) {
      console.error(\`Error processing report \${reportId}:\`, error);

      // Update report status to failed
      await updateReportStatus(reportId, 'failed', null, error.message);

      // Send failure notification
      await sendNotification(userId, 'report_failed', {
        reportId,
        error: error.message
      });
    }
  });

// Function composition and middleware pattern
const withAuth = (handler) => async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Authentication required');
  }
  return handler(data, context);
};

const withValidation = (schema) => (handler) => async (data, context) => {
  const { error } = schema.validate(data);
  if (error) {
    throw new functions.https.HttpsError('invalid-argument', error.details[0].message);
  }
  return handler(data, context);
};

const withLogging = (handler) => async (data, context) => {
  const startTime = Date.now();
  console.log(\`Function called by user \${context.auth?.uid}\`);

  try {
    const result = await handler(data, context);
    const duration = Date.now() - startTime;
    console.log(\`Function completed in \${duration}ms\`);
    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(\`Function failed after \${duration}ms:\`, error);
    throw error;
  }
};

// Using function composition
const Joi = require('joi');

const updateProfileSchema = Joi.object({
  displayName: Joi.string().min(1).max(50),
  bio: Joi.string().max(500),
  website: Joi.string().uri()
});

exports.updateProfile = functions.https.onCall(
  withLogging(
    withAuth(
      withValidation(updateProfileSchema)(
        async (data, context) => {
          const userId = context.auth.uid;

          await admin.firestore()
            .collection('users')
            .doc(userId)
            .update({
              ...data,
              updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });

          return { message: 'Profile updated successfully' };
        }
      )
    )
  )
);

// Helper functions
async function processPaymentWithRetry(paymentData, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await processPayment(paymentData);
    } catch (error) {
      if (attempt === maxRetries || !isRetryableError(error)) {
        throw error;
      }
      console.log(\`Payment attempt \${attempt} failed, retrying...\`);
      await sleep(1000 * attempt); // Exponential backoff
    }
  }
}

function isRetryableError(error) {
  // Define which errors should be retried
  return ['network_error', 'timeout', 'server_error'].includes(error.type);
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function logPaymentEvent(userId, status, data) {
  await admin.firestore().collection('paymentLogs').add({
    userId,
    status,
    data,
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  });
}

async function startReportGeneration(userId, reportType, dateRange) {
  const reportRef = await admin.firestore().collection('reports').add({
    userId,
    reportType,
    dateRange,
    status: 'pending',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  return reportRef.id;
}

async function updateReportStatus(reportId, status, downloadURL = null, error = null) {
  const updateData = {
    status,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  };

  if (downloadURL) updateData.downloadURL = downloadURL;
  if (error) updateData.error = error;

  await admin.firestore()
    .collection('reports')
    .doc(reportId)
    .update(updateData);
}

async function sendNotification(userId, type, data) {
  // Implementation would integrate with FCM or another notification service
  console.log(\`Sending \${type} notification to user \${userId}:\`, data);
}

// Placeholder functions (would be implemented with actual services)
async function processPayment(data) {
  // Integration with payment processor like Stripe
  throw new Error('Payment processing not implemented');
}

async function generateReportData(reportType, dateRange, userId) {
  // Generate actual report data based on type
  return { reportType, dateRange, userId, data: [] };
}`
        }
      ]
    },
    {
      id: "firebase-hosting-deployment",
      title: "Firebase Hosting and Application Deployment",
      content: "Firebase Hosting provides fast, secure, and reliable web hosting for static and dynamic content. It offers global CDN, SSL certificates, and seamless integration with other Firebase services. Hosting supports single-page applications, static sites, and can serve dynamic content through Cloud Functions.\n\n**Hosting Features**:\n- **Global CDN**: Fast content delivery worldwide\n- **SSL Certificates**: Automatic HTTPS encryption\n- **Custom Domains**: Support for custom domain names\n- **Rewrites and Redirects**: URL routing and redirection rules\n- **Headers Configuration**: Custom HTTP headers\n- **Caching**: Intelligent caching strategies\n\n**Deployment Process**:\n- **Build Optimization**: Production-ready builds\n- **Asset Optimization**: File compression and optimization\n- **Deploy Command**: Firebase CLI deployment\n- **Version Control**: Rollback and version management\n- **Preview Channels**: Test deployments before production\n\n**Performance Optimization**:\n- **Lazy Loading**: Code splitting and lazy loading\n- **Image Optimization**: Automatic image compression\n- **Caching Strategies**: Browser and CDN caching\n- **Bundle Analysis**: Bundle size optimization\n- **Preloading**: Resource preloading strategies\n\n**Security Features**:\n- **HTTPS Enforcement**: Automatic SSL/TLS\n- **CSP Headers**: Content Security Policy\n- **HSTS**: HTTP Strict Transport Security\n- **Security Rules**: Integration with Firebase Security Rules\n\n**Best Practices**:\n- Use production builds for deployment\n- Implement proper caching strategies\n- Monitor performance metrics\n- Use preview channels for testing\n- Implement proper error pages\n- Configure redirects for SEO\n- Use Firebase Analytics for insights\n- Regularly update dependencies",
      keyTopics: [
        "Firebase Hosting setup and configuration",
        "Deployment process and optimization",
        "Custom domains and SSL certificates",
        "Performance monitoring and optimization"
      ],
      practicalExercises: [
        "Deploy a React application to Firebase Hosting",
        "Configure custom domain and SSL certificate",
        "Set up preview channels for testing",
        "Implement caching and performance optimization"
      ],
      codeExamples: [
        {
          title: "Firebase Hosting Configuration",
          code: `// firebase.json - Firebase Hosting configuration
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "/api/**",
        "function": "api"
      },
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "redirects": [
      {
        "source": "/old-page",
        "destination": "/new-page",
        "type": 301
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp|ico)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "/api/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache"
          }
        ]
      },
      {
        "source": "**",
        "headers": [
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          },
          {
            "key": "X-Frame-Options",
            "value": "DENY"
          },
          {
            "key": "X-XSS-Protection",
            "value": "1; mode=block"
          },
          {
            "key": "Referrer-Policy",
            "value": "strict-origin-when-cross-origin"
          }
        ]
      }
    ],
    "trailingSlash": false,
    "appAssociation": "AUTO",
    "cleanUrls": true
  },
  "functions": {
    "source": "functions",
    "runtime": "nodejs18"
  },
  "emulators": {
    "auth": {
      "port": 9099
    },
    "firestore": {
      "port": 8080
    },
    "functions": {
      "port": 5001
    },
    "hosting": {
      "port": 5000
    },
    "storage": {
      "port": 9199
    }
  }
}

// .firebaserc - Firebase project configuration
{
  "projects": {
    "default": "your-project-id",
    "production": "your-project-id",
    "staging": "your-project-id-staging"
  },
  "targets": {
    "your-project-id": {
      "hosting": {
        "production": [
          "your-project-id"
        ],
        "staging": [
          "your-project-id-staging"
        ]
      }
    }
  }
}`
        },
        {
          title: "Deployment Scripts and Automation",
          code: `// package.json scripts for Firebase deployment
{
  "scripts": {
    "build": "vite build",
    "build:staging": "vite build --mode staging",
    "build:production": "vite build --mode production",
    "deploy": "npm run build && firebase deploy --only hosting",
    "deploy:staging": "npm run build:staging && firebase deploy --only hosting:staging",
    "deploy:production": "npm run build:production && firebase deploy --only hosting:production",
    "deploy:functions": "firebase deploy --only functions",
    "deploy:all": "npm run build && firebase deploy",
    "preview": "npm run build && firebase hosting:channel:deploy preview",
    "preview:staging": "npm run build:staging && firebase hosting:channel:deploy staging-preview",
    "serve": "firebase serve",
    "emulate": "firebase emulators:start",
    "test:emulate": "firebase emulators:exec --only firestore,functions 'npm test'"
  }
}

// deploy.js - Advanced deployment script
const { execSync } = require('child_process');
const fs = require('fs');

function runCommand(command, description) {
  console.log(\`🚀 \${description}...\`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(\`✅ \${description} completed\`);
  } catch (error) {
    console.error(\`❌ \${description} failed:\`, error);
    process.exit(1);
  }
}

function checkEnvironment() {
  console.log('🔍 Checking environment...');

  // Check if Firebase CLI is installed
  try {
    execSync('firebase --version', { stdio: 'pipe' });
  } catch (error) {
    console.error('❌ Firebase CLI is not installed. Run: npm install -g firebase-tools');
    process.exit(1);
  }

  // Check if user is logged in
  try {
    execSync('firebase projects:list', { stdio: 'pipe' });
  } catch (error) {
    console.error('❌ Not logged in to Firebase. Run: firebase login');
    process.exit(1);
  }

  console.log('✅ Environment check passed');
}

function validateBuild() {
  console.log('🔍 Validating build...');

  if (!fs.existsSync('dist')) {
    console.error('❌ Build directory not found. Run build first.');
    process.exit(1);
  }

  const indexHtml = fs.readFileSync('dist/index.html', 'utf8');
  if (!indexHtml.includes('<title>')) {
    console.warn('⚠️  index.html might be missing title tag');
  }

  console.log('✅ Build validation passed');
}

function backupCurrentVersion() {
  console.log('💾 Creating backup...');

  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    execSync(\`firebase hosting:clone \${process.env.FIREBASE_PROJECT_ID}:live backup-\${timestamp}\`, { stdio: 'pipe' });
    console.log('✅ Backup created');
  } catch (error) {
    console.warn('⚠️  Backup creation failed, continuing with deployment');
  }
}

function runTests() {
  console.log('🧪 Running tests...');

  try {
    execSync('npm test', { stdio: 'inherit' });
    console.log('✅ Tests passed');
  } catch (error) {
    console.error('❌ Tests failed');
    process.exit(1);
  }
}

function deployToStaging() {
  console.log('🚀 Deploying to staging...');

  runCommand('npm run build:staging', 'Building for staging');
  runCommand('firebase use staging', 'Switching to staging project');
  runCommand('firebase deploy --only hosting', 'Deploying to staging');

  console.log('✅ Staging deployment completed');
  console.log('🌐 Staging URL: https://staging-project-id.web.app');
}

function deployToProduction() {
  console.log('🚀 Deploying to production...');

  // Get confirmation for production deployment
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Are you sure you want to deploy to production? (yes/no): ', (answer) => {
    if (answer.toLowerCase() !== 'yes') {
      console.log('❌ Production deployment cancelled');
      rl.close();
      return;
    }

    rl.close();

    try {
      runCommand('npm run build:production', 'Building for production');
      runCommand('firebase use production', 'Switching to production project');

      // Create backup before production deployment
      backupCurrentVersion();

      runCommand('firebase deploy --only hosting', 'Deploying to production');

      console.log('✅ Production deployment completed');
      console.log('🌐 Production URL: https://your-project-id.web.app');

      // Send deployment notification
      sendDeploymentNotification('production', 'success');

    } catch (error) {
      sendDeploymentNotification('production', 'failed', error.message);
      throw error;
    }
  });
}

function sendDeploymentNotification(environment, status, error = null) {
  // Implementation would send notifications via email, Slack, etc.
  console.log(\`📢 Deployment to \${environment} \${status}\`);

  if (error) {
    console.error('Deployment error:', error);
  }
}

// Main deployment process
const environment = process.argv[2] || 'staging';

console.log(\`🚀 Starting deployment to \${environment}\`);

checkEnvironment();
validateBuild();

if (environment === 'production') {
  runTests(); // Run tests for production
}

if (environment === 'staging') {
  deployToStaging();
} else if (environment === 'production') {
  deployToProduction();
} else {
  console.error(\`❌ Invalid environment: \${environment}. Use 'staging' or 'production'\`);
  process.exit(1);
}

// Usage:
// node deploy.js staging    # Deploy to staging
// node deploy.js production # Deploy to production`
        },
        {
          title: "Performance Monitoring and Optimization",
          code: `// Performance monitoring setup
import { getPerformance } from 'firebase/performance';
import { getAnalytics } from 'firebase/analytics';

// Initialize Performance Monitoring
const perf = getPerformance(app);
const analytics = getAnalytics(app);

// Custom performance tracing
export const traceApiCall = async (apiName, apiCall) => {
  const trace = perf.trace(apiName);
  trace.start();

  try {
    const result = await apiCall();
    trace.stop();
    return result;
  } catch (error) {
    trace.stop();
    throw error;
  }
};

// Monitor component render performance
import { useEffect } from 'react';

export const usePerformanceTrace = (componentName) => {
  useEffect(() => {
    const trace = perf.trace(\`render_\${componentName}\`);
    trace.start();

    return () => {
      trace.stop();
    };
  }, [componentName]);
};

// Monitor custom metrics
export const recordCustomMetric = (metricName, value) => {
  // Record custom metric
  analytics.logEvent('custom_metric', {
    metric_name: metricName,
    value: value
  });
};

// Bundle analysis and optimization
// vite.config.js
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          vendor: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          ui: ['lucide-react', 'tailwindcss']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  plugins: [
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ]
});

// Service worker for caching
// public/sw.js
const CACHE_NAME = 'my-app-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Lighthouse CI configuration
// .lighthouseci/config.json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "startServerCommand": "npm run serve",
      "startServerReadyPattern": "Local development server",
      "url": ["http://localhost:5000"]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}],
        "categories:pwa": "off"
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}

// Performance monitoring hook
import { useEffect, useState } from 'react';

export const usePageLoadPerformance = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const navigation = entries.find(entry => entry.entryType === 'navigation');

      if (navigation) {
        setMetrics({
          dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
          tcpConnect: navigation.connectEnd - navigation.connectStart,
          serverResponse: navigation.responseStart - navigation.requestStart,
          pageLoad: navigation.loadEventEnd - navigation.navigationStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart
        });
      }
    });

    observer.observe({ entryTypes: ['navigation'] });

    return () => observer.disconnect();
  }, []);

  return metrics;
};

// Error boundary with performance tracking
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to Firebase Analytics
    analytics.logEvent('exception', {
      description: error.toString(),
      fatal: false,
      customData: {
        componentStack: errorInfo.componentStack
      }
    });

    // Log to console for development
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// Web vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export const reportWebVitals = (metric) => {
  // Send to Firebase Analytics
  analytics.logEvent('web_vitals', {
    name: metric.name,
    value: Math.round(metric.value),
    id: metric.id,
    delta: metric.delta
  });

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
};

// Initialize web vitals tracking
if (typeof window !== 'undefined') {
  getCLS(reportWebVitals);
  getFID(reportWebVitals);
  getFCP(reportWebVitals);
  getLCP(reportWebVitals);
  getTTFB(reportWebVitals);
}`
        }
      ]
    }
  ],
  projects: [
    {
      title: "Firebase Social Media App",
      description: "Build a complete social media application using Firebase with real-time posts, user authentication, file uploads, and push notifications. Implement features like user profiles, following system, likes, comments, and real-time chat."
    },
    {
      title: "Firebase E-commerce Platform",
      description: "Create an e-commerce platform with Firebase backend including product catalog, shopping cart, payment processing, order management, and real-time inventory tracking. Implement user reviews, wishlists, and admin dashboard."
    },
    {
      title: "Firebase Task Management System",
      description: "Develop a collaborative task management application with real-time updates, team management, file attachments, and progress tracking. Include features like project boards, time tracking, and automated notifications."
    },
    {
      title: "Firebase Analytics Dashboard",
      description: "Build a comprehensive analytics dashboard that aggregates data from multiple Firebase services. Include real-time metrics, custom reports, data visualization, and automated insights generation."
    },
    {
      title: "Firebase IoT Monitoring System",
      description: "Create an IoT device monitoring system using Firebase for data collection, real-time alerts, device management, and historical data analysis. Implement features like device registration, firmware updates, and predictive maintenance."
    }
  ],
  assessments: [
    {
      type: "quiz",
      questions: [
        {
          question: "What is the primary purpose of Firestore in Firebase?",
          options: [
            "File storage and serving",
            "Real-time NoSQL database",
            "User authentication",
            "Serverless function execution"
          ],
          correctAnswer: "Real-time NoSQL database"
        },
        {
          question: "Which Firebase service is used for user authentication?",
          options: [
            "Firestore",
            "Firebase Auth",
            "Cloud Storage",
            "Cloud Functions"
          ],
          correctAnswer: "Firebase Auth"
        },
        {
          question: "What type of security rules are used in Firestore?",
          options: [
            "SQL-based rules",
            "JSON-based rules",
            "JavaScript functions",
            "YAML configuration files"
          ],
          correctAnswer: "JavaScript functions"
        },
        {
          question: "Which Firebase service provides file storage capabilities?",
          options: [
            "Firestore",
            "Firebase Auth",
            "Cloud Storage",
            "Cloud Functions"
          ],
          correctAnswer: "Cloud Storage"
        },
        {
          question: "What is the maximum timeout for Firebase Cloud Functions?",
          options: [
            "30 seconds",
            "60 seconds",
            "540 seconds",
            "900 seconds"
          ],
          correctAnswer: "540 seconds"
        }
      ]
    },
    {
      type: "evaluation",
      questions: [
        {
          question: "Design a Firebase architecture for a real-time chat application. Explain your choice of database structure, security rules, and real-time synchronization strategy.",
          options: [],
          correctAnswer: ""
        },
        {
          question: "Compare and contrast Firestore and Realtime Database. When would you choose one over the other for different types of applications?",
          options: [],
          correctAnswer: ""
        },
        {
          question: "Explain how to implement offline data synchronization in a Firebase application. What are the key considerations and potential challenges?",
          options: [],
          correctAnswer: ""
        }
      ]
    }
  ],
  aiPrompts: [
    "How do I set up Firebase in my project?",
    "How do I implement user authentication with Firebase?",
    "How do I use Firestore for data storage?",
    "How do I upload files to Firebase Storage?",
    "How do I create Firebase Cloud Functions?",
    "How do I deploy my app to Firebase Hosting?",
    "How do I implement real-time features with Firebase?",
    "How do I secure my Firebase application?",
    "How do I handle offline data in Firebase?",
    "How do I monitor Firebase performance?",
    "How do I implement Firebase Analytics?",
    "How do I use Firebase Security Rules?",
    "How do I optimize Firebase costs?",
    "How do I handle Firebase errors?",
    "How do I migrate data in Firebase?"
  ],
  resources: [
    { name: "Firebase Official Documentation", url: "https://firebase.google.com/docs" },
    { name: "Firestore Documentation", url: "https://firebase.google.com/docs/firestore" },
    { name: "Firebase Auth Documentation", url: "https://firebase.google.com/docs/auth" },
    { name: "Cloud Storage Documentation", url: "https://firebase.google.com/docs/storage" },
    { name: "Cloud Functions Documentation", url: "https://firebase.google.com/docs/functions" },
    { name: "Firebase Hosting Documentation", url: "https://firebase.google.com/docs/hosting" },
    { name: "Firebase Security Rules", url: "https://firebase.google.com/docs/security" },
    { name: "Firebase Performance Monitoring", url: "https://firebase.google.com/docs/perf-mon" }
  ],
  toolsRequired: [
    "Node.js (v16 or higher)",
    "Firebase CLI",
    "Modern web browser",
    "Code editor (VS Code recommended)",
    "Git for version control",
    "Firebase Admin SDK (for server-side operations)",
    "Postman or similar API testing tool",
    "Lighthouse for performance testing"
  ],
  bestPractices: [
    "Use separate Firebase projects for development, staging, and production",
    "Implement proper security rules for all Firebase services",
    "Use Firebase Auth for user authentication and authorization",
    "Design Firestore data structure based on query patterns",
    "Implement proper error handling for all Firebase operations",
    "Use Firebase Cloud Functions for server-side logic",
    "Monitor Firebase usage and costs regularly",
    "Implement offline data synchronization when appropriate",
    "Use Firebase Hosting for fast, secure web deployment",
    "Implement proper data validation and sanitization",
    "Use Firebase Analytics for user behavior insights",
    "Optimize bundle sizes and loading performance",
    "Implement proper caching strategies",
    "Use Firebase Performance Monitoring for optimization",
    "Regularly update Firebase SDKs and dependencies",
    "Implement proper logging and monitoring",
    "Use Firebase Security Rules effectively",
    "Design for scalability from the beginning",
    "Implement proper backup and recovery strategies",
    "Use Firebase Admin SDK for server-side operations securely"
  ],
  commonPitfalls: [
    "Exposing Firebase configuration in client-side code",
    "Not implementing proper security rules",
    "Designing Firestore structure without considering query patterns",
    "Not handling Firebase errors properly",
    "Ignoring offline data synchronization",
    "Not monitoring Firebase costs and usage",
    "Using Firebase Auth tokens insecurely",
    "Not implementing proper data validation",
    "Ignoring Firebase performance optimization",
    "Not using Firebase Admin SDK securely",
    "Designing monolithic Cloud Functions",
    "Not implementing proper error boundaries",
    "Ignoring Firebase security best practices",
    "Not testing Firebase integrations thoroughly",
    "Not implementing proper backup strategies",
    "Using deprecated Firebase features",
    "Not monitoring function execution times",
    "Ignoring Firebase rate limits",
    "Not implementing proper authentication flows",
    "Using Firebase for inappropriate use cases"
  ],
  careerRelevance: "Firebase is one of the most popular Backend-as-a-Service platforms, used by millions of developers worldwide. Companies like Google, Facebook, Spotify, and thousands of startups rely on Firebase for their applications. Firebase developers are in high demand for full-stack development roles, with competitive salaries and excellent career prospects. The platform's comprehensive feature set makes Firebase developers versatile and valuable in modern web and mobile development ecosystems."
};

export default firebaseContent;