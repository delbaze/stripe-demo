// This example uses Express to receive webhooks
import express from 'express';
const app = express();
import pg from 'pg'
const { Client } = pg
const client = new Client()

const stripe = require('stripe')('sk_test_51PfGRXJxfOhIJ5RkMnr4Pyd0qwfwJGrsDgXA8wZt6Orp2oJ97DbsqjAZERd20smjsw3LIwsqVorigV4Q8XB9YTu700uOoKwPBH');


// Match the raw body to content type application/json
// If you are using Express v4 - v4.16 you need to use body-parser, not express, to retrieve the request body
app.post('/webhooks', express.json({ type: 'application/json' }), (request, response) => {
    // const sig = request.headers['Stripe-Signature'];
    const event = request.body;

    // let event;
    // const endpointSecret = 'whsec_d7cf5d6a6759cc709fc46572e4b5ec41fedf737b6f6c1fc17c9aab59beecefed';
    // console.log("🙄🙄🙄🙄", stripe.webhooks.constructEvent(request.body, sig, endpointSecret));

    // try {
        // event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        // console.log("event", event);
    // }
    // catch (err: any) {
        // response.status(400).send(`Webhook Error: ${err.message}`);
    // }
    // console.log("event type 👉🏻👉🏻👉🏻", event.type)
    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object
            console.log('%c⧭', 'color: #731d6d', paymentIntent);
            // client.connect((err) => {
            //     client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
            //         console.log(err ? err.stack : res.rows[0].message) // Hello World!
            //         client.end()
            //     })
            // })
            // Then define and call a method to handle the successful payment intent.
            // handlePaymentIntentSucceeded(paymentIntent);
            break;
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            break;
        // ... handle other event types
        default: 
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
});

app.listen(8000, () => console.log('Running on port 8000'));