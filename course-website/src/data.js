export const courses = [
  {
    id: "python",
    title: "Python Programming",
    category: "PROGRAMMING",
    icon: "🐍",
    level: "Beginner",
    duration: "40+ Hours",
    branches: "CSE • AI/ML • Data Science",
    price: 999,
    originalPrice: 1499,
    description:
      "Learn Python from fundamentals to practical programming and real-world projects.",
    longDescription:
      "This course takes you from Python fundamentals to practical programming. You will learn variables, data types, conditions, loops, functions, object-oriented programming, file handling, libraries and project development.",
    modules: [
      "Introduction to Python",
      "Variables and Data Types",
      "Operators and Expressions",
      "Conditional Statements",
      "Loops and Iterations",
      "Functions",
      "Lists, Tuples, Sets and Dictionaries",
      "Object-Oriented Programming",
      "File Handling",
      "Exception Handling",
      "NumPy and Pandas Introduction",
      "Python Mini Projects",
    ],
  },

  {
    id: "machine-learning",
    title: "Machine Learning",
    category: "AI / MACHINE LEARNING",
    icon: "🤖",
    level: "Intermediate",
    duration: "50+ Hours",
    branches: "AI/ML • Data Science",
    price: 1499,
    originalPrice: 2499,
    description:
      "Understand ML algorithms, model building and practical machine learning projects.",
    longDescription:
      "Learn the foundations of machine learning and build practical models. The course covers data preprocessing, supervised learning, unsupervised learning, model evaluation and real-world ML projects.",
    modules: [
      "Introduction to Machine Learning",
      "Python for Machine Learning",
      "Data Preprocessing",
      "Exploratory Data Analysis",
      "Linear Regression",
      "Logistic Regression",
      "K-Nearest Neighbors",
      "Decision Trees",
      "Random Forest",
      "Support Vector Machines",
      "Clustering",
      "Model Evaluation",
      "Feature Engineering",
      "Machine Learning Projects",
    ],
  },

  {
    id: "dbms",
    title: "Database Management System",
    category: "COMPUTER SCIENCE",
    icon: "🗄️",
    level: "Intermediate",
    duration: "35+ Hours",
    branches: "CSE",
    price: 799,
    originalPrice: 1199,
    description:
      "Learn database concepts, SQL, normalization, transactions and practical database design.",
    longDescription:
      "Understand how databases work and learn SQL through practical examples. This course covers database architecture, ER models, relational models, SQL, normalization, transactions and database design.",
    modules: [
      "Introduction to DBMS",
      "Database Architecture",
      "ER Model",
      "Relational Model",
      "Keys and Constraints",
      "SQL Basics",
      "DDL and DML Commands",
      "SQL Queries",
      "Joins",
      "Subqueries",
      "Normalization",
      "Transactions",
      "Concurrency Control",
      "Database Design Project",
    ],
  },
];

export const resources = [
  {
    id: "notes",
    title: "Subject Notes",
    icon: "📄",
    category: "STUDY MATERIAL",
    description:
      "Easy-to-understand notes for important CSE, AI/ML and Data Science subjects.",
    items: [
      {
        title: "Python Programming Notes",
        subject: "Python",
        type: "PDF",
        action: "pdf",
        file: "/resources/notes/python-notes.pdf",
      },
      {
        title: "Machine Learning Notes",
        subject: "Machine Learning",
        type: "PDF",
        action: "coming-soon",
      },
      {
        title: "DBMS Notes",
        subject: "DBMS",
        type: "PDF",
        action: "coming-soon",
      },
    ],
  },

  {
    id: "questions",
    title: "Important Questions",
    icon: "📝",
    category: "EXAM PREPARATION",
    description:
      "Important university questions and exam-focused preparation material.",
    items: [
      {
        title: "Python Important Questions",
        subject: "Python",
        type: "Questions",
        action: "coming-soon",
      },
      {
        title: "Machine Learning Important Questions",
        subject: "Machine Learning",
        type: "Questions",
        action: "coming-soon",
      },
      {
        title: "DBMS Important Questions",
        subject: "DBMS",
        type: "Questions",
        action: "coming-soon",
      },
    ],
  },

  {
    id: "papers",
    title: "Previous Year Papers",
    icon: "📚",
    category: "PRACTICE",
    description:
      "Practice previous university papers and understand important examination patterns.",
    items: [
      {
        title: "Computer Networks — Winter 2025",
        subject: "Computer Networks",
        type: "Question Paper",
        action: "coming-soon",
      },
      {
        title: "Compiler Design — Winter 2025",
        subject: "Compiler Design",
        type: "Question Paper",
        action: "coming-soon",
      },
      {
        title: "Machine Learning — Previous Papers",
        subject: "Machine Learning",
        type: "Question Paper",
        action: "coming-soon",
      },
    ],
  },

  {
    id: "practicals",
    title: "Practical & Coding",
    icon: "💻",
    category: "PRACTICAL LEARNING",
    description:
      "Programs, practical questions, projects and coding exercises for students.",
    items: [
      {
        title: "Python Practical Programs",
        subject: "Python",
        type: "Practical",
        action: "coming-soon",
      },
      {
        title: "Machine Learning Practicals",
        subject: "Machine Learning",
        type: "Practical",
        action: "coming-soon",
      },
      {
        title: "DBMS SQL Practicals",
        subject: "DBMS",
        type: "Practical",
        action: "coming-soon",
      },
    ],
  },
];