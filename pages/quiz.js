import React, {useState, useEffect} from 'react'
import db from '../db.json'
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizLogo from '../src/components/QuizLogo'
import QuizContainer from '../src/components/QuizContainer'
import Button from '../src/components/Button'

function LoadingScreen() {
    return(
        <Widget>
            <Widget.Header>carregando ...</Widget.Header>
            <Widget.Content>[Loading Desafio...]</Widget.Content>
        </Widget>
    )
}

function QuestionWidget({question, questionIndex, totalQuestions, handleSubmit}) {
    const questionId = `question__${questionIndex}`

    return (
        <Widget>
            <Widget.Header>
                <p>{`Pergunta ${questionIndex + 1} de ${totalQuestions + 1}`}</p>
            </Widget.Header>
            <img  
                alt={question.description}
                style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover'
                }}
                src={question.image}    
            />
            <Widget.Content>
                <h1>{question.title}</h1>

                <p>{question.description}</p>
                <form onSubmit={handleSubmit}>
                    {question.alternatives.map((alternative, index) => {
                        const alternativeId = index
                        return (
                            <Widget.Topic as='label' htmlFor={alternativeId}>
                                <input id={alternativeId} type='radio' name={questionId} />
                                {alternative}
                            </Widget.Topic>
                        )
                    })}
                    <Button type='submit'>{questionIndex + 1 === totalQuestions ? 'Finalizar' : 'Próximo'}</Button>
                </form>
            </Widget.Content>
        </Widget>
    )
}

function QuizPage() {
    const totalQuestions = db.questions.length
    const [questionIndex, setQuestionIndex] = useState(0)
    const question = db.questions[questionIndex]

    function handleSubmit(e) {
        e.preventDefault()
        const nextQuestion = questionIndex + 1
        if(nextQuestion < totalQuestions) {
            setQuestionIndex(questionIndex + 1)
        } else {
            setScreenState(screenStates.RESULT)
        }  
    }

    const screenStates = {
        QUIZ: 'QUIZ',
        LOADING: 'LOADING',
        RESULT: 'RESULT'
    }
    const [screenState, setScreenState] = useState(screenStates.LOADING)

    useEffect(() => setTimeout(() => setScreenState(screenStates.QUIZ), 1000), [])

    return (
    <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
            <QuizLogo />
            {screenState === screenStates.QUIZ && <QuestionWidget question={question} questionIndex={questionIndex} totalQuestions={totalQuestions} handleSubmit={handleSubmit} />}
            {screenState === screenStates.LOADING && <LoadingScreen />}
            {screenState === screenStates.RESULT && <h1>Finalizado</h1>}
            <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl='https://github.com/arthurDamiani' />
    </QuizBackground>
    )
}

export default QuizPage
