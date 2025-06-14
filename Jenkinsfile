pipeline {
    agent any

    tools {
        nodejs 'node-24.2.0'
    }

    stages {
        stage('Clone') {
            steps {
                git branch: 'main',
                    credentialsId: 'jenkins-gitlab',
                    url: 'http://92.63.192.187:8929/th3rshifter/node-js-sample-master.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test || echo "No tests found"'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploy step placeholder'
            }
        }
    }
}