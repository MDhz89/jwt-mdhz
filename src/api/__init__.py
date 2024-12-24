from flask import Flask
from flask_jwt_extended import JWTManager

def create_app():
    app = Flask(__name__)

    # Configuración de la clave secreta JWT
    app.config['JWT_SECRET_KEY'] = 'mi_clave_secreta'

    # Inicializa el JWTManager con la aplicación Flask
    jwt = JWTManager(app)

    # Importa y registra las rutas (Blueprints)
    from .routes import api
    app.register_blueprint(api)

    return app
