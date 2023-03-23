fetch('http://localhost:8080/api/v1/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        query: `
            mutation InsertRange {
                ranges(insert: $data) {
                    id
                    upper_bound
                    lower_bound
                }
            }
        `,
        variables: {
            "data":  [
              {
                "upper_bound": 1,
                "lower_bound": 0
              }
            ]
        }
    })
}).then((res) => res.json())
.then((result) => console.log(result));