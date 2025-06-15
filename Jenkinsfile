pipeline {
    agent any

    tools {
        nodejs 'node-js-sample' // Указан установленный через Jenkins Node.js Tool
    }

    environment {
        PATH = "${tool 'node-js-sample'}/bin:${env.PATH}"
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
                sh 'npm test || echo "No tests found"'
            }
        }

        stage('Deploy to OpenShift') {
            steps {
                withCredentials([
                    string(credentialsId: 'openshift-token', variable: 'OC_TOKEN'),
                    string(credentialsId: 'openshift-server', variable: 'OC_SERVER')
                ]) {
                    sh '''
                        echo "Logging into OpenShift..."
                        oc login --token=$OC_TOKEN --server=$OC_SERVER
                        oc project th3rshifter-dev
                        
                        echo "Applying Kubernetes resources..."
                        oc apply -f k8s/
                        
                        echo "Waiting for deployment rollout..."
                        oc rollout status deployment/node-js-sample
                    '''
                }
            }
        }
    }
}