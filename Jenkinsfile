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
                echo 'Just run in Master directly; this starts the program in the background; <> though a proper way should just deploy to Docker / use Publish_Over_Ssh.; currenly has no way to terminate & replace the old running app.'
                //                 // bat 'start /b npm run dev'
                // 
                //                 // jenkins - Running a background process in Pipeline job - DevOps Stack Exchange
                //                 // https://devops.stackexchange.com/questions/1473/running-a-background-process-in-pipeline-job
                //                 // 
                //                 // python - Jenkins run a script in background - Stack Overflow
                //                 // https://stackoverflow.com/questions/57978852/jenkins-run-a-script-in-background
                //                 // 
                //                 // linux - Clean way of launching a shell script in background from Jenkins - Stack Overflow
                //                 // https://stackoverflow.com/questions/37160402/clean-way-of-launching-a-shell-script-in-background-from-jenkins/40514899#40514899
                //                 // []
                //                 //                 withEnv ( ['JENKINS_NODE_COOKIE=do_not_kill'] ) {
                //                 // <>
                //                 // https://devops.stackexchange.com/questions/1473/running-a-background-process-in-pipeline-job
                // 
                // 
                //                 // []
                //                 // You can use `cmd /c` to create a child shell.
                //                 // <>
                //                 // https://superuser.com/questions/1049430/how-do-you-set-environment-variables-for-a-single-command-on-windows
                //                 // ~~~// was asking ... 
                //                 // 
                //                 // []
                //                 // [set](http://ss64.com/nt/set.html) - Display, set, or remove CMD environment variables. Changes made with SET will remain only for the duration of the current CMD session.
                //                 // <>
                //                 // https://superuser.com/questions/1049430/how-do-you-set-environment-variables-for-a-single-command-on-windows
                // 
                //                 // bat 'set JENKINS_NODE_COOKIE=do_not_kill'
                //                 // bat 'start /b npm run dev'
                // 
                //                 // ;working; script {
                //                 // ;working;     withEnv ( ['JENKINS_NODE_COOKIE=do_not_kill'] ) {
                //                 // ;working;       bat 'set JENKINS_NODE_COOKIE=do_not_kill'
                //                 // ;working;       bat 'set JENKINS_NODE_COOKIE=doNotKill'
                //                 // ;working;       bat 'start /b npm run dev'
                //                 // ;working;     }
                //                 // ;working; }
                // 
                // 
                // 
                //                 // command line - How to terminate a background process? - Unix & Linux Stack Exchange
                //                 // https://unix.stackexchange.com/questions/104821/how-to-terminate-a-background-process
                //                 // 
                //                 // linux - How to get process ID of background process? - Stack Overflow
                //                 // https://stackoverflow.com/questions/1908610/how-to-get-process-id-of-background-process
                //                 // 
                //                 // Start a Command Prompt and then change the title of it via batch file? - Super User
                //                 // https://superuser.com/questions/944981/start-a-command-prompt-and-then-change-the-title-of-it-via-batch-file
                //                 // 
                //                 // windows - How to get PID of process just started from within a batch file? - Stack Overflow
                //                 // https://stackoverflow.com/questions/9486960/how-to-get-pid-of-process-just-started-from-within-a-batch-file
                // 
                // 
                //                 // ;not_working; bat 'set JENKINS_NODE_COOKIE=doNotKill'
                //                 //
                //                 // ;not_working; script {
                //                 // ;not_working;     bat 'set JENKINS_NODE_COOKIE=do_not_kill'
                //                 // ;not_working;     bat 'set JENKINS_NODE_COOKIE=doNotKill'
                //                 //
                //                 // ;not_working; script {
                //                 // ;not_working;   withEnv ( ['JENKINS_NODE_COOKIE=do_not_kill'] ) {
                //                 // ;not_working;     bat 'set JENKINS_NODE_COOKIE=do_not_kill'
                //                 // ;not_working;     bat 'set JENKINS_NODE_COOKIE=doNotKill'
                //                 // ;not_working;     bat 'start "T-code_comment_remover-ui" /b npm run dev'
                //                 // ;not_working;     bat 'tasklist /V /FI "WindowTitle eq T-code_comment_remover-ui*'
                //                 // ;not_working;   }
                //                 // ;not_working; }
                // 
                // 
                //                 // ;working; script {
                //                 // ;working;     withEnv ( ['JENKINS_NODE_COOKIE=doNotKill'] ) {
                //                 // ;working;       bat 'start /b npm run dev'
                //                 // ;working;     }
                //                 // ;working; }
                // 
                //                 // ;not_working; bat 'set JENKINS_NODE_COOKIE=doNotKill'
                //                 // ;not_working; bat 'start /b npm run dev'
                //                 // guess new shell? not taking the env? 
                // 
                //                 // []
                //                 // This is how my PHP internal server goes into background. So technically it should work for all.
                //                 // 
                //                 // start /B "" php -S 0.0.0.0:8000 &
                //                 // <>
                //                 // https://superuser.com/questions/198525/how-can-i-execute-a-windows-command-line-in-background
                //                 // 
                //                 // ~~~// why the syntax is wrong in doc thne? 
                //                 // dk prev wrong syntax even able to run ... 
                // 
                // 
                //                 // ;[runs but no title still]; script {
                //                 // ;[runs but no title still];      withEnv ( ['JENKINS_NODE_COOKIE=doNotKill'] ) {
                //                 // ;[runs but no title still];          bat 'start /b "T-code_comment_remover-ui" npm run dev'
                //                 // ;[runs but no title still];          bat 'tasklist /V /FI "WindowTitle eq T-code_comment_remover-ui*"'
                //                 // ;[runs but no title still];      }
                //                 // ;[runs but no title still]; }
                // >> 1. force run on the Master es Server -- no Docker -- bad practice
                // >> 1. cannot set title > cannot get pid > there is no way to kill the old process 
                // >> 1. aga docMan is bad, config from no where 
                // >> 1. no groovy formatter in vs-code

                script {
                    withEnv ( ['JENKINS_NODE_COOKIE=doNotKill'] ) {
                      bat 'start /b npm run dev'
                    }
                }

            }
        }
        
    }
}
