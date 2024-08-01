echo "stopping application"

cd /var/app

npx pm2 kill

echo "application stopped"
