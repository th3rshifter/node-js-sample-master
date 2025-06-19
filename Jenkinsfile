pipeline {
    agent any

    environment {
        OC_SERVER = 'https://api.rm1.0a51.p1.openshiftapps.com:6443'
        IMAGE_NAME = 'node-js-sample'
        IMAGE_URL = "image-registry.openshift-image-registry.svc:5000/th3rshifter-dev/node-js-sample"
        PROJECT_NAME = "th3rshifter-dev"
    }

    stage('Build Image') {
            steps {
            withCredentials([string(credentialsId: 'openshift-token', variable: 'OC_TOKEN')]) {
            sh '''
                echo "Logging in to OpenShift..."
                oc login --token=$OC_TOKEN --server=$OC_SERVER

                echo "Building image and pushing via OpenShift..."
                oc project $PROJECT_NAME
                oc start-build node-js-sample --from-dir=. --follow
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