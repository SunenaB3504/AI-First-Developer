export default {
  id: "kotlin",
  tier: 5,
  name: "Kotlin for Android Development",
  description: "Master Kotlin programming for Android development with modern architecture patterns, Jetpack components, and best practices for building robust mobile applications.",
  difficulty: "Advanced",
  estimatedHours: 40,
  prerequisites: ["javascript", "react", "nodejs"],
  learningObjectives: [
    "Master Kotlin syntax, null safety, and functional programming concepts",
    "Build Android apps using modern architecture patterns (MVVM, Repository)",
    "Implement Jetpack components (ViewModel, LiveData, Room, Navigation)",
    "Create responsive UIs with Jetpack Compose and Material Design",
    "Handle asynchronous operations with Coroutines and Flow",
    "Implement dependency injection with Hilt/Dagger",
    "Integrate networking with Retrofit and OkHttp",
    "Write comprehensive unit and integration tests",
    "Optimize app performance and memory management",
    "Implement security best practices and data protection",
    "Deploy Android applications to Google Play Store",
    "Debug and troubleshoot Android applications effectively",
    "Implement offline data synchronization",
    "Use Firebase services for authentication and data persistence",
    "Create custom views and handle platform-specific features"
  ],
  sections: [
    {
      id: "kotlin-fundamentals",
      title: "Kotlin Fundamentals",
      content: "Kotlin is a modern programming language that runs on the JVM and is fully interoperable with Java. It offers null safety, concise syntax, and powerful features for Android development.\n\n**Null Safety**: Kotlin's type system prevents null pointer exceptions through nullable and non-nullable types.\n\n**Data Classes**: Automatic generation of boilerplate code for data objects with equals(), hashCode(), toString(), and copy() methods.\n\n**Extension Functions**: Add methods to existing classes without inheritance, enabling clean and readable code.\n\n**Sealed Classes**: Represent restricted class hierarchies, perfect for state management in Android apps.\n\n**Coroutines**: Asynchronous programming with suspend functions for non-blocking operations.\n\n**Inline Functions**: Zero-cost abstractions with inlining for performance-critical code.\n\n**Operator Overloading**: Define custom operators for domain-specific types.\n\n**Smart Casts**: Automatic type casting after type checks, reducing boilerplate code.\n\n**String Templates**: Embed expressions directly in strings for cleaner string formatting.\n\n**Collections API**: Rich set of functional programming operations on collections.",
      keyTopics: [
        "Kotlin syntax basics (variables, functions, classes)",
        "Null safety (nullable types, safe calls, Elvis operator)",
        "Collections and generics",
        "Control flow (when expressions, loops, ranges)",
        "Object-oriented programming (classes, interfaces, inheritance)",
        "Functional programming (lambdas, higher-order functions)",
        "Data classes and sealed classes",
        "Extension functions and properties",
        "Operator overloading and conventions",
        "Visibility modifiers and packages"
      ],
      practicalExercises: [
        "Set up Android Studio with Kotlin support",
        "Create basic Kotlin programs with classes and functions",
        "Implement null-safe operations and error handling",
        "Work with collections using functional programming",
        "Create data classes for model objects",
        "Write extension functions for existing classes",
        "Use when expressions for complex conditional logic",
        "Implement sealed classes for state management",
        "Practice functional programming with lambdas",
        "Handle exceptions and custom error types"
      ],
      codeExamples: [
        {
          title: "Kotlin Basics and Null Safety",
          language: "kotlin",
          code: `package com.example.kotlinbasics

// Data class with automatic methods generation
data class User(
    val id: Long,
    val name: String,
    val email: String,
    val age: Int? = null // Nullable property
)

// Sealed class for representing different states
sealed class Result<out T> {
    data class Success<out T>(val data: T) : Result<T>()
    data class Error(val exception: Exception) : Result<Nothing>()
    object Loading : Result<Nothing>()
}

class UserRepository {
    private val users = mutableListOf<User>()

    // Extension function
    fun List<User>.findByEmail(email: String): User? {
        return this.find { it.email == email }
    }

    // Function with null safety
    fun getUserById(id: Long): User? {
        return users.find { it.id == id }
    }

    // Safe call operator and Elvis operator
    fun getUserName(id: Long): String {
        val user = getUserById(id)
        return user?.name ?: "Unknown User" // Elvis operator
    }

    // Let function for null checking
    fun processUser(id: Long) {
        getUserById(id)?.let { user ->
            println("Processing user: \${user.name}")
            // User is non-null here
        } ?: run {
            println("User not found")
        }
    }

    // When expression (Kotlin's switch)
    fun getUserCategory(user: User?): String {
        return when {
            user == null -> "Unknown"
            user.age == null -> "Age not specified"
            user.age < 18 -> "Minor"
            user.age < 65 -> "Adult"
            else -> "Senior"
        }
    }

    // Collection operations
    fun getAdultUsers(): List<User> {
        return users.filter { it.age ?: 0 >= 18 }
            .sortedBy { it.name }
    }

    // Higher-order function
    fun filterUsers(predicate: (User) -> Boolean): List<User> {
        return users.filter(predicate)
    }
}

fun main() {
    val repository = UserRepository()

    // Using collection operations
    val adultUsers = repository.getAdultUsers()
    println("Found \${adultUsers.size} adult users")

    // Using higher-order function
    val gmailUsers = repository.filterUsers { it.email.endsWith("@gmail.com") }
    println("Found \${gmailUsers.size} Gmail users")

    // Demonstrating null safety
    println(repository.getUserName(1)) // Should return "Unknown User"
}`
        },
        {
          title: "Advanced Kotlin Features",
          language: "kotlin",
          code: `package com.example.kotlinadvanced

import kotlin.properties.Delegates

// Singleton with object declaration
object DatabaseManager {
    private val connections = mutableListOf<String>()

    fun addConnection(connection: String) {
        connections.add(connection)
        println("Added connection: $connection")
    }

    fun getConnectionCount(): Int = connections.size
}

// Companion object (static members in Kotlin)
class NetworkUtils {
    companion object {
        const val TIMEOUT = 5000
        const val RETRY_COUNT = 3

        fun isNetworkAvailable(): Boolean {
            // Implementation would check network status
            return true
        }

        fun formatUrl(baseUrl: String, endpoint: String): String {
            return "$baseUrl/$endpoint".removeSuffix("/")
        }
    }
}

// Operator overloading
data class Point(val x: Int, val y: Int) {
    operator fun plus(other: Point): Point {
        return Point(x + other.x, y + other.y)
    }

    operator fun minus(other: Point): Point {
        return Point(x - other.x, y - other.y)
    }

    operator fun times(scalar: Int): Point {
        return Point(x * scalar, y * scalar)
    }

    override fun toString(): String = "($x, $y)"
}

// Inline functions for performance
inline fun measureTimeMillis(block: () -> Unit): Long {
    val start = System.currentTimeMillis()
    block()
    return System.currentTimeMillis() - start
}

// Generic functions with constraints
inline fun <reified T> List<T>.findInstanceOf(): T? {
    return this.find { it is T } as? T
}

// Property delegation
class UserPreferences {
    var theme: String by Delegates.observable("light") { _, old, new ->
        println("Theme changed from $old to $new")
    }

    var notificationsEnabled: Boolean by Delegates.vetoable(true) { _, _, new ->
        // Don't allow disabling notifications
        new
    }
}

// Lazy initialization
class ExpensiveResource {
    val data: String by lazy {
        println("Initializing expensive resource...")
        // Simulate expensive operation
        Thread.sleep(1000)
        "Expensive data loaded"
    }
}

// Inline classes (value classes) for performance
@JvmInline
value class UserId(val value: Long)

// Destructuring declarations
data class Person(val name: String, val age: Int, val city: String)

fun processPerson(person: Person) {
    val (name, age, city) = person
    println("$name is $age years old and lives in $city")
}

// Scope functions
fun demonstrateScopeFunctions() {
    val person = Person("Alice", 30, "New York")

    // let - execute block with non-null value
    person.let { p ->
        println("\${p.name} is \${p.age} years old")
    }

    // also - execute block and return the object
    val result = person.also { p ->
        println("Processing \${p.name}")
    }

    // apply - configure object and return it
    val configuredPerson = Person("Bob", 25, "London").apply {
        // 'this' is the person object
        println("Configured $name from $city")
    }

    // run - execute block with object as receiver
    val description = person.run {
        "$name lives in $city and is $age years old"
    }

    // with - execute block with object as receiver (static function)
    with(person) {
        println("$name's info: age=$age, city=$city")
    }
}

fun main() {
    // Demonstrate operator overloading
    val p1 = Point(1, 2)
    val p2 = Point(3, 4)
    val sum = p1 + p2
    val scaled = p1 * 3
    println("Sum: $sum, Scaled: $scaled")

    // Measure execution time
    val time = measureTimeMillis {
        Thread.sleep(100)
    }
    println("Operation took \${time}ms")

    // Demonstrate lazy loading
    val resource = ExpensiveResource()
    println("Resource created")
    println(resource.data) // First access triggers initialization
    println(resource.data) // Second access uses cached value

    // Demonstrate scope functions
    demonstrateScopeFunctions()

    // Property delegation
    val prefs = UserPreferences()
    prefs.theme = "dark" // Triggers observable
    prefs.notificationsEnabled = false // Won't change due to vetoable
}`
        }
      ]
    },
    {
      id: "android-development-basics",
      title: "Android Development Basics",
      content: "Android development with Kotlin leverages modern Android architecture components and Jetpack libraries for building robust, maintainable applications.\n\n**Activities**: Entry points for user interaction, managing the UI and user input.\n\n**Fragments**: Reusable UI components that can be combined to create complex interfaces.\n\n**Views and ViewGroups**: Building blocks of Android UI, from simple buttons to complex layouts.\n\n**Intents**: Messaging objects for starting activities, services, and broadcasting events.\n\n**Permissions**: Requesting and managing access to device features and user data.\n\n**Manifest**: Configuration file declaring app components, permissions, and metadata.\n\n**Resources**: Managing strings, colors, dimensions, and other app assets.\n\n**Context**: Interface to global application environment and Android system services.",
      keyTopics: [
        "Activity lifecycle and state management",
        "Fragment creation and lifecycle",
        "View binding and data binding",
        "Intent creation and handling",
        "Permission management",
        "Android manifest configuration",
        "Resource management and localization",
        "Context usage and application class"
      ],
      practicalExercises: [
        "Create a basic Android app with Kotlin",
        "Implement activity navigation with intents",
        "Build fragments for modular UI components",
        "Handle runtime permissions",
        "Implement view binding",
        "Create custom views",
        "Manage app resources and themes",
        "Handle configuration changes",
        "Implement deep linking",
        "Create launcher shortcuts"
      ],
      codeExamples: [
        {
          title: "Basic Android Activity with Kotlin",
          language: "kotlin",
          code: `package com.example.androidbasics

import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.example.androidbasics.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    // Permission request launcher
    private val requestPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { isGranted ->
        if (isGranted) {
            showToast("Permission granted")
            openCamera()
        } else {
            showToast("Permission denied")
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // View binding setup
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupUI()
        handleIntent(intent)
    }

    private fun setupUI() {
        binding.apply {
            // Button click listeners
            cameraButton.setOnClickListener {
                checkCameraPermission()
            }

            navigateButton.setOnClickListener {
                navigateToSecondActivity()
            }

            shareButton.setOnClickListener {
                shareText()
            }

            // Text input handling
            nameInput.setOnEditorActionListener { _, _, _ ->
                val name = nameInput.text.toString()
                if (name.isNotBlank()) {
                    greetingText.text = "Hello, $name!"
                    nameInput.text.clear()
                }
                true
            }
        }
    }

    private fun checkCameraPermission() {
        when {
            ContextCompat.checkSelfPermission(
                this,
                android.Manifest.permission.CAMERA
            ) == PackageManager.PERMISSION_GRANTED -> {
                openCamera()
            }
            else -> {
                requestPermissionLauncher.launch(android.Manifest.permission.CAMERA)
            }
        }
    }

    private fun openCamera() {
        // Open camera or handle camera functionality
        showToast("Camera opened")
    }

    private fun navigateToSecondActivity() {
        val intent = Intent(this, SecondActivity::class.java).apply {
            putExtra("GREETING", "Hello from MainActivity!")
            putExtra("TIMESTAMP", System.currentTimeMillis())
        }
        startActivity(intent)
    }

    private fun shareText() {
        val text = binding.nameInput.text.toString()
        if (text.isBlank()) {
            showToast("Please enter some text to share")
            return
        }

        val intent = Intent(Intent.ACTION_SEND).apply {
            type = "text/plain"
            putExtra(Intent.EXTRA_TEXT, text)
        }

        val chooser = Intent.createChooser(intent, "Share via")
        startActivity(chooser)
    }

    private fun handleIntent(intent: Intent?) {
        intent?.let {
            val greeting = it.getStringExtra("GREETING")
            val timestamp = it.getLongExtra("TIMESTAMP", 0)

            if (greeting != null) {
                showToast("$greeting (timestamp: $timestamp)")
            }
        }
    }

    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        // Save UI state
        outState.putString("GREETING_TEXT", binding.greetingText.text.toString())
        outState.putString("INPUT_TEXT", binding.nameInput.text.toString())
    }

    override fun onRestoreInstanceState(savedInstanceState: Bundle) {
        super.onRestoreInstanceState(savedInstanceState)
        // Restore UI state
        savedInstanceState.getString("GREETING_TEXT")?.let {
            binding.greetingText.text = it
        }
        savedInstanceState.getString("INPUT_TEXT")?.let {
            binding.nameInput.setText(it)
        }
    }
}`
        },
        {
          title: "Android Manifest Configuration",
          language: "xml",
          code: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.androidbasics">

    <!-- Internet permission for network operations -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <!-- Camera permission -->
    <uses-permission android:name="android.permission.CAMERA" />

    <!-- Storage permissions -->
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"
        android:maxSdkVersion="28" />

    <!-- Location permissions -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

    <!-- Features declaration -->
    <uses-feature
        android:name="android.hardware.camera"
        android:required="false" />
    <uses-feature
        android:name="android.hardware.location"
        android:required="false" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme"
        android:usesCleartextTraffic="true">

        <!-- Main Activity -->
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <!-- Second Activity -->
        <activity
            android:name=".SecondActivity"
            android:exported="false" />

        <!-- Service for background tasks -->
        <service
            android:name=".MyBackgroundService"
            android:exported="false" />

        <!-- Broadcast Receiver -->
        <receiver
            android:name=".MyBroadcastReceiver"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.BOOT_COMPLETED" />
                <action android:name="android.intent.action.AIRPLANE_MODE" />
            </intent-filter>
        </receiver>

        <!-- Content Provider -->
        <provider
            android:name=".MyContentProvider"
            android:authorities="com.example.androidbasics.provider"
            android:exported="false" />

        <!-- Meta-data -->
        <meta-data
            android:name="com.google.android.gms.version"
            android:value="@integer/google_play_services_version" />

    </application>

</manifest>`
        }
      ]
    },
    {
      id: "modern-android-architecture",
      title: "Modern Android Architecture",
      content: "Modern Android development follows architectural patterns that promote separation of concerns, testability, and maintainability.\n\n**MVVM (Model-View-ViewModel)**: Separates UI logic from business logic using ViewModels.\n\n**Repository Pattern**: Abstracts data sources and provides a clean API for data access.\n\n**Clean Architecture**: Organizes code into layers with clear responsibilities and dependencies.\n\n**SOLID Principles**: Guidelines for writing maintainable and extensible code.\n\n**Dependency Injection**: Provides dependencies to classes instead of creating them internally.\n\n**Observer Pattern**: Reactive programming for handling data changes and UI updates.\n\n**Single Source of Truth**: Centralized data management to avoid inconsistencies.\n\n**Unidirectional Data Flow**: Predictable state management with clear data flow direction.",
      keyTopics: [
        "MVVM architecture pattern implementation",
        "Repository pattern for data management",
        "Clean architecture principles",
        "Dependency injection with Hilt",
        "LiveData and StateFlow for reactive programming",
        "ViewModel lifecycle management",
        "Room database integration",
        "WorkManager for background tasks",
        "Navigation component usage",
        "Testing architecture components"
      ],
      practicalExercises: [
        "Implement MVVM pattern in an Android app",
        "Create repository classes for data management",
        "Set up Hilt for dependency injection",
        "Use LiveData for reactive UI updates",
        "Implement Room database with DAOs",
        "Create ViewModels with lifecycle awareness",
        "Set up navigation with NavController",
        "Implement WorkManager for background tasks",
        "Write unit tests for ViewModels",
        "Create integration tests for repositories"
      ],
      codeExamples: [
        {
          title: "MVVM Architecture with ViewModel and LiveData",
          language: "kotlin",
          code: `package com.example.architecture

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch

// Model
data class User(
    val id: Long,
    val name: String,
    val email: String,
    val isActive: Boolean = true
)

// Repository
class UserRepository(private val userDao: UserDao) {

    suspend fun getUsers(): List<User> {
        return userDao.getAllUsers()
    }

    suspend fun getUserById(id: Long): User? {
        return userDao.getUserById(id)
    }

    suspend fun insertUser(user: User) {
        userDao.insertUser(user)
    }

    suspend fun updateUser(user: User) {
        userDao.updateUser(user)
    }

    suspend fun deleteUser(user: User) {
        userDao.deleteUser(user)
    }
}

// ViewModel
class UserViewModel(private val userRepository: UserRepository) : ViewModel() {

    private val _users = MutableLiveData<List<User>>()
    val users: LiveData<List<User>> = _users

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    private val _error = MutableLiveData<String?>()
    val error: LiveData<String?> = _error

    private val _selectedUser = MutableLiveData<User?>()
    val selectedUser: LiveData<User?> = _selectedUser

    init {
        loadUsers()
    }

    fun loadUsers() {
        viewModelScope.launch {
            try {
                _isLoading.value = true
                _error.value = null
                val userList = userRepository.getUsers()
                _users.value = userList
            } catch (e: Exception) {
                _error.value = "Failed to load users: \\\${e.message}"
            } finally {
                _isLoading.value = false
            }
        }
    }

    fun selectUser(user: User) {
        _selectedUser.value = user
    }

    fun addUser(name: String, email: String) {
        viewModelScope.launch {
            try {
                val newUser = User(
                    id = System.currentTimeMillis(),
                    name = name,
                    email = email
                )
                userRepository.insertUser(newUser)
                loadUsers() // Refresh the list
            } catch (e: Exception) {
                _error.value = "Failed to add user: \\\${e.message}"
            }
        }
    }

    fun updateUser(user: User) {
        viewModelScope.launch {
            try {
                userRepository.updateUser(user)
                loadUsers() // Refresh the list
            } catch (e: Exception) {
                _error.value = "Failed to update user: \\\${e.message}"
            }
        }
    }

    fun deleteUser(user: User) {
        viewModelScope.launch {
            try {
                userRepository.deleteUser(user)
                loadUsers() // Refresh the list
            } catch (e: Exception) {
                _error.value = "Failed to delete user: \\\${e.message}"
            }
        }
    }

    fun clearError() {
        _error.value = null
    }
}`
        },
        {
          title: "Repository Pattern Implementation",
          language: "kotlin",
          code: `package com.example.architecture

import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import retrofit2.Response

// Data source interfaces
interface UserDataSource {
    suspend fun getUsers(): List<User>
    suspend fun getUserById(id: Long): User?
    suspend fun createUser(user: User): User
    suspend fun updateUser(user: User): User
    suspend fun deleteUser(id: Long)
}

// Remote data source (API)
class UserRemoteDataSource(private val apiService: UserApiService) : UserDataSource {

    override suspend fun getUsers(): List<User> {
        return try {
            val response = apiService.getUsers()
            if (response.isSuccessful) {
                response.body() ?: emptyList()
            } else {
                throw Exception("API Error: \\\${response.message()}")
            }
        } catch (e: Exception) {
            throw Exception("Network error: \\\${e.message}")
        }
    }

    override suspend fun getUserById(id: Long): User? {
        return try {
            val response = apiService.getUserById(id)
            if (response.isSuccessful) {
                response.body()
            } else {
                null
            }
        } catch (e: Exception) {
            throw Exception("Network error: \\\${e.message}")
        }
    }

    override suspend fun createUser(user: User): User {
        val response = apiService.createUser(user)
        if (response.isSuccessful) {
            return response.body() ?: throw Exception("Empty response")
        } else {
            throw Exception("API Error: \\\${response.message()}")
        }
    }

    override suspend fun updateUser(user: User): User {
        val response = apiService.updateUser(user.id, user)
        if (response.isSuccessful) {
            return response.body() ?: throw Exception("Empty response")
        } else {
            throw Exception("API Error: \\\${response.message()}")
        }
    }

    override suspend fun deleteUser(id: Long) {
        val response = apiService.deleteUser(id)
        if (!response.isSuccessful) {
            throw Exception("API Error: \\\${response.message()}")
        }
    }
}

// Local data source (Room database)
class UserLocalDataSource(private val userDao: UserDao) : UserDataSource {

    override suspend fun getUsers(): List<User> {
        return userDao.getAllUsers()
    }

    override suspend fun getUserById(id: Long): User? {
        return userDao.getUserById(id)
    }

    override suspend fun createUser(user: User): User {
        val id = userDao.insertUser(user)
        return user.copy(id = id)
    }

    override suspend fun updateUser(user: User): User {
        userDao.updateUser(user)
        return user
    }

    override suspend fun deleteUser(id: Long) {
        userDao.deleteUserById(id)
    }
}

// Repository implementation
class UserRepositoryImpl(
    private val remoteDataSource: UserRemoteDataSource,
    private val localDataSource: UserLocalDataSource
) : UserRepository {

    override suspend fun getUsers(): List<User> {
        return try {
            // Try to get fresh data from remote
            val remoteUsers = remoteDataSource.getUsers()
            // Cache the data locally
            remoteUsers.forEach { user ->
                localDataSource.createUser(user)
            }
            remoteUsers
        } catch (e: Exception) {
            // Fallback to local data if remote fails
            localDataSource.getUsers()
        }
    }

    override suspend fun getUserById(id: Long): User? {
        return try {
            // Try remote first
            remoteDataSource.getUserById(id) ?: localDataSource.getUserById(id)
        } catch (e: Exception) {
            // Fallback to local
            localDataSource.getUserById(id)
        }
    }

    override suspend fun insertUser(user: User) {
        try {
            // Insert to remote first
            val remoteUser = remoteDataSource.createUser(user)
            // Then cache locally
            localDataSource.createUser(remoteUser)
        } catch (e: Exception) {
            // If remote fails, still save locally
            localDataSource.createUser(user)
            throw e // Re-throw to notify caller
        }
    }

    override suspend fun updateUser(user: User) {
        try {
            // Update remote first
            val remoteUser = remoteDataSource.updateUser(user)
            // Then update local
            localDataSource.updateUser(remoteUser)
        } catch (e: Exception) {
            // If remote fails, still update locally
            localDataSource.updateUser(user)
            throw e
        }
    }

    override suspend fun deleteUser(user: User) {
        try {
            // Delete from remote first
            remoteDataSource.deleteUser(user.id)
            // Then delete locally
            localDataSource.deleteUser(user.id)
        } catch (e: Exception) {
            // If remote fails, still delete locally
            localDataSource.deleteUser(user.id)
            throw e
        }
    }
}

// Factory for creating repository instances
object RepositoryFactory {
    fun createUserRepository(context: Context): UserRepository {
        val database = AppDatabase.getInstance(context)
        val userDao = database.userDao()

        val retrofit = Retrofit.Builder()
            .baseUrl("https://api.example.com/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val apiService = retrofit.create(UserApiService::class.java)

        val remoteDataSource = UserRemoteDataSource(apiService)
        val localDataSource = UserLocalDataSource(userDao)

        return UserRepositoryImpl(remoteDataSource, localDataSource)
    }
}`
        }
      ]
    },
    {
      id: "jetpack-compose-modern-ui",
      title: "Jetpack Compose and Modern UI",
      content: "Jetpack Compose is Android's modern toolkit for building native UI with a declarative approach using Kotlin.\n\n**Declarative UI**: Describe what the UI should look like, not how to build it.\n\n**Composable Functions**: Building blocks of Compose UI, marked with @Composable annotation.\n\n**State Management**: Reactive state handling with remember, mutableStateOf, and derivedStateOf.\n\n**Modifiers**: Chainable properties for styling and behavior customization.\n\n**Layouts**: Row, Column, Box, and custom layouts for arranging composables.\n\n**Material Design**: Built-in Material Design components and theming.\n\n**Animation**: Powerful animation APIs for smooth transitions and interactions.\n\n**Accessibility**: Built-in accessibility support for inclusive design.\n\n**Testing**: Easy-to-test composable functions with testing libraries.\n\n**Interoperability**: Seamless integration with existing View-based UI.\n\n**Performance**: Optimized rendering with smart recomposition.",
      keyTopics: [
        "Composable functions and @Composable annotation",
        "State management with remember and mutableStateOf",
        "Modifiers for styling and layout",
        "Material Design components",
        "Custom composables creation",
        "Navigation with Compose",
        "Animation and transitions",
        "Theming and dark mode support",
        "Accessibility in Compose",
        "Testing Compose UI"
      ],
      practicalExercises: [
        "Create basic composable functions",
        "Implement state management in Compose",
        "Build custom modifiers",
        "Create Material Design themed UI",
        "Implement navigation between screens",
        "Add animations to UI elements",
        "Support dark mode theming",
        "Create accessible composables",
        "Write UI tests for Compose",
        "Integrate Compose with existing Views"
      ],
      codeExamples: [
        {
          title: "Basic Jetpack Compose UI",
          language: "kotlin",
          code: `package com.example.composebasics

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel

@Composable
fun UserListScreen(
    viewModel: UserViewModel = viewModel(),
    onUserClick: (User) -> Unit = {}
) {
    val users by viewModel.users.collectAsState()
    val isLoading by viewModel.isLoading.collectAsState()
    val error by viewModel.error.collectAsState()

    Column(modifier = Modifier.fillMaxSize()) {
        // Header
        Text(
            text = "Users",
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(16.dp)
        )

        // Content
        when {
            isLoading -> LoadingIndicator()
            error != null -> ErrorMessage(error!!) { viewModel.loadUsers() }
            else -> UserList(users = users, onUserClick = onUserClick)
        }

        // FAB for adding new user
        FloatingActionButton(
            onClick = { /* Navigate to add user screen */ },
            modifier = Modifier
                .align(Alignment.End)
                .padding(16.dp)
        ) {
            Icon(Icons.Default.Add, contentDescription = "Add User")
        }
    }
}

@Composable
fun LoadingIndicator() {
    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        CircularProgressIndicator()
    }
}

@Composable
fun ErrorMessage(
    message: String,
    onRetry: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = message,
            style = MaterialTheme.typography.bodyLarge,
            color = MaterialTheme.colorScheme.error
        )
        Spacer(modifier = Modifier.height(16.dp))
        Button(onClick = onRetry) {
            Text("Retry")
        }
    }
}

@Composable
fun UserList(
    users: List<User>,
    onUserClick: (User) -> Unit
) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(users) { user ->
            UserCard(
                user = user,
                onClick = { onUserClick(user) }
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun UserCard(
    user: User,
    onClick: () -> Unit
) {
    Card(
        onClick = onClick,
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Avatar placeholder
            Surface(
                modifier = Modifier.size(48.dp),
                shape = CircleShape,
                color = MaterialTheme.colorScheme.primary
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Text(
                        text = user.name.first().toString(),
                        style = MaterialTheme.typography.titleMedium,
                        color = MaterialTheme.colorScheme.onPrimary
                    )
                }
            }

            Spacer(modifier = Modifier.width(16.dp))

            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = user.name,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.SemiBold
                )
                Text(
                    text = user.email,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }

            if (user.isActive) {
                Surface(
                    shape = CircleShape,
                    color = MaterialTheme.colorScheme.primary
                ) {
                    Icon(
                        Icons.Default.Check,
                        contentDescription = "Active",
                        modifier = Modifier
                            .size(24.dp)
                            .padding(4.dp),
                        tint = MaterialTheme.colorScheme.onPrimary
                    )
                }
            }
        }
    }
}

@Composable
fun AddUserDialog(
    onDismiss: () -> Unit,
    onConfirm: (String, String) -> Unit
) {
    var name by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Add New User") },
        text = {
            Column {
                OutlinedTextField(
                    value = name,
                    onValueChange = { name = it },
                    label = { Text("Name") },
                    modifier = Modifier.fillMaxWidth()
                )
                Spacer(modifier = Modifier.height(8.dp))
                OutlinedTextField(
                    value = email,
                    onValueChange = { email = it },
                    label = { Text("Email") },
                    modifier = Modifier.fillMaxWidth()
                )
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    if (name.isNotBlank() && email.isNotBlank()) {
                        onConfirm(name, email)
                        onDismiss()
                    }
                }
            ) {
                Text("Add")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    )
}`
        },
        {
          title: "State Management and Side Effects",
          language: "kotlin",
          code: `package com.example.composestate

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.compose.viewModel
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

// ViewModel with StateFlow
class CounterViewModel : ViewModel() {
    private val _count = MutableStateFlow(0)
    val count: StateFlow<Int> = _count.asStateFlow()

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    fun increment() {
        _count.value++
    }

    fun decrement() {
        _count.value--
    }

    fun reset() {
        _count.value = 0
    }

    fun loadData() {
        viewModelScope.launch {
            _isLoading.value = true
            delay(2000) // Simulate network call
            _count.value = 42 // Set some loaded value
            _isLoading.value = false
        }
    }
}

@Composable
fun CounterScreen(viewModel: CounterViewModel = viewModel()) {
    val count by viewModel.count.collectAsState()
    val isLoading by viewModel.isLoading.collectAsState()

    // Local state for UI-specific interactions
    var showResetDialog by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        // Display current count
        Text(
            text = count.toString(),
            style = MaterialTheme.typography.displayLarge
        )

        Spacer(modifier = Modifier.height(32.dp))

        // Control buttons
        Row(
            horizontalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Button(onClick = { viewModel.decrement() }) {
                Text("-")
            }

            Button(onClick = { viewModel.increment() }) {
                Text("+")
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Action buttons
        Row(
            horizontalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            OutlinedButton(onClick = { viewModel.loadData() }) {
                if (isLoading) {
                    CircularProgressIndicator(
                        modifier = Modifier.size(16.dp),
                        strokeWidth = 2.dp
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Loading...")
                } else {
                    Text("Load Data")
                }
            }

            OutlinedButton(onClick = { showResetDialog = true }) {
                Text("Reset")
            }
        }
    }

    // Reset confirmation dialog
    if (showResetDialog) {
        AlertDialog(
            onDismissRequest = { showResetDialog = false },
            title = { Text("Reset Counter") },
            text = { Text("Are you sure you want to reset the counter to 0?") },
            confirmButton = {
                Button(
                    onClick = {
                        viewModel.reset()
                        showResetDialog = false
                    }
                ) {
                    Text("Reset")
                }
            },
            dismissButton = {
                TextButton(onClick = { showResetDialog = false }) {
                    Text("Cancel")
                }
            }
        )
    }
}

// Example of derived state
@Composable
fun DerivedStateExample() {
    var firstName by remember { mutableStateOf("") }
    var lastName by remember { mutableStateOf("") }

    // Derived state - automatically updates when dependencies change
    val fullName by remember {
        derivedStateOf {
            val first = firstName.trim()
            val last = lastName.trim()
            when {
                first.isEmpty() && last.isEmpty() -> "Please enter your name"
                first.isEmpty() -> last
                last.isEmpty() -> first
                else -> "$first $last"
            }
        }
    }

    val isValidName by remember {
        derivedStateOf {
            firstName.trim().isNotEmpty() || lastName.trim().isNotEmpty()
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        OutlinedTextField(
            value = firstName,
            onValueChange = { firstName = it },
            label = { Text("First Name") },
            modifier = Modifier.fillMaxWidth()
        )

        OutlinedTextField(
            value = lastName,
            onValueChange = { lastName = it },
            label = { Text("Last Name") },
            modifier = Modifier.fillMaxWidth()
        )

        Card(
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(
                modifier = Modifier.padding(16.dp)
            ) {
                Text(
                    text = "Full Name: $fullName",
                    style = MaterialTheme.typography.titleMedium
                )

                Text(
                    text = if (isValidName) "✓ Valid name" else "⚠ Please enter a name",
                    color = if (isValidName)
                        MaterialTheme.colorScheme.primary
                    else
                        MaterialTheme.colorScheme.error
                )
            }
        }
    }
}

// Example with LaunchedEffect for side effects
@Composable
fun TimerExample() {
    var timeLeft by remember { mutableStateOf(10) }
    var isRunning by remember { mutableStateOf(false) }

    // LaunchedEffect for side effects
    LaunchedEffect(isRunning) {
        if (isRunning && timeLeft > 0) {
            while (timeLeft > 0) {
                delay(1000)
                timeLeft--
            }
            isRunning = false
        }
    }

    // DisposableEffect example (cleanup when composable leaves composition)
    DisposableEffect(Unit) {
        println("Timer composable entered composition")

        onDispose {
            println("Timer composable left composition")
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = timeLeft.toString(),
            style = MaterialTheme.typography.displayLarge
        )

        Spacer(modifier = Modifier.height(32.dp))

        Row(
            horizontalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Button(
                onClick = {
                    if (!isRunning && timeLeft > 0) {
                        isRunning = true
                    }
                },
                enabled = !isRunning && timeLeft > 0
            ) {
                Text("Start")
            }

            Button(
                onClick = {
                    isRunning = false
                    timeLeft = 10
                }
            ) {
                Text("Reset")
            }
        }

        if (timeLeft == 0) {
            Text(
                text = "Time's up!",
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.headlineMedium
            )
        }
    }
}`
        }
      ]
    },
    {
      id: "networking-data-persistence",
      title: "Networking and Data Persistence",
      content: "Modern Android apps require robust networking capabilities and efficient data persistence strategies.\n\n**Retrofit**: Type-safe HTTP client for Android and Java.\n\n**OkHttp**: HTTP client with connection pooling and response caching.\n\n**Room**: SQLite object mapping library that provides compile-time verification.\n\n**SharedPreferences**: Simple key-value storage for app settings.\n\n**DataStore**: Modern data storage solution for key-value pairs and typed objects.\n\n**WorkManager**: Flexible library for deferrable background work.\n\n**Caching**: Implementing effective caching strategies for offline functionality.\n\n**Error Handling**: Robust error handling for network operations.\n\n**Security**: Implementing secure network communication and data storage.\n\n**Performance**: Optimizing network calls and database operations.",
      keyTopics: [
        "Retrofit setup and API service creation",
        "Room database implementation",
        "OkHttp configuration and interceptors",
        "DataStore for preferences",
        "WorkManager for background tasks",
        "Caching strategies",
        "Error handling and retry logic",
        "Security best practices",
        "Performance optimization",
        "Offline data synchronization"
      ],
      practicalExercises: [
        "Create REST API client with Retrofit",
        "Implement Room database with entities and DAOs",
        "Set up OkHttp with logging and authentication",
        "Use DataStore for app preferences",
        "Implement WorkManager for background sync",
        "Add caching layer for offline support",
        "Handle network errors gracefully",
        "Implement secure API communication",
        "Optimize database queries",
        "Create offline-first architecture"
      ],
      codeExamples: [
        {
          title: "Retrofit API Client with Coroutines",
          language: "kotlin",
          code: `package com.example.networking

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import retrofit2.http.*
import java.util.concurrent.TimeUnit

// Data models
@JsonClass(generateAdapter = true)
data class User(
    @Json(name = "id") val id: Long,
    @Json(name = "name") val name: String,
    @Json(name = "email") val email: String,
    @Json(name = "avatar_url") val avatarUrl: String? = null
)

@JsonClass(generateAdapter = true)
data class CreateUserRequest(
    @Json(name = "name") val name: String,
    @Json(name = "email") val email: String
)

@JsonClass(generateAdapter = true)
data class ApiResponse<T>(
    @Json(name = "data") val data: T? = null,
    @Json(name = "message") val message: String? = null,
    @Json(name = "success") val success: Boolean = false
)

// API Service interface
interface UserApiService {

    @GET("users")
    suspend fun getUsers(): Response<ApiResponse<List<User>>>

    @GET("users/{id}")
    suspend fun getUser(@Path("id") val userId: Long): Response<ApiResponse<User>>

    @POST("users")
    suspend fun createUser(@Body request: CreateUserRequest): Response<ApiResponse<User>>

    @PUT("users/{id}")
    suspend fun updateUser(
        @Path("id") val userId: Long,
        @Body user: User
    ): Response<ApiResponse<User>>

    @DELETE("users/{id}")
    suspend fun deleteUser(@Path("id") val userId: Long): Response<ApiResponse<Unit>>

    @GET("users/search")
    suspend fun searchUsers(@Query("query") query: String): Response<ApiResponse<List<User>>>
}

// Network result wrapper
sealed class NetworkResult<T> {
    data class Success<T>(val data: T) : NetworkResult<T>()
    data class Error<T>(val message: String, val code: Int? = null) : NetworkResult<T>()
    class Loading<T> : NetworkResult<T>()
}

// Repository with network error handling
class UserRepository(private val apiService: UserApiService) {

    suspend fun getUsers(): NetworkResult<List<User>> {
        return try {
            val response = apiService.getUsers()
            handleResponse(response) { it ?: emptyList() }
        } catch (e: Exception) {
            NetworkResult.Error("Network error: \\\${e.localizedMessage}")
        }
    }

    suspend fun getUser(userId: Long): NetworkResult<User> {
        return try {
            val response = apiService.getUser(userId)
            handleResponse(response) { it!! }
        } catch (e: Exception) {
            NetworkResult.Error("Network error: \\\${e.localizedMessage}")
        }
    }

    suspend fun createUser(name: String, email: String): NetworkResult<User> {
        return try {
            val request = CreateUserRequest(name, email)
            val response = apiService.createUser(request)
            handleResponse(response) { it!! }
        } catch (e: Exception) {
            NetworkResult.Error("Network error: \\\${e.localizedMessage}")
        }
    }

    suspend fun updateUser(user: User): NetworkResult<User> {
        return try {
            val response = apiService.updateUser(user.id, user)
            handleResponse(response) { it!! }
        } catch (e: Exception) {
            NetworkResult.Error("Network error: \\\${e.localizedMessage}")
        }
    }

    suspend fun deleteUser(userId: Long): NetworkResult<Unit> {
        return try {
            val response = apiService.deleteUser(userId)
            handleResponse(response) { Unit }
        } catch (e: Exception) {
            NetworkResult.Error("Network error: \\\${e.localizedMessage}")
        }
    }

    suspend fun searchUsers(query: String): NetworkResult<List<User>> {
        return try {
            val response = apiService.searchUsers(query)
            handleResponse(response) { it ?: emptyList() }
        } catch (e: Exception) {
            NetworkResult.Error("Network error: \\\${e.localizedMessage}")
        }
    }

    private fun <T, R> handleResponse(
        response: Response<T>,
        transform: (T?) -> R
    ): NetworkResult<R> {
        return if (response.isSuccessful) {
            val body = response.body()
            if (body != null) {
                NetworkResult.Success(transform(body))
            } else {
                NetworkResult.Error("Empty response body")
            }
        } else {
            NetworkResult.Error(
                "API Error: \\\${response.message()}",
                response.code()
            )
        }
    }
}

// Network module with dependency injection setup
object NetworkModule {

    private const val BASE_URL = "https://api.example.com/"

    fun provideOkHttpClient(): OkHttpClient {
        val loggingInterceptor = HttpLoggingInterceptor().apply {
            level = HttpLoggingInterceptor.Level.BODY
        }

        val authInterceptor = Interceptor { chain ->
            val original = chain.request()
            val token = getAuthToken() // Implement your token retrieval

            val request = if (token != null) {
                original.newBuilder()
                    .header("Authorization", "Bearer $token")
                    .build()
            } else {
                original
            }

            chain.proceed(request)
        }

        return OkHttpClient.Builder()
            .addInterceptor(loggingInterceptor)
            .addInterceptor(authInterceptor)
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .writeTimeout(30, TimeUnit.SECONDS)
            .build()
    }

    fun provideRetrofit(okHttpClient: OkHttpClient): Retrofit {
        return Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(MoshiConverterFactory.create())
            .build()
    }

    fun provideUserApiService(retrofit: Retrofit): UserApiService {
        return retrofit.create(UserApiService::class.java)
    }

    fun provideUserRepository(apiService: UserApiService): UserRepository {
        return UserRepository(apiService)
    }

    private fun getAuthToken(): String? {
        // Implement your token storage/retrieval logic
        // This could be from SharedPreferences, DataStore, or secure storage
        return null // Return actual token or null
    }
}`
        },
        {
          title: "Room Database Implementation",
          language: "kotlin",
          code: `package com.example.persistence

import androidx.room.*
import androidx.room.migration.Migration
import androidx.sqlite.db.SupportSQLiteDatabase
import kotlinx.coroutines.flow.Flow

// Entity - represents a table
@Entity(tableName = "users")
data class UserEntity(
    @PrimaryKey(autoGenerate = true)
    @ColumnInfo(name = "id")
    val id: Long = 0,

    @ColumnInfo(name = "name")
    val name: String,

    @ColumnInfo(name = "email")
    val email: String,

    @ColumnInfo(name = "avatar_url")
    val avatarUrl: String? = null,

    @ColumnInfo(name = "created_at")
    val createdAt: Long = System.currentTimeMillis(),

    @ColumnInfo(name = "is_active")
    val isActive: Boolean = true
)

// Data Transfer Object for complex queries
data class UserWithPosts(
    @Embedded val user: UserEntity,
    @Relation(
        parentColumn = "id",
        entityColumn = "user_id"
    )
    val posts: List<PostEntity>
)

// DAO - Data Access Object
@Dao
interface UserDao {

    @Query("SELECT * FROM users ORDER BY name ASC")
    fun getAllUsers(): Flow<List<UserEntity>>

    @Query("SELECT * FROM users WHERE id = :userId")
    suspend fun getUserById(userId: Long): UserEntity?

    @Query("SELECT * FROM users WHERE email = :email")
    suspend fun getUserByEmail(email: String): UserEntity?

    @Query("SELECT * FROM users WHERE name LIKE '%' || :query || '%' OR email LIKE '%' || :query || '%'")
    fun searchUsers(query: String): Flow<List<UserEntity>>

    @Query("SELECT COUNT(*) FROM users WHERE is_active = 1")
    fun getActiveUserCount(): Flow<Int>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertUser(user: UserEntity): Long

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertUsers(users: List<UserEntity>)

    @Update
    suspend fun updateUser(user: UserEntity)

    @Delete
    suspend fun deleteUser(user: UserEntity)

    @Query("DELETE FROM users WHERE id = :userId")
    suspend fun deleteUserById(userId: Long)

    @Query("UPDATE users SET is_active = :isActive WHERE id = :userId")
    suspend fun setUserActive(userId: Long, isActive: Boolean)

    @Transaction
    @Query("SELECT * FROM users")
    fun getUsersWithPosts(): Flow<List<UserWithPosts>>
}

// Database class
@Database(
    entities = [UserEntity::class, PostEntity::class],
    version = 2,
    exportSchema = true
)
abstract class AppDatabase : RoomDatabase() {

    abstract fun userDao(): UserDao
    abstract fun postDao(): PostDao

    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null

        fun getInstance(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "app_database"
                )
                    .addMigrations(MIGRATION_1_2)
                    .fallbackToDestructiveMigration() // Only for development
                    .build()
                INSTANCE = instance
                instance
            }
        }
    }
}

// Database migrations
val MIGRATION_1_2 = object : Migration(1, 2) {
    override fun migrate(database: SupportSQLiteDatabase) {
        // Add new columns or modify schema
        database.execSQL("ALTER TABLE users ADD COLUMN avatar_url TEXT")
        database.execSQL("ALTER TABLE users ADD COLUMN created_at INTEGER DEFAULT 0 NOT NULL")
        database.execSQL("ALTER TABLE users ADD COLUMN is_active INTEGER DEFAULT 1 NOT NULL")
    }
}

// Repository implementation
class UserRepositoryImpl(
    private val userDao: UserDao,
    private val postDao: PostDao
) : UserRepository {

    override fun getUsers(): Flow<List<UserEntity>> {
        return userDao.getAllUsers()
    }

    override suspend fun getUserById(id: Long): UserEntity? {
        return userDao.getUserById(id)
    }

    override suspend fun insertUser(user: UserEntity): Long {
        return userDao.insertUser(user)
    }

    override suspend fun updateUser(user: UserEntity) {
        userDao.updateUser(user)
    }

    override suspend fun deleteUser(user: UserEntity) {
        userDao.deleteUser(user)
    }

    override fun searchUsers(query: String): Flow<List<UserEntity>> {
        return userDao.searchUsers(query)
    }

    override fun getActiveUserCount(): Flow<Int> {
        return userDao.getActiveUserCount()
    }

    override suspend fun setUserActive(userId: Long, isActive: Boolean) {
        userDao.setUserActive(userId, isActive)
    }

    override fun getUsersWithPosts(): Flow<List<UserWithPosts>> {
        return userDao.getUsersWithPosts()
    }
}

// ViewModel for database operations
class UserViewModel(private val userRepository: UserRepositoryImpl) : ViewModel() {

    val users = userRepository.getUsers().stateIn(
        viewModelScope,
        SharingStarted.WhileSubscribed(5000),
        emptyList()
    )

    val activeUserCount = userRepository.getActiveUserCount().stateIn(
        viewModelScope,
        SharingStarted.WhileSubscribed(5000),
        0
    )

    private val _searchQuery = MutableStateFlow("")
    val searchResults = _searchQuery
        .debounce(300)
        .flatMapLatest { query ->
            if (query.isEmpty()) {
                userRepository.getUsers()
            } else {
                userRepository.searchUsers(query)
            }
        }
        .stateIn(
            viewModelScope,
            SharingStarted.WhileSubscribed(5000),
            emptyList()
        )

    fun searchUsers(query: String) {
        _searchQuery.value = query
    }

    fun addUser(name: String, email: String) {
        viewModelScope.launch {
            try {
                val user = UserEntity(
                    name = name,
                    email = email
                )
                userRepository.insertUser(user)
            } catch (e: Exception) {
                // Handle error
            }
        }
    }

    fun updateUser(user: UserEntity) {
        viewModelScope.launch {
            try {
                userRepository.updateUser(user)
            } catch (e: Exception) {
                // Handle error
            }
        }
    }

    fun deleteUser(user: UserEntity) {
        viewModelScope.launch {
            try {
                userRepository.deleteUser(user)
            } catch (e: Exception) {
                // Handle error
            }
        }
    }

    fun toggleUserActive(user: UserEntity) {
        viewModelScope.launch {
            try {
                userRepository.setUserActive(user.id, !user.isActive)
            } catch (e: Exception) {
                // Handle error
            }
        }
    }
}

// Usage in Composable
@Composable
fun UserDatabaseScreen(viewModel: UserViewModel = viewModel()) {
    val users by viewModel.users.collectAsState()
    val activeCount by viewModel.activeUserCount.collectAsState()
    var searchQuery by remember { mutableStateOf("") }

    Column(modifier = Modifier.fillMaxSize()) {
        // Search bar
        OutlinedTextField(
            value = searchQuery,
            onValueChange = {
                searchQuery = it
                viewModel.searchUsers(it)
            },
            label = { Text("Search users") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        )

        // Active user count
        Text(
            text = "Active users: $activeCount",
            modifier = Modifier.padding(horizontal = 16.dp)
        )

        // User list
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(16.dp)
        ) {
            items(users) { user ->
                UserDatabaseItem(
                    user = user,
                    onToggleActive = { viewModel.toggleUserActive(user) },
                    onDelete = { viewModel.deleteUser(user) }
                )
            }
        }
    }
}

@Composable
fun UserDatabaseItem(
    user: UserEntity,
    onToggleActive: () -> Unit,
    onDelete: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(text = user.name, style = MaterialTheme.typography.titleMedium)
                Text(text = user.email, style = MaterialTheme.typography.bodyMedium)
                Text(
                    text = if (user.isActive) "Active" else "Inactive",
                    color = if (user.isActive)
                        MaterialTheme.colorScheme.primary
                    else
                        MaterialTheme.colorScheme.error
                )
            }

            Row {
                IconButton(onClick = onToggleActive) {
                    Icon(
                        if (user.isActive) Icons.Default.CheckCircle else Icons.Default.RadioButtonUnchecked,
                        contentDescription = if (user.isActive) "Deactivate" else "Activate"
                    )
                }

                IconButton(onClick = onDelete) {
                    Icon(Icons.Default.Delete, contentDescription = "Delete")
                }
            }
        }
    }
}`
        }
      ]
    },
    {
      id: "testing-quality-assurance",
      title: "Testing and Quality Assurance",
      content: "Comprehensive testing is essential for maintaining high-quality Android applications.\n\n**Unit Testing**: Testing individual components in isolation.\n\n**Integration Testing**: Testing component interactions.\n\n**UI Testing**: Testing user interface interactions.\n\n**Mockito**: Mocking framework for creating test doubles.\n\n**JUnit**: Testing framework for Java and Kotlin.\n\n**Espresso**: UI testing framework for Android.\n\n**Robolectric**: Unit testing framework that mocks Android framework.\n\n**Test Coverage**: Measuring how much code is tested.\n\n**Continuous Integration**: Automated testing in CI/CD pipelines.\n\n**Performance Testing**: Testing app performance and memory usage.\n\n**Accessibility Testing**: Ensuring app accessibility compliance.",
      keyTopics: [
        "Unit testing with JUnit and Mockito",
        "Integration testing strategies",
        "UI testing with Espresso",
        "Testing ViewModels and repositories",
        "Mocking dependencies",
        "Test-driven development (TDD)",
        "Code coverage analysis",
        "Testing asynchronous code",
        "Performance testing",
        "Accessibility testing"
      ],
      practicalExercises: [
        "Write unit tests for utility functions",
        "Test ViewModel business logic",
        "Create integration tests for repositories",
        "Write Espresso UI tests",
        "Mock API responses for testing",
        "Implement TDD for a feature",
        "Analyze test coverage",
        "Test coroutine-based code",
        "Performance test app components",
        "Test accessibility features"
      ],
      codeExamples: [
        {
          title: "Unit Testing with JUnit and Mockito",
          language: "kotlin",
          code: `package com.example.testing

