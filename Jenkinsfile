pipeline { 
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building, need nodejs & pnpm '
                bat 'pnpm i'
            }
        }
        stage('Test') {
            steps {
                echo 'No test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Just run in Master directly; this starts the program in the background; <> though a proper way should just deploy to Docker / use Publish_Over_Ssh.'
                bat 'start /b npm run dev'
            }
        }
        
    }
}
