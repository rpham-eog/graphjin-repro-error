# Reproduce graphjin bug parsing column prefixed with upper_

## Testing with latest version (v3.0.12) - errors. Incorrectly outputs `{ errors: [ { message: "column: 'ranges.bound' not found" } ] }` at end
### Input
```
docker-compose -f docker-compose-latest.yml up --build -d
node query-test.js
docker-compose -f docker-compose-latest.yml down 
```

### Output
```console
rpham@m1 graphjin-repro-error % docker-compose -f docker-compose-latest.yml up --build -d
[+] Building 0.5s (7/7) FINISHED                                                                                                                                                                              
 => [internal] load build definition from Dockerfile                                                                                                                                                     0.0s
 => => transferring dockerfile: 31B                                                                                                                                                                      0.0s
 => [internal] load .dockerignore                                                                                                                                                                        0.0s
 => => transferring context: 2B                                                                                                                                                                          0.0s
 => [internal] load metadata for docker.io/dosco/graphjin:v3.0.12                                                                                                                                        0.4s
 => [internal] load build context                                                                                                                                                                        0.0s
 => => transferring context: 62B                                                                                                                                                                         0.0s
 => [1/3] FROM docker.io/dosco/graphjin:v3.0.12@sha256:fae5f91215438574c8d98257e11c332746eab52e0f16f2e59b284506126a574f                                                                                  0.0s
 => CACHED [2/3] COPY config/ /config/                                                                                                                                                                   0.0s
 => exporting to image                                                                                                                                                                                   0.0s
 => => exporting layers                                                                                                                                                                                  0.0s
 => => writing image sha256:f6a441eb4a33b0df97571871015564b802678dfdf32346d9d1600200df1c7d46                                                                                                             0.0s
 => => naming to docker.io/library/graphjin-repro-error-api                                                                                                                                              0.0s
[+] Running 3/3
 ⠿ Network graphjin-repro-error_default  Created                                                                                                                                                         0.0s
 ⠿ Container graphjin-repro-error-db-1   Started                                                                                                                                                         0.9s
 ⠿ Container graphjin-repro-error-api-1  Started                                                                                                                                                         1.2s
rpham@m1 graphjin-repro-error % node query-test.js                                       
{ errors: [ { message: "column: 'ranges.bound' not found" } ] }
```


## Testing with old version (v0.20.3) - works. Correctly outputs `{ data: { ranges: [] } }` at end
NOTE: the following only works with the following set in config/dev.yml. Otherwise it has the same error as v3.0.12.
```yml
disable_agg_functions: true
disable_functions: true
```

### Input
```
docker-compose -f docker-compose-old.yml up --build -d
node query-test.js
docker-compose -f docker-compose-old.yml down 
```

### Output
```console
rpham@m1 graphjin-repro-error % docker-compose -f docker-compose-old.yml up --build -d
[+] Building 0.6s (7/7) FINISHED                                                                                                                                                                              
 => [internal] load build definition from Dockerfile.old                                                                                                                                                 0.0s
 => => transferring dockerfile: 35B                                                                                                                                                                      0.0s
 => [internal] load .dockerignore                                                                                                                                                                        0.0s
 => => transferring context: 2B                                                                                                                                                                          0.0s
 => [internal] load metadata for docker.io/dosco/graphjin:v0.20.3                                                                                                                                        0.5s
 => [1/3] FROM docker.io/dosco/graphjin:v0.20.3@sha256:26cffb119cc35446178a060f3f3e40e98d8d8203f7a7e2513d0a53d159b4c233                                                                                  0.0s
 => [internal] load build context                                                                                                                                                                        0.0s
 => => transferring context: 62B                                                                                                                                                                         0.0s
 => CACHED [2/3] COPY config/ /config/                                                                                                                                                                   0.0s
 => exporting to image                                                                                                                                                                                   0.0s
 => => exporting layers                                                                                                                                                                                  0.0s
 => => writing image sha256:3b2add366c8e1c4742c3825d4c4573c65a9943b7cae81796849742dc7acb5cee                                                                                                             0.0s
 => => naming to docker.io/library/graphjin-repro-error-api                                                                                                                                              0.0s
[+] Running 3/4
 ⠿ Network graphjin-repro-error_default                                                                                                               Created                                            0.0s
 ⠿ Container graphjin-repro-error-db-1                                                                                                                Started                                            1.0s
 ⠿ Container graphjin-repro-error-api-1                                                                                                               Started                                            1.2s
 ⠧ api The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested                                                    0.0s
rpham@m1 graphjin-repro-error % node query-test.js                                    
{ data: { ranges: [] } }
```