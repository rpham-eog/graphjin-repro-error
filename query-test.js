fetch('http://localhost:8080/api/v1/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        query: `
            query GetRange {
                ranges() {
                    id
                    upper_bound
                    lower_bound
                }
            }
        `,
        variables: {}
    })
}).then((res) => res.json())
.then((result) => console.log(result));