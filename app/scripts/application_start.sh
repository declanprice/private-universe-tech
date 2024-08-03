echo "starting application"

cd /var/app

rm .env

source /etc/environment

echo NEXTAUTH_URL=$(aws ssm get-parameter --name $AUTH_URL_PARAM_NAME --region ap-southeast-2 --query "Parameter.Value" --with-decryption) >> .env
echo NEXTAUTH_SECRET=$(aws ssm get-parameter --name $AUTH_SECRET_PARAM_NAME --region ap-southeast-2 --query "Parameter.Value" --with-decryption) >> .env
echo DATABASE_URL=$(aws ssm get-parameter --name $DATABASE_URL_PARAM_NAME --region ap-southeast-2 --query "Parameter.Value" --with-decryption) >> .env

npx prisma generate

mv nginx.conf /etc/nginx

systemctl restart nginx

npx pm2 start "./node_modules/next/dist/bin/next start"

