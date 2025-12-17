/**
 * Utility functions for loading content from the public folder
 */

const BASE_URL = import.meta.env.BASE_URL || '/'

/**
 * Fetches the config.json for a specific content type and id
 * @param {string} type - 'feelings', 'letters', or 'memories'
 * @param {string} id - The folder name/id
 * @returns {Promise<Object>} The config object
 */
export async function fetchConfig(type, id) {
  const url = `${BASE_URL}${type}/${id}/config.json`
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error(`Failed to load config for ${type}/${id}`)
  }
  
  return response.json()
}

/**
 * Fetches a markdown file from a specific content folder
 * @param {string} type - 'feelings', 'letters', or 'memories'
 * @param {string} id - The folder name/id
 * @param {string} filename - The markdown filename
 * @returns {Promise<string>} The markdown content
 */
export async function fetchMarkdown(type, id, filename) {
  const url = `${BASE_URL}${type}/${id}/${filename}`
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error(`Failed to load ${filename} for ${type}/${id}`)
  }
  
  return response.text()
}

/**
 * Fetches the index of all items for a content type
 * @param {string} type - 'feelings', 'letters', or 'memories'
 * @returns {Promise<Array>} Array of {id, config} objects
 */
export async function fetchIndex(type) {
  const url = `${BASE_URL}${type}/index.json`
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error(`Failed to load index for ${type}`)
  }
  
  const index = await response.json()
  return index.items || []
}

/**
 * Loads complete content for a detail page (config + markdown files)
 * @param {string} type - 'feelings', 'letters', or 'memories'
 * @param {string} id - The folder name/id
 * @returns {Promise<Object>} Complete content object
 */
export async function loadContent(type, id) {
  const config = await fetchConfig(type, id)
  
  // Load all markdown files referenced in the config
  const markdownFields = ['message', 'verses', 'content', 'description']
  const content = { ...config, id }
  
  for (const field of markdownFields) {
    if (config[field] && config[field].endsWith('.md')) {
      content[`${field}Content`] = await fetchMarkdown(type, id, config[field])
    }
  }
  
  return content
}

