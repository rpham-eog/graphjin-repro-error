# Reproduce graphjin bug parsing column prefixed with upper_

## Testing with latest version (v3.0.12) - errors. Incorrectly outputs `{ errors: [ { message: "column: 'ranges.bound' not found" } ] }` at end
### Input
```
docker-compose -f docker-compose-latest.yml up --build -d
node test.js
docker-compose -f docker-compose-latest.yml down 
```

### Output
```console
rpham % docker-compose -f docker-compose-latest.yml up --build -d
[+] Building 0.6s (7/7) FINISHED                                                                                                                                            
 => [internal] load build definition from Dockerfile                                                                                                                   0.0s
 => => transferring dockerfile: 111B                                                                                                                                   0.0s
 => [internal] load .dockerignore                                                                                                                                      0.0s
 => => transferring context: 2B                                                                                                                                        0.0s
 => [internal] load metadata for docker.io/dosco/graphjin:v3.0.12                                                                                                      0.5s
 => [internal] load build context                                                                                                                                      0.0s
 => => transferring context: 62B                                                                                                                                       0.0s
 => CACHED [1/3] FROM docker.io/dosco/graphjin:v3.0.12@sha256:fae5f91215438574c8d98257e11c332746eab52e0f16f2e59b284506126a574f                                         0.0s
 => [2/3] COPY config/ /config/                                                                                                                                        0.0s
 => exporting to image                                                                                                                                                 0.0s
 => => exporting layers                                                                                                                                                0.0s
 => => writing image sha256:f59659159466bf5ca1a2e85e519ae5db2337b9f1aff7debb8f7a64a62c2ee550                                                                           0.0s
 => => naming to docker.io/library/tmp-api                                                                                                                             0.0s
[+] Running 3/3
 ⠿ Network tmp_default  Created                                                                                                                                        0.1s
 ⠿ Container tmp-db-1   Started                                                                                                                                        1.1s
 ⠿ Container tmp-api-1  Started                                                                                                                                        1.3s
rpham % node test.js
{ errors: [ { message: "column: 'ranges.bound' not found" } ] }
```


## Testing with old version (v0.20.3) - works. Correctly outputs `{ data: { ranges: [ [Object] ] } }` at end
NOTE: the following only works with the following set in config/dev.yml. Otherwise it has the same error as v3.0.12.
```yml
disable_agg_functions: true
disable_functions: true
```

### Input
```
docker-compose -f docker-compose-old.yml up --build -d
node test.js
docker-compose -f docker-compose-old.yml down 
```

### Output
```console
rpham % docker-compose -f docker-compose-old.yml down      
[+] Running 3/3
 ⠿ Container tmp-api-1  Removed                                                                                                                                        0.0s
 ⠿ Container tmp-db-1   Removed                                                                                                                                        0.0s
 ⠿ Network tmp_default  Removed                                                                                                                                        0.1s
rpham % docker-compose -f docker-compose-old.yml up --build -d
[+] Building 1.2s (8/8) FINISHED                                                                                                                                            
 => [internal] load build definition from Dockerfile.old                                                                                                               0.0s
 => => transferring dockerfile: 35B                                                                                                                                    0.0s
 => [internal] load .dockerignore                                                                                                                                      0.0s
 => => transferring context: 2B                                                                                                                                        0.0s
 => [internal] load metadata for docker.io/dosco/graphjin:v0.20.3                                                                                                      1.1s
 => [auth] dosco/graphjin:pull token for registry-1.docker.io                                                                                                          0.0s
 => [internal] load build context                                                                                                                                      0.0s
 => => transferring context: 62B                                                                                                                                       0.0s
 => [1/3] FROM docker.io/dosco/graphjin:v0.20.3@sha256:26cffb119cc35446178a060f3f3e40e98d8d8203f7a7e2513d0a53d159b4c233                                                0.0s
 => CACHED [2/3] COPY config/ /config/                                                                                                                                 0.0s
 => exporting to image                                                                                                                                                 0.0s
 => => exporting layers                                                                                                                                                0.0s
 => => writing image sha256:bbdef8373fdbd96a0461feee0ab33cad1d2a2b3acaad16df028f9856873ab1fd                                                                           0.0s
 => => naming to docker.io/library/tmp-api                                                                                                                             0.0s
[+] Running 3/4
 ⠿ Network tmp_default                                                                                                                                Created          0.0s
 ⠿ Container tmp-db-1                                                                                                                                 Started          0.9s
 ⠿ Container tmp-api-1                                                                                                                                Started          1.3s
 ⠇ api The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested                  0.0s
rpham % node test.js
{ data: { ranges: [ [Object] ] } }
```