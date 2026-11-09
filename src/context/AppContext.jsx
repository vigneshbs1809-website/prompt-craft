import { createContext, useContext, useReducer, useEffect } from 'react';
import { getHistory, saveToHistory, deleteFromHistory, clearHistory } from '@/services/storageService';

const AppContext = createContext(null);

const initialState = {
  history: [],
  notifications: [],
  sidebarOpen: true,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'LOAD_HISTORY':
      return { ...state, history: action.payload };
    case 'ADD_TO_HISTORY':
      return { ...state, history: [action.payload, ...state.history] };
    case 'DELETE_FROM_HISTORY':
      return { ...state, history: state.history.filter(item => item.id !== action.payload) };
    case 'CLEAR_HISTORY':
      return { ...state, history: [] };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [...state.notifications, { id: Date.now(), ...action.payload }] };
    case 'REMOVE_NOTIFICATION':
      return { ...state, notifications: state.notifications.filter(n => n.id !== action.payload) };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const history = getHistory();
    dispatch({ type: 'LOAD_HISTORY', payload: history });
  }, []);

  const actions = {
    addToHistory: (entry) => {
      const saved = saveToHistory(entry);
      if (saved) {
        dispatch({ type: 'ADD_TO_HISTORY', payload: saved });
      }
      return saved;
    },
    removeFromHistory: (id) => {
      deleteFromHistory(id);
      dispatch({ type: 'DELETE_FROM_HISTORY', payload: id });
    },
    clearAllHistory: () => {
      clearHistory();
      dispatch({ type: 'CLEAR_HISTORY' });
    },
    notify: (message, type = 'success') => {
      const id = Date.now();
      dispatch({ type: 'ADD_NOTIFICATION', payload: { id, message, type } });
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
      }, 3500);
    },
    toggleSidebar: () => {
      dispatch({ type: 'TOGGLE_SIDEBAR' });
    },
  };

  return (
    <AppContext.Provider value={{ state, ...actions }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;

