const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ],
            authenticatedBuyer: false,
            authenticatedSeller: false,
            sellerId: null,
            selectedProduct: {},
            amounts: {},
            cart: {},
            search: "",
        },
        actions: {
            // Verificar el token del vendedor
            verifyTokenSeller: () => {
                const token = localStorage.getItem('jwt-token-seller');
                if (token != null) {
                    // Verificación básica del token
                    try {
                        const decoded = jwt_decode(token); // Necesitarías instalar jwt-decode
                        if (decoded.exp * 1000 < Date.now()) {
                            // Si el token ha expirado
                            localStorage.removeItem('jwt-token-seller');
                            setStore({ authenticatedSeller: false });
                            return null;
                        }
                    } catch (e) {
                        console.error("Invalid token", e);
                        localStorage.removeItem('jwt-token-seller');
                        setStore({ authenticatedSeller: false });
                        return null;
                    }

                    setStore({ authenticatedSeller: true });
                    return token;
                }
                setStore({ authenticatedSeller: false });
            },
            // Cambiar el estado de autenticación
            changeAuthenticatedSeller: (bool) => {
                setStore({ authenticatedSeller: bool });
            },
            // Función para hacer log out
            logoutSeller: () => {
                localStorage.removeItem('jwt-token-seller'); // Eliminar el token
                setStore({ authenticatedSeller: false, sellerId: null }); // Limpiar el estado
            }
        }
    };
};

export default getState;
