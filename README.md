# Tasknest Client

**Tasknest** is a web application for creating and managing notes.

## About The Project

This repository contains the **client-side** of the Tasknest application, responsible for the user interface and interaction with the API. The project is built as a Single Page Application (SPA) using Vue.js, providing a fast and responsive user experience.

**View Demo:** [https://tasknest-client.netlify.app](https://tasknest-client.netlify.app)

### Features

- **Create and Edit Notes:** Easily add, modify, and delete your notes.
- **Task Management:** Organize your to-dos with a convenient note system.
- **Intuitive Interface:** Clean and modern design crafted for maximum usability.
- **Multi-language Support:** Supports multiple languages for global use.
- **Notifications:** Built-in notifications for user feedback.

## Technologies Used

- **Vue 3**
- **Vite**
- **Pinia:** State management library for Vue.js.
- **Vue Router**
- **Tailwind CSS**
- **Axios:** An HTTP client for API interaction.
- **Lucide Vue Next:** A collection of beautiful icons for Vue.
- **Vue i18n:** A plugin for internationalization in Vue.
- **Vue Sonner:** A lightweight and stylish toast (notification) library.

## Installation and Setup (for Development)

To run the Tasknest client locally, follow these steps:

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/en) installed (LTS version recommended).

### Installation Steps

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/DevAmirK/tasknest-client.git
    cd tasknest-client
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory of the project (if it doesn't exist) and add your API URL. For example:

    ```
    VITE_API_URL=http://localhost:8000/api # Replace with the actual URL of your API
    ```

    _Make sure your **API part** of the project is running and accessible at the specified URL._

4.  **Start the development server:**

    ```bash
    npm run dev
    ```

    or

    ```bash
    yarn dev
    ```

    The application will be available at `http://localhost:5173` (or another port indicated in the console).

### Building for Production

To create an optimized build of the client application, run:

```bash
npm run build
```

or

```bash
yarn build
```

The build results will be located in the `./dist` directory.

## API (Backend)

The Tasknest client interacts with a separate API. The backend repository can be found here:

[https://github.com/DevAmirK/tasknest-api](https://github.com/DevAmirK/tasknest-api)

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or suggestions, feel free to reach out:

- **GitHub:** [DevAmirK](https://github.com/DevAmirK)
- **Email:** [devamirk.work@gmail.com](mailto:devamirk.work@gmail.com)

---

---

# Tasknest Client

**Tasknest** — это веб-приложение для создания и управления заметками.

## О проекте

Этот репозиторий содержит **клиентскую часть** приложения Tasknest, которая отвечает за пользовательский интерфейс и взаимодействие с API. Проект построен как Single Page Application (SPA) на базе Vue.js, обеспечивая быстрый и отзывчивый пользовательский опыт.

**Посмотреть демо:** [https://tasknest-client.netlify.app](https://tasknest-client.netlify.app)

### Особенности

- **Создание и редактирование заметок:** Легко добавляйте, изменяйте и удаляйте свои заметки.
- **Управление задачами:** Организуйте свои дела с помощью удобной системы заметок.
- **Интуитивно понятный интерфейс:** Чистый и современный дизайн, разработанный для максимального удобства.
- **Многоязычность:** Поддержка нескольких языков для глобального использования.
- **Уведомления:** Встроенные уведомления для обратной связи с пользователем.

## Используемые технологии

- **Vue 3**
- **Vite**
- **Pinia:** Хранилище состояний для Vue.js.
- **Vue Router**
- **Tailwind CSS**
- **Axios:** HTTP-клиент для взаимодействия с API.
- **Lucide Vue Next:** Набор красивых икон для Vue.
- **Vue i18n:** Плагин для интернационализации в Vue.
- **Vue Sonner:** Легковесная и стильная библиотека для тостов (уведомлений).

## Установка и запуск (для разработки)

Чтобы запустить клиентскую часть Tasknest локально, следуйте этим шагам:

### Предварительные требования

Убедитесь, что у вас установлен [Node.js](https://nodejs.org/en) (рекомендуется LTS-версия).

### Шаги установки

1.  **Клонируйте репозиторий:**

    ```bash
    git clone https://github.com/DevAmirK/tasknest-client.git
    cd tasknest-client
    ```

2.  **Установите зависимости:**

    ```bash
    npm install
    ```

    или

    ```bash
    yarn install
    ```

3.  **Настройте переменные окружения:**
    Создайте файл `.env` в корневой директории проекта (если его нет) и добавьте URL вашего API. Например:

    ```
    VITE_API_URL=http://localhost:8000/api # Замените на фактический URL вашего API
    ```

    _Убедитесь, что ваша **API часть** проекта запущена и доступна по указанному URL._

4.  **Запустите сервер разработки:**

    ```bash
    npm run dev
    ```

    или

    ```bash
    yarn dev
    ```

    Приложение будет доступно по адресу `http://localhost:5173` (или другому порту, указанному в консоли).

### Сборка для продакшена

Для создания оптимизированной сборки клиентского приложения выполните:

```bash
npm run build
```

или

```bash
yarn build
```

Результаты сборки будут находиться в директории `./dist`.

## API (бэкенд)

Клиентская часть Tasknest взаимодействует с отдельным API. Репозиторий с бэкенд-частью можно найти здесь:

[https://github.com/DevAmirK/tasknest-ap](https://github.com/DevAmirK/tasknest-ap)

## Лицензия

Этот проект распространяется под лицензией MIT.

## Контакты

Если у вас есть вопросы или предложения, не стесняйтесь связаться со мной:

- **GitHub:** [DevAmirK](https://github.com/DevAmirK)
- **Email:** [devamirk.work@gmail.com](mailto:devamirk.work@gmail.com)
