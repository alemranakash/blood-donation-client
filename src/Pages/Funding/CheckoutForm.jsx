import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";


const CheckoutForm = ({  amount }) => {
    const [error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic()
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const { user } = useAuth();


    useEffect(() => {
        if (amount > 0) {
        axiosPublic.post('/create-payment-intent', { totalAmount: amount})
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
        }

    }, [axiosPublic, amount])



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

       

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if(error){
            console.log('payment error', error)
            setError(error.message);
        }
        else{
            console.log('payment method', paymentMethod)
            setError('');
        }


 // confirm payment
 const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
        card: card,
        billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous'
        }
    }
})

if (confirmError) {
    console.log('confirm error')
}
else {
    console.log('payment intent', paymentIntent)
    if (paymentIntent.status === 'succeeded') {
        console.log('transaction id', paymentIntent.id);
        setTransactionId(paymentIntent.id);


 // now save the payment in the database
 const payment = {
    name: user.displayName,
    email: user.email,
    totalAmount: amount, 
    transactionId: paymentIntent.id,
    date: new Date(), // utc date convert. use moment js to 
   
}

const res = await axiosPublic.post('/payments', payment);
console.log('payment saved', res.data, payment);

if(res.data?.insertedId){
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Thank you for the Donation",
        showConfirmButton: false,
        timer: 1500
      });
}


    }
}


    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;