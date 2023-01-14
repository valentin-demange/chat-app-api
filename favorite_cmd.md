# Heroku
<!-- rotate db credentials -->
heroku pg:credentials:rotate DATABASE -a blabla-19-90
<!-- local test -->
heroku local web
<!-- set and get heroku git branch -->
heroku git:remote -a blabla-19-90
git remote -v
<!-- push on heroku remote branch -->
git push heroku main


# Prisma
npx prisma db push
npx prisma format

