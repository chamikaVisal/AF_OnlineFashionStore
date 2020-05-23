import axios from 'axios';

// Simulate authentication service
const Auth = {
    _isAuthenticated: false,

    authenticate(email, password, cb) {
        //validation
        if (password.trim().length == 0 || email.trim().length == 0) {
            return;
        };

        axios.post('http://localhost:8080/auth/login',{ username: email, password: password }, {'Content-Type': 'application/json'})
            .then((response) => {
                console.log(response.data);
                return true;

            }, (err) => {
                console.log(err);
                return false;
            });


        this._isAuthenticated = true;
        setTimeout(
            () =>
                cb({
                    name: email,
                    password: password
                }),
            100
        );
    },

    //Create a new user.
    registerUser(firstName, lastName, email, password) {

        console.log("At the logic")
        console.log(firstName, lastName, email, password);

        if (firstName.trim().length == 0 || lastName.trim().length == 0 || email.trim().length == 0 || password.trim().length == 0) {
            return;
        };

        //sending POST request for signup
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName: firstName, lastName: lastName, email: email, password: password })
        };
        console.log({ firstName: firstName, lastName: lastName, email: email, password: password });
        fetch('http://localhost:8080/auth/signup', requestOptions)
            .then((response) => {
                console.log('Success');
                console.log(response);
                if (response.ok == true) {
                    return true;
                } else {
                    return false;
                }
            }, (error) => {
                console.log('Failed');
                console.log(error);
                return false;
            });

    },

    signout(cb) {
        this._isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

export default Auth;
