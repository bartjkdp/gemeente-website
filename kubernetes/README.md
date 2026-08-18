# Kubernetes Examples

These manifests deploy the website image:

```text
ghcr.io/bartjkdp/gemeente-website:main
```

Create the Product API token secret first. You can use the example manifest:

```bash
kubectl apply -f kubernetes/secret.example.yaml
```

Or create it directly:

```bash
kubectl create secret generic gemeente-website \
  --from-literal=open-product-api-token=465b0c3790199bab55b3639ba32df0470baabeb2
```

Edit `deployment.yaml` if your Product API is not reachable at:

```text
http://open-product-web:8000/producttypen/api/v1
```

Edit `httproute.yaml` for your Gateway name if it is not called `gateway`. The example hostname is:

```text
website.fieldlab.platform-dienstverlening.nl
```

Then apply:

```bash
kubectl apply -f kubernetes/
```
