const gitContent = {
  id: "git",
  tier: 1,
  name: "Git",
  description: "Learn the fundamentals of Git, the most popular version control system. Understand how to track changes, collaborate with others, and manage your codebase effectively.",
  difficulty: "beginner",
  estimatedHours: 4,
  prerequisites: [],
  learningObjectives: [
    "Understand the purpose of version control and why Git is essential.",
    "Learn how to install and configure Git on your local machine.",
    "Master the basic Git workflow: staging, committing, and pushing changes.",
    "Understand how to work with branches for feature development and bug fixes.",
    "Learn how to collaborate with others using remote repositories on platforms like GitHub.",
    "Be able to resolve common merge conflicts."
  ],
  sections: [
    {
      id: "git-what-is-version-control",
      title: "What is Version Control?",
      content: "Version Control is a system that records changes to a file or set of files over time so that you can recall specific versions later. Think of it as a 'save' button for your entire project, allowing you to undo mistakes, see who made changes, and manage different versions of your work. Git is the most widely used modern version control system in the world.",
      keyTopics: ["Version Control System (VCS)", "Snapshots", "History"],
      codeExamples: []
    },
    {
      id: "git-getting-started",
      title: "Getting Started: Installation and Configuration",
      content: "Before you can use Git, you need to install it on your computer. Once installed, you should configure your user name and email address. This is important because every Git commit uses this information, and it’s immutably baked into the commits you start creating.",
      keyTopics: ["Installation", "Configuration", "git config"],
      codeExamples: [
        {
          title: "Configure Your Git Username",
          code: `git config --global user.name "Your Name"`
        },
        {
          title: "Configure Your Git Email",
          code: `git config --global user.email "your.email@example.com"`
        }
      ]
    },
    {
      id: "git-basic-workflow",
      title: "The Basic Git Workflow",
      content: "The core of the Git workflow consists of three stages. First, you modify files in your working directory. Second, you stage the files, adding snapshots of them to your staging area. Finally, you commit, which takes the files as they are in the staging area and stores that snapshot permanently to your Git directory.",
      keyTopics: ["Working Directory", "Staging Area", "Repository", "git add", "git commit"],
      codeExamples: [
        {
          title: "Initializing a Repository",
          code: `git init`
        },
        {
          title: "Staging a File",
          code: `git add <file-name>`
        },
        {
          title: "Committing a Staged File",
          code: `git commit -m "Your descriptive commit message"`
        }
      ]
    },
    {
      id: "git-branching-and-merging",
      title: "Branching and Merging",
      content: "Branching is a powerful feature in Git that allows you to diverge from the main line of development and continue to do work without messing with that main line. This is perfect for developing new features or fixing bugs. Once your work is complete, you can merge your branch back into the main branch.",
      keyTopics: ["Branching", "Merging", "git branch", "git checkout", "git merge"],
      codeExamples: [
        {
          title: "Create a New Branch",
          code: `git branch <new-branch-name>`
        },
        {
          title: "Switch to the New Branch",
          code: `git checkout <new-branch-name>`
        },
        {
          title: "Merge a Branch into Your Current Branch",
          code: `git merge <branch-to-merge>`
        }
      ]
    },
    {
      id: "git-remote-repositories",
      title: "Working with Remote Repositories",
      content: "Remote repositories are versions of your project that are hosted on the internet or network somewhere. Collaborating with others involves managing these remote repositories and pushing and pulling data to and from them when you need to share work. A service like GitHub or GitLab hosts your remote repositories.",
      keyTopics: ["Remote", "Push", "Pull", "Clone", "git remote", "git push", "git pull", "git clone"],
      codeExamples: [
        {
          title: "Clone a Remote Repository",
          code: `git clone <repository-url>`
        },
        {
          title: "Add a Remote Repository",
          code: `git remote add origin <repository-url>`
        },
        {
          title: "Push Changes to a Remote Repository",
          code: `git push origin <branch-name>`
        }
      ]
    }
  ],
  aiPrompts: [
    "Explain Git branching like I'm a writer working on different drafts of a story.",
    "What is the difference between `git fetch` and `git pull`?",
    "Give me a good commit message for changing the color of a button.",
    "How do I undo my last commit?",
    "Walk me through the steps to resolve a simple merge conflict."
  ],
  resources: [
    {
      title: "Pro Git Book",
      url: "https://git-scm.com/book/en/v2"
    },
    {
      title: "GitHub Skills",
      url: "https://skills.github.com/"
    },
    {
      title: "Learn Git Branching (Interactive Tutorial)",
      url: "https://learngitbranching.js.org/"
    }
  ],
  toolsRequired: ["Git CLI", "Text Editor / IDE", "GitHub/GitLab/Bitbucket Account (Optional)"],
  bestPractices: [
    "Commit often and write clear, descriptive commit messages.",
    "Use branches for new features and bug fixes to keep the main branch clean.",
    "Pull regularly from the remote repository to stay up-to-date with changes from others.",
    "Use a `.gitignore` file to exclude unnecessary files from version control."
  ],
  commonPitfalls: [
    "Forgetting to stage files before committing.",
    "Committing large binary files or sensitive data.",
    "Working directly on the main/master branch for new features.",
    "Force pushing (`git push -f`) without understanding the consequences, as it can overwrite history."
  ],
  careerRelevance: "Git is the industry standard for version control. Proficiency in Git is a mandatory skill for virtually every software development job. It is fundamental for collaboration, code management, and deploying applications. Without Git skills, it is nearly impossible to work on a modern development team."
};

export default gitContent;
