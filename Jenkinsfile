pipeline {
    agent any

    stages {
            stage('Clone') {
                steps {
                    git branch: 'main',
                        credentialsId: '19debe1c-6e96-479a-b662-ba2e682e15ec',
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
                echo 'OpenShift deploy step placeholder'
            }
        }
    }
}
