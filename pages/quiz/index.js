import QuizScreen from '../../src/components/screens/Quiz'
import db from '../../db.json'

function QuizPage() {

    return <QuizScreen Questions={db.questions} Bg={db.bg} />
    
}

export default QuizPage
