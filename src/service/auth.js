import Firebase from 'firebase';

export const signin = (email, password) => {
    Firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
//         .then((response) => {
//             console.log('response', response);
//             if (this.state.errorMessage === null) {
//                 AsyncStorage.setItem('currentUser', response.user.l);
//             }
//         })
//         .catch(error => {
//             this.setState({
//                 errorMessage: error.message
//             })
//             console.log('error', error, this.state);
//         });
}