# 🚀 NASA Cosmic Birthday

Descubra o que a NASA capturou no céu no dia em que você nasceu! Este projeto utiliza a API APOD (Astronomy Picture of the Day) da NASA para buscar imagens e descrições astronômicas baseadas na sua data de nascimento.

## 🛠️ Pré-requisitos

1.  **Python 3.10+** instalado.
2.  Uma **API Key da NASA** (obtenha gratuitamente em [api.nasa.gov](https://api.nasa.gov/)).

## ⚙️ Configuração Inicial

### 1. Política de Execução (Windows)
Se você estiver no Windows e encontrar problemas para ativar o ambiente virtual, abra o PowerShell como Administrador e execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 2. Chave da API
No diretório `Backend/`, abra o arquivo `.env` e substitua o valor pela sua chave:
```env
NASA_API_KEY=SUA_CHAVE_AQUI
```

---

## 🚀 Como rodar o projeto

### Passo 1: Iniciar o Backend (Python FastAPI)

Abra um terminal na pasta raiz do projeto e execute:
```powershell
cd Backend
# Ativar ambiente virtual
.\venv\Scripts\activate
# Iniciar o servidor
uvicorn main:app --reload --port 8001
```
O backend estará rodando em `http://localhost:8001`.

### Passo 2: Iniciar o Frontend (HTML/CSS/JS)

Abra um **novo terminal** na pasta raiz do projeto e execute:
```powershell
cd Frontend
# Iniciar um servidor web simples
python -m http.server 8080
```
Agora, acesse o site em seu navegador:
👉 **[http://localhost:8080](http://localhost:8080)**

---

## 🎨 Tecnologias Utilizadas
- **Backend**: FastAPI, HTTPX, Python-dotenv.
- **Frontend**: HTML5, Vanilla CSS (Glassmorphism), JavaScript Moderno.
- **API**: NASA Planetary APOD.
# 2 IA - A A 
