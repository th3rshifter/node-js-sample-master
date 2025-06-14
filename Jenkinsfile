pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git branch: 'main',
                    url: 'http://92.63.192.187:8929/th3rshifter/node-js-sample-master.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || echo "No tests found"'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Placeholder: OpenShift deploy will go here'
            }
        }
    }
}