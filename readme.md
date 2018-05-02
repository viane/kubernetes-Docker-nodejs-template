# K8s-docker nodejs template

#### Make sure you have [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) installed, and for local development, [minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/) is recommended.

#### /app is the node-template docker image

#### The node image listening to port 3000, if your application is using different port, make sure change the line 19: `- containerPort: 3000` in [./deployment.yaml](https://github.com/viane/kubernetes-Docker-nodejs-template/blob/master/deployment.yaml) and line 10:`EXPOSE 3000` [./app/Dockerfile](https://github.com/viane/kubernetes-Docker-nodejs-template/blob/master/app/Dockerfile) to the corresponding port.

```
cd kubernetes-Docker-nodejs-template-master

# Create replicaSet
kubectl create -f deployment.yaml

# Create NodePort Service for port binding
kubectl create -f service.yaml

# Get request to node-template server via minikue cluster
$ curl $(minikube ip)$(kubectl get svc node-starter | grep -oe ':\d*')
```

