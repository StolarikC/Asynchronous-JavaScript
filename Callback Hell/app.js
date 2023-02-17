// setTimeout(() => {
//     document.body.style.backgroundColor = 'red';
//     setTimeout(() => {
//         document.body.style.backgroundColor = 'orange';
//         setTimeout(() => {
//             document.body.style.backgroundColor = 'yellow';
//             setTimeout(() => {
//                 document.body.style.backgroundColor = 'green';
//                 setTimeout(() => {
//                     document.body.style.backgroundColor = 'cyan';
//                     setTimeout(() => {
//                         document.body.style.backgroundColor = 'blue';
//                         setTimeout(() => {
//                             document.body.style.backgroundColor = 'indigo';
//                             setTimeout(() => {
//                                 document.body.style.backgroundColor = 'violet';
//                             }, 1000)
//                         }, 1000)
//                     }, 1000)
//                 }, 1000)
//             }, 1000)
//         }, 1000)
//     }, 1000)
// }, 1000)

const delayedColorChange = (newColor, delay, doNext) => {
    setTimeout(() => {
        document.body.style.backgroundColor = newColor;
        doNext && doNext();
    }, delay)
}

delayedColorChange('red', 1000, () => {
    delayedColorChange('orange', 1000, () => {
        delayedColorChange('yellow', 1000, () => {
            delayedColorChange('green', 1000, () => {
                delayedColorChange('blue', 1000, () => {
                })
            })
        })
    })
});

// THE ABOVE EXAMPLE AND EXAMPLE BELOW ARE 'INCREDIBLY COMMON' WAYS OF NESTING CALLBACKS
// THIS NESTING IS WHAT ALLOWS MULTIPLE FUNCTIONS TO RUN SEQUENTIALLY INSTEAD OF OVERWRITING ONE ANOTHER>

searchMoviesAPI('amadeus', () => {
    saveToMyDB('movies', () => {
        // if it works, run this:
    }, () => {
        // if it doesn't work, run this:
    })
}, () => {
    // if API is down, or request failed:
})


const fakeRequestCallback = (url, success, failure) => {
    const delay = Math.floor(Math.random() * 4500) + 500;
    setTimeout(() => {
        if (delay > 4000) {
            failure('Connection Timeout :(')
        } else {
            success(`Here is your fake data from ${url}`)
        }
    }, delay)
}

const fakeRequestPromise = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * (4500)) + 500;
        setTimeout(() => {
            if (delay > 4000) {
                reject('Connection Timeout :(')
            } else {
                resolve(`Here is your fake data from ${url}`)
            }
        }, delay)
    })
}


// CALLBACK HELL BELOW
// fakeRequestCallback('books.com/page1',
//     function (response) {
//         console.log('IT WORKED!!!')
//         console.log(response)
//         fakeRequestCallback('books.com/page2',
//             function (response) {
//                 console.log("IT WORKED AGAIN!!!")
//                 console.log(response)
//                 fakeRequestCallback('books.com/page3',
//                     function (response) {
//                         console.log("IT WORKED A THIRD TIME!!!")
//                         console.log(response)
//                     },
//                     function (err) {
//                         console.log("ERROR 3rd request!", err)
//                     })
//             },
//             function (err) {
//                 console.log("ERROR 2nd request!!!", err)
//             })
//     }, function (err) {
//         console.log("ERROR 1st request!", err)
//     })


// fakeRequestPromise('yelp.com/api/coffee/page1')
//     .then(() => {
//         console.log("IT WORKED!!!!! (pg 1)")
//         fakeRequestPromise('yelp.com/api/coffee/page2')
//             .then(() => {
//                 console.log("IT WORKED!!!!! (pg 2)")
//                 fakeRequestPromise('yelp.com/api/coffee/page3')
//                     .then(() => {
//                         console.log("IT WORKED!!! (pg 3)")
//                     })
//                     .catch(() => {
//                         console.log("OH NO, ERROR!!! (pg 3)")
//                     })
//             })
//             .catch(() => {
//                 console.log("OH NO, ERROR!!! (pg 2)")
//             })
//     })
//     .catch(() => {
//         console.log("OH NO, ERROR!!! (pg 1)")
//     })

fakeRequestPromise('yelp.com/api/coffee/page1')
    .then((data) => {
        console.log("IT WORKED! (pg1)")
        console.log(data)
        return fakeRequestPromise('yelp.com/api/coffee/page2')
    })
    .then((data) => {
        console.log("IT WORKED! (pg2)")
        console.log(data)
        return fakeRequestPromise('yelp.com/api/coffee/page3')
    })
    .then((data) => {
        console.log("IT WORKED! (pg3)")
        console.log(data)
    })
    .catch((err) => {
        console.log("OH NO, A REQUEST FAILED!")
        console.log(err)
    })
