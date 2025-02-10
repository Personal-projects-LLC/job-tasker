export default {
  plugins: {
    '@tailwindcss/postcss': {
      theme: true, // Включаем поддержку @theme
      darkMode: 'data-theme', // Указываем атрибут для темной темы
      components: true, // Включаем поддержку @layer components
      utilities: true, // Включаем поддержку утилит
      variants: true, // Включаем поддержку вариантов
    },
  },
};
