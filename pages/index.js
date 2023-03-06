import Head from "next/head"
import { useState } from "react"
import styles from "./index.module.css"

export default function Home() {
  const [textInput, setTextInput] = useState("")
  const [result, setResult] = useState()
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])

  console.log(questions)
  console.log(answers)
  
  console.log(questions.length)
  
  
  
  
  async function onSubmit(event) {
    event.preventDefault()
    setQuestions([...questions, textInput])
    setTextInput("")
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: textInput }),
      });
      
 


      const data = await response.json()
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`)
      }

      setResult(data.choices[0].text)
      setAnswers([...answers, data.choices[0].text])
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error)
      alert(error.message)
    }
  }

  return (
    <div>
      <Head>
        <title>chatbotApp</title>
        <link rel="stylesheet" href="../styles/global.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
        <link rel="icon" href="/dog.png" />
      </Head>
      <main className={styles.main}>
        {result && 
        <section className={styles.textOutput}>
          <aside className={styles.question}>{questions[questions.length -1]}</aside>
          <article className={styles.result}>{result}</article>
        </section>}
        <form onSubmit={onSubmit} className={styles.form}>
          <input
            type="text"
            name="text"
            placeholder="Ask me something"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className={styles.input}
            autocomplete="off" 
          />
          <input type="submit" value="Send" className={styles.button}/>
        </form>
      </main>
    </div>
  )
}