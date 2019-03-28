
import { authRef, googleProvider, githubProvider } from './firebase';

export const doSignInWithGoogle = () =>
  authRef.signInWithPopup(googleProvider);

export const doSignInWithGithub = () =>
  authRef.signInWithPopup(githubProvider);

 // class Firebase {
//   constructor() {
//     app.initializeApp(config);

//     this.auth = app.auth();
//   }

//   doCreateUserWithEmailAndPassword = (email, password) =>
//     this.auth.createUserWithEmailAndPassword(email, password);

//   doSignInWithEmailAndPassword = (email, password) =>
//     this.auth.signInWithEmailAndPassword(email, password);

//   doSignOut = () => this.auth.signOut();

//   doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

//   doPasswordUpdate = password =>
//     this.auth.currentUser.updatePassword(password);
// }

// export default Firebase;