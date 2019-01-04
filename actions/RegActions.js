import firebase from 'firebase';

import {
  REG_CHAPTER_CHANGED,
  REG_CODE_CHANGED,
  REG_EMAIL_CHANGED,
  REG_PASSWORD_CHANGED,
  REG_FIRST_NAME_CHANGED,
  REG_LAST_NAME_CHANGED,
  REG_RANK_CHANGED,
  REG_POSITION_CHANGED,
  REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAIL,
  RESET_REGISTER_STATE
} from '../constants/Types.js';

export const resetRegisterState = () => {
  return {
    type: RESET_REGISTER_STATE
  };
};

export const regChapterChanged = (text) => {
  return {
    type: REG_CHAPTER_CHANGED,
    payload: text
  };
};

export const regCodeChanged = (text) => {
  return {
    type: REG_CODE_CHANGED,
    payload: text
  };
};

export const regEmailChanged = (text) => {
  return {
    type: REG_EMAIL_CHANGED,
    payload: text
  };
};

export const regPasswordChanged = (text) => {
  return {
    type: REG_PASSWORD_CHANGED,
    payload: text
  };
};

export const regFirstNameChanged = (text) => {
  return {
    type: REG_FIRST_NAME_CHANGED,
    payload: text
  };
};

export const regLastNameChanged = (text) => {
  return {
    type: REG_LAST_NAME_CHANGED,
    payload: text
  };
};

export const regRankChanged = (text) => {
  return {
    type: REG_RANK_CHANGED,
    payload: text
  };
};

export const regPositionChanged = (text) => {
  return {
    type: REG_POSITION_CHANGED,
    payload: text
  };
};

export const regChapter = (organization, email, password, firstName, lastName, rank, position) => {
  const goodStanding = true;
  const dues = 0;
  const communityService = 0;
  const chapters = 0;
  const mixers = 0;
  const brotherhoods = 0;
  const admin = true;
  const randomCode = `${organization}-${(Math.floor(Math.random() * 10000) + 99999).toString()}`;

  return (dispatch) => {
    dispatch({ type: REGISTRATION });
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        firebase.database().ref(`/users/${user.uid}`)
          .set({ organization, rank });
        firebase.database().ref(`/${organization}/activesList/${rank}`)
          .set({ firstName, lastName, position: position || '' });
        firebase.database().ref(`/${organization}/profiles/${rank}`)
          .set({ firstName, lastName, rank, position: position || '', goodStanding, dues, communityService, chapters, mixers, brotherhoods, admin });
        firebase.database().ref(`/${organization}/security`)
          .set({ registrationCode: randomCode });
        firebase.database().ref('/organizations')
          .push(`${organization}`);
      })
      .then(() => {
        dispatch({ type: REGISTRATION_SUCCESS });
      })
      .catch(() => {
        dispatch({ type: REGISTRATION_FAIL });
      });
  };
};

export const regUser = (organization, regCode, email, password, firstName, lastName, rank, position) => {
  const goodStanding = true;
  const dues = 0;
  const communityService = 0;
  const chapters = 0;
  const mixers = 0;
  const brotherhoods = 0;
  const admin = false;

  return (dispatch) => {
    dispatch({ type: REGISTRATION });

    if (firstName === '' || lastName === '' || email === '' || password === '' || rank === '') {
      dispatch({ type: REGISTRATION_FAIL, payload: 'Please complete all fields' });
    } else {
      firebase.database().ref(`/${organization}/security/`).on('value', snapshot => {
        if (snapshot.val().registrationCode === regCode) {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
              const user = firebase.auth().currentUser;
              firebase.database().ref(`/users/${user.uid}`)
                .set({ organization, rank });
              firebase.database().ref(`/${organization}/activesList/${rank}`)
                .set({ firstName, lastName, position: position || '' });
              firebase.database().ref(`/${organization}/profiles/${rank}`)
                .set({ firstName, lastName, rank, position: position || '', goodStanding, dues, communityService, chapters, mixers, brotherhoods, admin });
            })
            .then(() => {
              dispatch({ type: REGISTRATION_SUCCESS });
            })
            .catch(() => {
              dispatch({ type: REGISTRATION_FAIL, payload: 'Registration failed' });
            });
        } else {
          dispatch({ type: REGISTRATION_FAIL, payload: 'Incorrect registration code' });
        }
      });
    }
  };
};
