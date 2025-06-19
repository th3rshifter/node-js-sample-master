pipeline {
    agent any

    environment {
        OC_SERVER = 'https://api.rm1.0a51.p1.openshiftapps.com:6443'
        IMAGE_NAME = 'node-js-sample'
        IMAGE_URL = "image-registry.openshift-image-registry.svc:5000/th3rshifter-dev/node-js-sample"
        PROJECT_NAME = "th3rshifter-dev"
        OC_TOKEN = 'sha256~L6RefD8IuTdgtTMQfPXXGmg9YPhwGD91sLMHIrQHO58'
    }

    stages {

        stage('Login to OpenShift') {
            steps {
                sh '''
                    echo "Logging in to OpenShift..."
                    oc login --token=$OC_TOKEN --server=$OC_SERVER
                '''
            }
        }

        stage('Build Image in OpenShift') {
            steps {
                sh '''
                    echo "Switching to project $PROJECT_NAME..."
                    oc project $PROJECT_NAME

                    echo "Starting OpenShift build..."
                    oc start-build $IMAGE_NAME --from-dir=. --follow
                '''
            }
        }

        stage('Deploy to OpenShift') {
            steps {
                sh '''
                    echo "Switching to project $PROJECT_NAME..."
                    oc project $PROJECT_NAME

                    echo "Applying manifests from k8s/ directory..."
                    oc apply -f k8s/

                    echo "Waiting for deployment rollout to complete..."
                    oc rollout status deployment/$IMAGE_NAME
                '''
            }
        }
    }
}