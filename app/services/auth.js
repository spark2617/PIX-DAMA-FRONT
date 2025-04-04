
export const loginUser = async (email, password) => {
    try {
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
            
        });

        const data = await response.json();
        

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return {
            success: true,
            data: data.data,
            message: data.message
        };

    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
};

export const checkSession = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/session`, {
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        return {
            success: true,
            data: data.data
        }
        // return data.data;
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
        // return {
        //     id: '',
        //     nome: '',
        //     email: '',
        //     administrador: false,
        //     totalVitorias: 0,
        //     usuarioAutenticado: false
        // };
    }
};

export const logout = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/signout`, {
            method: 'POST',
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message);
        }

        return {
            success: true
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
};

export const resetPassword = async (email) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message);
        }

        return {
            success: true,
            message: data.message
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
};