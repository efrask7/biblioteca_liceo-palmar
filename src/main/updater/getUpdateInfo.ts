import { app } from "electron";

const latestReleaseURI = "https://api.github.com/repos/efrask7/biblioteca_liceo-palmar/releases/latest"

export default async function getUpdateInfo() {
  const actualVersion = app.getVersion()
  const labelActVersion = `v${actualVersion}`

  try {
    const req = await fetch(latestReleaseURI)
    const res = await req.json() as IGithubRelease

    return {
      version: {
        local: actualVersion,
        labelLocal: labelActVersion
      },
      latest: {
        version: res.tag_name,
        changelog: res.body,
        assets: res.assets
      }
    }
  } catch (error) {
    return {
      error
    }
  }
}