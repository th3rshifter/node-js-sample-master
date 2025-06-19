pipeline {
    agent any

    environment {
        OC_SERVER = 'https://api.rm1.0a51.p1.openshiftapps.com:6443'
        PROJECT_NAME = 'th3rshifter-dev'
    }

    stages {
        stage('Build via OpenShift') {
            steps {
                withCredentials([string(credentialsId: 'openshift-token', variable: 'OC_TOKEN')]) {
                    sh '''
                        oc login --token=$OC_TOKEN --server=$OC_SERVER
                        oc project $PROJECT_NAME
                        oc start-build node-js-sample --wait
                    '''
                }
            }
        }

        stage('Deploy to OpenShift') {
            steps {
                withCredentials([string(credentialsId: 'openshift-token', variable: 'OC_TOKEN')]) {
            sh """
                oc login --token=${OC_TOKEN} --server=${OC_SERVER}
                oc project ${PROJECT_NAME}
                oc apply -f k8s/
                oc rollout status deployment/node-js-sample
            """
        }
    }
}    
    }
}