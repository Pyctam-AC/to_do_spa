import React, {useEffect} from "react";

import { useToDoStore } from "../../data/store/useToDoStore";

import styles from './App.module.scss';

const  App:React.FC = () => {

  console.log(useToDoStore)

  const [
    tasks,
    createTask,
    updateTask,
    removeTask
  ] = useToDoStore(state => [
    state.tasks,
    state.createTask,
    state.updateTask,
    state.removeTask,
  ])

  useEffect (() => {
    createTask('fmfkdldl')
  }, [])

  console.log(11, tasks)

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>TO DO</h1>
      <section className={styles.articleSection}>

      </section>
      <section className={styles.articleSection}>

      </section>
    </article>

  )
}

export default App
