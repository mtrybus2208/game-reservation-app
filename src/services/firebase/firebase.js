import * as firebase from 'firebase';
import config from './config';

firebase.initializeApp(config);

// const databaseRef = firebase.database().ref();
// export const todosRef = databaseRef.child('');
export const authRef = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();

