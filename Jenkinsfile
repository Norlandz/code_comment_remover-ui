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
                echo 'Just run in Master directly'
                bat 'npm run dev'
            }
        }
        
    }
}
