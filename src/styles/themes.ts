export type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  error: string;
  warning: string;
  info: string;
  background: string;
  foreground: string;
  card: string;
  hover: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  border: string;
  divider: string;
  projectStatus: {
    active: string;
    completed: string;
    archived: string;
  };
  taskPriority: {
    urgent: string;
    high: string;
    medium: string;
    low: string;
  };
  taskStatus: {
    todo: string;
    in_progress: string;
    done: string;
    cancelled: string;
  };
};

export type ThemeConfig = {
  colors: ThemeColors;
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  radii: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  fontSizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
};

export const lightTheme: ThemeConfig = {
  colors: {
    primary: '#3182CE',
    secondary: '#4A5568',
    accent: '#ED64A6',
    success: '#48BB78',
    error: '#F56565',
    warning: '#ECC94B',
    info: '#4299E1',
    background: '#FFFFFF',
    foreground: '#1A202C',
    card: '#F7FAFC',
    hover: '#EDF2F7',
    text: {
      primary: '#2D3748',
      secondary: '#718096',
      disabled: '#A0AEC0',
    },
    border: '#E2E8F0',
    divider: '#EDF2F7',
    projectStatus: {
      active: '#38A169',
      completed: '#3182CE',
      archived: '#718096',
    },
    taskPriority: {
      urgent: '#E53E3E',
      high: '#DD6B20',
      medium: '#D69E2E',
      low: '#38A169',
    },
    taskStatus: {
      todo: '#718096',
      in_progress: '#3182CE',
      done: '#38A169',
      cancelled: '#E53E3E',
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  radii: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
  },
  transitions: {
    fast: '150ms ease',
    normal: '250ms ease',
    slow: '350ms ease',
  },
};

export const darkTheme: ThemeConfig = {
  colors: {
    primary: '#4299E1',
    secondary: '#A0AEC0',
    accent: '#ED64A6',
    success: '#48BB78',
    error: '#F56565',
    warning: '#ECC94B',
    info: '#63B3ED',
    background: '#1A202C',
    foreground: '#FFFFFF',
    card: '#2D3748',
    hover: '#4A5568',
    text: {
      primary: '#F7FAFC',
      secondary: '#A0AEC0',
      disabled: '#718096',
    },
    border: '#4A5568',
    divider: '#2D3748',
    projectStatus: {
      active: '#48BB78',
      completed: '#4299E1',
      archived: '#A0AEC0',
    },
    taskPriority: {
      urgent: '#FC8181',
      high: '#F6AD55',
      medium: '#F6E05E',
      low: '#68D391',
    },
    taskStatus: {
      todo: '#A0AEC0',
      in_progress: '#4299E1',
      done: '#48BB78',
      cancelled: '#FC8181',
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
  },
  radii: lightTheme.radii,
  fontSizes: lightTheme.fontSizes,
  transitions: lightTheme.transitions,
};

export type ThemeColor = keyof ThemeColors;
