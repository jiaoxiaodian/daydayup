import {useState} from 'react';

export default function useLocalStorage(
  key, initialValue
) {
  // 当函数组件更新re-render时，函数组件内所有代码都会重新执行一遍。
  // 此时initialState的初始值是一个相对开销较大的IO操作。
  // 每次函数组件re-render时，第一行代码都会被执行一次，引起不必要的性能损耗。
  // 当initialState以函数形式传入时，它只会在函数组件初始化的时候执行一次，函数re-render时不会再被执行。
  // 这个函数即惰性初始化函数这个特性，可以在这种场景下规避不必要的性能问题。
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const temp = window.localStorage.getItem(key);
      return temp ? JSON.parse(temp) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (newVal) => {
    const newTemp = typeof newVal === 'function' ? newVal() : newVal;
    setStoredValue(newTemp);
    window.localStorage.setItem(key, JSON.stringify(newTemp));
  };

  return [storedValue, setValue];
}
