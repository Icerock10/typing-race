# How to Deploy

## ℹ️ Step-by-step guide

- Create Environment on `AWS Elastic Beanstalk`:

    Type:`WebServer` - EC2 Instance `t2-micro`

- Create a MongoDB cluster and get the MongoURL - (`make sure to add EC2 ip to whitelist in cluster settings`)
- Add Environment variables <b>before deploy</b> in `EBS container`

`EBS` accepts a full project in `.zip` format
