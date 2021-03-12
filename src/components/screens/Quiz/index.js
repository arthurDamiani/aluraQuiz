import React, {useState} from 'react'
import Widget from '../../Widget'
import QuizBackground from '../../QuizBackground'
import Footer from '../../Footer'
import QuizLogo from '../../QuizLogo'
import QuizContainer from '../../QuizContainer'
import Button from '../../Button'

function ResultScreen({ points, totalQuestions }) {
    return(
        <Widget>
            <Widget.Header>Resultado</Widget.Header>
            <Widget.Content>Você acertou {points} de {totalQuestions}</Widget.Content>
        </Widget>
    )
}

function QuestionWidget({question, questionIndex, totalQuestions, handleSubmit, addPoint}) {
    const [selectedAlternative, setSelectedAlternative] = useState(undefined)
    const questionId = `question__${questionIndex}`
    const isCorrect = selectedAlternative === question.answer

    return (
        <Widget>
            <Widget.Header>
                <p>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</p>
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
                <form onSubmit={(e) => {
                    e.preventDefault()
                    if(isCorrect) {
                        addPoint()
                    }
                    handleSubmit()
                }}>
                    {question.alternatives.map((alternative, index) => {
                        const alternativeId = `alternative__${index}`
                        return (
                            <Widget.Topic as='label' htmlFor={alternativeId} key={alternativeId}>
                                <input 
                                    id={alternativeId} 
                                    onChange={() => setSelectedAlternative(index)} 
                                    name={questionId} 
                                    type='radio'
                                    required
                                />
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

function QuizScreen({Questions, Bg}) {
    const totalQuestions = Questions.length
    const [questionIndex, setQuestionIndex] = useState(0)
    const question = Questions[questionIndex]
    const [points, setPoints] = useState(0)

    function handleSubmit() {
        const nextQuestion = questionIndex + 1
        if(nextQuestion < totalQuestions) {
            setQuestionIndex(questionIndex + 1)
        } else {
            setScreenState(screenStates.RESULT)
        }  
    }

    function addPoint() {
        setPoints(points + 1)
    }

    const screenStates = {
        QUIZ: 'QUIZ',
        RESULT: 'RESULT'
    }
    const [screenState, setScreenState] = useState(screenStates.QUIZ)

    return (
    <QuizBackground backgroundImage={Bg}>
        <QuizContainer>
            <QuizLogo />
            {screenState === screenStates.QUIZ && 
                <QuestionWidget 
                    question={question} 
                    questionIndex={questionIndex} 
                    totalQuestions={totalQuestions} 
                    handleSubmit={handleSubmit}
                    addPoint={addPoint} 
                />
            }
            {screenState === screenStates.RESULT && <ResultScreen points={points} totalQuestions={totalQuestions} />}
            <Footer />
        </QuizContainer>
    </QuizBackground>
    )
}

export default QuizScreen