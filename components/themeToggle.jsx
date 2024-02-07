export const toggleTheme = () => {
    const isDarkMode = document.documentElement.classList.contains('dark');
  
    if (isDarkMode) {
      // Basculer vers le mode clair
      document.documentElement.classList.remove('dark');
      document.documentElement.style.setProperty('--foreground-rgb', '0, 0, 0');
      document.documentElement.style.setProperty('--background-start-rgb', '255, 255, 255');
      document.documentElement.style.setProperty('--background-end-rgb', '30, 27, 75');
    } else {
      // Basculer vers le mode sombre
      document.documentElement.classList.add('dark');
      document.documentElement.style.setProperty('--foreground-rgb', '256, 256, 265');
      document.documentElement.style.setProperty('--background-start-rgb', '0, 0, 0');
      document.documentElement.style.setProperty('--background-end-rgb', '30, 27, 75');
    }
  };
  