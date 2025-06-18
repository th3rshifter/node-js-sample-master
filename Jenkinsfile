pipeline {
    agent any

    environment {
        OC_SERVER = 'https://api.rm1.0a51.p1.openshiftapps.com:6443'
        PROJECT = 'th3rshifter-dev'
        APP_NAME = 'node-js-sample'
    }
    
    stages {

    stage('Install OC CLI') {
        steps {
        sh '''
            mkdir -p $HOME/bin
            curl -L https://mirror.openshift.com/pub/openshift-v4/clients/oc/latest/linux/oc.tar.gz -o /tmp/oc.tar.gz
            tar -xzf /tmp/oc.tar.gz -C /tmp
            chmod +x /tmp/oc /tmp/kubectl
            mv /tmp/oc $HOME/bin/oc
            mv /tmp/kubectl $HOME/bin/kubectl
            export PATH=$HOME/bin:$PATH
            oc version || true
        '''
    }
}
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