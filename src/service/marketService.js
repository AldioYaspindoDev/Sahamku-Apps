import { api } from "./api";

export const MarketService = {
    getDataMarket: async () => {
        return await api.get('/market/overview');
    },

    getMarketStatus: async () => {
        return await api.get('/market/status');
    },

    getMarketBySymbol: async (symbol) => {
        return await api.get(`/market/${symbol}`);
    }
}