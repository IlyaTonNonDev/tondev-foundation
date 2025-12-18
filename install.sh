#!/bin/bash

set -e

echo "🚀 Установка tondev.foundation на сервер..."

# Обновление системы
echo "📦 Обновление системы..."
apt update && apt upgrade -y

# Установка необходимых пакетов
echo "📦 Установка необходимых пакетов..."
apt install -y curl git nano

# Установка Docker
if ! command -v docker &> /dev/null; then
    echo "🐳 Установка Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
else
    echo "✅ Docker уже установлен"
fi

# Установка Docker Compose
if ! command -v docker compose &> /dev/null; then
    echo "🐳 Установка Docker Compose..."
    apt install -y docker-compose-plugin
else
    echo "✅ Docker Compose уже установлен"
fi

# Проверка установки
echo "✅ Проверка установки..."
docker --version
docker compose version

# Создание директории для проекта
echo "📁 Создание директории проекта..."
mkdir -p /opt/tondev-foundation
cd /opt/tondev-foundation

# Клонирование репозитория (если еще не клонирован)
if [ ! -d ".git" ]; then
    echo "📥 Клонирование репозитория..."
    git clone https://github.com/IlyaTonNonDev/tondev-foundation.git .
else
    echo "✅ Репозиторий уже клонирован"
    git pull || echo "⚠️  Не удалось обновить репозиторий"
fi

# Создание .env файла если его нет
if [ ! -f .env ]; then
    echo "📝 Создание файла .env..."
    cp env.example .env
    echo ""
    echo "⚠️  ВАЖНО: Отредактируйте файл .env и установите надежный пароль для PostgreSQL!"
    echo "   Выполните: nano .env"
    echo "   Измените POSTGRES_PASSWORD на надежный пароль"
    echo ""
    read -p "Нажмите Enter после редактирования .env файла..."
fi

# Установка прав на выполнение скриптов
chmod +x deploy.sh setup-ssl.sh 2>/dev/null || true

echo ""
echo "✅ Установка завершена!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Убедитесь, что файл .env настроен правильно"
echo "2. Запустите деплой: ./deploy.sh"
echo "3. После деплоя настройте DNS записи в Netim"
echo "4. Затем запустите: ./setup-ssl.sh"
echo ""


