import json
import os
import hashlib
import secrets
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def generate_token() -> str:
    return secrets.token_urlsafe(32)

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    API авторизации: регистрация и вход пользователей
    '''
    method: str = event.get('httpMethod', 'GET')
    body_data = json.loads(event.get('body', '{}')) if event.get('body') else {}
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token'
    }
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        if 'name' in body_data and 'email' in body_data and 'password' in body_data and 'phone' in body_data:
            name = body_data.get('name', '').strip()
            email = body_data.get('email', '').strip().lower()
            phone = body_data.get('phone', '').strip()
            password = body_data.get('password', '')
            
            if not name or not email or not password:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'Заполните все обязательные поля'}),
                    'isBase64Encoded': False
                }
            
            if len(password) < 6:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'Пароль должен содержать минимум 6 символов'}),
                    'isBase64Encoded': False
                }
            
            password_hash = hash_password(password)
            
            try:
                conn = get_db_connection()
                cursor = conn.cursor()
                
                cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
                existing_user = cursor.fetchone()
                
                if existing_user:
                    cursor.close()
                    conn.close()
                    return {
                        'statusCode': 400,
                        'headers': headers,
                        'body': json.dumps({'error': 'Пользователь с таким email уже существует'}),
                        'isBase64Encoded': False
                    }
                
                cursor.execute(
                    "INSERT INTO users (name, email, phone, password_hash) VALUES (%s, %s, %s, %s) RETURNING id, name, email",
                    (name, email, phone, password_hash)
                )
                user = cursor.fetchone()
                conn.commit()
                
                cursor.close()
                conn.close()
                
                token = generate_token()
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'user': {'id': user['id'], 'name': user['name'], 'email': user['email']},
                        'token': token
                    }),
                    'isBase64Encoded': False
                }
                
            except Exception as e:
                return {
                    'statusCode': 500,
                    'headers': headers,
                    'body': json.dumps({'error': f'Ошибка базы данных: {str(e)}'}),
                    'isBase64Encoded': False
                }
        
        elif 'email' in body_data and 'password' in body_data:
            email = body_data.get('email', '').strip().lower()
            password = body_data.get('password', '')
            
            if not email or not password:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'Заполните все поля'}),
                    'isBase64Encoded': False
                }
            
            password_hash = hash_password(password)
            
            try:
                conn = get_db_connection()
                cursor = conn.cursor()
                
                cursor.execute(
                    "SELECT id, name, email FROM users WHERE email = %s AND password_hash = %s",
                    (email, password_hash)
                )
                user = cursor.fetchone()
                
                cursor.close()
                conn.close()
                
                if not user:
                    return {
                        'statusCode': 401,
                        'headers': headers,
                        'body': json.dumps({'error': 'Неверный email или пароль'}),
                        'isBase64Encoded': False
                    }
                
                token = generate_token()
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'user': {'id': user['id'], 'name': user['name'], 'email': user['email']},
                        'token': token
                    }),
                    'isBase64Encoded': False
                }
                
            except Exception as e:
                return {
                    'statusCode': 500,
                    'headers': headers,
                    'body': json.dumps({'error': f'Ошибка базы данных: {str(e)}'}),
                    'isBase64Encoded': False
                }
    
    return {
        'statusCode': 405,
        'headers': headers,
        'body': json.dumps({'error': 'Метод не поддерживается'}),
        'isBase64Encoded': False
    }