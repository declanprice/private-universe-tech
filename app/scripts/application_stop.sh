echo "stopping application"

cd /var/app

npx pm2 stop all

echo "application stopped"
