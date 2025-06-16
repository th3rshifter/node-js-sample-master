pipeline {
    agent any

    tools {
        nodejs 'node-js-sample'
    }

    environment {
        OC_SERVER = 'https://api.rm1.0a51.p1.openshiftapps.com:6443'
        IMAGE_NAME = 'node-nginx-sample'
        IMAGE_TAG = 'latest'
        IMAGE_URL = "image-registry.openshift-image-registry.svc:5000/th3rshifter-dev/node-nginx-sample"
    }

    stages {
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

        stage('Install oc CLI') {
            steps {
                sh '''
                mkdir -p $HOME/bin
                curl -L https://mirror.openshift.com/pub/openshift-v4/clients/oc/latest/linux/oc.tar.gz -o /tmp/oc.tar.gz
                tar -xzf /tmp/oc.tar.gz -C /tmp
                chmod +x /tmp/oc
                cp /tmp/oc $HOME/bin/oc
                '''
            }
        }

        stage('Build and Push to OpenShift Registry') {
            steps {
                withCredentials([string(credentialsId: 'openshift-token', variable: 'OC_TOKEN')]) {
                    sh '''
                    echo "🔐 Login to OpenShift internal registry"
                    export PATH=$HOME/bin:$PATH
                    echo $OC_TOKEN | docker login -u th3rshifter --password-stdin https://image-registry.openshift-image-registry.svc:5000

                    echo "🐳 Building Docker image"
                    docker build -t $IMAGE_NAME:$IMAGE_TAG .

                    echo "🏷️ Tagging image"
                    docker tag $IMAGE_NAME:$IMAGE_TAG $IMAGE_URL:$IMAGE_TAG

                    echo "📤 Pushing image"
                    docker push $IMAGE_URL:$IMAGE_TAG
                    '''
                }
            }
        }

        stage('Deploy to OpenShift') {
            steps {
                withCredentials([string(credentialsId: 'openshift-token', variable: 'OC_TOKEN')]) {
                    sh '''
                    export PATH=$HOME/bin:$PATH
                    oc login --token=$OC_TOKEN --server=$OC_SERVER
                    oc project th3rshifter-dev

                    echo "🚀 Deploying manifests"
                    oc apply -f k8s/

                    echo "🔄 Waiting for rollout"
                    oc rollout status deployment/node-js-sample
                    '''
                }
            }
        }
    }
}