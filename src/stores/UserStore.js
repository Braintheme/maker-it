import { defineStore } from "pinia";
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

export const useCurrentUser = defineStore('CurrentUser', {
  state: () => {
    return {
      userId: null,
      isLoggedIn: false,
      userInfo: null
    }
  },
  getters: {
    getUserId: (state) => state.userId,
    getUserLoggedIn: (state) => state.isLoggedIn,
    getUserInfo: (state) => state.userInfo,
  },
  actions: {
    setUserId(id) {
      this.userId = id;
    },
    setUserAuth() {
      const userAuth = getAuth();
      onAuthStateChanged(userAuth, (user) => {
        if(user) {
          this.userInfo = user;
          this.userId = userAuth.currentUser.uid;
          this.isLoggedIn = true;
        }else {
          this.userId = null;
          this.isLoggedIn = false;
        }
      });
    },
    userSignInWithGoogle() {
      const provider = new GoogleAuthProvider();
      return signInWithPopup(getAuth(), provider)
        .then(() => {
          this.setUserAuth()     
        })
        .catch((error) => {
          console.log(error);
        })
    },
    userLogout() {
      return signOut(getAuth()).then(() => {
        this.setUserAuth()
      })
    }
  }
})