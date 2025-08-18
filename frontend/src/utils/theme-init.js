// Theme initialization utility
export const initializeTheme = () => {
  // Check for saved theme preference or default to system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  let theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  
  // Apply theme to document
  const applyTheme = (newTheme) => {
    // Remove all theme classes
    document.documentElement.classList.remove('light', 'dark');
    document.body.classList.remove('light', 'dark');
    
    // Add new theme class
    document.documentElement.classList.add(newTheme);
    document.body.classList.add(newTheme);
    
    // Update localStorage
    localStorage.setItem('theme', newTheme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', newTheme === 'dark' ? '#0f172a' : '#ffffff');
    }
  };
  
  // Apply initial theme
  applyTheme(theme);
  
  // Listen for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    if (!savedTheme) {
      const newTheme = e.matches ? 'dark' : 'light';
      applyTheme(newTheme);
    }
  });
  
  // Return theme management functions
  return {
    getTheme: () => theme,
    setTheme: (newTheme) => {
      theme = newTheme;
      applyTheme(newTheme);
    },
    toggleTheme: () => {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      theme = newTheme;
      applyTheme(newTheme);
    }
  };
};

// Auto-initialize theme when script loads
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTheme);
  } else {
    initializeTheme();
  }
}

// Export for manual initialization
export default initializeTheme;
