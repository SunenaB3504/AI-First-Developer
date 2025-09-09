/**
 * @file portfolioService.js
 * @description Service for handling portfolio project data in Firestore.
 */
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

const portfoliosCollection = collection(db, 'portfolios');

/**
 * Adds a new project to a user's portfolio.
 * @param {string} userId - The ID of the user.
 * @param {object} projectData - The project data to add.
 * @returns {Promise<import("firebase/firestore").DocumentReference>} A promise that resolves with the new document reference.
 */
export const addProject = (userId, projectData) => {
  const userPortfolioCollection = collection(db, `portfolios/${userId}/projects`);
  return addDoc(userPortfolioCollection, projectData);
};

/**
 * Fetches all projects for a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array<object>>} A promise that resolves with an array of project objects, each including its ID.
 */
export const getProjects = async (userId) => {
  const userPortfolioCollection = collection(db, `portfolios/${userId}/projects`);
  const snapshot = await getDocs(userPortfolioCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Updates an existing project in a user's portfolio.
 * @param {string} userId - The ID of the user.
 * @param {string} projectId - The ID of the project to update.
 * @param {object} projectData - The new data for the project.
 * @returns {Promise<void>}
 */
export const updateProject = (userId, projectId, projectData) => {
  const projectDocRef = doc(db, `portfolios/${userId}/projects`, projectId);
  return updateDoc(projectDocRef, projectData);
};

/**
 * Deletes a project from a user's portfolio.
 * @param {string} userId - The ID of the user.
 * @param {string} projectId - The ID of the project to delete.
 * @returns {Promise<void>}
 */
export const deleteProject = (userId, projectId) => {
  const projectDocRef = doc(db, `portfolios/${userId}/projects`, projectId);
  return deleteDoc(projectDocRef);
};
