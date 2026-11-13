# Changesets

Every PR that changes published behavior adds a changeset (`npm run changeset`). Merging to
`main` opens or updates the release version PR; publishing happens only from a GitHub release
or a manual workflow run with `publish: true`.
