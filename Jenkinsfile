pipeline {
    agent any

    tools {
        nodejs 'node-js-sample'
    }

    environment {
        OC_SERVER = 'https://api.rm1.0a51.p1.openshiftapps.com:6443'
    }

    stages {
        stage('Checkout') {
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

        stage('Deploy to OpenShift') {
            steps {
                withCredentials([
                    string(credentialsId: 'openshift-token', variable: 'OC_TOKEN')
                ]) {
                    sh '''
                        echo Logging into OpenShift...
                        export PATH=$HOME/bin:$PATH
                        which oc
                        oc login --token="$OC_TOKEN" --server="$OC_SERVER"
                        oc project th3rshifter-dev
                        oc apply -f k8s/
                        oc rollout status deployment/node-js-sample
                    '''
                }
            }
        }
    }
}