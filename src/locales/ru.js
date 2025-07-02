export default {
  home: {
    heroTitle: {
      part1: 'Организуй свой день',
      highlight: 'без усилий'
    },
    heroSubtitle: 'Tasknest помогает вам управлять задачами с чистым дизайном и мощными инструментами.',
    getStarted: 'Начать',
    features: {
      simple: {
        title: 'Простые задачи',
        desc: 'Создавайте, обновляйте и удаляйте задачи легко.'
      },
      secure: {
        title: 'Безопасный доступ',
        desc: 'Ваши задачи защищены современной авторизацией.'
      },
      fast: {
        title: 'Быстрый интерфейс',
        desc: 'Сделано на Vue 3 + Tailwind v4 для красоты и скорости.'
      }
    }
  },
  auth: {
    login: 'Войти',
    register: 'Регистрация',
    logout: 'Выйти',
    email: 'Эл. почта',
    password: 'Пароль',
    name: 'Имя',
    haveAccount: 'Уже есть аккаунт?',
    noAccount: 'Нет аккаунта?',
    loginNow: 'Войти сейчас',
    registerNow: 'Зарегистрироваться',
    loginTitle: 'Вход в',
    registerTitle: 'Регистрация в',
    loggingIn: 'Вход...',
    registering: 'Регистрация...',
    google: 'Войти через Google',
    invalid: 'Неверные данные',
    or: 'или'
  },
  dashboard: {
    title: 'Мои задачи',
    welcome: 'С возвращением,',
    addPlaceholder: 'Добавить новую задачу...',
    add: 'Добавить',
    noTasks: 'Пока нет задач',
    delete: 'Удалить',
    cancel: 'Отмена',
    done: 'Готово',
    completed: 'Завершено',
    clearTrash: 'Очистить корзину',
    tabs: {
      tasks: 'Задачи',
      archive: 'Архив',
      trash: 'Корзина'
    }
  },
  layout: {
    copyright: 'Все права защищены',
    createdBy: 'Создано'
  },
  errors: {
    required: 'Это поле обязательно',
    emailInvalid: 'Неверный адрес эл. почты'
  },
  toast: {
    taskAdded: 'Задача добавлена!',
    taskUpdated: 'Задача обновлена!',
    taskAddError: 'Не удалось добавить задачу.',
    taskDeleted: 'Задача удалена.',
    taskDeleteError: 'Не удалось удалить задачу.',
    taskUpdateError: 'Не удалось обновить задачу.',
    taskFetchError: 'Не удалось загрузить задачи.'
  }
}
