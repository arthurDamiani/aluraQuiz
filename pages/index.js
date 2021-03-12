import {useState} from 'react'
import db from '../db.json'
import { useRouter } from 'next/router'
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import QuizLogo from '../src/components/QuizLogo'
import Input from '../src/components/Input'
import QuizContainer from '../src/components/QuizContainer'
import Button from '../src/components/Button'

export default function Home() {
  const router = useRouter()
  const [name, setName] = useState('')

  function handleForm(e) {
    e.preventDefault()
    router.push(`/quiz?name=${name}`)
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Bem vindo ao alura quiz {name}!</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={handleForm}>
              <Input
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder='Digite seu nome' 
                name='name'
              />
              <Button type='submit' disabled={!name}>Jogar</Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <ul>
              {db.external.map((link) =>  {
                const [projectName, user] = link.replace(/\//g, '').replace('https:', '').replace('.vercel.app', '').split('.')
                return(
                  <li key={link}>
                    <Widget.Topic href={`/quiz/${projectName}___${user}`}>{`${projectName}/${user}`}</Widget.Topic>
                  </li>
                )
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
    </QuizBackground>
  )
}
