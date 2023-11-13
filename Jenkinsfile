pipeline {
  agent {

    docker { 
      label 'jenkinsAgent-jdk17-docker'
      // label 'felipecrs_jenkins_agent_dind_20231111'
      image 'node:20.9.0-slim' 
      args '-v /var/run/docker.sock:/var/run/docker.sock'
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
  }


  stages {

    stage('checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/Norlandz/code_comment_remover-ui-awstest' // @config[project name]
        sh 'pwd'
        sh 'ls -la'
      }
    }
    stage('setup env') {
      steps {
        // sh '''
        // curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
        // . ~/.nvm/nvm.sh
        // nvm install 18.12.0
        // npm install
        // '''
        sh 'npm install -g pnpm@8.10.2'
      }
    }
    stage('build') {
      steps {
        // nodejs('nodejs-v20.9.0') {
        //   sh 'npm install'
        // }
        sh 'pnpm install'
      }
    }
    stage('test') {
      steps {
        // nodejs('nodejs-v20.9.0') {
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
        sh 'docker login -u $CredDockerhub_USR -p $CredDockerhub_PSW'
        sh 'docker push mindde/code_comment_remover-ui:v0.0.1' // @config[project name]
        sh 'docker logout'
      }
    }
    // @think: compnesation step if fail... 
    stage('call (async) remote server to pull & run (deploy) docker image (using watchtower)') { // watchtower will do this, no need to _ special docker trigger / publish_over_ssh _
      steps {
        sh 'echo "this curl will fail -- if watchtower is not up yet. \nwhich can happen at the first time of the whole project setup -- \n1. this script need to build the image to dockerhub \n2. docker-compose.yml file pulls the image and start up all containers \n3. watchtower will be started in that docker-compose.yml together \n-- once watchtower is up, all later builds will be able to call to watchtower no problem."'
        sh 'curl -H "Authorization: Bearer tokenVal_WATCHTOWER_HTTP_API_TOKEN_toBeSentFromJenkins" 10.15.1.137:8080/v1/update' // FIXME @config the ip address need know ahead of time?...
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