# K8s-docker nodejs template

### Make sure do the following for setup:

- Have [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) installed, and for local development, [minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/) is recommended.

- /app is the node-template docker image

- The node image listening to port 3000, if your application is using different port, make sure do the following changes:

  > line 19: `- containerPort: 3000` in [./deployment.yaml](https://github.com/viane/kubernetes-Docker-nodejs-template/blob/master/deployment.yaml)

  > line 10:`EXPOSE 3000` [./app/Dockerfile](https://github.com/viane/kubernetes-Docker-nodejs-template/blob/master/app/Dockerfile)

  > line 8 and line 14 `targetPort: 3000` [./service.yaml](https://github.com/viane/kubernetes-Docker-nodejs-template/blob/master/service.yaml)

  to the corresponding port.

### To run the demo
```
cd kubernetes-Docker-nodejs-template-master

# Create replicaSet
kubectl create -f deployment.yaml

# Create NodePort Service for port binding
kubectl create -f service.yaml

# Get request to node-template server via minikue cluster
$ curl $(minikube ip)$(kubectl get svc node-starter | grep -oe ':\d*')
```

### Build and Deploy your docker node image
```
$ cd kubernetes-Docker-nodejs-template-master/app

# Make change to the nodejs app
...

$ docker build -t <your_docker_repo>/<your_image_name>:<version> ./

$ docker login

...

$ docker push <your_docker_repo>/<your_image_name>:<version>
```

> If your k8s doesn't have node app deployed yet

```
$ cd .. && vim deployment.yaml

# Change line 17 to image: <your_docker_repo>/<your_image_name>:<version> and save

$ kubectl create -f deployment.yaml
```


> If your k8s already deployed with demo image, update k8s deployment to use your new image

```
$ kubectl edit deployment node-deployment

# Edit line 38 to image: <your_docker_repo>/<your_image_name>:<version> and save
```

```
# Make sure NodePort service is up for local dev (using minikue)
$ kubectl create -f service.yaml
```

```
# Reuqest your node app
$ curl $(minikube ip)$(kubectl get svc node-starter | grep -oe ':\d*')
```
