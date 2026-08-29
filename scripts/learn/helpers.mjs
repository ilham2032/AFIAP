/** @typedef {{ question: string, options: string[], correctIndex: number, explanation: string }} Q */

/**
 * @param {string} title
 * @param {string[]} explanation
 * @param {Q[]} quiz
 */
export const lesson = (title, explanation, quiz) => ({ title, explanation, quiz })

/**
 * @param {string} question
 * @param {string[]} options
 * @param {number} correctIndex
 * @param {string} explanation
 * @returns {Q}
 */
export const q = (question, options, correctIndex, explanation) => ({
  question,
  options,
  correctIndex,
  explanation,
})
