# Быстрый старт - Деплой tondev.foundation

## Шаг 1: Создание VPS сервера

### Вариант A: DigitalOcean

1. Зайдите на https://www.digitalocean.com/
2. Создайте Droplet:
   - Ubuntu 22.04 LTS
   - Минимум 1GB RAM ($6/месяц)
   - Добавьте SSH ключ
3. Запишите IP адрес сервера

### Вариант B: Timeweb Cloud

1. Зайдите на https://timeweb.cloud/
2. Создайте VPS:
   - Ubuntu 22.04 LTS
   - Минимум 1GB RAM
   - Добавьте SSH ключ
3. Запишите IP адрес сервера

## Шаг 2: Подключение и настройка сервера

```bash
# Подключитесь к серверу
ssh root@YOUR_SERVER_IP

# Установите Docker и Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh
apt install docker-compose-plugin -y

# Установите Git
apt install git -y

# Клонируйте репозиторий
cd /opt
git clone https://github.com/IlyaTonNonDev/tondev-foundation.git
cd tondev-foundation

# Создайте файл .env
cp env.example .env
nano .env  # Отредактируйте POSTGRES_PASSWORD на надежный пароль

# Запустите деплой
chmod +x deploy.sh setup-ssl.sh
./deploy.sh
```

## Шаг 3: Настройка DNS в Netim

1. Зайдите в панель Netim
2. Найдите домен tondev.foundation
3. Добавьте A записи:
   - `@` → IP вашего сервера
   - `www` → IP вашего сервера
4. Подождите 5-10 минут для распространения DNS

## Шаг 4: Настройка SSL

```bash
# На сервере отредактируйте email в setup-ssl.sh
nano setup-ssl.sh  # Измените EMAIL="your-email@example.com"

# Запустите настройку SSL
./setup-ssl.sh
```

## Готово! 🎉

Сайт должен быть доступен по адресу: https://tondev.foundation

## Полезные команды

```bash
# Просмотр логов
docker-compose logs -f

# Перезапуск
docker-compose restart

# Остановка
docker-compose down

# Запуск
docker-compose up -d
```

Подробная инструкция: см. [DEPLOY.md](DEPLOY.md)


