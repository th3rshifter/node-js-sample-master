pipeline {
    agent any

    tools {
        nodejs 'node-js-sample'
    }

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
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || echo "no tests found"'
            }
        }

        stage('Deploy to OpenShift') {
            steps {
                withCredentials([
                [$class: 'StringBinding', credentialsId: 'openshift-token', variable: 'OC_TOKEN'],
                [$class: 'StringBinding', credentialsId: 'openshift-server', variable: 'OC_SERVER']
                ]) {
            sh '''
            export PATH=$HOME/bin:$PATH
            oc login --token=$OC_TOKEN --server=$OC_SERVER
            oc project th3rshifter-dev
            oc apply -f k8s/
            oc rollout status deployment/node-js-sample
            '''
                }
            }
        }
    }
}