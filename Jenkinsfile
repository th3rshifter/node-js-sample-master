pipeline {
    agent any

    environment {
        OC_SERVER = 'https://api.rm1.0a51.p1.openshiftapps.com:6443'
        PROJECT = 'th3rshifter-dev'
        APP_NAME = 'node-js-sample'
    }

    stages {
        stage('Login to OpenShift') {
            steps {
                withCredentials([string(credentialsId: 'openshift-token', variable: 'OC_TOKEN')]) {
                    sh '''
                        oc login --token=$OC_TOKEN --server=$OC_SERVER
                        oc project $PROJECT
                    '''
                }
            }
        }

        stage('Start OpenShift Build') {
            steps {
                sh '''
                    oc start-build $APP_NAME --from-dir=. --wait --follow || true
                '''
            }
        }

        stage('Deploy to OpenShift') {
            steps {
                sh '''
                    oc rollout status deployment/$APP_NAME
                '''
            }
        }
    }
}