import React, {useState, useCallback} from "react";

import styles from './InputPlus.module.scss';

interface InputPlusProps {
  onAdd: (title: string) => void;
}

const InputPlus: React.FC<InputPlusProps> = ({
  onAdd
}) => {

  const [inputValue, setInputValue] = useState('');

  const addTask = useCallback (() => {
    onAdd(inputValue);
    setInputValue('');
  }, [inputValue, onAdd, setInputValue])

  return (
    <div className={styles.InputPlus}>
      <input
        type="text"
        className={styles.InputPlusValue}
        value={inputValue}
        onChange={(evt) => {
          setInputValue(evt.target.value)
        }}
        onKeyDown={(evt) => {
          if (evt.key === 'Enter') {
            addTask();
          }
        }}
        placeholder="Type task here..."
      />

      <button
        onClick={() => {
          addTask();
        }}
        aria-label="Add"
        className={styles.InputPlusButton}
      />

    </div>
  )

}

export default InputPlus;
