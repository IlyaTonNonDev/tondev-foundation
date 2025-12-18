# Инструкция по деплою tondev.foundation

## Предварительные требования

1. VPS сервер (DigitalOcean, Timeweb Cloud, или другой провайдер)
   - Минимум: 1GB RAM, 1 CPU, 20GB SSD
   - Рекомендуется: 2GB RAM, 2 CPU, 40GB SSD
   - ОС: Ubuntu 22.04 LTS

2. Домен tondev.foundation настроен в Netim

3. Доступ по SSH к серверу

## Шаг 1: Создание VPS сервера

### DigitalOcean

1. Зайдите на [DigitalOcean](https://www.digitalocean.com/)
2. Создайте новый Droplet:
   - Выберите Ubuntu 22.04 LTS
   - Выберите план (минимум $6/месяц)
   - Выберите регион
   - Добавьте SSH ключ или создайте новый
   - Создайте Droplet

3. Запишите IP адрес вашего сервера

### Timeweb Cloud

1. Зайдите на [Timeweb Cloud](https://timeweb.cloud/)
2. Создайте новый VPS:
   - Выберите Ubuntu 22.04 LTS
   - Выберите тарифный план
   - Добавьте SSH ключ
   - Создайте сервер

3. Запишите IP адрес вашего сервера

## Шаг 2: Подключение к серверу

```bash
ssh root@YOUR_SERVER_IP
```

Или если используете пользователя с sudo:

```bash
ssh username@YOUR_SERVER_IP
```

## Шаг 3: Установка Docker и Docker Compose

```bash
# Обновление системы
apt update && apt upgrade -y

# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Установка Docker Compose
apt install docker-compose-plugin -y

# Проверка установки
docker --version
docker compose version
```

## Шаг 4: Клонирование репозитория

```bash
# Установка Git (если не установлен)
apt install git -y

# Клонирование репозитория
cd /opt
git clone https://github.com/IlyaTonNonDev/tondev-foundation.git
cd tondev-foundation

# Или если репозиторий приватный, используйте SSH:
# git clone git@github.com:IlyaTonNonDev/tondev-foundation.git
```

## Шаг 5: Настройка переменных окружения

```bash
# Создание файла .env из примера
cp .env.example .env

# Редактирование .env файла
nano .env
```

Отредактируйте следующие переменные:
- `POSTGRES_PASSWORD` - установите надежный пароль для PostgreSQL
- `DATABASE_URL` - будет автоматически настроен, но можно изменить при необходимости

## Шаг 6: Деплой приложения

```bash
# Сделать скрипты исполняемыми
chmod +x deploy.sh setup-ssl.sh

# Запуск деплоя
./deploy.sh
```

Скрипт автоматически:
- Проверит наличие Docker
- Соберет Docker образы
- Запустит контейнеры (приложение, база данных, nginx)

## Шаг 7: Настройка DNS в Netim

1. Зайдите в панель управления Netim
2. Найдите домен tondev.foundation
3. Добавьте DNS записи:
   - **Тип**: A
   - **Имя**: @ (или оставьте пустым)
   - **Значение**: IP адрес вашего VPS сервера
   - **TTL**: 3600

   - **Тип**: A
   - **Имя**: www
   - **Значение**: IP адрес вашего VPS сервера
   - **TTL**: 3600

4. Сохраните изменения

## Шаг 8: Настройка SSL сертификата

Подождите 5-10 минут для распространения DNS записей, затем:

```bash
# Отредактируйте email в setup-ssl.sh
nano setup-ssl.sh

# Запустите скрипт настройки SSL
./setup-ssl.sh
```

Скрипт автоматически:
- Получит SSL сертификат от Let's Encrypt
- Настроит nginx для работы с HTTPS
- Настроит автоматическое обновление сертификата

## Шаг 9: Проверка работы

1. Откройте в браузере: `https://tondev.foundation`
2. Проверьте, что сайт загружается
3. Проверьте, что SSL сертификат валиден (замочек в адресной строке)

## Управление приложением

### Просмотр логов

```bash
# Все сервисы
docker-compose logs -f

# Только приложение
docker-compose logs -f app

# Только база данных
docker-compose logs -f db

# Только nginx
docker-compose logs -f nginx
```

### Остановка приложения

```bash
docker-compose down
```

### Запуск приложения

```bash
docker-compose up -d
```

### Перезапуск приложения

```bash
docker-compose restart
```

### Обновление приложения

```bash
# Получить последние изменения
git pull

# Пересобрать и перезапустить
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Резервное копирование базы данных

```bash
# Создание бэкапа
docker-compose exec db pg_dump -U postgres tondev > backup_$(date +%Y%m%d_%H%M%S).sql

# Восстановление из бэкапа
docker-compose exec -T db psql -U postgres tondev < backup_YYYYMMDD_HHMMSS.sql
```

## Устранение проблем

### Приложение не запускается

1. Проверьте логи: `docker-compose logs app`
2. Проверьте, что порт 5000 не занят: `netstat -tulpn | grep 5000`
3. Проверьте переменные окружения в `.env`

### SSL сертификат не работает

1. Проверьте, что DNS записи настроены правильно: `dig tondev.foundation`
2. Проверьте логи certbot: `docker-compose logs certbot`
3. Убедитесь, что порты 80 и 443 открыты в файрволе

### База данных не подключается

1. Проверьте логи базы данных: `docker-compose logs db`
2. Проверьте переменную `DATABASE_URL` в `.env`
3. Проверьте, что контейнер базы данных запущен: `docker-compose ps`

## Безопасность

1. **Измените пароль PostgreSQL** в `.env` файле на надежный
2. **Настройте файрвол**:
   ```bash
   ufw allow 22/tcp
   ufw allow 80/tcp
   ufw allow 443/tcp
   ufw enable
   ```
3. **Отключите root доступ по SSH** (рекомендуется создать отдельного пользователя)
4. **Регулярно обновляйте систему**: `apt update && apt upgrade -y`

## Поддержка

При возникновении проблем проверьте логи и убедитесь, что все шаги выполнены правильно.


