import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
"@firebase/auth": "^0.23.2",
"@firebase/database": "^0.14.4",
"firebase": "^9.21.0"
const auth = getAuth();

auth firebase

export function useAuth() {
const [user, setUser] = React.useState<User>();

useEffect(() => {
const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
if (user) {
// User is signed in, see docs for a list of available properties
// https://firebase.google.com/docs/reference/js/firebase.User
setUser(user);
} else {
// User is signed out
setUser(undefined);
}
});

    return unsubscribeFromAuthStateChanged;

}, []);

return {
user,
};
}

firebase sign up

await createUserWithEmailAndPassword(auth, value.email, value.password);
sign in await signInWithEmailAndPassword(auth, value.email, value.password);
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

"@firebase/auth": "^0.23.2",
"@firebase/database": "^0.14.4",
"firebase": "^9.21.0"

EMAIL

email
!EMAIL_REGEXP.test(inputValue)
export const EMAIL_REGEXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

firebase using

import {createUserWithEmailAndPassword, getAuth} from '@firebase/auth';
import React from 'react';
import {Button, TextInput, View} from 'react-native';
import {initializeApp} from 'firebase/app';
import {getDatabase, onValue, ref, set} from 'firebase/database';

const firebaseConfig = {
apiKey: 'AIzaSyCXZvAxt7RB8f6coK5XowK9lYBukzJ8qrs',
authDomain: 'test-84e62.firebaseapp.com',
databaseURL:
'https://test-84e62-default-rtdb.europe-west1.firebasedatabase.app',
projectId: 'test-84e62',
storageBucket: 'test-84e62.appspot.com',
messagingSenderId: '779727734663',
appId: '1:779727734663:web:f8fa22c05d030777b83522',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Initialize Firebase
const database = getDatabase(app);

const App = () => {
const [value, setValue] = React.useState({
email: '',
password: '',
error: '',
});

const createOrder = async (userID: string) => {
console.log('create order');
const FireRef = ref(database, 'User/' + userID);
set(FireRef, value);
};

async function signUp() {
try {
const user = await createUserWithEmailAndPassword(
auth,
value.email,
value.password,
);
console.log(user);

      await createOrder(user.user.uid);

      const FireRef = ref(
        database,
        'User/' + 'AIzaSyCXZvAxt7RB8f6coK5XowK9lYBukzJ8qrs' + '/orders/',
      );
      set(FireRef, {
        image: 'url',
        name: 'heelo',
      });

      const starCountRef = ref(database, 'User/' + user.user.uid);
      onValue(starCountRef, snapshot => {
        const data = snapshot.val();
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }

}

return (
<View>
<TextInput
placeholder="Email"
value={value.email}
onChangeText={text => setValue({...value, email: text})}
/>

      <TextInput
        placeholder="Password"
        onChangeText={text => setValue({...value, password: text})}
        secureTextEntry={true}
      />

      <Button title="press" onPress={() => signUp()} />
    </View>

);
};

export default App;
