import { ThemeProvider } from 'styled-components'
import QuizScreen from '../../src/components/screens/Quiz'

export default function QuizDaGaleraPage({dbExterno}) {
    return (
        <ThemeProvider theme={dbExterno.theme}>
            <QuizScreen Questions={dbExterno.questions} Bg={dbExterno.bg} />
        </ThemeProvider>
    )
}

export async function getServerSideProps(context) {
    const [project, user] = context.query.id.split('___')

    const dbExterno = await fetch(`https://${project}-${user}.vercel.app/api/db`)
        .then((res) => {
            if(res.ok) {
                return res.json()
            }
            throw new Error('Falha ao pegar dados')
        })
        .catch((err) => console.log(err))
    return {
        props: {
            dbExterno,
        },
    }
}
