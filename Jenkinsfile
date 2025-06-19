pipeline {
    agent any

    environment {
        OC_SERVER = 'https://api.rm1.0a51.p1.openshiftapps.com:6443'
        OC_TOKEN = 'sha256~L6RefD8IuTdgtTMQfPXXGmg9YPhwGD91sLMHIrQHO58'
        IMAGE_NAME = 'node-js-sample'
        IMAGE_URL = "image-registry.openshift-image-registry.svc:5000/th3rshifter-dev/node-js-sample"
        PROJECT_NAME = "th3rshifter-dev"
        KUBECONFIG = "${WORKSPACE}/.kubeconfig"
    }

    stages {

        stage('Login to OpenShift') {
            steps {
                sh '''
                    echo "🔐 Logging in to OpenShift..."
                    export KUBECONFIG=$WORKSPACE/.kubeconfig
                    oc login --token=$OC_TOKEN --server=$OC_SERVER
                    echo "👤 Logged in as: $(oc whoami)"
                '''
            }
        }

        stage('Build Image in OpenShift') {
            steps {
                sh '''
                    echo "🔄 Switching to project $PROJECT_NAME..."
                    export KUBECONFIG=$WORKSPACE/.kubeconfig
                    oc project $PROJECT_NAME
                    sh 'ls -l'
                    sh 'cat Dockerfile'

                    echo "📦 Starting OpenShift build..."
                    oc start-build $IMAGE_NAME --from-dir=. --follow
                '''
            }
        }

stage('Deploy to OpenShift') {
    steps {
        sh '''
            echo "🔧 Fixing image in deployment.yaml..."
            sed -i "s|image: .*|image: $IMAGE_URL:latest|" k8s/deployment.yaml

            echo "✅ Final deployment.yaml content:"
            cat k8s/deployment.yaml

            export KUBECONFIG=$WORKSPACE/.kubeconfig
            oc project $PROJECT_NAME

            echo "📥 Applying deployment.yaml..."
            oc apply -f k8s/

            echo "⏳ Waiting for rollout..."
            oc rollout status deployment/$IMAGE_NAME
        '''
            }
         }
    }
}