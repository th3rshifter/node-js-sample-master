pipeline {
    agent any

    stages {
        stage('Hello') {
            steps {
                echo '✅ Jenkins Pipeline работает!'
            }
        }

        stage('Check') {
            steps {
                sh 'echo Проверка shell-команды прошла успешно'
            }
        }
    }
}