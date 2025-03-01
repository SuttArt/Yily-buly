# yily-buly

A **recipe book** for you and your friends, built with **Vue 3**, **Vite**, and **Pinia**.

## 📌 Recommended IDE Setup

- [WebStorm](https://www.jetbrains.com/webstorm/) (Recommended for Vue & TypeScript development).
- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur if installed).
- TypeScript support for `.vue` files is handled by [vue-tsc](https://github.com/vuejs/language-tools) for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## ⚙️ Project Setup

```sh
npm install
```

### 🚀 Start the Development Server

```sh
npm run dev
```

This runs the **Vite development server** with hot module replacement (HMR).

### 🔨 Type-Check, Compile, and Minify for Production

```sh
npm run build
```

This script first **type-checks** the project and then builds it using **Vite**.

### 👀 Preview the Production Build

```sh
npm run preview
```

This serves the built files using Vite’s preview mode.

## 🧪 Docker Setup

### 🛠️ Build the Docker Image

```sh
docker build -t vue3-app .
```

### 🌐 Run the Docker Container

```sh
docker run -p 8080:80 vue3-app
```

This starts an Nginx server hosting the production build of your Vue 3 application.

## 🧪 Testing

### ✅ Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### 🖥️ Run End-to-End Tests with [Cypress](https://www.cypress.io/)

#### Development Mode (Faster, Uses Dev Server)

```sh
npm run test:e2e:dev
```

#### Production Mode (Recommended for CI/CD)

```sh
npm run build
npm run test:e2e
```

## 📝 Code Quality

### 🏗️ Type-Check the Code

```sh
npm run type-check
```

### 🔍 Lint and Auto-Fix Issues with [ESLint](https://eslint.org/)

```sh
npm run lint
```

Runs **ESLint** with automatic fixes.

### ✨ Format Code with [Prettier](https://prettier.io/)

```sh
npm run format
```

Formats all files inside the `src/` directory.

## 📡 Mock API Server with [json-server](https://github.com/typicode/json-server) 

For development, you can start a **mock API server** using JSON Server:

```sh
npm run serve-mock-server
```

This serves `db.json` as a REST API for local testing.

## 🔧 Customize Configuration

See [Vite Configuration Reference](https://vite.dev/config/).