import androidx.arch.core.executor.testing.InstantTaskExecutorRule
import androidx.lifecycle.Observer
import com.nhaarman.mockitokotlin2.*
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.TestCoroutineDispatcher
import kotlinx.coroutines.test.TestCoroutineScope
import kotlinx.coroutines.test.runBlockingTest
import org.junit.*
import org.junit.Assert.*
import org.mockito.Mock
import org.mockito.MockitoAnnotations

// Test data
object TestData {
    val testUser = User(
        id = 1,
        name = "Test User",
        email = "test@example.com",
        isActive = true
    )

    val testUsers = listOf(
        testUser,
        User(2, "User 2", "user2@example.com", true),
        User(3, "User 3", "user3@example.com", false)
    )
}

// Unit test for UserRepository
@ExperimentalCoroutinesApi
class UserRepositoryTest {

    @get:Rule
    val instantTaskExecutorRule = InstantTaskExecutorRule()

    @Mock
    private lateinit var mockApiService: UserApiService

    private lateinit var repository: UserRepository
    private val testDispatcher = TestCoroutineDispatcher()
    private val testScope = TestCoroutineScope(testDispatcher)

    @Before
    fun setup() {
        MockitoAnnotations.openMocks(this)
        repository = UserRepository(mockApiService)
    }

