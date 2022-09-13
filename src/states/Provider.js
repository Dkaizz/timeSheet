import { useRef, useState } from 'react';
import { storage } from '~/utils/storage';
import Context from './Context';

function Provider({ children }) {
  const login = storage.get();
  const [loginStatus, setLoginStatus] = useState(login.status);
  const [checkStart, setCheckStart] = useState(false);
  const taskRunning = useRef();
  const timePut = useRef('');
  const countItem = useRef(5);
  const [router, setRouter] = useState('home');
  const userCurrent = useRef({});

  const [isSideBar, setIsSideBar] = useState('none');
  const [isAddTask, setIsAddTask] = useState('none');

  if (login.length === 0) {
    storage.set({ status: false });
    setLoginStatus(false);
  }
  const value = {
    login: {
      loginStatus,
      setLoginStatus,
      uesr: {},
    },
    checkRun: {
      checkStart,
      setCheckStart,
    },
    taskRunning,
    timePut,
    countItem,
    router: {
      router,
      setRouter,
    },
    userCurrent,
    sideBar: {
      isSideBar,
      setIsSideBar,
    },
    addTask: { isAddTask, setIsAddTask },
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Provider;
