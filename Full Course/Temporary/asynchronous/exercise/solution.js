// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

async function emailCustomer() {
    try {
        const customer = await getCustomer(1);
        console.log(customer);
        if (customer.isGold) {
            const movies = await getTopMovies();
            console.log(movies);
            await sendEmail(customer.mail, movies);
            console.log("Email sent...");
        }
    } catch (err) {
        console.log(err.message);
    }
}

emailCustomer();

function getCustomer(id) {
    return new Promise((resolve, reject) => {
        console.log("Fetching customer data from database ...");
        setTimeout(() => {
            resolve({
                id: 1,
                name: "Mosh Hamedani",
                isGold: true,
                email: "email",
            });
        }, 2000);
    });
}

function getTopMovies() {
    return new Promise((resolve, reject) => {
        console.log("Fetching top movies from database ...");
        setTimeout(() => {
            resolve(["movie1", "movie2"]);
        }, 2000);
    });
}

function sendEmail(email, movies) {
    return new Promise((resolve, reject) => {
        console.log("Sending mail");
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}