    @After
    fun tearDown() {
        testScope.cleanupTestCoroutines()
        testDispatcher.cleanupTestCoroutines()
    }

    @Test
    fun \`getUsers returns success when api call succeeds\`() = testScope.runBlockingTest {
        // Given
        val expectedUsers = TestData.testUsers
        val apiResponse = ApiResponse(data = expectedUsers, success = true)
        whenever(mockApiService.getUsers()).thenReturn(
            retrofit2.Response.success(apiResponse)
        )

        // When
        val result = repository.getUsers()

        // Then
        assertTrue(result is NetworkResult.Success)
        assertEquals(expectedUsers, (result as NetworkResult.Success).data)
        verify(mockApiService).getUsers()
    }

    @Test
    fun \`getUsers returns error when api call fails\`() = testScope.runBlockingTest {
        // Given
        whenever(mockApiService.getUsers()).thenThrow(RuntimeException("Network error"))

        // When
        val result = repository.getUsers()

        // Then
        assertTrue(result is NetworkResult.Error)
        assertTrue((result as NetworkResult.Error).message.contains("Network error"))
    }

    @Test
    fun \`getUser returns user when found\`() = testScope.runBlockingTest {
        // Given
        val userId = 1L
        val expectedUser = TestData.testUser
        val apiResponse = ApiResponse(data = expectedUser, success = true)
        whenever(mockApiService.getUser(userId)).thenReturn(
            retrofit2.Response.success(apiResponse)
        )

        // When
        val result = repository.getUser(userId)

        // Then
        assertTrue(result is NetworkResult.Success)
        assertEquals(expectedUser, (result as NetworkResult.Success).data)
    }

    @Test
    fun \`createUser calls api with correct parameters\`() = testScope.runBlockingTest {
        // Given
        val name = "New User"
        val email = "new@example.com"
        val newUser = User(id = 123, name = name, email = email)
        val apiResponse = ApiResponse(data = newUser, success = true)
        whenever(mockApiService.createUser(any())).thenReturn(
            retrofit2.Response.success(apiResponse)
        )

        // When
        val result = repository.createUser(name, email)

        // Then
        assertTrue(result is NetworkResult.Success)
        verify(mockApiService).createUser(check {
            assertEquals(name, it.name)
            assertEquals(email, it.email)
        })
    }
}

// ViewModel testing
@ExperimentalCoroutinesApi
class UserViewModelTest {

    @get:Rule
    val instantTaskExecutorRule = InstantTaskExecutorRule()

    @Mock
    private lateinit var mockRepository: UserRepository

    @Mock
    private lateinit var mockObserver: Observer<List<User>>

    private lateinit var viewModel: UserViewModel
    private val testDispatcher = TestCoroutineDispatcher()
    private val testScope = TestCoroutineScope(testDispatcher)

    @Before
    fun setup() {
        MockitoAnnotations.openMocks(this)
        viewModel = UserViewModel(mockRepository)
    }

    @After
    fun tearDown() {
        testScope.cleanupTestCoroutines()
        testDispatcher.cleanupTestCoroutines()
    }

    @Test
    fun \`loadUsers updates users LiveData on success\`() = testScope.runBlockingTest {
        // Given
        val expectedUsers = TestData.testUsers
        whenever(mockRepository.getUsers()).thenReturn(NetworkResult.Success(expectedUsers))

        // When
        viewModel.loadUsers()

        // Then
        verify(mockRepository).getUsers()
        // Note: In a real test, you'd verify LiveData changes
        // This would require additional testing utilities
    }

    @Test
    fun \`addUser calls repository and handles success\`() = testScope.runBlockingTest {
        // Given
        val name = "Test User"
        val email = "test@example.com"
        val expectedUser = User(id = 1, name = name, email = email)
        whenever(mockRepository.createUser(name, email)).thenReturn(
            NetworkResult.Success(expectedUser)
        )

        // When
        viewModel.addUser(name, email)

        // Then
        verify(mockRepository).createUser(name, email)
    }

    @Test
    fun \`addUser handles error gracefully\`() = testScope.runBlockingTest {
        // Given
        val name = "Test User"
        val email = "test@example.com"
        val errorMessage = "Network error"
        whenever(mockRepository.createUser(name, email)).thenReturn(
            NetworkResult.Error(errorMessage)
        )

        // When
        viewModel.addUser(name, email)

        // Then
        verify(mockRepository).createUser(name, email)
        // Verify error state is set (would need additional testing setup)
    }
}

// Utility function testing
class StringUtilsTest {

    @Test
    fun \`isValidEmail returns true for valid email\`() {
        // Given
        val validEmail = "test@example.com"

        // When
        val result = StringUtils.isValidEmail(validEmail)

        // Then
        assertTrue(result)
    }

    @Test
    fun \`isValidEmail returns false for invalid email\`() {
        // Given
        val invalidEmails = listOf(
            "invalid",
            "invalid@",
            "@example.com",
            "invalid@example",
            ""
        )

        // When & Then
        invalidEmails.forEach { email ->
            assertFalse("Email '$email' should be invalid", StringUtils.isValidEmail(email))
        }
    }

    @Test
    fun \`capitalizeWords capitalizes first letter of each word\`() {
        // Given
        val input = "hello world from kotlin"
        val expected = "Hello World From Kotlin"

        // When
        val result = StringUtils.capitalizeWords(input)

        // Then
        assertEquals(expected, result)
    }

    @Test
    fun \`truncateText truncates long text with ellipsis\`() {
        // Given
        val longText = "This is a very long text that should be truncated"
        val maxLength = 20
        val expected = "This is a very long..."

        // When
        val result = StringUtils.truncateText(longText, maxLength)

        // Then
        assertEquals(expected, result)
        assertTrue(result.length <= maxLength + 3) // +3 for "..."
    }

    @Test
    fun \`truncateText returns original text if shorter than max length\`() {
        // Given
        val shortText = "Short text"
        val maxLength = 20

        // When
        val result = StringUtils.truncateText(shortText, maxLength)

        // Then
        assertEquals(shortText, result)
    }
}

// Test utilities
object TestUtils {
    fun createMockUser(
        id: Long = 1,
        name: String = "Mock User",
        email: String = "mock@example.com",
        isActive: Boolean = true
    ) = User(id, name, email, isActive)

    fun createMockUserList(count: Int = 3): List<User> {
        return (1..count).map { i ->
            createMockUser(
                id = i.toLong(),
                name = "User $i",
                email = "user$i@example.com"
            )
        }
    }
}`
        },
        {
          title: "UI Testing with Espresso",
          language: "kotlin",
          code: `package com.example.uitesting

import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.action.ViewActions.*
import androidx.test.espresso.assertion.ViewAssertions.matches
import androidx.test.espresso.contrib.RecyclerViewActions
import androidx.test.espresso.matcher.ViewMatchers.*
import androidx.test.ext.junit.rules.ActivityScenarioRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.filters.LargeTest
import com.example.androidbasics.MainActivity
import com.example.androidbasics.R
import org.hamcrest.CoreMatchers.allOf
import org.hamcrest.CoreMatchers.not
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
@LargeTest
class MainActivityTest {

    @get:Rule
    val activityRule = ActivityScenarioRule(MainActivity::class.java)

    @Test
    fun testUserInputAndDisplay() {
        // Type user name
        onView(withId(R.id.nameInput))
            .perform(typeText("John Doe"), closeSoftKeyboard())

        // Click submit button
        onView(withId(R.id.submitButton))
            .perform(click())

        // Check if greeting is displayed
        onView(withId(R.id.greetingText))
            .check(matches(withText("Hello, John Doe!")))

        // Check if input field is cleared
        onView(withId(R.id.nameInput))
            .check(matches(withText("")))
    }

    @Test
    fun testEmptyInputValidation() {
        // Try to submit without entering name
        onView(withId(R.id.submitButton))
            .perform(click())

        // Check if error message is shown
        onView(withText("Please enter your name"))
            .check(matches(isDisplayed()))
    }

    @Test
    fun testNavigationButton() {
        // Click navigate button
        onView(withId(R.id.navigateButton))
            .perform(click())

        // Verify we're on second activity (check for a view that exists only there)
        onView(withId(R.id.secondActivityText))
            .check(matches(isDisplayed()))
    }

    @Test
    fun testShareFunctionality() {
        // Type some text
        onView(withId(R.id.nameInput))
            .perform(typeText("Test message"), closeSoftKeyboard())

        // Click share button
        onView(withId(R.id.shareButton))
            .perform(click())

        // Verify share intent is launched (this might vary based on device/emulator)
        // This is a basic check - in real scenarios you'd mock the intent
        onView(withText("Test message"))
            .check(matches(isDisplayed()))
    }

    @Test
    fun testInputFieldCharacterLimit() {
        // Try to enter text longer than limit
        val longText = "A".repeat(60) // Assuming 50 char limit

        onView(withId(R.id.nameInput))
            .perform(typeText(longText), closeSoftKeyboard())

        // Check that text is truncated to limit
        onView(withId(R.id.nameInput))
            .check(matches(withText(longText.take(50))))
    }
}

// RecyclerView testing
@RunWith(AndroidJUnit4::class)
class UserListActivityTest {

    @get:Rule
    val activityRule = ActivityScenarioRule(UserListActivity::class.java)

    @Test
    fun testUserListDisplay() {
        // Check if RecyclerView is displayed
        onView(withId(R.id.userRecyclerView))
            .check(matches(isDisplayed()))

        // Check if first item is displayed
        onView(withText("User 1"))
            .check(matches(isDisplayed()))
    }

    @Test
    fun testUserItemClick() {
        // Click on first user item
        onView(withId(R.id.userRecyclerView))
            .perform(RecyclerViewActions.actionOnItemAtPosition<UserAdapter.UserViewHolder>(
                0, click()
            ))

        // Verify detail view is shown
        onView(withId(R.id.userDetailContainer))
            .check(matches(isDisplayed()))

        // Check user details are displayed
        onView(withId(R.id.userNameText))
            .check(matches(withText("User 1")))

        onView(withId(R.id.userEmailText))
            .check(matches(withText("user1@example.com")))
    }

    @Test
    fun testSwipeToDelete() {
        // Get initial item count (this would require custom matcher)
        // Swipe first item
        onView(withId(R.id.userRecyclerView))
            .perform(RecyclerViewActions.actionOnItemAtPosition<UserAdapter.UserViewHolder>(
                0, swipeRight()
            ))

        // Verify item is removed (item count decreased)
        // This would require custom assertions
    }

    @Test
    fun testSearchFunctionality() {
        // Type in search field
        onView(withId(R.id.searchInput))
            .perform(typeText("John"), closeSoftKeyboard())

        // Check if filtered results are shown
        onView(withText("John Doe"))
            .check(matches(isDisplayed()))

        // Check that non-matching items are not shown
        onView(withText("Jane Smith"))
            .check(matches(not(isDisplayed())))
    }
}

// Custom matchers for better test assertions
object CustomMatchers {

    fun withItemCount(count: Int): Matcher<View> {
        return object : TypeSafeMatcher<View>() {
            override fun describeTo(description: Description) {
                description.appendText("RecyclerView with item count: $count")
            }

            override fun matchesSafely(view: View): Boolean {
                return (view as RecyclerView).adapter?.itemCount == count
            }
        }
    }

    fun atPosition(position: Int, itemMatcher: Matcher<View>): Matcher<View> {
        return object : BoundedMatcher<View, RecyclerView>(RecyclerView::class.java) {
            override fun describeTo(description: Description) {
                description.appendText("has item at position $position: ")
                itemMatcher.describeTo(description)
            }

            override fun matchesSafely(view: RecyclerView): Boolean {
                val viewHolder = view.findViewHolderForAdapterPosition(position)
                    ?: return false // has no item on such position
                return itemMatcher.matches(viewHolder.itemView)
            }
        }
    }
}

// Integration test example
@RunWith(AndroidJUnit4::class)
class UserWorkflowTest {

    @get:Rule
    val activityRule = ActivityScenarioRule(MainActivity::class.java)

    @Test
    fun testCompleteUserWorkflow() {
        // 1. Add a new user
        onView(withId(R.id.addUserButton))
            .perform(click())

        onView(withId(R.id.nameInput))
            .perform(typeText("Integration Test User"), closeSoftKeyboard())

        onView(withId(R.id.emailInput))
            .perform(typeText("integration@example.com"), closeSoftKeyboard())

        onView(withId(R.id.saveButton))
            .perform(click())

        // 2. Verify user is added to list
        onView(withText("Integration Test User"))
            .check(matches(isDisplayed()))

        // 3. Navigate to user details
        onView(withText("Integration Test User"))
            .perform(click())

        // 4. Verify details are correct
        onView(withId(R.id.detailName))
            .check(matches(withText("Integration Test User")))

        onView(withId(R.id.detailEmail))
            .check(matches(withText("integration@example.com")))

        // 5. Edit user
        onView(withId(R.id.editButton))
            .perform(click())

        onView(withId(R.id.nameInput))
            .perform(clearText(), typeText("Updated Test User"), closeSoftKeyboard())

        onView(withId(R.id.saveButton))
            .perform(click())

        // 6. Verify update
        onView(withText("Updated Test User"))
            .check(matches(isDisplayed()))
    }
}

// Performance testing utilities
@RunWith(AndroidJUnit4::class)
class PerformanceTest {

    @get:Rule
    val activityRule = ActivityScenarioRule(MainActivity::class.java)

    @Test
    fun testAppStartupTime() {
        // Measure app startup time
        val startTime = System.currentTimeMillis()

        // Wait for main activity to be fully loaded
        onView(withId(R.id.mainContainer))
            .check(matches(isDisplayed()))

        val endTime = System.currentTimeMillis()
        val startupTime = endTime - startTime

        // Assert startup time is reasonable (less than 5 seconds)
        assertTrue("App startup took \\\${startupTime}ms", startupTime < 5000)
    }

    @Test
    fun testScrollPerformance() {
        // Populate list with many items first
        // Then measure scroll performance
        onView(withId(R.id.userRecyclerView))
            .perform(RecyclerViewActions.scrollToPosition<UserAdapter.UserViewHolder>(50))

        // Measure time for scroll operation
        val scrollStartTime = System.currentTimeMillis()

        onView(withId(R.id.userRecyclerView))
            .perform(RecyclerViewActions.scrollToPosition<UserAdapter.UserViewHolder>(0))

        val scrollEndTime = System.currentTimeMillis()
        val scrollTime = scrollEndTime - scrollStartTime

        // Assert smooth scrolling (less than 1 second for 50 items)
        assertTrue("Scroll took \\\${scrollTime}ms", scrollTime < 1000)
    }
}`
        }
      ]
    }
  ]
};
