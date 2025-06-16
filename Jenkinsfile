pipeline {
    agent any

    environment {
        OC_SERVER = 'https://api.rm1.0a51.p1.openshiftapps.com:6443'
        IMAGE_NAME = 'node-js-sample'
        IMAGE_URL = "image-registry.openshift-image-registry.svc:5000/th3rshifter-dev/node-js-sample"
        OC_CLI_DIR = "$HOME/bin"
        PATH = "$HOME/bin:$PATH"
    }

    stages {
        stage('Install OC CLI') {
            steps {
                sh '''
                    mkdir -p $OC_CLI_DIR
                    curl -L https://mirror.openshift.com/pub/openshift-v4/clients/oc/latest/linux/oc.tar.gz -o /tmp/oc.tar.gz
                    tar -xzf /tmp/oc.tar.gz -C $OC_CLI_DIR
                    chmod +x $OC_CLI_DIR/oc
                    $OC_CLI_DIR/oc version || true
                '''
            }
        }

        stage('Build Image') {
            steps {
                withCredentials([string(credentialsId: 'openshift-token', variable: 'OC_TOKEN')]) {
                    sh '''
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
                withCredentials([string(credentialsId: 'openshift-token', variable: 'OC_TOKEN')]) {
                    sh '''
                        export PATH=$OC_CLI_DIR:$PATH
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
