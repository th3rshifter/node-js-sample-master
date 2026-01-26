⚡ Автоматизированный CI/CD pipeline с Jenkins внутри OpenShift, интеграцией с GitLab/GitHub и развертыванием веб-приложения через NGINX. Пайплайн автоматически собирает Docker-образ, публикует его во внутренний реестр OpenShift и выполняет деплой в кластер.

🧩 Компоненты

Jenkins в поде OpenShift с сохранением jenkins_home
GitHub/GitLab Webhook триггеры
Docker build + push образов через Jenkins
OpenShift CLI (oc) для автоматического деплоя
NGINX в контейнере, развёрнутый вместе с приложением (в составе образа или отдельно)

🛠️ Используемые технологии

OpenShift 4.x (Red Hat Developer Sandbox)
Jenkins (внутри OpenShift)
GitLab/GitHub
Docker, Dockerfile
NGINX (как веб-сервер или прокси)
Shell, YAML, Groovy
oc CLI для управления OpenShift
