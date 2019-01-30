import firebase from 'firebase';
import _ from 'lodash';

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
  RESET_REGISTER_STATE,
  FETCH_ORGANIZATIONS,
  FETCH_ORGANIZATIONS_SUCCESS,
  FETCH_ORGANIZATIONS_FAILED
} from '../constants/Types.js';

export const fetchOrganizationList = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_ORGANIZATIONS });
    firebase.database().ref('organizations')
    .on('value', snapshot => {
      console.log(snapshot.val());
      const organizationList = _.values(snapshot.val());
      dispatch({ type: FETCH_ORGANIZATIONS_SUCCESS, payload: organizationList });
    });
  };
};

export const orgNameTaken = () => {
  return {
    type: REGISTRATION_FAIL,
    payload: 'Organization Name Taken'
  };
};

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

  const isRankIncorrect = isNaN(rank);

  return (dispatch) => {
    dispatch({ type: REGISTRATION });
    if (!isRankIncorrect) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          const user = firebase.auth().currentUser;
          firebase.database().ref(`/users/${user.uid}`)
            .set({ organization, rank });
          firebase.database().ref(`/${organization}/activesList/${rank}`)
            .set({ firstName, lastName, position: position || '' });
          firebase.database().ref(`/${organization}/profiles/${rank}`)
            .set({ firstName, lastName, rank, position: position || '', goodStanding, dues, communityService, chapters, mixers, brotherhoods, admin });
          firebase.database().ref(`/${organization}/admin`)
            .set({ securityCode: randomCode, totalBrotherhoods: 5, totalChapters: 5, totalCommunityService: 10, totalDues: 100, totalMixers: 5, });
          firebase.database().ref('/organizations')
            .push(`${organization}`);
        })
        .then(() => {
          dispatch({ type: REGISTRATION_SUCCESS });
        })
        .catch(() => {
          dispatch({ type: REGISTRATION_FAIL, payload: 'Registration Failed. Please Try Again' });
      });
    } dispatch({ type: REGISTRATION_FAIL, payload: 'Rank can only be a number' });
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

  const isRankIncorrect = isNaN(rank);

  return (dispatch) => {
    dispatch({ type: REGISTRATION });

    if (firstName === '' || lastName === '' || email === '' || password === '' || rank === '' || organization === '' || regCode === '') {
      dispatch({ type: REGISTRATION_FAIL, payload: 'Please complete all fields' });
    } else if (isRankIncorrect) {
      dispatch({ type: REGISTRATION_FAIL, payload: 'Rank can only be a number' });
    } else {
      firebase.database().ref(`/${organization}/admin/`).on('value', snapshot => {
        if (snapshot.val().securityCode === regCode) {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
              const user = firebase.auth().currentUser;
              firebase.database().ref(`/users/${user.uid}`)
                .set({ organization, rank });
              firebase.database().ref(`/${organization}/activesList/${rank}`)
                .set({ firstName, lastName, position: position || 'No Position' });
              firebase.database().ref(`/${organization}/profiles/${rank}`)
                .set({ firstName, lastName, rank, position: position || 'No Position', goodStanding, dues, communityService, chapters, mixers, brotherhoods, admin });
            })
            .then(() => {
              dispatch({ type: REGISTRATION_SUCCESS });
            })
            .catch(() => {
              dispatch({ type: REGISTRATION_FAIL, payload: 'Registration Failed. Please Try Again' });
            });
        } else {
          dispatch({ type: REGISTRATION_FAIL, payload: 'Incorrect registration code' });
        }
      });
    }
  };
};
