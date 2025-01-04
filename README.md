# RE-STORE: Modern E-commerce Platform

A learning-focused e-commerce platform demonstrating best practices in React, Redux, and .NET development.

## 🎯 Purpose

This project serves as a practical implementation guide for modern frontend development practices, specifically focusing on:

- React 19 features and patterns
- Redux Toolkit and RTK Query implementation
- TypeScript best practices
- Material UI component architecture
- Clean code principles (React, Redux, .NET)

## 🛠 Tech Stack

### Frontend

- React 19
- TypeScript
- Redux Toolkit & RTK Query
- Material UI
- React Router v6
- PNPM (Package Manager)

### Backend

- .NET 9
- Entity Framework Core
- Basic API Monolith architecture
- For detailed backend implementation, see [Reactivities Project](https://github.com/dreadwing5/Reactivities)

## 🌟 Key Features

- Modern React patterns and practices
- Type-safe development with TypeScript
- Efficient state management using Redux Toolkit
- API integration with RTK Query
- Responsive UI with Material UI
- Clean and maintainable code structure

## 📚 Learning Resources

This project is developed following Neil Cummings' course on [Building an E-commerce Store with .NET and React](https://deloittedevelopment.udemy.com/course/learn-to-build-an-e-commerce-store-with-dotnet-react-redux/).

### What You'll Learn

- Structured React application architecture
- TypeScript implementation in a real-world scenario
- Redux Toolkit and RTK Query patterns
- Material UI theming and customization
- React 19 experimental features

## 🏗 Project Structure

```src/
    ├── app/
    │   ├── store/    # Redux store configuration
    │   ├── layout/   # Layout components
    │   ├── models/   # TypeScript interfaces and types
    │   ├── modals/   # Modal components and logic
    │   └── routes/   # Route definitions
    ├── features/
    │   ├── catalog/  # Product catalog feature
    │   ├── basket/   # Shopping basket feature
    │   └── checkout/ # Checkout feature
    ├── components/   # Shared components
    └── utils/        # Utility functions
```

## 🚀 Getting Started

1. Clone the repository

   ```bash
   git clone https://github.com/dreadwing5/Restore.git
   ```

2. Install dependencies (Frontend)

   ```bash
   pnpm install
   ```

3. Start the frontend development server

   ```bash
   pnpm dev
   ```

4. Start the backend server

   ```bash
   cd API
   dotnet restore
   dotnet watch run
   ```

## ⚠️ Important Note

The UI design is intentionally basic as the primary focus of this project is on:

- Component architecture
- Code organization
- State management patterns
- TypeScript implementation
- API integration

For production applications, please consider implementing proper UI/UX design principles.

## 📝 Notes

- This is a learning-focused project
- Backend implementation is intentionally basic
- For advanced backend patterns, refer to the [Reactivities Project](https://github.com/dreadwing5/Reactivities)
- Project actively experiments with React 19 features

## 🔗 Related Projects

- [Reactivities](https://github.com/dreadwing5/Reactivities) - Advanced backend implementation

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.
