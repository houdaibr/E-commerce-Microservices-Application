const validateToken = require("./middleware/tokenValidationMiddleware");

const ROUTES = [
    {
        url: '/products',
        auth: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 60
        },
        proxy: {
            target: "http://localhost:5000/api/products",
            changeOrigin: true,
            pathRewrite: {
                [`^/products`]: '',
            },
        }
    },
    
    {
        url: '/payment',
        auth: true,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 60
        },
        middleware: [validateToken], // Add validateToken middleware for authentication
        proxy: {
            target: "http://localhost:5002/api/paiements",
            changeOrigin: true,
            pathRewrite: {
                [`^/payment`]: '',
            },
        }
    },
    {
        url: '/cart',
        auth: true,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 60
        },
        middleware: [validateToken], // Add validateToken middleware for authentication
        proxy: {
            target: "http://localhost:3003/api/commandes",
            changeOrigin: true,
            pathRewrite: {
                [`^/commandes`]: '',
            },
        }
    },
    {
        url: '/auth',
        auth: true,
        middleware: [validateToken], // Add validateToken middleware for authentication
        proxy: {
            target: "http://localhost:3001/api/auth/signup",
            changeOrigin: true,
            pathRewrite: {
                [`^/auth`]: '',
            },
        }
    },
    {
        url: '/auth',
        auth: true,
        middleware: [validateToken], // Add validateToken middleware for authentication
        proxy: {
            target: "http://localhost:3001/api/auth/signin",
            changeOrigin: true,
            pathRewrite: {
                [`^/auth`]: '',
            },
        }
    }
];

exports.ROUTES = ROUTES;