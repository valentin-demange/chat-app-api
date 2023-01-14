# Heroku
<!-- rotate db credentials -->
heroku pg:credentials:rotate DATABASE -a blabla-19-90
<!-- local test -->
heroku local web
<!-- set and get heroku git branch -->
heroku git:remote -a afternoon-waters-99870
git remote -v
<!-- push on heroku remote branch -->
git push heroku main
<!-- Logs -->
heroku logs --tail


# Prisma
npx prisma db push
npx prisma format

