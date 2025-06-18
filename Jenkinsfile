pipeline {
    agent any

    environment {
        OC_SERVER = 'https://api.rm1.0a51.p1.openshiftapps.com:6443'
        IMAGE_NAME = 'node-js-sample'
        IMAGE_URL = 'image-registry.openshift-image-registry.svc:5000/th3rshifter-dev/node-js-sample'
        OC_CLI_DIR = "${env.WORKSPACE}/oc-bin"
        PATH = "${env.WORKSPACE}/oc-bin:${env.PATH}"
    }

    stages {
        stage('Install oc CLI') {
            steps {
                sh '''
                    mkdir -p $OC_CLI_DIR
                    curl -sL https://mirror.openshift.com/pub/openshift-v4/clients/oc/latest/linux/oc.tar.gz -o /tmp/oc.tar.gz
                    tar -xzf /tmp/oc.tar.gz -C /tmp
                    mv /tmp/oc $OC_CLI_DIR/oc
                    chmod +x $OC_CLI_DIR/oc
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
                        oc login --token=$OC_TOKEN --server=$OC_SERVER --insecure-skip-tls-verify=true
                        oc project th3rshifter-dev
                        oc apply -f k8s/
                        oc rollout status deployment/node-js-sample
                    '''
                }
            }
        }
    }
}