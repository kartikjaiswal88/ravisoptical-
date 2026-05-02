/**
 * Uploads an image file to GitHub repo via Contents API
 * Returns the raw URL of the uploaded image
 */
export async function uploadImageToGitHub(file, config) {
  const { token, owner, repo, branch = 'main' } = config

  if (!token) throw new Error('GitHub token is missing in githubConfig.js')
  if (!owner || !repo) throw new Error('GitHub owner or repo is missing in githubConfig.js')

  // Convert file to base64
  const base64 = await fileToBase64(file)

  // Unique filename
  const ext = file.name.split('.').pop().toLowerCase()
  const filename = `images/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filename}`

  console.log('[GitHub Upload] Uploading to:', apiUrl)

  let response
  try {
    response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: JSON.stringify({
        message: `Upload product image: ${filename}`,
        content: base64,
        branch,
      }),
    })
  } catch (networkErr) {
    throw new Error(`Network error: ${networkErr.message}. Check your internet connection.`)
  }

  const data = await response.json()
  console.log('[GitHub Upload] Response status:', response.status, data)

  if (!response.ok) {
    if (response.status === 401) throw new Error('Token is invalid or expired. Generate a new one at github.com/settings/tokens')
    if (response.status === 403) throw new Error('Token lacks repo permission. Make sure you checked the "repo" scope when creating the token')
    if (response.status === 404) throw new Error(`Repo "${owner}/${repo}" not found. Check owner and repo name in githubConfig.js`)
    if (response.status === 422) throw new Error('File already exists or invalid content. Try again.')
    throw new Error(data.message || `GitHub API error ${response.status}`)
  }

  const rawUrl = data.content.download_url
  console.log('[GitHub Upload] Success! URL:', rawUrl)
  return rawUrl
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}
