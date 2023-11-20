pipeline {
  agent {
    node {
      label 'jenkinsAgent-jdk17-docker'
    }
  }

  stages {
    stage('inside docker image') {
      agent {
        docker { 
          // use nested stage
          // label 'jenkinsAgent-jdk17-docker'
          // // label 'felipecrs_jenkins_agent_dind_20231111'
          image 'node@sha256:c325fe5059c504933948ae6483f3402f136b96492dff640ced5dfa1f72a51716' // https://hub.docker.com/layers/library/node/20.9.0-slim/images/sha256-c325fe5059c504933948ae6483f3402f136b96492dff640ced5dfa1f72a51716?context=explore
          args '-v /var/run/docker.sock:/var/run/docker.sock'
          reuseNode true
        }

        // ;; // Dind is just a huge problem -- Ec2 with Docker > Jenkins_Controller in Container (lv1) > Jenkins_Agent in Container (lv1, sibling) > Nodejs in Container (lv2) > git & build javascript inside the Container (lv2) & build Docker image inisde (lv2.5, triple nested Dind)
        // ;; // the concept (viusal graph) of where the Jenkins Agent & Docker container is not clear -- agent with docker installed ; or spawn a new agent inside the docker ; is this dind or dood 
        // ;; // there is no_knowlres for using this Docker pipeline plugin -- dk the syntax & dk how separate Stage inside that 
        // ;; 
        // ;; // ... @messy[docker_plugin vs docker_pipeline & dind pb] @pb[npm install hang & permission prolem] 
        // ;; 
        // ;; // type=bind,source=/var/run/docker.sock,destination=/var/run/docker.sock
        // ;; // type=bind,source=/usr/bin/docker,destination=/usr/bin/docker
        // ;; 
        // ;; // run as privileged process + root user in agent template
        // ;; // ;seems causing problem[cuz dk auto has -u 0:0]; args '-u root -v /var/run/docker.sock:/var/run/docker.sock'
        // ;; // use `/home/jenkins/agent` in agent template // @pb[docker hangs the whole pc]
        // ;; 
        // ;; // dk miss more 

        // @note: remember to add swapfile to Ec2
        // TODO how to prevent Linux run out of memory & close high load app
      }

      stages {
        stage('checkout') {
          steps {
            git branch: 'main', url: 'https://github.com/Norlandz/code_comment_remover-ui' // @config[project name]
            sh 'pwd'
            sh 'ls -la'
          }
        }
        stage('setup env') {
          steps {
            // sh '''@¦            // curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash@¦            // . ~/.nvm/nvm.sh@¦            // nvm install 18.12.0@¦            // npm install@¦            // '''
            sh 'node --version'
            sh 'npm --version'
            sh 'npm install -g pnpm@8.10.2'
            sh 'pnpm --version'
          }
        }
        stage('build') {
          steps {
            // nodejs('nodejs-v20.9.0') { sh 'npm install' }
            sh 'pnpm install'
          }
        }
        stage('test') {
          steps {
            sh 'echo "pseudo Testing"'
          }
        }
        stage('build docker image') {
          steps {
            sh 'docker build -t mindde/code_comment_remover-ui:v0.0.1 .' // @config[project name]
          }
        }
        stage('publish docker image') {
          environment {
            CredDockerhub = credentials('idVal_CredDockerhub')
          }
          steps {
            // TODO is this secure? cuz others see Jenkins just has the value in console, even if single quote
            sh 'docker login -u $CredDockerhub_USR -p $CredDockerhub_PSW'
            sh 'docker push mindde/code_comment_remover-ui:v0.0.1' // @config[project name]
            sh 'docker logout'
          }
        }
      }
    }
    // @think: compnesation step if fail... 
    stage('call (async) remote server to pull & run (deploy) docker image (using watchtower)') { // watchtower will do this, no need to _ special docker trigger / publish_over_ssh _
      steps {
        // TODO secret should be stored in .env ... 
        script {
          sh '''\
          echo "this curl will fail -- if watchtower is not up yet. 
            which can happen at the first time of the whole project setup -- 
            1. this script need to build the image to dockerhub 
            2. docker-compose.yml file pulls the image and start up all containers 
            3. watchtower will be started in that docker-compose.yml together 
            -- once watchtower is up, all later builds will be able to call to watchtower no problem."
          '''.stripIndent()

          def ipAddr_MainApp_withWatchtower = "10.14.1.11" // "mainApp.rff.com" // FIXME @config need use Dns instead of a fixed ip
          sh """
          curl -H "Authorization: Bearer tokenVal_WATCHTOWER_HTTP_API_TOKEN_toBeSentFromJenkins" --max-time 20 --location http://${ipAddr_MainApp_withWatchtower}:8686/v1/update
          """ 
        }
      }
    }
    // @todo may use webpack
    // TODO use npm & maven cache pb
    // TODO jenkins config better make into a file ;& make a procedure file

    // @pb[space used up quickly Jenkins / Docker es pb -- volume image prune ...] @not_sure 
    // https://stackoverflow.com/questions/45128781/no-space-on-device-with-jenkins-and-docker-how-to-cleanup-properly
    // 1. should this be done outside the container? or it breaks sth? 
    // 1. will this remove cache? 
    // 1. should i set the config of Jenkins cloud agent template or do it here?
    stage('clean up docker image volume') { 
      steps {
        // docker container prune // docker image prune // docker volume prune
        sh 'yes | docker system prune'
      }
    }
    stage('done') {
      steps {
        sh 'echo done'
        sh 'ls -la'
      }
    }
  }
}