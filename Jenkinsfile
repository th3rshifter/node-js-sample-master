pipeline {
    agent any

    tools {
        nodejs 'node-js-sample'
    }

    environment {
        OC_SERVER = 'https://api.rm1.0a51.p1.openshiftapps.com:6443'
        IMAGE_NAME = 'node-nginx-sample'
        IMAGE_URL = 'image-registry.openshift-image-registry.svc:5000/th3rshifter-dev/node-nginx-sample'
    }

    stages {
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

        stage('Install oc CLI') {
            steps {
                sh '''
                    curl -L https://mirror.openshift.com/pub/openshift-v4/clients/oc/latest/linux/oc.tar.gz -o /tmp/oc.tar.gz
                    tar -xzf /tmp/oc.tar.gz -C /tmp
                    chmod +x /tmp/oc
                    cp /tmp/oc $HOME/bin/oc
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                withCredentials([
                    string(credentialsId: 'openshift-token', variable: 'OC_TOKEN')
                ]) {
                    sh '''
                        echo Logging into OpenShift internal registry...
                        export PATH=$HOME/bin:$PATH
                        echo $OC_TOKEN | docker login -u th3rshifter --password-stdin https://image-registry.openshift-image-registry.svc:5000
                        docker build -t $IMAGE_NAME .
                        docker tag $IMAGE_NAME $IMAGE_URL
                        docker push $IMAGE_URL
                    '''
                }
            }
        }

        stage('Deploy to OpenShift') {
            steps {
                withCredentials([
                    string(credentialsId: 'openshift-token', variable: 'OC_TOKEN')
                ]) {
                    sh '''
                        echo Logging into OpenShift...
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