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
                // bat 'start /b npm run dev'

                // jenkins - Running a background process in Pipeline job - DevOps Stack Exchange
                // https://devops.stackexchange.com/questions/1473/running-a-background-process-in-pipeline-job
                // 
                // python - Jenkins run a script in background - Stack Overflow
                // https://stackoverflow.com/questions/57978852/jenkins-run-a-script-in-background
                // 
                // linux - Clean way of launching a shell script in background from Jenkins - Stack Overflow
                // https://stackoverflow.com/questions/37160402/clean-way-of-launching-a-shell-script-in-background-from-jenkins/40514899#40514899
                // []
                //                 withEnv ( ['JENKINS_NODE_COOKIE=do_not_kill'] ) {
                // <>
                // https://devops.stackexchange.com/questions/1473/running-a-background-process-in-pipeline-job


                // []
                // You can use `cmd /c` to create a child shell.
                // <>
                // https://superuser.com/questions/1049430/how-do-you-set-environment-variables-for-a-single-command-on-windows
                // ~~~// was asking ... 
                // 
                // []
                // [set](http://ss64.com/nt/set.html) - Display, set, or remove CMD environment variables. Changes made with SET will remain only for the duration of the current CMD session.
                // <>
                // https://superuser.com/questions/1049430/how-do-you-set-environment-variables-for-a-single-command-on-windows

                // bat 'set JENKINS_NODE_COOKIE=do_not_kill'
                // bat 'start /b npm run dev'


                script {
                    withEnv ( ['JENKINS_NODE_COOKIE=do_not_kill'] ) {
                      bat 'start /b npm run dev'
                    }
                }
            }
        }
        
    }
}
