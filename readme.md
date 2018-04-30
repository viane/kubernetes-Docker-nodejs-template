# K8s nodejs template

# Make sure you have kubectl installed, and for local development, minikube is recommended.

# /app is the node-template docker image

```
cd starter

# Create replicaSet
kubectl create -f deployment.yaml

# Create NodePort Service for port binding
kubectl create -f service.yaml

# Get request to node-template server via minikue cluster
$ curl $(minikube ip)$(kubectl get svc node-starter | grep -oe ':\d*')
```
