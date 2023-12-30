import { defineStore } from "pinia";
import { auth } from '@/firebase/index.js'
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

export const useCurrentUser = defineStore('CurrentUser', {
  state: () => {
    return {
      loading: false,
      userId: null,
      userInfo: null,
      isLoggedIn: false,
      user: JSON.parse(localStorage.getItem('user')),
    }
  },
  getters: {
    getUserId: (state) => state.userId,
    getUserLoggedIn: (state) => state.isLoggedIn,
    getUserInfo: (state) => state.isLoggedIn,
    getUser: (state) => state.user ? state.user : state.userInfo,
  },
  actions: {
    setUserInfo(user) {
      this.userId = user.uid;
      this.userInfo = user;
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(user));
    },

    init() {
      return auth.onAuthStateChanged(async user => {
        if (user) {
          this.setUserInfo(user);
        } else {
          this.userId = null;
          this.isLoggedIn = false;
          // localStorage.removeItem('user');
        }
      });
    },

    async userSignInWithGoogle() {
      const provider = new GoogleAuthProvider();
      try {
        const signResponse = await signInWithPopup(auth, provider).then((date) => {
          this.setUserInfo(date.user)
        });
        return signResponse;
      } catch {
        console.log('Error login');
      }
    },

    async userLogout() {
      this.user = null;
      this.userInfo = null;
      localStorage.removeItem('user');
      return await signOut(auth)
    }
  }
})