import React from "react";

import { useToDoStore } from "../../data/store/useToDoStore";

import InputPlus from "../componenets/InputPlus/InputPlus";
import InputTask from "../componenets/InputTask/InputTask";

import styles from './App.module.scss';

const  App:React.FC = () => {

  const [
    tasks,
    createTask,
    updateTask,
    removeTask,
  ] = useToDoStore(state => [
    state.tasks,
    state.createTask,
    state.updateTask,
    state.removeTask,
  ])

  console.log(tasks)

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>TO DO</h1>
      <section className={styles.articleSection}>
        <InputPlus
          onAdd = {(title) => {
            if (title) {
              createTask(title)
            }
          }}
        />
      </section>
      <section className={styles.articleSection}>
        {!tasks.length && (
          <p className={styles.articleText}>
            no tasks now...
          </p>
          )
        }
        {tasks.map((task) => {
          return <InputTask
            key={task.id}
            id={task.id}
            title={task.title}
            onDone={removeTask}
            onEdited={updateTask}
            onRemoved={removeTask}
          />
        })}
      </section>
    </article>

  )
}

export default App
