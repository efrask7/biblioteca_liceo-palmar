type TRelease = {
  url: string
  id: number
  node_id: string
  name: string
  label: string
  content_type: string
  state: string
  size: number
  browser_download_url: string
}

interface IGithubRelease {
  url: string
  assets_url: string
  upload_url: string
  html_url: string
  id: number
  node_id: string
  tag_name: string
  target_commitish: string
  name: string
  created_at: Date
  published_at: Date
  assets: TRelease[]
  body: string
}

interface IUpdateData {
  version: {
    local: number
    labelLocal: string
  }
  latest: {
    version: string
    changelog: string
    assets: TRelease[]
  }
}