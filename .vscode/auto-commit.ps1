$branch = git rev-parse --abbrev-ref HEAD
git add .
if (-not (git diff --cached --quiet)) {
    git commit -m "UP"
    git push origin master
}
