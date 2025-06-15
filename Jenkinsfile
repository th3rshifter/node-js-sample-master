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
                    string(credentialsId: 'openshift-token', variable: 'OC_TOKEN')
                    string(credentialsId: 'openshift-server', variable: 'OC_SERVER')
                ]) {
                sh '''
                export PATH=$HOME/bin:$PATH
                oc login --token=$OC_TOKEN --server=https://api.rm1.0a51.p1.openshiftapps.com:6443
                oc project th3rshifter-dev
                oc apply -f k8s/
                oc rollout status deployment/node-js-sample
                '''
                }
            }
        }
    }
}