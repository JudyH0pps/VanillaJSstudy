const promise = () => {
    return new Promise((resolve, reject) => {
        console.log('doing something');
        setTimeout(() => {
            resolve(1);
        }, 2000);
    });
}

promise()
    .then(res => console.log(res))
    .catch(err => console.log(err))
    .finally(() => console.log('ëëŽė'))
    .then(() => promise());
