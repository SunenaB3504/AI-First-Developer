export default {
  id: "artificial-intelligence",
  tier: 5,
  name: "Artificial Intelligence & Machine Learning",
  description: "Master the fundamentals of Artificial Intelligence and Machine Learning with practical implementations using Python. Learn to build intelligent systems, train models, and deploy AI solutions for real-world applications including computer vision, natural language processing, and predictive analytics.",
  difficulty: "Advanced",
  estimatedHours: 45,
  prerequisites: ["javascript", "nodejs", "python"],
  learningObjectives: [
    "Master Python fundamentals and scientific computing libraries (NumPy, Pandas, Matplotlib)",
    "Understand core machine learning algorithms and their mathematical foundations",
    "Implement supervised learning models (Linear Regression, Logistic Regression, Decision Trees, SVM)",
    "Build and train neural networks using TensorFlow and PyTorch",
    "Apply natural language processing techniques for text analysis and generation",
    "Implement computer vision solutions with OpenCV and convolutional neural networks",
    "Deploy machine learning models to production environments",
    "Handle big data processing and distributed computing with Apache Spark",
    "Implement reinforcement learning algorithms and applications",
    "Apply ethical AI practices and responsible machine learning",
    "Optimize model performance and interpretability",
    "Build end-to-end AI pipelines from data collection to deployment",
    "Implement automated machine learning (AutoML) workflows",
    "Create AI-powered web applications with real-time inference",
    "Master MLOps practices for model versioning and monitoring"
  ],
  sections: [
    {
      id: "python-ai-data-science",
      title: "Python for AI and Data Science",
      content: "Python has become the de facto language for artificial intelligence and machine learning due to its simplicity, extensive libraries, and strong community support. This section covers the essential Python skills needed for AI development.\n\n**Scientific Computing Stack**: NumPy provides efficient array operations, Pandas offers powerful data manipulation tools, and Matplotlib enables data visualization.\n\n**Jupyter Ecosystem**: Interactive notebooks for exploratory data analysis, experimentation, and sharing results.\n\n**Virtual Environments**: Managing dependencies and isolating project environments using conda and pip.\n\n**Performance Optimization**: Vectorization techniques, memory management, and profiling tools for efficient computation.\n\n**Data Structures**: Understanding and implementing efficient data structures for AI algorithms.\n\n**Object-Oriented Design**: Building modular, reusable AI components and systems.",
      keyTopics: [
        "Python syntax and advanced features",
        "NumPy array operations and broadcasting",
        "Pandas DataFrames and data manipulation",
        "Matplotlib and Seaborn for visualization",
        "Jupyter notebooks and interactive development",
        "Virtual environments and dependency management",
        "Performance optimization and profiling",
        "Object-oriented programming for AI"
      ],
      practicalExercises: [
        "Set up Python environment with Anaconda and essential libraries",
        "Perform data manipulation and analysis with Pandas",
        "Create interactive visualizations with Matplotlib",
        "Implement vectorized operations for performance",
        "Build reusable Python classes for ML components",
        "Profile and optimize Python code performance",
        "Work with Jupyter notebooks for data exploration",
        "Manage Python dependencies and environments"
      ],
      codeExamples: [
        {
          title: "Scientific Computing with NumPy and Pandas",
          language: "python",
          code: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# NumPy array operations
def demonstrate_numpy():
    # Create arrays
    arr1 = np.array([1, 2, 3, 4, 5])
    arr2 = np.array([[1, 2], [3, 4], [5, 6]])

    # Broadcasting and vectorized operations
    result = arr1 * 2 + 10
    print("Vectorized operation:", result)

    # Matrix operations
    matrix = np.random.rand(3, 3)
    eigenvalues, eigenvectors = np.linalg.eig(matrix)
    print("Matrix eigenvalues:", eigenvalues)

    return arr1, arr2, matrix

# Pandas DataFrame operations
def demonstrate_pandas():
    # Create sample data
    data = {
        'Name': ['Alice', 'Bob', 'Charlie', 'Diana'],
        'Age': [25, 30, 35, 28],
        'Salary': [50000, 60000, 70000, 55000],
        'Department': ['Engineering', 'Sales', 'Engineering', 'Marketing']
    }

    df = pd.DataFrame(data)

    # Data manipulation
    avg_salary_by_dept = df.groupby('Department')['Salary'].mean()
    print("Average salary by department:")
    print(avg_salary_by_dept)

    # Filtering and sorting
    engineers = df[df['Department'] == 'Engineering'].sort_values('Age')
    print("\\nEngineers sorted by age:")
    print(engineers)

    # Statistical operations
    print("\\nDataFrame statistics:")
    print(df.describe())

    return df

# Data visualization
def create_visualizations(df):
    # Create subplots
    fig, axes = plt.subplots(2, 2, figsize=(12, 8))

    # Age distribution
    axes[0, 0].hist(df['Age'], bins=5, edgecolor='black')
    axes[0, 0].set_title('Age Distribution')
    axes[0, 0].set_xlabel('Age')
    axes[0, 0].set_ylabel('Frequency')

    # Salary by department
    departments = df['Department'].unique()
    salaries = [df[df['Department'] == dept]['Salary'].mean() for dept in departments]
    axes[0, 1].bar(departments, salaries, color=['blue', 'green', 'red', 'orange'])
    axes[0, 1].set_title('Average Salary by Department')
    axes[0, 1].set_ylabel('Salary')
    axes[0, 1].tick_params(axis='x', rotation=45)

    # Scatter plot
    axes[1, 0].scatter(df['Age'], df['Salary'], alpha=0.7)
    axes[1, 0].set_title('Age vs Salary')
    axes[1, 0].set_xlabel('Age')
    axes[1, 0].set_ylabel('Salary')

    # Box plot
    axes[1, 1].boxplot([df[df['Department'] == dept]['Salary'] for dept in departments],
                       labels=departments)
    axes[1, 1].set_title('Salary Distribution by Department')
    axes[1, 1].tick_params(axis='x', rotation=45)

    plt.tight_layout()
    plt.show()

# Main execution
if __name__ == "__main__":
    print("=== NumPy Demonstrations ===")
    arr1, arr2, matrix = demonstrate_numpy()

    print("\\n=== Pandas Demonstrations ===")
    df = demonstrate_pandas()

    print("\\n=== Data Visualization ===")
    create_visualizations(df)`
        },
        {
          title: "Machine Learning Pipeline with Scikit-learn",
          language: "python",
          code: `from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.pipeline import Pipeline
from sklearn.datasets import make_classification
import pandas as pd
import numpy as np

class MLDataProcessor:
    def __init__(self):
        self.scaler = StandardScaler()
        self.label_encoders = {}

    def preprocess_data(self, X, y=None, categorical_features=None):
        """Preprocess features and target variable"""
        X_processed = X.copy()

        # Handle categorical features
        if categorical_features:
            for feature in categorical_features:
                if feature in X_processed.columns:
                    if feature not in self.label_encoders:
                        self.label_encoders[feature] = LabelEncoder()
                        self.label_encoders[feature].fit(X_processed[feature])

                    X_processed[feature] = self.label_encoders[feature].transform(X_processed[feature])

        # Scale numerical features
        numerical_features = X_processed.select_dtypes(include=[np.number]).columns
        if len(numerical_features) > 0:
            X_processed[numerical_features] = self.scaler.fit_transform(X_processed[numerical_features])

        return X_processed

    def inverse_transform_labels(self, y_encoded, feature_name):
        """Convert encoded labels back to original"""
        if feature_name in self.label_encoders:
            return self.label_encoders[feature_name].inverse_transform(y_encoded)
        return y_encoded

class MLModelTrainer:
    def __init__(self):
        self.model = None
        self.best_params = None

    def create_pipeline(self):
        """Create a machine learning pipeline"""
        pipeline = Pipeline([
            ('scaler', StandardScaler()),
            ('classifier', RandomForestClassifier(
                n_estimators=100,
                max_depth=10,
                random_state=42,
                n_jobs=-1
            ))
        ])
        return pipeline

    def train_model(self, X_train, y_train):
        """Train the model with cross-validation"""
        self.model = self.create_pipeline()

        # Perform cross-validation
        cv_scores = cross_val_score(self.model, X_train, y_train, cv=5, scoring='accuracy')
        print(f"Cross-validation scores: {cv_scores}")
        print(f"Mean CV accuracy: {cv_scores.mean():.4f} (+/- {cv_scores.std() * 2:.4f})")

        # Train on full training set
        self.model.fit(X_train, y_train)
        return self.model

    def evaluate_model(self, X_test, y_test):
        """Evaluate model performance"""
        y_pred = self.model.predict(X_test)

        print("\\n=== Model Evaluation ===")
        print("Classification Report:")
        print(classification_report(y_test, y_pred))

        print("\\nConfusion Matrix:")
        cm = confusion_matrix(y_test, y_pred)
        print(cm)

        # Calculate additional metrics
        accuracy = np.mean(y_pred == y_test)
        print(f"\\nAccuracy: {accuracy:.4f}")

        return {
            'accuracy': accuracy,
            'classification_report': classification_report(y_test, y_pred, output_dict=True),
            'confusion_matrix': cm
        }

def create_sample_dataset(n_samples=1000, n_features=10, n_classes=3):
    """Create a sample classification dataset"""
    X, y = make_classification(
        n_samples=n_samples,
        n_features=n_features,
        n_informative=8,
        n_redundant=2,
        n_classes=n_classes,
        random_state=42
    )

    # Convert to DataFrame for easier handling
    feature_names = [f'feature_{i}' for i in range(n_features)]
    df = pd.DataFrame(X, columns=feature_names)
    df['target'] = y

    return df

def main():
    print("=== Machine Learning Pipeline Demo ===\\n")

    # Create sample dataset
    print("1. Creating sample dataset...")
    df = create_sample_dataset()
    print(f"Dataset shape: {df.shape}")
    print(f"Target distribution: {df['target'].value_counts().to_dict()}\\n")

    # Split features and target
    X = df.drop('target', axis=1)
    y = df['target']

    # Split into train and test sets
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    print(f"Training set shape: {X_train.shape}")
    print(f"Test set shape: {X_test.shape}\\n")

    # Initialize components
    processor = MLDataProcessor()
    trainer = MLModelTrainer()

    # Preprocess data
    print("2. Preprocessing data...")
    X_train_processed = processor.preprocess_data(X_train)
    X_test_processed = processor.preprocess_data(X_test)

    # Train model
    print("3. Training model...")
    model = trainer.train_model(X_train_processed, y_train)

    # Evaluate model
    print("4. Evaluating model...")
    metrics = trainer.evaluate_model(X_test_processed, y_test)

    # Feature importance analysis
    print("5. Feature importance analysis...")
    feature_importance = pd.DataFrame({
        'feature': X_train.columns,
        'importance': model.named_steps['classifier'].feature_importances_
    }).sort_values('importance', ascending=False)

    print("\\nTop 5 most important features:")
    print(feature_importance.head())

    return model, metrics, feature_importance

if __name__ == "__main__":
    model, metrics, feature_importance = main()`
        }
      ]
    },
    {
      id: "machine-learning-fundamentals",
      title: "Machine Learning Fundamentals",
      content: "Machine Learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed. This section covers the core concepts, algorithms, and mathematical foundations of ML.\n\n**Supervised Learning**: Training models on labeled data to predict outcomes or classify data points.\n\n**Unsupervised Learning**: Finding patterns and structures in unlabeled data through clustering and dimensionality reduction.\n\n**Reinforcement Learning**: Learning through interaction with an environment to maximize rewards.\n\n**Model Evaluation**: Techniques to assess model performance, avoid overfitting, and ensure generalization.\n\n**Feature Engineering**: Creating, selecting, and transforming features to improve model performance.\n\n**Bias-Variance Tradeoff**: Understanding the fundamental tradeoff between model complexity and generalization.\n\n**Cross-Validation**: Robust methods for model validation and hyperparameter tuning.\n\n**Regularization**: Techniques to prevent overfitting and improve model generalization.",
      keyTopics: [
        "Supervised vs unsupervised learning",
        "Training, validation, and test sets",
        "Model evaluation metrics (accuracy, precision, recall, F1-score)",
        "Overfitting and underfitting",
        "Bias-variance tradeoff",
        "Cross-validation techniques",
        "Feature scaling and normalization",
        "Handling imbalanced datasets"
      ],
      practicalExercises: [
        "Implement linear regression from scratch",
        "Build a logistic regression classifier",
        "Perform k-means clustering on unlabeled data",
        "Evaluate model performance with various metrics",
        "Handle class imbalance in classification tasks",
        "Implement cross-validation for model selection",
        "Perform feature engineering on real datasets",
        "Tune hyperparameters using grid search"
      ],
      codeExamples: [
        {
          title: "Linear Regression Implementation",
          language: "python",
          code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

class LinearRegression:
    def __init__(self, learning_rate=0.01, n_iterations=1000):
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        self.weights = None
        self.bias = None
        self.cost_history = []

    def fit(self, X, y):
        """Train the linear regression model using gradient descent"""
        n_samples, n_features = X.shape

        # Initialize parameters
        self.weights = np.zeros(n_features)
        self.bias = 0

        # Gradient descent
        for _ in range(self.n_iterations):
            # Forward pass
            y_predicted = np.dot(X, self.weights) + self.bias

            # Compute gradients
            dw = (1 / n_samples) * np.dot(X.T, (y_predicted - y))
            db = (1 / n_samples) * np.sum(y_predicted - y)

            # Update parameters
            self.weights -= self.learning_rate * dw
            self.bias -= self.learning_rate * db

            # Compute and store cost
            cost = self._compute_cost(X, y)
            self.cost_history.append(cost)

    def predict(self, X):
        """Make predictions using trained model"""
        return np.dot(X, self.weights) + self.bias

    def _compute_cost(self, X, y):
        """Compute mean squared error cost"""
        n_samples = len(y)
        y_predicted = self.predict(X)
        cost = (1 / (2 * n_samples)) * np.sum((y_predicted - y) ** 2)
        return cost

    def get_coefficients(self):
        """Return model coefficients"""
        return self.weights, self.bias

def generate_sample_data(n_samples=100):
    """Generate sample data for demonstration"""
    np.random.seed(42)

    # Generate features
    X = np.random.randn(n_samples, 1)
    X = np.sort(X, axis=0)  # Sort for better visualization

    # Generate target with some noise
    y = 2 * X.flatten() + 1 + np.random.randn(n_samples) * 0.5

    return X, y

def evaluate_model(y_true, y_pred):
    """Evaluate regression model performance"""
    mse = mean_squared_error(y_true, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_true, y_pred)

    print(f"Mean Squared Error: {mse:.4f}")
    print(f"Root Mean Squared Error: {rmse:.4f}")
    print(f"R² Score: {r2:.4f}")

    return mse, rmse, r2

def plot_results(X, y, y_pred, cost_history):
    """Visualize results"""
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))

    # Plot data and predictions
    ax1.scatter(X, y, color='blue', alpha=0.6, label='Actual data')
    ax1.plot(X, y_pred, color='red', linewidth=2, label='Predictions')
    ax1.set_xlabel('Feature')
    ax1.set_ylabel('Target')
    ax1.set_title('Linear Regression Fit')
    ax1.legend()
    ax1.grid(True, alpha=0.3)

    # Plot cost history
    ax2.plot(cost_history, color='green')
    ax2.set_xlabel('Iteration')
    ax2.set_ylabel('Cost (MSE)')
    ax2.set_title('Cost Function Convergence')
    ax2.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.show()

def main():
    print("=== Linear Regression from Scratch ===\\n")

    # Generate sample data
    print("1. Generating sample data...")
    X, y = generate_sample_data(200)
    print(f"Data shape: X={X.shape}, y={y.shape}\\n")

    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    print(f"Training set: {X_train.shape[0]} samples")
    print(f"Test set: {X_test.shape[0]} samples\\n")

    # Train model
    print("2. Training linear regression model...")
    model = LinearRegression(learning_rate=0.1, n_iterations=1000)
    model.fit(X_train, y_train)

    print(f"Final cost: {model.cost_history[-1]:.6f}")
    weights, bias = model.get_coefficients()
    print(f"Learned parameters: weight={weights[0]:.4f}, bias={bias:.4f}\\n")

    # Make predictions
    print("3. Making predictions...")
    y_train_pred = model.predict(X_train)
    y_test_pred = model.predict(X_test)

    # Evaluate model
    print("4. Evaluating model performance...")
    print("\\nTraining set performance:")
    evaluate_model(y_train, y_train_pred)

    print("\\nTest set performance:")
    evaluate_model(y_test, y_test_pred)

    # Visualize results
    print("\\n5. Visualizing results...")
    plot_results(X_train, y_train, y_train_pred, model.cost_history)

if __name__ == "__main__":
    main()`
        },
        {
          title: "Neural Networks with TensorFlow",
          language: "python",
          code: `import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import make_classification

class NeuralNetworkBuilder:
    def __init__(self):
        self.model = None
        self.history = None

    def create_mlp_classifier(self, input_dim, num_classes, hidden_layers=[64, 32]):
        """Create a Multi-Layer Perceptron classifier"""
        model = keras.Sequential()
        model.add(layers.Input(shape=(input_dim,)))

        # Hidden layers
        for units in hidden_layers:
            model.add(layers.Dense(units, activation='relu'))
            model.add(layers.Dropout(0.2))  # Prevent overfitting
            model.add(layers.BatchNormalization())

        # Output layer
        model.add(layers.Dense(num_classes, activation='softmax'))

        return model

    def create_cnn_classifier(self, input_shape, num_classes):
        """Create a Convolutional Neural Network classifier"""
        model = keras.Sequential([
            layers.Conv2D(32, (3, 3), activation='relu', input_shape=input_shape),
            layers.MaxPooling2D((2, 2)),
            layers.Conv2D(64, (3, 3), activation='relu'),
            layers.MaxPooling2D((2, 2)),
            layers.Conv2D(64, (3, 3), activation='relu'),
            layers.Flatten(),
            layers.Dense(64, activation='relu'),
            layers.Dropout(0.5),
            layers.Dense(num_classes, activation='softmax')
        ])
        return model

    def compile_model(self, model, optimizer='adam', loss='categorical_crossentropy'):
        """Compile the model with optimizer and loss function"""
        model.compile(
            optimizer=optimizer,
            loss=loss,
            metrics=['accuracy', keras.metrics.Precision(), keras.metrics.Recall()]
        )
        return model

    def train_model(self, model, X_train, y_train, X_val, y_val,
                   epochs=50, batch_size=32, patience=10):
        """Train the model with early stopping and model checkpointing"""

        callbacks = [
            EarlyStopping(
                monitor='val_loss',
                patience=patience,
                restore_best_weights=True,
                verbose=1
            ),
            ModelCheckpoint(
                'best_model.keras',
                monitor='val_accuracy',
                save_best_only=True,
                verbose=1
            )
        ]

        history = model.fit(
            X_train, y_train,
            epochs=epochs,
            batch_size=batch_size,
            validation_data=(X_val, y_val),
            callbacks=callbacks,
            verbose=1
        )

        self.history = history
        return model, history

def prepare_data():
    """Prepare sample classification data"""
    # Generate synthetic data
    X, y = make_classification(
        n_samples=5000,
        n_features=20,
        n_informative=15,
        n_redundant=5,
        n_classes=3,
        random_state=42
    )

    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    X_train, X_val, y_train, y_val = train_test_split(
        X_train, y_train, test_size=0.2, random_state=42
    )

    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_val_scaled = scaler.transform(X_val)
    X_test_scaled = scaler.transform(X_test)

    # Convert labels to one-hot encoding
    y_train_onehot = tf.keras.utils.to_categorical(y_train)
    y_val_onehot = tf.keras.utils.to_categorical(y_val)
    y_test_onehot = tf.keras.utils.to_categorical(y_test)

    return (X_train_scaled, X_val_scaled, X_test_scaled,
            y_train_onehot, y_val_onehot, y_test_onehot,
            y_train, y_val, y_test)

def plot_training_history(history):
    """Plot training and validation metrics"""
    fig, axes = plt.subplots(2, 2, figsize=(15, 10))

    # Accuracy
    axes[0, 0].plot(history.history['accuracy'], label='Training Accuracy')
    axes[0, 0].plot(history.history['val_accuracy'], label='Validation Accuracy')
    axes[0, 0].set_title('Model Accuracy')
    axes[0, 0].set_xlabel('Epoch')
    axes[0, 0].set_ylabel('Accuracy')
    axes[0, 0].legend()
    axes[0, 0].grid(True, alpha=0.3)

    # Loss
    axes[0, 1].plot(history.history['loss'], label='Training Loss')
    axes[0, 1].plot(history.history['val_loss'], label='Validation Loss')
    axes[0, 1].set_title('Model Loss')
    axes[0, 1].set_xlabel('Epoch')
    axes[0, 1].set_ylabel('Loss')
    axes[0, 1].legend()
    axes[0, 1].grid(True, alpha=0.3)

    # Precision
    axes[1, 0].plot(history.history['precision'], label='Training Precision')
    axes[1, 0].plot(history.history['val_precision'], label='Validation Precision')
    axes[1, 0].set_title('Model Precision')
    axes[1, 0].set_xlabel('Epoch')
    axes[1, 0].set_ylabel('Precision')
    axes[1, 0].legend()
    axes[1, 0].grid(True, alpha=0.3)

    # Recall
    axes[1, 1].plot(history.history['recall'], label='Training Recall')
    axes[1, 1].plot(history.history['val_recall'], label='Validation Recall')
    axes[1, 1].set_title('Model Recall')
    axes[1, 0].set_xlabel('Epoch')
    axes[1, 1].set_ylabel('Recall')
    axes[1, 1].legend()
    axes[1, 1].grid(True, alpha=0.3)

    plt.tight_layout()
    plt.show()

def evaluate_model_performance(model, X_test, y_test, y_test_labels):
    """Evaluate model performance with detailed metrics"""
    print("\\n=== Model Evaluation ===")

    # Get predictions
    y_pred_proba = model.predict(X_test)
    y_pred = np.argmax(y_pred_proba, axis=1)

    # Calculate metrics
    test_loss, test_accuracy, test_precision, test_recall = model.evaluate(
        X_test, y_test, verbose=0
    )

    print(f"Test Loss: {test_loss:.4f}")
    print(f"Test Accuracy: {test_accuracy:.4f}")
    print(f"Test Precision: {test_precision:.4f}")
    print(f"Test Recall: {test_recall:.4f}")

    # Calculate F1-score
    f1_score = 2 * (test_precision * test_recall) / (test_precision + test_recall)
    print(f"F1 Score: {f1_score:.4f}")

    # Confusion matrix
    from sklearn.metrics import confusion_matrix, classification_report
    cm = confusion_matrix(y_test_labels, y_pred)
    print("\\nConfusion Matrix:")
    print(cm)

    print("\\nClassification Report:")
    print(classification_report(y_test_labels, y_pred))

    return {
        'loss': test_loss,
        'accuracy': test_accuracy,
        'precision': test_precision,
        'recall': test_recall,
        'f1_score': f1_score,
        'confusion_matrix': cm
    }

def main():
    print("=== Neural Network Training with TensorFlow ===\\n")

    # Set random seeds for reproducibility
    tf.random.set_seed(42)
    np.random.seed(42)

    # Prepare data
    print("1. Preparing data...")
    (X_train, X_val, X_test,
     y_train, y_val, y_test,
     y_train_labels, y_val_labels, y_test_labels) = prepare_data()

    print(f"Training data shape: {X_train.shape}")
    print(f"Validation data shape: {X_val.shape}")
    print(f"Test data shape: {X_test.shape}")
    print(f"Number of classes: {y_train.shape[1]}\\n")

    # Create and compile model
    print("2. Creating neural network model...")
    builder = NeuralNetworkBuilder()
    model = builder.create_mlp_classifier(
        input_dim=X_train.shape[1],
        num_classes=y_train.shape[1],
        hidden_layers=[128, 64, 32]
    )

    model = builder.compile_model(model)
    print("Model architecture:")
    model.summary()
    print()

    # Train model
    print("3. Training model...")
    trained_model, history = builder.train_model(
        model, X_train, y_train, X_val, y_val,
        epochs=100, batch_size=64, patience=15
    )

    # Plot training history
    print("4. Plotting training history...")
    plot_training_history(history)

    # Evaluate model
    print("5. Evaluating model performance...")
    metrics = evaluate_model_performance(trained_model, X_test, y_test, y_test_labels)

    # Save model
    print("6. Saving trained model...")
    trained_model.save('trained_neural_network.keras')
    print("Model saved as 'trained_neural_network.keras'")

    return trained_model, metrics

if __name__ == "__main__":
    model, metrics = main()`
        }
      ]
    },
    {
      id: "natural-language-processing",
      title: "Natural Language Processing",
      content: "Natural Language Processing (NLP) enables computers to understand, interpret, and generate human language. This section covers fundamental NLP techniques, modern transformer architectures, and practical applications.\n\n**Text Preprocessing**: Cleaning and preparing text data for analysis, including tokenization, normalization, and feature extraction.\n\n**Word Embeddings**: Representing words as dense vectors that capture semantic relationships (Word2Vec, GloVe, FastText).\n\n**Transformer Architecture**: The foundation of modern NLP models like BERT, GPT, and T5.\n\n**Named Entity Recognition**: Identifying and classifying named entities in text.\n\n**Sentiment Analysis**: Determining the emotional tone and opinion expressed in text.\n\n**Text Classification**: Categorizing documents or sentences into predefined classes.\n\n**Machine Translation**: Converting text from one language to another.\n\n**Question Answering**: Building systems that can answer questions based on given context.\n\n**Text Generation**: Creating coherent and contextually appropriate text using language models.",
      keyTopics: [
        "Text preprocessing and tokenization",
        "Word embeddings and vector representations",
        "Transformer architecture and attention mechanisms",
        "Named entity recognition (NER)",
        "Sentiment analysis techniques",
        "Text classification with deep learning",
        "Sequence-to-sequence models",
        "Fine-tuning pre-trained language models"
      ],
      practicalExercises: [
        "Implement text preprocessing pipeline",
        "Train word embeddings on custom corpus",
        "Build sentiment analysis classifier",
        "Fine-tune BERT for text classification",
        "Implement named entity recognition",
        "Create text generation system",
        "Build question-answering system",
        "Deploy NLP model as web service"
      ],
      codeExamples: [
        {
          title: "Text Preprocessing and Sentiment Analysis",
          language: "python",
          code: `import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
import pandas as pd
import numpy as np

# Download required NLTK data
nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('wordnet', quiet=True)

class TextPreprocessor:
    def __init__(self):
        self.lemmatizer = WordNetLemmatizer()
        self.stop_words = set(stopwords.words('english'))

        # Custom stop words to add
        self.custom_stop_words = {'movie', 'film', 'one', 'like', 'good', 'bad', 'great'}

    def clean_text(self, text):
        """Clean and preprocess text data"""
        if not isinstance(text, str):
            return ""

        # Convert to lowercase
        text = text.lower()

        # Remove HTML tags
        text = re.sub(r'<[^>]+>', '', text)

        # Remove URLs
        text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)

        # Remove special characters and numbers
        text = re.sub(r'[^a-zA-Z\s]', '', text)

        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text).strip()

        return text

    def tokenize_and_lemmatize(self, text):
        """Tokenize text and perform lemmatization"""
        tokens = word_tokenize(text)

        # Remove stop words and lemmatize
        processed_tokens = []
        for token in tokens:
            if token not in self.stop_words and token not in self.custom_stop_words:
                if len(token) > 2:  # Remove very short words
                    lemma = self.lemmatizer.lemmatize(token)
                    processed_tokens.append(lemma)

        return processed_tokens

    def preprocess(self, text):
        """Complete preprocessing pipeline"""
        cleaned_text = self.clean_text(text)
        tokens = self.tokenize_and_lemmatize(cleaned_text)
        return ' '.join(tokens)

class SentimentAnalyzer:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            max_features=5000,
            ngram_range=(1, 2),
            min_df=5,
            max_df=0.8
        )
        self.model = LogisticRegression(
            random_state=42,
            max_iter=1000,
            C=1.0
        )
        self.preprocessor = TextPreprocessor()

    def prepare_data(self, texts, labels=None):
        """Prepare text data for training or prediction"""
        processed_texts = [self.preprocessor.preprocess(text) for text in texts]

        if labels is not None:
            # Training mode
            X = self.vectorizer.fit_transform(processed_texts)
            return X, labels
        else:
            # Prediction mode
            X = self.vectorizer.transform(processed_texts)
            return X

    def train(self, texts, labels):
        """Train the sentiment analysis model"""
        print("Preprocessing training data...")
        X, y = self.prepare_data(texts, labels)

        print(f"Training data shape: {X.shape}")
        print(f"Feature count: {len(self.vectorizer.get_feature_names_out())}")

        print("Training model...")
        self.model.fit(X, y)

        # Print training accuracy
        train_accuracy = self.model.score(X, y)
        print(f"Training accuracy: {train_accuracy:.4f}")

        return self.model

    def predict(self, texts):
        """Predict sentiment for new texts"""
        X = self.prepare_data(texts)
        predictions = self.model.predict(X)
        probabilities = self.model.predict_proba(X)

        return predictions, probabilities

    def evaluate(self, texts, labels):
        """Evaluate model performance"""
        predictions, _ = self.predict(texts)

        print("\\n=== Model Evaluation ===")
        print(classification_report(labels, predictions))

        return classification_report(labels, predictions, output_dict=True)

def create_sample_reviews():
    """Create sample movie reviews for demonstration"""
    positive_reviews = [
        "This movie was absolutely fantastic! The acting was superb and the plot kept me engaged throughout.",
        "An excellent film with great performances. I highly recommend it to everyone.",
        "Outstanding cinematography and a compelling storyline. One of the best movies I've seen this year.",
        "The direction was masterful and the script was brilliant. A must-watch film!",
        "Incredible special effects and emotional depth. This movie exceeded all my expectations."
    ]

    negative_reviews = [
        "This was a terrible movie. Poor acting and a confusing plot that made no sense.",
        "Complete waste of time. The story was boring and the characters were one-dimensional.",
        "Awful film with bad dialogue and even worse special effects. Don't bother watching.",
        "The worst movie I've seen in years. Uninteresting plot and terrible acting throughout.",
        "Disappointing and poorly made. I regret spending money on this film."
    ]

    reviews = positive_reviews + negative_reviews
    labels = [1] * len(positive_reviews) + [0] * len(negative_reviews)

    return reviews, labels

def analyze_sentiment_examples():
    """Demonstrate sentiment analysis on various text examples"""
    analyzer = SentimentAnalyzer()

    # Create training data
    reviews, labels = create_sample_reviews()

    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        reviews, labels, test_size=0.3, random_state=42, stratify=labels
    )

    print(f"Training samples: {len(X_train)}")
    print(f"Test samples: {len(X_test)}")

    # Train model
    analyzer.train(X_train, y_train)

    # Evaluate model
    analyzer.evaluate(X_test, y_test)

    # Test on new examples
    test_texts = [
        "This film is amazing with wonderful performances!",
        "I hated this movie, it was so boring and poorly made.",
        "An okay movie, nothing special but not terrible either.",
        "The best film I've seen in a long time, absolutely brilliant!",
        "Don't waste your time on this awful piece of cinema."
    ]

    predictions, probabilities = analyzer.predict(test_texts)

    print("\\n=== Sentiment Analysis Results ===")
    for i, (text, pred, prob) in enumerate(zip(test_texts, predictions, probabilities)):
        sentiment = "Positive" if pred == 1 else "Negative"
        confidence = max(prob)
        print(f"{i+1}. {sentiment} ({confidence:.2f}): {text[:60]}...")

def demonstrate_text_preprocessing():
    """Demonstrate text preprocessing pipeline"""
    preprocessor = TextPreprocessor()

    sample_texts = [
        "Hello! This is a SAMPLE text with HTML <b>tags</b> and URLs like https://example.com",
        "Another text with numbers 123 and special chars @#$%^&*()",
        "Short text",
        "A very long text that contains many words and should be processed properly by our preprocessing pipeline"
    ]

    print("\\n=== Text Preprocessing Demonstration ===")
    for i, text in enumerate(sample_texts, 1):
        print(f"\\nOriginal {i}: {text}")
        cleaned = preprocessor.clean_text(text)
        print(f"Cleaned {i}: {cleaned}")
        processed = preprocessor.preprocess(text)
        print(f"Processed {i}: {processed}")

def main():
    print("=== Natural Language Processing: Sentiment Analysis ===\\n")

    # Demonstrate text preprocessing
    demonstrate_text_preprocessing()

    # Perform sentiment analysis
    analyze_sentiment_examples()

if __name__ == "__main__":
    main()`
        },
        {
          title: "Building a Question Answering System",
          language: "python",
          code: `import torch
from transformers import AutoTokenizer, AutoModelForQuestionAnswering
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class QuestionAnsweringSystem:
    def __init__(self, model_name="distilbert-base-uncased-distilled-squad"):
        """Initialize the QA system with a pre-trained model"""
        print("Loading pre-trained model...")
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForQuestionAnswering.from_pretrained(model_name)
        self.contexts = []
        self.vectorizer = TfidfVectorizer(stop_words='english')

    def add_context(self, context_text, title=""):
        """Add context documents to the knowledge base"""
        self.contexts.append({
            'title': title,
            'content': context_text,
            'processed': self._preprocess_text(context_text)
        })
        print(f"Added context: {title or 'Untitled'}")

    def _preprocess_text(self, text):
        """Preprocess text for better matching"""
        # Simple preprocessing - can be enhanced
        return text.lower().strip()

    def _find_relevant_contexts(self, question, top_k=3):
        """Find most relevant contexts using TF-IDF similarity"""
        if not self.contexts:
            return []

        # Prepare documents
        documents = [ctx['processed'] for ctx in self.contexts]

        # Add question to corpus for vectorization
        all_texts = documents + [question.lower()]

        # Vectorize
        try:
            tfidf_matrix = self.vectorizer.fit_transform(all_texts)
            question_vector = tfidf_matrix[-1]
            context_vectors = tfidf_matrix[:-1]

            # Calculate similarities
            similarities = cosine_similarity(question_vector, context_vectors)[0]

            # Get top-k most similar contexts
            top_indices = np.argsort(similarities)[-top_k:][::-1]
            relevant_contexts = []

            for idx in top_indices:
                if similarities[idx] > 0.1:  # Similarity threshold
                    relevant_contexts.append({
                        'context': self.contexts[idx],
                        'similarity': similarities[idx]
                    })

            return relevant_contexts

        except ValueError:
            # Fallback if vectorization fails
            return [{'context': self.contexts[0], 'similarity': 1.0}]

    def answer_question(self, question, max_answer_length=50):
        """Answer a question using the knowledge base"""
        if not self.contexts:
            return {
                'answer': "No context available. Please add some documents first.",
                'confidence': 0.0,
                'context': ""
            }

        # Find relevant contexts
        relevant_contexts = self._find_relevant_contexts(question)

        if not relevant_contexts:
            return {
                'answer': "I couldn't find relevant information to answer this question.",
                'confidence': 0.0,
                'context': ""
            }

        best_answer = ""
        best_score = 0.0
        best_context = ""

        # Try to answer using each relevant context
        for item in relevant_contexts:
            context_data = item['context']
            context_text = context_data['content']

            # Use the model to find answer in this context
            answer_data = self._extract_answer(question, context_text, max_answer_length)

            # Combine similarity and model confidence
            combined_score = item['similarity'] * answer_data['score']

            if combined_score > best_score:
                best_score = combined_score
                best_answer = answer_data['answer']
                best_context = context_text

        return {
            'answer': best_answer,
            'confidence': best_score,
            'context': best_context[:200] + "..." if len(best_context) > 200 else best_context
        }

    def _extract_answer(self, question, context, max_length):
        """Extract answer from context using the QA model"""
        # Tokenize input
        inputs = self.tokenizer(
            question,
            context,
            return_tensors="pt",
            max_length=512,
            truncation=True,
            padding=True
        )

        # Get model predictions
        with torch.no_grad():
            outputs = self.model(**inputs)

        # Get start and end logits
        start_logits = outputs.start_logits
        end_logits = outputs.end_logits

        # Find best answer span
        start_idx = torch.argmax(start_logits)
        end_idx = torch.argmax(end_logits)

        # Convert tokens back to text
        tokens = self.tokenizer.convert_ids_to_tokens(inputs["input_ids"][0])
        answer_tokens = tokens[start_idx:end_idx + 1]

        # Decode answer
        answer = self.tokenizer.convert_tokens_to_string(answer_tokens)

        # Calculate confidence score
        start_score = torch.softmax(start_logits, dim=1)[0][start_idx].item()
        end_score = torch.softmax(end_logits, dim=1)[0][end_idx].item()
        confidence = (start_score + end_score) / 2

        # Clean up answer
        answer = answer.strip()
        if not answer or answer.lower() in ['[cls]', '[sep]', '[unk]']:
            answer = "I couldn't find a specific answer in the provided context."

        return {
            'answer': answer,
            'score': confidence
        }

def create_sample_knowledge_base(qa_system):
    """Create a sample knowledge base for demonstration"""
    contexts = [
        {
            'title': 'Machine Learning Basics',
            'content': '''
            Machine learning is a subset of artificial intelligence that enables computers to learn
            and make decisions from data without being explicitly programmed. There are three main
            types of machine learning: supervised learning, unsupervised learning, and reinforcement
            learning. Supervised learning uses labeled data to train models that can predict outcomes
            or classify data. Unsupervised learning finds patterns in unlabeled data through clustering
            and dimensionality reduction. Reinforcement learning learns through interaction with an
            environment to maximize rewards.
            '''
        },
        {
            'title': 'Neural Networks',
            'content': '''
            Neural networks are computing systems inspired by biological neural networks. They consist
            of interconnected nodes called neurons organized in layers. The input layer receives data,
            hidden layers process the information, and the output layer produces results. Deep learning
            uses neural networks with many hidden layers. Convolutional neural networks (CNNs) are
            particularly effective for image processing, while recurrent neural networks (RNNs) excel
            at sequence data like text and time series.
            '''
        },
        {
            'title': 'Natural Language Processing',
            'content': '''
            Natural Language Processing (NLP) enables computers to understand, interpret, and generate
            human language. Key NLP tasks include text classification, named entity recognition,
            sentiment analysis, machine translation, and question answering. Modern NLP relies heavily
            on transformer architectures like BERT, GPT, and T5. Tokenization breaks text into smaller
            units, word embeddings represent words as vectors, and attention mechanisms help models
            focus on relevant parts of the input.
            '''
        }
    ]

    for ctx in contexts:
        qa_system.add_context(ctx['content'], ctx['title'])

def demonstrate_qa_system():
    """Demonstrate the question answering system"""
    print("=== Question Answering System Demo ===\\n")

    # Initialize QA system
    qa_system = QuestionAnsweringSystem()

    # Add knowledge base
    print("Setting up knowledge base...")
    create_sample_knowledge_base(qa_system)
    print(f"Knowledge base ready with {len(qa_system.contexts)} documents\\n")

    # Test questions
    test_questions = [
        "What are the three main types of machine learning?",
        "What is a neural network?",
        "How do convolutional neural networks work?",
        "What is natural language processing?",
        "What are transformer architectures used for?"
    ]

    print("Answering questions:\\n")
    for i, question in enumerate(test_questions, 1):
        print(f"Q{i}: {question}")

        result = qa_system.answer_question(question)
        print(f"A{i}: {result['answer']}")
        print(f"Confidence: {result['confidence']:.3f}")
        print(f"Context: {result['context']}\\n")

def interactive_qa_demo():
    """Interactive demo for user questions"""
    qa_system = QuestionAnsweringSystem()
    create_sample_knowledge_base(qa_system)

    print("\\n=== Interactive Q&A Demo ===")
    print("Ask questions about machine learning, neural networks, or NLP!")
    print("Type 'quit' to exit.\\n")

    while True:
        question = input("Your question: ").strip()

        if question.lower() in ['quit', 'exit', 'q']:
            print("Goodbye!")
            break

        if not question:
            continue

        result = qa_system.answer_question(question)
        print(f"\\nAnswer: {result['answer']}")
        print(f"Confidence: {result['confidence']:.3f}")
        print(f"Source: {result['context']}\\n")

def main():
    """Main function"""
    try:
        # Run demonstration
        demonstrate_qa_system()

        # Uncomment for interactive mode
        # interactive_qa_demo()

    except Exception as e:
        print(f"Error: {e}")
        print("Make sure you have the required dependencies installed:")
        print("pip install torch transformers scikit-learn")

if __name__ == "__main__":
    main()`
        }
      ]
    },
    {
      id: "computer-vision-deep-learning",
      title: "Computer Vision with Deep Learning",
      content: "Computer vision enables computers to interpret and understand visual information from the world. This section covers fundamental computer vision techniques, convolutional neural networks, and practical applications.\n\n**Image Processing**: Basic operations like filtering, edge detection, and morphological transformations.\n\n**Feature Extraction**: Identifying key features and patterns in images using traditional computer vision techniques.\n\n**Convolutional Neural Networks**: Deep learning architectures specifically designed for processing visual data.\n\n**Object Detection**: Identifying and localizing objects within images using techniques like YOLO and Faster R-CNN.\n\n**Image Segmentation**: Dividing images into meaningful regions or identifying pixel-level classifications.\n\n**Face Recognition**: Identifying and verifying individuals from facial images.\n\n**Image Generation**: Creating new images using generative adversarial networks (GANs) and diffusion models.\n\n**Transfer Learning**: Leveraging pre-trained models for new computer vision tasks.\n\n**Model Optimization**: Techniques for deploying computer vision models on edge devices and mobile platforms.",
      keyTopics: [
        "Image preprocessing and augmentation",
        "Convolutional neural networks (CNNs)",
        "Object detection and localization",
        "Image segmentation techniques",
        "Transfer learning with pre-trained models",
        "Generative adversarial networks (GANs)",
        "Model compression and optimization",
        "Real-time computer vision applications"
      ],
      practicalExercises: [
        "Implement image preprocessing pipeline",
        "Build CNN for image classification",
        "Train object detection model",
        "Perform image segmentation",
        "Fine-tune pre-trained models",
        "Implement face recognition system",
        "Deploy model to mobile device",
        "Optimize model for real-time inference"
      ],
      codeExamples: [
        {
          title: "Image Classification with Convolutional Neural Networks",
          language: "python",
          code: `import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, ReduceLROnPlateau
import numpy as np
import matplotlib.pyplot as plt
import os

class CNNImageClassifier:
    def __init__(self, input_shape=(224, 224, 3), num_classes=10):
        self.input_shape = input_shape
        self.num_classes = num_classes
        self.model = None
        self.history = None

    def create_model(self):
        """Create a convolutional neural network for image classification"""
        model = keras.Sequential([
            # Input layer
            layers.Input(shape=self.input_shape),

            # First convolutional block
            layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
            layers.BatchNormalization(),
            layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
            layers.BatchNormalization(),
            layers.MaxPooling2D((2, 2)),
            layers.Dropout(0.25),

            # Second convolutional block
            layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
            layers.BatchNormalization(),
            layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
            layers.BatchNormalization(),
            layers.MaxPooling2D((2, 2)),
            layers.Dropout(0.25),

            # Third convolutional block
            layers.Conv2D(128, (3, 3), activation='relu', padding='same'),
            layers.BatchNormalization(),
            layers.Conv2D(128, (3, 3), activation='relu', padding='same'),
            layers.BatchNormalization(),
            layers.MaxPooling2D((2, 2)),
            layers.Dropout(0.25),

            # Dense layers
            layers.Flatten(),
            layers.Dense(512, activation='relu'),
            layers.BatchNormalization(),
            layers.Dropout(0.5),
            layers.Dense(256, activation='relu'),
            layers.BatchNormalization(),
            layers.Dropout(0.5),

            # Output layer
            layers.Dense(self.num_classes, activation='softmax')
        ])

        return model

    def compile_model(self, model, learning_rate=0.001):
        """Compile the model with optimizer and loss function"""
        optimizer = keras.optimizers.Adam(learning_rate=learning_rate)

        model.compile(
            optimizer=optimizer,
            loss='categorical_crossentropy',
            metrics=['accuracy', keras.metrics.Precision(), keras.metrics.Recall()]
        )

        return model

    def create_data_generators(self, train_dir, validation_dir=None,
                             test_dir=None, batch_size=32):
        """Create data generators for training and validation"""

        # Training data generator with augmentation
        train_datagen = ImageDataGenerator(
            rescale=1./255,
            rotation_range=20,
            width_shift_range=0.2,
            height_shift_range=0.2,
            shear_range=0.2,
            zoom_range=0.2,
            horizontal_flip=True,
            fill_mode='nearest'
        )

        # Validation/Test data generator (no augmentation)
        val_datagen = ImageDataGenerator(rescale=1./255)

        # Create generators
        train_generator = train_datagen.flow_from_directory(
            train_dir,
            target_size=self.input_shape[:2],
            batch_size=batch_size,
            class_mode='categorical',
            shuffle=True
        )

        generators = {'train': train_generator}

        if validation_dir:
            validation_generator = val_datagen.flow_from_directory(
                validation_dir,
                target_size=self.input_shape[:2],
                batch_size=batch_size,
                class_mode='categorical',
                shuffle=False
            )
            generators['validation'] = validation_generator

        if test_dir:
            test_generator = val_datagen.flow_from_directory(
                test_dir,
                target_size=self.input_shape[:2],
                batch_size=batch_size,
                class_mode='categorical',
                shuffle=False
            )
            generators['test'] = test_generator

        return generators

    def train_model(self, train_generator, validation_generator=None,
                   epochs=50, patience=10):
        """Train the CNN model"""

        callbacks = [
            EarlyStopping(
                monitor='val_accuracy' if validation_generator else 'accuracy',
                patience=patience,
                restore_best_weights=True,
                verbose=1
            ),
            ModelCheckpoint(
                'best_cnn_model.keras',
                monitor='val_accuracy' if validation_generator else 'accuracy',
                save_best_only=True,
                verbose=1
            ),
            ReduceLROnPlateau(
                monitor='val_accuracy' if validation_generator else 'accuracy',
                factor=0.5,
                patience=5,
                min_lr=1e-7,
                verbose=1
            )
        ]

        print("Starting model training...")
        print(f"Training samples: {train_generator.samples}")
        if validation_generator:
            print(f"Validation samples: {validation_generator.samples}")

        history = self.model.fit(
            train_generator,
            epochs=epochs,
            validation_data=validation_generator,
            callbacks=callbacks,
            verbose=1
        )

        self.history = history
        return history

    def evaluate_model(self, test_generator):
        """Evaluate model performance on test data"""
        print("\\n=== Model Evaluation ===")

        results = self.model.evaluate(test_generator, verbose=1)

        metrics_names = self.model.metrics_names
        for name, value in zip(metrics_names, results):
            print(f"{name.capitalize()}: {value:.4f}")

        return dict(zip(metrics_names, results))

    def plot_training_history(self):
        """Plot training and validation metrics"""
        if self.history is None:
            print("No training history available. Train the model first.")
            return

        fig, axes = plt.subplots(2, 2, figsize=(15, 10))

        # Accuracy
        axes[0, 0].plot(self.history.history.get('accuracy', []), label='Training Accuracy')
        if 'val_accuracy' in self.history.history:
            axes[0, 0].plot(self.history.history['val_accuracy'], label='Validation Accuracy')
        axes[0, 0].set_title('Model Accuracy')
        axes[0, 0].set_xlabel('Epoch')
        axes[0, 0].set_ylabel('Accuracy')
        axes[0, 0].legend()
        axes[0, 0].grid(True, alpha=0.3)

        # Loss
        axes[0, 1].plot(self.history.history.get('loss', []), label='Training Loss')
        if 'val_loss' in self.history.history:
            axes[0, 1].plot(self.history.history['val_loss'], label='Validation Loss')
        axes[0, 1].set_title('Model Loss')
        axes[0, 1].set_xlabel('Epoch')
        axes[0, 1].set_ylabel('Loss')
        axes[0, 1].legend()
        axes[0, 1].grid(True, alpha=0.3)

        # Precision
        if 'precision' in self.history.history:
            axes[1, 0].plot(self.history.history['precision'], label='Training Precision')
            if 'val_precision' in self.history.history:
                axes[1, 0].plot(self.history.history['val_precision'], label='Validation Precision')
            axes[1, 0].set_title('Model Precision')
            axes[1, 0].set_xlabel('Epoch')
            axes[1, 0].set_ylabel('Precision')
            axes[1, 0].legend()
            axes[1, 0].grid(True, alpha=0.3)

        # Recall
        if 'recall' in self.history.history:
            axes[1, 1].plot(self.history.history['recall'], label='Training Recall')
            if 'val_recall' in self.history.history:
                axes[1, 1].plot(self.history.history['val_recall'], label='Validation Recall')
            axes[1, 1].set_title('Model Recall')
            axes[1, 1].set_xlabel('Epoch')
            axes[1, 1].set_ylabel('Recall')
            axes[1, 1].legend()
            axes[1, 1].grid(True, alpha=0.3)

        plt.tight_layout()
        plt.show()

def create_sample_data_structure():
    """Create a sample directory structure for demonstration"""
    import shutil

    base_dir = 'sample_dataset'
    if os.path.exists(base_dir):
        shutil.rmtree(base_dir)

    # Create directories
    for split in ['train', 'validation', 'test']:
        for category in ['class_0', 'class_1', 'class_2']:
            os.makedirs(os.path.join(base_dir, split, category), exist_ok=True)

    print(f"Created sample dataset structure at: {base_dir}")
    print("Directory structure:")
    print(f"{base_dir}/")
    print("├── train/")
    print("│   ├── class_0/")
    print("│   ├── class_1/")
    print("│   └── class_2/")
    print("├── validation/")
    print("│   ├── class_0/")
    print("│   ├── class_1/")
    print("│   └── class_2/")
    print("└── test/")
    print("    ├── class_0/")
    print("    ├── class_1/")
    print("    └── class_2/")

    return base_dir

def main():
    print("=== Convolutional Neural Network for Image Classification ===\\n")

    # Set random seed for reproducibility
    tf.random.set_seed(42)
    np.random.seed(42)

    # Create CNN classifier
    print("1. Creating CNN model...")
    classifier = CNNImageClassifier(input_shape=(224, 224, 3), num_classes=3)
    model = classifier.create_model()
    model = classifier.compile_model(model)

    print("Model architecture:")
    model.summary()
    print()

    # Create sample data structure
    print("2. Setting up data structure...")
    data_dir = create_sample_data_structure()

    # Note: In a real scenario, you would have actual images in these directories
    print("\\nNote: This is a demonstration. In practice, you would:")
    print("- Place actual images in the class directories")
    print("- Ensure each class has sufficient training samples")
    print("- Use data generators to load and preprocess images")
    print("- Train the model with real image data")

    # Example of how to use data generators (commented out since we don't have real data)
    '''
    print("\\n3. Creating data generators...")
    generators = classifier.create_data_generators(
        train_dir=os.path.join(data_dir, 'train'),
        validation_dir=os.path.join(data_dir, 'validation'),
        test_dir=os.path.join(data_dir, 'test'),
        batch_size=32
    )

    print("\\n4. Training model...")
    history = classifier.train_model(
        generators['train'],
        generators.get('validation'),
        epochs=50,
        patience=10
    )

    print("\\n5. Evaluating model...")
    if 'test' in generators:
        metrics = classifier.evaluate_model(generators['test'])

    print("\\n6. Plotting training history...")
    classifier.plot_training_history()
    '''

    print("\\n=== Training Simulation ===")
    print("To train a real CNN model, you would need:")
    print("1. A dataset with labeled images (e.g., CIFAR-10, ImageNet)")
    print("2. Sufficient computational resources (GPU recommended)")
    print("3. Proper data preprocessing and augmentation")
    print("4. Hyperparameter tuning and model optimization")

    print("\\n=== Key CNN Concepts Demonstrated ===")
    print("✓ Convolutional layers for feature extraction")
    print("✓ Pooling layers for dimensionality reduction")
    print("✓ Dropout for regularization")
    print("✓ Batch normalization for training stability")
    print("✓ Data augmentation for better generalization")
    print("✓ Early stopping and learning rate scheduling")

if __name__ == "__main__":
    main()`
        },
        {
          title: "Object Detection with YOLO",
          language: "python",
          code: `import cv2
import numpy as np
import matplotlib.pyplot as plt
from ultralytics import YOLO
import torch
from PIL import Image
import requests
from io import BytesIO

class ObjectDetector:
    def __init__(self, model_path=None, confidence_threshold=0.5):
        """Initialize the object detector with YOLO model"""
        self.confidence_threshold = confidence_threshold
        self.model = None

        if model_path:
            # Load custom trained model
            self.model = YOLO(model_path)
        else:
            # Load pre-trained YOLOv8 model
            self.model = YOLO('yolov8n.pt')  # nano model for speed

        print("Object detector initialized with YOLOv8")

    def detect_objects(self, image, show_results=True):
        """Detect objects in an image"""
        # Run inference
        results = self.model(image, conf=self.confidence_threshold)

        # Process results
        detections = []
        for result in results:
            boxes = result.boxes
            if boxes is not None:
                for box in boxes:
                    # Extract bounding box coordinates
                    x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
                    confidence = box.conf[0].cpu().numpy()
                    class_id = int(box.cls[0].cpu().numpy())
                    class_name = result.names[class_id]

                    detection = {
                        'bbox': [int(x1), int(y1), int(x2), int(y2)],
                        'confidence': float(confidence),
                        'class_id': class_id,
                        'class_name': class_name
                    }
                    detections.append(detection)

        if show_results:
            self._visualize_detections(image, detections)

        return detections

    def _visualize_detections(self, image, detections):
        """Visualize detection results"""
        img_copy = image.copy()

        # Colors for different classes
        colors = plt.cm.rainbow(np.linspace(0, 1, 80))

        for detection in detections:
            bbox = detection['bbox']
            confidence = detection['confidence']
            class_name = detection['class_name']

            # Choose color based on class
            color = tuple(int(c * 255) for c in colors[detection['class_id'] % len(colors)][:3])

            # Draw bounding box
            cv2.rectangle(img_copy, (bbox[0], bbox[1]), (bbox[2], bbox[3]), color, 2)

            # Draw label
            label = ".2f"
            (label_width, label_height), _ = cv2.getTextSize(
                label, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 1
            )

            # Draw label background
            cv2.rectangle(img_copy,
                         (bbox[0], bbox[1] - label_height - 5),
                         (bbox[0] + label_width, bbox[1]),
                         color, -1)

            # Draw label text
            cv2.putText(img_copy, label,
                       (bbox[0], bbox[1] - 5),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)

        # Display image
        plt.figure(figsize=(12, 8))
        plt.imshow(cv2.cvtColor(img_copy, cv2.COLOR_BGR2RGB))
        plt.axis('off')
        plt.title(f'Object Detection Results ({len(detections)} objects detected)')
        plt.show()

    def detect_from_url(self, image_url, show_results=True):
        """Detect objects from image URL"""
        try:
            response = requests.get(image_url)
            image = Image.open(BytesIO(response.content))
            image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

            return self.detect_objects(image, show_results)
        except Exception as e:
            print(f"Error loading image from URL: {e}")
            return []

    def detect_from_file(self, image_path, show_results=True):
        """Detect objects from local file"""
        try:
            image = cv2.imread(image_path)
            if image is None:
                raise ValueError(f"Could not load image from {image_path}")

            return self.detect_objects(image, show_results)
        except Exception as e:
            print(f"Error loading image from file: {e}")
            return []

    def get_detection_summary(self, detections):
        """Get summary of detection results"""
        if not detections:
            return "No objects detected."

        # Count objects by class
        class_counts = {}
        total_confidence = 0

        for detection in detections:
            class_name = detection['class_name']
            confidence = detection['confidence']

            if class_name in class_counts:
                class_counts[class_name] += 1
            else:
                class_counts[class_name] = 1

            total_confidence += confidence

        # Create summary
        summary = f"Detected {len(detections)} objects:\\n"
        for class_name, count in class_counts.items():
            summary += f"- {class_name}: {count}\\n"

        avg_confidence = total_confidence / len(detections)
        summary += ".2f"

        return summary

class RealTimeObjectDetector:
    def __init__(self, model_path=None, confidence_threshold=0.5):
        """Initialize real-time object detector"""
        self.detector = ObjectDetector(model_path, confidence_threshold)
        self.cap = None

    def start_webcam_detection(self):
        """Start real-time object detection using webcam"""
        self.cap = cv2.VideoCapture(0)

        if not self.cap.isOpened():
            print("Error: Could not open webcam")
            return

        print("Starting real-time object detection...")
        print("Press 'q' to quit")

        while True:
            ret, frame = self.cap.read()
            if not ret:
                break

            # Detect objects
            detections = self.detector.detect_objects(frame, show_results=False)

            # Draw detections on frame
            for detection in detections:
                bbox = detection['bbox']
                confidence = detection['confidence']
                class_name = detection['class_name']

                # Draw bounding box
                cv2.rectangle(frame, (bbox[0], bbox[1]), (bbox[2], bbox[3]), (0, 255, 0), 2)

                # Draw label
                label = ".2f"
                cv2.putText(frame, label,
                           (bbox[0], bbox[1] - 10),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

            # Add detection count
            cv2.putText(frame, f"Objects: {len(detections)}",
                       (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

            # Display frame
            cv2.imshow('Real-time Object Detection', frame)

            # Break loop on 'q' press
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        self.cleanup()

    def process_video_file(self, video_path, output_path=None):
        """Process video file for object detection"""
        cap = cv2.VideoCapture(video_path)

        if not cap.isOpened():
            print(f"Error: Could not open video file {video_path}")
            return

        # Get video properties
        fps = int(cap.get(cv2.CAP_PROP_FPS))
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

        # Create video writer if output path is provided
        writer = None
        if output_path:
            fourcc = cv2.VideoWriter_fourcc(*'mp4v')
            writer = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

        frame_count = 0
        total_detections = 0

        print("Processing video file...")
        print("Press 'q' to stop processing")

        while True:
            ret, frame = cap.read()
            if not ret:
                break

            frame_count += 1

            # Detect objects every 10th frame for performance
            if frame_count % 10 == 0:
                detections = self.detector.detect_objects(frame, show_results=False)
                total_detections += len(detections)

                # Draw detections
                for detection in detections:
                    bbox = detection['bbox']
                    confidence = detection['confidence']
                    class_name = detection['class_name']

                    cv2.rectangle(frame, (bbox[0], bbox[1]), (bbox[2], bbox[3]), (0, 255, 0), 2)
                    label = ".2f"
                    cv2.putText(frame, label,
                               (bbox[0], bbox[1] - 10),
                               cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

                # Add frame info
                cv2.putText(frame, f"Frame: {frame_count}, Objects: {len(detections)}",
                           (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

                # Write frame to output video
                if writer:
                    writer.write(frame)

                # Display frame
                cv2.imshow('Video Object Detection', frame)

                # Break on 'q' press
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break

        cap.release()
        if writer:
            writer.release()
        cv2.destroyAllWindows()

        print(f"\\nVideo processing complete!")
        print(f"Processed {frame_count} frames")
        print(f"Total objects detected: {total_detections}")

    def cleanup(self):
        """Clean up resources"""
        if self.cap:
            self.cap.release()
        cv2.destroyAllWindows()

def demonstrate_object_detection():
    """Demonstrate object detection capabilities"""
    print("=== Object Detection with YOLO ===\\n")

    # Initialize detector
    detector = ObjectDetector()

    # Example 1: Detect from sample image (you would replace with actual image)
    print("1. Sample object detection workflow:")
    print("   - Load YOLOv8 model")
    print("   - Process input image/video")
    print("   - Extract bounding boxes and class labels")
    print("   - Visualize detection results")

    # Example 2: Real-time detection setup
    print("\\n2. Real-time detection capabilities:")
    print("   - Webcam integration")
    print("   - Video file processing")
    print("   - Live detection overlay")
    print("   - Performance optimization")

    # Example 3: Detection metrics
    print("\\n3. Detection evaluation:")
    print("   - Confidence scores")
    print("   - Class accuracy")
    print("   - Processing speed (FPS)")
    print("   - Model performance metrics")

def main():
    """Main function"""
    try:
        # Run demonstration
        demonstrate_object_detection()

        print("\\n=== Usage Examples ===")
        print("# Initialize detector")
        print("detector = ObjectDetector()")
        print()
        print("# Detect objects in image")
        print("detections = detector.detect_from_file('image.jpg')")
        print()
        print("# Real-time detection")
        print("rt_detector = RealTimeObjectDetector()")
        print("rt_detector.start_webcam_detection()")
        print()
        print("# Process video file")
        print("rt_detector.process_video_file('input.mp4', 'output.mp4')")

    except ImportError as e:
        print(f"Import error: {e}")
        print("\\nRequired packages:")
        print("pip install ultralytics opencv-python matplotlib pillow requests torch")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()`
        }
      ]
    },
    {
      id: "mlops-model-deployment",
      title: "MLOps and Model Deployment",
      content: "MLOps (Machine Learning Operations) focuses on deploying, monitoring, and maintaining machine learning models in production environments. This section covers the complete ML lifecycle from development to deployment.\n\n**Model Versioning**: Tracking different versions of models and their performance metrics.\n\n**Containerization**: Packaging ML models and dependencies using Docker for consistent deployment.\n\n**CI/CD Pipelines**: Automated testing, building, and deployment of ML models.\n\n**Model Monitoring**: Tracking model performance, data drift, and prediction quality in production.\n\n**A/B Testing**: Comparing different model versions or strategies in production.\n\n**Scalable Serving**: Deploying models to handle high-throughput prediction requests.\n\n**Security**: Protecting ML models and data in production environments.\n\n**Cost Optimization**: Managing computational resources and optimizing deployment costs.\n\n**Model Retraining**: Automated pipelines for updating models with new data.",
      keyTopics: [
        "Model serialization and versioning",
        "Containerization with Docker",
        "REST API development for ML models",
        "Model monitoring and alerting",
        "A/B testing frameworks",
        "Scalable model serving",
        "ML pipeline automation",
        "Security best practices for ML"
      ],
      practicalExercises: [
        "Containerize ML model with Docker",
        "Build REST API for model serving",
        "Implement model monitoring dashboard",
        "Set up automated retraining pipeline",
        "Deploy model to cloud platform",
        "Implement A/B testing framework",
        "Create CI/CD pipeline for ML",
        "Set up model performance monitoring"
      ],
      codeExamples: [
        {
          title: "ML Model Deployment with FastAPI",
          language: "python",
          code: `from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import numpy as np
import pickle
import logging
from typing import List, Optional
import time
from datetime import datetime
import uvicorn

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class PredictionRequest(BaseModel):
    features: List[float]
    model_version: Optional[str] = "latest"

class PredictionResponse(BaseModel):
    prediction: float
    confidence: float
    model_version: str
    processing_time: float
    timestamp: str

class BatchPredictionRequest(BaseModel):
    data: List[List[float]]
    model_version: Optional[str] = "latest"

class ModelService:
    def __init__(self):
        self.models = {}
        self.current_version = "v1.0.0"
        self.load_models()

    def load_models(self):
        """Load trained models"""
        try:
            # In practice, you would load actual trained models
            # For demo, we'll create a simple mock model
            self.models[self.current_version] = self._create_mock_model()
            logger.info(f"Loaded model version: {self.current_version}")
        except Exception as e:
            logger.error(f"Error loading models: {e}")
            raise

    def _create_mock_model(self):
        """Create a mock model for demonstration"""
        class MockModel:
            def predict(self, X):
                # Simple mock prediction based on input features
                return np.random.rand(len(X)) * 100

            def predict_proba(self, X):
                # Mock confidence scores
                probs = np.random.rand(len(X))
                return np.column_stack([1-probs, probs])

        return MockModel()

    def predict(self, features: List[float], model_version: str = "latest") -> dict:
        """Make prediction using specified model version"""
        start_time = time.time()

        try:
            # Resolve model version
            if model_version == "latest":
                model_version = self.current_version

            if model_version not in self.models:
                raise ValueError(f"Model version {model_version} not found")

            model = self.models[model_version]

            # Prepare input
            X = np.array(features).reshape(1, -1)

            # Make prediction
            prediction = model.predict(X)[0]
            probabilities = model.predict_proba(X)[0]

            # Calculate confidence (using prediction probability)
            confidence = float(probabilities[1] if prediction > 0.5 else probabilities[0])

            processing_time = time.time() - start_time

            return {
                'prediction': float(prediction),
                'confidence': confidence,
                'model_version': model_version,
                'processing_time': processing_time,
                'timestamp': datetime.now().isoformat()
            }

        except Exception as e:
            logger.error(f"Prediction error: {e}")
            raise

    def batch_predict(self, data: List[List[float]], model_version: str = "latest") -> dict:
        """Make batch predictions"""
        start_time = time.time()

        try:
            # Resolve model version
            if model_version == "latest":
                model_version = self.current_version

            model = self.models[model_version]

            # Prepare input
            X = np.array(data)

            # Make predictions
            predictions = model.predict(X)
            probabilities = model.predict_proba(X)

            # Process results
            results = []
            for i, (pred, prob) in enumerate(zip(predictions, probabilities)):
                confidence = float(prob[1] if pred > 0.5 else prob[0])
                results.append({
                    'sample_id': i,
                    'prediction': float(pred),
                    'confidence': confidence
                })

            processing_time = time.time() - start_time

            return {
                'predictions': results,
                'model_version': model_version,
                'batch_size': len(data),
                'processing_time': processing_time,
                'timestamp': datetime.now().isoformat()
            }

        except Exception as e:
            logger.error(f"Batch prediction error: {e}")
            raise

# Initialize FastAPI app
app = FastAPI(
    title="ML Model API",
    description="REST API for machine learning model predictions",
    version="1.0.0"
)

# Initialize model service
model_service = ModelService()

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "ML Model API is running",
        "version": "1.0.0",
        "endpoints": [
            "/predict - Single prediction",
            "/batch-predict - Batch predictions",
            "/health - Health check",
            "/model-info - Model information"
        ]
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "model_versions": list(model_service.models.keys())
    }

@app.get("/model-info")
async def model_info():
    """Get information about available models"""
    return {
        "available_versions": list(model_service.models.keys()),
        "current_version": model_service.current_version,
        "model_type": "Regression/Classification Model",
        "features_required": 10  # Adjust based on your model
    }

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    """Make a single prediction"""
    try:
        result = model_service.predict(
            request.features,
            request.model_version
        )
        return PredictionResponse(**result)

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Prediction endpoint error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/batch-predict")
async def batch_predict(request: BatchPredictionRequest):
    """Make batch predictions"""
    try:
        if len(request.data) > 1000:
            raise HTTPException(
                status_code=400,
                detail="Batch size too large. Maximum 1000 samples allowed."
            )

        result = model_service.batch_predict(
            request.data,
            request.model_version
        )
        return result

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Batch prediction endpoint error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/predict-file")
async def predict_from_file(file: UploadFile = File(...)):
    """Make predictions from uploaded CSV file"""
    try:
        # Read file content
        content = await file.read()
        content_str = content.decode('utf-8')

        # Parse CSV (simple implementation)
        lines = content_str.strip().split('\\n')
        header = lines[0].split(',')
        data = []

        for line in lines[1:]:
            if line.strip():
                values = [float(x.strip()) for x in line.split(',')]
                data.append(values)

        if len(data) == 0:
            raise HTTPException(status_code=400, detail="No data found in file")

        # Make predictions
        result = model_service.batch_predict(data)

        return {
            "filename": file.filename,
            "predictions": result
        }

    except Exception as e:
        logger.error(f"File prediction error: {e}")
        raise HTTPException(status_code=400, detail=f"Error processing file: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )`
        },
        {
          title: "Model Monitoring and Alerting",
          language: "python",
          code: `import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import classification_report, confusion_matrix
import warnings
warnings.filterwarnings('ignore')

class ModelMonitor:
    def __init__(self, model_name="production_model"):
        self.model_name = model_name
        self.metrics_history = []
        self.prediction_history = []
        self.alerts = []
        self.baseline_metrics = {}

    def log_prediction(self, features, prediction, actual=None, metadata=None):
        """Log a prediction for monitoring"""
        log_entry = {
            'timestamp': datetime.now(),
            'features': features,
            'prediction': prediction,
            'actual': actual,
            'metadata': metadata or {},
            'model_version': getattr(self, 'current_version', 'unknown')
        }

        self.prediction_history.append(log_entry)

        # Keep only last 10000 predictions to manage memory
        if len(self.prediction_history) > 10000:
            self.prediction_history = self.prediction_history[-10000:]

    def calculate_metrics(self, window_hours=24):
        """Calculate performance metrics for recent predictions"""
        if not self.prediction_history:
            return {}

        # Get recent predictions
        cutoff_time = datetime.now() - timedelta(hours=window_hours)
        recent_predictions = [
            p for p in self.prediction_history
            if p['timestamp'] > cutoff_time and p['actual'] is not None
        ]

        if not recent_predictions:
            return {'message': 'No labeled predictions in the specified time window'}

        # Extract predictions and actuals
        y_pred = [p['prediction'] for p in recent_predictions]
        y_true = [p['actual'] for p in recent_predictions]

        # Calculate metrics
        metrics = {}

        # Basic metrics
        if isinstance(y_pred[0], (int, float)) and y_pred[0] != int(y_pred[0]):
            # Regression metrics
            from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
            metrics['mse'] = mean_squared_error(y_true, y_pred)
            metrics['mae'] = mean_absolute_error(y_true, y_pred)
            metrics['r2_score'] = r2_score(y_true, y_pred)
            metrics['mean_prediction'] = np.mean(y_pred)
            metrics['std_prediction'] = np.std(y_pred)
        else:
            # Classification metrics
            from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
            metrics['accuracy'] = accuracy_score(y_true, y_pred)
            metrics['precision'] = precision_score(y_true, y_pred, average='weighted')
            metrics['recall'] = recall_score(y_true, y_pred, average='weighted')
            metrics['f1_score'] = f1_score(y_true, y_pred, average='weighted')

        # Data quality metrics
        metrics['sample_count'] = len(recent_predictions)
        metrics['missing_actuals'] = len([p for p in self.prediction_history[-1000:]
                                        if p['actual'] is None])

        # Feature statistics
        if recent_predictions:
            feature_arrays = [p['features'] for p in recent_predictions]
            if feature_arrays and len(feature_arrays[0]) > 0:
                feature_matrix = np.array(feature_arrays)
                metrics['feature_means'] = np.mean(feature_matrix, axis=0).tolist()
                metrics['feature_stds'] = np.std(feature_matrix, axis=0).tolist()

        # Store metrics history
        metrics_entry = {
            'timestamp': datetime.now(),
            'window_hours': window_hours,
            **metrics
        }
        self.metrics_history.append(metrics_entry)

        return metrics

    def detect_drift(self, current_metrics, threshold=0.1):
        """Detect data drift or model performance degradation"""
        alerts = []

        if not self.baseline_metrics:
            self.baseline_metrics = current_metrics.copy()
            return alerts

        # Check for significant changes in key metrics
        key_metrics = ['accuracy', 'precision', 'recall', 'f1_score', 'mse', 'mae']

        for metric in key_metrics:
            if metric in current_metrics and metric in self.baseline_metrics:
                current_value = current_metrics[metric]
                baseline_value = self.baseline_metrics[metric]

                if baseline_value != 0:
                    change_percent = abs(current_value - baseline_value) / baseline_value

                    if change_percent > threshold:
                        alert = {
                            'type': 'metric_drift',
                            'metric': metric,
                            'baseline_value': baseline_value,
                            'current_value': current_value,
                            'change_percent': change_percent,
                            'threshold': threshold,
                            'timestamp': datetime.now(),
                            'severity': 'high' if change_percent > 0.2 else 'medium'
                        }
                        alerts.append(alert)

        # Check for data quality issues
        if 'missing_actuals' in current_metrics:
            missing_rate = current_metrics['missing_actuals'] / max(current_metrics.get('sample_count', 1), 1)
            if missing_rate > 0.5:  # More than 50% missing actuals
                alerts.append({
                    'type': 'data_quality',
                    'issue': 'high_missing_actuals',
                    'missing_rate': missing_rate,
                    'timestamp': datetime.now(),
                    'severity': 'high'
                })

        # Check for feature distribution changes
        if 'feature_means' in current_metrics and 'feature_stds' in self.baseline_metrics:
            current_means = np.array(current_metrics['feature_means'])
            baseline_means = np.array(self.baseline_metrics.get('feature_means', []))

            if len(current_means) == len(baseline_means):
                mean_diff = np.abs(current_means - baseline_means)
                if np.any(mean_diff > 2):  # Significant change in feature means
                    alerts.append({
                        'type': 'feature_drift',
                        'issue': 'feature_mean_shift',
                        'max_difference': float(np.max(mean_diff)),
                        'timestamp': datetime.now(),
                        'severity': 'medium'
                    })

        self.alerts.extend(alerts)
        return alerts

    def generate_report(self, days=7):
        """Generate a comprehensive monitoring report"""
        report = {
            'model_name': self.model_name,
            'report_period_days': days,
            'generated_at': datetime.now(),
            'summary': {},
            'alerts': [],
            'recommendations': []
        }

        # Calculate summary statistics
        cutoff_date = datetime.now() - timedelta(days=days)
        recent_metrics = [m for m in self.metrics_history if m['timestamp'] > cutoff_date]

        if recent_metrics:
            # Aggregate metrics
            numeric_metrics = {}
            for metric_entry in recent_metrics:
                for key, value in metric_entry.items():
                    if isinstance(value, (int, float)) and key not in ['timestamp', 'window_hours']:
                        if key not in numeric_metrics:
                            numeric_metrics[key] = []
                        numeric_metrics[key].append(value)

            # Calculate averages
            for key, values in numeric_metrics.items():
                report['summary'][f'avg_{key}'] = np.mean(values)
                report['summary'][f'std_{key}'] = np.std(values)
                report['summary'][f'min_{key}'] = np.min(values)
                report['summary'][f'max_{key}'] = np.max(values)

        # Include recent alerts
        recent_alerts = [a for a in self.alerts if a['timestamp'] > cutoff_date]
        report['alerts'] = recent_alerts[-10:]  # Last 10 alerts

        # Generate recommendations
        if recent_metrics:
            avg_accuracy = report['summary'].get('avg_accuracy', 0)
            if avg_accuracy < 0.7:
                report['recommendations'].append("Model accuracy is below threshold. Consider retraining.")

            if len(recent_alerts) > 5:
                report['recommendations'].append("High number of alerts detected. Review model performance.")

        return report

    def plot_metrics_history(self, days=7):
        """Plot metrics history"""
        cutoff_date = datetime.now() - timedelta(days=days)
        recent_metrics = [m for m in self.metrics_history if m['timestamp'] > cutoff_date]

        if not recent_metrics:
            print("No metrics data available for plotting")
            return

        # Extract data for plotting
        timestamps = [m['timestamp'] for m in recent_metrics]
        metrics_data = {}

        for metric_entry in recent_metrics:
            for key, value in metric_entry.items():
                if isinstance(value, (int, float)) and key not in ['timestamp', 'window_hours']:
                    if key not in metrics_data:
                        metrics_data[key] = []
                    metrics_data[key].append(value)

        # Create plots
        n_metrics = len(metrics_data)
        if n_metrics == 0:
            return

        fig, axes = plt.subplots(n_metrics, 1, figsize=(12, 4*n_metrics))
        if n_metrics == 1:
            axes = [axes]

        for i, (metric_name, values) in enumerate(metrics_data.items()):
            axes[i].plot(timestamps, values, marker='o', linestyle='-', alpha=0.7)
            axes[i].set_title(f'{metric_name.replace("_", " ").title()} Over Time')
            axes[i].set_xlabel('Time')
            axes[i].set_ylabel(metric_name.replace('_', ' ').title())
            axes[i].grid(True, alpha=0.3)
            axes[i].tick_params(axis='x', rotation=45)

        plt.tight_layout()
        plt.show()

class AlertManager:
    def __init__(self):
        self.alert_handlers = {}

    def register_handler(self, alert_type, handler_function):
        """Register a handler for specific alert types"""
        self.alert_handlers[alert_type] = handler_function

    def handle_alerts(self, alerts):
        """Process alerts using registered handlers"""
        for alert in alerts:
            alert_type = alert['type']
            if alert_type in self.alert_handlers:
                try:
                    self.alert_handlers[alert_type](alert)
                except Exception as e:
                    print(f"Error handling alert {alert_type}: {e}")
            else:
                print(f"No handler registered for alert type: {alert_type}")

def email_alert_handler(alert):
    """Example email alert handler"""
    print(f"📧 EMAIL ALERT: {alert['type'].upper()}")
    print(f"   Metric: {alert.get('metric', 'N/A')}")
    print(f"   Severity: {alert['severity']}")
    print(f"   Change: {alert.get('change_percent', 0)*100:.1f}%")
    print(f"   Time: {alert['timestamp']}")
    # In production, this would send actual emails

def slack_alert_handler(alert):
    """Example Slack alert handler"""
    print(f"💬 SLACK ALERT: {alert['type'].upper()}")
    print(f"   Details: {alert}")
    # In production, this would send Slack messages

def main():
    """Demonstrate model monitoring capabilities"""
    print("=== Model Monitoring and Alerting System ===\\n")

    # Initialize monitor
    monitor = ModelMonitor("production_classifier")

    # Initialize alert manager
    alert_manager = AlertManager()
    alert_manager.register_handler('metric_drift', email_alert_handler)
    alert_manager.register_handler('data_quality', slack_alert_handler)

    print("1. Simulating model predictions and monitoring...")

    # Simulate predictions over time
    np.random.seed(42)
    for i in range(100):
        # Simulate features
        features = np.random.randn(10).tolist()

        # Simulate prediction (with some degradation over time)
        base_prediction = np.random.choice([0, 1])
        noise = np.random.normal(0, 0.1)
        prediction = base_prediction + noise

        # Simulate actual values (with increasing error rate)
        error_rate = min(0.3, i / 200)  # Increasing error rate
        if np.random.rand() < error_rate:
            actual = 1 - base_prediction  # Wrong prediction
        else:
            actual = base_prediction

        # Log prediction
        monitor.log_prediction(features, prediction, actual)

    print("2. Calculating performance metrics...")

    # Calculate metrics
    metrics = monitor.calculate_metrics(window_hours=24)
    print("Current metrics:")
    for key, value in metrics.items():
        if isinstance(value, (int, float)):
            print(f"   {key}: {value:.4f}")

    print("\\n3. Detecting drift and alerts...")

    # Detect drift
    alerts = monitor.detect_drift(metrics, threshold=0.15)
    print(f"Detected {len(alerts)} alerts")

    # Handle alerts
    alert_manager.handle_alerts(alerts)

    print("\\n4. Generating monitoring report...")

    # Generate report
    report = monitor.generate_report(days=1)
    print("Report Summary:")
    print(f"   Average accuracy: {report['summary'].get('avg_accuracy', 'N/A')}")
    print(f"   Total alerts: {len(report['alerts'])}")
    print(f"   Recommendations: {len(report['recommendations'])}")

    if report['recommendations']:
        print("   Recommendations:")
        for rec in report['recommendations']:
            print(f"   - {rec}")

    print("\\n5. Plotting metrics history...")
    # Note: Plotting would require matplotlib display capability
    print("   (Visualization would be displayed in a GUI environment)")

    print("\\n=== Key Monitoring Features ===")
    print("✓ Real-time prediction logging")
    print("✓ Automated metrics calculation")
    print("✓ Drift detection and alerting")
    print("✓ Performance visualization")
    print("✓ Automated report generation")
    print("✓ Configurable alert handlers")

if __name__ == "__main__":
    main()`
        }
      ]
    }
  ],
  aiPrompts: [
    {
      title: "AI Fundamentals",
      content: "Explain the core concepts of artificial intelligence and machine learning."
    },
    {
      title: "Neural Networks",
      content: "How do neural networks work and what are their key components?"
    },
    {
      title: "Deep Learning",
      content: "What is deep learning and how does it differ from traditional machine learning?"
    },
    {
      title: "Computer Vision",
      content: "How can AI be used for image recognition and computer vision tasks?"
    },
    {
      title: "Natural Language Processing",
      content: "Explain how AI processes and understands human language."
    },
    {
      title: "Model Training",
      content: "What are the steps involved in training a machine learning model?"
    },
    {
      title: "AI Ethics",
      content: "What are the ethical considerations in artificial intelligence development?"
    },
    {
      title: "AI Deployment",
      content: "How do you deploy AI models to production environments?"
    }
  ]
};